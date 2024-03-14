import IStore from "models/IStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { Grid } from "semantic-ui-react";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import FormARGrouping from "./main-content/FormARGrouping/FormARGrouping";
import FormTableARGrouping from "./main-content/FormTableARGrouping/FormTableARGrouping";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondAction from "stores/modal/second-level/ModalSecondLevelActions";
import * as ActivityReportGroupingActions from "stores/activity-report-grouping/ActivityReportGroupingActions";
import {
  selectActivityReportGroupingDetail,
  selectSearchResults,
} from "selectors/activity-report-grouping/ActivityReportGroupingSelector";
import ActivityReportGroupingPostModel from "stores/activity-report-grouping/models/ActivityReportGroupingPostModel";
import moment from "moment";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import ActivityReportGroupingPutModel from "stores/activity-report-grouping/models/ActivityReportGroupingPutModel";
import SearchByOptionsModel from "stores/activity-report-grouping/models/SearchByOptionsModel";

interface IProps {
  type: string;
  uid?: string;
  activityReportGroupGenId?: number;
  signStatus?: any
}

const ServiceFormARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();

  const { type, uid, activityReportGroupGenId, signStatus } = props;
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportGroupingActions.REQUEST_DROPDOWN_BY_OPTION,
      ActivityReportGroupingActions.REQUEST_SEARCH_BY_OPTIONS,
      ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL,
    ])
  );
  const SearchResult = useSelector((state: IStore) =>
    selectSearchResults(state)
  );

  const ARGroupingDetail = useSelector((state: IStore) =>
    selectActivityReportGroupingDetail(state)
  );

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onCloseEdit = () => {
    dispatch(ModalSecondAction.CLOSE());
  };

  const [currentDate] = useState(new Date());
  const [tempSearch, setTempSearch] = useState([]);
  useEffect(() => {
    dispatch(ActivityReportGroupingActions.requestDropdownByOptions());
    if (type === "EDIT") {
      dispatch(
        ActivityReportGroupingActions.RequestActivityReportGroupingDetail(
          activityReportGroupGenId
        )
      );
    }
    // if(SearchResult.rows?.length > 0 && uid !== undefined || type === "EDIT")
    // {
    return () => {
      const newValues = new SearchByOptionsModel({});
      dispatch(ActivityReportGroupingActions.RequestSearchByOptions(newValues));
    };
    // }
  }, []);

  useEffect(() => {
    //Save First for comparison
    if (
      type === "EDIT" &&
      ARGroupingDetail?.activityReports?.length > 0 &&
      tempSearch.length === 0
    ) {
      localStorage.removeItem("TempSearch");
      const DetailState = ARGroupingDetail?.activityReports?.map((item) => {
        setTempSearch((oldArray) => [...oldArray, item]);
      });
    }
  }, [ARGroupingDetail]);
  useEffect(() => {
    //Save First for comparison ADD
    if (
      type === "ADD" &&
      ARGroupingDetail?.activityReports?.length > 0 &&
      uid
    ) {
      const DetailState = ARGroupingDetail?.activityReports?.map((item) => {
        setTempSearch((oldArray) => [...oldArray, item]);
      });
    }
  }, [ARGroupingDetail]);

  // console.log("tempSearch", tempSearch);

  const handleSubmit = () => {
    if (uid === undefined) {
      const newValues = new ActivityReportGroupingPostModel({});

      let tempData = [];
      tempSearch.map((item) => {
        tempData.push(item.activityReportGenID);
      });
      newValues.activityReportGenIdRelated = tempData;
      newValues.createDate = currentDate;
      newValues.createUserID = currentUser.employeeID;

      dispatch(
        ActivityReportGroupingActions.RequestActivityReportGroupPost(newValues)
      ).then(() => {
        onClose();
      });
    } else if (uid && type === "ADD") {
      localStorage.setItem("TempSearch", JSON.stringify(tempSearch));
      onCloseEdit();
    } else {
      const newValues = new ActivityReportGroupingPutModel({});

      let tempData = [];
      JSON.parse(localStorage.getItem("TempSearch")).map((item) => {
        tempData.push(item.activityReportGenID);
      });

      newValues.activityReportGroupGenId = activityReportGroupGenId;
      newValues.activityReportGenIdRelated = tempData;
      newValues.modifyDate = currentDate;
      newValues.modifyUserID = currentUser.employeeID;

      dispatch(
        ActivityReportGroupingActions.RequestActivityReportGroupPut(newValues)
      ).then(() => {
        onClose();
        // dispatch(
        //   ActivityReportGroupingActions.RequestActivityReportGroupingDetail(
        //     activityReportGroupGenId
        //   )
        // );
      });
    }
  };

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid >
        <Grid.Row>
          <Grid.Column className="FullNotif" mobile={16} tablet={16} computer={16}>
            <FormARGrouping
              uid={uid}
              type={type}
              ARGroupingDetail={ARGroupingDetail}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16} style={{overflowX:"scroll"}}>
            <FormTableARGrouping
              tempSearch={tempSearch}
              setTempSearch={setTempSearch}
              SearchResults={SearchResult}
              type={type}
              //Edit
              uid={uid}
              activityReportGroupGenId={activityReportGroupGenId}
              ARGroupingDetail={ARGroupingDetail.activityReports}
              signStatus={signStatus}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button
              type="button"
              onClick={
                uid === undefined
                  ? onClose
                  : type === "EDIT"
                  ? onClose
                  : onCloseEdit
              }
              content="Cancel"
            />
            <Button
              color="blue"
              onClick={handleSubmit}
              disabled={tempSearch.length === 0}
              content={type === "ADD" ? "Add AR" : "Save"}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default ServiceFormARGrouping;

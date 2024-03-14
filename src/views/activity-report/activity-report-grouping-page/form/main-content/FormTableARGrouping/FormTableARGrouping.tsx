import React from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import TableARGrouping from "./table/TableARGrouping";
import IActivityReportResultTable from "selectors/activity-report-grouping/models/SearchResults/IActivityReportResultTable";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ServiceFormARGrouping from "../../ServiceFormARGrouping";
import IActivityReportsGroupingModel from "selectors/activity-report-grouping/models/ActivityReportGroupingDetail/IActivityReportsGroupingModel";

interface IProps {
  type: string;
  SearchResults: IActivityReportResultTable;
  tempSearch: any;
  setTempSearch: any;
  //Edit
  uid?: string;
  activityReportGroupGenId?: number;
  ARGroupingDetail?: IActivityReportsGroupingModel[];
  signStatus?: any;
}

const FormTableARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const {
    type,
    SearchResults,
    tempSearch,
    setTempSearch,
    uid,
    activityReportGroupGenId,
    ARGroupingDetail,
    signStatus,
  } = props;

  const ShowAddAR = (uid) => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <ServiceFormARGrouping
          uid={uid}
          activityReportGroupGenId={activityReportGroupGenId}
          type={"ADD"}
        />,
        ModalSizeEnum.Small
      )
    );
  };
  
  return (
    <>
      <Grid padded style={{ width: "100%" }}>
        <Grid.Row
          columns="equal"
          className="d-inflex-767 align-items-center pb-0"
        >
          <Grid.Column>
            <Header>
              <Header.Content>
                {type === "ADD" ? "Search Result" : "AR Grouping List"}
              </Header.Content>
            </Header>
          </Grid.Column>
          {type === "EDIT" && (
            <Grid.Column textAlign="right">
              <Header>
                <Header.Content>
                  {!signStatus && (
                    <Button
                      onClick={() => ShowAddAR(uid)}
                      icon="plus"
                      color="yellow"
                      content="Add AR"
                    />
                  )}
                </Header.Content>
              </Header>
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ overflowY: "scroll", height: "500px" }}>
            <TableARGrouping
              setTempSearch={setTempSearch}
              tempSearch={tempSearch}
              tableData={SearchResults}
              type={type}
              ARGroupingDetail={ARGroupingDetail}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default FormTableARGrouping;

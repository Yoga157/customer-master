import IStore from "models/IStore";
import React, { useCallback, useEffect, useState } from "react";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import {
  Divider,
  Header,
  Form,
  Segment,
  Grid,
  Button,
} from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { DateName, SelectInput, TextInput } from "views/components/UI";
import "./FormARGrouping.scss";
import {
  selectActivityReportGroupingByOptions,
  selectSearchResults,
} from "selectors/activity-report-grouping/ActivityReportGroupingSelector";
import SearchByOptionsModel from "stores/activity-report-grouping/models/SearchByOptionsModel";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import * as ActivityReportGroupingActions from "stores/activity-report-grouping/ActivityReportGroupingActions";
import IActivityReportGroupingDetail from "selectors/activity-report-grouping/models/ActivityReportGroupingDetail/IActivityReportGroupingDetail";

interface IProps {
  type: string;
  activityReportView?: any;
  uid?: string;

  //Edit
  ARGroupingDetail?: IActivityReportGroupingDetail;
}

const FormARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { type, activityReportView, uid, ARGroupingDetail } = props;
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ActivityReportGroupingActions.REQUEST_SEARCH_BY_OPTIONS,
      ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL,
    ])
  );
  const DropdownByOptions = useSelector((state: IStore) =>
    selectActivityReportGroupingByOptions(state)
  );

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const [searchAR, setSearchAR] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  console.log("valueSelect", valueSelect);
  console.log("searchAR", searchAR);
  const onSubmitHandler = (values: any) => {
    const newValues = new SearchByOptionsModel({});
    // searchAR === "activityReportGenID" ?
    newValues.userLoginId = currentUser.employeeID;
    // currentUser.employeeID;
    newValues.activityReportGenID =
      searchAR === "ACTIVITYREPORTGENID" ? Number(values.valueSelect) : null;
    newValues.ticketId = searchAR === "TICKETID" ? values.valueSelect : null;
    newValues.funnelGenId =
      searchAR === "FUNNELGENID" ? Number(values.valueSelect) : null;
    newValues.so = searchAR === "SO" ? Number(values.valueSelect) : null;
    newValues.startDate = values.startDate ? values.startDate : null;
    newValues.endDate = values.endDate ? values.endDate : null;
    newValues.column = "activityReportGenID";
    newValues.sorting = "asc";
    newValues.page = 0;
    newValues.pageSize = 0;

    dispatch(ActivityReportGroupingActions.RequestSearchByOptions(newValues));
  };

  const onChangeByOptions = (event: any) => {
    setSearchAR(event);
  };

  return (
    <>
      <Header>
        <Header.Content className="pl-1">
          {/* {type !== "DETAIL" && type}{" "} */}
          {type === "EDIT" && "EDIT GROUPING"}
          {type === "ADD" && uid != undefined && `ADD AR IN #${uid}`}
          {type === "ADD" && uid === undefined && "ADD NEW AR GROUPING"}
        </Header.Content>
      </Header>
      <Divider></Divider>
      <FinalForm
        onSubmit={(values: SearchByOptionsModel) => onSubmitHandler(values)}
        initialValues={
          type === "DETAIL"
            ? activityReportView
            : type === "EDIT"
            ? ARGroupingDetail
            : {}
        }
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Segment className="LightYellowNotif PadPmoNotif">
              <Grid>
                {type === "ADD" && (
                  <>
                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={5}
                      >
                        <Field
                          name="AR"
                          component={SelectInput}
                          placeholder="E.g. Status.."
                          labelName="Search AR by"
                          options={DropdownByOptions}
                          onChanged={onChangeByOptions}
                          mandatory={false}
                        />
                      </Grid.Column>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={11}
                      >
                        <Field
                          name="valueSelect"
                          component={TextInput}
                          labelColor="white"
                          placeholder={"12345"}
                          labelName=""
                          //   values={voucherAmountH?.toLocaleString()}
                          onChange={(data) => setValueSelect(data)}
                          TextAlign="left"
                          disabled={false}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={6}
                      >
                        <Field
                          name="startDate"
                          component={DateName}
                          date={true}
                          labelName="Start Date"
                          placeholder="09/09/2020"
                          disabled={false}
                          formated="MMM yyyy"
                        />
                      </Grid.Column>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={6}
                      >
                        <Field
                          name="endDate"
                          component={DateName}
                          date={true}
                          labelName="End Date"
                          placeholder="09/09/2020"
                          disabled={false}
                          formated={"MM/dd/yyyy"}
                        />
                      </Grid.Column>
                      <Grid.Column
                        verticalAlign="middle"
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={4}
                      >
                        <Button
                          className="btn-ARGrouping"
                          color="blue"
                          floated="left"
                          content="Search"
                          disabled={searchAR && valueSelect ? false : true}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </>
                )}
                {type === "EDIT" && (
                  <>
                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={4}
                      >
                        <Field
                          name="uid"
                          component={TextInput}
                          labelName="AR Group ID"
                          disabled={true}
                        />
                      </Grid.Column>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={12}
                      >
                        <Field
                          name="customerName"
                          component={TextInput}
                          labelColor="white"
                          thousandSeparator={true}
                          labelName="Customer Name"
                          TextAlign="left"
                          disabled={true}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={8}
                      >
                        <Field
                          name="contactName"
                          component={TextInput}
                          labelName="Contact Name"
                          disabled={true}
                        />
                      </Grid.Column>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={8}
                      >
                        <Field
                          name="phone"
                          component={TextInput}
                          labelColor="white"
                          // thousandSeparator={true}
                          labelName="Contact Number"
                          TextAlign="left"
                          disabled={true}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={8}
                      >
                        <Field
                          name="createUserName"
                          component={TextInput}
                          labelName="Create By"
                          disabled={true}
                        />
                      </Grid.Column>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={8}
                      >
                        <Field
                          name="createDate"
                          component={TextInput}
                          labelColor="white"
                          // thousandSeparator={true}
                          labelName="Create Date"
                          TextAlign="left"
                          disabled={true}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </>
                )}
                {type === "DETAIL" && (
                  <>
                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={4}
                      >
                        <Field
                          name="ticketId"
                          component={TextInput}
                          labelName="Ticket or Task Number"
                          disabled={true}
                        />
                      </Grid.Column>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={12}
                      >
                        <Field
                          name="so"
                          component={TextInput}
                          labelColor="white"
                          labelName="SO Number"
                          TextAlign="left"
                          disabled={true}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={16}
                      >
                        <Field
                          name="projectName"
                          component={TextInput}
                          labelName="Project Name"
                          disabled={true}
                        />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column
                        className="ViewLabel"
                        mobile={16}
                        tablet={16}
                        computer={16}
                      >
                        <Field
                          name="customerName"
                          component={TextInput}
                          labelName="Customer Name"
                          disabled={true}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </>
                )}
              </Grid>
            </Segment>
          </Form>
        )}
      />
    </>
  );
};

export default FormARGrouping;

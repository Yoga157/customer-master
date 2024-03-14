import React, { useEffect, useState } from "react";
import { Form, Grid, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import styles from "./InputSearchARGrouping.module.scss";
import {
  Button,
  CheckBoxInput,
  DateInput,
  DropdownInput,
  SearchInputList,
  SelectInputOpportunity,
} from "views/components/UI";
import SelectInput from "views/components/UI/SelectInput/SelectInputOpportunity";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ActivityReportGroupingActions from "stores/activity-report-grouping/ActivityReportGroupingActions";
import IStore from "models/IStore";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import {
  selectActivityReportGroupingContactName,
  selectActivityReportGroupingCustomerName,
} from "selectors/activity-report-grouping/ActivityReportGroupingSelector";
import ActivityReportGroupingFilter from "stores/activity-report-grouping/models/ActivityReportGroupingFilter";

interface IProps {
  searchType: string;
}
const AdvancedSearchARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {

  const [reviewStatus, setReviewStatus] = useState([]);
  
  const onChangeSIGNED = (values: boolean) => {
    onChangeReviewStatus(values, '1');
};

const onChangeWAITING = (values: boolean) => {
    onChangeReviewStatus(values, '0');
};


const onChangeReviewStatus = (values: boolean, statusID: string) => {
  if (values) {
      setReviewStatus((reviewStatus) => [...reviewStatus, statusID]);
  } else {
      const activityReportReviewStatusArr = reviewStatus.filter((id) => id != statusID);
      setReviewStatus(activityReportReviewStatusArr);
  }
};

  const onSubmitHandler = (values: any) => {
    const filter = new ActivityReportGroupingFilter({});

    filter.customerSignStatusList = reviewStatus.length === 0 ? '' : reviewStatus.join(';');
    filter.customerNameList =  values.customerNameList === undefined ? '' : values.customerNameList.join(';');
    filter.contactNameList = values.contactNameList === undefined ? '' : values.contactNameList.join(';');;
    filter.startDate = values.startDate;
    filter.endDate = values.endDate;
    filter.column = "";
    filter.sorting = "";
    filter.page = 0;
    filter.pageSize = 0;
    filter.userLoginId = currentUser.employeeID;
   
    dispatch(ActivityReportGroupingActions.RequestActivityReportGroupingFilter(filter));
  };
  const onCancel = () => {
    dispatch(
      ActivityReportGroupingActions.RequestActivityReportGrouping(
        1,
        15,
        "",
        "ascending",
        currentUser.employeeID
      )
    );
  };
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  useEffect(() => {
    dispatch(ActivityReportGroupingActions.requestDropdownContactName(currentUser.employeeID));
    dispatch(ActivityReportGroupingActions.requestDropdownCustomerName(currentUser.employeeID));
  }, []);

  const DropdownContactName = useSelector((state: IStore) =>
    selectActivityReportGroupingContactName(state)
  );
  const DropdownCustomerName = useSelector((state: IStore) =>
    selectActivityReportGroupingCustomerName(state)
  );

  
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={{}}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <Header as="h3" inverted dividing>
                  <Header.Content className={styles.FilterTitle}>
                    Advance Filter
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Sign Status</h4>
              </Grid.Column>
              <Grid colums="equal">
                <Grid.Column className="LabelGreen ml-20" width={7}>
                  <Field
                    name="SIGNED"
                    component={CheckBoxInput}
                    label="SIGNED"
                    onChange={onChangeSIGNED}
                  />
                </Grid.Column>
                <Grid.Column className="LabelYellow ml-10" width={7}>
                  <Field
                    name="WAITING"
                    component={CheckBoxInput}
                    label="WAITING"
                    onChange={onChangeWAITING}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid>
          {/* )} */}
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Customer</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  labelName="Customer Name"
                  name="customerNameList"
                  component={DropdownInput}
                  options={DropdownCustomerName}
                />
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  name="contactNameList"
                  component={DropdownInput}
                  options={DropdownContactName}
                  labelName="Contact Name"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Column width={16}>
              <h4 className={styles.FilterSubtitle}>Date Range</h4>
            </Grid.Column>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <Field
                  name="startDate"
                  labelName={"Start Date"}
                  component={DateInput}
                  placeholder="Start Date"
                  date={true}
                />
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  name="endDate"
                  labelName={"End Date"}
                  component={DateInput}
                  placeholder="End Date"
                  date={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button fluid color="blue">
                  Apply Filter
                </Button>
              </Grid.Column>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button type="button" fluid onClick={onCancel}>
                  Reset Filter
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};
export default AdvancedSearchARGrouping;

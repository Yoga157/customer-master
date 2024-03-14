import React, { useCallback, useState } from "react";
import { Form, Grid, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import styles from "./InputSearchCreditBilling.module.scss";
import {
  Button,
  CheckBox,
  CheckBoxInput,
  DateInput,
  DropdownInput,
  SearchInputList,
  SelectInput,
} from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { selectUserResult } from "selectors/user/UserSelector";
import {
  selectDropDownCustomerNameAWS,
  selectDropDownDeptAWS,
  selectDropDownPicAWS,
} from "selectors/aws-billing/AWSBillingServiceSelector";
import IUserResult from "selectors/user/models/IUserResult";
import * as AWSBillingActions from "stores/aws-billing/AWSBillingActions";
import FilterAWSBillingModel from "stores/aws-billing/models/FilterAWSBillingModel";
import moment from "moment";

interface IProps {
  pageSize: number;
  page: number;
}
const AdvancedSearchCreditBilling: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { pageSize, page } = props;
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const CustomerNameAWS = useSelector((state: IStore) =>
    selectDropDownCustomerNameAWS(state)
  );
  const DeptAWS = useSelector((state: IStore) => selectDropDownDeptAWS(state));
  const PicAWS = useSelector((state: IStore) => selectDropDownPicAWS(state));

  const onSubmitHandler = (values: any) => {
    console.log("valueus", values);
    const now = moment();

    let customerName = "";
    values.customerName &&
      values.customerName.map(
        (arrValues: any) =>
          (customerName =
            customerName.length > 0
              ? (customerName += "," + arrValues.value.toString())
              : arrValues.value.toString())
      );

    let dept = "";
    values.dept &&
      values.dept.map(
        (arrValues: any) =>
          (dept =
            dept.length > 0
              ? (dept += "," + arrValues.value.toString())
              : arrValues.value.toString())
      );

    let pic = "";
    values.pic &&
      values.pic.map(
        (arrValues: any) =>
          (pic =
            pic.length > 0
              ? (pic += "," + arrValues.value.toString())
              : arrValues.value.toString())
      );

    let billingStatusData = "";
    statusBilling &&
      statusBilling.map(
        (arrValues: any) =>
          (billingStatusData =
            statusBilling.length > 0
              ? (billingStatusData += "," + arrValues)
              : arrValues)
      );

    const filter = new FilterAWSBillingModel(values);
    filter.userLoginID = currentUser.employeeID;
    filter.billingPeriod =
      values.billingPeriodStart || values.billingPeriodEnd
        ? `${moment(values.billingPeriodStart).format("yyyyMMDD")}-${moment(
            values.billingPeriodEnd
          ).format("yyyyMMDD")}`
        : "";
    filter.billingStatus = billingStatusData;
    filter.customerName = customerName;
    filter.dept = dept;
    filter.pic = pic;
    filter.invoice = invoice;
    filter.page = page;
    filter.pageSize = pageSize;

    dispatch(AWSBillingActions.RequestFilterAWSBilling(filter));
  };

  const [statusBilling, setStatusBilling] = useState([]);
  const [unmapping, setUnmapping] = useState(false);
  const [unsettle, setUnsettle] = useState(false);
  const [settle, setSettle] = useState(false);
  const [invoice, setInvoice] = useState(null)
  const onChangeUnMapping = (values: any) => {
    if (values) {
      setStatusBilling((oldArray) => [...oldArray, "Unmapping"]);
      setUnmapping(true);
    } else {
      setUnmapping(false);
      setStatusBilling(statusBilling.filter((item) => item !== "Unmapping"));
    }
  };

  const onChangeUnSettle = (values: any) => {
    if (values) {
      setStatusBilling((oldArray) => [...oldArray, "Unsettle"]);
      setUnsettle(true);
    } else {
      setUnsettle(false);
      setStatusBilling(statusBilling.filter((item) => item !== "Unsettle"));
    }
  };

  const onChangeSettle = (values: any) => {
    if (values) {
      setStatusBilling((oldArray) => [...oldArray, "Settle"]);
      setSettle(true);
    } else {
      setSettle(false);
      setStatusBilling(statusBilling.filter((item) => item !== "Settle"));
    }
  };

  const initialValue = {
    userLoginID: currentUser.employeeID,
    billingPeriod: "",
    billingStatus: "",
    page: 1,
    pageSize: 15,
  };
  const [ValueData, setValueData] = useState({});
  const onCancel = () => {
    dispatch(
      AWSBillingActions.requestAWSBillings(
        currentUser.employeeID,
        "",
        "descending",
        "billingPeriod",
        1,
        15
      )
    );
    setValueData(initialValue);
    setUnmapping(false);
    setUnsettle(false);
    setSettle(false);
    setStatusBilling([]);
  };

  const handleSearchDeptAWS = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(
          AWSBillingActions.DropDownDeptAWS(
            currentUser.employeeID,
            data.value.trim()
          )
        );
      }
    },
    [dispatch]
  );

  const handleSearchCustomerNameAWS = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(
          AWSBillingActions.DropDownCustomerNameAWS(
            currentUser.employeeID,
            data.value.trim()
          )
        );
      }
    },
    [dispatch]
  );

  const handleSearchPICAWS = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(
          AWSBillingActions.DropDownPicAWS(
            currentUser.employeeID,
            data.value.trim()
          )
        );
      }
    },
    [dispatch]
  );

  const handleInvoice = (values: any) => {
    console.log('values',values)
    setInvoice(values)
  }

  const DropdownInvoice = [
    {
      text:"NO",
      value: 0
    },
    {
      text:"Yes",
      value: 1
    },
    // {
    //   text:"No Yes",
    //   value: null
    // }
  ]
 
  return (  
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={ValueData}
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
                <h4 className={styles.FilterSubtitle}>AWS Billing Status</h4>
              </Grid.Column>
              <Grid colums="equal">
                <Grid.Column className="LabelRed ml-20" width={6}>
                  <Field
                    name="Unmapping"
                    FilterCBV={"FilterCBV"}
                    valueFilterCBV={unmapping}
                    component={CheckBoxInput}
                    label="UNMAPPING"
                    onChange={onChangeUnMapping}
                  />
                </Grid.Column>
                <Grid.Column className="LabelYellow ml-10" width={5}>
                  <Field
                    name="Unsettle"
                    FilterCBV={"FilterCBV"}
                    valueFilterCBV={unsettle}
                    component={CheckBoxInput}
                    label="UNSETTLE"
                    onChange={onChangeUnSettle}
                  />
                </Grid.Column>
                <Grid.Column className="LabelGreen ml-20" width={5}>
                  <Field
                    name="Settle"
                    FilterCBV={"FilterCBV"}
                    valueFilterCBV={settle}
                    component={CheckBoxInput}
                    label="SETTLE"
                    onChange={onChangeSettle}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Range Billing Period</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  name="billingPeriodStart"
                  component={DateInput}
                  placeholder="Start Date"
                  date={true}
                />
                <Field
                  name="billingPeriodEnd"
                  component={DateInput}
                  placeholder="End Date"
                  date={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Invoice</h4>
              </Grid.Column>
              <Grid.Column width={16}>
              <Field
                  name="invoice"
                  component={SelectInput}
                  placeholder="Invoice"
                  options={DropdownInvoice}
                  labelName="Invoice"
                  onChanged={handleInvoice}
                />
                {/* <Field
                  name="invoice"
                  toggle
                  component={CheckBox}
                  // disabled={disableComponent}
                  //disabled
                  //checked={true}
                  onChange={() => setInvoice( invoice === 0 ? 1 : 0 )}
                /> */}
                {/* <Field name="billingPeriodEnd" component={DateInput} placeholder="End Date" date={true} /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Department</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  name="dept"
                  component={SearchInputList}
                  placeholder="Department"
                  handleSearchChange={handleSearchDeptAWS}
                  results={DeptAWS}
                />
                {/* <Field name="billingPeriodEnd" component={DateInput} placeholder="End Date" date={true} /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Customer Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  name="customerName"
                  handleSearchChange={handleSearchCustomerNameAWS}
                  results={CustomerNameAWS}
                  component={SearchInputList}
                  placeholder="Customer Name"
                />
                {/* <Field name="billingPeriodEnd" component={DateInput} placeholder="End Date" date={true} /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>PIC</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  name="pic"
                  component={SearchInputList}
                  handleSearchChange={handleSearchPICAWS}
                  results={PicAWS}
                  placeholder="PIC"
                />
                {/* <Field name="billingPeriodEnd" component={DateInput} placeholder="End Date" date={true} /> */}
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

export default AdvancedSearchCreditBilling;

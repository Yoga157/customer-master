import React, { useState, useCallback } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import styles from './InputSearchMainCBV.module.scss';
import { SearchInputList, Button, CheckBoxInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as CustomerActions from 'stores/customer/CustomerActions';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { combineValidators, isRequired } from 'revalidate';
import FilterMainCBV from 'stores/main-cbv/models/FilterMainCBV';
import { selectCustomerSearchOptionsWithFlag } from 'selectors/select-options/CustomerSelector';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
//MainCBV Filter

interface IProps {
  searchType: string;
}
const AdvancedSearchMainCBV: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { searchType } = props;
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const [RemainingZero,setRemainingZero] = useState(false)
  const [RemainingNotZero, setRemainingNotZero] = useState(false)
  const [UsedAmountZero,setUsedAmountZero] = useState(false)
  const [UsedAmountNotZero,setUsedAmountNotZero] = useState(false)

  const onSubmitHandler = (values: any) => {

    const filter = new FilterMainCBV(values)
    let CustomerId = ''
    values && values.customer && values.customer.map(
      (arrValues: any) => (CustomerId = CustomerId.length > 0 ? (CustomerId += ',' + arrValues.value.toString()) : arrValues.value.toString())
    );
    filter.userLoginID = currentUser.employeeID;
    filter.customer = CustomerId;
    filter.remainingAmount = RemainingNotZero && RemainingZero ? -1 : !RemainingZero && RemainingNotZero ? 1 : RemainingZero && !RemainingNotZero ? 0 : null;
    filter.usedAmount = UsedAmountNotZero && UsedAmountZero ? -1 : !UsedAmountZero && UsedAmountNotZero ? 1 : UsedAmountZero && !UsedAmountNotZero ? 0 : null;
    // filter.remainingAmount = values.valueMoreThanZero && values.valueZero ? -1 : !values.valueZero && values.valueMoreThanZero ? 1 : values.valueZero && !values.valueMoreThanZero ? 0 : null;
    // filter.usedAmount = values.usedAmountMoreThanZero && values.usedAmountZero ? -1 : !values.usedAmountZero && values.usedAmountMoreThanZero ? 1 : values.usedAmountZero && !values.usedAmountMoreThanZero ? 0 : null;
    filter.column = 'creditId';
    filter.sorting = 'descending';
    filter.page = 1;
    filter.pageSize = 15;
      console.log('values',values)
    dispatch(CreditBillingActions.RequestFilterMainCBV(filter))
  };

  const validate = combineValidators({
    customer: isRequired('customer'),
  });

  //MainCBV Filter
  const handleSearchChangeEmployee = useCallback(
    (e,data) => {
      // console.log('data',data.value.replace(/\s/g, ''))
      if(data.value.trim().length >= 2)
      {
        dispatch(CustomerActions.requestCustomerByNameBlackList(data.value.trim()))
      }
    },
    [dispatch]
  );

  const initialValue = {
    userLoginID: currentUser.employeeID,
    customer: '',
    remainingAmount: 0,
    usedAmount: 0,
    page: 1,
    pageSize: 15,
  }

  const [ValueData,setValueData] = useState({})
  const [triggerReset, setTriggerReset] = useState('')

  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptionsWithFlag(state));

  const onRemainingZero = (values: any) => {
   if(values)
   {
    setRemainingZero(true)
   } else {
    setRemainingZero(false)
   }
    // return false
  };

  const onRemainingNotZero = (values: any) => {
   if(values)
   {
    setRemainingNotZero(true)
   } else {
    setRemainingNotZero(false)
   }
    // return false
  };

  const onUsedAmountZero = (values: any) => {
   if(values)
   {
    setUsedAmountZero(true)
   } else {
    setUsedAmountZero(false)
   }
    // return false
  };

  const onUsedAmountNotZero = (values: any) => {
   if(values)
   {
    setUsedAmountNotZero(true)
   } else {
    setUsedAmountNotZero(false)
   }
    // return false
  };

  const onCancel = () => {
    dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, '','creditId','descending', 1, 15));
    setValueData(initialValue)
    setTriggerReset("Reset")
    setRemainingZero(false)
    setRemainingNotZero(false)
    setUsedAmountZero(false)
    setUsedAmountNotZero(false)
  };
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
                  <Header.Content className={styles.FilterTitle}>Advance Filter</Header.Content>
                </Header>
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
                      name="customer"
                      FilterMainCBV={triggerReset}
                      setTriggerReset={setTriggerReset}
                      component={SearchInputList}
                      placeholder="e.g.Employee Name"
                      // labelName="Resources"
                      handleSearchChange={handleSearchChangeEmployee}
                      results={customerStoreSearch}
                    />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* )} */}
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Remaining Amount</h4>
              </Grid.Column>
              <Grid.Column width={8}>
                <Field name="valueZero" FilterCBV={"FilterCBV"} valueFilterCBV={RemainingZero} onChange={onRemainingZero} component={CheckBoxInput} label="Amount = 0" />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field name="valueMoreThanZero" FilterCBV={"FilterCBV"} valueFilterCBV={RemainingNotZero} onChange={onRemainingNotZero} component={CheckBoxInput} label="Amount > 0" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Used Amount</h4>
              </Grid.Column>
              <Grid.Column width={8}>
                <Field name="usedAmountZero" FilterCBV={"FilterCBV"} valueFilterCBV={UsedAmountZero} onChange={onUsedAmountZero} component={CheckBoxInput} label="Amount = 0"  />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field name="usedAmountMoreThanZero" FilterCBV={"FilterCBV"} valueFilterCBV={UsedAmountNotZero} onChange={onUsedAmountNotZero} component={CheckBoxInput} label="Amount > 0"  />
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

export default AdvancedSearchMainCBV;

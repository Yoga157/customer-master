import React, { useEffect, useState } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import styles from './SearchBankGaransiAdmin.module.scss';
import { DateInput, Button, DropdownInput, CheckBoxInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectDivisionOptions } from 'selectors/select-options/EmployeeSelector';
import { selectCustomerBG, selectCreatorBG, selectBankGaransiAdmins } from 'selectors/bank-garansi/BankGaransiSelector';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';
import * as BondTypeAction from 'stores/bond-type/BondTypeAction';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import { selectBondTypeOptions, selectLetterTypeOptions } from 'selectors/select-options';
import * as LetterTypeAction from 'stores/letter-type/LetterTypeAction';
import { statusBGOptions } from 'constants/statusBGOptions';
import { statusProjectOptions } from 'constants/statusProjectOptions';

interface IProps {
  tabPage: number;
}
const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [bgStatus, setBgStatus] = useState(['']);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    if (currentUser.employeeID > 0) {
      dispatch(BankGaransiAction.requestCustomerBG(currentUser.userName, props.tabPage));
      dispatch(BankGaransiAction.requestCreatorBG(currentUser.userName, props.tabPage));
      dispatch(ProductServiceActions.requestFunnelProductBySales(currentUser.userName));
      dispatch(FunnelActions.requestFunnelDepartment(currentUser.employeeID));
      dispatch(BondTypeAction.requestBondType());
      dispatch(LetterTypeAction.requestLetterType());
      dispatch(BankGaransiAction.requestDivision());
    }
  }, [dispatch, currentUser.employeeID, currentUser.email]);

  const onSubmitHandler = (values: any) => {
    const filter = new FilterSearchModel(values);
    filter.status = bgStatus.join(',');
    filter.userLogin = currentUser.userName;
    filter.submitDateFrom = values.submitDateStart === undefined ? '' : values.submitDateStart;
    filter.submitDateTo = values.submitDateEnd === undefined ? '' : values.submitDateEnd;
    filter.creator = values.filterPemohon === undefined ? '' : values.filterPemohon.join(',');
    filter.bondType = values.filterBondType === undefined ? '' : values.filterBondType.join(',');
    filter.letterType = values.filterLetterType === undefined ? '' : values.filterLetterType.join(',');
    filter.statusProject = values.statusProject === undefined ? '' : values.statusProject.join(',');
    filter.effectiveDateFrom = values.effectivetDateStart === undefined ? '' : values.effectivetDateStart;
    filter.effectiveDateTo = values.effectiveDateEnd === undefined ? '' : values.effectiveDateEnd;
    filter.customer = values.filterCustomer === undefined ? '' : values.filterCustomer.join(',');
    filter.division = values.filterDivision === undefined ? '' : values.filterDivision.join(',');
    filter.page = 1;
    filter.pageSize = 15;
    filter.column = 'BankGuaranteeGenID';
    filter.sorting = 'descending';
    filter.flagExpire = props.tabPage;

    if (props.tabPage === 0) dispatch(BankGaransiAction.postFilterSearch(filter));
    else if (props.tabPage === 1) dispatch(BankGaransiAction.postFilterSearchEx(filter));
  };

  const onChangeBGStatus = (values: boolean, status: string) => {
    if (values) {
      setBgStatus((bgStatus) => [...bgStatus, status]);
    } else {
      const bgStatusArr = bgStatus.filter((id) => id !== status);
      setBgStatus(bgStatusArr);
    }
  };

  const onCancel = () => {
    dispatch(BankGaransiAction.requestBankGaransiAdmins(currentUser.userName, 1, 15, 0, 'BankGuaranteeGenID', 'descending'));
  };

  const onProgress = (values: boolean) => {
    onChangeBGStatus(values, 'ON PROGRESS');
  };

  const waitingMyApproval = (values: boolean) => {
    onChangeBGStatus(values, 'WAITING MY APPROVAL');
  };

  const rejected = (values: boolean) => {
    onChangeBGStatus(values, 'REJECTED');
  };

  const requestCompleted = (values: boolean) => {
    onChangeBGStatus(values, 'REQUEST COMPLETED');
  };

  const returnCompleted = (values: boolean) => {
    onChangeBGStatus(values, 'RETURN COMPLETED');
  };

  const customerFunnelOptions = useSelector((state: IStore) => selectCustomerBG(state));
  const subordinateOptions = useSelector((state: IStore) => selectCreatorBG(state));
  const bondTypeStore = useSelector((state: IStore) => selectBondTypeOptions(state));
  const letterTypeStore = useSelector((state: IStore) => selectLetterTypeOptions(state));
  const divisionStore = useSelector((state: IStore) => selectDivisionOptions(state));

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={viewFunnelSelling}
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
                <h4 className={styles.FilterSubtitle}>BG Status</h4>
              </Grid.Column>
              <Grid colums="equal">
                <Grid.Column className="LabelYellow ml-20" width={7}>
                  <Field name="onProgress" component={CheckBoxInput} label="ON PROGRESS" onChange={onProgress} />
                </Grid.Column>
                <Grid.Column className="LabelOrange ml-20" width={10}>
                  <Field name="waitingMyApproval" component={CheckBoxInput} label="WAITING MY APPROVAL" onChange={waitingMyApproval} />
                </Grid.Column>
                <Grid.Column className="LabelRedBg ml-20" width={5}>
                  <Field name="rejected" component={CheckBoxInput} label="REJECTED" onChange={rejected} />
                </Grid.Column>
                <Grid.Column className="LabelPurpleBg ml-20" width={9}>
                  <Field name="requestCompleted" component={CheckBoxInput} label="REQUEST COMPLETED" onChange={requestCompleted} />
                </Grid.Column>
                <Grid.Column className="LabelGreen ml-20" width={9}>
                  <Field name="returnCompleted" component={CheckBoxInput} label="RETURN COMPLETED" onChange={returnCompleted} />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid>
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Submit Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="submitDateStart" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="submitDateEnd" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Creator</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterPemohon" component={DropdownInput} options={subordinateOptions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Bond Type</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterBondType" component={DropdownInput} options={bondTypeStore} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Letter Type</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterLetterType" component={DropdownInput} options={letterTypeStore} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Effective Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="effectiveDateStart" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="effectiveDateEnd" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Customer</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterCustomer" component={DropdownInput} options={customerFunnelOptions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Division</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterDivision" component={DropdownInput} options={divisionStore} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Status Project</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="statusProject" component={DropdownInput} options={statusProjectOptions} />
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
                  Cancel
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default AdvancedSearch;

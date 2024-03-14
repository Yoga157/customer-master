import React, { useEffect, useState } from 'react';
import { Form, Grid, Header, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import styles from './InputSearch.module.scss';
import { DateInput, Button, DropdownInput, CheckBoxInput, DropdownClearInput, CheckBox } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as CustomerActions from 'stores/customer/CustomerActions';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import { selectCustomerFunnelOptions } from 'selectors/select-options/CustomerSelector';
import { selectFunnelDepartmentOptions } from 'selectors/select-options/DepartmentSelector';
import { selectSalesAdminOptions } from 'selectors/select-options/FunnelSalesAdminSelector';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectSubordinateOptions } from 'selectors/select-options/EmployeeSelector';
import { selectFunnelBrandOptions } from 'selectors/select-options/FunnelBrandSelector';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelConfigColumnModel from 'stores/funnel/models/FunnelConfigColumnModel';
import { totalSellingRangeOptions } from 'constants/totalSellingRangeOptions';

interface IProps {
  searchType: string;
}
const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { searchType } = props;
  const [funnelStatus, setFunnelStatus] = useState(['']);
  const [commercialStatus, setCommercialStatus] = useState([]);
  const [servicesStatus, setServicesStatus] = useState([]);
  const dispatch: Dispatch = useDispatch();
  const [customerName, setCustomerName] = useState('');
  const [customerID, setCustomerID] = useState(0);
  const [valuesChk, setValuesChk] = useState({} as FunnelConfigColumnModel);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const columns = useSelector((state: IStore) => state.funnel.columns);

  useEffect(() => {
    if (currentUser.employeeID > 0) {
      dispatch(CustomerActions.requestCustomerFunnel(currentUser.employeeID));
      dispatch(EmployeeActions.requestSubordinate(currentUser.userName));
      dispatch(ProductServiceActions.requestFunnelProductBySales(currentUser.userName));
      dispatch(FunnelActions.requestFunnelDepartment(currentUser.employeeID));
      dispatch(FunnelSalesAnalystActions.requestDropdownSalesAdmin(currentUser.employeeID));
    }
  }, [dispatch, currentUser.employeeID, currentUser.email]);

  useEffect(() => {
    setValuesChk(localStorage.getItem('@confColumns') ? JSON.parse(localStorage.getItem('@confColumns')) : columns);
  }, [dispatch, columns]);

  const onSubmitHandler = (values: any) => {
    const filter = new FunnelFilter(values);
    filter.funnelStatusID = funnelStatus.join(',');
    filter.commerceWorkflowStatus = commercialStatus.join(',');
    filter.serviceWorkflowStatus = servicesStatus.join(',');
    filter.customerGenID = values.filterCostumerName === undefined ? '' : values.filterCostumerName.join(',');
    filter.dept = values.filterDepartment === undefined ? '' : values.filterDepartment.join(',');
    filter.salesID = values.filterSalesName === undefined ? '' : values.filterSalesName.join(',');
    filter.itemID = values.filterBrand === undefined ? '' : values.filterBrand.join(',');
    filter.salesAdmin = values.filterSalesAdmin === undefined ? '' : values.filterSalesAdmin.join(',');
    filter.totalSellingPriceMin = values.filterSellValue === undefined ? 0 : +values.filterSellValue.split('#')[0];
    filter.totalSellingPriceMax = values.filterSellValue === undefined ? 0 : +values.filterSellValue.split('#')[1];
    filter.userLoginID = currentUser.employeeID;
    filter.page = 1;
    filter.pageSize = 50;
    filter.role = currentUser.role;
    filter.column = 'funnelGenID';
    filter.sorting = 'descending';
    filter.type = searchType === 'funnel' ? 'funnel' : 'sa';

    if (searchType === 'funnel') {
      dispatch(FunnelActions.postFunnelFilter(filter));
    } else {
      dispatch(FunnelActions.postSAFilter(filter));
    }

    dispatch(FunnelActions.myApproval(false));
  };

  const onChangeAboveFunnel = (values: boolean) => {
    onChangeFunnelStatus(values, '1');
  };

  const onChangeInFunnel = (values: boolean) => {
    onChangeFunnelStatus(values, '2');
  };

  const onChangeBestFew = (values: boolean) => {
    onChangeFunnelStatus(values, '3');
  };

  const onChangeCloseWin = (values: boolean) => {
    onChangeFunnelStatus(values, '4');
  };

  const onChangeCloseLose = (values: boolean) => {
    onChangeFunnelStatus(values, '5');
  };

  const onChangeCancel = (values: boolean) => {
    onChangeFunnelStatus(values, '6');
  };

  const onChangeFunnelStatus = (values: boolean, statusID: string) => {
    if (values) {
      setFunnelStatus((funnelStatus) => [...funnelStatus, statusID]);
    } else {
      const funnelStatusArr = funnelStatus.filter((id) => id !== statusID);
      setFunnelStatus(funnelStatusArr);
    }
  };

  const onChangeMyApproval = (val, status) => {
    if (val) {
      setCommercialStatus([...commercialStatus, status]);
      setServicesStatus([...servicesStatus, status]);
    } else {
      setCommercialStatus(commercialStatus.filter((e) => e !== status));
      setServicesStatus(servicesStatus.filter((e) => e !== status));
    }
  };

  const onChangeCommercialApprovalStatus = (val, status) => {
    if (val) {
      setCommercialStatus([...commercialStatus, status]);
    } else {
      setCommercialStatus(commercialStatus.filter((e) => e !== status));
    }
  };

  const onChangeServicesApprovalStatus = (val, status) => {
    if (val) {
      setServicesStatus([...servicesStatus, status]);
    } else {
      setServicesStatus(servicesStatus.filter((e) => e !== status));
    }
  };

  const onCancel = () => {
    if (searchType === 'funnel') {
      dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 'funnel', 1, 50));
    } else {
      dispatch(FunnelActions.requestSA(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 1, 50));
    }
  };

  const handleChecked = (e: any, checked: any, field: any) => {
    const items = new FunnelConfigColumnModel({ ...valuesChk });
    items.flagManual = checked.input?.name === 'flagManual' ? !valuesChk.flagManual : valuesChk.flagManual;
    items.lastNotesActivityThisWeek = checked.input?.name === 'lastNotesActivityThisWeek' ? !valuesChk.lastNotesActivityThisWeek : valuesChk.lastNotesActivityThisWeek; 
    items.lastNotesActivityPrevWeek = checked.input?.name === 'lastNotesActivityPrevWeek' ? !valuesChk.lastNotesActivityPrevWeek : valuesChk.lastNotesActivityPrevWeek; 

    localStorage.setItem('@confColumns', JSON.stringify(items));
    dispatch(FunnelActions.setColumns(items));
  };

  const customerFunnelOptions = useSelector((state: IStore) => selectCustomerFunnelOptions(state));
  const departmentFunnelOptions = useSelector((state: IStore) => selectFunnelDepartmentOptions(state));
  const subordinateOptions = useSelector((state: IStore) => selectSubordinateOptions(state));
  const funnelBrandOptions = useSelector((state: IStore) => selectFunnelBrandOptions(state));
  const salesAdminOptions = useSelector((state: IStore) => selectSalesAdminOptions(state));

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

          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Show Hide Columns</h4>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid className={(searchType === 'funnel') ? `${styles.itemFields} ph-1r -mt-1rem` : `${styles.itemFields} ${styles.divider}`} columns="equal" verticalAlign="middle">
            <Grid.Column textAlign="left" className="pt-1r pb-0">
              <Header as="span">
                <Header.Content>SA Manual</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right" className="pt-1r pb-0 item-toggle" verticalAlign="middle">
              <span>HIDE</span>
              <span>
                <Field
                  name={'flagManual'}
                  toggle
                  component={CheckBox}
                  checked={valuesChk.flagManual}
                  onChange={(e, checked) => handleChecked(e, checked, 'flagManual')}
                />
              </span>
              <span>SHOW</span>
            </Grid.Column>
          </Grid>
          {searchType === 'funnel' && (
            <>
              <Grid className={`${styles.itemFields} ph-1r -mt-1rem`} columns="equal" verticalAlign="middle">
                <Grid.Column textAlign="left" className="">
                  <Header as="span">
                    <Header.Content>Last Activity This Week</Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="right" className=" item-toggle" verticalAlign="middle">
                  <span>HIDE</span>
                  <span>
                    <Field
                      name={'lastNotesActivityThisWeek'}
                      toggle
                      component={CheckBox}
                      checked={valuesChk.lastNotesActivityThisWeek}
                      onChange={(e, checked) => handleChecked(e, checked, 'lastNotesActivityThisWeek')}
                    />
                  </span>
                  <span>SHOW</span>
                </Grid.Column>
              </Grid>
              <Grid className={`${styles.itemFields} ${styles.divider}`} columns="equal" verticalAlign="middle">
                <Grid.Column textAlign="left" className="">
                  <Header as="span">
                    <Header.Content>Last Activity Prev Week</Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="right" className=" item-toggle" verticalAlign="middle">
                  <span>HIDE</span>
                  <span>
                    <Field
                      name={'lastNotesActivityPrevWeek'}
                      toggle
                      component={CheckBox}
                      checked={valuesChk.lastNotesActivityPrevWeek}
                      onChange={(e, checked) => handleChecked(e, checked, 'lastNotesActivityPrevWeek')}
                    />
                  </span>
                  <span>SHOW</span>
                </Grid.Column>
              </Grid>
            </>
          )}
          {searchType === 'funnel' && (
            <Grid padded columns="equal" className={styles.divider}>
              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <h4 className={styles.FilterSubtitle}>Funnel Status</h4>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid colums="equal">
                  <Grid.Column className="LabelGrey ml-20" width={7}>
                    <Field name="aboveFunnel" component={CheckBoxInput} label="ABOVE FUNNEL" onChange={onChangeAboveFunnel} />
                  </Grid.Column>
                  <Grid.Column className="LabelYellow" width={6}>
                    <Field name="inFunnel" component={CheckBoxInput} label="IN FUNNEL" onChange={onChangeInFunnel} />
                  </Grid.Column>
                  <Grid.Column className="LabelBlue ml-20" width={6}>
                    <Field name="bestFew" component={CheckBoxInput} label="BEST FEW" onChange={onChangeBestFew} />
                  </Grid.Column>
                  <Grid.Column className="LabelGreen" width={6}>
                    <Field name="closeWin" component={CheckBoxInput} label="CLOSE WIN" onChange={onChangeCloseWin} />
                  </Grid.Column>
                  <Grid.Column className="LabelRed ml-20" width={6}>
                    <Field name="closeLose" component={CheckBoxInput} label="CLOSE LOSE" onChange={onChangeCloseLose} />
                  </Grid.Column>
                  <Grid.Column className="LabelPurple" width={5}>
                    <Field name="cancel" component={CheckBoxInput} label="CANCEL" onChange={onChangeCancel} />
                  </Grid.Column>
                  {/*    <Grid.Column className="LabelBlack ml-20" width={7}>
                                <Field 
                                    name='outstanding'
                                    component={CheckBoxInput}
                                    label="OUTSTANDING"  
                                />
                            </Grid.Column> */}
                </Grid>
              </Grid.Row>
            </Grid>
          )}

          {searchType === 'salesAnalysis' && (
            <>
              <Grid padded columns="equal" className={styles.divider}>
                <Grid.Row columns={1}>
                  <Grid.Column width={16}>
                    <h4 className={styles.FilterSubtitle}>My Approval</h4>
                  </Grid.Column>
                  <Grid columns={1}>
                    <Grid.Column className={`${styles.checkBoxWithIc}`}>
                      <Field
                        name="MyApproval"
                        component={CheckBoxInput}
                        label="My Approval"
                        onChange={(val) => onChangeMyApproval(val, 'my approval')}
                      />
                      <Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid>

              <Grid padded columns="equal" className={styles.divider}>
                <Grid.Column width={16}>
                  <h4 className={styles.FilterSubtitle}>Commercial Approval Status</h4>
                </Grid.Column>
                <Grid.Column width={16}>
                  <Grid columns={2}>
                    <Grid.Column className={`${styles.checkBoxWithIc}`}>
                      <Field
                        name="CasCompleted"
                        component={CheckBoxInput}
                        label="Completed"
                        onChange={(val) => onChangeCommercialApprovalStatus(val, 'completed')}
                      />
                      <Icon name="check" className="ic-rounded-18 bg-success ml-px-4" />
                    </Grid.Column>
                    <Grid.Column className={`${styles.checkBoxWithIc}`}>
                      <Field
                        name="CasInProgress"
                        component={CheckBoxInput}
                        label="Waiting"
                        onChange={(val) => onChangeCommercialApprovalStatus(val, 'approval')}
                      />
                      <Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />
                    </Grid.Column>
                    <Grid.Column className={`${styles.checkBoxWithIc}`}>
                      <Field
                        name="CasRejected"
                        component={CheckBoxInput}
                        label="Rejected"
                        onChange={(val) => onChangeCommercialApprovalStatus(val, 'rejected')}
                      />
                      <Icon name="close" className="ic-rounded-18 bg-danger ml-px-4" />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid>

              <Grid padded columns="equal" className={styles.divider}>
                <Grid.Row columns={1}>
                  <Grid.Column width={16}>
                    <h4 className={styles.FilterSubtitle}>Services Approval Status</h4>
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <Grid columns={2}>
                      <Grid.Column className={`${styles.checkBoxWithIc}`}>
                        <Field
                          name="SasCompleted"
                          component={CheckBoxInput}
                          label="Completed"
                          onChange={(val) => onChangeServicesApprovalStatus(val, 'completed')}
                        />
                        <Icon name="check" className="ic-rounded-18 bg-success ml-px-4" />
                      </Grid.Column>
                      <Grid.Column className={`${styles.checkBoxWithIc}`}>
                        <Field
                          name="SasInProgress"
                          component={CheckBoxInput}
                          label="Waiting"
                          onChange={(val) => onChangeServicesApprovalStatus(val, 'approval')}
                        />
                        <Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />
                      </Grid.Column>
                      <Grid.Column className={`${styles.checkBoxWithIc}`}>
                        <Field
                          name="SasRejected"
                          component={CheckBoxInput}
                          label="Rejected"
                          onChange={(val) => onChangeServicesApprovalStatus(val, 'rejected')}
                        />
                        <Icon name="close" className="ic-rounded-18 bg-danger ml-px-4" />
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              {currentUser.role === 'Admin' && (
                <Grid padded columns="equal" className={styles.divider}>
                  <Grid.Row columns={1}>
                    <Grid.Column width={16}>
                      <Grid columns={2}>
                        <Grid.Column>
                          <Field
                            name="RequestOpen"
                            component={CheckBoxInput}
                            label="Request Open"
                            onChange={(val) => onChangeCommercialApprovalStatus(val, 'Request Open')}
                          />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </>
          )}

          {/* {searchType === 'funnel' && ( */}
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>{searchType === 'funnel' ? 'Date Close Date Range' : 'SA Date'}</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="dealCloseDateStart" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="dealCloseDateEnd" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* )} */}

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Customer Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterCostumerName" component={DropdownInput} options={customerFunnelOptions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Department</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterDepartment" component={DropdownInput} options={departmentFunnelOptions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Sales Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterSalesName" component={DropdownInput} options={subordinateOptions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Sales Admin</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterSalesAdmin" component={DropdownInput} options={salesAdminOptions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Brand</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterBrand" component={DropdownInput} options={funnelBrandOptions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Total Selling Value Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterSellValue" component={DropdownClearInput} options={totalSellingRangeOptions} />
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

import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import { selectPtConfigDropdown } from 'selectors/config-items/ConfigItemSelector';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ConfigItemFilter from 'stores/config-items/models/ConfigItemFilter';
import { Button, DateInput, DropdownInput } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './AdvanceSearch.module.scss';
import IStore from 'models/IStore';

interface IProps {}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const {} = props;

  const [initialValues, setInitialValue] = useState({});

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ConfigItemsActions.CONFIG_ITEMS_DROPDOWN_VENDOR,
      ConfigItemsActions.CONFIG_ITEMS_DROPDOWN_VENDOR_TYPE,
      ConfigItemsActions.CONFIG_ITEMS_DROPDOWN_CUSTOMER,
    ])
  );
  const selectVendorType = useSelector((state: IStore) => selectPtConfigDropdown(state, 'VendorType'));
  const selectCustomer = useSelector((state: IStore) => selectPtConfigDropdown(state, 'Customer'));
  const selectVendor = useSelector((state: IStore) => selectPtConfigDropdown(state, 'Vendor'));
  const selectDepartment = useSelector((state: IStore) => selectPtConfigDropdown(state, 'Department'));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const configItems = useSelector((state: IStore) => state.configItems.listData);
  const result = useSelector((state: IStore) => state.configItems.resultAction);

  useEffect(() => {
    dispatch(ConfigItemsActions.reqConfigItemsDropdown(currentUser.employeeID, 'Vendor'));
    dispatch(ConfigItemsActions.reqConfigItemsDropdown(currentUser.employeeID, 'VendorType'));
    dispatch(ConfigItemsActions.reqConfigItemsDropdown(currentUser.employeeID, 'Customer'));
    dispatch(ConfigItemsActions.reqConfigItemsDropdown(currentUser.employeeID, 'Department'));
  }, [dispatch]);

  useEffect(() => {
    if (!configItems.filter) {
      if (result?.errorNumber !== '666') {
        resetValue();
      }
    }
  }, [dispatch, configItems, result]);

  const onSubmitHandler = (values: any) => {
    const newItems = new ConfigItemFilter(values);

    newItems.vendorNameList = values.vendorName === undefined ? '' : values.vendorName.join(';');
    newItems.vendorTypeList = values.vendorType === undefined ? '' : values.vendorType.join(';');
    newItems.customerIDList = values.customer === undefined ? '' : values.customer.join(';');
    newItems.departmentList = values.department === undefined ? '' : values.department.join(';');

    newItems.column = 'poNumber';
    newItems.sorting = 'descending';
    newItems.page = 1;
    newItems.pageSize = 10;
    // newItems.userLoginID = currentUser.employeeID;

    dispatch(ConfigItemsActions.reqConfigItemsListFilter(newItems, 'PERPAGE')).then(() => {
      dispatch(ConfigItemsActions.setActivePageListConf(1));
    });
  };

  const resetValue = () => {
    setInitialValue({
      poDateStartDate: null,
      poDateEndDate: null,
      poCloseDateStartDate: null,
      poCloseDateEndDate: null,
      department: [],
      vendorName: [],
      vendorType: [],
      customer: [],
    });
  };

  const onCancel = () => {
    if (configItems.search) {
      dispatch(
        ConfigItemsActions.reqConfigItemsListSearch(
          1,
          10,
          configItems.column,
          configItems.sorting,
          configItems.search.search as any,
          currentUser.employeeID,
          'PERPAGE'
        )
      );
    } else {
      dispatch(ConfigItemsActions.reqConfigItemsList(1, 10, configItems.column, configItems.sorting, currentUser.employeeID));
    }
    dispatch(ConfigItemsActions.setActivePageListConf(1));
    dispatch(SidebarContainerActions.CLOSE());
    resetValue();
  };

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={(values: any) => onSubmitHandler(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
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
                <h4 className={styles.FilterSubtitle}>PO Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="poDateStartDate" labelName="PO Start Date" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="poDateEndDate" labelName="PO End Date" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>PO Close Date Range</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="poCloseDateStartDate" labelName="PO Close Start Date" component={DateInput} placeholder="Start Date" date={true} />
                <Field name="poCloseDateEndDate" labelName="PO Close End Date" component={DateInput} placeholder="End Date" date={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Vendor Name</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="vendorName" component={DropdownInput} options={selectVendor} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Vendor Type</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="vendorType" component={DropdownInput} options={selectVendorType} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Customer</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="customer" component={DropdownInput} options={selectCustomer} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Departement</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="department" component={DropdownInput} options={selectDepartment} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button fluid color="blue" disabled={isRequesting} loading={isRequesting}>
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
    ></FinalForm>
  );
};

export default AdvancedSearch;

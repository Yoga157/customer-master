import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Header } from 'semantic-ui-react';
import styles from './InputSearch.module.scss';
import IStore from 'models/IStore';
import KpiDashboardFilter from '../../../../../stores/kpi/kpi-dashboard/models/KpiDashboardFilter';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Button, DropdownInput, SelectInput } from 'views/components/UI';
import { selectDropdownYear } from 'selectors/kpi/kpi-data/KpiDataSelector';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { combineValidators, isRequired } from 'revalidate';

interface IProps {
  setSearchText: (text: string) => void;
  setBtnCancel: (btnCancel: boolean) => void;
}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { setSearchText, setBtnCancel } = props;
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const yearOptions = useSelector((state: IStore) => selectDropdownYear(state));
  const [year, setYear] = useState();

  const onSubmitHandler = (values: any) => {
    // const filter = new KpiDashboardFilter(values);
    dispatch(KpiDataActions.requestKpiDashboardDeptDatas(+values.filterYear, currentUser.userName, 1, 15));
    dispatch(KpiDataActions.requestKpiDashboardDatas(+values.filterYear, currentUser.userName, 1, 15));
    dispatch(KpiDataActions.setActivePageDept(1));
    dispatch(KpiDataActions.setActivePage(1));
    setBtnCancel(false);
    setSearchText('');
  };

  const onCancel = () => {
    dispatch(KpiDataActions.requestKpiDashboardDeptDatas(new Date().getFullYear(), currentUser.userName, 1, 15));
    dispatch(KpiDataActions.requestKpiDashboardDatas(new Date().getFullYear(), currentUser.userName, 1, 15));
    dispatch(KpiDataActions.setActivePageDept(1));
    dispatch(KpiDataActions.setActivePage(1));
    dispatch(SidebarContainerActions.CLOSE());
  };

  useEffect(() => {
    dispatch(KpiDataActions.requestDropdownYear());
  }, [dispatch]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      KpiDataActions.REQUEST_DROPDOWN_YEAR,
      KpiDataActions.REQUEST_KPI_DASHBOARD_DATAS,
      KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_DATAS,
    ])
  );

  const validate = combineValidators({
    filterYear: isRequired('Effective Date'),
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      render={({ handleSubmit, invalid, pristine }) => (
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
                <h4 className={styles.FilterSubtitle}>Year</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterYear" component={SelectInput} options={yearOptions} disabled={isRequesting} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button fluid color="blue" disabled={isRequesting || invalid} loading={isRequesting}>
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

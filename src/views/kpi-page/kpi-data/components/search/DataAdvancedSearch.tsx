import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Header } from 'semantic-ui-react';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import styles from './InputSearch.module.scss';
import { Button, DropdownInput, SelectInput } from 'views/components/UI';
import KpiDataFilter from '../../../../../stores/kpi/kpi-data/models/KpiDataFilter';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import { selectDropdownPIC, selectDropdownYear } from 'selectors/kpi/kpi-data/KpiDataSelector';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  setSearchText: (text: string) => void;
  setBtnCancel: (btnCancel: boolean) => void;
}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { setSearchText, setBtnCancel } = props;

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(KpiDataActions.requestDropdownPic(currentUser.userName));
    dispatch(KpiDataActions.requestDropdownYear());
  }, [dispatch]);

  const picOptions = useSelector((state: IStore) => selectDropdownPIC(state));
  const yearOptions = useSelector((state: IStore) => selectDropdownYear(state));

  const onSubmitHandler = (values: any) => {
    const filter = new KpiDataFilter(values);
    filter.userLogin = currentUser.userName;
    filter.tahun = values.filterYear === undefined ? new Date().getFullYear() : Number(values.filterYear);
    filter.pic = values.filterPic === undefined ? '' : values.filterPic.join(',');
    filter.page = 1;
    filter.pageSize = 25;

    dispatch(KpiDataActions.postKPIFilter(filter));
    dispatch(KpiDataActions.setActivePage(1));
    dispatch(KpiDataActions.setActiveYear(Number(values.filterYear)));
    setSearchText('');
    setBtnCancel(false);
  };

  const onCancel = () => {
    dispatch(KpiDataActions.requestKpiDatas(new Date().getFullYear(), currentUser.userName, 1, 25));
    dispatch(KpiDataActions.setActivePage(1));
    dispatch(SidebarContainerActions.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [KpiDataActions.REQUEST_DROPDOWN_YEAR, KpiDataActions.REQUEST_DROPDOWN_PIC, KpiDataActions.REQUEST_POST_KPI_FILTER])
  );
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
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
                <h4 className={styles.FilterSubtitle}>Year</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterYear" component={SelectInput} options={yearOptions} disabled={isRequesting} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>PIC</h4>
              </Grid.Column>
              <Grid.Column width={16}>
                <Field name="filterPic" component={DropdownInput} options={picOptions} disabled={isRequesting} />
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

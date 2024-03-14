import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { History } from 'history';
import { Grid, Header, Tab } from 'semantic-ui-react';
import Jumbotrons from './components/jumbotrons/Jumbotrons';
import KpiPICListByDeptTable from './components/table/KpiPICListByDeptTable';
import KpiSummaryByPICTable from './components/table/KpiSummaryPICTable';
import { Pagination } from 'views/components/UI';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import IKpiDataTable from 'selectors/kpi/kpi-data/models/IKpiDataTable';
import IKpiDataDashboardDeptTable from 'selectors/kpi/kpi-data/models/IKpiDataDashboardDeptTable';
import { selectKpiDashboardDatas, selectKpiDashboardDeptDatas } from 'selectors/kpi/kpi-data/KpiDataSelector';

interface IProps {
  history: History;
}

const KpiDashboardPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [currentYears] = useState(new Date().getFullYear());

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const activePage: number = useSelector((state: IStore) => state.kpiData.activePage);
  const activePageDept: number = useSelector((state: IStore) => state.kpiData.activePageDept);

  useEffect(() => {
    dispatch(KpiDataActions.requestKpiDashboardDatas(currentYears, currentUser.userName, activePage, pageSize));
    dispatch(KpiDataActions.requestKpiDashboardDeptDatas(currentYears, currentUser.userName, activePageDept, pageSize));
  }, [dispatch, activePage, pageSize, currentUser.userName]);

  const handlePaginationChange = (e: any, data: any, paginList: string) => {
    if (paginList === 'summary') {
      dispatch(KpiDataActions.setActivePage(data.activePage));
    } else {
      dispatch(KpiDataActions.setActivePageDept(data.activePage));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      KpiDataActions.REQUEST_KPI_DASHBOARD_DATAS,
      KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_DATAS,
      KpiDataActions.REQUEST_KPI_DASHBOARD_DATA_SEARCH,
      KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_SEARCH,
    ])
  );

  const kpiDataTable: IKpiDataTable = useSelector((state: IStore) => selectKpiDashboardDatas(state));
  const kpiDataDeptTable: IKpiDataDashboardDeptTable = useSelector((state: IStore) => selectKpiDashboardDeptDatas(state));

  const showTablesKpi = (
    <Grid columns="equal" doubling={true}>
      <Grid.Column className="FullGrid1200" computer={10} tablet={16}>
        <Header as="h4">
          <Header.Content>Summary By PIC</Header.Content>
        </Header>
        <KpiSummaryByPICTable tableData={kpiDataTable} />
        <Pagination
          activePage={activePage}
          onPageChange={(e, data) => handlePaginationChange(e, data, 'summary')}
          totalPage={kpiDataTable.totalRow}
          pageSize={pageSize}
        />
      </Grid.Column>
      <Grid.Column className="FullGrid1200" computer={6} tablet={16}>
        <Header as="h4">
          <Header.Content>PIC List By Dept</Header.Content>
        </Header>
        <KpiPICListByDeptTable tableData={kpiDataDeptTable} />
        <Pagination
          activePage={activePage}
          onPageChange={(e, data) => handlePaginationChange(e, data, 'dept')}
          totalPage={kpiDataDeptTable.totalRow}
          pageSize={pageSize}
        />
      </Grid.Column>
    </Grid>
  );

  const showJumbotron = (
    <div className="kpi--container">
      <Jumbotrons />
    </div>
  );

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        {/* {showJumbotron} */}
        {showTablesKpi}
      </LoadingIndicator>
    </Fragment>
  );
};

export default KpiDashboardPage;

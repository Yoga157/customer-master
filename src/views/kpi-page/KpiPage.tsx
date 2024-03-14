import React, { Fragment, useState } from 'react';
import { History } from 'history';
import { Tab, Menu, Grid, Header, Table } from 'semantic-ui-react';
import KpiDashboard from './kpi-dashboard/KpiDashboard';
import KpiData from './kpi-data/KpiData';
import KpiSetting from './kpi-setting/KpiSetting';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import DashboardSearch from './kpi-dashboard/components/search/DashboardSearch';
import DataSearch from './kpi-data/components/search/DataSearch';
import SettingSearch from './kpi-setting/components/search/SettingSearch';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import './KpiPageStyle.scss';

interface IProps {
  history: History;
}

const KpiPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { history } = props;
  const dispatch: Dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState('kpi-dashboard');
  const [tabActive, setTab] = useState(0);
  const [pageSize, setPage] = useState(15);
  const [activePage, setActivePage] = useState(1);

  const handleMenuClick = (e: any, { name: any }) => {
    // console.log(name);
    console.log(e);
  };

  const showDashboardPane = <KpiDashboard history={history} />;

  const showDataPane = <KpiData history={history} />;

  const showSettingPane = <KpiSetting history={history} />;

  // const panes = [
  //     {
  //         menuItem: <Menu.Item className='kpi__item' key='kpi-dashboard'><Header as="h4"><Header.Content>Dashboard</Header.Content></Header></Menu.Item>,
  //         render: () =>
  //         <Tab.Pane className="kpi__pane" attached={false}>
  //             {showDashboardPane}
  //         </Tab.Pane>,
  //       },
  //       {
  //         menuItem:  <Menu.Item className='kpi__item' key='kpi-data'><Header as="h4"><Header.Content>KPI Data</Header.Content></Header></Menu.Item>,
  //         render: () =>
  //         <Tab.Pane className="kpi__pane" attached={false}>
  //             {showDataPane}
  //         </Tab.Pane>,
  //       },
  //       {
  //         menuItem: <Menu.Item className='kpi__item' key='kpi-setting'><Header as="h4"><Header.Content>Setting</Header.Content></Header></Menu.Item>,
  //         render: () =>
  //         <Tab.Pane className="kpi__pane" attached={false} >
  //             {showSettingPane}
  //         </Tab.Pane>,
  //       },
  // ];

  const panes = [
    {
      menuItem: 'Dashboard',
      render: () => <Tab.Pane attached={false}>{showDashboardPane}</Tab.Pane>,
    },
    {
      menuItem: 'Kpi Data',
      render: () => <Tab.Pane attached={false}>{showDataPane}</Tab.Pane>,
    },
    /* {
      menuItem: 'Setting',
      render: () => <Tab.Pane attached={false}>{showSettingPane}</Tab.Pane>,
    }, */
  ];

  // let isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [KpiActions.REQUEST_POST_KPI_FILTER, KpiActions.REQUEST_SUMMARY_BY_PIC, KpiActions.REQUEST_KPI_SEARCH, KpiActions.REQUEST_POST_PIC_LIST_BY_DEPT]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onTabChange = (e, data) => {
    dispatch(KpiDataActions.setActivePageDept(1));
    dispatch(KpiDataActions.setActivePage(1));
    // console.log("Data KPI Page", data);
    setTab(data.activeIndex);
    if (data.activeIndex === 0) {
      // request Summary By PIC & PIC List By Dept
      // dispatch(KpiActions.requestFunnel(currentUser.employeeID, currentUser.role,'kpiGenID','descending', activePage, pageSize));
    } else if (data.activeIndex === 1) {
      // request KPI Details
    } else if (data.activeIndex === 2) {
      // request Setting
    }
  };

  const showSearch = (param: number) => {
    switch (param) {
      case 0:
        return <DashboardSearch />;
      case 1:
        return <DataSearch />;
      case 2:
        return <SettingSearch />;
    }
  };

  return (
    <Fragment>
      {/* <div className='kpi__container'>
                <Tab menu={{ pointing: false, style: { display: "flex", justifyContent: "center", backgroundColor: "transparent", border: "none", boxShadow: "none" } }} panes={panes} />
            </div> */}

      {/* <LoadingIndicator isActive={isRequesting}> */}
      <Grid className="mt-10r">
        <Grid.Column textAlign="center">{showSearch(tabActive)}</Grid.Column>
      </Grid>

      <Grid columns="equal">
        <Grid.Column>
          <Tab className="DqTabSt01 KpiPage" menu={{ secondary: true, pointing: false }} panes={panes} onTabChange={onTabChange} />
        </Grid.Column>
      </Grid>
      {/* </LoadingIndicator> */}
    </Fragment>
  );
};

export default KpiPage;

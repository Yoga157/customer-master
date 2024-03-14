import './FunnelPageStyle.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Header, Tab, List, Label, Menu } from 'semantic-ui-react';
// import FunnelTable from './components/funnel-main/table/FunnelTable';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import IFunnelTable from 'selectors/funnel/models/IFunnelTable';
import IStore from 'models/IStore';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectFunnelFilter, selectFunnels } from 'selectors/funnel/FunnelSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Pagination, Tooltips, Button } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import { format } from 'date-fns';
import TableToExcel from '@linways/table-to-excel';
import { selectFunnelOpportunity } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import * as FunnelOpportunityA from 'stores/funnel-opportunity/FunnelActivityActions';
import InputSearch from './components/search/InputSearch';
import CustomerCreditTable from './components/table/CustomerCreditTable';
import * as CustomerCreditActions from 'stores/customer-credit-service/CustomerCreditActions';
import { selectListSales } from 'selectors/customer-credit-service/CustomerCreditServiceSelector';

interface IProps {
  readonly history: any;
}

const FunnelPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [tabActive, setTab] = useState(0);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const direction: string = useSelector((state: IStore) => state.funnel.data.sorting);
  const columnsorting: string = useSelector((state: IStore) => state.funnel.data.column);

  useEffect(() => {
    dispatch(CustomerCreditActions.requestCustomerCreditSales(activePage, pageSize, currentUser.employeeID));
  }, []);

  const handlePaginationChange = (e: any, data: any) => {
    console.log('handlepagubf');
  };

  const onTabChange = (e: any, data: any) => {
    console.log(data.activeIndex);
    setTab(data.activeIndex);
    if (data.activeIndex == 0) {
      // dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', activePage, pageSize));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_POST_FUNNEL_FILTER, FunnelActions.REQUEST_FUNNELS, FunnelActions.REQUEST_FUNNELS_SEARCH])
  );
  const funnelTables: IFunnelTable = useSelector((state: IStore) => selectFunnels(state));
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const tableData = useSelector((state: IStore) => selectListSales(state));

  const panes = [
    /* {
      menuItem: 'Customer',
      render: () => (
        <Tab.Pane attached={false}>
          <CustomerCreditTable history={props.history} type="customer" tableData={tableData} />
        </Tab.Pane>
      ),
    }, */
    {
      menuItem: <Menu.Item key="opportunity">Sales</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <CustomerCreditTable history={props.history} type="sales" tableData={tableData} />
        </Tab.Pane>
      ),
    },
  ];

  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid className="mt-10r">
          <Grid.Column textAlign="center">{<InputSearch />}</Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">Customer Credit Service</Header.Content>
            </Header>
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column className="DqTabSt01">
            <CustomerCreditTable history={props.history} type="sales" tableData={tableData} />
            {/* <Tab className="DqTabSt01" menu={{ secondary: true, pointing: false }} panes={panes} onTabChange={onTabChange} /> */}
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default FunnelPage;

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';

import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectDelegationList } from 'selectors/delegation/DelegationSelectors';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IListDelegation from 'selectors/delegation/models/IListDelegation';
import * as DelegationActions from 'stores/delegation/DelegationActions';
import SearchDelegation from './components/search/SearchDelegation';
import DelegationTable from './components/table/DelegationTable';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Button, Pagination } from '../components/UI/';
import RouteEnum from 'constants/RouteEnum';

interface IProps {
  //history:History
}

const DelegationPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState('');
  const [pageSize] = useState(10);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(DelegationActions.requestDelegation(currentUser.employeeID, activePage, pageSize));
  }, [dispatch, currentUser]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    if (search) {
      dispatch(DelegationActions.requestDelegation(currentUser.employeeID, activePage, pageSize, search));
    } else {
      dispatch(DelegationActions.requestDelegation(currentUser.employeeID, activePage, pageSize));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [DelegationActions.REQUEST_DELEGATION]));
  const delegationList: IListDelegation = useSelector((state: IStore) => selectDelegationList(state, [DelegationActions.REQUEST_DELEGATION]));

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            <SearchDelegation setSearch={setSearch} setActivePage={setActivePage} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">Delegation List</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Link to={RouteEnum.DelegationCard}>
              <Button icon="plus" color="yellow" disabled={false} floated="right" content="Add Delegation" />
            </Link>
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <DelegationTable tableData={delegationList} setActivePage={setActivePage} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={delegationList.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default DelegationPage;

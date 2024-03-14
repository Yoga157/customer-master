import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { History, LocationState } from 'history';
import { Grid, Header } from 'semantic-ui-react';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import BreadCumb from '../../components/breadcumb/BreadCumb';
import PSSTable from './../components/table/PSSTable';
import * as PssActions from 'stores/pss/PSSActions';
import { Pagination } from 'views/components/UI';

interface RouteParams {
  funnelGenID: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const ProjectScopeList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PssActions.GET_LIST_PSS]));
  const listPSS = useSelector((state: IStore) => state.pss.PSSList);

  useEffect(() => {
    dispatch(PssActions.getListPSS(activePage, +props?.match?.params?.funnelGenID));
  }, [dispatch, activePage]);

  const handlePaginationChange = (e, data) => {
    setActivePage(data.activePage);
  };

  return (
    <>
      <BreadCumb link={`/funnel-form/${props?.match?.params?.funnelGenID}`} title={'Back to View/Edit'} />

      <LoadingIndicator isActive={isRequesting}>
        {/* <Grid columns="equal">
            <Grid.Column textAlign="center">
              <Search searchText={searchText} setSearchText={setSearchText} setActivePage={setActivePage} />
            </Grid.Column>
          </Grid> */}
        <Grid columns="equal" className="mt-3r">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">Project Scope Statement List</Header.Content>
            </Header>
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            {/* <div className="wrapper-table"> */}
            <div className="mb-1">
              <PSSTable tableData={listPSS.rows} funnelGenID={props?.match?.params?.funnelGenID} />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={listPSS.totalRows}
              pageSize={10}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </>
  );
};

export default withRouter(ProjectScopeList);

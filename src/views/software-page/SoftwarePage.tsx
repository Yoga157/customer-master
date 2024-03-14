import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import { selectSoftwares } from 'selectors/software/SoftwareSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import SoftwareTable from './components/table/SoftwareTable';
import { Dispatch } from 'redux';
import ISoftwareTable from 'selectors/software/models/ISoftwareTable';
import { Button, Pagination } from '../components/UI/';
import { Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import SoftwareForm from 'views/software-page/components/form/form-create/SoftwareForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import SoftwareHeaderModel from 'stores/software/models/SoftwareHeaderModel';
import SoftwareMainModel from 'stores/software/models/SoftwareMainModel';
import { selectSoftware, selectSoftwareMain } from 'selectors/software/SoftwareSelector';
import SearchSoftware from './components/search/SearchSoftware';

interface IProps {
  //history:History
}

const SoftwarePage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [searchText, setSearchText] = useState('');
  const [activePage, setActivePage] = useState(1);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(SoftwareActions.requestSoftwares(activePage, pageSize));
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    if (searchText.length > 0) {
      dispatch(SoftwareActions.requestSoftwareSearch(searchText, 1, 15));
    } else {
      dispatch(SoftwareActions.requestSoftwares(data.activePage, pageSize));
    }
  };
  const onAddNewSoftware = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<SoftwareForm id={0} type={'add'} />, ModalSizeEnum.Small));
  }, [dispatch]);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [SoftwareActions.REQUEST_SOFTWARES, SoftwareActions.REQUEST_SOFTWARES_SEARCH])
  );
  const softwareTables: ISoftwareTable = useSelector((state: IStore) => selectSoftwares(state, [SoftwareActions.REQUEST_SOFTWARES]));

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            <SearchSoftware searchText={searchText} setSearchText={setSearchText} setActivePage={setActivePage} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">Software Tools</Header.Content>
            </Header>
          </Grid.Column>
          {currentUser.role == 'Sales' ? null : (
            <Grid.Column>
              <Button icon="plus" color="yellow" disabled={false} floated="right" onClick={onAddNewSoftware} content="Add Software" />
            </Grid.Column>
          )}
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <div className="wrapper-table">
              <SoftwareTable tableData={softwareTables} />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={softwareTables.totalRows}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default SoftwarePage;

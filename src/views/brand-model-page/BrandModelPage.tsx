import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as BrandTypeActions from 'stores/brand-model/BrandTypeAction';
import { selectBrandModels } from 'selectors/brand-model/BrandModelSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import BrandModelTable from './components/table/BrandModelTable';
import { Dispatch } from 'redux';
import IBrandModelTable from 'selectors/brand-model/models/IBrandModelTable';
import { Button, Pagination } from '../components/UI/';
import { Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import SearchBrand from './components/search/SearchBrand';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  //history:History
}

const BrandModelPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [searchText, setSearchText] = useState('');
  const [activePage, setActivePage] = useState(1);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(BrandTypeActions.requestBrandModels(activePage, pageSize));
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    if (searchText.length > 1) {
      dispatch(BrandTypeActions.requestBrandModelSearch(searchText, data.activePage, 15));
    } else {
      dispatch(BrandTypeActions.requestBrandModels(data.activePage, pageSize));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [BrandTypeActions.REQUEST_BRAND_MODELS, BrandTypeActions.REQUEST_BRAND_MODELS_SEARCH])
  );
  const brandModelTables: IBrandModelTable = useSelector((state: IStore) => selectBrandModels(state, [BrandTypeActions.REQUEST_BRAND_MODELS]));
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            <SearchBrand searchText={searchText} setSearchText={setSearchText} setActivePage={setActivePage} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">Brand Model List</Header.Content>
            </Header>
          </Grid.Column>
          {currentUser.role == 'SuperAdmin' ||
            (currentUser.role == 'Product Manager' && (
              <Grid.Column>
                <Link to={RouteEnum.BrandModelCard}>
                  <Button icon="plus" color="yellow" disabled={false} floated="right" content="Add Brand Model" />
                </Link>
              </Grid.Column>
            ))}
        </Grid>
        <Grid columns="equal">
          <Grid.Column >
            <div className="wrapper-table">
              <BrandModelTable tableData={brandModelTables} />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={brandModelTables.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default BrandModelPage;

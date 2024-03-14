import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from '../../models/IStore';
import * as ServiceCatalogActions from '../../stores/service-catalog/ServiceCatalogActions';
import { selectServiceCatalogs } from '../../selectors/service-catalog/ServiceCatalogSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import ServiceCatalogTable from './components/table/ServiceCatalogTable';
import { Dispatch } from 'redux';
import IServiceCatalogTable from 'selectors/service-catalog/models/IServiceCatalogTable';
import { Button, Pagination } from '../components/UI/';
import { Button as UIButton } from 'semantic-ui-react';
import InputSearch from 'views/funnel-page/components/search/InputSearch';
import { Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import RouteEnum from '../../constants/RouteEnum';
import { History } from 'history';
import SearchServiceCatalog from './components/search/SearchServiceCatalog';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ToolTips from 'views/components/UI/Tooltip/ToolTip';
import TableToExcel from '@linways/table-to-excel';
import { format } from 'date-fns';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { CheckBox } from 'views/components/UI';

interface IProps {
  history: History;
}

const ServiceCatalogPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState('');

  const isActive: boolean = useSelector((state: IStore) => state.serviceCatalog.isActive);
  const [exporting, setExporting] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ServiceCatalogActions.REQUEST_SERVICE_CATALOGS, ServiceCatalogActions.REQUEST_SERVICE_CATALOG_SEARCH])
  );
  const serviceCatalogTables: IServiceCatalogTable = useSelector((state: IStore) =>
    selectServiceCatalogs(state, [ServiceCatalogActions.REQUEST_SERVICE_CATALOGS])
  );
  const onSubmitHandler = (values: any) => {};

  useEffect(() => {
    dispatch(ServiceCatalogActions.requestServiceCatalog(currentUser.employeeID, isActive ? 1 : 0, activePage, pageSize));
  }, [dispatch]);

  const generateExcel = () =>{
    // if (isRequesting == false) {
      setExporting(true);
      let tableSelect: any;

      tableSelect = document.getElementById('export-service-catalog') as HTMLTableElement;

      TableToExcel.convert(tableSelect, {
        name: 'ServiceCatalog ' + format(new Date(), 'cccc LLLL d, yyyy') + '.xlsx',
        sheet: {
          name: 'Sheet 1',
        },
      });
      setTimeout(() => {
        setExporting(false);
      }, 100);
    // }
  }

  const exportTableToExcel = (): void => {
    
    setActivePage(1);
    if (search.length > 1) {
      dispatch(ServiceCatalogActions.requestServiceCatalogSearch(currentUser.employeeID, search, activePage, pageSize))
        .then(()=>{generateExcel()})
         .then(()=>{dispatch(ServiceCatalogActions.requestServiceCatalogSearch(currentUser.employeeID, search, activePage, pageSize))});
    } else {
      dispatch(ServiceCatalogActions.requestServiceCatalog(currentUser.employeeID, isActive ? 1 : 0, activePage, serviceCatalogTables.totalRow))
        .then(()=>{generateExcel()})
          .then(()=>{dispatch(ServiceCatalogActions.requestServiceCatalog(currentUser.employeeID, isActive ? 1 : 0, activePage, pageSize))});
    }
  };

  const filterList = (): void => {
    dispatch(ServiceCatalogActions.flagActive(!isActive));
    dispatch(ServiceCatalogActions.requestServiceCatalog(currentUser.employeeID, !isActive ? 1 : 0, activePage, pageSize));
  };

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    if (search.length > 1) {
      dispatch(ServiceCatalogActions.requestServiceCatalogSearch(currentUser.employeeID, search, data.activePage, pageSize));
    } else {
      dispatch(ServiceCatalogActions.requestServiceCatalog(currentUser.employeeID, isActive ? 1 : 0, data.activePage, pageSize));
    }
  };
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            <SearchServiceCatalog setSearch={setSearch} setActivePage={setActivePage} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal" padded>
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content>Service Catalog List</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <ToolTips
              content="Export this Service Catalog"
              trigger={
                <Button
                  className="m-05r"
                  icon="file excel"
                  size="small"
                  color="blue"
                  content="Export Excel"
                  floated="right"
                  onClick={() => exportTableToExcel()}
                />
              }
            />
            <Link to={RouteEnum.ServiceCatalogCard}>
              <ToolTips
                content="Add Service Catalog"
                trigger={<Button icon="plus" className="m-05r" color="yellow" disabled={false} floated="right" content="Add Service Catalog" />}
              />
            </Link>
            {/* <FinalForm
              onSubmit={(values: any) => onSubmitHandler(values)}
              //initialValues={serviceCatalog}
              render={() => (
                <Form>
                  <Grid.Column>
                    <span>InActive</span>
                    <span>
                      <Field
                        name={'asd'}
                        toggle
                        component={CheckBox}
                        // disabled={disableComponent}
                        //disabled
                        //checked={true}
                        //onChange={(e, checked) => handleChecked(e, checked, 'hardware')}
                      />
                    </span>
                    <span>Active</span>
                  </Grid.Column>
                </Form>
              )}
            /> */}
            <ToolTips
              content={!isActive ? 'Service Active' : 'Service Inactive'}
              trigger={
                <Button
                  className="m-05r"
                  icon={!isActive ? 'toggle on' : 'toggle off'}
                  size="small"
                  color="green"
                  content={!isActive ? 'Service Active' : 'Service Inactive'}
                  floated="right"
                  onClick={() => filterList()}
                />
              }
            />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <ServiceCatalogTable exporting={exporting} tableData={serviceCatalogTables} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={serviceCatalogTables.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default ServiceCatalogPage;

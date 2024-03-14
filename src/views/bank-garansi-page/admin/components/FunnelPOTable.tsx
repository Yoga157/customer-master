import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import FunnelPOTables from './table/FunnelPOTable';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastActions from 'stores/toasts/ToastsAction';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput, SearchInput, Pagination } from 'views/components/UI';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectFunnelPO } from 'selectors/bank-garansi/BankGaransiSelector';
import FunnelSearchPOModel from 'stores/bank-garansi/models/FunnelSearchPOModel';
import { selectEmployeeFunnelSA } from 'selectors/select-options/EmployeeSelector';
import axios from 'axios';
import environment from 'environment';
import ToastEnum from 'constants/ToastStatusEnum';
import { selectCustomerSearchFunnelSA } from 'selectors/select-options/CustomerSelector';

interface IProps {
  //history: any;
  modals: string;
}

interface ISearchObject {
  page: number;
  pageSize: number;
  po: string;
  customer: string;
  supplier: string;
  bu: string;
  orderDate: string;
}

const FunnelPOTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [supplierList, setSupplierList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [searchObject, setSearchObject] = useState<ISearchObject>({
    page: activePage,
    pageSize: pageSize,
    po: '',
    customer: '',
    supplier: '',
    bu: '',
    orderDate: 'undefined',
  });
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [title, setTitle] = useState('PO');

  useEffect(() => {
    const searchModel = new FunnelSearchPOModel(searchObject);
    dispatch(BankGaransiActions.requestSearchFunnelPO(searchModel));
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    const { po, customer, supplier, bu, orderDate } = searchObject;
    if (po != '' || customer != '' || supplier != '' || bu != '' || orderDate != '') {
      const searchModel = new FunnelSearchPOModel(searchObject);
      searchModel.page = data.activePage;
      //console.log(searchModel);
      dispatch(BankGaransiActions.requestSearchFunnelPO(searchModel));
    } else {
      //dispatch(BankGaransiActions.requestFunnelSA(data.activePage, pageSize, currentUser.userName));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [BankGaransiActions.REQUEST_FUNNEL_PO_TABLE, BankGaransiActions.REQUEST_SEARCH_FUNNEL_PO_TABLE])
  );

  const tableData = useSelector((state: IStore) => selectFunnelPO(state));

  const onSubmitHandler = (va: any) => {};

  const onHandleSearch = (val: any) => {
    setTitle('Searched PO');
    const searchModel = new FunnelSearchPOModel(searchObject);
    dispatch(BankGaransiActions.requestSearchFunnelPO(searchModel));
  };

  const getSupplierList = (supplier: string) => {
    const controllerName = `BankGuarantee/GetSupplierBySearch?text=${supplier}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
    axios
      .get(endpoint)
      .then((res) => {
        setSupplierList(res.data);
      })
      .catch((err) => {
        dispatch(ToastActions.add(err.message, ToastEnum.Error));
      });
  };

  const getCustomerList = (customer: string) => {
    const controllerName = `BankGuarantee/GetCustomerBySearch?text=${customer}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
    axios
      .get(endpoint)
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((err) => {
        dispatch(ToastActions.add(err.message, ToastEnum.Error));
      });
  };

  const handleSearchSupplier = (data: any) => {
    setSearchObject({ ...searchObject, supplier: data });
    if (data.length > 2) {
      getSupplierList(data);
    }
  };

  const handleSearchChangeCust = (data: any) => {
    setSearchObject({ ...searchObject, customer: data });
    if (data.length > 2) {
      //dispatch(CustomerActions.requestCustomerByName(data));
      getCustomerList(data);
    }
  };

  const onCancelClick = () => {
    setTitle('PO');

    setActivePage(1);
    /* setSearchObject({
      ...searchObject,
      page: 1,
      pageSize: 10,
      funnelGenID: '',
      saNo: '',
      projectName: '',
      customerName: '',
      salesName: '',
      funnelDate: '',
      saDate: '',
      so: '',
    }); */

    dispatch(BankGaransiActions.requestFunnelSA(1, 10, currentUser.userName));
  };
  // const moveToAdd = () => {
  //   dispatch(ModalAction.OPEN(
  //     <FormAdd history={props.history}
  //       />,ModalSizeEnum.Tiny));
  // }

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            {/* {window.location.pathname === "/data-quality/funnel-opportunity" ? <InputSearch /> : null } */}
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content>{title}</Header.Content>
            </Header>
          </Grid.Column>
        </Grid>

        <FinalForm
          onSubmit={(values: any) => onSubmitHandler(values)}
          render={({ handleSubmit, pristine, invalid }) => (
            <Form onSubmit={handleSubmit}>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Field
                      name="po"
                      component={TextInput}
                      placeholder="e.g. PO.."
                      labelName="PO"
                      onChange={(val: any) => setSearchObject({ ...searchObject, po: val })}
                      defaultValue={searchObject.po}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      name="vendor"
                      component={SearchInput}
                      placeholder="e.g. Vendor.."
                      labelName="Vendor"
                      handleSearchChange={handleSearchSupplier}
                      onResultSelect={(data: any) => setSearchObject({ ...searchObject, supplier: data.result.title })}
                      results={
                        supplierList.length != 0 &&
                        supplierList.map((item) => {
                          const data = {
                            title: item,
                          };
                          return data;
                        })
                      }
                      defaultValue={searchObject.supplier}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      name="customer"
                      component={SearchInput}
                      placeholder="e.g. Customer Name.."
                      labelName="Customer Name"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={(data: any) => setSearchObject({ ...searchObject, customer: data.result.title })}
                      results={
                        customerList.length != 0 &&
                        customerList.map((item) => {
                          const data = {
                            title: item,
                          };
                          return data;
                        })
                      }
                      defaultValue={searchObject.customer}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ marginBottom: 20 }}>
                  <Grid.Column width={4}>
                    <Button.Group>
                      <Button onClick={onCancelClick}>Cancel</Button>
                      <Button.Or />
                      <Button icon="search" content="Search" primary onClick={onHandleSearch}>
                        Search
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        />

        <Grid columns="equal">
          <Grid.Column>
            <FunnelPOTables modals={props.modals} tableData={tableData} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={tableData.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default FunnelPOTable;

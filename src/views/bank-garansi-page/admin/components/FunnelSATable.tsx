import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import FunnelSATable from './table/FunnelSATable';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import * as FunnelActions from 'stores/funnel-opportunity/FunnelActivityActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastActions from 'stores/toasts/ToastsAction';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput, SearchInput, Pagination } from 'views/components/UI';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectFunnelSA } from 'selectors/bank-garansi/BankGaransiSelector';
import FunnelSearchSAModel from 'stores/bank-garansi/models/FunnelSearchSAModel';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectEmployeeFunnelSA } from 'selectors/select-options/EmployeeSelector';
import axios from 'axios';
import environment from 'environment';
import ToastEnum from 'constants/ToastStatusEnum';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectCustomerSearchFunnelSA } from 'selectors/select-options/CustomerSelector';

interface IProps {
  //history: any;
  modals: string;
  bondTypes: string;
  pFunnelGenID: number;
}

interface ISearchObject {
  page: number;
  pageSize: number;
  funnelGenID: string;
  saNo: string;
  projectName: string;
  customerName: string;
  salesName: string;
  funnelDate: string;
  saDate: string;
  so: string;
  bondType: string;
}

const FunnelSATables: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [projectList, setProjectList] = useState([]);
  const [searchObject, setSearchObject] = useState<ISearchObject>({
    page: activePage,
    pageSize: pageSize,
    funnelGenID: '',
    saNo: '',
    projectName: '',
    customerName: '',
    salesName: '',
    funnelDate: '',
    saDate: '',
    so: '',
    bondType: '',
  });
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [title, setTitle] = useState('Funnel/SA');

  useEffect(() => {
    dispatch(BankGaransiActions.requestFunnelSA(1, 10, currentUser.userName));
  }, [currentUser.userName]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    const { saNo, funnelGenID, projectName, customerName, salesName, funnelDate, saDate, so } = searchObject;

    if (
      funnelGenID != '' ||
      saNo != '' ||
      projectName != '' ||
      customerName != '' ||
      salesName != '' ||
      funnelDate != '' ||
      saDate != '' ||
      so != '' ||
      props.bondTypes != ''
    ) {
      const searchModel = new FunnelSearchSAModel(searchObject);
    } else {
      dispatch(BankGaransiActions.requestFunnelSA(data.activePage, pageSize, currentUser.userName));
    }
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    const searchMarketing = document.querySelector(
      '#root > div.ui.container > div > div:nth-child(1) > div > div > input[type=text]'
    )! as HTMLInputElement;

    if (searchMarketing.value.length > 0) {
      dispatch(FunnelActions.requestSearchMarketing(1, tableData.totalRow, searchMarketing.value));
    } else {
      dispatch(FunnelActions.requestFunnelOpp(1, tableData.totalRow, 'FunnelOpportunityID', 'ascending'));
    }

    if (isRequesting == false) {
      /* setTimeout(()=> {
        let tableSelect = document.getElementById("exportopp") as HTMLTableElement;
        let tableHead = document.querySelector("#exportopp > thead > tr > th:nth-child(1)") as HTMLTableElement
        tableHead.style.display = "none"
        for (let i = 0; i < tableSelect.rows.length; i++) {
          let firstCol = tableSelect.rows[i].cells[0];
          firstCol.remove();
       }
       TableToExcel.convert(tableSelect,{
        name:  "FunnelOpportunity" + currDate + ".xlsx",
        sheet: {
          name: "Sheet 1"
        }
      })
      }, 3000)
      setTimeout(() => {
        window.location.href = window.location.origin + window.location.pathname
      }, 4000) */
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [BankGaransiActions.REQUEST_FUNNEL_SA_TABLE, BankGaransiActions.REQUEST_SEARCH_FUNNEL_SA_TABLE])
  );

  const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeFunnelSA(state));
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchFunnelSA(state));

  const handleSearchChangeEmployee = (data: any) => {
    setSearchObject({ ...searchObject, salesName: data });
    if (data.length > 2) {
      dispatch(EmployeeActions.requestEmployeeByName(data, '27'));
    }
  };

  const tableData = useSelector((state: IStore) => selectFunnelSA(state));
  //const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  const onSubmitHandler = (va: any) => {
    console.log('test');
  };

  const onResultSelectSales = (data: any) => {
    setSearchObject({ ...searchObject, salesName: data.result.title });
  };

  const onHandleSearch = (val: any) => {
    setTitle('Searched Funnel/SA');
    const searchModel = new FunnelSearchSAModel(searchObject);
    searchModel.domain = currentUser.userName;
    searchModel.bondType = props.bondTypes;
    dispatch(BankGaransiActions.requestSearchFunnelSA(searchModel));
  };

  const getProjectList = (projectName: string) => {
    const controllerName = `GenerateForm/GetProjectNameSearch?projectName=${projectName}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    axios
      .get(endpoint)
      .then((res) => {
        setProjectList(res.data);
      })
      .catch((err) => {
        dispatch(ToastActions.add(err.message, ToastEnum.Error));
      });
  };

  const handleSearchProject = (data: any) => {
    setSearchObject({ ...searchObject, projectName: data });
    if (data.length > 2) {
      getProjectList(data);
    }
  };

  const handleSearchChangeCust = (data: any) => {
    setSearchObject({ ...searchObject, customerName: data });
    if (data.length > 2) {
      dispatch(CustomerActions.requestCustomerByName(data));
    }
  };

  const onCancelClick = () => {
    setTitle('Funnel/SA');

    setActivePage(1);
    setSearchObject({
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
    });

    dispatch(BankGaransiActions.requestFunnelSA(1, 10, currentUser.userName));
  };
  // const moveToAdd = () => {
  //   dispatch(ModalAction.OPEN(
  //     <FormAdd history={props.history}
  //       />,ModalSizeEnum.Tiny));
  // }

  const { saNo, funnelGenID, projectName, customerName, salesName, funnelDate, saDate } = searchObject;
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
                      name="funnelGenID"
                      component={TextInput}
                      placeholder="e.g. Funnel.."
                      labelName="Funnel"
                      onChange={(val: any) => setSearchObject({ ...searchObject, funnelGenID: val })}
                      defaultValue={searchObject.funnelGenID}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      name="saNo"
                      component={TextInput}
                      placeholder="e.g. SA.."
                      labelName="SA"
                      onChange={(val: any) => setSearchObject({ ...searchObject, saNo: val })}
                      defaultValue={searchObject.saNo}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      name="projectName"
                      component={SearchInput}
                      placeholder="e.g. Project Name.."
                      labelName="Project Name"
                      handleSearchChange={handleSearchProject}
                      onResultSelect={(data: any) => setSearchObject({ ...searchObject, projectName: data.result.title })}
                      results={
                        projectList.length != 0 &&
                        projectList.map((item) => {
                          const data = {
                            title: item,
                          };
                          return data;
                        })
                      }
                      defaultValue={searchObject.projectName}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      name="customerName"
                      component={SearchInput}
                      placeholder="e.g. Customer Name.."
                      labelName="Customer Name"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={(data: any) => setSearchObject({ ...searchObject, customerName: data.result.title })}
                      results={customerStoreSearch}
                      defaultValue={searchObject.customerName}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Field
                      name="SO Number"
                      component={TextInput}
                      placeholder="e.g. SO Number.."
                      labelName="SO Number"
                      onChange={(val: any) => setSearchObject({ ...searchObject, so: val })}
                      defaultValue={searchObject.so}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      name="salesName"
                      component={SearchInput}
                      placeholder="e.g. Sales Name.."
                      labelName="Sales Name"
                      handleSearchChange={handleSearchChangeEmployee}
                      results={employeeStoreSearch}
                      onResultSelect={onResultSelectSales}
                      defaultValue={searchObject.salesName}
                    />
                  </Grid.Column>
                  {/* <Grid.Column width={4}>
                    <Field
                      name="funnelDate"
                      component={DateInput}
                      placeholder="e.g. Funnel.."
                      labelName="Funnel Date"
                      date={true}
                      onChange={(val: any) => setSearchObject({ ...searchObject, funnelDate: val })}
                      currentDate={new Date()}
                      defaultValue={searchObject.funnelDate}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Field
                      name="saDate"
                      component={DateInput}
                      placeholder="e.g. SA.."
                      labelName="SA Date"
                      date={true}
                      onChange={(val: any) => setSearchObject({ ...searchObject, saDate: val })}
                      currentDate={new Date()}
                      defaultValue={searchObject.saDate}
                    />
                  </Grid.Column> */}
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
            <FunnelSATable modals={props.modals} tableData={tableData} funnelGenID={props.pFunnelGenID} />
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

export default FunnelSATables;

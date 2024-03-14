import './GeneratedForm.scss';
import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import FunnelSATable from './components/table/FunnelSATable';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IStore from 'models/IStore';
import * as FunnelActions from 'stores/funnel-opportunity/FunnelActivityActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import TableToExcel from '@linways/table-to-excel';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { Form as FinalForm, Field } from 'react-final-form';
import {
  SelectInputOpportunity,
  SelectInput,
  DateInput,
  TextInput,
  CheckBoxInput,
  RichTextEditor,
  DropdownInput,
  NumberInput,
  SearchInput,
  SearchInputList,
  SoftwareList,
  Pagination,
} from 'views/components/UI';
import * as CustomerActions from 'stores/customer/CustomerActions';
import axios from 'axios';
import environment from 'environment';
// import TotalSalesAndGpm from './components/total-sales-n-gpm/totalSalesAndGpm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { defaultDecoder } from 'qs';
import { format } from 'date-fns';
import { selectFunnelOpportunity } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import { combineValidators, composeValidators, createValidator, hasLengthGreaterThan, isRequired } from 'revalidate';
import * as GeneratedActions from 'stores/generated-form/GenerateFormActions';
import { selectFunnelSA } from 'selectors/generated-form/GenerateFormSelector';
import FunnelSASearchModel from 'stores/generated-form/models/FunnelSASearchModel';
import { selectEmployeeSearchOptions, selectEmployeeFunnelSA } from 'selectors/select-options/EmployeeSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectCustomerSearchFunnelSA } from 'selectors/select-options/CustomerSelector';
import * as ToastActions from 'stores/toasts/ToastsAction';
import ToastEnum from 'constants/ToastStatusEnum';

interface IProps {
  history: any;
  formType: number;
}

interface ISearchObject {
  page: number;
  pageSize: number;
  formType: number;
  funnelGenID: string;
  saNo: string;
  projectName: string;
  customerName: string;
  salesName: string;
  funnelDate: string;
  saDate: string;
  so: string;
}

const FunnelSATables: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { formType } = props;
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchObject, setSearchObject] = useState<ISearchObject>({
    page: activePage,
    pageSize: pageSize,
    formType: formType,
    funnelGenID: '',
    saNo: '',
    projectName: '',
    customerName: '',
    salesName: '',
    funnelDate: '',
    saDate: '',
    so: '',
  });
  const [isLoading, setLoading] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [title, setTitle] = useState('Funnel/SA');
  const [projectList, setProjectList] = useState([]);
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchFunnelSA(state));
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [GeneratedActions.REQUEST_FUNNEL_SA_TABLE, GeneratedActions.REQUEST_SEARCH_FUNNEL_SA_TABLE])
  );
  const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeFunnelSA(state));

  const tableData = useSelector((state: IStore) => selectFunnelSA(state));

  useEffect(() => {
    dispatch(GeneratedActions.requestFunnelSA(1, 10, formType));
  }, []);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    const { saNo, funnelGenID, projectName, customerName, salesName, funnelDate, saDate, so } = searchObject;

    if (
      funnelGenID !== '' ||
      saNo !== '' ||
      projectName !== '' ||
      customerName !== '' ||
      salesName !== '' ||
      funnelDate !== '' ||
      saDate !== '' ||
      so !== ''
    ) {
      const searchModel = new FunnelSASearchModel(searchObject);
      dispatch(GeneratedActions.requestSearchFunnelSA(searchModel));
    } else {
      dispatch(GeneratedActions.requestFunnelSA(data.activePage, pageSize, formType));
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
      setTimeout(() => {
        const tableSelect = document.getElementById('exportopp') as HTMLTableElement;
        const tableHead = document.querySelector('#exportopp > thead > tr > th:nth-child(1)') as HTMLTableElement;
        tableHead.style.display = 'none';
        for (let i = 0; i < tableSelect.rows.length; i++) {
          const firstCol = tableSelect.rows[i].cells[0];
          firstCol.remove();
        }
        TableToExcel.convert(tableSelect, {
          name: 'FunnelOpportunity' + currDate + '.xlsx',
          sheet: {
            name: 'Sheet 1',
          },
        });
      }, 3000);
      setTimeout(() => {
        window.location.href = window.location.origin + window.location.pathname;
      }, 4000);
    }
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

  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  const onSubmitHandler = (va) => {
    console.log(va);
  };

  const onHandleSearch = (val) => {
    console.log(searchObject);
    setTitle('Searched Funnel/SA');
    const searchModel = new FunnelSASearchModel(searchObject);

    dispatch(GeneratedActions.requestSearchFunnelSA(searchModel));
  };

  const onCancelClick = () => {
    setTitle('Funnel/SA');

    setActivePage(1);
    setSearchObject({
      ...searchObject,
      page: 1,
      pageSize: 10,
      formType: formType,
      funnelGenID: '',
      saNo: '',
      projectName: '',
      customerName: '',
      salesName: '',
      funnelDate: '',
      saDate: '',
      so: '',
    });

    dispatch(GeneratedActions.requestFunnelSA(1, 10, formType));
  };

  const onResultSelectSales = (data) => {
    setSearchObject({ ...searchObject, salesName: data.result.title });
  };
  // const moveToAdd = () => {
  //   dispatch(ModalAction.OPEN(
  //     <FormAdd history={props.history}
  //       />,ModalSizeEnum.Tiny));
  // }

  const handleSearchChangeEmployee = (data) => {
    setSearchObject({ ...searchObject, salesName: data });
    if (data.length > 2) {
      dispatch(EmployeeActions.requestEmployeeByName(data, '27'));
    }
  };

  const handleSearchChangeCust = (data) => {
    setSearchObject({ ...searchObject, customerName: data });
    if (data.length > 2) {
      dispatch(CustomerActions.requestCustomerByName(data));
    }
  };

  const handleSearchProject = (data) => {
    setSearchObject({ ...searchObject, projectName: data });
    if (data.length > 2) {
      getProjectList(data);
      // dispatch(GeneratedActions.requestProjectFunnelSA(data));
    }
  };

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
                  <Grid.Column className="FullGrid1200" width={4}>
                    <Field
                      name="funnelGenID"
                      component={TextInput}
                      placeholder="e.g. Funnel.."
                      labelName="Funnel"
                      onChange={(val) => setSearchObject({ ...searchObject, funnelGenID: val })}
                      defaultValue={searchObject.funnelGenID}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid1200" width={4}>
                    <Field
                      name="saNo"
                      component={TextInput}
                      placeholder="e.g. SA.."
                      labelName="SA"
                      onChange={(val) => setSearchObject({ ...searchObject, saNo: val })}
                      defaultValue={searchObject.saNo}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid1200" width={4}>
                    <Field
                      name="projectName"
                      component={SearchInput}
                      placeholder="e.g. Project .."
                      labelName="Project Name"
                      handleSearchChange={handleSearchProject}
                      onResultSelect={(data) => setSearchObject({ ...searchObject, projectName: data.result.title })}
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
                  <Grid.Column className="FullGrid1200" width={4}>
                    <Field
                      name="customerName"
                      component={SearchInput}
                      placeholder="e.g.PT. Customer .."
                      labelName="Customer Name"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={(data) => setSearchObject({ ...searchObject, customerName: data.result.title })}
                      results={customerStoreSearch}
                      defaultValue={searchObject.customerName}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className="FullGrid1200" width={4}>
                    <Field
                      name="SO Number"
                      component={TextInput}
                      placeholder="e.g. SO Number.."
                      labelName="SO Number"
                      onChange={(val) => setSearchObject({ ...searchObject, so: val })}
                      defaultValue={searchObject.so}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid1200" width={4}>
                    <Field
                      name="salesName"
                      component={SearchInput}
                      placeholder="e.g.Sales Name"
                      labelName="Sales Name"
                      handleSearchChange={handleSearchChangeEmployee}
                      results={employeeStoreSearch}
                      onResultSelect={onResultSelectSales}
                      defaultValue={searchObject.salesName}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid1200" width={4} textAlign="center" verticalAlign="middle">
                    <Button.Group style={{ marginTop: 10 }}>
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

        <Grid className="MaxWidth100" columns="equal">
          <Grid.Column>
            <FunnelSATable history={props.history} tableData={tableData} />
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

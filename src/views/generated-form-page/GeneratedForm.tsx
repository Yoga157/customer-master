// import './GeneratedForm.scss';
import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import GeneratedTable from './components/table/GeneratedTable';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IStore from 'models/IStore';
import * as GenerateFormActions from 'stores/generated-form/GenerateFormActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Pagination, Tooltips, Button } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import TableToExcel from '@linways/table-to-excel';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectGenerateForm } from 'selectors/generated-form/GenerateFormSelector';
// import TotalSalesAndGpm from './components/total-sales-n-gpm/totalSalesAndGpm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { defaultDecoder } from 'qs';
import { format } from 'date-fns';
import { selectFunnelOpportunity } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as GeneratedActions from 'stores/generated-form/GenerateFormActions';
import RouteEnum from 'constants/RouteEnum';
import InputSearch from './components/search/InputSearch';
import * as CustomerPICActions from 'stores/customer-pic/CustomerPICActions';

interface IProps {
  history: any;
}

const GeneratedFormPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const result = useSelector((state: IStore) => state.generatedForm.resultActions);

  useEffect(() => {
    if (result.errorNumber == '666') {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Error));
      setTimeout(() => {
        dispatch(GeneratedActions.clearResult());
      }, 2000);
    }
  }, [result.message]);

  useEffect(() => {
    dispatch(GenerateFormActions.requestGeneratedForm(1, pageSize, currentUser.employeeID));
  }, []);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    const search = document.querySelector('#search-generated-form')! as HTMLInputElement;
    if (search.value.length > 0) {
      dispatch(GeneratedActions.requestSearchGeneratedForm(data.activePage, pageSize, currentUser.employeeID, search.value));
    } else {
      dispatch(GenerateFormActions.requestGeneratedForm(data.activePage, pageSize, currentUser.employeeID));
    }
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    const searchMarketing = document.querySelector('#search-generated-form')! as HTMLInputElement;

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

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [GenerateFormActions.REQUEST_GENERATED_FORM_TABLE, GeneratedActions.REQUEST_SEARCH_GENERATED_FORM_TABLE])
  );

  const tableData = useSelector((state: IStore) => selectGenerateForm(state));
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  const moveToAdd = () => {
    // props.history.push('/generated-form')
    dispatch(CustomerPICActions.removeCustomerPIC());

    props.history.push({
      pathname: RouteEnum.GeneratedFormAdd,
      state: { type: 'ADD' },
    });
  };
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            <InputSearch setActivePage={setActivePage} />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">Generated Form</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <Tooltips
              content="Add Generate Form"
              trigger={
                <Button
                  className="m-05r"
                  icon="plus"
                  color="yellow"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="Add New"
                  onClick={moveToAdd}
                />
              }
            />
            {/* <Tooltips 
              content='Import Xls'
              trigger={
                <Button 
                  className='m-05r'
                  icon='file excel'
                  size='small'
                  color='green'
                  floated="right"
                  content='Import Xls'
                  />
              }
            />
             <Tooltips 
              content='Export Xls'
              trigger={
                <Button 
                className='m-05r'
                  icon='file excel' 
                  color='teal' 
                  disabled={false} 
                  floated="right" 
                  size='small' 
                  content='Export Xls'
                  onClick={exportTableToExcel}
                />
              }
              /> */}
          </Grid.Column>

          {/* <Grid.Column textAlign="center">
              
          </Grid.Column>
          <Grid.Column textAlign="left">
                 </Grid.Column> */}
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <div className="wrapper-table">
              <GeneratedTable history={props.history} tableData={tableData} />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={tableData.totalRow ? tableData.totalRow : 0}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>

        {/* <TotalSalesAndGpm tableData={funnelTables} />    */}
      </LoadingIndicator>
    </Fragment>
  );
};

export default GeneratedFormPage;

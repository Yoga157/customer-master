import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import FunnelTable from './components/funnel-main/table/FunnelTable';
import InputSearch from './components/funnel-main/search/InputSearch';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IStore from 'models/IStore';
import * as FunnelActions from 'stores/funnel-opportunity/FunnelActivityActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Pagination, Tooltips, Button } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import TableToExcel from '@linways/table-to-excel';

// import TotalSalesAndGpm from './components/total-sales-n-gpm/totalSalesAndGpm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { defaultDecoder } from 'qs';
import { format } from 'date-fns';
import CreateForm from './components/funnel-main/form/form-create/FormAdd';
import { selectFunnelOpportunity } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import FormUpload from './components/funnel-main/form/form-create/FormUpload';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import RemoveAllLocalStorageFunnelFormEdit from 'views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/removeAllLocalStorageFunnelFormEdit';
import * as FunnelActionss from 'stores/funnel/FunnelActions';

interface IProps {
  history: any;
}

const FunnelPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(15);
  const activePage = useSelector((state: IStore) => state.funnel.activePage);
  const [, removeAllStorage] = RemoveAllLocalStorageFunnelFormEdit();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onAdd = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<CreateForm funnelGenID={props} funnelItemsID={'0'} type="Add" />, ModalSizeEnum.Small));
  }, [dispatch]);

  const onImport = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<FormUpload />, ModalSizeEnum.Small));
  }, [dispatch]);

  useEffect(() => {
    removeAllStorage(true);
    if (window.location.pathname === '/data-quality/funnel') {
      dispatch(FunnelActions.requestFunnelSales(1, 10, currentUser.employeeID));
    } else {
      dispatch(FunnelActions.requestFunnelOpp(activePage, pageSize, 'FunnelOpportunityID', 'ascending'));
    }
    // dispatch(FunnelActions.requestSearchOpp(1,10,831,"Kementerian Luar Negeri / Setjen Biro Umum"))
  }, []);

  const result = useSelector((state: IStore) => state.funnelOpportunity.resultActions);

  useEffect(() => {
    if (result.message == 'Delete success!') {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
    }
  }, [result.message]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(FunnelActionss.setActivePage(data.activePage));
    const search = document.querySelector('#search-input-opportunity')! as HTMLInputElement;

    if (window.location.pathname === '/data-quality/funnel') {
      if (search.value.length > 0) {
        dispatch(FunnelActions.requestSearchOpp(data.activePage, pageSize, currentUser.employeeID, search.value));
      } else {
        dispatch(FunnelActions.requestFunnelSales(data.activePage, pageSize, currentUser.employeeID));
      }
    } else {
      if (search.value.length > 0) {
        dispatch(FunnelActions.requestSearchMarketing(data.activePage, pageSize, search.value));
      } else {
        dispatch(FunnelActions.requestFunnelOpp(data.activePage, pageSize, 'FunnelOpportunityID', 'ascending'));
      }
    }
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    const search = document.querySelector('#search-input-opportunity')! as HTMLInputElement;

    /*if (search.value.length > 0) {
      dispatch(FunnelActions.requestSearchMarketing(1, tableData.totalRow, search.value));
    } else {
      dispatch(FunnelActions.requestFunnelOpp(1, tableData.totalRow, 'FunnelOpportunityID', 'ascending'));
      //dispatch(FunnelActions.requestFunnelSales(1, tableData.totalRow, currentUser.employeeID));
    }*/

    if (window.location.pathname === '/data-quality/funnel') {
      if (search.value.length > 0) {
        dispatch(FunnelActions.requestSearchOpp(1, tableData.totalRow, currentUser.employeeID, search.value));
      } else {
        dispatch(FunnelActions.requestFunnelSales(1, tableData.totalRow, currentUser.employeeID));
      }
    } else {
      if (search.value.length > 0) {
        dispatch(FunnelActions.requestSearchMarketing(1, tableData.totalRow, search.value));
      } else {
        dispatch(FunnelActions.requestFunnelOpp(1, tableData.totalRow, 'FunnelOpportunityID', 'ascending'));
      }
    }

    if (isRequesting == false) {
      setTimeout(() => {
        let tableSelect: any;
        let tableHead: any;

        if (window.location.pathname === '/data-quality/funnel-opportunity') {
          tableSelect = document.getElementById('exportopportunity') as HTMLTableElement;
          tableHead = document.querySelector('#exportopportunity > thead > tr > th:nth-child(1)') as HTMLTableElement;
        } else {
          tableSelect = document.getElementById('exportopp') as HTMLTableElement;
          tableHead = document.querySelector('#exportopp > thead > tr > th:nth-child(1)') as HTMLTableElement;
        }

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
    selectRequesting(state, [
      FunnelActions.REQUEST_FUNNELS_OPPORTUNITY,
      FunnelActions.REQUEST_SEARCH_MARKETING,
      FunnelActions.REQUEST_FUNNELS_OPPORTUNITY_SALES,
      FunnelActions.REQUEST_SEARCH_OPP,
    ])
  );

  const tableData = useSelector((state: IStore) => selectFunnelOpportunity(state));

  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">{window.location.pathname === '/data-quality/funnel-opportunity' ? <InputSearch /> : null}</Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content className="ml-1r-767">{'Event / Product Management Generated Funnel '}</Header.Content>
            </Header>
          </Grid.Column>
          {(window.location.pathname === '/data-quality/funnel-opportunity' && currentUser.role === 'Marketing') ||
          currentUser.role === 'SuperAdmin' ? (
            <Grid.Column width={12}>
              <Tooltips
                content="Add new funnel"
                trigger={
                  <Button
                    className="m-05r"
                    icon="plus"
                    color="yellow"
                    disabled={false}
                    floated="right"
                    size="small"
                    content="Add New"
                    onClick={onAdd}
                  />
                }
              />
              <Tooltips
                content="Import Xls"
                trigger={
                  <Button className="m-05r" icon="file excel" size="small" color="green" floated="right" content="Import Xls" onClick={onImport} />
                }
              />
              <Tooltips
                content="Export Xls"
                trigger={
                  <Button
                    className="m-05r"
                    icon="file excel"
                    color="teal"
                    disabled={false}
                    floated="right"
                    size="small"
                    content="Export Xls"
                    onClick={exportTableToExcel}
                  />
                }
              />
            </Grid.Column>
          ) : (
            <Grid.Column width={12}>
              <Tooltips
                content="Add new funnel"
                trigger={
                  <Button
                    className="m-05r"
                    icon="plus"
                    color="yellow"
                    disabled={false}
                    floated="right"
                    size="small"
                    content="Add New"
                    onClick={onAdd}
                  />
                }
              />
              <Tooltips
                content="Import Xls"
                trigger={
                  <Button className="m-05r" icon="file excel" size="small" color="green" floated="right" content="Import Xls" onClick={onImport} />
                }
              />
              <Tooltips
                content="Export Xls"
                trigger={
                  <Button
                    className="m-05r"
                    icon="file excel"
                    color="teal"
                    disabled={false}
                    floated="right"
                    size="small"
                    content="Export Xls"
                    onClick={exportTableToExcel}
                  />
                }
              />{' '}
            </Grid.Column>
          )}

          {/* <Grid.Column textAlign="center">
              
          </Grid.Column>
          <Grid.Column textAlign="left">
                 </Grid.Column> */}
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <div className="wrapper-table">
              <FunnelTable history={props.history} tableData={tableData} />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={tableData.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>

        {/* <TotalSalesAndGpm tableData={funnelTables} />    */}
      </LoadingIndicator>
    </Fragment>
  );
};

export default FunnelPage;

import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import { Pagination, Tooltips, Button } from '../../components/UI';
import { Grid, Header } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { format } from 'date-fns';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import IBankGaransiAdminTable from 'selectors/bank-garansi/models/IBankGaransiAdminTable';
import { selectBankGaransiAdminExs } from 'selectors/bank-garansi/BankGaransiSelector';
import BankGaransiAdminTable from './components/table/BankGaransiAdminTable';
//import BankGaransiExpiredTable from './components/table/BankGaransiExpiredTable';
import TableToExcel from '@linways/table-to-excel';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';

interface IProps {
  //history:History
}

const BankGaransiExpiredPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const activePage: number = useSelector((state: IStore) => state.bankGaransi.activePage);
  const direction: string = useSelector((state: IStore) => state.bankGaransi.listSearch.sorting);
  const columnsorting: string = useSelector((state: IStore) => state.bankGaransi.listSearch.column);
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const search: any = useSelector((state: IStore) => state.bankGaransi.listExpiredDataAdmin.search);
  const filter: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listExpiredDataAdmin.filter);

  const bankGaransiTablesEx: IBankGaransiAdminTable = useSelector((state: IStore) => selectBankGaransiAdminExs(state));

  useEffect(() => {
    dispatch(BankGaransiActions.requestBankGaransiAdminExs(currentUser.userName, activePage, pageSize, 1, '', ''));
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(BankGaransiActions.setActivePage(data.activePage));

    if (search !== null && search.searchText != null) {
      dispatch(
        BankGaransiActions.requestBGSearch(
          currentUser.userName,
          search.searchText,
          data.activePage,
          pageSize,
          //bankGaransiTables.totalRow,
          0,
          columnsorting,
          direction
        )
      );
    } else if (filter !== null) {
      const filterNew = new FilterSearchModel(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = data.activePage;
      filterNew.column = columnsorting;
      filterNew.sorting = direction;
      dispatch(BankGaransiActions.postFilterSearch(filterNew));
    } else {
      dispatch(BankGaransiActions.requestBankGaransiAdminExs(currentUser.userName, data.activePage, pageSize, 1, columnsorting, direction));
    }
  };

  const exportExTableToExcel = (tableID: string, filename: string): void => {
    dispatch(BankGaransiActions.setActivePage(1));
    if (search.searchText !== null) {
      dispatch(BankGaransiActions.requestBGSearch(currentUser.userName, search.searchText, 1, bankGaransiTablesEx.totalRow, 1, '', ''));
    } else if (filter !== null) {
      const filterNew = new FilterSearchModel(filter);
      filterNew.pageSize = bankGaransiTablesEx.totalRow;
      filterNew.page = 1;
      dispatch(BankGaransiActions.postFilterSearch(filterNew));
    } else {
      dispatch(BankGaransiActions.requestBankGaransiAdminExs(currentUser.userName, 1, bankGaransiTablesEx.totalRow, 1, '', ''));
    }

    if (isRequesting == false) {
      setTimeout(() => {
        const tableSelectEx = document.getElementById('export') as HTMLTableElement;
        const tableHeadEx = document.querySelector('#export > thead > tr > th:nth-child(1)') as HTMLTableElement;
        tableHeadEx.style.display = 'none';
        for (let i = 0; i < tableSelectEx.rows.length; i++) {
          const firstCol = tableSelectEx.rows[i].cells[0];
          firstCol.remove();
        }
        TableToExcel.convert(tableSelectEx, {
          name: 'BGExpired ' + currDate + '.xlsx',
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
      BankGaransiActions.REQUEST_FILTERSEARCH_EX_BANK_GARANSI,
      BankGaransiActions.REQUEST_BG_SEARCH_EX,
      BankGaransiActions.REQUEST_BANK_GARANSI_ADMINEXS,
    ])
  );
  /*  const bankGaransiTables: IBankGaransiAdminTable = useSelector((state: IStore) =>
    selectBankGaransiAdminExs(state, [BankGaransiActions.REQUEST_BANK_GARANSI_ADMINEXS])
  ); */

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        {
          <Grid.Column>
            <Tooltips
              content="Export this bank guarantee table"
              trigger={
                <Button
                  className="m-05r"
                  icon="file excel"
                  size="small"
                  color="blue"
                  content="Export Excel"
                  floated="right"
                  onClick={() => exportExTableToExcel('exportEx', `BGList ${currDate}`)}
                />
              }
            />
          </Grid.Column>
        }
        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content>Bank Guarantee Expired</Header.Content>
            </Header>
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column>
            <div className="wrapper-table">
              <BankGaransiAdminTable tableData={bankGaransiTablesEx} />
              {/* <BankGaransiExpiredTable tableData={bankGaransiTables}/>  */}
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={bankGaransiTablesEx.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default BankGaransiExpiredPage;

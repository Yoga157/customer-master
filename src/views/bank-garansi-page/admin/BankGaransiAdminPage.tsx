import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import BankGaransiAdminTable from './components/table/BankGaransiAdminTable';
import { Dispatch } from 'redux';
import { Button, Pagination, Tooltips } from '../../components/UI';
import { Grid, Tab, Header, Menu, Label } from 'semantic-ui-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import SearchBankGaransiAdmin from './components/search/SearchBankGaransiAdmin';
import { format } from 'date-fns';
import BankGaransiExpiredPage from '../admin/BankGaransiExpiredPage';
import MasterInsurancePage from '../admin/MasterInsurancePage';
import IBankGaransiAdminTable from 'selectors/bank-garansi/models/IBankGaransiAdminTable';
import { selectBankGaransiAdmins, selectBGEditRequester, selectCheckExpired } from 'selectors/bank-garansi/BankGaransiSelector';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ConfirmApprove from './components/ConfirmApprove';
import BankGaransiFormEdit from './components/form/form-edit/BankGaransiFormEdit';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import TableToExcel from '@linways/table-to-excel';

interface RouteParams {
  bgno: string;
  edit: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  //history: History;
}

const BankGaransiAdminPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [tabPage, setTabPage] = useState(0);
  const direction: string = useSelector((state: IStore) => state.bankGaransi.listSearch.sorting);
  const columnsorting: string = useSelector((state: IStore) => state.bankGaransi.listSearch.column);
  const activePage: number = useSelector((state: IStore) => state.bankGaransi.activePage);

  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listSearch.filter);

  const bankGaransi = useSelector((state: IStore) => selectBGEditRequester(state));

  useEffect(() => {
    if (+props.match.params.bgno > 0) {
      dispatch(BankGaransiActions.requestBGViewEditRequester(+props.match.params.bgno));
    }
    if (search !== null && search.searchText != null) {
      dispatch(BankGaransiActions.requestBGSearch(currentUser.userName, search.searchText, activePage, pageSize, 0, columnsorting, direction));
    } else if (filter !== null) {
      const filterNew = new FilterSearchModel(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = activePage;
      filterNew.column = columnsorting;
      filterNew.sorting = direction;
      dispatch(BankGaransiActions.postFilterSearch(filterNew));
    } else {
      dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, columnsorting, direction));
    }
    //dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, '', ''));
    dispatch(BankGaransiActions.checkExpired(currentUser.userName));
  }, []);

  //popup edit/view
  useEffect(() => {
    if (+props.match.params.bgno > 0 && props.match.params.edit === 'edit' && +bankGaransi.bankGuaranteeGenID > 0) {
      dispatch(
        ModalFirstLevelActions.OPENACTION(
          <BankGaransiFormEdit
            status={bankGaransi.stepName}
            linkTo={bankGaransi.linkTo}
            bankGuaranteeGenID={bankGaransi.bankGuaranteeGenID}
            bankGuaranteeNo={bankGaransi.bankGuaranteeNo}
            expireds={false}
            process={bankGaransi.process}
            so={'0'}
          />,
          ModalSizeEnum.Small,
          '/bank-garansi'
        )
      );
    }
  });

  //popup approve
  useEffect(() => {
    if (+props.match.params.bgno > 0 && (props.match.params.edit === 'NaN' || props.match.params.edit === undefined)) {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ConfirmApprove
            bankGuaranteeNo={bankGaransi.bankGuaranteeNo}
            type={'Approve'}
            bondIssuer={bankGaransi.bondIssuer}
            bankGuaranteeGenID={+props.match.params.bgno}
            process={bankGaransi.process}
            bondIssuerType={bankGaransi.bondIssuerType}
            stepName={bankGaransi.stepName}
          />,
          ModalSizeEnum.Mini
        )
      );
    }
  });

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
      dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, data.activePage, pageSize, 0, columnsorting, direction));
    }
  };

  const onTabChange = (e: any, data: any) => {
    setTabPage(data.activeIndex);
    dispatch(BankGaransiActions.setActivePage(1));
    if (data.activeIndex == 0) {
      dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, 1, pageSize, 0, '', ''));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      BankGaransiActions.REQUEST_BG_SEARCH,
      BankGaransiActions.REQUEST_FILTERSEARCH_BANK_GARANSI,
      BankGaransiActions.REQUEST_BANK_GARANSI_ADMINS,
    ])
  );

  const exportTableToExcel = (tableID: string, filename: string): void => {
    dispatch(BankGaransiActions.setActivePage(1));
    if (search.searchText !== null) {
      dispatch(
        BankGaransiActions.requestBGSearch(currentUser.userName, search.searchText, 1, bankGaransiTables.totalRow, 0, columnsorting, direction)
      );
    } else if (filter !== null) {
      const filterNew = new FilterSearchModel(filter);
      filterNew.pageSize = bankGaransiTables.totalRow;
      filterNew.page = 1;
      dispatch(BankGaransiActions.postFilterSearch(filterNew));
    } else {
      dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, 1, bankGaransiTables.totalRow, 0, '', ''));
    }

    if (isRequesting == false) {
      setTimeout(() => {
        const tableSelect = document.getElementById('export') as HTMLTableElement;
        const tableHead = document.querySelector('#export > thead > tr > th:nth-child(1)') as HTMLTableElement;
        tableHead.style.display = 'none';
        for (let i = 0; i < tableSelect.rows.length; i++) {
          const firstCol = tableSelect.rows[i].cells[0];
          firstCol.remove();
        }
        TableToExcel.convert(tableSelect, {
          name: 'BGList ' + currDate + '.xlsx',
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
  const bankGaransiTables: IBankGaransiAdminTable = useSelector((state: IStore) => selectBankGaransiAdmins(state));
  const rowExpired: any = useSelector((state: IStore) => selectCheckExpired(state));
  const search: any = useSelector((state: IStore) => state.bankGaransi.listSearch.search);

  const panes = [
    {
      menuItem: 'Bank Guarantee',
      render: () => (
        <Tab.Pane attached={false}>
          <Grid columns="equal">
            <Grid.Column width={4}>
              <Header as="h4">
                <Header.Content>Bank Guarantee</Header.Content>
              </Header>
            </Grid.Column>
            {
              <Grid.Column>
                {rowExpired.message === 'BG Expired!' && (
                  <Tooltips
                    content={rowExpired.message === 'BG Expired!' ? 'BG Expired' : 'Add New'}
                    open={rowExpired.message === 'BG Expired!'}
                    trigger={
                      <Button
                        className="m-05r"
                        icon="plus"
                        color="yellow"
                        disabled={rowExpired.message === 'BG Expired!' ? true : false}
                        floated="right"
                        size="small"
                        content="Add New"
                      />
                    }
                  />
                )}
                {rowExpired.message != 'BG Expired!' && (
                  <Link to={RouteEnum.BankGaransiForm}>
                    <Tooltips
                      content="Add New"
                      trigger={<Button className="m-05r" icon="plus" color="yellow" floated="right" size="small" content="Add New" />}
                    />
                  </Link>
                )}

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
                      onClick={() => exportTableToExcel('export', `BGList ${currDate}`)}
                    />
                  }
                />
              </Grid.Column>
            }
          </Grid>

          <Grid columns="equal">
            <Grid.Column>
              <div className="wrapper-table">
                <BankGaransiAdminTable tableData={bankGaransiTables} />
              </div>
              <Pagination
                activePage={filter !== null ? filter.page : search !== null && search.searchText != null ? search.page : activePage}
                onPageChange={(e, data) => handlePaginationChange(e, data)}
                totalPage={bankGaransiTables.totalRow}
                pageSize={filter !== null ? filter.pageSize : search !== null && search.searchText != null ? search.pageSize : pageSize}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key="expired">Expired Bank Guarantee</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <BankGaransiExpiredPage />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key="masterInsurance">Master Bond Issuer</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <MasterInsurancePage />
        </Tab.Pane>
      ),
    },
  ];
  const panesSales = [
    {
      menuItem: 'Bank Guarantee',
      render: () => (
        <Tab.Pane attached={false}>
          <Grid columns="equal">
            <Grid.Column width={4}>
              <Header as="h4">
                <Header.Content>Bank Guarantee</Header.Content>
              </Header>
            </Grid.Column>
            {currentUser.role === 'Sales' && (
              <Grid.Column>
                {rowExpired.message === 'BG Expired!' && (
                  <Tooltips
                    content={rowExpired.message === 'BG Expired!' ? 'BG Expired' : 'Add New'}
                    open={rowExpired.message === 'BG Expired!'}
                    trigger={
                      <Button
                        className="m-05r"
                        icon="plus"
                        color="yellow"
                        disabled={rowExpired.message === 'BG Expired!' ? true : false}
                        floated="right"
                        size="small"
                        content="Add New"
                      />
                    }
                  />
                )}
                {rowExpired.message != 'BG Expired!' && (
                  <Link to={RouteEnum.BankGaransiForm}>
                    <Tooltips
                      content="Add New"
                      trigger={<Button className="m-05r" icon="plus" color="yellow" floated="right" size="small" content="Add New" />}
                    />
                  </Link>
                )}
                {
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
                        onClick={() => exportTableToExcel('export', `BGList ${currDate}`)}
                      />
                    }
                  />
                }
              </Grid.Column>
            )}
          </Grid>

          <Grid columns="equal">
            <Grid.Column>
              <div className="wrapper-table">
                <BankGaransiAdminTable tableData={bankGaransiTables} />
                {/* <BankGaransiAdminTable /> */}
              </div>
              <Pagination
                activePage={filter !== null ? filter.page : search !== null && search.searchText != null ? search.page : activePage}
                onPageChange={(e, data) => handlePaginationChange(e, data)}
                totalPage={bankGaransiTables.totalRow}
                pageSize={filter !== null ? filter.pageSize : search !== null && search.searchText != null ? search.pageSize : pageSize}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key="expired">Expired Bank Guarantee</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <BankGaransiExpiredPage />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid className="mt-10r">
          <Grid.Column textAlign="center">
            <SearchBankGaransiAdmin tabPage={tabPage} />
          </Grid.Column>
        </Grid>
        <Grid columns="equal">
          <Grid.Column className="DqTabSt01">
            <Tab
              className="DqTabSt01"
              menu={{ secondary: true, pointing: false }}
              panes={currentUser.role === 'Admin' ? panes : panesSales}
              onTabChange={onTabChange}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default BankGaransiAdminPage;

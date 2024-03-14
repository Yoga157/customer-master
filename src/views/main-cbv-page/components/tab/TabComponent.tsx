import React, { useEffect, useState } from 'react';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Pagination, Tooltips, Button } from 'views/components/UI';
import { Grid, Header } from 'semantic-ui-react';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import TableToExcel from '@linways/table-to-excel';
import { format } from 'date-fns';
import './TabComponentStyle.scss';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import MainCBVServiceTable from '../table/MainCBVServiceTable';
import MainCBVServiceForm from '../form/form-create/MainCBVServiceForm';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';
import FilterMainCBV from 'stores/main-cbv/models/FilterMainCBV';

interface IProps {
  // history: any;
  tabItem: string;
  tableData: any;
  pageSize: number;
  page: number;
  setActivePage: any;
  searchText: string;
  setDirection: any;
  direction: any;
  columns: any;
  setColumns: any;
}

const TabComponent: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { pageSize, page, setActivePage, tableData, searchText, setDirection, direction, columns, setColumns } = props;
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {

  }, [pageSize, page, tableData, direction, columns])

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_POST_FUNNEL_FILTER, FunnelActions.REQUEST_FUNNELS, FunnelActions.REQUEST_FUNNELS_SEARCH, CreditBillingActions.REQUEST_CREDIT_BILLINGS])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter = useSelector((state: IStore) => state.creditBilling.listData.filter);
  const search = useSelector((state: IStore) => state.creditBilling.listData.search);

  const genExportExcel = (): void => {

    if (isRequesting == false) {
      setTimeout(() => {
        let tableSelect: any;
        let tableHead: any;
        let nameFile: string;
        nameFile = 'MainCBVList ';
        tableSelect = document.getElementById('export-main-cbv') as HTMLTableElement;
        tableHead = document.querySelector('#export-main-cbv > thead > tr > th:nth-child(1)') as HTMLTableElement;
        console.log('tableHead', tableHead, 'tableSelect', tableSelect)
        tableHead.style.display = 'none';
        for (let i = 0; i < tableSelect.rows.length; i++) {
          const firstCol = tableSelect.rows[i].cells[0];
          firstCol.remove();
        }

        TableToExcel.convert(tableSelect, {
          name: nameFile + currDate + '.xlsx',
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

  const exportTableToExcel = (tableID: string, filename: string): void => {
    props.setActivePage(1)
    if (search !== null) {
      dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, searchText ? searchText : '', 'creditId', 'descending', 1, props.tableData.totalRows)).then(() => {
        genExportExcel()
      })
    } else if (filter !== null) {
      const filterNew = new FilterMainCBV(filter)
      filterNew.column = columns;
      filterNew.sorting = direction;
      filterNew.page = 1;
      filterNew.pageSize = 15;
      dispatch(CreditBillingActions.RequestFilterMainCBV(filter)).then(() => {
        genExportExcel();
      })
    } else {
      dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, '', 'creditId', 'descending', 1, props.tableData.totalRows)).then(() => {
        genExportExcel();
      })
    }
  }


  const [validasiPermission, setValidasiPermission] = useState(false)
  const permission = useSelector((state: IStore) => selectPermission(state))
  useEffect(() => {
    permission.map((item) => {
      if (item.text1 === currentUser.userName) {
        setValidasiPermission(true)
      }
    })
  }, [permission, validasiPermission])



  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    // if(search !== null) {
    //   dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, searchText ,'creditId','descending', data.activePage, pageSize));
    // } else 
    if (filter !== null) {
      const filterNew = new FilterMainCBV(filter)
      filterNew.pageSize = pageSize;
      filterNew.page = data.activePage;
      filterNew.column = columns;
      filterNew.sorting = direction;
      dispatch(CreditBillingActions.RequestFilterMainCBV(filterNew))
    } else {
      dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, searchText ? searchText : '', columns, direction, data.activePage, pageSize));
    }

  };

  const AddVoucher = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <MainCBVServiceForm id={1} type={"Add"} />,
        ModalSizeEnum.Large
      )
    )
  }
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  // console.log('permission',permission)
  return (
    <>
      <Grid columns="equal">
        <Grid.Column width={6} className="title-w-toggle">
          <Header as="h4" >
            <Header.Content>
              Main CBV
            </Header.Content>

          </Header>
        </Grid.Column>

        <Grid.Column width={10}>

          <>
            {validasiPermission === true && (<Tooltips
              content="Add New Voucher"
              trigger={
                <Button onClick={AddVoucher} className="m-05r" icon="plus" color="yellow" disabled={false} floated="right" size="small" content="Add New Voucher" />
              }
            />)}

            <Tooltips
              content="Export To File"
              trigger={<Button className="m-05r" icon="upload" size="small" color="green" floated="right" content="Export To File" onClick={() => exportTableToExcel('export', `MainCBVList ${currDate}`)} />}
            />
          </>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Row>
          <Grid.Column>
            <div className="wrapper-table mb-1r">
              <MainCBVServiceTable pageSize={pageSize} page={page} tableData={tableData} columns={columns} setColumns={setColumns} direction={direction} setDirection={setDirection} />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Pagination
              activePage={page}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={tableData.totalRows}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default TabComponent;

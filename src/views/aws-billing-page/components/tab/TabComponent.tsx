import React, { useEffect, useState } from 'react';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Pagination, Button, Tooltips } from 'views/components/UI';
import { Grid, Header, Label, Segment } from 'semantic-ui-react';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';
import './TabComponentStyle.scss';
import CreditBillingServiceTable from '../table/CreditBillingServiceTable';
import FilterAWSBillingModel from 'stores/aws-billing/models/FilterAWSBillingModel';
import { format } from 'date-fns';
import TableToExcel from '@linways/table-to-excel';

interface IProps {
  history: any;
  tabItem: string;
  tableData: any;
  pageSize: number;
  page: number;
  setActivePage: any;
  searchText: string;
  columns: any;
  setColumns: any;
  direction: any;
  setDirection: any;
}

const TabComponent: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tabItem, tableData, pageSize, page, setActivePage, searchText, columns, setColumns, direction, setDirection } = props;
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {}, [pageSize, page, tableData, direction, columns]);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter = useSelector((state: IStore) => state.awsBilling.listData.filter);
  const search = useSelector((state: IStore) => state.awsBilling.listData.search);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    if (filter !== null) {
      const filterNew = new FilterAWSBillingModel(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = data.activePage;
      filterNew.column = columns;
      filterNew.sorting = direction;
      dispatch(AWSBillingActions.RequestFilterAWSBilling(filterNew));
    } else {
      dispatch(
        AWSBillingActions.requestAWSBillings(currentUser.employeeID, searchText ? searchText : '', direction, columns, data.activePage, pageSize)
      );
    }
  };
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
  const genExportExcel = (): void => {
    // if (isRequesting == false) {
    setTimeout(() => {
      let tableSelect: any;
      let tableHead: any;
      let nameFile: string;
      nameFile = 'AWSBillingList ';
      tableSelect = document.getElementById('export-aws-billing') as HTMLTableElement;
      tableHead = document.querySelector('#export-aws-billing > thead > tr > th:nth-child(1)') as HTMLTableElement;
      console.log('tableHead', tableHead, 'tableSelect', tableSelect);
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
    // }
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    props.setActivePage(1);
    if (search !== null) {
      dispatch(
        AWSBillingActions.requestAWSBillings(
          currentUser.employeeID,
          searchText ? searchText : '',
          'descending',
          'billingPeriod',
          1,
          props.tableData.totalRows
        )
      ).then(() => {
        genExportExcel();
      });
    } else if (filter !== null) {
      const filterNew = new FilterAWSBillingModel(filter);
      filterNew.column = columns;
      filterNew.sorting = direction;
      filterNew.page = 1;
      filterNew.pageSize = tableData.totalRows;
      dispatch(AWSBillingActions.RequestFilterAWSBilling(filterNew)).then(() => {
        genExportExcel();
      });
    } else {
      dispatch(
        AWSBillingActions.requestAWSBillings(
          currentUser.employeeID,
          searchText ? searchText : '',
          'descending',
          'billingPeriod',
          1,
          props.tableData.totalRows
        )
      ).then(() => {
        genExportExcel();
      });
    }
  };

  return (
    <>
      <Grid columns="equal">
        <Grid.Column width={6}>
          <Header as="h4">
            <Header.Content>AWS Billing</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column width={10}>
          <Tooltips
            content="Export To Excel"
            trigger={
              <Button
                className="m-05r"
                icon="file excel"
                size="small"
                color="blue"
                floated="right"
                content="Export Excel"
                onClick={() => exportTableToExcel('export', `AWSBilling ${currDate}`)}
              />
            }
          />
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Row>
          <Grid.Column>
            <div className="wrapper-table mb-1r">
              <CreditBillingServiceTable
                pageSize={pageSize}
                page={page}
                tabItem={tabItem}
                tableData={tableData}
                columns={columns}
                setColumns={setColumns}
                direction={direction}
                setDirection={setDirection}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={'equal'}>
          <Grid.Column floated="left" width={8}>
            <Pagination
              activePage={page}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={tableData.totalRows}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid centered columns={1} className="legendGrid">
        <Grid.Row>
          <Grid.Column className="FullGrid767" width={9}>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={15}>
                    <h5>Notes :</h5>
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={6}>
                    <Label className="legendSA" circular color="red" empty key="red" />
                    <p>Unmapping</p>
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={5}>
                    <Label className="legendSA" circular color="yellow" empty key="yellow" />
                    <p>Unsettle</p>
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={5}>
                    <Label className="legendSA" circular color="green" empty key="green" />
                    <p>Settle</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default TabComponent;

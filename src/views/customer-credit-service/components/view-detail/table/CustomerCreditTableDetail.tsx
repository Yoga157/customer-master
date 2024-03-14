import React, { Fragment, useState, useEffect } from 'react';
import { Table, Dropdown, Grid, Header } from 'semantic-ui-react';
import { Pagination, Tooltips, Button } from 'views/components/UI';
import styles from './FunnelTable.module.scss';
import './FunnelTableStyle.scss';
import { Link } from 'react-router-dom';

import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { useSelector, useDispatch } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Dispatch } from 'redux';
import { selectFunnels } from 'selectors/funnel/FunnelSelector';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import TableRowCreditSource from './table-row/TableRowCreditSource';
import TableRowUsageAmount from './table-row/TableRowUsageAmount';
import TableRowUsageDetail from './table-row/TableRowUsageDetail';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import FormTicket from '../../form/form-ticket';
import { format } from 'date-fns';
import * as CustomerCreditAction from 'stores/customer-credit-service/CustomerCreditActions';
import TableToExcel from '@linways/table-to-excel';

interface IProps {
  readonly salesID: number;
  readonly tableData: any;
  readonly type: string;
  readonly title: string;
}

const CustomerCreditTableDetail: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type, title } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePageUsageAmoung, setActivePageUsageAmoung] = useState(1);
  const [activePageCreditSource, setActivePageCreditSource] = useState(1);
  const [activePageUsageDetail, setActivePageUsageDetail] = useState(1);

  const exportTableToExcel = (tableID: string, filename: string): void => {
    /* setActivePage(1);
    if (search !== null) {
      dispatch(FunnelActions.requestSearchFunnel(currentUser.employeeID, search.text, 1, funnelTables.totalRow, columnsorting, direction));
    } else if (filter !== null) {
      const filterNew = new FunnelFilter(filter);
      filterNew.pageSize = funnelTables.totalRow;
      filterNew.page = 1;
      dispatch(FunnelActions.postFunnelFilter(filterNew));
    } else {
      dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, columnsorting, direction, 1, funnelTables.totalRow));
    }

    if (isRequesting == false) { */
    dispatch(CustomerCreditAction.requestUsageDetail(1, 15, +props.salesID));
    setTimeout(() => {
      const tableSelect = document.getElementById('export') as HTMLTableElement;
      const tableHead = document.querySelector('#export > thead > tr > th:nth-child(1)') as HTMLTableElement;
      tableHead.style.display = 'none';
      for (let i = 0; i < tableSelect.rows.length; i++) {
        const firstCol = tableSelect.rows[i].cells[0];
        firstCol.remove();
      }
      TableToExcel.convert(tableSelect, {
        name: 'UsageDetail ' + currDate + '.xlsx',
        sheet: {
          name: 'Sheet 1',
        },
      });
    }, 3000);
    setTimeout(() => {
      window.location.href = window.location.origin + window.location.pathname;
    }, 4000);
    //}
  };

  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
  // width:800px;height:300px;overflow-x: scroll;
  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <Grid columns="equal">
          <Grid.Column width={4}>
            <Header as="h4">
              <Header.Content>{title}</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column width={12}>
            {type == 'usage-detail' && (
              <Fragment>
                <Tooltips
                  content="Add New Ticket"
                  trigger={
                    <Button
                      className="m-05r"
                      icon="plus"
                      color="yellow"
                      disabled={false}
                      floated="right"
                      size="small"
                      content="Add New Ticket"
                      onClick={() =>
                        dispatch(ModalFirstLevelActions.OPEN(<FormTicket typeForm="ADD" rowData="" salesID={props.salesID} />, ModalSizeEnum.Small))
                      }
                    />
                  }
                />
                <Tooltips
                  content="Export this data"
                  trigger={
                    <Button
                      className="m-05r"
                      icon="file excel"
                      size="small"
                      color="blue"
                      content="Export Excel"
                      floated="right"
                      onClick={() => exportTableToExcel('export', `UsageDetail ${currDate}`)}
                    />
                  }
                />
              </Fragment>
            )}
          </Grid.Column>
        </Grid>

        <div style={{ overflowX: 'scroll', width: '100%', marginTop: '30px' }}>
          <Table style={{ padding: 0 }} sortable striped id="export" data-cols-width="10,30,20,40,40,60,10,10,15,20">
            <Table.Header>
              <Table.Row>
                {type === 'usage-detail' && (
                  <>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Ticket Number</Table.HeaderCell>
                    <Table.HeaderCell>Ticket Title</Table.HeaderCell>
                    <Table.HeaderCell>Presales Name</Table.HeaderCell>
                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                    <Table.HeaderCell>Dept</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Ticket Date</Table.HeaderCell>
                    <Table.HeaderCell>Resource</Table.HeaderCell>
                    <Table.HeaderCell>Complexity</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Added By</Table.HeaderCell>
                    <Table.HeaderCell>Modified By</Table.HeaderCell>
                  </>
                )}
                {type === 'usage-amount' && (
                  <>
                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                    <Table.HeaderCell>Dept Name</Table.HeaderCell>
                    <Table.HeaderCell>Usage Amount</Table.HeaderCell>{' '}
                  </>
                )}
                {type === 'credit-source' && (
                  <>
                    <Table.HeaderCell>Funnel No</Table.HeaderCell>
                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                    <Table.HeaderCell>Credit Amount</Table.HeaderCell>
                    <Table.HeaderCell>Added By</Table.HeaderCell>{' '}
                  </>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {props.tableData.rows.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
                    No data
                  </Table.Cell>
                </Table.Row>
              )}
              {type === 'credit-source' &&
                props.tableData.rows.map((model: any, index: number) => <TableRowCreditSource index={index} key={index} rowData={model} />)}

              {type === 'usage-amount' &&
                props.tableData.rows.map((model: any, index: number) => <TableRowUsageAmount index={index} key={index} rowData={model} />)}

              {type === 'usage-detail' &&
                props.tableData.rows.map((model: any, index: number) => <TableRowUsageDetail index={index} key={index} rowData={model} />)}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CustomerCreditTableDetail;

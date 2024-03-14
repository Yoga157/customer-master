import React, { Fragment } from 'react';
import { Button, Dropdown, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import HtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import moment from 'moment';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ReassignTicketList from './childs/form/ReassignTicketList';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import FormTicket from '../../form/FormTicket';
import './TicketListTableStyles.scss';
import IStore from 'models/IStore';

function TicketListTableRow({ rowData }) {
  const dispatch: Dispatch = useDispatch();
  const isExport: any = useSelector((state: IStore) => state.ticket?.isExport);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  return (
    <Fragment>
      <Table.Row>
        {!isExport && (
          <Table.Cell>
            <Dropdown pointing="left" icon="ellipsis vertical" tabIndex={20000}>
              <Dropdown.Menu>
                {(currentUser.role === 'SMO' || currentUser.role === 'Engineer' || currentUser.role === 'Admin') && (
                  <Dropdown.Item
                    text="View/Edit"
                    icon="edit outline"
                    onClick={() =>
                      dispatch(
                        ModalFirstLevelActions.OPEN(
                          <FormTicket type={'EDIT'} page="ticket" rowData={rowData} />,
                          ModalSizeEnum.FullScreen,
                          false,
                          false
                        )
                      )
                    }
                  />
                )}

                {rowData.primaryResourcesSuperiorId?.split(',').find((e) => e === `${currentUser.employeeID}`) && (
                  <Dropdown.Item
                    text="Reassign Ticket"
                    icon="users"
                    onClick={() =>
                      dispatch(ModalFirstLevelActions.OPEN(<ReassignTicketList rowData={rowData} page="row-ticket-list" />, ModalSizeEnum.Small))
                    }
                  />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        )}

        <Table.Cell>{rowData.ticketUID}</Table.Cell>
        <Table.Cell>{rowData.ticketName}</Table.Cell>
        <Table.Cell>{rowData.description && HtmlParser(rowData.description)}</Table.Cell>
        <Table.Cell>{rowData.primaryResources}</Table.Cell>
        <Table.Cell>{rowData.secondaryResources}</Table.Cell>
        <Table.Cell>{rowData.estStartDate && moment(rowData.estStartDate).format('DD/MM/YYYY')}</Table.Cell>
        <Table.Cell>{rowData.estEndDate && moment(rowData.estEndDate).format('DD/MM/YYYY')}</Table.Cell>
        <Table.Cell>{rowData.actualStartDate && moment(rowData.actualStartDate).format('DD/MM/YYYY')}</Table.Cell>
        <Table.Cell>{rowData.actualEndDate && moment(rowData.actualEndDate).format('DD/MM/YYYY')}</Table.Cell>
        <Table.Cell className="PMO-Status">
          {rowData.status && (
            <Button
              type="button"
              className={`${rowData.status === 'New' ? 'greenYellow' : rowData.status === 'In Progress' ? 'purple2' : ''}`}
              color={
                rowData.status === 'Accepted'
                  ? 'grey'
                  : rowData.status === 'Resolved'
                  ? 'blue'
                  : rowData.status === 'Void'
                  ? 'red'
                  : rowData.status === 'Hold'
                  ? 'yellow'
                  : rowData.status === 'Assigned'
                  ? 'purple'
                  : rowData.status === 'Closed'
                  ? 'green'
                  : 'red'
              }
            >
              {rowData.status}
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>{rowData.remark && HtmlParser(rowData.remark)}</Table.Cell>
        <Table.Cell>{rowData.createDate && moment(rowData.createDate).format('DD/MM/YYYY')}</Table.Cell>
        <Table.Cell>{rowData.createUserName}</Table.Cell>
        <Table.Cell>{rowData.modifyDate && moment(rowData.modifyDate).format('DD/MM/YYYY')}</Table.Cell>
        <Table.Cell>{rowData.modifyUserName}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
}

export default TicketListTableRow;

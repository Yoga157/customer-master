import React, { Fragment } from 'react';
import { Button, Dropdown, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import HtmlParser from 'react-html-parser';
import { Dispatch } from 'redux';
import moment from 'moment';

import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import FormTicket from 'views/ticket-page/page-ticket/components/form/FormTicket';
import { WorklistRowsModel } from 'stores/work-list/models/WorkListModel';
import ReassignWorklist from './components/form/ReassignWorklist';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import FormWoklist from '../../form/FormWoklist';
import './WorkListTableRowStyles.scss';
import IStore from 'models/IStore';

function WorkListTableRow({ rowData }: { rowData: WorklistRowsModel }) {
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isExport: any = useSelector((state: IStore) => state.workList?.isExport);

  const handleViewEdit = (rowData) => {
    if (rowData.workType?.toLowerCase() === 'task') {
      dispatch(ModalFirstActions.OPEN(<FormWoklist type="EDIT" rowData={rowData} />, ModalSizeEnum.Small, true));
    } else if (rowData.workType?.toLowerCase() === 'ticket') {
      const rowItem = {
        ticketId: rowData.workId,
        ticketUID: rowData.uid,
      };
      dispatch(ModalFirstActions.OPEN(<FormTicket type={'EDIT'} rowData={rowItem} page="work-list" />, ModalSizeEnum.FullScreen, false, false));
    } else {
      alert('ini selain ticket dan task ya');
    }
  };

  return (
    <Fragment>
      <Table.Row>
        {!isExport && (
          <Table.Cell>
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                {(currentUser.role === 'SMO' ||
                  currentUser.role === 'PMO' ||
                  currentUser.role === 'PMOS' ||
                  currentUser.role === 'Presales' ||
                  currentUser.role === 'Engineer') && <Dropdown.Item text="View/Edit" icon="edit outline" onClick={() => handleViewEdit(rowData)} />}
                {rowData.primaryResourcesSuperiorId?.split(',').find((e) => e === `${currentUser.employeeID}`) && (
                  <Dropdown.Item
                    text="Reassign Work"
                    icon="users"
                    onClick={() => dispatch(ModalFirstActions.OPEN(<ReassignWorklist rowData={rowData} page={'worklist'} />, ModalSizeEnum.Small))}
                  />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        )}

        <Table.Cell>{rowData.uid}</Table.Cell>
        <Table.Cell>{rowData.workName}</Table.Cell>
        <Table.Cell>{rowData.projectName}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.engineerName}</Table.Cell>
        <Table.Cell>{rowData.description && HtmlParser(rowData.description)}</Table.Cell>
        <Table.Cell>{rowData.estStartDate ? moment(rowData.estStartDate).format('DD/MM/YYYY') : ''}</Table.Cell>
        <Table.Cell>{rowData.estEndDate ? moment(rowData.estEndDate).format('DD/MM/YYYY') : ''}</Table.Cell>
        <Table.Cell>{rowData.actualStartDate ? moment(rowData.actualStartDate).format('DD/MM/YYYY') : ''}</Table.Cell>
        <Table.Cell>{rowData.actualEndDate ? moment(rowData.actualEndDate).format('DD/MM/YYYY') : ''}</Table.Cell>
        <Table.Cell className="PMO-Status">
          {rowData.workStatus && (
            <Button
              type="button"
              className={`${rowData.workStatus === 'New' ? 'greenYellow' : rowData.workStatus === 'In Progress' ? 'purple2' : ''}`}
              color={
                rowData.workStatus === 'Accepted'
                  ? 'grey'
                  : rowData.workStatus === 'Resolved'
                  ? 'blue'
                  : rowData.workStatus === 'Void'
                  ? 'red'
                  : rowData.workStatus === 'Hold'
                  ? 'yellow'
                  : rowData.workStatus === 'Assigned'
                  ? 'purple'
                  : rowData.workStatus === 'Closed'
                  ? 'green'
                  : 'red'
              }
            >
              {rowData.workStatus}
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>{rowData.creatorName}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
}

export default WorkListTableRow;

import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';

import TicketListTableRow from './table-row/TicketListTableRow';
import TicketPageHooks from '../../hooks/TicketPageHooks';
import IStore from 'models/IStore';

interface IProps {
  tableData: any;
}

const TicketListTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  const { reloads, direction, columns } = TicketPageHooks();

  const isExport: any = useSelector((state: IStore) => state.ticket?.isExport);

  return (
    <Table sortable striped id="table-ticketList" data-cols-width="15,15,30,50,50,15,15,15,15,15,25,15,20,15,20" className="font-size-1">
      <Table.Header>
        <Table.Row>
          {!isExport && <Table.HeaderCell></Table.HeaderCell>}
          <Table.HeaderCell sorted={columns === 'ticketId' ? direction : null} onClick={() => reloads('ticketId', direction)}>
            Ticket ID
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'ticketName' ? direction : null} onClick={() => reloads('ticketName', direction)}>
            Ticket Title
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'description' ? direction : null} onClick={() => reloads('description', direction)}>
            Description
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'taskResources' ? direction : null} onClick={() => reloads('taskResources', direction)}>
            Resource
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'secondaryResources' ? direction : null} onClick={() => reloads('secondaryResources', direction)}>
            Secondary Resources
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'estStartDate' ? direction : null} onClick={() => reloads('estStartDate', direction)}>
            Est.Start Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'estEndDate' ? direction : null} onClick={() => reloads('estEndDate', direction)}>
            Est.End Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'actualStartDate' ? direction : null} onClick={() => reloads('actualStartDate', direction)}>
            Actual Start Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'actualEndDate' ? direction : null} onClick={() => reloads('actualEndDate', direction)}>
            Actual End Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'status' ? direction : null} onClick={() => reloads('status', direction)}>
            Status
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'remark' ? direction : null} onClick={() => reloads('remark', direction)}>
            Remark
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'createDate' ? direction : null} onClick={() => reloads('createDate', direction)}>
            Created Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'createUserName' ? direction : null} onClick={() => reloads('createUserName', direction)}>
            Created By
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'modifyDate' ? direction : null} onClick={() => reloads('modifyDate', direction)}>
            Modified Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'modifyUserName' ? direction : null} onClick={() => reloads('modifyUserName', direction)}>
            Modified By
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={15} textAlign="center" className="">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {props.tableData.map((model, key) => (
          <TicketListTableRow key={key} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default TicketListTable;

import React from 'react';
import {  Table } from 'semantic-ui-react';
import { IHistoryRow } from 'selectors/pss/models/IHistory';

function PSSHistoryTable({ tableData }) {

  return (
    <>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Version Number</Table.HeaderCell>
            <Table.HeaderCell>Document ID</Table.HeaderCell>
            <Table.HeaderCell>Document Name</Table.HeaderCell>
            <Table.HeaderCell>Document Type</Table.HeaderCell>
            <Table.HeaderCell>Project Name</Table.HeaderCell>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Created By</Table.HeaderCell>
            <Table.HeaderCell>Created Date</Table.HeaderCell>
            <Table.HeaderCell>Modified By</Table.HeaderCell>
            <Table.HeaderCell>Modified Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={10} textAlign="center">
                NO DATA
              </Table.Cell>
            </Table.Row>
          )}

          {tableData.map((item: IHistoryRow) => {
            return (
              <Table.Row>
                <Table.Cell>{item.versionNumber}</Table.Cell>
                <Table.Cell>{item.pssDocumentId}</Table.Cell>
                <Table.Cell>{item.documentName}</Table.Cell>
                <Table.Cell>{item.documentType}</Table.Cell>
                <Table.Cell>{item.projectName}</Table.Cell>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell>{item.createUserName}</Table.Cell>
                <Table.Cell>{item.createDate}</Table.Cell>
                <Table.Cell>{item.modifyUserName}</Table.Cell>
                <Table.Cell>{item.modifyDate}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}

export default PSSHistoryTable;

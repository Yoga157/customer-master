import React from 'react';
import { Table } from 'semantic-ui-react';

function ConfigItemUploadFailedTableRow({ rowData, isGenExcel }) {
  return (
    <Table.Row>
      {!isGenExcel && <Table.Cell>{rowData.errorMessage}</Table.Cell>}

      <Table.Cell>{rowData.configItemGenID}</Table.Cell>
      <Table.Cell>{rowData.projectId}</Table.Cell>
      <Table.Cell>{rowData.funnelGenId}</Table.Cell>
      <Table.Cell>{rowData.poNumber}</Table.Cell>
      <Table.Cell>{rowData.doNumber}</Table.Cell>
      <Table.Cell>{rowData.doDate}</Table.Cell>
      <Table.Cell>{rowData.brand}</Table.Cell>
      <Table.Cell>{rowData.productNumber}</Table.Cell>
      <Table.Cell>{rowData.productDescription}</Table.Cell>
      <Table.Cell>{rowData.serialNumber}</Table.Cell>
    </Table.Row>
  );
}

export default ConfigItemUploadFailedTableRow;

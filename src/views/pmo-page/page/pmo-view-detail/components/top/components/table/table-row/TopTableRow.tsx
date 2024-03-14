import React from 'react';
import { Table } from 'semantic-ui-react';
import { format } from 'date-fns';

function TopTableRow(props) {
  const { rowData } = props;

  return (
    <Table.Row>
      <Table.Cell textAlign="center">{rowData?.topNumber}</Table.Cell>
      <Table.Cell textAlign="center" style={{ display: 'inline-block', wordBreak: 'break-word' }}>
        {rowData?.invoiceNumber}
      </Table.Cell>
      <Table.Cell textAlign="center">{rowData?.invoiceDate && format(new Date(rowData?.invoiceDate), 'dd/MM/yyyy')}</Table.Cell>
      <Table.Cell textAlign="center">{rowData?.invoiceDescription}</Table.Cell>
      <Table.Cell textAlign="center">{rowData?.productDescStr}</Table.Cell>
      <Table.Cell textAlign="center">{rowData?.productPercentage}</Table.Cell>
      <Table.Cell textAlign="center">{rowData?.serviceDescStr}</Table.Cell>
      <Table.Cell textAlign="center">{rowData?.servicePercentage}</Table.Cell>
      <Table.Cell textAlign="center">{rowData?.supportDoc}</Table.Cell>
      <Table.Cell textAlign="center">{rowData?.docCollectionDate && format(new Date(rowData?.docCollectionDate), 'dd/MM/yyyy')}</Table.Cell>
    </Table.Row>
  );
}

export default TopTableRow;

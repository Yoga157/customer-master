import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Table } from 'semantic-ui-react';
import { format } from 'date-fns';

import { RowHistoryGpm } from 'selectors/funnel/models/IFunnelHistoryGpm';

function GpmHistoryTableRow({ rowData }: { rowData: RowHistoryGpm }) {
  return (
    <Table.Row>
      <Table.Cell>{rowData.totalSellingProduct.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.totalCostProduct.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.totalExpendProduct.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.gpmProduct.toLocaleString()}</Table.Cell>

      <Table.Cell>{rowData.totalSellingService.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.totalCostService.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.totalExpendService.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.gpmService.toLocaleString()}</Table.Cell>

      <Table.Cell>{rowData.gpmAmount.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.gpmPercentage}</Table.Cell>
      <Table.Cell>{rowData.remark ? ReactHtmlParser(rowData.remark) : ''}</Table.Cell>
      <Table.Cell>{rowData?.createDate && format(new Date(rowData?.createDate), 'dd/MM/yyyy')}</Table.Cell>
    </Table.Row>
  );
}

export default GpmHistoryTableRow;

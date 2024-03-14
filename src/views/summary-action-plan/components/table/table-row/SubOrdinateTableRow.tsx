import React from 'react';
import { Table } from 'semantic-ui-react';
import ISummaryActionPlanSubordinate from 'selectors/summary-actionplan/models/ISummaryActionPlanSubordinate';
import ReactHtmlParser from 'react-html-parser';

interface IProps {
  readonly rowData: ISummaryActionPlanSubordinate;
}

const SubOrdinateTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;

  return (
    <Table.Row key={rowData.empName}>
      <Table.Cell>{rowData.empName}</Table.Cell>
      <Table.Cell>{rowData.quotaGPM.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.performanceGPM.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.gapGPM.toLocaleString()}</Table.Cell>
      <Table.Cell>{ReactHtmlParser(rowData.lastActionPlan)}</Table.Cell>
    </Table.Row>
  );
};

export default SubOrdinateTableRow;

import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDetailsDataTableRow from '../../../../../../selectors/kpi/models/IKpiDetailsDataTableRow';

interface IProps {
  readonly rowData: IKpiDetailsDataTableRow;
}

const KpiDetailsDataTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;

  return (
    <Table.Row key={rowData.id}>
      <Table.Cell>{rowData.noDoc}</Table.Cell>
      <Table.Cell>{rowData.docDate}</Table.Cell>
      <Table.Cell>{rowData.kpiStatus}</Table.Cell>
    </Table.Row>
  );
};

export default KpiDetailsDataTableRow;

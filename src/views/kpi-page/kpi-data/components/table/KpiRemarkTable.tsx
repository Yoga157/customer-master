import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDetailsTable from '../../../../../selectors/kpi/models/IKpiDetailsTable';
import IKpiDataRemarkTable from 'selectors/kpi/kpi-data/models/IKpiDataRemarkTable';
import IKpiDetailsTableRow from '../../../../../selectors/kpi/models/IKpiDetailsTableRow';
import IKpiDataRemarkTableRow from 'selectors/kpi/kpi-data/models/IKpiDataRemarkTableRow';
import KpiRemarkTableRow from './table-row/KpiRemarkTableRow';

interface IProps {
  readonly tableData: IKpiDataRemarkTable;
}

const KpiRemarkTable: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Remark</Table.HeaderCell>
          <Table.HeaderCell>Modified By</Table.HeaderCell>
          <Table.HeaderCell>Modified Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.map((model: IKpiDataRemarkTableRow) => (
          <KpiRemarkTableRow key={model.id} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default KpiRemarkTable;

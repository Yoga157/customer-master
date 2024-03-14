import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDataDashboardDeptTable from '../../../../../selectors/kpi/kpi-data/models/IKpiDataDashboardDeptTable';
import IKpiDataDashboardDeptTableRow from '../../../../../selectors/kpi/kpi-data/models/IKpiDataDashboardDeptTableRow';
import KpiPICListByDeptTableRow from './table-row/KpiPICListByDeptTableRow';
import styles from './KpiSummaryPICTable.module.scss';

interface IProps {
  readonly tableData: IKpiDataDashboardDeptTable;
}

const KpiPICListByDeptTable: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Dept Name</Table.HeaderCell>
          <Table.HeaderCell>Total PIC</Table.HeaderCell>
          <Table.HeaderCell>Total Key Activity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={3} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: IKpiDataDashboardDeptTableRow) => (
          <KpiPICListByDeptTableRow key={model.deptId} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default KpiPICListByDeptTable;

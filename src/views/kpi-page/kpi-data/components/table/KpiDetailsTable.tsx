import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDataTable from '../../../../../selectors/kpi/kpi-data/models/IKpiDataTable';
import IKpiDataTableRow from '../../../../../selectors/kpi/kpi-data/models/IKpiDataTableRow';
import KpiDetailsTableRow from './table-row/KpiDetailsTableRow';
import styles from './KpiDetailsDataTable.module.scss';
import './KpiTableCustomStyle.scss';

interface IProps {
  readonly tableData: IKpiDataTable;
  readonly kpiDireksiArr: any;
}

const KpiDetailsTable: React.FC<IProps> = ({ tableData, kpiDireksiArr }) => {
  return (
    <Table className="KpiStripedTable" striped id="pdf">
      <Table.Header>
        <Table.Row>
          {/* <Table.HeaderCell rowSpan="2"></Table.HeaderCell> */}
          <Table.HeaderCell rowSpan="2">KPI Direksi</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Last Update</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Key Activity</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">PIC</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Measurement</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Weight</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Point</Table.HeaderCell>
          <Table.HeaderCell colSpan="2" textAlign="center">
            Q1
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="2" textAlign="center">
            Q2
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="2" textAlign="center">
            Q3
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="2" textAlign="center">
            Q4
          </Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Total Nilai</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Remark</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Point</Table.HeaderCell>
          <Table.HeaderCell>Nilai</Table.HeaderCell>
          <Table.HeaderCell>Point</Table.HeaderCell>
          <Table.HeaderCell>Nilai</Table.HeaderCell>
          <Table.HeaderCell>Point</Table.HeaderCell>
          <Table.HeaderCell>Nilai</Table.HeaderCell>
          <Table.HeaderCell>Point</Table.HeaderCell>
          <Table.HeaderCell>Nilai</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {kpiDireksiArr.map((model, k) => (
          <KpiDetailsTableRow key={k} tableData={tableData} kpiDireksi={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default KpiDetailsTable;

import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDataTable from '../../../../../selectors/kpi/kpi-data/models/IKpiDataTable';
import IKpiDataTableRow from '../../../../../selectors/kpi/kpi-data/models/IKpiDataTableRow';
import KpiDetailsTableRow from './table-row/KpiDetailsTableRow';
import styles from './KpiDetailsDataTable.module.scss';

interface IProps {
  readonly tableData: any;
}

const KpiDetailsPdf: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table striped id="kpiTable">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan="2"></Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">KPI Direksi</Table.HeaderCell>
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
        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.map((model: IKpiDataTableRow) => ({
          /* <KpiDetailsTableRow key={model.udcid} rowData={model} /> */
        }))}
        {/*  <Table.Row>
          <Table.Cell colSpan={6}>Total</Table.Cell>
          <Table.Cell>x</Table.Cell>
          <Table.Cell>x</Table.Cell>
          <Table.Cell>x</Table.Cell>
          <Table.Cell>x</Table.Cell>
        </Table.Row> */}
      </Table.Body>
    </Table>
  );
};

export default KpiDetailsPdf;

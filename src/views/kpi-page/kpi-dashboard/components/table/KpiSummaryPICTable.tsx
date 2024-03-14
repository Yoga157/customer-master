import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDataTable from '../../../../../selectors/kpi/kpi-data/models/IKpiDataTable';
import IKpiDataTableRow from '../../../../../selectors/kpi/kpi-data/models/IKpiDataTableRow';
import KpiSummaryPICTableRow from './table-row/KpiSummaryPICTableRow';
import styles from './KpiSummaryPICTable.module.scss';

interface IProps {
  readonly tableData: IKpiDataTable;
}

const KpiSummaryPICTable: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          {/* <Table.HeaderCell></Table.HeaderCell> */}
          <Table.HeaderCell rowSpan="2">PIC Name</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Dept</Table.HeaderCell>
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
          <Table.HeaderCell rowSpan="2">Percent</Table.HeaderCell>
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
            <Table.Cell colSpan={11} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: IKpiDataTableRow) => (
          <KpiSummaryPICTableRow key={model.emplid} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default KpiSummaryPICTable;

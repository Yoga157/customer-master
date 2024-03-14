import React from 'react';
import { Table } from 'semantic-ui-react';
import IKpiDetailsDataTable from '../../../../../selectors/kpi/models/IKpiDetailsDataTable';
import IKpiDetailsDataTableRow from '../../../../../selectors/kpi/models/IKpiDetailsDataTableRow';
import KpiDetailsDataTableRow from './table-row/KpiDetailsDataTableRow';
import styles from './KpiDetailsDataTable.module.scss';

interface IProps {
  readonly tableData: IKpiDetailsDataTable;
}

const KpiDetailsTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No Doc</Table.HeaderCell>
          <Table.HeaderCell>Doc Date</Table.HeaderCell>
          <Table.HeaderCell>KPI Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableData.rows.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
              No Data
            </Table.Cell>
          </Table.Row>
        ) : (
          props.tableData.rows.map((model: IKpiDetailsDataTableRow) => <KpiDetailsDataTableRow key={model.id} rowData={model} />)
        )}
      </Table.Body>
    </Table>
  );
};

export default KpiDetailsTable;

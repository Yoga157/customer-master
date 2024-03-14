import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './UsageTable.module.scss';
import IUsageDashboardDetailTable from 'selectors/aws-billing/models/UsageDashboardTable/IUsageDashboardTable';
import IUsageDashboardDetailRow from 'selectors/aws-billing/models/UsageDashboardTable/IUsageDashboardTableRow';
import UsageTableRow from './table-row/UsageTableRow';

interface IProps {
  readonly tableData?: IUsageDashboardDetailTable;
}

const UsageTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>SO No.</Table.HeaderCell>
          <Table.HeaderCell>OI.No</Table.HeaderCell>
          <Table.HeaderCell>LPR.No</Table.HeaderCell>
          <Table.HeaderCell>CBV.No</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Neccesity</Table.HeaderCell>
          <Table.HeaderCell>Resources</Table.HeaderCell>
          <Table.HeaderCell>Notes</Table.HeaderCell>
          <Table.HeaderCell>Created Date</Table.HeaderCell>
          <Table.HeaderCell>Created by</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows && tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={12} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows && tableData.rows.map((model: IUsageDashboardDetailRow) => (
          <UsageTableRow 
          rowData={model}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default UsageTable;

import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './BankGaransiTable.module.scss';
import IBankGaransiTable from 'selectors/bank-garansi/models/IBankGaransiTable';
import IBankGaransiTableRow from 'selectors/bank-garansi/models/IBankGaransiTableRow';
import BankGaransiTableRow from './table-row/BankGaransiTableRow';

interface IProps {
  readonly tableData: IBankGaransiTable;
}

const BankGaransiTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  return (
    <Table celled>
      <Table.Header className={styles.BankGaransiTable}>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Bond Issuer</Table.HeaderCell>
          <Table.HeaderCell>Bond Type</Table.HeaderCell>
          <Table.HeaderCell>Letter Type</Table.HeaderCell>
          <Table.HeaderCell>Document Number</Table.HeaderCell>
          <Table.HeaderCell>BG Amount</Table.HeaderCell>
          <Table.HeaderCell>Project Amount</Table.HeaderCell>
          <Table.HeaderCell>Submit Date</Table.HeaderCell>
          <Table.HeaderCell>Expire Date</Table.HeaderCell>
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
        {tableData.rows.map((model: IBankGaransiTableRow) => (
          <BankGaransiTableRow key={model.bankGuaranteeGenID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default BankGaransiTable;

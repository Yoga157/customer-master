import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './HistoryActionPlanTable.module.scss';

interface IProps {
  //readonly tableData:IBankGaransiTable;
}

const HistoryActionPlanTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  //const {tableData}  = props;
  return (
    <Table celled>
      <Table.Header className={styles.HistoryActionPlanTable}>
        <Table.Row>
          <Table.HeaderCell>Log Date</Table.HeaderCell>
          <Table.HeaderCell>Log User</Table.HeaderCell>
          <Table.HeaderCell>Action Plan</Table.HeaderCell>
          <Table.HeaderCell>For Sales</Table.HeaderCell>
          <Table.HeaderCell>Review Month</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );
};

export default HistoryActionPlanTable;

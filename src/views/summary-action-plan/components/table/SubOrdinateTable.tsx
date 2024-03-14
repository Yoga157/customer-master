import React from 'react';
import { Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';
import styles from './SubOrdinateTable.module.scss';
import { selectSummaryActionPlanSubordinate } from 'selectors/summary-actionplan/SummaryActionPlanSelector';
import * as SummaryActionPlanActions from 'stores/summary-actionplan/SummaryActionPlanActions';
import ISummaryActionPlanSubordinate from 'selectors/summary-actionplan/models/ISummaryActionPlanSubordinate';
import SubOrdinateTableRow from './table-row/SubOrdinateTableRow';

interface IProps {}

const SubOrdinateTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const tableData = useSelector((state: IStore) => selectSummaryActionPlanSubordinate(state, [SummaryActionPlanActions.REQUEST_HISTORY]));
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Emp Name</Table.HeaderCell>
          <Table.HeaderCell>Quota GPM</Table.HeaderCell>
          <Table.HeaderCell>Performance GPM</Table.HeaderCell>
          <Table.HeaderCell>Gap GPM</Table.HeaderCell>
          <Table.HeaderCell>Comment</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={5} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.map((model: ISummaryActionPlanSubordinate) => (
          <SubOrdinateTableRow key={model.empName} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default SubOrdinateTable;

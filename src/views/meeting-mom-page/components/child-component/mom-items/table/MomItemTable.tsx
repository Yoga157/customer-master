import React, { useState } from 'react';
import IMeetingMomItemTable from 'selectors/meeting-mom-items/models/IMeetingMomItemTable';
import IMeetingMomItemTableRow from 'selectors/meeting-mom-items/models/IMeetingMomItemTableRow';
import { Table } from 'semantic-ui-react';
import styles from './MomItemTable.module.scss';
import MomItemTableRow from './table-row/MomItemTableRow';

interface IProps {
  readonly tableData: IMeetingMomItemTable;
}

const MomItemTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [activeIndex, setActiveIndex] = useState(true);
  const handleClick = () => {
    setActiveIndex(!activeIndex);
  };
  //const {tableData}  = props
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Topic</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>PIC</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableData.rows.map((model: IMeetingMomItemTableRow) => (
          <MomItemTableRow key={model.activityMomItemsID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default MomItemTable;

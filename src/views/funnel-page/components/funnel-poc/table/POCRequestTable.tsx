import React, { useState } from 'react';
import IPOCTable from 'selectors/funnel-poc-request/models/IPOCTable';
import IPOCTableRow from 'selectors/funnel-poc-request/models/IPOCTableRow';
import { Table } from 'semantic-ui-react';
import styles from './POCRequestTable.module.scss';
import POCRequestTableRow from './table-row/POCRequestTableRow';

interface IProps {
  readonly tableData: IPOCTable;
}

const POCRequestTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [activeIndex, setActiveIndex] = useState(true);
  const handleClick = () => {
    setActiveIndex(!activeIndex);
  };

  const { tableData } = props;
  return (
    <Table className="VhText-1-1200 Text-1r-767" striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Request Date</Table.HeaderCell>
          <Table.HeaderCell>Requestor</Table.HeaderCell>
          <Table.HeaderCell>PIC Name</Table.HeaderCell>
          <Table.HeaderCell>Expected POC Date</Table.HeaderCell>
          <Table.HeaderCell>Actual POC Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Notes</Table.HeaderCell>
          <Table.HeaderCell>Last Update By</Table.HeaderCell>
          <Table.HeaderCell>Last Update Time</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={10} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableData.rows.map((model: IPOCTableRow) => (
          <POCRequestTableRow key={model.pocGenHID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default POCRequestTable;

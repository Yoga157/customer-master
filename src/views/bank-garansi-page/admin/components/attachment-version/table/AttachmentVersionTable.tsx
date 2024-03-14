import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './AttachmentVersionTable.module.scss';
import AttachmentVersionTableRow from './table-row/AttachmentVersionTableRow';
import IAttachmentVersionTableRow from 'selectors/bank-garansi/models/IAttachmentVersionTableRow';
import IAttachmentVersionTable from 'selectors/bank-garansi/models/IAttachmentVersionTable';

interface IProps {
  readonly tableData: IAttachmentVersionTable;
  readonly modul: number;
}

const AttachmentVersionTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Notes</Table.HeaderCell>
          <Table.HeaderCell>Version</Table.HeaderCell>
          <Table.HeaderCell>Upload Time</Table.HeaderCell>
          <Table.HeaderCell>Upload By</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={6} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableData.rows.map((model: IAttachmentVersionTableRow) => (
          <AttachmentVersionTableRow key={model.funnelAttachmentID} rowData={model} modul={props.modul} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default AttachmentVersionTable;

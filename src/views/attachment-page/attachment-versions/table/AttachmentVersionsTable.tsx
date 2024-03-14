import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './AttachmentVersionsTable.module.scss';
import AttachmentVersionsTableRow from './table-row/AttachmentVersionsTableRow';
import IAttachmentVersionsTableRow from 'selectors/attachment-versions/models/IAttachmentVersionsTableRow';
import IAttachmentVersionsTable from 'selectors/attachment-versions/models/IAttachmentVersionsTable';

interface IProps {
  readonly tableData: IAttachmentVersionsTable;
  readonly modul: number;
}

const AttachmentVersionsTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
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
        {props.tableData.rows.map((model: IAttachmentVersionsTableRow) => (
          <AttachmentVersionsTableRow key={model.funnelAttachmentID} rowData={model} modul={props.modul} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default AttachmentVersionsTable;

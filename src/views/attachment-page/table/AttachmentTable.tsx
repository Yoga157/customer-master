import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './AttachmentTable.module.scss';
import AttachmentTableRow from './table-row/AttachmentTableRow';
import IAttachmentTableRow from 'selectors/attachment/models/IAttachmentTableRow';
import IAttachmentAndAcceptenceTableRow from 'selectors/attachment/models/IAttachmentAndAcceptenceTableRow';

interface IProps {
  readonly tableData: any;
  readonly isLocalFirst: boolean;
  readonly modul: number;
  readonly page: string;
}

const AttachmentTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { isLocalFirst, tableData, modul, page } = props;
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Document Name</Table.HeaderCell>
          <Table.HeaderCell>Document Type</Table.HeaderCell>
          <Table.HeaderCell>Version</Table.HeaderCell>
          <Table.HeaderCell>Upload Time</Table.HeaderCell>
          <Table.HeaderCell>Upload By</Table.HeaderCell>
          {page === 'pmo-view-edit' && <Table.HeaderCell>Top Number</Table.HeaderCell>}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={page === 'pmo-view-edit' ? 8 : 7} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: any, k) => (
          <AttachmentTableRow key={k} rowData={model} isLocalFirst={isLocalFirst} modul={modul} page={page} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default AttachmentTable;

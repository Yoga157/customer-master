import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './AttachmentTable.module.scss';
import AttachmentTableRow from './table-row/AttachmentTableRow';
import IAttachmentTableRow from 'selectors/bank-garansi/models/IAttachmentTableRow';
import IAttachmentTable from 'selectors/bank-garansi/models/IAttachmentTable';

interface IProps {
  readonly tableData: IAttachmentTable;
  readonly isLocalFirst: boolean;
  readonly modul: number;
  readonly bankGuaranteeID: string;
  readonly bgNo: string;
}

const AttachmentTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { isLocalFirst, tableData, modul, bgNo } = props;
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
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={7} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: IAttachmentTableRow) => (
          <AttachmentTableRow key={model.funnelAttachmentID} rowData={model} isLocalFirst={isLocalFirst} modul={modul} bankGuaranteeID={props.bankGuaranteeID} bgNo={bgNo}/>
        ))}
      </Table.Body>
    </Table>
  );
};

export default AttachmentTable;

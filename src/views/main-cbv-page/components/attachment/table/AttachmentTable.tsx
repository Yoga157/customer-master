import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './AttachmentTable.module.scss';
import AttachmentTableRow from './table-row/AttachmentTableRow'

interface IProps {
  readonly tableData: any;
  type: string;
  setDataAttachment?: any;
  dataAttachment?: any;
  setValidasiAttachment?: any;
  typecbv?: any;
}

const AttachmentTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData, type, dataAttachment, setDataAttachment, setValidasiAttachment, typecbv } = props;
  
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Document Name</Table.HeaderCell>
          <Table.HeaderCell>Document Type</Table.HeaderCell>
          <Table.HeaderCell>Upload Time</Table.HeaderCell>
          <Table.HeaderCell>Upload By</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData && tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={6} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData && tableData.map((model) => (
          
          <AttachmentTableRow
            rowData={model}
            type={type}
            tableData={tableData}
            dataAttachment={dataAttachment}
            setValidasiAttachment={setValidasiAttachment}
            setDataAttachment={setDataAttachment}
            typecbv={typecbv}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default AttachmentTable;

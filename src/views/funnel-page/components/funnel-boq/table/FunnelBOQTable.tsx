import React from 'react';
import IBoqTable from 'selectors/boq/models/IBoqTable';
import IBoqTableRow from 'selectors/boq/models/IBoqTableRow';
import { Table } from 'semantic-ui-react';
import styles from './FunnelBOQTable.module.scss';
import FunnelBOQTableRow from './table-row/FunnelBOQTableRow';

interface IProps {
  readonly tableData: IBoqTable;
}
const FunnelBOQTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table className="VhText-1-1200 Text-1r-767" striped id="export-boq">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Product Number</Table.HeaderCell>
          <Table.HeaderCell>Serial Number</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Warranty</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>Sub Brand</Table.HeaderCell>
          <Table.HeaderCell>Covered Hour</Table.HeaderCell>
          <Table.HeaderCell>Response Time Type</Table.HeaderCell>
          <Table.HeaderCell>Response Time (Hours) </Table.HeaderCell>
          <Table.HeaderCell>Resolution Time Type</Table.HeaderCell>
          <Table.HeaderCell>Resolution Time (Hours) </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={13} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableData.rows.map((model: IBoqTableRow) => (
          <FunnelBOQTableRow key={model.boqGenID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelBOQTable;

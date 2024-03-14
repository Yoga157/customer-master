import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './WarrantySLATable.module.scss';
import WarrantySLATableRow from './table-row/WarrantySLATableRow';
import IFunnelWarrantySLATable from 'selectors/funnel-warranty-sla/models/IFunnelWarrantySLATable';
import IFunnelWarrantySLATableRow from 'selectors/funnel-warranty-sla/models/IFunnelWarrantySLATableRow';

interface IProps {
  readonly tableData: IFunnelWarrantySLATable;
}
const WarrantySLATable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;

  return (
    <Table striped>
      <Table.Header className={styles.WarrantySLA}>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Problem Class</Table.HeaderCell>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>Sub Brand</Table.HeaderCell>
          <Table.HeaderCell>Start Vendor Warranty</Table.HeaderCell>
          <Table.HeaderCell>Vendor Warranty (P\L\O)</Table.HeaderCell>
          <Table.HeaderCell>End Vendor Warranty</Table.HeaderCell>
          <Table.HeaderCell>Start Customer Warranty</Table.HeaderCell>
          <Table.HeaderCell>Customer Warranty (P\L\O)</Table.HeaderCell>
          <Table.HeaderCell>End Customer Warranty</Table.HeaderCell>
          <Table.HeaderCell>Service Location</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: IFunnelWarrantySLATableRow) => (
          <WarrantySLATableRow key={model.warrantySLAGenID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default WarrantySLATable;

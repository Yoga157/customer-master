import React, { useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import styles from './FunnelWarrantySLAVendor.module.scss';
import IFunnelWarrantySLAVendorTable from 'selectors/funnel-warranty-sla-vendor/models/IFunnelWarrantySLAVendorTable';
import IFunnelWarrantySLAVendorTableRow from 'selectors/funnel-warranty-sla-vendor/models/IFunnelWarrantySLAVendorTableRow';
import FunnelWarrantySLAVendorTableRow from './table-row/FunnelWarrantySLAVendorTableRow';

interface IProps {
  readonly tableData: IFunnelWarrantySLAVendorTable;
}

const FunnelWarrantySLAVendorTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  return (
    <Table striped>
      <Table.Header className={styles.FunnelWarrantySLAVendorTable}>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Product Number</Table.HeaderCell>
          <Table.HeaderCell>Service Location</Table.HeaderCell>
          <Table.HeaderCell>Coverage Hour</Table.HeaderCell>
          <Table.HeaderCell>Response Time</Table.HeaderCell>
          <Table.HeaderCell>Resolution Time</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={9} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows
          .filter((item) => item.slaType === 'Vendor')
          .map((model: IFunnelWarrantySLAVendorTableRow) => (
            <FunnelWarrantySLAVendorTableRow key={model.warrantySLADetailID} rowData={model} />
          ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelWarrantySLAVendorTable;

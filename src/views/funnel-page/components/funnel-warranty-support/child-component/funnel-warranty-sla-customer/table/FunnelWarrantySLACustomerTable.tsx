import React, { useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import styles from './FunnelWarrantySLACustomer.module.scss';
import IFunnelWarrantySLACustomerTable from 'selectors/funnel-warranty-sla-customer/models/IFunnelWarrantySLACustomerTable';
import IFunnelWarrantySLACustomerTableRow from 'selectors/funnel-warranty-sla-customer/models/IFunnelWarrantySLACustomerTableRow';
import FunnelWarrantySLACustomerTableRow from './table-row/FunnelWarrantySLACustomerTableRow';

interface IProps {
  readonly tableData: IFunnelWarrantySLACustomerTable;
}

const FunnelWarrantySLACustomerTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  return (
    <Table striped>
      <Table.Header className={styles.FunnelWarrantySLACustomerTable}>
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
          .filter((item) => item.slaType === 'Customer')
          .map((model: IFunnelWarrantySLACustomerTableRow) => (
            <FunnelWarrantySLACustomerTableRow key={model.warrantySLADetailID} rowData={model} />
          ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelWarrantySLACustomerTable;

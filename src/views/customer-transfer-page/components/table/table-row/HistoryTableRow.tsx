import React from 'react';
import { Image, Table } from 'semantic-ui-react';
import { IHistoryTableRow } from 'selectors/customer-transfer/models/ICustomerTransferTableRow';

interface IProps {
  readonly rowData: IHistoryTableRow;
}

const HistoryTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  return (
    <Table.Row key={rowData.id}>
      <Table.Cell>{rowData.customerName}</Table.Cell>
      <Table.Cell>{rowData.funnelID}</Table.Cell>
      <Table.Cell>
        {rowData.fromSales} - {rowData.toSales}
      </Table.Cell>
      <Table.Cell>
        {new Intl.DateTimeFormat('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        }).format(new Date(rowData.createDate))}
      </Table.Cell>
    </Table.Row>
  );
};

export default HistoryTableRow;

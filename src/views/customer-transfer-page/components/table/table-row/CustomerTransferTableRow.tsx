import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Table } from 'semantic-ui-react';
import IStore from 'models/IStore';
import * as CustomerTransferAction from 'stores/customer-transfer/CustomerTransferActions';
import { ICustomerTransferTableRow } from 'selectors/customer-transfer/models/ICustomerTransferTableRow';
import { format } from 'date-fns';

interface IProps {
  readonly rowData: ICustomerTransferTableRow;
}

const CustomerTransferTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;

  const dispatch: Dispatch = useDispatch();
  const funnelStore = useSelector((state: IStore) => state.dataFunnel.dataFunnel);

  const CheckedChange = (e: any) => {
    e.persist();
    if (e.target.checked) {
      dispatch(CustomerTransferAction.dataFunnel([...funnelStore, Number(e.target.value)]));
    } else {
      let funnelStores = [] as any;
      funnelStore.map((data: any) => {
        funnelStores = [...funnelStores, data];
      });

      dispatch(CustomerTransferAction.dataFunnel(funnelStores.filter((item: any) => item !== Number(e.target.value))));
    }
  };

  return (
    <Table.Row key={rowData.funnelGenID}>
      <Table.Cell>
        <input type="checkbox" value={rowData.funnelGenID} onChange={CheckedChange} />
      </Table.Cell>
      <Table.Cell>{rowData.funnelGenID}</Table.Cell>
      <Table.Cell>{rowData.customerName}</Table.Cell>
      <Table.Cell>{rowData.projectName}</Table.Cell>
      <Table.Cell>{rowData.totalSellingPrice.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.gpmAmount.toLocaleString()}</Table.Cell>
      <Table.Cell>{format(new Date(rowData.dealCloseDate), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>{rowData.funnelStatus}</Table.Cell>
    </Table.Row>
  );
};

export default CustomerTransferTableRow;

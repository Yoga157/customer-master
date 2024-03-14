import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import './FunnelSATableRow.scss';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions'
import FunnelPORowModel from 'stores/bank-garansi/models/FunnelPORowModel'

interface IProps {
  readonly rowData: FunnelPORowModel;
  readonly modals : string;
}

const FunnelSOTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  useEffect(() => {
  }, [])


  const onSelectFunnelPO = () => {
    dispatch(BankGaransiActions.insertFunnelPOObject(rowData)) 
    if(props.modals === "add")
      dispatch(ModalFirstLevelActions.CLOSE())
    else
      dispatch(ModalSecondLevelActions.CLOSE())
  }

  return (
    <Fragment>
      <Table.Row key={rowData.po}>
        <Table.Cell><Button content='Select' primary onClick={onSelectFunnelPO}/></Table.Cell>
        <Table.Cell>{rowData.po}</Table.Cell>
        <Table.Cell>{rowData.bu}</Table.Cell>
        <Table.Cell>{rowData.orderDate}</Table.Cell>
        <Table.Cell>{rowData.supplier}</Table.Cell>
        <Table.Cell>{rowData.customer}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelSOTableRow;

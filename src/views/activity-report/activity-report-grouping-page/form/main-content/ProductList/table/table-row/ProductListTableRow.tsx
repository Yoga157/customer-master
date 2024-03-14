import React from "react";
import { Dropdown, Image, Table } from "semantic-ui-react";
import ProductListModel from "stores/work-list/models/ProductListModel";

interface IProps {
  rowData: ProductListModel
} 

const ProductListTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { rowData } = props
  return (
    <>
      <Table.Row>
        <Table.Cell textAlign="center">{rowData.productName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.productNumber}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.serialNumber}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.salesUnit}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.serialNumber}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.quantity.toString()}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default ProductListTableRow;

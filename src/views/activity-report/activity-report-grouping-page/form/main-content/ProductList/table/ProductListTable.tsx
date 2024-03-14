import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import styles from "./ActivityReportGroupingListTable.module.scss";
import ProductListTableRow from "./table-row/ProductListTableRow";
import ProductListModel from "stores/work-list/models/ProductListModel";
interface IProps {
  readonly tableData: ProductListModel[];
}

const ProductListTable: React.FC<IProps> = ({tableData}) => {
  return (
    <Table sortable striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Product Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Product Number</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Serial Number</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Sales Unit</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">License Number</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {/* {tableData.totalRow === 0 && ( */}
        {/* <Table.Row>
          <Table.Cell colSpan={13} textAlign="center" className={styles.nodata}>
            No data
          </Table.Cell>
        </Table.Row> */}
        {/* )} */}

        {tableData?.map((model: ProductListModel) => (
          <ProductListTableRow rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default ProductListTable;

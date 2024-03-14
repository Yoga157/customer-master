import React from "react";
import { Table } from "semantic-ui-react";
import styles from "./GeneratedTable.module.scss";
import FunnelTableRow from "./table-row/FunnelPOTableRow";

interface IProps {
  readonly tableData: any;
  readonly modals: string;
}

const FunnelPOTable: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <Table
      sortable
      striped
      className="StickyHeader"
      id="exportopp"
      data-cols-width="10,10,10,30,30,30,40,40,15"
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>No PO</Table.HeaderCell>
          <Table.HeaderCell>BU</Table.HeaderCell>
          <Table.HeaderCell>PO Date</Table.HeaderCell>
          <Table.HeaderCell>Supplier</Table.HeaderCell>
          <Table.HeaderCell>Customer</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      
      <Table.Body>
        {props.tableData.rows.length === 0 ?
       <Table.Row>
         <Table.Cell colSpan={6} textAlign="center" className={styles.nodata}>
           No data
         </Table.Cell>
        </Table.Row>
        : props.tableData.rows.map((item:any, index:any) => <FunnelTableRow modals={props.modals} key={index} rowData={item} />)}
        </Table.Body>

       
    </Table>
  );
};

export default FunnelPOTable;

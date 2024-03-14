import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './ProductServiceTable.module.scss';
import ProductServiceTableRow from './table-row/ProductServiceTableRow';
import IProductServiceTableRow from 'selectors/funnel-product-service/models/IProductServiceTableRow';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData: IProductServiceTable;
  readonly setActivePage: any;
  readonly setDeleteItem: any;
  readonly projectCategory?: string;
  readonly setValidasiDeleteProduct?: any;
  readonly currency?: string;
}

const ProductServiceTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const isPresalesWorkflow: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isPresalesWorkflow);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  return (
    <Table color="blue" striped inverted>
      {/* <Table striped inverted> */}
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell className={styles.ProductServiceTable}>Type</Table.HeaderCell>
          <Table.HeaderCell className={styles.ProductServiceTable}>Action</Table.HeaderCell>
          <Table.HeaderCell className={styles.ProductServiceTable}>Brand Name</Table.HeaderCell>
          <Table.HeaderCell className={styles.ProductServiceTable}>Item Description</Table.HeaderCell>
          <Table.HeaderCell className={styles.ProductServiceTable}>Order To</Table.HeaderCell>
          <Table.HeaderCell className={styles.ProductServiceTable}>Ordering Price</Table.HeaderCell>
          {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin' || isPresalesWorkflow) && (
            <Table.HeaderCell className={styles.ProductServiceTable}>Selling Price</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={16} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {props.tableData.rows
          .sort((a, b) => a.itemType - b.itemType)
          .map((model: IProductServiceTableRow, key: number) => {
            return (
              <ProductServiceTableRow
                funnelItem={model.funnelItemsID}
                setValidasiDeleteProduct={props.setValidasiDeleteProduct}
                alldata={props.tableData}
                currency={props.currency}
                key={key}
                rowData={model}
                setActivePage={props.setActivePage}
                setDeleteItem={props.setDeleteItem}
                projectCategory={props.projectCategory}
              />
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default ProductServiceTable;

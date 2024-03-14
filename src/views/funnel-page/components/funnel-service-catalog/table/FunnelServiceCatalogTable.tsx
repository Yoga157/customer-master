import React, { Fragment } from 'react';
import IFunnelServiceCatalogTable from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTable';
import IFunnelServiceCatalogTableRow from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTableRow';
import { Table } from 'semantic-ui-react';
import styles from './FunnelServiceCatalogTable.module.scss';
import FunnelServiceCatalogTableRow from './table-row/FunnelServiceCatalogTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData: IFunnelServiceCatalogTable;
}
const FunnelServiceCatalogTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  return (
    <Table
      className="VhText-1-1200 Text-1r-767"
      striped
      id="servicecatalog"
      data-cols-width={currentUser.role == 'Sales' ? '15,30,20,20,20,20' : '15,30,20,20,20,20,20,20,20'}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Service Reff</Table.HeaderCell>
          <Table.HeaderCell>Service Category</Table.HeaderCell>
          <Table.HeaderCell>Brand Model</Table.HeaderCell>
          <Table.HeaderCell>Service Owner</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          {currentUser.role === 'Presales' && (
            <Fragment>
              <Table.HeaderCell>Unit Price</Table.HeaderCell>
              <Table.HeaderCell>Total Price</Table.HeaderCell>
              <Table.HeaderCell>Discount</Table.HeaderCell>
              <Table.HeaderCell>Grand Total</Table.HeaderCell>
            </Fragment>
          )}
          {currentUser.role === 'Sales' && <Table.HeaderCell>Discount (%)</Table.HeaderCell>}
          <Table.HeaderCell>Discount Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={currentUser.role === 'Presales' ? 12 : 8} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableData.rows.map((model: IFunnelServiceCatalogTableRow) => (
          <FunnelServiceCatalogTableRow key={model.funnelSvcCatGenID} totalPrice={props.tableData.totalPrice} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default FunnelServiceCatalogTable;

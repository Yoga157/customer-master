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
    <Table striped id="servicecatalog">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Sales Name</Table.HeaderCell>
          <Table.HeaderCell>A</Table.HeaderCell>
          <Table.HeaderCell>B</Table.HeaderCell>
          <Table.HeaderCell>C</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {/* {props.tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {props.tableData.rows.map((model: IFunnelServiceCatalogTableRow) => (
          <FunnelServiceCatalogTableRow key={model.funnelSvcCatGenID} totalPrice={props.tableData.totalPrice} rowData={model} />
        ))} */}

        <Table.Cell></Table.Cell>
      </Table.Body>
    </Table>
  );
};

export default FunnelServiceCatalogTable;

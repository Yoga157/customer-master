import React from 'react';
import { Table } from 'semantic-ui-react';
import IServiceCatalogTable from 'selectors/service-catalog/models/IServiceCatalogTable';
import IServiceCatalogTableRow from 'selectors/service-catalog/models/IServiceCatalogTableRow';
import ServiceCatalogTableRow from './table-row/ServiceCatalogTableRow';

interface IProps {
  readonly tableData: IServiceCatalogTable;
  exporting: boolean;
}

const ServiceCatalogTable: React.FC<IProps> = ({ tableData, exporting }) => {
  return (
    <Table striped id={'export-service-catalog'} data-cols-width={'15,25,40,20'}>
      <Table.Header>
        <Table.Row>
          {!exporting && <Table.HeaderCell>Actions</Table.HeaderCell>}
          <Table.HeaderCell>Reff ID</Table.HeaderCell>
          <Table.HeaderCell>Brand Model</Table.HeaderCell>
          <Table.HeaderCell>Service Name</Table.HeaderCell>
          <Table.HeaderCell>Service Owner</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Effective Date</Table.HeaderCell>
          <Table.HeaderCell>Expire Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.map((model: IServiceCatalogTableRow) => (
          <ServiceCatalogTableRow exporting={exporting} key={model.svcCatGenID} rowData={model} />
        ))}

        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={6} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default ServiceCatalogTable;

import React from 'react';
import { Table } from 'semantic-ui-react';

interface IProps {}

const BrandServiceCatalogTable: React.FC<IProps> = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Service Reff</Table.HeaderCell>
          <Table.HeaderCell>Service Category</Table.HeaderCell>
          <Table.HeaderCell>Service Name</Table.HeaderCell>
          <Table.HeaderCell>PIC Name</Table.HeaderCell>
          <Table.HeaderCell>Selling Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Cell>asd</Table.Cell>
      </Table.Body>
    </Table>
  );
};

export default BrandServiceCatalogTable;

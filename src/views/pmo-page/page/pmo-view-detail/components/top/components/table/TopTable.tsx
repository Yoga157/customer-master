import React from 'react';
import { Table } from 'semantic-ui-react';

import TopTableRow from './table-row/TopTableRow';

interface IProps {
  tableData: any;
}
const TopTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table color="brown" striped inverted>
      {/* <Table striped inverted> */}
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>
            TOP <br />
            Number
          </Table.HeaderCell>
          <Table.HeaderCell>
            Invoice <br />
            Number
          </Table.HeaderCell>
          <Table.HeaderCell>
            Invoice <br />
            Date
          </Table.HeaderCell>
          <Table.HeaderCell>
            Invoice <br />
            Description
          </Table.HeaderCell>
          <Table.HeaderCell>
            Product <br />
            Description
          </Table.HeaderCell>
          <Table.HeaderCell>
            Product <br />
            Percentage
          </Table.HeaderCell>
          <Table.HeaderCell>
            Service <br />
            Description
          </Table.HeaderCell>
          <Table.HeaderCell>
            Service <br />
            Percentage
          </Table.HeaderCell>
          <Table.HeaderCell>
            Supporting Document <br />
            Type*
          </Table.HeaderCell>
          <Table.HeaderCell>
            Supporting Doc. <br />
            Collection Date*
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData?.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={10} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {props.tableData.map((model: any, key) => {
          return <TopTableRow key={key} rowData={model} />;
        })}
      </Table.Body>
    </Table>
  );
};

export default TopTable;

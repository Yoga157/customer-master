import React from 'react';
import { Table } from 'semantic-ui-react';
import './FunnelTop.css';
import FunnelTopTableRow from './table-row/FunnelTopTableRow';
import IFunnelTopTable from 'selectors/funnel-top/models/IFunnelTopTable';

interface IProps {
  readonly tableData: IFunnelTopTable;
  setActivePage: any;
}

const EmptyRow = (
  <Table.Row>
    <Table.Cell colSpan={7} textAlign="center" className={'nodata'}>
      No data
    </Table.Cell>
  </Table.Row>
);

const FunnelTopTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Table color="brown" striped inverted>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell className={'FunnelTopTable'}>Action</Table.HeaderCell>
          <Table.HeaderCell className={'FunnelTopTable'}>Description Product</Table.HeaderCell>
          <Table.HeaderCell className={'FunnelTopTable'}>Percentage Product</Table.HeaderCell>
          <Table.HeaderCell className={'FunnelTopTable'}>Description Service </Table.HeaderCell>
          <Table.HeaderCell className={'FunnelTopTable'}>Percentage Service</Table.HeaderCell>
          <Table.HeaderCell className={'FunnelTopTable'}>Type Of Supporting Document* </Table.HeaderCell>
          <Table.HeaderCell className={'FunnelTopTable'}>Supporting Document Collection Date* </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {/* {console.log('props', props)} */}
      <Table.Body>
        {props.tableData?.rows === undefined ? (
          EmptyRow
        ) : (
          <>
            {props.tableData.rows.length === 0 && EmptyRow}
            {props.tableData.rows.map((item, index) => (
              <FunnelTopTableRow key={index} keys={index} rowData={item} setActivePage={props.setActivePage} />
            ))}
          </>
        )}
      </Table.Body>
    </Table>
  );
};

export default FunnelTopTable;

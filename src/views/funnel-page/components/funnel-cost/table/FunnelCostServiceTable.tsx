import React from 'react';
import { Table } from 'semantic-ui-react';
import './FunnelCost.css';
import FunnelCostTableRow from './table-row/FunnelCostTableRow';
// import IProductServiceTableRow from 'selectors/funnel-product-service/models/IProductServiceTableRow'
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';
import FunnelCost from '../FunnelCost';

interface IProps {
  readonly tableData: [];
  readonly funnelStatusID: number;
}

const CostServiceTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  // console.log(props.tableData)
  return (
    <Table color="teal" striped inverted>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell className={'CostServiceTable'}>Action</Table.HeaderCell>
          <Table.HeaderCell className={'CostServiceTable'}>Cost Name</Table.HeaderCell>
          <Table.HeaderCell className={'CostServiceTable'}>Cost Type</Table.HeaderCell>
          <Table.HeaderCell className={'CostServiceTable'}>Remarks</Table.HeaderCell>
          <Table.HeaderCell className={'CostServiceTable'}>Amount</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.tableData.length === 0 || props.tableData.length === undefined ? (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center" className={'nodata'}>
              No data
            </Table.Cell>
          </Table.Row>
        ) : (
          props.tableData.map((item: any, index) => {
            return <FunnelCostTableRow key={index} rowData={item} funnelStatusID={props.funnelStatusID} />;
          })
        )}
      </Table.Body>
    </Table>
  );
};

export default CostServiceTable;

import React from 'react';
import { Table } from 'semantic-ui-react';
import DetailDelegationModel from 'stores/delegation/models/DetailDelegationModel';
import DelegationTableRowForm from './table-row/DelegationTableRowForm';
import RowFormDelegation from './table-row/form/RowFormDelegation';

interface IProps {
  readonly tableData: any;
}

const DelegationTableForm: React.FC<IProps> = ({ tableData }) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">To User</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Application</Table.HeaderCell>
          <Table.HeaderCell width={4} textAlign="center">
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <RowFormDelegation enableRow="" rowData="" type={'ADD'} indexItem={1} />
        {tableData.rows
          .filter((item) => item.isDelete !== 1)
          .map((model: DetailDelegationModel, index: number) => (
            <DelegationTableRowForm key={model.delegasiGenID} rowData={model} indexItem={index} />
          ))}
      </Table.Body>
    </Table>
  );
};

export default DelegationTableForm;

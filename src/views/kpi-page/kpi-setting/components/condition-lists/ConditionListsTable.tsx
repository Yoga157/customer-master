import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './ConditionListsTable.module.scss';
import ConditionListsTableRow from './ConditionListsTableRow';
import IConditionListsTableRow from 'selectors/kpi/models/IConditionTableRow';
import IConditionListsTable from 'selectors/kpi/models/IConditionTable';

interface IProps {
    readonly tableData: [];
};

const ConditionListsTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    return (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Action</Table.HeaderCell> 
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Point</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    props.tableData.length === 0 || props.tableData.length === undefined ?
                    <Table.Row>
                        <Table.Cell colSpan={3} textAlign="center" className={"nodata"}>No data</Table.Cell>
                    </Table.Row> :
                    props.tableData.map((item, index) => <ConditionListsTableRow key={index} rowData={item} />)
                }
            </Table.Body>
        </Table>
    );
};

export default ConditionListsTable;




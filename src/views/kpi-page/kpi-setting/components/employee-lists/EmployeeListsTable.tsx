import React from "react";
import { Table } from "semantic-ui-react";
import styles from "./EmployeeListsTable.module.scss";
import EmployeeListsTableRow from "./EmployeeListsTableRow";
import IEmployeeListsTableRow from "selectors/kpi/models/IEmployeeTableRow";
import IKpiEmployeeTable from "selectors/kpi/kpi-employee/models/IKpiEmployeeTable";
import IKpiEmployeeTableRow from "selectors/kpi/kpi-employee/models/IKpiEmployeeTableRow";

interface IProps {
    readonly tableData: IKpiEmployeeTable;
};

const EmployeeListsTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { tableData } = props;
    
    return (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Action</Table.HeaderCell> 
                    <Table.HeaderCell>Employee Name</Table.HeaderCell>
                    <Table.HeaderCell>Div</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    (tableData.rows.length === 0) &&
                    <Table.Row>
                        <Table.Cell colSpan={3} textAlign="center" className={styles.nodata}>No Data</Table.Cell>
                    </Table.Row>
                }
                {
                    tableData.rows.map((model: IKpiEmployeeTableRow, index) => (
                        <EmployeeListsTableRow key={index} rowData={model} />
                    ))
                }
            </Table.Body>
        </Table>
    );
};

export default EmployeeListsTable;
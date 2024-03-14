import IStore from 'models/IStore';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IEmployeeFreelanceTable from 'selectors/employee-freelance/models/IEmployeeFreelanceTable';
import IEmployeeFreelanceTableRow from 'selectors/employee-freelance/models/IEmployeeFreelanceTableRow';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Table } from 'semantic-ui-react';
import EmployeeFreelanceSearch from 'stores/employee-freelance/models/EmployeeFreelanceSearch';
import EmployeeFreelanceTableRow from './EmployeeFreelanceTableRow';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';


interface IProps {
    readonly tableData: IEmployeeFreelanceTable;
}

const EmployeeFreelanceTable: React.FC<IProps> = ({ tableData }) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [pageSize] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [column, setColumn] = useState('');
    const [direction, setDirection] = useState('ascending' as any);
    const search: EmployeeFreelanceSearch = useSelector((state: IStore) => state.employeeFreelance.listData.search);

    const reloads = (column: any) => {
        setColumn(column);
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');

        if (search !== null) {
            dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceSearch(1, 10, column, direction, search.search, currentUser.email));
        } else {
            dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceSearch(1, 10, column, direction, '', currentUser.email));
        }
    }

    return (
        <Table sortable striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'employeeFreelanceGenID' ? direction : null} onClick={() => reloads('employeeFreelanceGenID')}>ID</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'superiorEmail' ? direction : null} onClick={() => reloads('superiorEmail')} textAlign='center'>Superior <br/> Email</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={() => reloads('email')} textAlign='center'>Email</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'fullname' ? direction : null} onClick={() => reloads('fullname')} textAlign='center'>Full Name</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'nikktp' ? direction : null} onClick={() => reloads('nikktp')} textAlign='center'>NIK <br/> KTP</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'phone' ? direction : null} onClick={() => reloads('phone')} textAlign='center'>Phone</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'dateOfBirth' ? direction : null} onClick={() => reloads('dateOfBirth')} textAlign='center'>DOB</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'effectiveDate' ? direction : null} onClick={() => reloads('effectiveDate')} textAlign='center'>Effective <br/> Date</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'expiredDate' ? direction : null} onClick={() => reloads('expiredDate')} textAlign='center'>Expired <br/> Date</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'status' ? direction : null} onClick={() => reloads('status')} textAlign='center'>Status</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'isHaveActivity' ? direction : null} onClick={() => reloads('isHaveActivity')} textAlign='center'>Have <br/> Activity</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {tableData.totalRow === 0 && (
                    <Table.Row>
                        <Table.Cell colSpan={10} textAlign="center">
                            No data
                        </Table.Cell>
                    </Table.Row>
                )}

                {tableData.rows && tableData.rows.map((model: IEmployeeFreelanceTableRow) => (
                    <EmployeeFreelanceTableRow key={model.employeeFreelanceGenID} rowData={model} setActivePage={setActivePage} />
                ))}
            </Table.Body>
        </Table>
    )
};

export default EmployeeFreelanceTable;
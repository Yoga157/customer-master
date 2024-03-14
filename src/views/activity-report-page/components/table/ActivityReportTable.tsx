import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IListActivityReport from 'selectors/activity-report/models/IActivityReportTable';
import IActivityReportTableRow from 'selectors/activity-report/models/IActivityReportTableRow';
import { Table } from 'semantic-ui-react';
import styles from './ActivityReportTable.module.scss';
import ActivityReportTableRow from './table-row/ActivityReportTableRow';
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import ActivityReportSearch from 'stores/activity-report/models/ActivityReportSearch';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  readonly tableData: IListActivityReport;
}

const ActivityReportTable: React.FC<IProps> = ({ tableData }) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [pageSize] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [column, setColumn] = useState('');
    const [direction, setDirection] = useState('ascending' as any);
    const search: ActivityReportSearch = useSelector((state: IStore) => state.activityReport.listData.search);


    const reloads = (column: any) => {
        setColumn(column);
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');

        if (search !== null) {
            dispatch(ActivityReportActions.requestActivityReportSearch(1, 10, column, direction, search.search, currentUser.email, +currentUser.employeeID));
        } else {
            dispatch(ActivityReportActions.requestActivityReportSearch(1, 10, column, direction, '', currentUser.email, +currentUser.employeeID));
        }
    }

    return (
        // <Table sortable striped data-cols-width="10,10,10,30,30,30,40,40,15">
        <Table sortable striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'activityReportGenID' ? direction : null} onClick={() => reloads('activityReportGenID')}>
                        ID
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'ticketId' ? direction : null} onClick={() => reloads('ticketId')}>
                        Ticket/Task <br/> Number
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'so' ? direction : null} onClick={() => reloads('so')}>
                        SO <br/> Number
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'funnelGenId' ? direction : null} onClick={() => reloads('funnelGenId')}>
                        FunnelGenId
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'customerName' ? direction : null} onClick={() => reloads('customerName')}>
                        Customer <br/> Name
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'address' ? direction : null} onClick={() => reloads('address')}>
                        Address
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'contactName' ? direction : null} onClick={() => reloads('contactName')}>
                        Contact <br/> Name
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'engineerList' ? direction : null} onClick={() => reloads('engineerList')}>
                        Engineer/Team
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'status' ? direction : null} onClick={() => reloads('status')}>
                        Status
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'startDate' ? direction : null} onClick={() => reloads('startDate')}>
                        Start <br/> Date
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'endDate' ? direction : null} onClick={() => reloads('endDate')}>
                        Finish <br/> Date
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'reviewStatus' ? direction : null} onClick={() => reloads('reviewStatus')}>
                        Superior <br/> Review <br/> Status
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'customerSignStatus' ? direction : null} onClick={() => reloads('customerSignStatus')}>
                        Customer <br/> Sign <br/> Status
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'department' ? direction : null} onClick={() => reloads('department')}>
                        Dept
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' sorted={column === 'isDraft' ? direction : null} onClick={() => reloads('isDraft')}>
                        IsDraft
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {tableData.totalRow === 0 && (
                    <Table.Row>
                        <Table.Cell colSpan={13} textAlign="center" className={styles.nodata}>
                            No data
                        </Table.Cell>
                    </Table.Row>
                )}

                {tableData.rows && tableData.rows.map((model: IActivityReportTableRow) => (
                    <ActivityReportTableRow key={model.activityReportGenID} rowData={model} setActivePage={setActivePage} />
                ))}
            </Table.Body>
        </Table>
    );
};

export default ActivityReportTable;
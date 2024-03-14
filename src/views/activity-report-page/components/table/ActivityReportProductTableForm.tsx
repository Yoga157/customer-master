import IStore from 'models/IStore';
import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { selectActivityReportCheckAllowEdit } from 'selectors/activity-report/ActivityReportSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Table, TableBody } from 'semantic-ui-react';

import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import ActivityReportProductTableRow from './table-row/ActivityReportProductTableRow';
import ActivityReportProductTableRowForm from './table-row/form/ActivityReportProductTableRowForm';

interface IProps {
    readonly tableData: [];
    readonly activityReportGenID: number;
}

const ActivityReportProductTableForm: React.FC<IProps> = ({ tableData, activityReportGenID }) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const activityReportIsAllowEdit: any = useSelector((state: IStore) => selectActivityReportCheckAllowEdit(state));
    
    useEffect(() => {
        if (+activityReportGenID !== 0)
            dispatch(ActivityReportActions.checkAllowEdit(+activityReportGenID, +currentUser.employeeID));
    }, []);

    return(
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>Product Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Product Number</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Serial Number</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Sales Unit</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>License Number</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <TableBody>
                <Fragment>
                {(+activityReportGenID === 0) && (
                    <ActivityReportProductTableRowForm enableRow="" rowData="" type={'ADD'} indexItem={1} activityReportGenID={activityReportGenID} />    
                )}          
                {(+activityReportGenID !== 0 && activityReportIsAllowEdit.isAllowEdit === true) && (
                    <ActivityReportProductTableRowForm enableRow="" rowData="" type={'ADD'} indexItem={1} activityReportGenID={activityReportGenID} />    
                )}          
                {tableData.length === 0 || tableData.length === undefined ? (
                    <Table.Row>
                        <Table.Cell colSpan={7} textAlign="center" className={'nodata'}>
                            No Data
                        </Table.Cell>
                    </Table.Row>
                ) : (
                    tableData.map((model: any, index: number) => (
                        <ActivityReportProductTableRow 
                            key={index} 
                            rowData={model} 
                            indexItem={index} 
                            activityReportGenID={+activityReportGenID}
                            isAllowEdit={activityReportIsAllowEdit.isAllowEdit}
                        />
                    ))
                )}
                </Fragment>
            </TableBody>
        </Table>
    );
};

export default ActivityReportProductTableForm;
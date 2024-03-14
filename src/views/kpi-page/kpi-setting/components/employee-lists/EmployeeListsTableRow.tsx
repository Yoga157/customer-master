import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import IEmployeeTableRow from "selectors/kpi/models/IEmployeeTableRow";
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import { selectUserResult } from "selectors/user/UserSelector";
import { Dropdown, Table } from "semantic-ui-react";
import IKpiEmployeeTableRow from "selectors/kpi/kpi-employee/models/IKpiEmployeeTableRow";
import TableRowModel from "stores/kpi/kpi-employee/models/TableRowModel";
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";

interface IProps {
    readonly rowData: IKpiEmployeeTableRow;
};

const EmployeeListsTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { rowData } = props;
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

    const handleDelete = (kpiEmployeeIncludeExcludeID: any) => {
        let userId: any = localStorage.getItem("userLogin");
        let data = new TableRowModel({});
        data.kpiEmployeeIncludeExcludeID = rowData.kpiEmployeeIncludeExcludeID;
        data.employeeName = rowData.employeeName;
        data.divisionName = rowData.divName;
        data.type = rowData.type;
        data.modifyUserID = JSON.parse(userId).employeeID;
        data.createUserID = JSON.parse(userId).employeeID;
        dispatch(KpiSettingActions.deleteKpiEmployeeLocal(data, kpiEmployeeIncludeExcludeID)).then(() => {
            dispatch(KpiSettingActions.requestKpiEmployeeLocal());
        })
    }

    return (
        <Fragment>
            <Table.Row key={rowData.kpiEmployeeIncludeExcludeID}>
                <Table.Cell>
                    <Dropdown pointing='left' icon='ellipsis vertical' >
                    <Dropdown.Menu>
                        <Dropdown.Item
                            text='Delete' 
                            icon='trash alternate'
                            onClick={()=> handleDelete(rowData.kpiEmployeeIncludeExcludeID)}
                        />
                    </Dropdown.Menu>
                    </Dropdown>
                </Table.Cell>
                <Table.Cell>{rowData.employeeName}</Table.Cell>
                <Table.Cell>{rowData.divName}</Table.Cell>
            </Table.Row>
        </Fragment>
    );
};

export default EmployeeListsTableRow;
import IStore from 'models/IStore';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import IConditionTableRow from 'selectors/kpi/models/IConditionTableRow';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Dropdown, Table } from 'semantic-ui-react';
import TableRowModel from 'stores/kpi/kpi-condition/models/TableRowModel';
// import * as KpiConditionAction from "stores/kpi/kpi-condition/KpiConditionAction";
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";

interface IProps {
    readonly rowData: any;
    readonly key: number | undefined;
};

const ConditionListsTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { rowData } = props;
    const dispatch: Dispatch = useDispatch();

    const handleDelete = (kpiConditionID: any) => {
        let userId: any = localStorage.getItem("userLogin");
        let data = new TableRowModel({});
        data.kpiConditionID = rowData.kpiConditionID;
        data.description = rowData.description;
        data.point = rowData.point;
        data.modifyUserID = JSON.parse(userId).employeeID;
        data.createUserID = JSON.parse(userId).employeeID;
        dispatch(KpiSettingActions.deleteKpiConditionLocal(data, kpiConditionID)).then(() => {
            dispatch(KpiSettingActions.getKpiConditionByIdLocal());
        })
    };

    return (
        <Fragment>
            <Table.Row key={rowData.id}>
                <Table.Cell>
                    <Dropdown pointing='left' icon='ellipsis vertical' >
                    <Dropdown.Menu>
                        <Dropdown.Item
                            text='Delete' 
                            icon='trash alternate'
                            onClick={()=> handleDelete(rowData.kpiConditionID)}
                        />
                    </Dropdown.Menu>
                    </Dropdown>
                </Table.Cell>
                <Table.Cell>{rowData.description}</Table.Cell>
                <Table.Cell>{rowData.point}</Table.Cell>
                {/* <Table.Cell>{rowData.action}</Table.Cell> */}
            </Table.Row>
        </Fragment>
    );
};

export default ConditionListsTableRow;
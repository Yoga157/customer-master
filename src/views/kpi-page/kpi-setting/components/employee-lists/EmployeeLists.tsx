import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from "react-redux";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Button, Grid } from "semantic-ui-react";
import { Pagination, SelectInput } from 'views/components/UI';
import EmployeeListsTable from "./EmployeeListsTable";
import KpiEmployeeForm from "../form/form-create/KpiEmployeeForm";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
// import * as KpiEmployeeAction from "stores/kpi/kpi-employee/KpiEmployeeAction";
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";
import IKpiEmployeeTable from "selectors/kpi/kpi-employee/models/IKpiEmployeeTable";
import { selectKpiEmployee } from "selectors/kpi/kpi-employee/KpiEmployeeSelector";

interface IProps {
    kpiSettingID: string,
};

const EmployeeLists: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch:Dispatch = useDispatch();
    const [pageSize] = useState(5);
    const [activePage, setActivePage] = useState(1);
    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [local, setLocal] = useState(false);

    useEffect(() => {
        localStorage.removeItem("kpiEmployeeIncludeExclude");
        // dispatch(KpiEmployeeAction.requestKpiEmployeeLocal());
        dispatch(KpiSettingActions.requestKpiEmployeeLocal());
        setLocal(true);
    }, []);

    const onAddCondition = useCallback(
        () : void => {
            dispatch(ModalFirstLevelActions.OPEN(
                <KpiEmployeeForm
                    kpiSettingID={props.kpiSettingID}
                    kpiSettingItemsID={"0"}
                    type="Add"
                    rowData={"rowData"}
                />, 
                ModalSizeEnum.Small
            ));
        },
        [dispatch, props.kpiSettingID]
    );

    const handlePaginationChange = (e: any, data: any) => {
        setActivePage(data.activePage)
    };

    let isRequesting:boolean = false;
    // const kpiEmployeeIncludeExclude: IKpiEmployeeTable = useSelector((state: IStore) => selectKpiEmployee(state, [KpiEmployeeAction.REQUEST_KPI_EMPLOYEE_LOCAL]));
    const kpiEmployeeIncludeExclude: IKpiEmployeeTable = useSelector((state: IStore) => selectKpiEmployee(state, [KpiSettingActions.REQUEST_KPI_EMPLOYEE_LOCAL]));

    return (
        <LoadingIndicator isActive={isRequesting}>
            <Grid padded>
                <Grid.Row columns="equal">
                    <Grid.Column>
                        <h4 className='ml-m-1r'>Employee Lists</h4>
                    </Grid.Column>
                    <Grid.Column>
                        <Button 
                            type='button'
                            icon='plus'
                            color='green'
                            floated='right'
                            size='small'
                            content='Add Employee'
                            onClick={onAddCondition}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <EmployeeListsTable tableData={kpiEmployeeIncludeExclude} />
                    {/* <Pagination 
                        activePage={activePage}
                        onPageChange={(e, data) => handlePaginationChange(e, data)}
                        totalPage={kpiEmployeeIncludeExclude.totalRow}
                        pageSize={pageSize}
                    /> */}
                </Grid.Row>
            </Grid>
        </LoadingIndicator>
    );
};

export default EmployeeLists;
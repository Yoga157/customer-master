import ModalSizeEnum from 'constants/ModalSizeEnum';
import IStore from 'models/IStore';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IConditionTable from 'selectors/kpi/models/IConditionTable';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Button, Card, Divider, Grid, Form } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { Pagination, TextInput } from 'views/components/UI';
import KpiConditionForm from '../form/form-create/KpiConditionForm';
import ConditionListsTable from './ConditionListsTable';
import { Form as FinalForm, Field } from 'react-final-form';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRows } from 'selectors/kpi/kpi-condition/KpiConditionSelector';
// import * as KpiConditionAction from "stores/kpi/kpi-condition/KpiConditionAction";
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";

interface IProps {
    kpiSettingID: string
};

const ConditionLists: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [pageSize] = useState(5);
    const [activePage, setActivePage] = useState(1);
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [local, setLocal] = useState(false);

    useEffect(() => {
        localStorage.removeItem("kpiCondition");
        dispatch(KpiSettingActions.getKpiConditionByIdLocal());
        setLocal(true);
    }, []);

    const onAddCondition = useCallback(
        () : void => {
            dispatch(ModalFirstLevelActions.OPEN(
                <KpiConditionForm 
                    kpiSettingID={props.kpiSettingID}
                    kpiSettingItemsID={"0"}
                    type="Add"
                />, 
                ModalSizeEnum.Small
            ));
        },
        [dispatch]
    );
   
    const handlePaginationChange = (e:any,data:any) => {
        // setActivePage(data.activePage)
    };

    let isRequesting: boolean = false;
    let rowData: any = useSelector((state: IStore) => selectRows(state));
    
    return (
        <LoadingIndicator isActive={isRequesting}>
            <Grid padded>
                <Grid.Row columns="equal">
                    <Grid.Column>
                        <h4 className='ml-m-1r'>Condition Lists</h4>
                    </Grid.Column>
                    <Grid.Column>
                        <Button 
                            type='button'
                            icon='plus'
                            color='green'
                            floated='right'
                            size='small'
                            content='Add Condition'
                            onClick={onAddCondition}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <ConditionListsTable tableData={rowData} />
                    {/* <Pagination 
                        activePage={activePage}
                        onPageChange={(e, data) => handlePaginationChange(e, data)}
                        totalPage={conditionListTable.totalRow}
                        pageSize={pageSize}
                    /> */}
                </Grid.Row>
            </Grid>
        </LoadingIndicator>
    );
};

export default ConditionLists;
import React, { Fragment, useState } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import IStore from 'models/IStore';
import ActivityReportProductLocalModel from 'stores/activity-report-product/models/ActivityReportProductLocalModel';
import ActivityReportProductTableRowForm from './form/ActivityReportProductTableRowForm';
import * as ActivityReportProductActions from 'stores/activity-report-product/ActivityReportProductActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
    readonly rowData: any;
    readonly indexItem: number;
    readonly activityReportGenID: number;
    readonly isAllowEdit: boolean;
}

const ActivityReportProductTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const detailProductARInLocalStorage: string = 'detailProductAR';
    const dispatch: Dispatch = useDispatch();
    const { rowData, indexItem, isAllowEdit } = props;
    const [actionType, setActionType] = useState('');
    const activityReportProductState: any = useSelector((state: IStore) => state.activityReportProduct.rowTable);
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

    const deleteItem = (data: any): any => {
        const newItemLocal = new ActivityReportProductLocalModel({ ...data });
        newItemLocal.isDelete = 1;
        newItemLocal.isUpdate = 0;
        newItemLocal.isAdd = 0;
        newItemLocal.createUserID = 0;
        newItemLocal.modifyUserID = 0;

        return newItemLocal;
    };

    const handleDelete = (activityReportProductGenID) => {
        const activityReportProductLocal = localStorage.getItem(detailProductARInLocalStorage);
        
        if (props.activityReportGenID === 0) {
            /**
             * Untuk delete item dari halaman Add New Activity Report
             */
            if (activityReportProductLocal) {
                const localData = JSON.parse(activityReportProductLocal);

                const newARProductList = localData.rows.filter((e) => +e.activityReportProductGenID !== +activityReportProductGenID);
                const deleteList = localData.rows.filter((e) => +e.activityReportProductGenID === +activityReportProductGenID);
                
                if (deleteList[0].isAdd) {
                    localStorage.setItem(detailProductARInLocalStorage, JSON.stringify({ rows: [...newARProductList] }));
                } else {
                    localStorage.setItem(detailProductARInLocalStorage, JSON.stringify({ rows: [...newARProductList, deleteItem(deleteList[0])] }));
                }
                dispatch(ActivityReportProductActions.getActivityReportProductLocal());
            } else {
                if (activityReportProductState?.length > 0) {
                    const newSplitList = activityReportProductState.filter((e) => +e.activityReportProductGenID !== +activityReportProductGenID);
                    const deleteList = activityReportProductState.filter((e) => +e.activityReportProductGenID === +activityReportProductGenID);
                    localStorage.setItem(detailProductARInLocalStorage, JSON.stringify({ rows: [...newSplitList, deleteItem(deleteList[0])] }));
                }
            }
        } else {
            /**
             * Untuk delete item dari halaman Edit Activity Report
             */
            dispatch(ActivityReportProductActions.deleteActivityProduct(props.activityReportGenID, activityReportProductGenID)).then(() => {
                dispatch(ActivityReportProductActions.requestViewProductByActivityReportGenID(props.activityReportGenID))
            });
        }
        
    };

    const onSubmitHandler = (formObject) => {
        // const path = window.location.pathname.split('/');
        setActionType('ADD');
    };

    return(
        <Fragment>
            {actionType !== 'EDIT' ? (
                <Table.Row key={rowData.productDetailId}>
                    <Table.Cell textAlign='center'>{rowData.productName}</Table.Cell>
                    <Table.Cell textAlign='center'>{rowData.productNumber}</Table.Cell>
                    <Table.Cell textAlign='center'>{rowData.serialNumber}</Table.Cell>
                    <Table.Cell textAlign='center'>{rowData.salesUnit}</Table.Cell>
                    <Table.Cell textAlign='center'>{rowData.licenseNumber}</Table.Cell>
                    <Table.Cell textAlign='center'>{rowData.quantity}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Dropdown pointing="left" icon="ellipsis vertical" disabled={props.activityReportGenID === 0 ? false : (props.isAllowEdit === true ? false : true)}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                text="Edit"
                                icon="edit outline"
                                onClick={() => {
                                    setActionType('EDIT');
                                }}
                                />
                                <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => handleDelete(+rowData.activityReportProductGenID)} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Table.Cell>
                </Table.Row>
            ) : (
                <ActivityReportProductTableRowForm 
                    rowData={rowData} 
                    type="EDIT" 
                    enableRow={onSubmitHandler} 
                    indexItem={indexItem + 2} 
                    activityReportGenID={props.activityReportGenID}/>
            )}
        </Fragment>
    );
};

export default ActivityReportProductTableRow;
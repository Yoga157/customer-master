import IStore from "models/IStore";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IUserResult from "selectors/user/models/IUserResult";
import { Card, Divider, Grid, Image } from "semantic-ui-react";
import { Button } from "views/components/UI";
import { selectUserResult } from 'selectors/user/UserSelector';
import ActivityReportModelDelete from "stores/activity-report/models/ActivityReportModelDelete";
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import { Dispatch } from "redux";
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import styles from './ActivityReportModalDelete.module.scss';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
    activityReportGenID: number
}

const ActivityReportModalDelete: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [pageSize] = useState(15);
    const [activePage, setActivePage] = useState(1);
    const bRefreshPage: boolean = useSelector((state: IStore) => state.activityReport.refreshPage);
    const resultAction = useSelector((state: IStore) => state.activityReport.resultActions);

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };

    const onDelete = (activityReportGenID: number) => {
        const item = new ActivityReportModelDelete({});
        item.activityReportGenID = activityReportGenID;
        item.modifyUserID = Number(currentUser.employeeID);
        dispatch(ActivityReportActions.requestDeleteActivityReport(item));
    };

    useEffect(() => {
        if (bRefreshPage) {
            onClose();
            if (resultAction.errorNumber === '666') {
                dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning))
            } else {
                if (resultAction.bSuccess === true) {
                    dispatch(ActivityReportActions.requestActivityReports(activePage, pageSize, 'activityReportGenID', 'descending', currentUser.email, +currentUser.employeeID)).then(() => {
                        dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Success))
                    });
                }
            }
        }
    }, [bRefreshPage]);

    return (
    <Fragment>
        <Grid>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <Image src="/assets/info.png" size="small" centered />
                    <h4 className={styles.textModal}>Are you sure want to DELETE this ActivityReport?</h4>
                    <h4 className={styles.textModalBold}>ActivityReportGenID: {props.activityReportGenID}</h4>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Divider></Divider>
        <Grid>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <Button content="Submit" onClick={() => onDelete(props.activityReportGenID)} />
                    <Button color="blue" type="button" content="Keep it" onClick={() => onClose()}  />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Fragment>);
};

export default ActivityReportModalDelete;


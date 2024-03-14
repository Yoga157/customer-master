import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import IAWSBillingTableRow from 'selectors/aws-billing/models/IAWSBillingTableRow';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import styles from '../CreditBillingServiceTable.module.scss';
import IGetActivityReportTableRow from 'selectors/dedicated-resources/models/IGetActivityReportTableRow';

interface IProps {
    readonly rowData: IGetActivityReportTableRow;
}

const SummaryActivityReportTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const { rowData } = props;

    return (
        <>
            <Table.Row>
                <Table.Cell>{rowData.SO}</Table.Cell>
                <Table.Cell>{rowData.CustomerName}</Table.Cell>
                <Table.Cell>{rowData.ProjectName}</Table.Cell>
                <Table.Cell>{rowData.ActivityWithInProgressStatus}</Table.Cell>
                <Table.Cell>{rowData.ActivityWithPendingStatus}</Table.Cell>
                <Table.Cell>{rowData.ActivityWithCloseStatus}</Table.Cell>
                <Table.Cell>{rowData.TotalActivities}</Table.Cell>
            </Table.Row>
        </>
    );
};

export default SummaryActivityReportTableRow;

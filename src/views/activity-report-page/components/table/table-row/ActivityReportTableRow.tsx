import React, { Fragment, useState } from 'react';
import { format } from 'date-fns';
import { Dropdown, Icon, Table } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

import IActivityReportTableRow from 'selectors/activity-report/models/IActivityReportTableRow';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import ReportViewer from '../../report/ReportViewer';
import moment from 'moment';
import ActivityReportModelDelete from 'stores/activity-report/models/ActivityReportModelDelete';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import ActivityReportModalDelete from './ActivityReportModalDelete';

interface IProps {
    readonly rowData: IActivityReportTableRow;
    readonly setActivePage: any;
  }

const ActivityReportTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => { 
    const { rowData, setActivePage } = props;
    const dispatch: Dispatch = useDispatch();
    
    const convertEngineerList = () : string => {
        let result: string = '';
        let engineerArr: string[] = [];
        
        if (rowData.engineerList !== null) {
            engineerArr = rowData.engineerList.split(';');
            result += '<ul>';
            for(let item of engineerArr) {
                result += `<li>${item}</li>`;
            }
            result += '</ul>';
        }
        return result;
    };

    const handlePrintReport = () => {
        // console.log(rowData.activityReportGenID)
        dispatch(ModalFirstLevelActions.OPEN(<ReportViewer activityReportGenID={rowData.activityReportGenID} />, ModalSizeEnum.FullScreen));
    };

    const handleDeleteActivityReport = (activityReportGenID: number) => {
        dispatch(ModalFirstLevelActions.OPEN(<ActivityReportModalDelete activityReportGenID={activityReportGenID} />, ModalSizeEnum.Tiny));
    };

    return (
        <Fragment>
            <Table.Row key={rowData.activityReportGenID}>
                <Table.Cell width="1">
                    <Dropdown pointing="left" icon="ellipsis vertical" key={rowData.activityReportGenID}>
                        <Dropdown.Menu>
                            <Dropdown.Item 
                                to={`/activity-report-form/${rowData.activityReportGenID}`}
                                as={Link}
                                text="View/Edit" 
                                icon="edit outline" 
                                target={'_blank'}
                            />
                            <Dropdown.Item 
                                text="Print" 
                                icon="print" 
                                onClick={handlePrintReport} 
                            />
                            <Dropdown.Item 
                                text="Delete" 
                                icon="trash" 
                                onClick={() => handleDeleteActivityReport(rowData.activityReportGenID)} 
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Table.Cell>
                <Table.Cell>{rowData.activityReportGenID}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.ticketId.length === 0 ? '' : rowData.ticketId}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.so === 0 ? '' : rowData.so}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.funnelGenId === 0 ? '' : rowData.funnelGenId}</Table.Cell>
                <Table.Cell>{rowData.customerName}</Table.Cell>
                <Table.Cell>{ReactHtmlParser(rowData.address)}</Table.Cell>
                <Table.Cell>{rowData.contactName}</Table.Cell>
                <Table.Cell>{ReactHtmlParser(convertEngineerList())}</Table.Cell>
                <Table.Cell>{rowData.status}</Table.Cell>
                <Table.Cell>{rowData.startDate === null ? '' : `${moment(rowData.startDate).format('DD MMMM yyyy')} ${moment(rowData.startDate).format('HH:mm')}`}</Table.Cell>
                <Table.Cell>{rowData.endDate === null ? '' : `${moment(rowData.endDate).format('DD MMMM yyyy')} ${moment(rowData.endDate).format('HH:mm')}`}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.reviewStatus == true ? <Icon name="check circle"/> : '-'}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.customerSignStatus == true ? <Icon name="check circle"/> : '-'}</Table.Cell>
                <Table.Cell>{rowData.department}</Table.Cell>
                <Table.Cell textAlign='center'>{rowData.isDraft == true ? <Icon name="check circle"/> : '-'}</Table.Cell>
            </Table.Row>
        </Fragment>
    );
};

export default ActivityReportTableRow;
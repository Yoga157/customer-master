import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Form, Button, Card, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './ProjectHistory.scss'
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import { RichTextEditor } from 'views/components/UI';
import ContractTable from './Table/ContractTable/ContractTable';
import { Pagination } from 'views/components/UI';
import SummaryActivityReportTable from './Table/SummaryActivityReportTable/SummaryActivityReportTable';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import IGetHistoryContractTable from 'selectors/dedicated-resources/models/IGetHistoryContractTable';
import { selectGetHistoryContract, selectGetActivityReport } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IGetActivityReportTable from 'selectors/dedicated-resources/models/IGetActivityReportTable';

interface IProps {
    EmployeeID: number;
}

const ProjectHistory: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const HistoryContracts: IGetHistoryContractTable = useSelector((state: IStore) => selectGetHistoryContract(state))
    const ActivityReports: IGetActivityReportTable = useSelector((state: IStore) => selectGetActivityReport(state))
 
    const { EmployeeID } = props;
    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };

    const onSubmitHandler = (values: any) => {

    };
    const [pageSizeHistory, setPageSizeHistory] = useState(15);
    const [activePageHistory, setActivePageHistory] = useState(1);
    const [pageSizeReport, setPageSizeReport] = useState(15);
    const [activePageReport, setActivePageReport] = useState(1);

    useEffect(() => {
        dispatch(DedicatedResourcesActions.requestHistoryContract(EmployeeID, activePageHistory, pageSizeHistory))
        dispatch(DedicatedResourcesActions.requestActivityReport(EmployeeID, activePageReport, pageSizeReport))
    }, [])

    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [
        DedicatedResourcesActions.REQUEST_HISTORY_CONTRACT,
        DedicatedResourcesActions.REQUEST_ACTIVITY_REPORT
    ]));

    const handlePaginationChangeHistory = (e: any, data: any) => {
        setActivePageHistory(data.activePage);
        dispatch(DedicatedResourcesActions.requestHistoryContract(EmployeeID, data.activePage, pageSizeHistory))
    };

    const handlePaginationChangeReport = (e: any, data: any) => {
        setActivePageReport(data.activePage);
        dispatch(DedicatedResourcesActions.requestActivityReport(EmployeeID, data.activePage, pageSizeReport))
    };

    return (
        <Fragment>
            <Card.Header>Contract & Project History</Card.Header>
            <Divider></Divider>
            <LoadingIndicator isActive={isRequesting}>

                <FinalForm
                    onSubmit={(values: any) => onSubmitHandler(values)}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid>
                                <Grid.Column style={{ top: "20px" }} width={16}>
                                    <p style={{ fontWeight: 600, fontSize: "15px" }}>{HistoryContracts.employeeID} - {HistoryContracts.employeeName}</p>
                                </Grid.Column>

                                <Grid.Row>
                                    <Grid.Column style={{ top: "20px", padding: 0 }} width={16}>
                                        <ContractTable tableData={HistoryContracts} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={'equal'} >
                                    <Grid.Column style={{ paddingLeft: 0 }} floated='left' width={8}>
                                        <Pagination
                                            activePage={activePageHistory}
                                            onPageChange={(e, data) => handlePaginationChangeHistory(e, data)}
                                            totalPage={HistoryContracts.totalRows}
                                            pageSize={pageSizeHistory}
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column style={{ padding: 0 }} width={16}>
                                        <SummaryActivityReportTable tableData={ActivityReports} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={'equal'} >
                                    <Grid.Column style={{ paddingLeft: 0 }} floated='left' width={8}>
                                        <Pagination
                                            activePage={pageSizeReport}
                                            onPageChange={(e, data) => handlePaginationChangeReport(e, data)}
                                            totalPage={ActivityReports.totalRows}
                                            pageSize={pageSizeReport}
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column width={16}>
                                        {/* <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid } /> */}

                                        <Button type="button" color='red' floated="right" content="Close" onClick={onClose} />
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
                        </Form>
                    )}
                />
            </LoadingIndicator>
        </Fragment>
    );
};

export default ProjectHistory;

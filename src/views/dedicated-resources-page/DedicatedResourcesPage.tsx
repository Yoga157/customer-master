import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import { Grid, Header, Button } from 'semantic-ui-react';
import { Pagination, Tooltips } from 'views/components/UI';
import Segments from './components/segments/Segments';
import InputSearchDedicatedResources from './components/search/InputSearchDedicatedResources';
import './DedicatedResourcesPage.scss'
import { format } from 'date-fns';
import DedicatedResourcesServiceTable from './components/table/DedicatedResourcesServiceTable';
import { Link } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectRenewalContracts, selectGetListApprovalButton } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';
import IDedicatedResourceTable from 'selectors/dedicated-resources/models/IDedicatedResourceTable';
import FilterRenewalContractModel from 'stores/dedicated-resources/models/FilterRenewalContractModel';
import TableToExcel from '@linways/table-to-excel';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
    //   history:History
}

const DedicatedResourcesPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(15);
    const [activePage, setActivePage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [columns, setColumns] = useState('');
    const [direction, setDirection] = useState('ascending' as any);
    const [Status, setStatus] = useState([])
    const [tempStatus, setTempStatus] = useState("")
    const [TriggerStatus, setTriggerStatus] = useState(false)
    const [exportExcel, setExportExcel] = useState(false)

    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const RenewalContracts: IDedicatedResourceTable = useSelector((state: IStore) => selectRenewalContracts(state))
    const filter = useSelector((state: IStore) => state.dedicatedresources.listData.filter);
    const search = useSelector((state: IStore) => state.dedicatedresources.listData.search);
    const result: any = useSelector((state: IStore) => state.dedicatedresources.resultActions);
    const ListButton = useSelector((state: IStore) => selectGetListApprovalButton(state))
   
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [
        DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT,
        DedicatedResourcesActions.REQUEST_RENEWAL_CONTRACT_STATUS,
        DedicatedResourcesActions.REQUEST_FILTER_RENEWAL_CONTRACT,
        DedicatedResourcesActions.REQUEST_LIST_APPROVAL_BUTTON,
    ]));

    useEffect(() => {
        dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, activePage, pageSize, 'ContractID', 'descending', ''))
        dispatch(DedicatedResourcesActions.requestListApprovalButton())
        window.localStorage.setItem("TempDedicated", JSON.stringify([]));
    }, [])

    // useEffect(() => {
    //     if (TriggerStatus) {
    //         setTriggerStatus(false)
    //         let Statuss = ''
    //         Status && Status.map(
    //             (arrValues: any) => (Statuss = Statuss.length > 0 ? (Statuss += ',' + arrValues.toString()) : arrValues.toString())
    //         );
    //         dispatch(DedicatedResourcesActions.requestRenewalContractStatus(currentUser.employeeID, activePage, pageSize, 'ContractID', 'descending', Statuss))
    //     }
    // }, [TriggerStatus])

    const onClickFilter = (PropsStatus: string) => {
        // if (Status.includes(PropsStatus)) {
        //     let filterArray = Status.filter(item => item !== PropsStatus)
        //     setStatus(filterArray);
        // } else {
        //     setStatus(oldArray => [...oldArray, PropsStatus]);
        // }
        // setTempStatus(PropsStatus)
        // setTriggerStatus(true)
        dispatch(DedicatedResourcesActions.requestRenewalContractStatus(currentUser.employeeID, activePage, pageSize, 'ContractID', 'descending', PropsStatus))
    }

    let searchType = '';


    const handlePaginationChange = (e: any, data: any) => {
        setActivePage(data.activePage);
        if (filter !== null) {
            const filterNew = new FilterRenewalContractModel(filter)
            filterNew.pageSize = pageSize;
            filterNew.page = data.activePage;
            filterNew.column = columns;
            filterNew.sorting = direction;
            dispatch(DedicatedResourcesActions.RequestFilterRenewalContract(filterNew))
        } else {
            dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, data.activePage, pageSize, columns, direction, searchText ? searchText : ''));
        }
    };

    const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
    const genExportExcel = (): void => {

        if (isRequesting == false) {
            // setTimeout(() => {
                let tableSelect: any;
                let tableHead: any;
                let nameFile: string;
                nameFile = 'DedicatedResourceList ';
                tableSelect = document.getElementById('export-dedicated-resource') as HTMLTableElement;
                tableHead = document.querySelector('#export-dedicated-resource > thead > tr > th:nth-child(1)') as HTMLTableElement;
                console.log('tableHead', tableHead, 'tableSelect', tableSelect)
                tableHead.style.display = 'none';
                for (let i = 0; i < tableSelect.rows.length; i++) {
                    const firstCol = tableSelect.rows[i].cells[0];
                    firstCol.remove();
                }

                TableToExcel.convert(tableSelect, {
                    name: nameFile + currDate + '.xlsx',
                    sheet: {
                        name: 'Sheet 1',
                    },
                });
                setExportExcel(false)
                // if (search !== null) {
                //     dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, 1, pageSize, 'ContractID', 'descending', searchText ? searchText : ''))
                // } else if (filter !== null) {
                //     const filterNew = new FilterRenewalContractModel(filter)
                //     filterNew.column = 'ContractID';
                //     filterNew.sorting = 'descending';
                //     filterNew.page = 1;
                //     filterNew.pageSize = pageSize;
                //     dispatch(DedicatedResourcesActions.RequestFilterRenewalContract(filter))
                // } else {
                //     dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, 1, pageSize, 'ContractID', 'descending', ''))
                // }
            // }, 3000);
            setTimeout(() => {
                window.location.href = window.location.origin + window.location.pathname;
            }, 4000);
        }
    };

    const exportTableToExcel = (tableID: string, filename: string): void => {
        setActivePage(1)
        if (search !== null) {
            dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, 1, RenewalContracts.totalRows, 'ContractID', 'descending', searchText ? searchText : '')).then(() => {
                genExportExcel()
            })
        } else if (filter !== null) {
            const filterNew = new FilterRenewalContractModel(filter)
            filterNew.column = 'ContractID';
            filterNew.sorting = 'descending';
            filterNew.page = 1;
            filterNew.pageSize = 15;
            dispatch(DedicatedResourcesActions.RequestFilterRenewalContract(filter)).then(() => {
                genExportExcel();
            })
        } else {
            dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, 1, RenewalContracts.totalRows, 'ContractID', 'descending', '')).then(() => {
                genExportExcel();
            })
        }
        setExportExcel(true)
    }

    useEffect(() => {
        if (result?.errorNumber == "0") {
            dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
            dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, activePage, pageSize, 'ContractID', 'descending', ''))
            dispatch(DedicatedResourcesActions.requestListApprovalButton())
            dispatch(DedicatedResourcesActions.removeResult())
        } else if (result?.bSuccess === false) {
            dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
            dispatch(DedicatedResourcesActions.removeResult())
        }
    }, [result])

    return (
        <Fragment>
            <LoadingIndicator isActive={isRequesting || exportExcel}>

                <Grid className="mt-10r">
                    <Grid.Column textAlign="center">
                        <InputSearchDedicatedResources searchText={searchText} setSearchText={setSearchText} pageSize={pageSize} page={activePage} searchType={searchType} />
                    </Grid.Column>
                </Grid>

                <Grid columns="equal">
                    <Grid.Column className="DqTabSt01">
                        <Grid columns="equal">
                            <Grid.Column width={10} verticalAlign="bottom" >
                                <Header as="h4" >
                                    <Header.Content>
                                        Renewal Dedicated Resources
                                    </Header.Content>
                                </Header>
                                <Button onClick={() => onClickFilter("")} className="m-05r" icon="refresh" size="small" color="blue" basic/>
                                <Button onClick={() => onClickFilter("Not Processed")} className="m-05r" icon="minus circle" size="small" color="red" content="Not Processed" basic/>
                                <Button onClick={() => onClickFilter("In Progress")} className="m-05r" icon="hourglass start" size="small" color="yellow" content="In Progress" basic/>
                                <Button onClick={() => onClickFilter("Done")} className="m-05r" icon="check" size="small" color="green" content="Done" basic/>
                                <Button onClick={() => onClickFilter("My Approval")} className="m-05r" icon="check square outline" size="small" color="orange" content="My Approval" basic/>
                                {/* {ListButton?.map((item, key) => (
                                    item.text1 === "Rejected" ?
                                        <Button onClick={() => onClickFilter("Not Processed")} className="m-05r" icon="ban" size="small" color="red" content="Not Processed" />
                                        : item.text1 === "Processed By ComBen" ?
                                            <Button onClick={() => onClickFilter("In Progress")} className="m-05r" icon="spinner" size="small" color="yellow" content="In Progress" />
                                            : item.text1 === "Renewal Completed" ?
                                                <Button onClick={() => onClickFilter("Done")} className="m-05r" icon="check" size="small" color="green" content="Done" />
                                                : item.text1 === "Full Approved" ? <Button onClick={() => onClickFilter("My Approval")} className="m-05r" icon="hourglass start" size="small" color="orange" content="My Approval" />
                                                    :
                                                    null
                                ))} */}

                            </Grid.Column>
                            <Grid.Column width={6} verticalAlign="bottom" textAlign="right">
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16} floated='left' verticalAlign="bottom">
                                            {/* <Tooltips
                                                content="Bulk Update"
                                                trigger={ */}
                                            <Link
                                                target={'_blank'}
                                                to={{
                                                    pathname: `${RouteEnum.DedicatedResourcesBulkUpdate}`,
                                                    state: { typePage: 'bulk', tab: 'bulk' },
                                                }}
                                            >
                                                <Button className="m-05r" icon="edit outline" size="small" color="purple" content="Bulk Update" />
                                            </Link>

                                            {/* }
                                            /> */}
                                            <Tooltips
                                                content="Export Excel"
                                                trigger={<Button className="m-05r" icon="file excel" size="small" color="green" content="Export Excel" onClick={() => exportTableToExcel('export', `DedicatedResourceList ${currDate}`)} />}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid>

                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="wrapper-table mb-1r">
                                        <DedicatedResourcesServiceTable
                                            tableData={RenewalContracts}
                                            columns={columns}
                                            setColumns={setColumns}
                                            direction={direction}
                                            setDirection={setDirection}
                                            activePage={activePage}
                                            pageSize={pageSize}
                                        />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={'equal'} >
                                <Grid.Column floated='left' width={8}>
                                    <Pagination
                                        activePage={activePage}
                                        onPageChange={(e, data) => handlePaginationChange(e, data)}
                                        totalPage={15}
                                        pageSize={pageSize}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Segments />
                    </Grid.Column>
                </Grid>

            </LoadingIndicator>
        </Fragment>
    );
};

export default DedicatedResourcesPage;
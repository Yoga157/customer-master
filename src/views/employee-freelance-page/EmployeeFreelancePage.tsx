import React, { Fragment, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import RouteEnum from 'constants/RouteEnum';
import { Link } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { Button, Pagination } from 'views/components/UI';
import InputSearch from './component/search/InputSearch';
import EmployeeFreelanceTable from './component/table/EmployeeFreelanceTable';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IEmployeeFreelanceTable from 'selectors/employee-freelance/models/IEmployeeFreelanceTable';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';
import { selectEmployeeFreelances } from 'selectors/employee-freelance/EmployeeFreelanceSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import EmployeeFreelanceFilter from 'stores/employee-freelance/models/EmployeeFreelanceFilter';
import EmployeeFreelanceSearch from 'stores/employee-freelance/models/EmployeeFreelanceSearch';
import EmployeeFreelanceMenuAccess from 'stores/employee-freelance/models/EmployeeFreelanceMenuAccess';

interface IProps {}

const EmployeeFreelancePage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPage] = useState(10);  
    const employeeFreelanceTable: IEmployeeFreelanceTable = useSelector((state: IStore) => selectEmployeeFreelances(state, [EmployeeFreelanceActions.REQUEST_EMPLOYEE_FREELANCES]));
    const columnSorting: string = useSelector((state: IStore) => state.employeeFreelance.listData.column);
    const filter: EmployeeFreelanceFilter = useSelector((state: IStore) => state.employeeFreelance.listData.filter);
    const search: EmployeeFreelanceSearch = useSelector((state: IStore) => state.employeeFreelance.listData.search);
    const direction: string = useSelector((state: IStore) => state.employeeFreelance.listData.sorting);
    const employeeFreelanceMenuAccess: EmployeeFreelanceMenuAccess = useSelector((state: IStore) => state.employeeFreelance.employeeFreelanceMenuAccess);
    
    useEffect(() => {
        dispatch(EmployeeFreelanceActions.requestEmployeeFreelances(activePage, pageSize, 'employeeFreelanceGenID', 'descending', currentUser.email));
    }, [dispatch]);

    const handlePaginationChange = (e: any, data: any) => {
        setActivePage(data.activePage);
        if (search !== null) {
            dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceSearch(data.activePage, pageSize, columnSorting, direction, search.search, currentUser.email));
        } else if (filter != null) {
            const filterItem = new EmployeeFreelanceFilter(filter);
            filterItem.pageSize = pageSize;
            filterItem.page = data.activePage;
            filterItem.column = columnSorting;
            filterItem.sorting = direction;
            dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceFilterSearch(filterItem));
        } else {
            dispatch(EmployeeFreelanceActions.requestEmployeeFreelances(activePage, pageSize, 'employeeFreelanceGenID', 'descending', currentUser.email));
        }        
    };

    const isRequesting: boolean = useSelector((state: IStore) => 
        selectRequesting(state, [EmployeeFreelanceActions.REQUEST_EMPLOYEE_FREELANCES,
            EmployeeFreelanceActions.REQUEST_SEARCH_EMPLOYEE_FREELANCE,
            EmployeeFreelanceActions.REQUEST_FILTER_SEARCH_EMPLOYEE_FREELANCE]));

    return (
        <Fragment>
            {employeeFreelanceMenuAccess.isAllowAccess === true ? (
                <LoadingIndicator isActive={isRequesting}>
                    <Grid columns='equal'>
                        <Grid.Column textAlign='center'>
                            <InputSearch />
                        </Grid.Column>
                    </Grid>

                    
                    <Grid columns='equal'>
                        <Grid.Column width={4}>
                            <Header as='h4'>
                                <Header.Content className='ml-1r-767'>Employee Freelance List</Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Link to={RouteEnum.EmployeeFreelanceForm}>
                                <Button icon="plus" color="yellow" disabled={false} floated="right" content="Add New" />
                            </Link>
                        </Grid.Column>
                    </Grid>

                    <Grid columns='equal'>
                        <Grid.Column>
                            <div className='x-ovflo-auto mb-1'>
                                <EmployeeFreelanceTable 
                                    tableData={employeeFreelanceTable}/>
                            </div>                            
                            <Pagination
                                activePage={activePage}
                                onPageChange={(e, data) => handlePaginationChange(e, data)}
                                totalPage={employeeFreelanceTable.totalRow}
                                pageSize={pageSize}
                            />
                        </Grid.Column>
                    </Grid>

                    <br />
                </LoadingIndicator>
            ) : (<div>User Not Allowed Access</div>)}
            
        </Fragment>
    );
};

export default EmployeeFreelancePage;
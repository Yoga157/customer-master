import React, { useCallback, useState } from 'react';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { SearchInput } from 'views/components/UI';
import { Grid, Header, Form, Divider } from 'semantic-ui-react';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { format } from 'date-fns';
import './EmployeeBulk.scss';
import { Form as FinalForm, Field } from 'react-final-form';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import IDedicatedResourceTable from 'selectors/dedicated-resources/models/IDedicatedResourceTable';
import { selectRenewalContracts } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';
import EmployeeBulkTable from './table/EmployeeBulkTable';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from "stores/toasts/ToastsAction";

interface IProps {
    DataEmployee: any;
    setDataEmployee: any;
    setEmployeeID: any;
    setEmployeeNameID: any;
    isCheck:any;
    setIsCheck: any;
    setTempCheck: any;
    tempCheck: any;
}

const EmployeeBulk: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { DataEmployee, setDataEmployee, setEmployeeNameID, setEmployeeID, isCheck, setIsCheck, setTempCheck, tempCheck } = props;
    const dispatch: Dispatch = useDispatch();


    const isRequesting: boolean = useSelector((state: IStore) =>
        selectRequesting(state, [
        ])
    );

    const onSubmitHandler = (values: any) => {

    };


 
    const DeleteByID = (rowData) => {
        let filteredArray = DataEmployee.filter(item => item.contractID !== rowData.contractID)
        setTempCheck(tempCheck.filter((item) => item.employeeID !== parseInt(rowData.employeeID)))
        setDataEmployee(filteredArray)
    }

    return (
        <>
            <Grid >
                <Grid.Row columns="equal">
                    <Grid.Column  >
                        <FinalForm
                            onSubmit={(values: any) => onSubmitHandler(values)}
                            initialValues={
                                {}
                            }
                            render={({ handleSubmit }) => (
                                <Form onSubmit={handleSubmit} loading={isRequesting}>
                                    <Grid verticalAlign="top">
                                        <Grid.Row columns="equal" >
                                            <Grid.Column textAlign="left" style={{ marginLeft: "10px" }} className="title-w-toggle FullGrid767">
                                                <Header as="h4" >
                                                    <Header.Content>
                                                        You need one or more employee to Submit <span style={{ color: "red" }}>*</span>
                                                    </Header.Content>

                                                </Header>
                                            </Grid.Column>
                                            {/* <Grid.Column className='FullGrid767' style={{ marginRight: "10px", marginLeft: "10px" }} width={6} floated="right">
                                                <Field
                                                    name="EmployeeName"
                                                    component={SearchInput}
                                                    placeholder="e.g.PT. Customer .."
                                                    loading={isLoadingEmployee}
                                                    labelName="Employee Name"
                                                    handleSearchChange={handleSearchChangeEmp}
                                                    onResultSelect={onResultSelectEmployee}
                                                    resultRenderer={resultRenderer}
                                                    results={RenewalContracts.rows}
                                                    // mandatory={mandatory.sCustomerName}
                                                    onKeyPress={(event) => {
                                                        if (event.charCode === 13) {
                                                            event.preventDefault()
                                                            dispatch(DedicatedResourcesActions.requestRenewalContract(currentUser.employeeID, 1, 99, 'ContractID', 'descending', employeeName))
                                                        }
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <p className="BtmFormNote">Press enter to see the results</p>
                                                </div>
                                            </Grid.Column> */}
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            )}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <EmployeeBulkTable
                            tableData={DataEmployee}
                            setDataEmployee={setDataEmployee}
                            DeleteByID={DeleteByID}
                            isCheck={isCheck}
                            setIsCheck={setIsCheck}
                            tempCheck={tempCheck}
                            setTempCheck={setTempCheck}
                        />
                    </Grid.Column>
                </Grid.Row>
                
                <Divider />
            </Grid>
        </>
    );
};

export default EmployeeBulk;

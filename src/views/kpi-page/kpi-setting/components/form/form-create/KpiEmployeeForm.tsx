import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, Divider, Form, Grid, Icon, Popup, Radio, Search } from "semantic-ui-react";
import EmployeeSearchInputList from "views/components/UI/SeachInputListCustomer/SearchInputList";
import { Form as FinalForm, Field} from 'react-final-form';
import { Dispatch } from 'redux';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";
import { combineValidators, isRequired } from "revalidate";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { format } from 'date-fns';
import TableRowModel from "stores/kpi/kpi-employee/models/TableRowModel";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
// import { selectKpiEmployeeSearchInputList } from "selectors/select-options/KpiSelectors";
import { selectKpiEmployeeSearchInputList } from "selectors/kpi/kpi-setting/KpiSettingSelector";
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import { selectRequesting } from "selectors/requesting/RequestingSelector";

interface IProps {
    kpiSettingID: string,
    kpiSettingItemsID: string,
    type: string,
    rowData: any
};

const KpiEmployeeForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

    const [mandatoryInput] = useState({
        sEmployee: false,
    });

    let [employeeType, setEmployeeType] = useState("include");
    const handleChangeRadio = useCallback((e, data) => {
        const { value } = data;
        setEmployeeType(value);
    }, [dispatch]);

    let employeeStoreSearchInputList = useSelector((state:IStore) => selectKpiEmployeeSearchInputList(state));
    
    const handleSearchChangeEmployee = useCallback((e, data) => {
        if(data.value.length >= 2)
        {
            dispatch(KpiSettingActions.requestEmployeeByName(data.value));
        }
        
    }, [dispatch])

    let isLoadingEmployee: boolean = useSelector((state: IStore) => selectRequesting(state, [KpiSettingActions.REQUEST_EMPLOYEES_BY_NAME]));

    const onSubmitHandler = (values: any) =>
    {
        const { employeeName } = values;        
        let userId: any = localStorage.getItem("userLogin");
        var date = format(new Date(), 'yyyy-MM-dd');
        
        let jsonString = localStorage.getItem("kpiEmployeeIncludeExclude")!;
        let listEmployeeIncludeExclude = JSON.parse(jsonString);
        
        let exists: number = 0;

        employeeName.forEach(employee => {
            if (employee.value !== '') {
                const { divName, empId, empName, type, empKey } = employee;

                listEmployeeIncludeExclude === null ? exists = 0 : exists = listEmployeeIncludeExclude.filter((c) => c.employeeKey === empKey).length;

                if (exists === 0) {
                    let data = new TableRowModel({});
                    data.employeeID = empId;
                    data.employeeName = empName;
                    data.divisionName = divName;
                    data.employeeKey = empKey
                    data.type = type;
                    data.createDate = date;
                    data.createUserID = JSON.parse(userId).employeeID;
                    data.modifyDate = date;
                    data.modifyUserID = JSON.parse(userId).employeeID;

                    dispatch(KpiSettingActions.postKpiEmployeeLocal(data)).then(() => {
                        dispatch(ModalAction.CLOSE());
                        dispatch(KpiSettingActions.requestKpiEmployeeLocal());
                    });
                } else if (exists !== 0) {
                    exists = 0;
                    dispatch(ToastsAction.add(`${empName} - ${divName} Already Exists.`, ToastStatusEnum.Warning));
                    dispatch(ModalAction.CLOSE());
                }
            }
        });
    };

    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
    };

    const validate = combineValidators({
        // employeeName: isRequired("employeeName"),
        // employeeTypeRadioGroup: isRequired("employeeTypeRadioGroup")
    });

    let isRequesting:boolean = false;

    return (
        <Fragment>
            <Card.Header>Add Employee</Card.Header>
            <Divider></Divider>
            <LoadingIndicator isActive={isRequesting}>
                <FinalForm
                    validate={validate}
                    onSubmit={(values: any) => onSubmitHandler(values)}
                    render={
                        ({
                            handleSubmit,
                            pristine,
                            invalid
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid columns={1}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Field
                                                name='employeeName'
                                                component={EmployeeSearchInputList}
                                                placeholder='e.g. Employee ..'
                                                loading={isLoadingEmployee}
                                                labelName='Employee Name'                       
                                                handleSearchEmployee={handleSearchChangeEmployee}
                                                resultEmployee={employeeStoreSearchInputList}
                                                mandatory={mandatoryInput.sEmployee}
                                                employeeType={employeeType}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>  
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Form.Field>Employee Type</Form.Field>
                                            <Form.Field>
                                                <Radio 
                                                    label="Include"
                                                    name="employeeTypeRadioGroup"
                                                    value="include"
                                                    checked={employeeType === "include"}
                                                    onChange={handleChangeRadio}
                                                />
                                                <Radio 
                                                    label="Exclude"
                                                    name="employeeTypeRadioGroup"
                                                    value="exclude"
                                                    checked={employeeType === "exclude"}
                                                    onChange={handleChangeRadio}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <br/>
                                <Button className='MarBot20' floated='right' type='submit' color='blue' disabled={pristine}>Save</Button>
                                <Button floated='right' type='button' onClick={cancelClick} >Cancel</Button>
                            </Form>
                        )
                    }
                />
            </LoadingIndicator>
        </Fragment>
    );

};

export default KpiEmployeeForm;
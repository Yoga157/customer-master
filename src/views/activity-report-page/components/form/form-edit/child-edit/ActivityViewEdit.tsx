import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Form, Header, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import moment from 'moment';

import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { SelectInput, DateInput, Button, DropdownInput, Tooltips, TextAreaInput, SearchInputList, TextInput } from 'views/components/UI';
import styles from './ActivityViewEdit.module.scss';
import IStore from 'models/IStore';
import { selectViewActivityInformation } from 'selectors/activity-report/ActivityReportSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ActivityReportActivityInformationActions from 'stores/activity-report-activity-information/ActivityReportActivityInformationActions';
import * as ActivityReportTicketInformationActions from 'stores/activity-report-ticket-information/ActivityReportTicketInformationActions';
import { ActivityReportViewEditActivityInformation } from 'stores/activity-report/models/view-edit';
import { selectActivityReportCategoryOptions } from 'selectors/select-options/ActivityReportCategorySelector';
import * as ActivityReportCategoryActions from 'stores/activity-report-category/ActivityReportCategoryActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectEmployeeSearchOptions } from 'selectors/select-options/EmployeeSelector';
import { activityReportStatusOptions } from 'constants/actvityReportStatusOptions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import { selectEmployeeFreelancePermanentSearchOptions } from 'selectors/employee-freelance-permanent/EmployeeFreelancePermanentSelector';
import * as EmployeeFreelancePermanentActions from 'stores/employee-freelance-permanent/EmployeeFreelancePermanentActions';

interface IProps {
    activityReportGenID: string;
}

const ActivityViewEdit: React.FC<IProps> = ({ activityReportGenID }) => {
    const dispatch: Dispatch = useDispatch();
    const [disableComponent, setDisableComponent] = useState(true);
    const [engineerState, setEngineerState] = useState([]);
    const [status, setStatus] = useState('');
    const [mandatory, setMandatory] = useState({
        sStartDate: false,
        sEndDate: false,
        sDepartureDate: false,
        sArrivalDate: false,
        sStatus: false,
        sEngineerList: false,
        sNote: false,
    });

    const viewActivityReportActivityInformation = useSelector((state: IStore) => selectViewActivityInformation(state));
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ActivityReportActivityInformationActions.REQUEST_VIEW_ACTIVITY_INFORMATION]));
    const activityReportCategoryOptions: any[] = useSelector((state: IStore) => selectActivityReportCategoryOptions(state));
    // const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeSearchOptions(state));
    const employeeFreelancePermanentSearch = useSelector((state: IStore) => selectEmployeeFreelancePermanentSearchOptions(state));

    let engineerArr: string[] = [];
    
    const bRefreshPage: boolean = useSelector((state: IStore) => state.activityReportActivityInformation.refreshPage);
    const resultAction = useSelector((state: IStore) => state.activityReportActivityInformation.resultActions);

    useEffect(() => {
        dispatch(ActivityReportCategoryActions.requestActivityReportCategory());
    }, []);

    useEffect(() => {
        if (activityReportGenID.length > 0) {
            dispatch(ActivityReportActivityInformationActions.requestViewActivityInformationById(+activityReportGenID, +currentUser.employeeID));
        }
    }, [dispatch, activityReportGenID]);

    const [selectedStartDate, setSelectedStartDate] = useState(undefined);
    const [selectedEndDate, setSelectedEndDate] = useState(undefined);
    const [startEndValidateMsg, setStartEndValidateMsg] = useState('');
    const [selectedDepartureDate, setSelectedDepartureDate] = useState(undefined);
    const [selectedArrivalDate, setSelectedArrivalDate] = useState(undefined);
    const [departureArrivalValidateMsg, setDepartureArrivalValidateMsg] = useState('');

    const [convStartDate, setConvStartDate] = useState('');
    const [convEndDate, setConvEndDate] = useState('');
    const [convDepartureDate, setConvDepartureDate] = useState('');
    const [convArrivalDate, setConvArrivalDate] = useState('');

    useEffect(() => {
        setEngineerState([]);
        if (viewActivityReportActivityInformation.engineerList !== null) {
            if (viewActivityReportActivityInformation.engineerList.length > 0) {
                const temp = viewActivityReportActivityInformation.engineerList.split(';');
                for(let item of temp) {
                    if (item !== '') {
                        const newItem = {
                            value: item,
                            text: item
                        };
                        setEngineerState(engineerState => [...engineerState, newItem]);
                    }
                }
            }
        } 
        setStatus(viewActivityReportActivityInformation.status);

        if (viewActivityReportActivityInformation.startDate !== '') {
            setConvStartDate(`${moment(viewActivityReportActivityInformation.dStartDate).format('DD MMMM yyyy')} ${moment(viewActivityReportActivityInformation.dStartDate).format('HH:mm')}`);
            setSelectedStartDate(viewActivityReportActivityInformation.dStartDate);
        } else {
            setConvStartDate('');
            setSelectedStartDate(undefined);
        }

        if (viewActivityReportActivityInformation.endDate !== '') {
            setConvEndDate(`${moment(viewActivityReportActivityInformation.dEndDate).format('DD MMMM yyyy')} ${moment(viewActivityReportActivityInformation.dEndDate).format('HH:mm')}`);
            setSelectedEndDate(viewActivityReportActivityInformation.dEndDate);
        } else {
            setConvEndDate('');
            setSelectedEndDate(undefined);
        }

        if (viewActivityReportActivityInformation.departureDate !== '') {
            setConvDepartureDate(`${moment(viewActivityReportActivityInformation.dDepartureDate).format('DD MMMM yyyy')} ${moment(viewActivityReportActivityInformation.dDepartureDate).format('HH:mm')}`);
            setSelectedDepartureDate(viewActivityReportActivityInformation.dDepartureDate);
        } else {
            setConvDepartureDate('');
            setSelectedDepartureDate(undefined);
        }

        if (viewActivityReportActivityInformation.arrivalDate !== '') {
            setConvArrivalDate(`${moment(viewActivityReportActivityInformation.dArrivalDate).format('DD MMMM yyyy')} ${moment(viewActivityReportActivityInformation.dArrivalDate).format('HH:mm')}`);
            setSelectedArrivalDate(viewActivityReportActivityInformation.dArrivalDate);
        } else {
            setConvArrivalDate('');
            setSelectedArrivalDate(undefined);
        }  
    }, [viewActivityReportActivityInformation]);

    const handleChangeStartDate = useCallback((data) => {
        setSelectedStartDate(data);
    }, [dispatch]);

    const handleChangeEndDate = useCallback((data) => {
        setSelectedEndDate(data);
    }, [dispatch]);

    const handleChangeDepartureDate = useCallback((data) => {
        setSelectedDepartureDate(data);
    }, [dispatch]);

    const handleChangeArrivalDate = useCallback((data) => {
        setSelectedArrivalDate(data);
    }, [dispatch]);

    useEffect(() => {
        compareStartAndFinishDate(selectedStartDate, selectedEndDate);
    }, [selectedStartDate]);

    useEffect(() => {
        compareStartAndFinishDate(selectedStartDate, selectedEndDate);
    }, [selectedEndDate]);

    useEffect(() => {
        compareDepartureAndArrivalDate(selectedDepartureDate, selectedArrivalDate);
    }, [selectedDepartureDate]);

    useEffect(() => {
        compareDepartureAndArrivalDate(selectedDepartureDate, selectedArrivalDate);
    }, [selectedArrivalDate]);

    const compareStartAndFinishDate = (selectedStartDate: any, selectedEndDate: any) => {
        if (typeof(selectedStartDate) != 'undefined' &&
        typeof(selectedEndDate) != 'undefined') {
            if (selectedStartDate > selectedEndDate) {
                setStartEndValidateMsg('End Date must more than Start Date');
            } else if (selectedStartDate < selectedEndDate) {
                setStartEndValidateMsg('');
            }
        }
    };

    const compareDepartureAndArrivalDate = (selectedDepartureDate: any, selectedArrivalDate: any) => {
        if (typeof(selectedDepartureDate) != 'undefined' &&
        typeof(selectedArrivalDate) != 'undefined') {
            if (selectedDepartureDate > selectedArrivalDate) {
                setDepartureArrivalValidateMsg('Arrival Date must more than Departure Date');
            } else if (selectedDepartureDate < selectedArrivalDate) {
                setDepartureArrivalValidateMsg('');
            }
        }
    };

    const onChangeActivityReportStatus = (event: any) => {
        setStatus(event);
        setMandatory((prevState) => ({
            ...prevState,
            sNote: false
        }));
        if (event === 'Pending') {
            setMandatory((prevState) => ({
                ...prevState,
                sNote: true
            }));
        } 
    }

    const onEditHandler = (e: Event) => {
        if (disableComponent) {
          setDisableComponent(false);
        }
    };

    const onCancelHandler = () => {
        if (!disableComponent) {
            setEngineerState([]);
            dispatch(ActivityReportActivityInformationActions.requestViewActivityInformationById(+activityReportGenID, +currentUser.employeeID));
            setDisableComponent(true);
        }
    };

    const onSubmitHandler = (values: any) => {
        if (values.engineerList !== undefined) {
            if (Array.isArray(values.engineerList)) {
                for(let item of values.engineerList) {
                    if (item.value !== '') {
                        engineerArr.push(item.value);
                    }
                }
            } else {
                if (values.engineerList.length > 0) {
                    const temp = values.engineerList.split(';');
                    for(let item of temp) {
                        if (item !== '') {
                            engineerArr.push(item);
                        }
                    }
                }
            }            
        }

        if (engineerArr.indexOf(currentUser.email) === -1) {
            engineerArr.push(currentUser.email);
        }

        const updateItem = new ActivityReportViewEditActivityInformation({});
        updateItem.activityReportGenID = +activityReportGenID;
        updateItem.activityCategory = values.activityCategoryArr.join(';');
        updateItem.startDate = moment(values.dStartDate).format();
        updateItem.endDate = moment(values.dEndDate).format();
        updateItem.departureDate = moment(values.dDepartureDate).format();
        updateItem.arrivalDate = moment(values.dArrivalDate).format();
        updateItem.engineerList = values.engineerList === undefined ? '' : engineerArr.join(';');
        updateItem.status = values.status;
        updateItem.notes = values.notes;
        updateItem.modifyUserID = Number(currentUser.employeeID);
        
        let isValidSubmit = true;
        if (updateItem.status === '0' || updateItem.status.length === 0) {
            isValidSubmit = false;
            dispatch(ToastsAction.add(`Status is required`, ToastStatusEnum.Warning));
        }

        if (typeof(selectedStartDate) != 'undefined' && typeof(selectedEndDate) != 'undefined') {
            if (selectedStartDate > selectedEndDate) {
                isValidSubmit = false;
                dispatch(ToastsAction.add(`End Date must more than Start Date`, ToastStatusEnum.Warning));
            }
        }

        if (typeof(selectedDepartureDate) != 'undefined' && typeof(selectedArrivalDate) != 'undefined') {
            if (selectedDepartureDate > selectedArrivalDate) {
                isValidSubmit = false;
                dispatch(ToastsAction.add(`Arrival Date must more than Departure Date`, ToastStatusEnum.Warning));
            }
        }

        if (isValidSubmit) {
            // dispatch(ActivityReportActivityInformationActions.putViewActivityInformation(updateItem));
            dispatch(ActivityReportActivityInformationActions.putViewActivityInformation(updateItem)).then(() => {
                dispatch(ActivityReportActivityInformationActions
                    .requestViewActivityInformationById(+activityReportGenID, +currentUser.employeeID)).then(() => {
                        dispatch(ActivityReportTicketInformationActions
                            .requestViewTicketInformationById(+activityReportGenID, +currentUser.employeeID))
                })
            });
        }
        
        if (!isRequesting) {
            if (!disableComponent) {
                setDisableComponent(true);
            }
        }

        if (isValidSubmit == false) {
            setDisableComponent(false);
        }
    };

    const validate = combineValidators({
        dStartDate: isRequired('Start Date Time'),
        dEndDate: isRequired('End Date Time'),
        dDepartureDate: isRequired('Departure Date Time'),
        dArrivalDate: isRequired('Arrival Date Time'),
        engineerList: isRequired('Engineer List'),
        status: isRequired("Status is required"),
    });    

    const validateDependOnPendingStatus = combineValidators({
        dStartDate: isRequired('Start Date Time'),
        dEndDate: isRequired('End Date Time'),
        dDepartureDate: isRequired('Departure Date Time'),
        dArrivalDate: isRequired('Arrival Date Time'),
        engineerList: isRequired('Engineer List'),
        status: isRequired("Status is required"),
        notes: isRequired("Notes is required")
    }); 

    const handleSearchChangeEmployee = useCallback(
        (e, data) => {
          if (data.value.trim().length >= 2) {
            dispatch(EmployeeFreelancePermanentActions.requestEmployeeFreelancePermanent(data.value.trim()));
          }
        },
        [dispatch]
    );
    
    useEffect(() => {
        if (bRefreshPage) {
            if (resultAction.errorNumber === '666') {
                setDisableComponent(false);
                dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning))
            } else {
                if (resultAction.bSuccess === true) {
                    dispatch(ActivityReportActivityInformationActions.requestViewActivityInformationById(+activityReportGenID, +currentUser.employeeID));
                }
            }
        }
    }, [bRefreshPage]);

    return (
        <Fragment>
            {viewActivityReportActivityInformation.isAllowAccess ? (
                 <Segment className="LightGreyNotif">
                    <FinalForm 
                        onSubmit={(values: any) => onSubmitHandler(values)}
                        validate={status === 'Pending' ? validateDependOnPendingStatus : validate}
                        initialValues={viewActivityReportActivityInformation}
                        key={2}
                        render={({ handleSubmit }) => (
                            <Form 
                                key={2} 
                                onSubmit={handleSubmit} 
                                loading={isRequesting}
                            >
                                <Grid>
                                    <Grid.Row columns="equal">
                                        <Grid.Column>
                                            <Header>
                                                {viewActivityReportActivityInformation.isAllowEdit && (
                                                    <Header.Content className='FloatRight'>
                                                        {disableComponent && (
                                                            <Fragment>
                                                                <Tooltips
                                                                    content="Edit Ticket Information"
                                                                    trigger={
                                                                        <Button 
                                                                            basic 
                                                                            type="button" 
                                                                            compact 
                                                                            icon="edit" 
                                                                            onClick={(e: Event) => onEditHandler(e)} 
                                                                            floated="right" 
                                                                        />
                                                                    }
                                                                />
                                                            </Fragment>
                                                        )}
                                                        {!disableComponent && (
                                                            <Fragment>
                                                                <Tooltips 
                                                                    content="Save Update" 
                                                                    trigger={<Button basic compact icon="save" floated="right" />} 
                                                                />
                                                                <Tooltips
                                                                    content="Cancel Update"
                                                                    trigger={<Button type="button" basic compact icon="cancel" floated="right" onClick={onCancelHandler} />}
                                                                />
                                                            </Fragment>
                                                        )}
                                                    </Header.Content>
                                                )}
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
    
                                    <Grid.Row columns="equal">
                                        <Grid.Column className="ViewLabel">
                                            <Field
                                                name="activityCategoryArr"
                                                component={DropdownInput}
                                                placeholder="e.g. activity category.."
                                                labelName="Activity Category"
                                                disabled={disableComponent}
                                                allowAdditions={true}
                                                mandatory={false}                                                        
                                                options={activityReportCategoryOptions}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    {disableComponent === true ? (
                                         <Grid.Row columns="equal">
                                            <Grid.Column width={8} className="ViewLabel">
                                                <Field
                                                    name="convStartDate"
                                                    component={TextInput}
                                                    labelName="Start Date"
                                                    disabled={disableComponent}
                                                    values={convStartDate}
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={8} className="ViewLabel">
                                                <Field
                                                    name="convEndDate"
                                                    component={TextInput}
                                                    labelName="Finish Date"
                                                    disabled={disableComponent}
                                                    values={convEndDate}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    ) : (
                                        <Fragment>
                                            <Grid.Row columns="equal">
                                                <Grid.Column width={8} className="ViewLabel">
                                                    <Field
                                                        name="dStartDate" 
                                                        component={DateInput} 
                                                        labelName="Start Date" 
                                                        placeholder="e.g.10/03/2020" 
                                                        date={true} 
                                                        time={true}
                                                        formated={'MM/dd/yyyy HH:mm'}
                                                        mandatory={false}
                                                        disabled={disableComponent}
                                                        onChange={handleChangeStartDate}
                                                    />
                                                </Grid.Column>
                                                <Grid.Column width={8} className="ViewLabel">
                                                    <Field
                                                        name="dEndDate" 
                                                        component={DateInput} 
                                                        labelName="Finish Date" 
                                                        placeholder="e.g.10/03/2020" 
                                                        date={true} 
                                                        time={true}
                                                        formated={'MM/dd/yyyy HH:mm'}
                                                        mandatory={false}
                                                        disabled={disableComponent}
                                                        onChange={handleChangeEndDate}
                                                    />
                                                </Grid.Column>
                                            </Grid.Row>
                                            {(typeof(selectedStartDate) != 'undefined' && typeof(selectedEndDate) != 'undefined' && startEndValidateMsg.length > 0) && (
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <React.Fragment>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                                >
                                                                <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{startEndValidateMsg}</p>
                                                            </div>
                                                            <br />
                                                        </React.Fragment>
                                                        </Grid.Column>
                                                </Grid.Row>
                                            )}   
                                        </Fragment>
                                    )}
                                   
                                    {disableComponent === true ? (
                                       <Grid.Row columns="equal">
                                            <Grid.Column width={8} className="ViewLabel">
                                                <Field
                                                    name="convDepartureDate"
                                                    component={TextInput}
                                                    labelName="Departure Date"
                                                    disabled={disableComponent}
                                                    values={convDepartureDate}
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={8} className="ViewLabel">
                                                <Field
                                                    name="convArrivalDate"
                                                    component={TextInput}
                                                    labelName="Arrival Date"
                                                    disabled={disableComponent}
                                                    values={convArrivalDate}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    ) : (
                                        <Fragment>
                                            <Grid.Row columns="equal">
                                                <Grid.Column width={8} className="ViewLabel">
                                                    <Field
                                                        name="dDepartureDate" 
                                                        component={DateInput} 
                                                        labelName="Departure Date" 
                                                        placeholder="e.g.10/03/2020" 
                                                        date={true} 
                                                        time={true}
                                                        formated={'MM/dd/yyyy HH:mm'}
                                                        mandatory={false}
                                                        disabled={disableComponent}
                                                        onChange={handleChangeDepartureDate}
                                                    />
                                                </Grid.Column>
                                                <Grid.Column width={8} className="ViewLabel">
                                                    <Field
                                                        name="dArrivalDate" 
                                                        component={DateInput} 
                                                        labelName="Arrival Date" 
                                                        placeholder="e.g.10/03/2020" 
                                                        date={true} 
                                                        time={true}
                                                        formated={'MM/dd/yyyy HH:mm'}
                                                        mandatory={false}
                                                        disabled={disableComponent}
                                                        onChange={handleChangeArrivalDate}
                                                    />
                                                </Grid.Column>
                                            </Grid.Row> 
                                            {(typeof(selectedDepartureDate) != 'undefined' && typeof(selectedArrivalDate) != 'undefined' && departureArrivalValidateMsg.length > 0) && (
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <React.Fragment>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                                >
                                                                <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{departureArrivalValidateMsg}</p>
                                                            </div>
                                                            <br />
                                                        </React.Fragment>
                                                        </Grid.Column>
                                                </Grid.Row>
                                            )}
                                        </Fragment>
                                   )}
                                    
                                    <Grid.Row columns="equal">
                                        <Grid.Column className="ViewLabel">
                                            <Field
                                                name="engineerList"
                                                component={SearchInputList}
                                                placeholder="e.g.Employee Name"
                                                labelName="Engineer/Team List"
                                                handleSearchChange={handleSearchChangeEmployee}
                                                results={employeeFreelancePermanentSearch}
                                                disabled={disableComponent}
                                                mandatory={false}
                                                listSoftware={engineerState}
                                                disableDelete={disableComponent}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns="equal">
                                        <Grid.Column width={8} className="ViewLabel">
                                            <Field
                                                name="status" 
                                                component={SelectInput} 
                                                labelName="Status" 
                                                placeholder="e.g. Status.."                          
                                                mandatory={false}
                                                disabled={disableComponent}
                                                options={activityReportStatusOptions}
                                                onChanged={onChangeActivityReportStatus}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={8} className="ViewLabel">
                                            <Field
                                                name="notes" 
                                                component={TextAreaInput} 
                                                labelName={"Note"}
                                                placeholder={`Notes${status === 'Pending' ? '*' : ''}`}
                                                mandatory={false}
                                                disabled={disableComponent}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        )}
                    />
                </Segment>
            ) : (
                <div></div>
            )}
        </Fragment>
    );
};

export default ActivityViewEdit;
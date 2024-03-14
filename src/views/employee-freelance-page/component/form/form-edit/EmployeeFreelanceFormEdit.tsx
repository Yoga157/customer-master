import { History } from 'history';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Card, Divider, Form, Grid, Image, Segment } from 'semantic-ui-react';
import moment from 'moment';

import styles from './EmployeeFreelanceFormEdit.module.scss'
import './EmployeeFreelanceFormEditStyle.scss';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import EmployeeFreelanceModel from 'stores/employee-freelance/models/EmployeeFreelanceModel';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';
import RouteEnum from 'constants/RouteEnum';
import { Button, DateInput, Pagination, TextInput, Tooltips } from 'views/components/UI';
import { selectViewEmployeeFreelance } from 'selectors/employee-freelance/EmployeeFreelanceSelector'
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import { selectActivityReports } from 'selectors/activity-report/ActivityReportSelector';
import IActivityReportTable from 'selectors/activity-report/models/IActivityReportTable';
import ActivityReportTable from 'views/activity-report-page/components/table/ActivityReportTable';
import EmployeeFreelanceMenuAccess from 'stores/employee-freelance/models/EmployeeFreelanceMenuAccess';
import EmployeeFreelanceMapper from 'stores/employee-freelance/models/EmployeeFreelanceMapper';
import { serialize } from 'object-to-formdata';

interface RouteParams {
    id: string;
  }
  
interface IProps extends RouteComponentProps<RouteParams> {
    history: History;
}

const EmployeeFreelanceFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state)); 
    const viewEmployeeFreelance = useSelector((state: IStore) => selectViewEmployeeFreelance(state));
    const bRefreshPage: boolean = useSelector((state: IStore) => state.employeeFreelance.refreshPage);
    const resultAction = useSelector((state: IStore) => state.employeeFreelance.resultActions);
    const employeeFreelanceMenuAccess: EmployeeFreelanceMenuAccess = useSelector((state: IStore) => state.employeeFreelance.employeeFreelanceMenuAccess);
    const [emailFreelance, setEmailFreelance] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [validationImgPreview, setValidationImgPreview] = useState('');   

    const [selectedDOB, setSelectedDOB] = useState(undefined);
    const [dobValidateMsg, setDOBValidateMsg] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState(undefined);
    const [effExpDateValidateMsg, setEffExDateValidateMsg] = useState('');
    const [selectedExpiredDate, setSelectedExpiredDate] = useState(undefined);

    const validate = combineValidators({
        fullname: isRequired('Full Name'),
        dateOfBirth: isRequired('Date Of Birth'),
        effectiveDate: isRequired('Effective Date'),
        expiredDate: isRequired('Expired Date'),
        superiorEmail: isRequired('Superior Email'),
        phone: isRequired('Email'),
    });

    const [mandatory, setMandatory] = useState({
        sFullname: false,
        sDateOfBirth: false,
        sEffectiveDate: false,
        sExpiredDate: false,
        sSuperiorEmail: false,
        sPhone: false,
    });

    useEffect(() => {
        if (+props.match.params.id !== 0) {
            dispatch(EmployeeFreelanceActions.requestViewEmployeeFreelance(+props.match.params.id));
        }        
    }, []);

    const activityReportTable: IActivityReportTable = useSelector((state: IStore) => selectActivityReports(state, [ActivityReportActions.REQUEST_ACTIVITY_REPORTS]));
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPage] = useState(10);  
    
    useEffect(() => {
        if (emailFreelance !== '') {
            dispatch(ActivityReportActions.requestActivityReports(activePage, pageSize, 'activityReportGenID', 'descending', emailFreelance, +props.match.params.id));
        }
            
    }, [dispatch]);

    useEffect(() => {
        if (emailFreelance !== '') {
            dispatch(ActivityReportActions.requestActivityReports(activePage, pageSize, 'activityReportGenID', 'descending', emailFreelance, +props.match.params.id));
        }
    }, [emailFreelance])

    const handlePaginationChange = (e: any, data: any) => {
        if (emailFreelance !== '') {
            setActivePage(data.activePage);
            dispatch(ActivityReportActions.requestActivityReports(data.activePage, pageSize, 'activityReportGenID', 'descending', emailFreelance, +props.match.params.id));
        }
    };

    useEffect(() => {
        if (viewEmployeeFreelance.email !== 'undefined') {
            setEmailFreelance(viewEmployeeFreelance.email);
            setSelectedDOB(viewEmployeeFreelance.dDateOfBirth);
            setSelectedEffectiveDate(viewEmployeeFreelance.dEffectiveDate);
            setSelectedExpiredDate(viewEmployeeFreelance.dExpiredDate);
        }
    }, [viewEmployeeFreelance]);

    const onSubmitHandler = (values: any) => {
        const newObject = new EmployeeFreelanceMapper();
        const data = new FormData();
        
        const updateItem = new EmployeeFreelanceModel({});
        updateItem.employeeFreelanceGenID = values.employeeFreelanceGenID;
        updateItem.email = values.email;
        updateItem.superiorEmail = currentUser.email;

        updateItem.fullname = values.fullname;
        updateItem.dateOfBirth = values.dateOfBirth === null ? '' : moment(values.dDateOfBirth).format();
        updateItem.effectiveDate = values.effectiveDate === null ? '' : moment(values.dEffectiveDate).format();
        updateItem.expiredDate = values.expiredDate === null ? '' : moment(values.dExpiredDate).format();
        updateItem.phone = values.phone;
        updateItem.modifyUserID = Number(currentUser.employeeID);
        
        let isValidSubmit = true;

        if (typeof(selectedImage) === 'undefined' && validationImgPreview.length > 0) {
            isValidSubmit = false;
            dispatch(ToastsAction.add(`Photo Profile must less than 3 MB`, ToastStatusEnum.Warning));
        }      
        
        if (typeof(selectedDOB) != 'undefined') {
            var currentDate = new Date();
            var formatCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            var formatDBODate = new Date(selectedDOB.getFullYear(), selectedDOB.getMonth(), selectedDOB.getDate());
            
            if (formatDBODate > formatCurrentDate) {
                isValidSubmit = false;
                dispatch(ToastsAction.add(`DOB must less than equal current date`, ToastStatusEnum.Warning));
            }
        }

        if (typeof(selectedEffectiveDate) != 'undefined' && typeof(selectedExpiredDate) != 'undefined') {
            var formatEffectiveDate = new Date(selectedEffectiveDate.getFullYear(), selectedEffectiveDate.getMonth(), selectedEffectiveDate.getDate());
            var formatExpiredDate = new Date(selectedExpiredDate.getFullYear(), selectedExpiredDate.getMonth(), selectedExpiredDate.getDate());

            if (formatEffectiveDate > formatExpiredDate) {
                isValidSubmit = false;
                dispatch(ToastsAction.add(`Expired Date must more than Effective Date`, ToastStatusEnum.Warning));
            }
        }
        
        if (isValidSubmit) {
            newObject.Data = updateItem;
            newObject.PhotoProfile = selectedImage;

            // console.log(newObject);

            const options = {
                /**
                 * include array indices in FormData keys
                 * defaults to false
                 */
                indices: false,
          
                /**
                 * treat null values like undefined values and ignore them
                 * defaults to false
                 */
                nullsAsUndefineds: false,
          
                /**
                 * convert true or false to 1 or 0 respectively
                 * defaults to false
                 */
                booleansAsIntegers: false,
          
                /**
                 * store arrays even if they're empty
                 * defaults to false
                 */
                allowEmptyArrays: false,
              };
          
              serialize(
                newObject,
                options, // optional
                data // optional
              );

            dispatch(EmployeeFreelanceActions.requestPutEmployeeFreelance(data));
        }
    };

    const isRequesting: boolean = useSelector((state: IStore) => 
        selectRequesting(state, [
            EmployeeFreelanceActions.REQUEST_VIEW_EMPLOYEE_FREELANCE,
            ActivityReportActions.REQUEST_ACTIVITY_REPORTS,
        ])
    );

    useEffect(() => {
        if (bRefreshPage) {
            if(resultAction.errorNumber === '666') {
                dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning));
            } else {
                if (resultAction.resultObj.employeeFreelanceGenID !== 0) {
                    props.history.replace(RouteEnum.EmployeeFreelance);
                    dispatch(ToastsAction.add(`Update Employee Freelance ${resultAction.resultObj.email} Success`, ToastStatusEnum.Success));
                } 
            }
        }
    }, [bRefreshPage]);

    const onChangePhotoProfile = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size > (3 * 1024 * 1024)) {
                setSelectedImage(undefined);
                setValidationImgPreview("Photo Profile must less than 3 MB")
            } else {
                setSelectedImage(e.target.files[0]);
                setValidationImgPreview("");
            }
        }
    };

    const handleChangeDOB = useCallback((data) => {
        setSelectedDOB(data);
    }, [dispatch]);
   
    const handleChangeEffectiveDate = useCallback((data) => {
        setSelectedEffectiveDate(data);
    }, [dispatch]);

    const handleChangeExpiredDate = useCallback((data) => {
        setSelectedExpiredDate(data);
    }, [dispatch]);

    useEffect(() => {
        var currentDate = new Date();
        var formatCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        var formatDBODate = new Date(selectedDOB?.getFullYear(), selectedDOB?.getMonth(), selectedDOB?.getDate());

        if (formatDBODate > formatCurrentDate) {
            setDOBValidateMsg("DOB must less than equal current date");
        } else if (formatDBODate <= formatCurrentDate) {
            setDOBValidateMsg('');
        }
    }, [selectedDOB]); 

    useEffect(() => {
        compareEffectiveAndExpiredDate(selectedEffectiveDate, selectedExpiredDate);
    }, [selectedEffectiveDate]);    

    useEffect(() => {
        compareEffectiveAndExpiredDate(selectedEffectiveDate, selectedExpiredDate);
    }, [selectedExpiredDate]);

    const compareEffectiveAndExpiredDate = (selectedEffectiveDate: Date, selectedExpiredDate: Date) => {
        if (typeof(selectedEffectiveDate) != 'undefined' &&
            typeof(selectedExpiredDate) != 'undefined') {
                var formatEffectiveDate = new Date(selectedEffectiveDate.getFullYear(), selectedEffectiveDate.getMonth(), selectedEffectiveDate.getDate());
                var formatExpiredDate = new Date(selectedExpiredDate.getFullYear(), selectedExpiredDate.getMonth(), selectedExpiredDate.getDate());

                if (formatEffectiveDate > formatExpiredDate) {
                    setEffExDateValidateMsg("Expired Date must more than Effective Date");
                } else if (formatEffectiveDate <= formatExpiredDate) {
                    setEffExDateValidateMsg("");
                }
            }
    };

    return (
        <Fragment>
            {employeeFreelanceMenuAccess.isAllowAccess === true && 
                viewEmployeeFreelance.superiorEmail.toLowerCase() === currentUser.email.toLowerCase() ? (
                <Fragment>
                    <Card centered raised className={styles.Card}>
                    <Image src={'/assets/BGfreelance.jpg'} wrapped ui={false} />
                        <Card.Header className={styles.ProfileTitle}>View Edit Employee Freelance</Card.Header>
                        <Card.Content>
                            <FinalForm 
                                validate={validate}
                                onSubmit={onSubmitHandler}
                                initialValues={viewEmployeeFreelance}
                                render={({ handleSubmit, invalid }) => (
                                    <Form
                                        onSubmit={handleSubmit}
                                        loading={isRequesting}
                                    >
                                        <Grid>
                                            <Grid.Row columns="equal">

                                                {/* image profile user */}
                                                <Grid.Column 
                                                    width={16} 
                                                    style={{
                                                        height: '130px',
                                                    }}>
                                                    <div className={styles.ProfileFrame}>
                                                    {validationImgPreview.length > 0 && (
                                                        <React.Fragment>
                                                            <div className='ValImageProfile'>                                                               
                                                                <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{validationImgPreview}</p>
                                                            </div>
                                                            <br />
                                                        </React.Fragment>
                                                    )}
                                                    
                                                    {typeof(selectedImage) !== 'undefined' ? (
                                                        <Image size='medium' centered circular
                                                            src={`${window.URL.createObjectURL(selectedImage)}`}
                                                            alt="Image2 Profile"
                                                        />
                                                    ) : (<Image size='medium' centered circular
                                                        // src={`${viewEmployeeFreelance.profilePicImage}?${new Date().getTime()}`}
                                                        src={`${viewEmployeeFreelance.profilePicImage}`}
                                                        alt="Image3 Profile"
                                                    />)}
                                                    <Tooltips
                                                        content="Change Profile Picture"
                                                        position='bottom center'
                                                        trigger={
                                                        <Button
                                                            className='YellowPicBtn'
                                                            circular
                                                            icon="camera"
                                                            color="yellow"
                                                            size='large'
                                                        />
                                                        }
                                                    />
                                                    <input 
                                                        className='inputProFilePic'
                                                        accept='image/*'
                                                        type="file" 
                                                        name="photoProfile" 
                                                        onChange={onChangePhotoProfile} 
                                                    />
                                                   
                                                    </div>
                                                    
                                                </Grid.Column>
                                                <Grid.Column width={16} className={styles.jumbotronProfile}>
                                                    <Grid>
                                                        <Grid.Row columns="equal">
                                                            <Grid.Column mobile={16} tablet={5} computer={4} className='ProfileDisablelabel'>
                                                                <Field
                                                                    name="nikktp"
                                                                    component={TextInput}
                                                                    labelName="NIK KTP"
                                                                    disabled={true}
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column mobile={16} tablet={5} computer={6} className='ProfileDisablelabel'>
                                                                <Field
                                                                    name="email"
                                                                    component={TextInput}
                                                                    placeholder="e.g. email.."
                                                                    labelName="Email"
                                                                    disabled={true}
                                                                />    
                                                            </Grid.Column>
                                                            <Grid.Column mobile={16} tablet={6} computer={6}className='ProfileDisablelabel'>
                                                                <Field
                                                                        name="superiorEmail"
                                                                        component={TextInput}
                                                                        labelName="Superior Email"
                                                                        disabled={true}
                                                                    />    
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                                <Grid.Column mobile={16} tablet={16} computer={10} className="mt-1n5r">
                                                    <Field
                                                        name="fullname"
                                                        component={TextInput}
                                                        placeholder="e.g. fullname.."
                                                        labelName="Full Name"
                                                        mandatory={mandatory.sFullname}
                                                    />
                                                    <Grid>
                                                        <Grid.Row columns="equal">
                                                            <Grid.Column mobile={16} tablet={16} computer={6}>
                                                                <Field 
                                                                    name="dDateOfBirth" 
                                                                    component={DateInput} 
                                                                    labelName="Date Of Birth" 
                                                                    placeholder="e.g.10/03/2020" 
                                                                    date={true} 
                                                                    mandatory={mandatory.sDateOfBirth}
                                                                    onChange={handleChangeDOB}
                                                                />
                                                                {(typeof(selectedDOB) != 'undefined' && dobValidateMsg.length > 0) && (
                                                                    <React.Fragment>
                                                                        <div
                                                                            style={{
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between',
                                                                            }}
                                                                            >
                                                                            <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{dobValidateMsg}</p>
                                                                        </div>
                                                                        <br />
                                                                    </React.Fragment>
                                                                )}
                                                            </Grid.Column>
                                                            <Grid.Column mobile={16} tablet={16} computer={6}>
                                                                <Field
                                                                    name="phone"
                                                                    component={TextInput}
                                                                    placeholder="e.g. phone.."
                                                                    labelName="Phone"
                                                                    mandatory={mandatory.sPhone}
                                                                />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                                <Grid.Column mobile={16} tablet={16} computer={6} className="mt-1n5r mb-1r">
                                                <Segment className='LightGreyNotif p-1r'>
                                                        <Grid>
                                                            <Grid.Row columns="equal">
                                                                <Grid.Column width={16}>
                                                                    <Field 
                                                                        name="dEffectiveDate" 
                                                                        component={DateInput} 
                                                                        labelName="Effective Date" 
                                                                        placeholder="e.g.10/03/2020" 
                                                                        date={true} 
                                                                        mandatory={mandatory.sEffectiveDate}
                                                                        onChange={handleChangeEffectiveDate}
                                                                    />
                                                                </Grid.Column>
                                                                <Grid.Column width={16}>
                                                                    <Field 
                                                                        name="dExpiredDate" 
                                                                        component={DateInput} 
                                                                        labelName="Expired Date" 
                                                                        placeholder="e.g.10/03/2020" 
                                                                        date={true} 
                                                                        mandatory={mandatory.sExpiredDate}
                                                                        onChange={handleChangeExpiredDate}
                                                                    />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row>
                                                                <Grid.Column>
                                                                {(typeof(selectedEffectiveDate) != 'undefined' && typeof(selectedExpiredDate) != 'undefined' && effExpDateValidateMsg.length > 0) && (
                                                                    <React.Fragment>
                                                                        <div
                                                                            style={{
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between',
                                                                            }}
                                                                            >
                                                                            <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{effExpDateValidateMsg}</p>
                                                                        </div>
                                                                        <br />
                                                                    </React.Fragment>
                                                                )}
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                    </Segment>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Divider className='m-0'/>
                                            <Grid.Row columns="equal">
                                                <Grid.Column>
                                                    <Button 
                                                        floated="right" 
                                                        color="blue" 
                                                        content="Update"
                                                        disabled={invalid} 
                                                    />
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Form>
                                )}
                            />
                        </Card.Content>
                    </Card>

                    <Card centered raised className={styles.Card}>
                        <Card.Content>
                            <Card.Header>Activity Report</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <LoadingIndicator isActive={false}>
                            <Grid columns='equal'>
                            <Grid.Column>
                                <div className='x-ovflo-auto mb-1'>
                                    <ActivityReportTable 
                                        tableData={activityReportTable}
                                    />
                                </div>
                                <Pagination
                                    activePage={activePage}
                                    onPageChange={(e, data) => handlePaginationChange(e, data)}
                                    totalPage={activityReportTable.totalRow}
                                    pageSize={pageSize}
                                    />
                                </Grid.Column>
                            </Grid>
                            </LoadingIndicator>
                        </Card.Content>
                    </Card>
                </Fragment>
            ) : (<div>User Not Allowed Access</div>)}
            
        </Fragment>
    );
};

export default EmployeeFreelanceFormEdit;
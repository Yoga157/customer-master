import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { History } from 'history';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Grid, Divider, Segment, Image } from 'semantic-ui-react';
import { Button, DateInput, TextInput } from 'views/components/UI';
import moment from 'moment';
import { serialize } from 'object-to-formdata';

import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import RouteEnum from 'constants/RouteEnum';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import EmployeeFreelanceModel from 'stores/employee-freelance/models/EmployeeFreelanceModel';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';
import {
    selectEmployeeFreelanceCheckEmailExist, selectEmployeeFreelanceCheckNIKKTPExist
} from 'selectors/employee-freelance/EmployeeFreelanceSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import EmployeeFreelanceCheckEmailExistRequest from 'stores/employee-freelance/models/EmployeeFreelanceCheckEmailExistRequest';
import EmployeeFreelanceCheckNIKKTPExistRequest from 'stores/employee-freelance/models/EmployeeFreelanceCheckNIKKTPExistRequest';
import EmployeeFreelanceMenuAccess from 'stores/employee-freelance/models/EmployeeFreelanceMenuAccess';
import EmployeeFreelanceMapper from 'stores/employee-freelance/models/EmployeeFreelanceMapper';
import styles from './EmployeeFreelanceForm.module.scss';


interface IProps {
    history: History;
}

const EmployeeFreelanceForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { history } = props;
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state)); 
    const bRefreshPage: boolean = useSelector((state: IStore) => state.employeeFreelance.refreshPage);
    const resultAction = useSelector((state: IStore) => state.employeeFreelance.resultActions);
    const employeeFreelanceCheckEmailExist: any = useSelector((state: IStore) => selectEmployeeFreelanceCheckEmailExist(state));
    const employeeFreelanceCheckNIKKTPExist: any = useSelector((state: IStore) => selectEmployeeFreelanceCheckNIKKTPExist(state));
    const employeeFreelanceMenuAccess: EmployeeFreelanceMenuAccess = useSelector((state: IStore) => state.employeeFreelance.employeeFreelanceMenuAccess);
    const [emailExist, setEmailExist] = useState(false);
    const [emailExistValidateMsg, setEmailExistValidateMsg] = useState('');
    
    const [selectedDOB, setSelectedDOB] = useState(undefined);
    const [dobValidateMsg, setDOBValidateMsg] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState(undefined);
    const [effExpDateValidateMsg, setEffExDateValidateMsg] = useState('');
    const [selectedExpiredDate, setSelectedExpiredDate] = useState(undefined);
    
    const [selectedImage, setSelectedImage] = useState();
    const [validationImgPreview, setValidationImgPreview] = useState('');    
    const [NIKKTPExist, setNIKKTPExist] = useState(false);
    const [NIKKTPExistValidateMsg, setNIKKTPExistValidateMsg] = useState('');
    const [initialValues, setInitialValues] = useState({
       email: '',
       fullname: '',
       dateOfBirth: undefined,
       effectiveDate: undefined,
       expiredDate: undefined,
       superiorEmail: currentUser.email,
       phone: ''
    });
    const [mandatory, setMandatory] = useState({
        sNIKKTP: false,
        sEmail: false,
        sFullname: false,
        sDateOfBirth: false,
        sEffectiveDate: false,
        sExpiredDate: false,
        sSuperiorEmail: false,
        sPhone: false,
    });

    const validate = combineValidators({
        email: isRequired('Email'),
        fullname: isRequired('Full Name'),
        dateOfBirth: isRequired('Date Of Birth'),
        effectiveDate: isRequired('Effective Date'),
        expiredDate: isRequired('Expired Date'),
        superiorEmail: isRequired('Superior Email'),
        phone: isRequired('Email'),
    });

    const onSubmitHandler = (values: any) => {
        const newObject = new EmployeeFreelanceMapper();
        const data = new FormData();

        const newItem = new EmployeeFreelanceModel({});
        newItem.employeeFreelanceGenID = 0;
        newItem.nikktp = values.nikktp;
        newItem.email = values.email;
        newItem.fullname = values.fullname;
        newItem.dateOfBirth = values.dateOfBirth === null ? '' : moment(values.dateOfBirth).format();
        newItem.effectiveDate = values.effectiveDate === null ? '' : moment(values.effectiveDate).format();
        newItem.expiredDate = values.expiredDate === null ? '' : moment(values.expiredDate).format();
        newItem.phone = values.phone;
        newItem.superiorEmail = currentUser.email;
        newItem.createUserID = Number(currentUser.employeeID);
        
        let isValidSubmit = true;

        if (newItem.nikktp.length !== 16) {
            isValidSubmit = false;
            dispatch(ToastsAction.add(`NIK KTP must 16 characters`, ToastStatusEnum.Warning));
        }

        if (typeof(selectedImage) === 'undefined' && validationImgPreview.length > 0) {
            isValidSubmit = false;
            dispatch(ToastsAction.add(`Photo Profile must less then 3 MB`, ToastStatusEnum.Warning));
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
            newObject.Data = newItem;
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
           
            dispatch(EmployeeFreelanceActions.requestPostEmployeeFreelance(data));
        }
    };

    useEffect(() => {
        if (employeeFreelanceCheckEmailExist.isExist === true) {
            setEmailExist(true);
            setEmailExistValidateMsg(`Email ${employeeFreelanceCheckEmailExist.email} already exist`);
        } else if (employeeFreelanceCheckEmailExist.isExist === false) {
            setEmailExist(false);
            setEmailExistValidateMsg('');
        }
    }, [employeeFreelanceCheckEmailExist])

    useEffect(() => {
        if (employeeFreelanceCheckNIKKTPExist.isExist === true) {
            setNIKKTPExist(true);
            setNIKKTPExistValidateMsg(`NIK KTP ${employeeFreelanceCheckNIKKTPExist.nikktp} already exist`);
        } else if (employeeFreelanceCheckNIKKTPExist.isExist === false) {
            setNIKKTPExist(false);
            setNIKKTPExistValidateMsg('');
        }
    }, [employeeFreelanceCheckNIKKTPExist])

    useEffect(() => {
        if (bRefreshPage) {
            if(resultAction.errorNumber === '666') {
                dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning));
            } else {
                if (resultAction.resultObj.employeeFreelanceGenID !== 0)
                {
                    history.replace(RouteEnum.EmployeeFreelance);
                    dispatch(ToastsAction.add(`Submit Employee Freelance Success`, ToastStatusEnum.Success));
                }
            }
        }
    }, [bRefreshPage]);

    const isRequesting: boolean = useSelector((state: IStore) => 
        selectRequesting(state, [
            EmployeeFreelanceActions.REQUEST_CHECK_EMAIL_EXIST,
            EmployeeFreelanceActions.REQUEST_CHECK_NIKKTP_EXIST
        ])
    );
    
    const handleSearchChangeEmail = useCallback((data) => {
        if (data.includes('@')) {
            const request = new EmployeeFreelanceCheckEmailExistRequest({})
            request.email = data;

            dispatch(EmployeeFreelanceActions.checkEmailExist(request));
        }
    }, [dispatch]);

    const handleSearchChangeNIKKTP = useCallback((data) => {
        if (data.length === 16) {
            const request = new EmployeeFreelanceCheckNIKKTPExistRequest({})
            request.nikktp = data;

            dispatch(EmployeeFreelanceActions.checkNIKKTPExist(request));
        }
    }, [dispatch]);

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
            setDOBValidateMsg("DOB must less than equal than current date");
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

    const compareEffectiveAndExpiredDate = (selectedEffectiveDate: any, selectedExpiredDate: any) => {
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

    return (
        <Fragment>
            {employeeFreelanceMenuAccess.isAllowAccess === true ? (
                <FinalForm 
                    validate={validate}
                    onSubmit={onSubmitHandler}
                    initialValues={initialValues}
                    render={({ handleSubmit, pristine, invalid }) => (
                        <Form
                            onSubmit={handleSubmit}
                            loading={isRequesting}
                        >
                            <Grid>
                                <Grid.Row columns="equal">
                                    <Grid.Column className='FullGrid767 ViewLabel'>
                                        <Field
                                            name="superiorEmail"
                                            component={TextInput}
                                            labelName="Superior Email"
                                            disabled={true}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns="equal">
                                    <Grid.Column width={'16'}>
                                        <label style={{ color: '#A0A8B3' }}>
                                            Photo Profile
                                        </label>
                                        <input 
                                            accept='image/*'
                                            type="file" 
                                            name="photoProfile" 
                                            onChange={onChangePhotoProfile} 
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={'16'} style={{ marginTop: '1rem' }}>
                                        {validationImgPreview.length > 0 && (
                                            <React.Fragment>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                    >
                                                    <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{validationImgPreview}</p>
                                                </div>
                                                <br />
                                            </React.Fragment>
                                        )}
                                        {selectedImage && (
                                            <Image
                                                src={window.URL.createObjectURL(selectedImage)}
                                                style={{ maxWidth: "100% !important", maxHeight: 200}}
                                                alt="Image Profile"
                                            />
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                                
                                <Grid.Row columns="equal">
                                    <Grid.Column className='FullGrid767' width={7}>
                                        <Field
                                            name="nikktp"
                                            component={TextInput}
                                            placeholder="e.g. NIK KTP.."
                                            labelName="NIK KTP"
                                            mandatory={mandatory.sNIKKTP}
                                            onChange={handleSearchChangeNIKKTP}
                                        />
                                        {NIKKTPExist === true ? (
                                            <React.Fragment>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                    >
                                                    <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{NIKKTPExistValidateMsg}</p>
                                                </div>
                                                <br />
                                            </React.Fragment>
                                        ) : ""}
                                    </Grid.Column>
                                    <Grid.Column className='FullGrid767'>
                                        <Field
                                            name="email"
                                            component={TextInput}
                                            placeholder="e.g. email.."
                                            labelName="Email"
                                            mandatory={mandatory.sEmail}
                                            onChange={handleSearchChangeEmail}
                                        />
                                        {emailExist === true ? (
                                            <React.Fragment>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                    >
                                                    <p className="BtmFormNote" style={{color:'red', fontWeight:'bold'}}>{emailExistValidateMsg}</p>
                                                </div>
                                                <br />
                                            </React.Fragment>
                                        ) : ""}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns="equal">
                                    <Grid.Column className='FullGrid767' width={10}>
                                        <Field
                                            name="fullname"
                                            component={TextInput}
                                            placeholder="e.g. fullname.."
                                            labelName="Full Name"
                                            mandatory={mandatory.sFullname}
                                        />
                                    </Grid.Column>
                                    <Grid.Column className='FullGrid767'>
                                        <Field
                                            name="phone"
                                            component={TextInput}
                                            placeholder="e.g. phone.."
                                            labelName="Phone"
                                            mandatory={mandatory.sPhone}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns="equal">
                                    <Grid.Column className='FullGrid767' width={5}>
                                        <Field 
                                            name="dateOfBirth" 
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
                                    <Grid.Column>
                                        <Segment className='LightGreyNotif'>
                                            <Grid>
                                                <Grid.Row columns="equal">
                                                    <Grid.Column className='FullGrid767'>
                                                        <Field 
                                                            name="effectiveDate" 
                                                            component={DateInput} 
                                                            labelName="Effective Date" 
                                                            placeholder="e.g.10/03/2020" 
                                                            date={true} 
                                                            mandatory={mandatory.sEffectiveDate}
                                                            onChange={handleChangeEffectiveDate}
                                                        />
                                                    </Grid.Column>
                                                    <Grid.Column className='FullGrid767'>
                                                        <Field 
                                                            name="expiredDate" 
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
                                <Divider />
                                <Grid.Row columns="equal">
                                    <Grid.Column>
                                        <Button 
                                            floated="right" 
                                            color="blue" 
                                            content="Submit"
                                            disabled={pristine || invalid} 
                                        />
                                        <Button 
                                            floated="right" 
                                            content="Cancel"
                                            onClick={() => {
                                                props.history.replace(RouteEnum.EmployeeFreelance);
                                            }} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    )}
                />
            ) : (<div>User Not Allowed Access</div>)}
            
        </Fragment>
    );
}

export default EmployeeFreelanceForm;
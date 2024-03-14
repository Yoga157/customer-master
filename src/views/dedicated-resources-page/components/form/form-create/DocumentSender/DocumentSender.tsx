import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './DocumentSender.scss'
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import { RadioButton, RichTextEditor, SelectInput } from 'views/components/UI';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import { combineValidators, isRequired } from 'revalidate';
import SubmitApprovalDocumentModel from 'stores/dedicated-resources/models/SubmitApprovalDocumentModel';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectEmployee, selectSenderAdmin } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';

interface IProps {
    contractID?: number;
    setCheckSubmit?: any;
    setDisableComponent?: any;
}

const DocumentSender: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const SenderAdmin = useSelector((state: IStore) => selectSenderAdmin(state));
    const EmployeeAll = useSelector((state: IStore) => selectEmployee(state));
   
    const validate = combineValidators({
        remarks: isRequired('Remarks'),
    });

    const { contractID, setCheckSubmit, setDisableComponent } = props;

    const [typeRadioButton, setTypeRadioButton] = useState("Ready")
    const [userId, setUserId] = useState(0)
 
    
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [
        DedicatedResourcesActions.REQUEST_DROPDOWN_SUPERVISOR,
        DedicatedResourcesActions.REQUEST_EMPLOYEE
    ]));

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };

    useEffect(() => {
        dispatch(DedicatedResourcesActions.requestDropdownSupervisor(currentUser.employeeID))
        dispatch(DedicatedResourcesActions.requestEmployee())
        dispatch(DedicatedResourcesActions.requestDropdownSenderAdmin())
    }, [])

    const onChangeSender = (event: any) => {
        const docTypes = SenderAdmin.filter((item: any) => {
            return item.value === event;
        });
        setUserId(parseInt(docTypes[0] && docTypes[0].value))
    }

    const onChangeEmployeeAll = (event: any) => {
        const docTypes = EmployeeAll.filter((item: any) => {
            return item.value === event;
        });
        setUserId(docTypes[0] && docTypes[0].value)
    }

    const onSubmitHandler = (values: any) => {
        const newValues = new SubmitApprovalDocumentModel();

        newValues.contractID = contractID;
        newValues.userID = userId;
        newValues.remarks = values.remarks;
        newValues.process = "ready";
        newValues.userLoginID = currentUser.employeeID;
        newValues.tanggal = null;

        dispatch(DedicatedResourcesActions.requestpostSubmitApprovalDocument(newValues)).then(() => {
            setCheckSubmit(true)
            setDisableComponent(true)
        })
        onClose()
    };

    return (
        <Fragment>
            <LoadingIndicator  isActive={isRequesting}>
                <div className='TopDocumentSender'>
                    <p>Please Complete Document Sender</p>
                </div>
                <FinalForm
                    validate={validate}
                    onSubmit={(values: any) => onSubmitHandler(values)}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid>
                                <Grid.Row centered columns={2} style={{ top: "10px" }}>
                                    <Grid.Column textAlign='center' mobile={16} tablet={5} computer={5}>
                                        <Field
                                            className="text-primary"
                                            name="typeNumber"
                                            component={RadioButton}
                                            label="Send By Admin"
                                            mandatory={false}
                                            thousandSeparator={true}
                                            checked={typeRadioButton === 'Ready'}
                                            onChange={() => {
                                                setTypeRadioButton('Ready')
                                                // setAlertPress(false)
                                            }}
                                        />
                                    </Grid.Column>
                                    <Grid.Column textAlign='center' mobile={16} tablet={5} computer={5}>
                                        <Field
                                            className="text-primary"
                                            name="typeNumber"
                                            component={RadioButton}
                                            label="Send By Others"
                                            mandatory={false}
                                            thousandSeparator={true}
                                            checked={typeRadioButton === 'Sent'}
                                            onChange={() => {
                                                setTypeRadioButton('Sent')
                                                // setAlertPress(false)
                                            }}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                {
                                    typeRadioButton === "Ready" ? 
                                    <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column width={16}>
                                        <Field
                                            name="userID"
                                            onChanged={onChangeSender}
                                            options={SenderAdmin}
                                            mandatory={false}
                                            component={SelectInput}
                                            labelName="Sender"
                                            placeholder="e.g.Renewal" />
                                    </Grid.Column>
                                </Grid.Row>
                                :
                                <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column width={16}>
                                        <Field
                                            name="userID"
                                            onChanged={onChangeEmployeeAll}
                                            options={EmployeeAll}
                                            mandatory={false}
                                            component={SelectInput}
                                            labelName="Sender"
                                            placeholder="e.g.Renewal" />
                                    </Grid.Column>
                                </Grid.Row>
                                }
                                
                                <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column width={16}>
                                        <Field name="remarks" component={RichTextEditor} placeholder="Please put remark or other notes" mandatorys={false} labelName="Remaks" />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid || !typeRadioButton || !userId} />

                                        <Button type="button" floated="right" content="Cancel" onClick={onClose} />
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

export default DocumentSender;

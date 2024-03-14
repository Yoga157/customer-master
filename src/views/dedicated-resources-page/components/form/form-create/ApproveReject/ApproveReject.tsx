import React, { Fragment, useState } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './ApproveReject.scss'
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import { RadioButton, RichTextEditor } from 'views/components/UI';
import SubmitApprovalModel from 'stores/dedicated-resources/models/SubmitApprovalModel';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import { combineValidators, isRequired } from 'revalidate';

interface IProps {
    contractID?: number;
}

const ApproveReject: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

    const validate = combineValidators({
        notes: isRequired('Remarks'),
    });

    const { contractID } = props;

    const [typeRadioButton, setTypeRadioButton] = useState("APPROVED")

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };
   
    const onSubmitHandler = (values: any) => {
        const newValues = new SubmitApprovalModel();

        newValues.contractID = contractID;
        newValues.userLoginID = currentUser.employeeID;
        newValues.notes = values.notes;
        newValues.process = typeRadioButton

        dispatch(DedicatedResourcesActions.requestpostSubmitApproval(newValues))
        onClose()
    };

    return (
        <Fragment>
            <div className='TopApproveReject'>
                <p>Approve or Reject Extend Contract</p>
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
                                        label="Approve"
                                        mandatory={false}
                                        thousandSeparator={true}
                                        checked={typeRadioButton === 'APPROVED'}
                                        onChange={() => {
                                            setTypeRadioButton('APPROVED')
                                            // setAlertPress(false)
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column textAlign='center' mobile={16} tablet={5} computer={5}>
                                    <Field
                                        className="text-primary"
                                        name="typeNumber"
                                        component={RadioButton}
                                        label="Reject"
                                        mandatory={false}
                                        thousandSeparator={true}
                                        checked={typeRadioButton === 'REJECTED'}
                                        onChange={() => {
                                            setTypeRadioButton('REJECTED')
                                            // setAlertPress(false)
                                        }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ top: "20px" }}>
                                <Grid.Column width={16}>
                                    <Field name="notes" component={RichTextEditor} placeholder="Please put remark or other notes" mandatorys={false} labelName="Remaks" />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    {/*  */}
                                    <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid || !typeRadioButton} />

                                    <Button type="button" floated="right" content="Cancel" onClick={onClose} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                )}
            />
        </Fragment>
    );
};

export default ApproveReject;

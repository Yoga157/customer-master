import React, { Fragment, useState } from 'react';
import { Grid, Form, Button, Card, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './Terminate.scss'
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import { RadioButton, RichTextEditor } from 'views/components/UI';
import TerminateTable from './Table/TerminateTable';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import TerminateContractModel from 'stores/dedicated-resources/models/TerminateContractModel';
import { combineValidators, isRequired } from 'revalidate';

interface IProps {
    contractID: number
}

const Terminate: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const { contractID } = props;

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };
    const [checkbox, setCheckbox] = useState(true)
    const onSubmitHandler = (values: any) => {

        const newValues = new TerminateContractModel()

        newValues.contractID = contractID;
        newValues.flagPaklaring = checkbox;
        newValues.reasonPaklaring = values.reasonPaklaring;
        newValues.remark = values.remark;
        newValues.userLoginID = currentUser.employeeID
        
        dispatch(DedicatedResourcesActions.RequestTerminateContract(newValues))
        onClose()
    };

    const validate = combineValidators({
        reasonPaklaring: isRequired('Paklaring'),
        remark: isRequired('Remark'),
      });
    
    return (
        <Fragment>
            {/* <Grid.Column className='TopApproveReject' textAlign='center'>
            <p>Approve or Reject Extend Contract</p>
        </Grid.Column> */}
            {/* <Card.Header className='TopApproveReject'>Approve or Reject Extend Contract</Card.Header> */}
 
            <Card.Header>Terminate of Employee Contract</Card.Header>
            <Divider></Divider>

            <FinalForm
                validate={validate}
                onSubmit={(values: any) => onSubmitHandler(values)}
                render={({ handleSubmit, invalid, pristine }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid>
                            <Grid.Column style={{ top: "20px" }} textAlign='center' width={16}>
                                <p style={{ fontWeight: 600, fontSize: "15px", }}>Are You Sure To Terminate Bellow Employee?</p>
                            </Grid.Column>

                            <Grid.Column style={{ top: "20px" }} width={16}>
                                <TerminateTable />
                            </Grid.Column>

                            <Grid.Row columns={2} style={{ top: "20px" }}>
                                <Grid.Column>
                                    <span style={{ color: "#A0A8B3 !important", fontWeight: 600, opacity: 0.4 }}>Paklaring Process*</span>
                                    <Grid style={{marginTop: 0}}>
                                        <Grid.Row columns={2}>
                                            <Grid.Column>
                                                <Field
                                                    className="text-primary customeRadio"
                                                    name="flagPaklaring"
                                                    component={RadioButton}
                                                    label={"Yes"}
                                                    mandatory={false}
                                                    thousandSeparator={true}
                                                    checked={checkbox === true}
                                                    onChange={() => setCheckbox(true)}
                                                />

                                            </Grid.Column>
                                            <Grid.Column>
                                                <Field
                                                    className="text-primary customeRadio"
                                                    name="flagPaklaring"
                                                    component={RadioButton}
                                                    label={"No"}
                                                    mandatory={false}
                                                    thousandSeparator={true}
                                                    checked={checkbox === false}
                                                    onChange={() => setCheckbox(false)}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <Field name="reasonPaklaring" component={RichTextEditor} placeholder="Please reasonPaklaring" mandatorys={false} labelName="Reason" />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                    <Field name="remark" component={RichTextEditor} placeholder="Please put remark or other notes" mandatorys={false} labelName="Remaks" />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column style={{ backgroundColor: "#FFD2D2" }}>
                                    <span style={{ color: 'red', fontWeight: 600 }}>Warning!!</span>
                                    <br />
                                    <span style={{ color: 'red' }}>After terminate contract of employee,you can not chage the status of employee</span>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid} />

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

export default Terminate;

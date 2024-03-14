import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Form, Button, Divider, Card } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import './VerificationCheck.scss'
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Form as FinalForm, Field } from 'react-final-form';
import VerificationCheckTable from './Table/VerificationCheckTable';
import { selectEmployeeInfo, selectVerificationDataStatus } from 'selectors/dedicated-resources/DedicatedResourcesServiceSelector';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
    contractID: number;
}

const VerificationCheck: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { contractID } = props;
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const EmployeeInfo = useSelector((state: IStore) => selectEmployeeInfo(state))
    const VerificationStatus = useSelector((state: IStore) => selectVerificationDataStatus(state))

    const onClose = () => {
        dispatch(ModalAction.CLOSE());
    };

    useEffect(() => {
        dispatch(DedicatedResourcesActions.requestVerificationDataStatus(contractID, parseInt(EmployeeInfo.contractStatus)))
    }, [])

    const onSubmitHandler = (values: any) => {

    };
    const [typeRadioButton, setTypeRadioButton] = useState("Approve")

    const isRequesting: boolean = useSelector((state: IStore) =>
        selectRequesting(state, [
            DedicatedResourcesActions.REQUEST_VERIFICATION_DATA_STATUS,
        ])
    );

    return (
        <Fragment>
            <Card.Header>Verification Check</Card.Header>
            <Divider></Divider>
            <LoadingIndicator isActive={isRequesting}>
                <FinalForm
                    onSubmit={(values: any) => onSubmitHandler(values)}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid>

                                <Grid.Row>
                                    <Grid.Column style={{ top: "20px", padding: 0 }} width={16}>
                                        <VerificationCheckTable tableData={VerificationStatus} />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column style={{ backgroundColor: "#FFD2D2" }}>
                                        <span style={{ color: 'red', fontWeight: 600 }}>Warning!!</span>
                                        <br />
                                        <span style={{ color: 'red' }}>Please return to renewal form and complete data required</span>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ top: "20px" }}>
                                    <Grid.Column width={16}>
                                        {/* <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid } /> */}

                                        <Button type="button" floated="right" content="Close" onClick={onClose} />
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

export default VerificationCheck;

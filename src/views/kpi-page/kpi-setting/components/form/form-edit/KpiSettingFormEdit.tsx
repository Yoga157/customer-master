import React, { Fragment, useCallback, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { History } from "history";
import { selectUserResult } from "selectors/user/UserSelector";
import { RouteComponentProps, withRouter } from "react-router";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";
import { Card } from 'semantic-ui-react';
import classes from '../KpiCard.module.scss';
import { Form as FinalForm, Field} from 'react-final-form';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { NumberInput, SelectInput, TextInput, Tooltips, Button } from 'views/components/UI';
import EmployeeHierarchyEdit from "./child-edit/components/EmployeeHierarchyEdit";

interface RouteParams {
    id: string
};

interface IProps extends RouteComponentProps<RouteParams> {
    history: History
};

const KpiSettingFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    console.log("KpiSettingFormEdit: props", props);

    useEffect(() => {
        if (+props.match.params.id > 0)
        {
            dispatch(KpiSettingActions.requestKpiSettingById(+props.match.params.id));
        }
    }, [dispatch, props.match.params.id]);

    const onSubmitHandler = (values: any) =>
    {

    }

    const onHeaderSubmitHandler = (e:Event) => {
        // dispatch(FunnelActions.requestVerificationFunnel(+funnelGenID, viewFunnelStatus.funnelStatusID));
        // if(disableComponent)
        // {
        //     setDisableComponent(false);
        // }
    }

    return (
        <Fragment>
            {/* KpiSetting Form Edit */}
            <Card centered raised className={(props.match.params.id) ? classes.CardEdit :classes.Card} >
                <Card.Content>
                    <Card.Header>{(props.match.params.id) ? 'View Edit Funnel' : 'Add New Funnel'}</Card.Header>
                </Card.Content>
                <Card.Content>
                <FinalForm 
                onSubmit={(values: any) => onSubmitHandler(values)}
                // validate={validate}
                render={
                    ({
                        handleSubmit,
                        invalid,
                        pristine
                    }) => (
                        <Form onSubmit={handleSubmit} >
                            <Segment className="LightGreyNotif">
                                <Tooltips 
                                    content='Edit Funnel Status Details'
                                    trigger={
                                        <Button 
                                            basic 
                                            type='button' 
                                            compact 
                                            icon="edit" 
                                        onClick={(e:Event) => onHeaderSubmitHandler(e)} />
                                    }
                                />
                                <Tooltips 
                                    content='Cancel Update'
                                    trigger={
                                            <Button 
                                                type='button' 
                                                basic 
                                                compact 
                                                icon="cancel" 
                                                // onClick={onCancel} 
                                            />
                                            } 
                                />
                                <Tooltips 
                                    content='Save Update'
                                    trigger={
                                        <Button 
                                                basic 
                                                compact 
                                                icon="save"
                                                // disabled={VerificationTableData.status == "True" ? false : true} 
                                            />
                                        }
                                />
                                <Grid>
                                    <Grid.Row columns="equal">
                                        <Grid.Column>
                                            <Field 
                                                name='status'
                                                labelName='Status'
                                                component={SelectInput}
                                                placeholder='Active'
                                                // options={kpiStatusOptions}
                                                // onChanged={onChangeStatus}
                                                // mandatory={mandatoryInput.sKpiStatus}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row columns="equal" >
                                        <Grid.Column>
                                            <Field 
                                                name='kpiDireksi'
                                                labelName='KPI Direksi'
                                                component={SelectInput}
                                                placeholder="Collection Overdue"
                                                // options={kpiDireksiOptions}
                                                // onChanged={onChangeDireksi}
                                                // mandatory={mandatoryInput.sKpiDireksi}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Field 
                                                name='keyActivity'
                                                labelName='Key Activity'
                                                component={TextInput}
                                                // onChange={onChangeKeyActivity}
                                                // mandatory={mandatoryInput.sKeyActivity}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns='equal'>  
                                        <Grid.Column width={6}>
                                            <Field 
                                                name='measurement'
                                                labelName='Measurement'
                                                component={SelectInput}
                                                placeholder="Quarterly"
                                                // onChanged={onChangeMeasurement}
                                                // options={kpiMeasurementOptions}
                                                // mandatory={mandatoryInput.sMeasurement}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <Field 
                                                name='weight'
                                                labelName='Weight'
                                                component={NumberInput}
                                                placeholder='1'
                                                // onChange={onChangeWeight}
                                                // mandatory={mandatoryInput.sWeight}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <Field 
                                                name='point'
                                                labelName='Point'
                                                component={NumberInput}
                                                placeholder='0.5'
                                                // onChange={onChangePoint}
                                                // mandatory={mandatoryInput.sPoint}
                                                
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            
                            <Grid className='mt-2r'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <EmployeeHierarchyEdit kpiSettingID={props.match.params.id} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            {/* <Segment className="LightGreyNotif">
                                <Grid>
                                    <Grid.Row>
                                        <Grid className="pad-1rem">
                                            <Field
                                                name='database1'
                                                component={HierarcyEmpSearch}
                                                handleSearchDivision={handleSearchDivision}
                                                handleSearchDepartment={handleSearchDepartment}
                                                handleSearchDepartmentByDivisionId={handleSearchDepartmentByDivisionId}
                                                handleSearchFunction={handleSearchFunction}
                                                resultDivision={divisionList}
                                                resultDepartment={departmentList}
                                                resultFunction={functionList}
                                            />
                                        </Grid>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            <EmployeeLists />
                            <Divider />
                            <ConditionLists/>
                            <Divider />
                            <Grid>
                                <Grid.Row columns='equal' textAlign="center">
                                    <Grid.Column>
                                        <Button 
                                            floated="right"
                                            content='Cancel'
                                            type='button'
                                            onClick={onCloseHandler}
                                        />
                                        <Button 
                                            floated="right"
                                            color='blue'
                                            content='Submit'
                                            disabled={pristine || invalid}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid> */}
                        </Form>
                    )
                }
            />
                </Card.Content>
            </Card>
        </Fragment>
    )
};

export default withRouter(KpiSettingFormEdit);


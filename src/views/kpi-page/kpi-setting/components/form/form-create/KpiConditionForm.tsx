import React, { Fragment, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Card, Divider, Form, Grid, Header } from 'semantic-ui-react';
import { Button, TextAreaInput, TextInput } from 'views/components/UI';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { RouteComponentProps } from 'react-router';
import IStore from 'models/IStore';
import { combineValidators, isRequired } from 'revalidate';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import TableRowModel from 'stores/kpi/kpi-condition/models/TableRowModel';
import { format, endOfDay } from 'date-fns';
// import * as KpiConditionService from "stores/kpi/kpi-condition/KpiConditionAction";
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

// interface ConditionParams {
//     description: string,
//     point: string
// }

// interface ConditionFormProps {
//     onAddListItemCondition(values: any): void;
// }

interface IProps {
    kpiSettingID: string,
    kpiSettingItemsID: string,
    type: string,
};

const KpiConditionForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [point, setPoint] = useState('');
    const [action, setAction] = useState('');
    const [mandatoryInput, setMandatoryInput] = useState({
        sDescription: true,
        sPoint: true,
        sAction: true,
    });
    const bRefreshPage:boolean = useSelector((state: IStore) => state.kpiSetting.refreshPage);
    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));
    let isRequesting: boolean = false;

    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
    };

    const onSubmitHandler = async (values: any) => {
        const { description, point } = values;
        
        let userId: any = localStorage.getItem("userLogin");
        var date = format(new Date(), 'yyyy-MM-dd');

        let data = new TableRowModel({});
        data.description = description;
        data.point = point;
        data.createDate = date;
        data.createUserID = JSON.parse(userId).employeeID;
        data.modifyDate = date;
        data.modifyUserID = JSON.parse(userId).employeeID;
        
        dispatch(KpiSettingActions.postKpiConditionLocal(data)).then(() => {
            dispatch(ModalAction.CLOSE())
            dispatch(KpiSettingActions.getKpiConditionByIdLocal())    
        });
    };

    const validate = combineValidators({
        description: isRequired('Description'),
        point: isRequired('point')
    });

    const onDescription = (event: any) => {
        setDescription(event);
    };

    const onPoint = (event: any) => {
        setPoint(event);
    };

    const onAction = (event: any) => {
        setAction(event);
    };

    return (
        <Fragment>
            <Card.Header>{props.type} Condition</Card.Header>
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
                            <Form 
                                onSubmit={handleSubmit}
                            >
                                <Grid>
                                    <Grid.Row columns='equal'>
                                        <Grid.Column>
                                            <Field 
                                                name='description'
                                                component={TextInput}
                                                labelName="Description"
                                                placeholder='e.g. Description ..'
                                                value={description}
                                                mandatory={mandatoryInput.sDescription}
                                                onChange={onDescription}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns='equal'>
                                        <Grid.Column>
                                            <Field 
                                                name='point'
                                                component={TextInput}
                                                labelName="Point"
                                                placeholder='e.g. Point ..'
                                                value={point}
                                                mandatory={mandatoryInput.sPoint}
                                                onChange={onPoint}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <br/>
                                <Button className='MarBot20' floated='right' type='submit' color='blue' disabled={pristine || invalid} >Save</Button>
                                <Button floated='right' type='button' onClick={cancelClick} >Cancel</Button>
                            </Form>
                        )
                    }
                >
                </FinalForm>
            </LoadingIndicator>
        </Fragment>
    );
};

export default KpiConditionForm;
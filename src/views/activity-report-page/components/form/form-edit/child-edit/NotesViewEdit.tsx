import React, { useState, useEffect, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Grid, Form, Header, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import IStore from 'models/IStore';
import { Button, Tooltips, RichTextEditor } from 'views/components/UI';
import styles from './NotesViewEdit.module.scss';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectViewNotes } from 'selectors/activity-report/ActivityReportSelector';
import * as ActivityReportNotesActions from 'stores/activity-report-notes/ActivityReportNotesActions';
import { ActivityReportViewEditNotes } from 'stores/activity-report/models/view-edit';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';


interface IProps {
    activityReportGenID: string;
}

const NotesViewEdit: React.FC<IProps> = ({ activityReportGenID }) => {
    const dispatch: Dispatch = useDispatch();
    const [disableComponent, setDisableComponent] = useState(true);    

    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const viewActivityReportNotes = useSelector((state: IStore) => selectViewNotes(state));
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ActivityReportNotesActions.REQUEST_VIEW_NOTES]));

    const bRefreshPage: boolean = useSelector((state: IStore) => state.activityReportNotes.refreshPage);
    const resultAction = useSelector((state: IStore) => state.activityReportNotes.resultActions);

    const [mandatory, setMandatory] = useState({
        sNoteDescription: false,
        sNoteActionTaken: false,
    });

    useEffect(() => {
        if (activityReportGenID.length > 0) {
            dispatch(ActivityReportNotesActions.requestViewNotesById(+activityReportGenID, +currentUser.employeeID));
        }
    }, [dispatch, activityReportGenID]);

    const onEditHandler = (e: Event) => {
        if (disableComponent) {
          setDisableComponent(false);
        }
    };

    const onCancelHandler = () => {
        if (!disableComponent) {
            dispatch(ActivityReportNotesActions.requestViewNotesById(+activityReportGenID, +currentUser.employeeID));
            setDisableComponent(true);
        }
    };

    const onSubmitHandler = (values: any) => {
        const updateItem = new ActivityReportViewEditNotes({});
        updateItem.activityReportGenID = +activityReportGenID;
        updateItem.description = values.description;
        updateItem.symptom = values.symptom;
        updateItem.actionTaken = values.actionTaken;
        updateItem.modifyUserID = Number(currentUser.employeeID);
        
        let isValidSubmit = true;
        if (updateItem.description.replace(/<\/?[^>]+(>|$)/g, "").length < 15) {
            isValidSubmit = false;
            dispatch(ToastsAction.add(`Description minimal 15 characters`, ToastStatusEnum.Warning));
        }

        if (updateItem.actionTaken.replace(/<\/?[^>]+(>|$)/g, "").length < 15) {
            isValidSubmit = false;
            dispatch(ToastsAction.add(`Action Taken minimal 15 characters`, ToastStatusEnum.Warning));
        }

        if (isValidSubmit) {
            dispatch(ActivityReportNotesActions.putViewNotes(updateItem));
        }        
        
        if (!isRequesting) {
            if (!disableComponent) {
                setDisableComponent(true);
            }
        }

        if (isValidSubmit === false) {
            setDisableComponent(false);
        }
    };

    const validate = combineValidators({
        description: isRequired('Description/Error Message'),
        actionTaken: isRequired('Action Taken'),
    });
    
    if (bRefreshPage) {
        if (resultAction.errorNumber === '666') {
            dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning))
        } else {
            if (resultAction.bSuccess === true) {
                // dispatch(ToastsAction.add(`Update Notes Success`, ToastStatusEnum.Success));
                dispatch(ActivityReportNotesActions.requestViewNotesById(+activityReportGenID, +currentUser.employeeID));
            }
        }
    }

    const [countCharacterDescription, setCountCharacterDescription] = useState(0);
    const [noteDescription, setNoteDescription] = useState('');
    const onChangeDescription = (e: any) => {
        setNoteDescription(e.level.content.replace(/<\/?[^>]+(>|$)/g, ""));
        setCountCharacterDescription(e.level.content.replace(/<\/?[^>]+(>|$)/g, "").length);
    };
    const onKeyDescription = (e: any) => {
        setNoteDescription(e.target.textContent)
        setCountCharacterDescription(e.target.textContent.length);
    };

    const [countCharacterActionTaken, setCountCharacterActionTaken] = useState(0);
    const [noteActionTaken, setNoteActionTaken] = useState('');
    const onChangeActionTaken = (e: any) => {
        setNoteActionTaken(e.level.content.replace(/<\/?[^>]+(>|$)/g, ""));
        setCountCharacterActionTaken(e.level.content.replace(/<\/?[^>]+(>|$)/g, "").length);
    };
    const onKeyActionTaken = (e: any) => {
        setNoteActionTaken(e.target.textContent);
        setCountCharacterActionTaken(e.target.textContent.length);
    };

    return (
        <Fragment>
            {viewActivityReportNotes.isAllowAccess ? (
                <Segment className="LightGreyNotif">
                    <FinalForm 
                        onSubmit={(values: any) => onSubmitHandler(values)}
                        validate={validate}
                        initialValues={viewActivityReportNotes}
                        key={4}
                        render={({ handleSubmit, invalid }) => (
                            <Form 
                                key={4} 
                                onSubmit={handleSubmit} 
                                loading={isRequesting}
                            >
                                <Grid>
                                    <Grid.Row columns="equal">
                                        <Grid.Column>
                                            <Header>
                                                {viewActivityReportNotes.isAllowEdit && (
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
                                    
                                    <Grid.Row columns="equal" className='pt-0'>
                                        <Grid.Column width={8} className="ViewLabel">
                                            <Field
                                                name="description" 
                                                component={RichTextEditor} 
                                                placeholder="" 
                                                labelName="Description/Error Message" 
                                                disabled={disableComponent}
                                                mandatorys={mandatory.sNoteDescription}
                                                onChange={(e) => onChangeDescription(e)}
                                                onKeyDown={(e) => onKeyDescription(e)}
                                                onKeyUp={(e) => onKeyDescription(e)}
                                            />
                                            <React.Fragment>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                    >
                                                    {noteDescription !== '' && countCharacterDescription < 15 
                                                        ? <p className="BtmFormNote" style={{color: 'red', fontWeight:'bold'}}>Minimal must 15 characters</p> 
                                                        : <p></p>}
                                                    <p className="BtmFormNote" style={{fontWeight:'bold'}}>{`Current characters: ${countCharacterDescription}`}</p>
                                                </div>
                                                <br />
                                            </React.Fragment>
                                        </Grid.Column>
                                        
                                        <Grid.Column width={8} className="ViewLabel">
                                            <Field
                                                name="symptom" 
                                                component={RichTextEditor} 
                                                placeholder="" 
                                                labelName="Symptom/Error Possibility" 
                                                disabled={true}
                                                mandatory={false}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row columns="equal" className='pt-0'>
                                        <Grid.Column width={16} className="ViewLabel">
                                            <Field
                                                name="actionTaken" 
                                                component={RichTextEditor} 
                                                placeholder="" 
                                                labelName="Action Taken" 
                                                disabled={disableComponent}
                                                mandatorys={mandatory.sNoteActionTaken}
                                                onChange={(e) => onChangeActionTaken(e)}
                                                onKeyDown={(e) => onKeyActionTaken(e)}
                                                onKeyUp={(e) => onKeyActionTaken(e)}
                                            />
                                            <React.Fragment>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                    >
                                                    {noteActionTaken !== '' && countCharacterActionTaken < 15 
                                                        ? <p className="BtmFormNote" style={{color: 'red', fontWeight:'bold'}}>Minimal must 15 characters</p> 
                                                        : <p></p>}
                                                    <p className="BtmFormNote" style={{fontWeight:'bold'}}>{`Current characters: ${countCharacterActionTaken}`}</p>
                                                </div>
                                                <br />
                                            </React.Fragment>
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

export default NotesViewEdit;
import React, { useState, useEffect, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { combineValidators } from 'revalidate';
import { Grid, Form, Header, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import moment from 'moment';

import { Button, Tooltips, RichTextEditor } from 'views/components/UI';
import styles from './SuperiorReviewViewEdit.module.scss';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ActivityReportSuperiorReviewActions from 'stores/activity-report-superior-review/ActivityReportSuperiorReviewActions';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectViewSuperiorReview } from 'selectors/activity-report/ActivityReportSelector';
import { ActivityReportViewEditSuperiorReview } from 'stores/activity-report/models/view-edit';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
    activityReportGenID: string;
}

const SuperiorReviewViewEdit: React.FC<IProps> = ({ activityReportGenID }) => {
    const dispatch: Dispatch = useDispatch();
    const [disableComponent, setDisableComponent] = useState(true);
    const [superiorName, setSuperiorName] = useState('');
    const [department, setDepartment] = useState('');
    const [reviewDate, setReviewDate] = useState('');

    const viewActivityReportSuperiorReview = useSelector((state: IStore) => selectViewSuperiorReview(state));
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ActivityReportSuperiorReviewActions.REQUEST_VIEW_SUPERIOR_REVIEW]));
    
    const bRefreshPage: boolean = useSelector((state: IStore) => state.activityReportSuperiorReview.refreshPage);
    const resultAction = useSelector((state: IStore) => state.activityReportSuperiorReview.resultActions);
    
    useEffect(() => {
        dispatch(ActivityReportSuperiorReviewActions
            .requestViewSuperiorReviewById(+activityReportGenID, +currentUser.employeeID));
    }, []);

    useEffect(() => {
        if (activityReportGenID.length > 0) {
            dispatch(ActivityReportSuperiorReviewActions
                .requestViewSuperiorReviewById(+activityReportGenID, +currentUser.employeeID));
        }
    }, [dispatch, activityReportGenID]);

    useEffect(() => {
        setSuperiorName(viewActivityReportSuperiorReview.superiorName === '' ? '-' : viewActivityReportSuperiorReview.superiorName);
        setReviewDate(viewActivityReportSuperiorReview.reviewDate === undefined ? 
            '-' : 
            `${moment(viewActivityReportSuperiorReview.reviewDate).format('DD MMMM yyyy')} ${moment(viewActivityReportSuperiorReview.reviewDate).format('HH:mm')}`);

        setDepartment(viewActivityReportSuperiorReview.department === '' ? '-' : viewActivityReportSuperiorReview.department);
    }, [viewActivityReportSuperiorReview]);

    const onEditHandler = (e: Event) => {
        if (disableComponent) {
          setDisableComponent(false);
        }
    };

    const onCancelHandler = () => {
        if (!disableComponent) {
            dispatch(ActivityReportSuperiorReviewActions
                .requestViewSuperiorReviewById(+activityReportGenID, +currentUser.employeeID));
            setDisableComponent(true);
        }
    };

    const onSubmitHandler = (values: any) => {
        const updateItem = new ActivityReportViewEditSuperiorReview({});
        updateItem.activityReportGenID = +activityReportGenID;
        updateItem.superiorID = Number(currentUser.employeeID);
        updateItem.superiorName = currentUser.fullName;
        updateItem.reviewNotes = values.reviewNotes;
        updateItem.modifyUserID = Number(currentUser.employeeID);
        
        dispatch(ActivityReportSuperiorReviewActions.putViewSuperiorReview(updateItem));
        
        if (!isRequesting) {
            if (!disableComponent) {
                setDisableComponent(true);
            }
        }
    };

    const validate = combineValidators({});

    if (bRefreshPage) {
        if (resultAction.errorNumber === '666') {
            dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning))
        } else {
            if (resultAction.bSuccess === true) {
                dispatch(ActivityReportSuperiorReviewActions
                    .requestViewSuperiorReviewById(+activityReportGenID, +currentUser.employeeID));
            }
        }
    }

    return (
        <Fragment>
            {viewActivityReportSuperiorReview.isAllowAccess ? (
                <Segment className="LightGreyNotif">
                    <Grid>
                        <Grid.Row columns="equal">
                            <Grid.Column width={16} className="ViewLabel">
                                <FinalForm 
                                    onSubmit={(values: any) => onSubmitHandler(values)}
                                    validate={validate}
                                    initialValues={viewActivityReportSuperiorReview}
                                    key={1}
                                    render={({ handleSubmit }) => (
                                        <Form 
                                            key={1} 
                                            onSubmit={handleSubmit} 
                                            loading={isRequesting}
                                        >
                                            <Grid>
                                                <Grid.Row columns="equal">
                                                    <Grid.Column>
                                                        <Header>
                                                            <Header.Content>Superior Review</Header.Content>
                                                            {viewActivityReportSuperiorReview.isAllowReview && (
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
                                                                            <Tooltips content="Save Update" trigger={<Button basic compact icon="save" floated="right" />} />
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
                                                    <Grid.Column width={16} className="ViewLabel">
                                                        <Field
                                                            name="reviewNotes" 
                                                            component={RichTextEditor} 
                                                            disabled={disableComponent}
                                                            mandatory={false}
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Form>
                                    )}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal">
                            <Grid.Column width={16} className="ViewLabel">
                                <Segment className='WhiteNotes'>
                                    <table className={styles.fontTable}>
                                        <tbody>
                                            <tr>
                                                <td>Name </td>
                                                <td>: </td>
                                                <td>{superiorName}</td>
                                            </tr>
                                            <tr>
                                                <td>Department </td>
                                                <td>: </td>
                                                <td>{department}</td>
                                            </tr>
                                            <tr>
                                                <td>Date </td>
                                                <td>: </td>
                                                <td>{reviewDate}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>    
                </Segment>
            ) : (<div></div>)}
                
            
        </Fragment>
    );
};

export default SuperiorReviewViewEdit;
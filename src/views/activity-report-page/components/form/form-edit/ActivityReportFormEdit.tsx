import React, { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Grid, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import TicketViewEdit from './child-edit/TicketViewEdit';
import CustomerSignatureView from './child-edit/CustomerSignatureView';
import TotalCustomerExperienceViewEdit from './child-edit/TotalCustomerExperienceViewEdit';
import SuperiorReviewViewEdit from './child-edit/SuperiorReviewViewEdit';
import NotesViewEdit from './child-edit/NotesViewEdit';
import ProductViewEdit from './child-edit/ProductViewEdit';
import ActivityViewEdit from './child-edit/ActivityViewEdit';
import './ActivityReportFormEdit.scss';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectActivityReportCheckAllowEdit } from 'selectors/activity-report/ActivityReportSelector';
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import RouteEnum from 'constants/RouteEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const ActivityReportFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
 
    useEffect(() => {
        if (+props.match.params.id !== 0)
            dispatch(ActivityReportActions.checkAllowEdit(+props.match.params.id, +currentUser.employeeID));
    }, []);

    return (
       <Fragment>
           <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    
                    <Grid.Column width={12}>
                        <Grid stackable columns={2}>
                            <Grid.Row>
                                <Grid.Column width={8}>                        
                                   <TicketViewEdit activityReportGenID={props.match.params.id} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <ActivityViewEdit activityReportGenID={props.match.params.id} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid className="mt-2r">
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <ProductViewEdit activityReportGenID={props.match.params.id} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid className="mt-2r">
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <NotesViewEdit activityReportGenID={props.match.params.id} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid className="mt-2r">
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <TotalCustomerExperienceViewEdit activityReportGenID={props.match.params.id} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid stackable columns={2}>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <CustomerSignatureView activityReportGenID={props.match.params.id} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <SuperiorReviewViewEdit activityReportGenID={props.match.params.id} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    
                    <Grid.Column width={2}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
       </Fragment>
        
    );
};

export default withRouter(ActivityReportFormEdit);

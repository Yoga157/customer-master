import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Radio, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import styles from './TotalCustomerExperienceViewEdit.module.scss';
import IStore from 'models/IStore';
import { selectViewTotalCustomerExperience } from 'selectors/activity-report/ActivityReportSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ActivityReportTotalCustomerExperienceActions from 'stores/activity-report-total-customer-experience/ActivityReportTotalCustomerExperienceActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
    activityReportGenID: string;
}

const TotalCustomerExperienceViewEdit: React.FC<IProps> = ({ activityReportGenID }) => {    
    const dispatch: Dispatch = useDispatch();

    const [disableComponent, setDisableComponent] = useState(true);
    const [totalCustomerExperience, setTotalCustomerExperience] = useState('');
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const viewTotalCustomerExperience = useSelector((state: IStore) => selectViewTotalCustomerExperience(state));
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ActivityReportTotalCustomerExperienceActions.REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE]));
  
    useEffect(() => {
        if (activityReportGenID.length > 0) {
            dispatch(ActivityReportTotalCustomerExperienceActions
                .requestViewTotalCustomerExperienceById(+activityReportGenID, +currentUser.employeeID));
        }
    }, [dispatch, activityReportGenID]);

    useEffect(() => {
        setTotalCustomerExperience(viewTotalCustomerExperience.totalCustomerExperience);
    }, [dispatch, viewTotalCustomerExperience]);

    return (
        <Fragment>
            {viewTotalCustomerExperience.isAllowAccess ? (
                <LoadingIndicator isActive={isRequesting}>
                    <Segment className="LightGreyNotif">
                        <Grid>
                            <Grid.Row columns="equal">
                                <Grid.Column>
                                    <Header>
                                        <Header.Content>Total Customer Experience</Header.Content>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row columns="equal" className='pt-0'>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="1"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '1'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="2"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '2'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="3"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '3'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="4"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '4'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="5"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '5'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="6"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '6'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="7"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '7'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="8"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '8'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="9"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '9'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={1} className="ViewLabel">
                                    <Radio 
                                        name='totalCustomerExperience'
                                        label="10"
                                        disabled={disableComponent}
                                        checked={totalCustomerExperience === '10'}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </LoadingIndicator>
            ) : (
                <div></div>
            )}
        </Fragment>
    );
};

export default TotalCustomerExperienceViewEdit;
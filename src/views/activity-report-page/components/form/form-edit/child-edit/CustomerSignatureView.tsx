import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import moment from 'moment';

import styles from './CustomerSignatureView.module.scss';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ActivityReportCustomerSignatureActions from 'stores/activity-report-customer-signature/ActivityReportCustomerSignatureActions';
import { selectViewCustomerSignature } from 'selectors/activity-report/ActivityReportSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
    activityReportGenID: string;
}

const CustomerSignatureView: React.FC<IProps> = ({ activityReportGenID }) => {
    const dispatch: Dispatch = useDispatch();
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ActivityReportCustomerSignatureActions.REQUEST_VIEW_CUSTOMER_SIGNATURE]));
    const viewCustomerSignature = useSelector((state: IStore) => selectViewCustomerSignature(state));
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

    const [customerSignName, setCustomerSignName] = useState('');
    const [customerSignImage, setCustomerSignImage] = useState('');
    const [customerSignDate, setCustomerSignDate] = useState(''); 

    useEffect(() => {
        dispatch(ActivityReportCustomerSignatureActions
            .requestViewCustomerSignatureById(+activityReportGenID, +currentUser.employeeID));
    }, []);

    useEffect(() => {
        if (activityReportGenID.length > 0) {
            dispatch(ActivityReportCustomerSignatureActions
                .requestViewCustomerSignatureById(+activityReportGenID, +currentUser.employeeID));
        }
    }, [dispatch, activityReportGenID]);

    useEffect(() => {
        setCustomerSignName(viewCustomerSignature.customerSignName === '' ? '-' : viewCustomerSignature.customerSignName);
        setCustomerSignDate(viewCustomerSignature.dCustomerSignDate === undefined ? 
            '-' : 
            `${moment(viewCustomerSignature.dCustomerSignDate).format('DD MMMM yyyy')} ${moment(viewCustomerSignature.dCustomerSignDate).format('HH:mm')}`);
        setCustomerSignImage(viewCustomerSignature.customerSignImage);        
    }, [viewCustomerSignature]);
    
    return (
        <Fragment>
            {viewCustomerSignature.isAllowAccess ? (
                <LoadingIndicator isActive={isRequesting}>
                    <Segment className="LightGreyNotif">
                        <Grid>
                            <Grid.Row columns="equal">
                                <Grid.Column>
                                    <Header>
                                        <Header.Content>Customer Signature</Header.Content>
                                        
                                        <Grid.Row columns="equal" className={styles.mt1rem}>
                                            <Grid.Column width={16} className="ViewLabel">
                                                <Segment className='WhiteNotes'>
                                                    <img className="ui centered medium image" src={customerSignImage} />
                                                </Segment>
                                            </Grid.Column>
                                        </Grid.Row>
        
                                        <Grid.Row columns="equal" className={styles.mt1rem}>
                                            <Grid.Column width={16} className="ViewLabel">
                                                <Segment className='WhiteNotes'>
                                                    <table className={styles.fontTable}>
                                                        <tbody>
                                                            <tr>
                                                                <td>Name </td>
                                                                <td>: </td>
                                                                <td>{customerSignName}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date </td>
                                                                <td>: </td>
                                                                <td>{customerSignDate}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Segment>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Header>
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

export default CustomerSignatureView;
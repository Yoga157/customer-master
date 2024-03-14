import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import IStore from 'models/IStore';
import ActivityReportProductTableForm from 'views/activity-report-page/components/table/ActivityReportProductTableForm';
import * as ActivityReportProductActions from 'stores/activity-report-product/ActivityReportProductActions';
import { 
    selectViewActivityReportProductCheckAllowAccess, 
    selectViewActivityReportProducts 
} from 'selectors/activity-report-product/ActivityReportProductSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
    activityReportGenID: string;
}

const ProductViewEdit: React.FC<IProps> = ({ activityReportGenID }) => {
    const detailProductARInLocalStorage: string = 'detailProductAR';
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ActivityReportProductActions.REQUEST_VIEW_ACTIVITY_REPORT_PRODUCT]));
    const rowData: any = useSelector((state: IStore) => selectViewActivityReportProducts(state));
    const viewActivityReportProductCheckAllowAccess = useSelector((state: IStore) => selectViewActivityReportProductCheckAllowAccess(state));

    useEffect(() => {
        localStorage.removeItem(detailProductARInLocalStorage);
        dispatch(ActivityReportProductActions.requestViewProductByActivityReportGenID(+activityReportGenID));        

        dispatch(ActivityReportProductActions
            .requestViewProductCheckAllowAccessByActivityReportGenID(+activityReportGenID, currentUser.employeeID));
    }, [])
        
    return (
        <Fragment>
            {viewActivityReportProductCheckAllowAccess.isAllowAccess ? (
                <LoadingIndicator isActive={isRequesting}>
                    <Segment className="LightGreyNotif">
                        <Grid>
                            <Grid.Row columns="equal">
                                <Grid.Column>
                                    <Header>
                                        <Header.Content>Product</Header.Content>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row columns="equal">
                                <Grid.Column>
                                    <ActivityReportProductTableForm
                                        tableData={rowData?.filter((i) => i.isDelete !== 1)} 
                                        activityReportGenID={+activityReportGenID}
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

export default ProductViewEdit;
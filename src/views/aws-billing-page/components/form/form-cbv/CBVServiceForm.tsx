import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import CBVFormDashboard from './main-content/form-dashboard/CBVFormDashboard';
import Usage from './main-content/table-usage/Usage';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectAWSBillingById } from 'selectors/aws-billing/AWSBillingServiceSelector';
import AWSBillingByIdModel from 'stores/aws-billing/models/AWSBillingByIdModel';
import IUsageDashboardDetailTable from 'selectors/aws-billing/models/UsageDashboardTable/IUsageDashboardTable';
import { selectUsageDetails } from 'selectors/aws-billing/AWSBillingServiceSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';


interface IProps {
  BillingID: number;
}

const CBVServiceForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { BillingID } = props;
  const dispatch: Dispatch = useDispatch();
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [
    AWSBillingActions.REQUEST_AWS_BILLING_BY_ID,
    AWSBillingActions.REQUEST_USAGE_DASHBOARD,
    FunnelActions.REQUEST_GET_RATE
  ]));

  useEffect(() => {
    dispatch(AWSBillingActions.requestAWSBillingById(BillingID))
    dispatch(AWSBillingActions.requestUsageDashboard(BillingID, 1, 10))
  }, [dispatch])


  const dataByIdAwsBilling: AWSBillingByIdModel = useSelector((state: IStore) => selectAWSBillingById(state))
  const UsageDetailDashboardData: IUsageDashboardDetailTable = useSelector((state: IStore) => selectUsageDetails(state));

  return (
    
    <LoadingIndicator isActive={isRequesting}>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <CBVFormDashboard dataBillingById={dataByIdAwsBilling} />
            <br />
            <Usage BillingStatus={dataByIdAwsBilling.billingStatus} dataDashboardUsage={UsageDetailDashboardData} BillingID={BillingID}  />

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default CBVServiceForm;

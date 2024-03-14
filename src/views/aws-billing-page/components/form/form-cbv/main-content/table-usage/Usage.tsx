import React, { Fragment, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import UsageTable from './table/UsageTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Button, Pagination } from 'views/components/UI';
import IStore from 'models/IStore';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import UsageCBVServiceForm from '../../../form-create/UsageCBVServiceForm';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';

interface IProps {
  BillingID: number;
  dataDashboardUsage: any;
  BillingStatus: string;
}

const Usage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const {  BillingID, dataDashboardUsage, BillingStatus } = props;
  
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(AWSBillingActions.requestUsageDashboard(BillingID, data.activePage, pageSize))
  };
  

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      // AWSBillingActions.REQUEST_AWS_BILLING_BY_ID,
      // AWSBillingActions.REQUEST_USAGE_DASHBOARD,
    ])
  );
  const result = useSelector((state: IStore) => state.awsBilling.resultActions);

  const permission = useSelector((state: IStore) => selectPermission(state))

  const [validasiPermission,setValidasiPermission] = useState(false)


  useEffect(() => {
    permission.map((item) => {
      if(item.text1 === currentUser.userName)
      {
        setValidasiPermission(true)
      }
    })
  },[validasiPermission, permission, result, BillingStatus])
  console.log('BillingStatus',BillingStatus)
  const AddUsage = () => {
    dispatch(ModalSecondLevelActions.OPEN(<UsageCBVServiceForm pageSize={pageSize} activePage={activePage} BillingID={BillingID} type={'Add'} />, ModalSizeEnum.Small))
  }
 
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid padded>
         
          <Grid.Row>
            <Grid.Column width={16}>
              {validasiPermission && BillingStatus !== "Settle" ?
                (<Button type="button" icon="plus" color="yellow" floated="right" size="small" content="Add Usage" onClick={AddUsage} />) 
              :
                null
              }

              {
                validasiPermission === false && BillingStatus === "Unsettle" ?
                  (<Button type="button" icon="plus" color="yellow" floated="right" size="small" content="Add Usage" onClick={AddUsage} />) 
                :
                  null
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={16}>
              <div className="x-ovflo-auto mb-1r">
                <UsageTable tableData={dataDashboardUsage} />
              </div>
            </Grid.Column>
            <Grid.Column width={16}>
              <Pagination
                activePage={activePage}
                onPageChange={(e, data) => handlePaginationChange(e, data)}
                totalPage={dataDashboardUsage.totalRows}
                pageSize={pageSize}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </LoadingIndicator>
    </Fragment>
  );
};

export default Usage;

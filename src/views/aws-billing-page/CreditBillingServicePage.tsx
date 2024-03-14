import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { History } from 'history';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import { Grid } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import TabComponent from './components/tab/TabComponent';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';
import IAWSBillingTable from 'selectors/aws-billing/models/IAWSBillingTable';
import { selectAWSBillings } from 'selectors/aws-billing/AWSBillingServiceSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import InputSearchCreditBilling from './components/search/InputSearchCreditBilling';

interface IProps {
  history:History
}

const CreditBillingServicePage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const result = useSelector((state: IStore) => state.awsBilling.resultActions);
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [
    AWSBillingActions.REQUEST_AWS_BILLING,
    AWSBillingActions.REQUEST_FILTER_AWS_BILLING
  ]));
  useEffect(() => {
    dispatch(AWSBillingActions.requestAWSBillings(currentUser.employeeID, '', 'descending', 'billingPeriod' , 1, 15))
    dispatch(AWSBillingActions.requestAWSBillingPermission())
  }, [dispatch])

  const awsData: IAWSBillingTable = useSelector((state: IStore) => selectAWSBillings(state))
 
  useEffect(() => {
    const BillingID = localStorage.getItem('BillingID')
    const ActivePageForm = localStorage.getItem('activePage')
    const PageSizeForm = localStorage.getItem('pageSize')

    if (result?.bSuccess === false) {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
      dispatch(AWSBillingActions.removeResult())
      
    } else if (result?.errorNumber === "0") {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(AWSBillingActions.requestAWSBillings(currentUser.employeeID, '' ,'descending', 'billingPeriod' , 1, pageSize))
      dispatch(AWSBillingActions.removeResult())
      if(BillingID){
        // dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
        dispatch(AWSBillingActions.requestAWSBillingById(parseInt(BillingID)))
        dispatch(AWSBillingActions.requestUsageDashboard(parseInt(BillingID), parseInt(ActivePageForm), parseInt(PageSizeForm)))
        localStorage.removeItem('BillingID')
        localStorage.removeItem('activePage')
        localStorage.removeItem('pageSize')
      }
    }
   
  },[result])

  let searchType = '';
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        
        <Grid className="mt-10r">
          <Grid.Column textAlign="center">
            <InputSearchCreditBilling searchText={searchText} setSearchText={setSearchText} pageSize={pageSize} page={activePage} searchType={searchType} />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column className="DqTabSt01">
              <TabComponent 
              setDirection={setDirection} 
              direction={direction} 
              columns={columns} 
              setColumns={setColumns} 
              searchText={searchText} 
              pageSize={pageSize} 
              page={activePage} 
              setActivePage={setActivePage} 
              history={props.history} 
              tabItem="billing" 
              tableData={awsData}  />
          </Grid.Column>
        </Grid>

      </LoadingIndicator>
    </Fragment>
  );
};

export default CreditBillingServicePage;

import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { History } from 'history';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import * as UserActions from 'stores/users/UserActions';
import { selectCreditBillings } from 'selectors/main-cbv/CreditBillingServiceSelector';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import ICreditBillingTable from 'selectors/main-cbv/models/ICreditBillingTable';
import { Grid } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import TabComponent from './components/tab/TabComponent';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import InputSearchMainCBV from './components/search/InputSearchMainCBV';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';

interface IProps {
  history: History
}

const CreditBillingServicePage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const result: any = useSelector((state: IStore) => state.creditBilling.resultActions);

  useEffect(() => {
    dispatch(UserActions.requestCurrentUser())
    dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, '', 'creditId', 'descending', 1, 15));
    dispatch(AWSBillingActions.requestAWSBillingPermission())
    dispatch(CreditBillingActions.requestCBVTypeVoucher())
  }, [dispatch]);

  useEffect(() => {
    if (result?.errorNumber == "0") {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, '', 'creditId', 'descending', 1, pageSize))
      dispatch(CreditBillingActions.removeResult())
    } else if (result?.bSuccess === false) {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
      dispatch(CreditBillingActions.removeResult())
    }
  }, [result])



  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [
    CreditBillingActions.REQUEST_CREDIT_BILLINGS,
    CreditBillingActions.REQUEST_FILTER_MAIN_CBV
  ]));
  const creditBillingTables: ICreditBillingTable = useSelector((state: IStore) => selectCreditBillings(state));
  let searchType = '';
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>

        <Grid className="mt-10r">
          <Grid.Column textAlign="center">
            <InputSearchMainCBV searchText={searchText} setSearchText={setSearchText} pageSize={pageSize} page={activePage} searchType={searchType} />
          </Grid.Column>
        </Grid>

        <Grid>
          <Grid.Column>
            <TabComponent
              setDirection={setDirection}
              direction={direction}
              columns={columns}
              setColumns={setColumns} 
              searchText={searchText} 
              pageSize={pageSize} 
              page={activePage} 
              setActivePage={setActivePage} 
              tableData={creditBillingTables} 
              tabItem="maincbv" />
          </Grid.Column>
        </Grid>

      </LoadingIndicator>
    </Fragment>
  );
};

export default CreditBillingServicePage;

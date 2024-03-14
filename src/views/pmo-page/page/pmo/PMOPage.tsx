import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import NotFoundPage from 'views/not-found-page/NotFoundPage';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastActions from 'stores/toasts/ToastsAction';
import ContentPMO from './components/content/ContentPMO';
import PMOSummaryStatus from './hooks/PMOSummaryStatus';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import PMOSearch from '../components/search/PMOSearch';
import * as PMOActions from 'stores/pmo/PMOActions';
import IStore from 'models/IStore';

function PMOPage(props) {
  const dispatch: Dispatch = useDispatch();

  const isReqSummaryStts: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.PMO_SUMMARY_STATUS]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const resultActions: any = useSelector((state: IStore) => state.pmo.resultActions);

  const [tempDataStatus] = PMOSummaryStatus();

  useEffect(() => {
    // dispatch(PMOActions.reqPMOSummaryStatus());
  }, []);

  const onClearResult = (message: any, type: any) => {
    dispatch(ToastActions.add(message, type));
    dispatch(PMOActions.clearResult());
  };

  useEffect(() => {
    if (resultActions.errorNumber === '666') {
      onClearResult(resultActions.message, ToastStatusEnum.Error);
    } else if (resultActions.errorNumber === '0') {
      if (resultActions.resultObj?.projectId) {
        dispatch(
          ToastActions.add(
            `${resultActions.message} funnelGenId: ${resultActions.resultObj?.funnelGenId} projectId: ${resultActions.resultObj?.projectId}`,
            ToastStatusEnum.Success
          )
        );
        dispatch(PMOActions.clearResult());
      } else {
        onClearResult(resultActions.message, ToastStatusEnum.Success);
      }
    }
  }, [dispatch, resultActions]);

  if (currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') {
    return (
      <>
        <Grid className="">
          <Grid.Column textAlign="center">
            <PMOSearch />
          </Grid.Column>
        </Grid>

        <Grid className="">
          {/* <Grid.Column textAlign="center">{isReqSummaryStts ? <PMOPlaceholder /> : <StatusCardListPMO data={tempDataStatus} />}</Grid.Column> */}
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <ContentPMO />
          </Grid.Column>
        </Grid>
      </>
    );
  } else {
    return <NotFoundPage />;
  }
}

export default PMOPage;

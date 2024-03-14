import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

// import StatusCardList from './components/card/StatusCardList';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as WorklistActions from 'stores/work-list/WorkListActions';
import HeaderTicket from './components/header-ticket/HeaderTicket';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import NotFoundPage from 'views/not-found-page/NotFoundPage';
import TicketSearch from '../components/search/TicketSearch';
import * as TicketActions from 'stores/ticket/TicketActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import BreadCumb from '../components/breadcumb/BreadCumb';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import TicketList from './components/main/TicketList';
import IStore from 'models/IStore';

function TicketPage(props) {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const state: any = location?.state!;

  const resultAttachment = useSelector((state: IStore) => state.attachment.ResultActions);
  const resultWorklist = useSelector((state: IStore) => state.workList.resultActions);
  const result = useSelector((state: IStore) => state.ticket.resultActions);

  useEffect(() => {
    if (result.errorNumber === '666') {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Error));
      dispatch(TicketActions.clearResult());
    } else if (result.errorNumber === '0') {
      dispatch(ToastsAction.add(`${result.message}`, ToastStatusEnum.Success));
      dispatch(TicketActions.clearResult());
    }

    if (resultAttachment.errorNumber === '666') {
      dispatch(ToastsAction.add(resultAttachment.message, ToastStatusEnum.Error));
      dispatch(AttachmentActions.removeResult());
    } else if (resultAttachment.errorNumber === '0') {
      dispatch(ToastsAction.add(`${resultAttachment.message}`, ToastStatusEnum.Success));
      dispatch(AttachmentActions.removeResult());
    }

    if (resultWorklist.errorNumber === '666') {
      dispatch(ToastsAction.add(resultWorklist.message, ToastStatusEnum.Error));
      dispatch(WorklistActions.clearResult());
    } else if (resultWorklist.errorNumber === '0') {
      dispatch(ToastsAction.add(`${resultWorklist.message}`, ToastStatusEnum.Success));
      dispatch(WorklistActions.clearResult());
    }
  }, [result, resultAttachment, resultWorklist]);

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployeeFixAll());
  }, []);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  // if (currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO' || currentUser.role === 'Engineer') {
  return (
    <>
      {state && (
        <>
          <Grid.Column>
            <BreadCumb link={`/pmo-view/${state.funnelGenID}/${state.projectId}`} title={'Back to View/Edit'} />
            <HeaderTicket />
          </Grid.Column>
        </>
      )}

      <Grid className="">
        <Grid.Column textAlign="center">
          <TicketSearch />
        </Grid.Column>
      </Grid>

      {/* <Grid className="">
        <Grid.Column textAlign="center">
          <StatusCardList data={dummy} />
        </Grid.Column>
      </Grid> */}

      <Grid columns="equal">
        <Grid.Column>
          <TicketList />
        </Grid.Column>
      </Grid>
    </>
  );
  // } else {
  //   return <NotFoundPage />;
  // }
}

export default TicketPage;

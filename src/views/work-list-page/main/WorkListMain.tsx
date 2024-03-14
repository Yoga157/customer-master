import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

// import StatusCardList from './components/card/StatusCardList';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as TicketActions from 'stores/ticket/TicketActions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import SearchMain from '../components/search/SearchMain';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import WorkList from './components/main/WorkList';
import IStore from 'models/IStore';

function WorkListMain(props) {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const state = location?.state;

  const resultTicket = useSelector((state: IStore) => state.ticket.resultActions);
  const result = useSelector((state: IStore) => state.workList.resultActions);

  useEffect(() => {
    if (resultTicket.errorNumber === '666') {
      dispatch(ToastsAction.add(resultTicket.message, ToastStatusEnum.Error));
      dispatch(TicketActions.clearResult());
    } else if (resultTicket.errorNumber === '0') {
      dispatch(ToastsAction.add(`${result.message}`, ToastStatusEnum.Success));
      dispatch(TicketActions.clearResult());
    }

    if (result.errorNumber === '666') {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Error));
      dispatch(EmployeeActions.requestEmployeeByName('', ''));
      dispatch(WorkListActions.clearResult());
    } else if (result.errorNumber === '0') {
      dispatch(ToastsAction.add(`${result.message}`, ToastStatusEnum.Success));
      dispatch(EmployeeActions.requestEmployeeByName('', ''));
      dispatch(WorkListActions.clearResult());
    }
  }, [result, resultTicket]);

  return (
    <>
      <Grid className="">
        <Grid.Column textAlign="center">
          <SearchMain />
        </Grid.Column>
      </Grid>

      {/* <Grid className="">
        <Grid.Column textAlign="center">
          <StatusCardList data={dummy} />
        </Grid.Column>
      </Grid> */}

      <Grid columns="equal">
        <Grid.Column>
          <WorkList />
        </Grid.Column>
      </Grid>
    </>
  );
}

export default WorkListMain;

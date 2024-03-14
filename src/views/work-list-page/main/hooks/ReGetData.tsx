import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import WorkListAdvanceSearchModel from 'stores/work-list/models/WorkListAdvanceSearchModel';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

function ReGetData() {
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const search: any = useSelector((state: IStore) => state.workList?.workList?.search);
  const filter: any = useSelector((state: IStore) => state.workList?.workList?.filter);

  const reGetData = () => {
    if (search) {
      dispatch(WorkListActions.getWorklistSearch(1, 15, 'workId', 'descending', search?.search, currentUser.employeeID));
    } else if (filter) {
      const filterWorklist = new WorkListAdvanceSearchModel(filter);
      filterWorklist.page = 1;
      filterWorklist.pageSize = 15;
      dispatch(WorkListActions.getWorklistFilter(filterWorklist));
    } else {
      dispatch(WorkListActions.getWorklist(1, 15, 'workId', 'descending', currentUser.employeeID));
    }
    dispatch(WorkListActions.setActivePage(1));
  };
  return [reGetData];
}

export default ReGetData;

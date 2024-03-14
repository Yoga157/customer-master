import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

import { selectConfigItems, selectConfigProjPO } from 'selectors/config-items/ConfigItemSelector';
import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import ConfigItemFilter from 'stores/config-items/models/ConfigItemFilter';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

function ProjectListRowHook() {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state;

  const projectPO: IConfigItemsTable = useSelector((state: IStore) => selectConfigProjPO(state));
  const projPO = useSelector((state: IStore) => state.configItems.listDataProjectPO);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const configItems = useSelector((state: IStore) => state.configItems.listData);
  const activePageConfig = useSelector((state: IStore) => state.configItems.activePage);
  const listConfigItems = useSelector((state: IStore) => selectConfigItems(state));

  const reGetData = () => {
    if (state) {
      if (projPO.search) {
        dispatch(
          ConfigItemsActions.reqConfigItemsProjectPOSearch(
            activePageConfig,
            10,
            projectPO.column,
            projectPO.sorting,
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            projPO.search?.search as any
          )
        );
      } else if (projPO.filter) {
      } else {
        dispatch(
          ConfigItemsActions.reqConfigItemsProjectPO(
            activePageConfig,
            10,
            projectPO.column,
            projectPO.sorting,
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID
          )
        );
      }
    } else {
      console.log('configItems', configItems);

      if (configItems.search) {
        console.log('search', configItems.search);
        dispatch(
          ConfigItemsActions.reqConfigItemsListSearch(
            activePageConfig,
            listConfigItems.totalRows,
            listConfigItems.column,
            listConfigItems.sorting,
            listConfigItems.search.search as any,
            currentUser.employeeID,
            'PERPAGE'
          )
        );
      } else if (configItems.filter) {
        console.log('filter', configItems.filter);
        const newItems = new ConfigItemFilter({
          ...(listConfigItems.filter as any),
          pageSize: 10,
          sorting: listConfigItems.sorting,
        });
        dispatch(ConfigItemsActions.reqConfigItemsListFilter(newItems, 'PERPAGE'));
      } else {
        dispatch(
          ConfigItemsActions.reqConfigItemsList(activePageConfig, 10, listConfigItems.column, listConfigItems.sorting, currentUser.employeeID)
        );
      }
    }
  };

  return [reGetData];
}

export default ProjectListRowHook;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableToExcel from '@linways/table-to-excel';
import { History, LocationState } from 'history';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Dispatch } from 'redux';

import { TicketFilterModel, TicketFilterModelByProjId } from 'stores/ticket/models/TicketFilterModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectTicketlist } from 'selectors/ticket/TicketSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import ITicketList from 'selectors/ticket/models/ITicketList';
import * as TicketActions from 'stores/ticket/TicketActions';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

function TicketPageHooks() {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const state: any = location?.state!;

  const [direction, setDirection] = useState('descending' as any);
  const [columns, setColumns] = useState('');

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      TicketActions.GET_TICKET_LIST,
      TicketActions.GET_TICKET_LIST_SEARCH,
      TicketActions.GET_TICKET_LIST_FILTER,
      TicketActions.GET_TICKET_LIST_BY_IDPROJECT,
      TicketActions.GET_TICKET_LIST_SEARCH_BY_IDPROJECT,
      TicketActions.GET_TICKET_LIST_FILTER_BY_IDPROJECT,
    ])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const ticketList: ITicketList = useSelector((state: IStore) => selectTicketlist(state));
  const sorting: any = useSelector((state: IStore) => state.ticket?.ticketList?.sorting);
  const search: any = useSelector((state: IStore) => state.ticket?.ticketList?.search);
  const column: any = useSelector((state: IStore) => state.ticket?.ticketList?.column);
  const filter: any = useSelector((state: IStore) => state.ticket?.ticketList?.filter);

  useEffect(() => {
    setColumns(ticketList.column);
  }, [ticketList]);

  const getTicket = (activePage = 1, pageSize = 15, column = 'ticketId', sorting = 'descending', isExport = false) => {
    if (state?.page === 'pmo-view-edit') {
      dispatch(TicketActions.getTiketListByIdProject(activePage, pageSize, column, sorting, state?.projectId)).then(() => {
        if (isExport) {
          genExportExcel();
        }
      });
    } else {
      dispatch(TicketActions.getTiketList(activePage, pageSize, column, sorting, currentUser.userName, currentUser.employeeID)).then(() => {
        if (isExport) {
          genExportExcel();
        }
      });
    }
  };

  const searcTicket = (activePage = 1, pageSize = 15, col = column, sort = sorting, searchText = search.search, isExport = false) => {
    if (state?.page === 'pmo-view-edit') {
      dispatch(TicketActions.getTiketListSearchByIdProject(activePage, pageSize, column, sorting, searchText, state?.projectId)).then(() => {
        if (isExport) {
          genExportExcel();
        }
      });
    } else {
      dispatch(TicketActions.getTicketlistSearch(activePage, pageSize, col, sort, searchText, currentUser.userName, currentUser.employeeID)).then(
        () => {
          if (isExport) {
            genExportExcel();
          }
        }
      );
    }
  };

  const filterTicket = (values: any, activePage = 1, pageSize = 15, col = column, sort = sorting, isExport = false) => {
    const filterTicketList = new TicketFilterModel(values);
    filterTicketList.column = col;
    filterTicketList.sorting = sort;
    filterTicketList.page = activePage;
    filterTicketList.pageSize = pageSize;
    filterTicketList.userLogin = currentUser.userName;
    filterTicketList.userLoginId = currentUser.employeeID;

    const filterTicketListByProjID = new TicketFilterModelByProjId(values);
    filterTicketListByProjID.projectId = +state?.projectId;
    filterTicketListByProjID.column = col;
    filterTicketListByProjID.sorting = sort;
    filterTicketListByProjID.page = activePage;
    filterTicketListByProjID.pageSize = pageSize;

    if (state?.page === 'pmo-view-edit') {
      dispatch(TicketActions.getTicketlistFilterByIdProject(filterTicketListByProjID)).then(() => {
        if (isExport) {
          genExportExcel();
        }
      });
    } else {
      dispatch(TicketActions.getTicketlistFilter(filterTicketList)).then(() => {
        if (isExport) {
          genExportExcel();
        }
      });
    }
  };

  const handlePagination = (e: any, data: any) => {
    dispatch(TicketActions.setActivePage(data.activePage));
    if (search) {
      searcTicket(data.activePage, 15, column, sorting, search.search);
    } else if (filter) {
      filterTicket(filter, data.activePage, 15, column, sorting);
    } else {
      getTicket(data.activePage, 15, column, sorting);
    }
  };

  const genExportExcel = (): void => {
    if (isRequesting === false) {
      // setTimeout(() => {
      const tableSelect = document.getElementById('table-ticketList') as HTMLTableElement;
      TableToExcel.convert(tableSelect, {
        name: 'Ticket ' + format(new Date(), 'dd MMM yyyy') + '.xlsx',
        sheet: {
          name: 'Sheet 1',
        },
      });
      // }, 20);
      // setTimeout(() => {
      dispatch(TicketActions.setExportExcel(false));
      dispatch(TicketActions.setActivePage(1));
      // reGetData();
      const data = {
        activePage: 1,
      };
      handlePagination(null, data);
      // }, 10);
    }
  };

  const exportTableToExcel = (): void => {
    if (search) {
      searcTicket(1, ticketList.totalRows, column, sorting, search.search, true);
    } else if (filter) {
      filterTicket(filter, 1, ticketList.totalRows, column, sorting, true);
    } else {
      getTicket(1, ticketList.totalRows, column, sorting, true);
    }

    dispatch(TicketActions.setExportExcel(true));
  };

  const reloads = (columns: any, sort: any) => {
    let sorting = sort === 'ascending' ? 'descending' : 'ascending';
    setDirection(sorting);
    setColumns(columns);

    if (search) {
      searcTicket(1, 15, columns, sorting);
    } else if (filter) {
      filterTicket(filter, 1, 15, columns, sorting);
    } else {
      getTicket(1, 15, columns, sorting);
    }

    dispatch(TicketActions.setActivePage(1));
  };

  return {
    getTicket,
    searcTicket,
    filterTicket,
    handlePagination,
    exportTableToExcel,
    reloads,
    direction,
    columns,
  };
}

export default TicketPageHooks;

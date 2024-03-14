import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import WorkListAdvanceSearchModel from 'stores/work-list/models/WorkListAdvanceSearchModel';
import { selectWorklist } from 'selectors/work-list/WorklistSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IWorkList from 'selectors/work-list/models/IWorkList';
import IUserResult from 'selectors/user/models/IUserResult';
import WorkListTableRow from './table-row/WorkListTableRow';
import IStore from 'models/IStore';

interface IProps {
  tableData: any;
}

const WorkListTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { tableData } = props;

  const [direction, setDirection] = useState('ascending' as any);
  const [columns, setColumns] = useState('');

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const search: any = useSelector((state: IStore) => state.workList?.workList?.search);
  const filter: any = useSelector((state: IStore) => state.workList?.workList?.filter);
  const workList: IWorkList = useSelector((state: IStore) => selectWorklist(state));
  const isExport: any = useSelector((state: IStore) => state.workList?.isExport);

  useEffect(() => {
    setColumns(workList.column);
  }, [workList]);

  const reloads = (columns: any, sort: any) => {
    setColumns(columns);
    setDirection(sort === 'ascending' ? 'descending' : 'ascending');

    if (search) {
      dispatch(WorkListActions.getWorklistSearch(1, 15, columns, sort, search?.search, currentUser.employeeID));
    } else if (filter) {
      const filterWorklist = new WorkListAdvanceSearchModel(filter);
      filterWorklist.column = columns;
      filterWorklist.sorting = sort;
      filterWorklist.page = 1;
      filterWorklist.pageSize = 15;

      dispatch(WorkListActions.getWorklistFilter(filterWorklist));
    } else {
      dispatch(WorkListActions.getWorklist(1, 15, columns, sort, currentUser.employeeID));
    }

    dispatch(WorkListActions.setActivePage(1));
  };

  return (
    <Table sortable striped id="table-worklist" data-cols-width="15,30,40,20,20,30,15,15,15,15,20" className="font-size-1">
      <Table.Header>
        <Table.Row>
          {!isExport && <Table.HeaderCell></Table.HeaderCell>}

          <Table.HeaderCell sorted={columns === 'workId' ? direction : null} onClick={() => reloads('workId', direction)}>
            Work ID
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'workName' ? direction : null} onClick={() => reloads('workName', direction)}>
            Work Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'projectName' ? direction : null} onClick={() => reloads('projectName', direction)}>
            Project Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'customerName' ? direction : null} onClick={() => reloads('customerName', direction)}>
            Customer Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'engineerName' ? direction : null} onClick={() => reloads('engineerName', direction)}>
            Engineer Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'description' ? direction : null} onClick={() => reloads('description', direction)}>
            Description
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'estStartDate' ? direction : null} onClick={() => reloads('estStartDate', direction)}>
            Est. Start Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'estEndDate' ? direction : null} onClick={() => reloads('estEndDate', direction)}>
            Est. End Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'actualStartDate' ? direction : null} onClick={() => reloads('actualStartDate', direction)}>
            Actual Start Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'actualEndDate' ? direction : null} onClick={() => reloads('actualEndDate', direction)}>
            Actual End Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'workStatus' ? direction : null} onClick={() => reloads('workStatus', direction)}>
            Work Status
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'creatorName' ? direction : null} onClick={() => reloads('creatorName', direction)}>
            Created by
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center" className="">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.map((model, key) => (
          <WorkListTableRow key={key} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default WorkListTable;

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import TableToExcel from '@linways/table-to-excel';
import { format } from 'date-fns';
import { Dispatch } from 'redux';

import WorkListAdvanceSearchModel from 'stores/work-list/models/WorkListAdvanceSearchModel';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectWorklist } from 'selectors/work-list/WorklistSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { Button, Grid, Header, Form } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IWorkList from 'selectors/work-list/models/IWorkList';
import IUserResult from 'selectors/user/models/IUserResult';
import TicketListTable from '../table/WorkListTable';
import { Pagination } from 'views/components/UI';
import ReGetData from '../../hooks/ReGetData';
import IStore from 'models/IStore';
import './WorkListStyles.scss';

interface IProps {
  // history: History;
}

const WorkList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [reGetData] = ReGetData();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const sorting: any = useSelector((state: IStore) => state.workList?.workList?.sorting);
  const search: any = useSelector((state: IStore) => state.workList?.workList?.search);
  const column: any = useSelector((state: IStore) => state.workList?.workList?.column);
  const filter: any = useSelector((state: IStore) => state.workList?.workList?.filter);
  const workList: IWorkList = useSelector((state: IStore) => selectWorklist(state));
  const isExport: any = useSelector((state: IStore) => state.workList?.isExport);
  const activePage = useSelector((state: IStore) => state.workList.activePage);

  useEffect(() => {
    dispatch(WorkListActions.getWorklist(activePage, pageSize, 'workId', 'descending', currentUser.employeeID));
    dispatch(EmployeeActions.requestEmployeeFixAll());
  }, [dispatch]);

  const handlePagination = (e: any, data: any) => {
    dispatch(WorkListActions.setActivePage(data.activePage));
    if (search) {
      dispatch(WorkListActions.getWorklistSearch(data.activePage, pageSize, column, sorting, search?.search, currentUser.employeeID));
    } else if (filter) {
      const filterWorklist = new WorkListAdvanceSearchModel(filter);
      filterWorklist.page = data.activePage;
      filterWorklist.pageSize = pageSize;

      dispatch(WorkListActions.getWorklistFilter(filterWorklist));
    } else {
      dispatch(WorkListActions.getWorklist(data.activePage, pageSize, column, sorting, currentUser.employeeID));
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [WorkListActions.GET_WORK_LIST, WorkListActions.GET_WORK_LIST_FILTER, WorkListActions.GET_WORK_LIST_SEARCH])
  );

  const exportTableToExcel = (tableID: string, filename: string): void => {
    if (search) {
      dispatch(WorkListActions.getWorklistSearch(1, workList.totalRows, 'workId', 'descending', search?.search, currentUser.employeeID)).then(() => {
        genExportExcel();
      });
    } else if (filter) {
      const filterWorklist = new WorkListAdvanceSearchModel(filter);
      filterWorklist.page = 1;
      filterWorklist.pageSize = workList.totalRows;

      dispatch(WorkListActions.getWorklistFilter(filterWorklist)).then(() => {
        genExportExcel();
      });
    } else {
      dispatch(WorkListActions.getWorklist(1, workList.totalRows, 'workId', 'descending', currentUser.employeeID)).then(() => {
        genExportExcel();
      });
    }
    dispatch(WorkListActions.setExportExcel(true));

    const genExportExcel = (): void => {
      if (isRequesting == false) {
        setTimeout(() => {
          const tableSelect = document.getElementById('table-worklist') as HTMLTableElement;
          TableToExcel.convert(tableSelect, {
            name: 'WorkList ' + format(new Date(), 'dd MMM yyyy') + '.xlsx',
            sheet: {
              name: 'Sheet 1',
            },
          });
        }, 200);
        setTimeout(() => {
          dispatch(WorkListActions.setExportExcel(false));
          dispatch(WorkListActions.setActivePage(1));
          reGetData();
        }, 300);
      }
    };
  };

  const onSubmitHandler = (values: any) => {};

  const content = (
    <Fragment>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid columns="equal">
              <Grid.Column width={4}>
                <Header as="h4" className=" mt-05r">
                  <Header.Content>Work List</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <Button
                  className="m-05r"
                  type="button"
                  icon="file excel"
                  color="green"
                  floated="right"
                  size="small"
                  content="Export Excel"
                  onClick={() => exportTableToExcel('export', `name ${new Date()}`)}
                />

                {/* <Button
                  className="m-05r"
                  icon="plus"
                  color="yellow"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="Add New Work List"
                  onClick={() => dispatch(ModalFirstLevelActions.OPEN(<FormTicket type={'ADD NEW'} />, ModalSizeEnum.FullScreen))}
                /> */}
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column>
                <div className="wrapper-table mb-1r">
                  <TicketListTable tableData={workList.rows} />
                </div>
                <Pagination
                  activePage={activePage}
                  onPageChange={(e, data) => handlePagination(e, data)}
                  totalPage={workList.totalRows}
                  pageSize={pageSize}
                />
              </Grid.Column>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting || isExport}>{content}</LoadingIndicator>
    </Fragment>
  );
};

export default WorkList;

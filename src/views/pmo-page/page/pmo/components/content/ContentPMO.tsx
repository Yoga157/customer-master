import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import { History } from 'history';
import { format } from 'date-fns';
import { Dispatch } from 'redux';

import * as ModalNoPaddingActions from 'stores/modal/no-padding/ModalNoPaddingActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Button, Grid, Header, Form } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectPMO } from 'selectors/pmo/PMOSelector';
import IPMOList from 'selectors/pmo/models/IPMOList';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as PMOActions from 'stores/pmo/PMOActions';
import PMOFilter from 'stores/pmo/models/PMOFilter';
import TableToExcel from '@linways/table-to-excel';
import { Pagination } from 'views/components/UI';
import PMOTable from '../table/PMOTable';
import FormPMO from '../form/FormPMO';
import IStore from 'models/IStore';
import './ContentPMOStyles.scss';

interface IProps {
  // history: History;
}

const ContentPMO: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [PMOActions.REQUEST_PMO_LIST, PMOActions.PMO_LIST_SEARCH, PMOActions.POST_PMO_FILTER])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isExportExcel: any = useSelector((state: IStore) => state.pmo.isExportExcel);
  const pmoTables: IPMOList = useSelector((state: IStore) => selectPMO(state));
  const filter: any = useSelector((state: IStore) => state.pmo.data.filter);
  const search: any = useSelector((state: IStore) => state.pmo.data.search);
  const activePage = useSelector((state: IStore) => state.pmo.activePage);

  useEffect(() => {
    dispatch(PMOActions.reqPMOList(activePage, pageSize, 'projectId', 'descending', currentUser.employeeID));
  }, [dispatch]);

  const handlePagination = (e: any, data: any) => {
    dispatch(PMOActions.setActivePage(data.activePage));
    reGetData(data.activePage);
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    if (search) {
      dispatch(PMOActions.reqPMOListBySearch(1, pmoTables.totalRows, 'projectId', 'descending', search?.search, currentUser.employeeID)).then(() => {
        genExportExcel();
      });
    } else if (filter) {
      const filterPMO = new PMOFilter(filter);
      filterPMO.pageSize = pmoTables.totalRows;
      dispatch(PMOActions.postPMOFilter(filterPMO)).then(() => {
        genExportExcel();
      });
    } else {
      dispatch(PMOActions.reqPMOList(1, pmoTables.totalRows, 'projectId', 'descending', currentUser.employeeID)).then(() => {
        genExportExcel();
      });
    }
    dispatch(PMOActions.setExportExcel(true));

    const genExportExcel = (): void => {
      if (isRequesting == false) {
        setTimeout(() => {
          const tableSelect = document.getElementById('table-pmo') as HTMLTableElement;
          // const tableHead = document.querySelector('#table-pmo > thead > tr > th:nth-child(1)') as HTMLTableElement;
          // tableHead.style.display = 'none';
          // for (let i = 0; i < tableSelect.rows.length; i++) {
          //   const firstCol = tableSelect.rows[i].cells[0];
          //   firstCol.remove();
          // }
          TableToExcel.convert(tableSelect, {
            name: 'PMO ' + format(new Date(), 'dd MMM yyyy') + '.xlsx',
            sheet: {
              name: 'Sheet 1',
            },
          });
        }, 3000);
        setTimeout(() => {
          // window.location.href = window.location.origin + window.location.pathname;
          dispatch(PMOActions.setExportExcel(false));
          dispatch(PMOActions.setActivePage(1));
          reGetData(1);
        }, 4000);
      }
    };
  };

  const reGetData = (activePage: number) => {
    if (search) {
      dispatch(PMOActions.reqPMOListBySearch(activePage, pageSize, 'projectId', 'descending', search?.search, currentUser.employeeID));
    } else if (filter) {
      const filterPMO = new PMOFilter(filter);
      filterPMO.page = activePage;
      filterPMO.pageSize = 15;
      dispatch(PMOActions.postPMOFilter(filterPMO));
    } else {
      dispatch(PMOActions.reqPMOList(activePage, pageSize, 'projectId', 'descending', currentUser.employeeID));
    }
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
                  <Header.Content>{search ? 'Search ' : filter ? 'Filtered ' : ''} Project List</Header.Content>
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

                <Button
                  className="m-05r"
                  icon="plus"
                  color="yellow"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="Add New Project"
                  onClick={() => {
                    dispatch(ModalNoPaddingActions.OPEN(<FormPMO type={'ADD NEW'} projectID={0} />, ModalSizeEnum.Small));
                  }}
                />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column>
                <div className="wrapper-table mb-1r">
                  <PMOTable tableData={pmoTables} />
                </div>
                <Pagination
                  activePage={filter ? filter.page : search ? search.page : activePage}
                  onPageChange={(e, data) => handlePagination(e, data)}
                  totalPage={pmoTables.totalRows}
                  pageSize={filter ? filter.pageSize : search ? search.pageSize : pageSize}
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
      <LoadingIndicator isActive={isRequesting || isExportExcel}>{content}</LoadingIndicator>
    </Fragment>
  );
};

export default ContentPMO;

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import TableToExcel from '@linways/table-to-excel';
import { History, LocationState } from 'history';
import { Dispatch } from 'redux';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectTicketlist } from 'selectors/ticket/TicketSelector';
import { Button, Grid, Header, Form } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import ITicketList from 'selectors/ticket/models/ITicketList';
import * as TicketActions from 'stores/ticket/TicketActions';
import IUserResult from 'selectors/user/models/IUserResult';
import TicketPageHooks from '../../hooks/TicketPageHooks';
import TicketListTable from '../table/TicketListTable';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as PMOActions from 'stores/pmo/PMOActions';
import { Pagination } from 'views/components/UI';
import FormTicket from '../form/FormTicket';
import IStore from 'models/IStore';
import './TicketListStyles.scss';

interface IProps {
  // history: History;
}

const TicketList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const state: any = location?.state!;
  const [pageSize] = useState(15);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const ticketList: ITicketList = useSelector((state: IStore) => selectTicketlist(state));
  const activePage = useSelector((state: IStore) => state.ticket.activePage);

  const { getTicket, handlePagination, exportTableToExcel } = TicketPageHooks();

  useEffect(() => {
    getTicket();
  }, [dispatch, state]);

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
                  <Header.Content>Ticket List</Header.Content>
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
                  onClick={() => exportTableToExcel()}
                />

                <Button
                  className="m-05r"
                  icon="plus"
                  color="yellow"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="Add New Ticket"
                  onClick={() =>
                    dispatch(
                      ModalFirstLevelActions.OPEN(
                        <FormTicket
                          type={'ADD NEW'}
                          page={state?.page ? state?.page : 'ticket'}
                          projectId={state?.page === 'pmo-view-edit' && state?.projectId}
                        />,
                        ModalSizeEnum.FullScreen,
                        false,
                        false
                      )
                    )
                  }
                />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column>
                <div className="wrapper-table mb-1r">
                  <TicketListTable tableData={ticketList.rows} />
                </div>
                <Pagination
                  activePage={activePage}
                  onPageChange={(e, data) => handlePagination(e, data)}
                  totalPage={ticketList.totalRows}
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
      <LoadingIndicator isActive={isRequesting}>{content}</LoadingIndicator>
    </Fragment>
  );
};

export default TicketList;

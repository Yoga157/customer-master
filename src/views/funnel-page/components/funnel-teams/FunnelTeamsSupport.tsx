import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, Header, Card, Divider } from 'semantic-ui-react';
import { Button, Pagination } from 'views/components/UI';
import PMOEditStatusHook from 'views/pmo-page/page/pmo-view-detail/components/pmo-edit-status/hooks/PMOEditStatusHook';
import FunnelDedicatedResource from 'views/funnel-page/components/funnel-dedicated-resource/FunnelDedicatedResource';
import FunnelTeamSupportTable from '../funnel-teams/table/FunnelTeamSupportTable';
import IFunnelTeamsSupportTable from 'selectors/funnel-support-teams/models/IFunnelSupportTeamsTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as FunnelSupportTeamActions from 'stores/funnel-support-teams/FunnelSupportTeamActions';
import FunnelTeamSupportForm from './form/FunnelTeamSupportForm';
import IStore from 'models/IStore';
import { selectSupportTeams } from 'selectors/funnel-support-teams/FunnelSupportTeamsSelector';
import { selectViewFunnelCustomer, selectViewFunnelCustomerPO } from 'selectors/funnel/FunnelSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import FunnelSplitPerformance from '../funnel-split-performance/FunnelSplitPerformance';
import * as SupportRoleActions from 'stores/support-role/SupportRoleActions';
import { selectSupportRoleOptions } from 'selectors/select-options/SupportRoleSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';

interface IProps {
  //funnelGenID:string
  page: string;
}

const FunnelTeamsSupport: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { page } = props;
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const supportRole = useSelector((state: IStore) => selectSupportRoleOptions(state));
  const { statusProject } = PMOEditStatusHook({});

  useEffect(() => {
    dispatch(FunnelSupportTeamActions.requestSupportTeamsByFunnelGenID(viewFunnelCustomer.funnelGenID, activePage, pageSize));
    dispatch(SupportRoleActions.requestSupportRole());
  }, [dispatch, viewFunnelCustomer.funnelGenID]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(FunnelSupportTeamActions.requestSupportTeamsByFunnelGenID(viewFunnelCustomer.funnelGenID, data.activePage, pageSize));
  };

  const funnelTeamsTable: IFunnelTeamsSupportTable = useSelector((state: IStore) =>
    selectSupportTeams(state, [FunnelSupportTeamActions.REQUEST_SUPPORT_TEAMS])
  );

  const onOpenPopupChild = (content: any, size: ModalSizeEnum): void => {
    dispatch(ModalSecondLevelActions.OPEN(content, size));
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelSupportTeamActions.REQUEST_SUPPORT_TEAMS]));

  return (
    <Fragment>
      <Card.Header> Teams for Project# {viewFunnelCustomer.projectName} </Card.Header>
      <Divider />

      <Grid padded>
        <Grid.Row columns="equal">
          {page !== 'funnel-view-edit' && (
            <Grid.Column verticalAlign="middle" width={4}>
              <Header as="h4" className=" mt-05r">
                <Header.Content> Project List</Header.Content>
              </Header>
            </Grid.Column>
          )}

          <Grid.Column width={page === 'funnel-view-edit' ? 16 : 12}>
            <Button
              type="button"
              icon="plus"
              color="green"
              floated="right"
              size="small"
              content="Add Team"
              disabled={statusProject === 'void' && page === 'pmo-view-edit'}
              onClick={() =>
                onOpenPopupChild(
                  <FunnelTeamSupportForm
                    type="ADD"
                    page={page}
                    supportRoleID={supportRole.find((x) => x.text === currentUser.role).value}
                    funnelGenID={viewFunnelCustomer.funnelGenID}
                    employeeID={0}
                    funnelSupportID={0}
                  />,
                  ModalSizeEnum.Small
                )
              }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <LoadingIndicator isActive={isRequesting}>
              <FunnelTeamSupportTable page={page} tableData={funnelTeamsTable} />
              <Pagination
                activePage={activePage}
                onPageChange={(e, data) => handlePaginationChange(e, data)}
                totalPage={funnelTeamsTable.totalRow}
                pageSize={pageSize}
              />
            </LoadingIndicator>
          </Grid.Column>
        </Grid.Row>

        {page === 'funnel-view-edit' && (
          <>
            <Grid.Row>
              <Grid.Column>
                <FunnelSplitPerformance />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <FunnelDedicatedResource />
              </Grid.Column>
            </Grid.Row>
          </>
        )}

        <Grid.Row columns={1} className="pb-0">
          <Grid.Column textAlign="right" className="pb-0">
            <Button type="button" className="mr-1r" size="small" onClick={() => dispatch(ModalFirstActions.CLOSE())}>
              Close
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default FunnelTeamsSupport;

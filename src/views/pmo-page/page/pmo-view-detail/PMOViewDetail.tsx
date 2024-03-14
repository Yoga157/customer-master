import React, { useEffect } from 'react';
import { Grid, Header, Progress, Segment } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { format } from 'date-fns';
import { Dispatch } from 'redux';

import { FunnelEditCustomerDetails, FunnelEditCustomerPIC } from 'views/funnel-page/components/funnel-main/form/form-edit/child-edit/side-bar';
import { FunnelEditCustomer, FunnelEditCustomerPO } from 'views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content';
import FunnelButtonGroup from 'views/funnel-page/components/funnel-main/form/form-edit/FunnelButtonGroup';
import FunnelActivities from 'views/funnel-page/components/funnel-activity/FunnelActivities';
import AcceptenceDocument from './components/acceptence-document-invoice/AcceptenceDocument';
import PMOPlaceholderStatus from './components/placeholder/PMOPlaceholderStatus';
import ButtonStikyViewEditPMO from './components/stiky/ButtonStikyViewEditPMO';
import PMOEditCustomer from './components/pmo-edit-customer/PMOEditCustomer';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import StatusCardListPMO from '../pmo/components/card/StatusCardListPMO';
import PMOCustommerPO from './components/pmo-customer-po/PMOCustommerPO';
import PMOEditStatus from './components/pmo-edit-status/PMOEditStatus';
import PMOViewDetailHooks from './hooks/PMOViewDetailHooks';
import ProjectStatusHooks from './hooks/ProjectStatusHooks';
import BreadCumb from '../components/breadcumb/BreadCumb';
import * as PMOActions from 'stores/pmo/PMOActions';
import RouteEnum from 'constants/RouteEnum';
import Top from './components/top/Top';
import IStore from 'models/IStore';
import './PMOViewDetail.scss';

interface RouteParams {
  funnelId: string;
  projectId: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const PMOViewDetail: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const funnelId = props?.match?.params?.funnelId;
  const projectId = props?.match?.params?.projectId;

  const progressMilestone = useSelector((state: IStore) => state.pmo.progressMilestone);
  const dataCardStatus = ProjectStatusHooks({ projectId });

  useEffect(() => {
    dispatch(PMOActions.reqStatusProjectViewEdit('ProjectSummary', +projectId));
    dispatch(PMOActions.reqStatusProjectViewEdit('LatestMilestone', +projectId));
    dispatch(PMOActions.reqProgressMilestone(+projectId));
    localStorage.removeItem('@sttsPMOProject');
  }, []);

  useEffect(() => {
    if (+funnelId > 0) {
    }
  }, [dispatch, funnelId]);

  PMOViewDetailHooks();

  const isRequestingStatus: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [PMOActions.VIEW_EDIT_STATUS_PROJECT_SUMMARY, PMOActions.VIEW_EDIT_STATUS_LATEST_MILESTONE])
  );

  return (
    <>
      <BreadCumb link={RouteEnum.Pmo} title={'Back to Project List'} />

      <Grid stackable columns={2} className="mt-1">
        <Grid.Column className="FullGrid1200 " width={1}>
          <ButtonStikyViewEditPMO />
        </Grid.Column>

        <Grid.Column className="FullGrid1200" width={15}>
          <Grid>
            <Grid.Column width={16} textAlign="center">
              {isRequestingStatus ? <PMOPlaceholderStatus /> : <StatusCardListPMO data={dataCardStatus} />}
            </Grid.Column>

            <Grid.Column width={16} textAlign="center" className="mb-1r">
              <Progress percent={progressMilestone?.precentageTask} color="blue" className="bar-gradien">
                <Header as="h5" className=" mt-px-4 text-gray">
                  {progressMilestone?.lastTitle ? progressMilestone?.lastTitle : '-'}
                </Header>
                <Header as="h5" className="text-gray bold-2">
                  {progressMilestone?.lastActualEndDate && format(new Date(progressMilestone?.lastActualEndDate), 'dd MMM yyyy')}
                </Header>
              </Progress>
            </Grid.Column>
          </Grid>

          <Grid stackable columns={2}>
            <Grid.Column width={12}>
              <Grid>
                <Grid.Column width={16}>
                  <PMOEditStatus history={props.history} funnelGenID={funnelId} projectId={projectId} />
                </Grid.Column>
              </Grid>

              <Grid stackable columns={2}>
                <Grid.Column width={9}>
                  <PMOCustommerPO page="pmo-view-edit" funnelGenID={funnelId} projectId={projectId} />
                </Grid.Column>
                <Grid.Column width={7}>
                  <Segment inverted className="lightBlue">
                    <PMOEditCustomer page="pmo-view-edit" funnelGenID={funnelId} projectId={projectId} />
                  </Segment>
                </Grid.Column>
              </Grid>

              <Grid>
                <Grid.Column width={16}>
                  <AcceptenceDocument funnelGenID={+funnelId} projectId={+projectId} />
                </Grid.Column>
                <Grid.Column width={16}>
                  <Top funnelGenID={+funnelId} />
                </Grid.Column>

                <Grid.Row>
                  <Grid.Column>
                    <FunnelButtonGroup page="pmo-view-edit" history={props.history} funnelgenid={funnelId} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <FunnelActivities page="pmo-view-edit" funnelGenID={funnelId} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            <Grid.Column width={4}>
              <Segment inverted className="lightYellow">
                <FunnelEditCustomerDetails page="pmo-view-edit" funnelGenID={+funnelId} />
                <FunnelEditCustomerPIC page="pmo-view-edit" funnelGenID={+funnelId} />
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default PMOViewDetail;

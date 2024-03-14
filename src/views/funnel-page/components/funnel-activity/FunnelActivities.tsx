import React, { useEffect } from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';
import FunnelActivitiesList from './table/FunnelActivitiesList';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as FunnelActivityActions from 'stores/funnel-activity/FunnelActivityActions';
import { Dispatch } from 'redux';
import FunnelNotesForm from './form/FunnelNotesForm';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';

interface IProps {
  page: string;
  funnelGenID: string;
}

const FunnelActivities: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { funnelGenID } = props;

  useEffect(() => {
    dispatch(FunnelActivityActions.requestFunnelActivities(+funnelGenID));
  }, [dispatch, funnelGenID]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES, FunnelActivityActions.REQUEST_FUNNEL_ACTIVITIES])
  );

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <Divider />
            <Header className="ml-m-1r ml-0-767 mb-1r" as="h4">
              <Header.Content>Activity</Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="pt-0 pb-0">
          <Grid.Column className="activityPos pb-0">
            <FunnelNotesForm funnelGenID={funnelGenID} fromForm={'FormActivities'} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column className="pt-0">
            <FunnelActivitiesList funnelGenID={+funnelGenID} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default FunnelActivities;

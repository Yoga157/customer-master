import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import classes from './FunnelCard.module.scss';
import FunnelForm from './FunnelForm';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
  location: any;
}

const FunnelCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const typePage = props.location?.state?.typePage;

  return (
    <Card centered raised className={props.match.params.id ? classes.CardEdit : classes.Card}>
      <Card.Content>
        <Card.Header>
          {props.match.params.id
            ? 'View Edit Funnel'
            : props.location?.state?.funnelOpportunityID
            ? 'Funnel Process'
            : typePage !== 'funnel'
            ? 'Add New Funnel - Copy Project'
            : 'Add New Funnel'}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <FunnelForm history={props.history} />
      </Card.Content>
    </Card>
  );
};

export default withRouter(FunnelCard);

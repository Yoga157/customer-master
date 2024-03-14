import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { History } from 'history';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import styles from './ActivityReportCard.module.scss';
import IStore from 'models/IStore';
import ActivityReportForm from './form-create/ActivityReportForm';
import ActivityReportFormEdit from './form-edit/ActivityReportFormEdit';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
  location: any;
}

const ActivityReportCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const typePage = props.location?.state?.typePage;
  
  return (
    <Card centered raised className={styles.Card}>
      <Card.Content>
        <Card.Header>{props.match.params.id ? 'View Edit Activity Report' : 'Add Activity Report'}</Card.Header>
        </Card.Content>
      <Card.Content>
        <ActivityReportForm history={props.history} />
      </Card.Content>
    </Card>
  );
}

export default withRouter(ActivityReportCard);
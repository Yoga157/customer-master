import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import classes from './Index.module.scss';
import IndexForm from './IndexForm';

interface RouteParams {
  //id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const IndexCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Card centered raised className={classes.Card}>
      <Card.Content>
        <IndexForm />
      </Card.Content>
    </Card>
  );
};

export default withRouter(IndexCard);

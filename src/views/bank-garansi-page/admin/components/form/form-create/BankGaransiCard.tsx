import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import classes from './BankGaransiCard.module.scss';
import BankGaransiForm from './BankGaransiForm';
import { format } from 'date-fns';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const BankGaransiCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
  return (
    <Card centered raised className={props.match.params.id ? classes.CardEdit : classes.Card}>
      <Card.Content>
        <BankGaransiForm popupFrom={'bg'} history={props.history} dealCloseDate={currDate} funnelGenID={+0} popupLevel={1} />
      </Card.Content>
    </Card>
  );
};

export default withRouter(BankGaransiCard);

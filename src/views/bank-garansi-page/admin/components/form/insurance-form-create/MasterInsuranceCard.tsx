import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import classes from './MasterInsuranceCard.module.scss';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const MasterInsuranceCard:React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    return (
        <Card centered raised className={(props.match.params.id) ? classes.CardEdit :classes.Card} >
            <Card.Content>
                {/* <MasterInsuranceForm history={props.history} />  */}
            </Card.Content>
        </Card>
      )
}

export default withRouter(MasterInsuranceCard);

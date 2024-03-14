import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { History } from 'history';
import classes from './SoftwareCard.module.scss';
import SoftwareForm from './form-create/SoftwareForm';
import SoftwareFormEdit from './form-edit/SoftwareFormEdit';
import SoftwareHeaderModel from 'stores/software/models/SoftwareHeaderModel';
import SoftwareMainModel from 'stores/software/models/SoftwareMainModel';
import { selectSoftware, selectSoftwareMain } from 'selectors/software/SoftwareSelector';
//import ISoftwareHeaderTableRow from 'selectors/software/models/ISoftwareHeaderTableRow';
import IStore from 'models/IStore';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const FunnelCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  let form;
  if (props.match.params.id) {
    form = <SoftwareFormEdit history={props.history} id={+props.match.params.id} />;
  } else {
    form = <SoftwareForm type={'add'} id={0} />;
  }
  return (
    <Card centered raised className={props.match.params.id ? classes.CardEdit : classes.Card}>
      <Card.Content>
        <Card.Header>{props.match.params.id ? 'View Edit Software' : 'Add New Software'}</Card.Header>
      </Card.Content>
      <Card.Content>{form}</Card.Content>
    </Card>
  );
};

export default withRouter(FunnelCard);

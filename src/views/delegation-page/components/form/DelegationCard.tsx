import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { History } from 'history';
import { Dispatch } from 'redux';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as DelegationActions from 'stores/delegation/DelegationActions';
import * as BrandTypeAction from 'stores/brand-model/BrandTypeAction';
import DelegationFormEdit from './form-edit/DelegationFormEdit';
import DelegationForm from './form-create/DelegationForm';
import classes from './DelegationCard.module.scss';
import RouteEnum from 'constants/RouteEnum';
import IStore from 'models/IStore';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const DelegationCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (+props.match.params.id > 0) {
      dispatch(DelegationActions.requestDelegationById(+props.match.params.id));
    }
  }, [dispatch, props.match.params.id]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));

  let form;

  if (!isRequesting) {
    if (props.match.params.id && isNaN(+props.match.params.id)) {
      history.replace(RouteEnum.Delegation);
    } else if (+props.match.params.id > 0) {
      form = <DelegationFormEdit delegationID={props.match.params.id ? +props.match.params.id : 0} history={props.history} />;
    } else {
      form = <DelegationForm history={props.history} />;
    }
  }

  return (
    <Card centered raised className={classes.Card}>
      <Card.Content>
        <Card.Header>{props.match.params.id ? 'Update Delegation' : 'Add Delegation'}</Card.Header>
      </Card.Content>
      <Card.Content>{form}</Card.Content>
    </Card>
  );
};

export default withRouter(DelegationCard);

import React, { Fragment } from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import IStore from 'models/IStore';
import FunnelDedicatedResourceProject from '../FunnelDedicatedResourceProject';
import FunnelDedicatedResourceEdit from './child-edit/FunnelDedicatedResourceEdit';

interface IProps {
  reqResourceGenID: number;
  //history:History
}

const FunnelDedicatedResourceFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const { reqResourceGenID } = props;
  return (
    <Fragment>
      <Header>
        <Header.Content>
          <Icon name="users" />
          Request Dedicated Resource for project # {viewFunnelCustomer.projectName}
        </Header.Content>
      </Header>
      <Segment>
        <FunnelDedicatedResourceProject />
      </Segment>
      <Segment>
        <FunnelDedicatedResourceEdit reqGenID={reqResourceGenID} />
      </Segment>
    </Fragment>
  );
};

export default FunnelDedicatedResourceFormEdit;

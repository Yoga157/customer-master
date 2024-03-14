import React, { Fragment } from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import IStore from 'models/IStore';
import FunnelDedicatedResourceProject from '../FunnelDedicatedResourceProject';
import FunnelDedicatedResourceForm from './child-create/FunnelDedicatedResourceForm';

interface IProps {
  //history:History
}

const FunnelDedicatedResourceCreate: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  //const dispatch:Dispatch = useDispatch();
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

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
      <FunnelDedicatedResourceForm />
    </Fragment>
  );
};

export default FunnelDedicatedResourceCreate;

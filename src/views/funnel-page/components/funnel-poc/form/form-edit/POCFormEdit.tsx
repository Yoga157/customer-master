import React, { Fragment } from 'react';
import { Segment, Card, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import IStore from 'models/IStore';
import POCFormEditRequestor from './child-edit/POCFormEditRequestor';
import POCFormEditImplementor from './child-edit/POCFormEditImplementor';
import Attachment from 'views/attachment-page/Attachment';
import POCRequirement from './child-edit/poc-requirement/POCRequirement';

interface IProps {
  pocGenHID: number;
  //history:History
}

const POCFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const { pocGenHID } = props;
  return (
    <Fragment>
      <Card.Header>
        POC Request ID# {pocGenHID} for project # {viewFunnelCustomer.projectName}
      </Card.Header>
      <Divider />
      <Segment>
        <POCFormEditRequestor pocGenHID={pocGenHID} />
      </Segment>
      <Segment>
        <POCFormEditImplementor pocGenHID={pocGenHID} />
        <POCRequirement popupLevel={3} pocGenHID={pocGenHID} />
      </Segment>
      <Segment>
        <Attachment funnelGenID={viewFunnelCustomer.funnelGenID.toString()} modul={3} popupLevel={3} isLocalFirst={false} />
      </Segment>
    </Fragment>
  );
};

export default POCFormEdit;

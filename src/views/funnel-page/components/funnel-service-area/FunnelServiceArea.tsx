import React, { Fragment, useState } from 'react';
import { Header, Segment, Grid, Card, Divider } from 'semantic-ui-react';
import BufferResource from './child-component/BufferResource';
import FunnelServiceCatalog from '../funnel-service-catalog/FunnelServiceCatalog';
import FunnelWarrantySupport from '../funnel-warranty-support/FunnelWarrantySupport';
import POCRequest from '../funnel-poc/POCRequest';
import FunnelBOQ from '../funnel-boq/FunnelBOQ';
import { CheckBox } from 'views/components/UI';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectViewFunnelCustomer, selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
import './FunnelServiceAreaStyle.scss';

interface IProps {
  //funnelGenID:string
}
const FunnelServiceArea: React.FC<IProps> = () => {
  const [haveWarranty, setHaveWarranty] = useState(false);
  const onShowWarranty = () => {
    setHaveWarranty(!haveWarranty);
  };

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));

  return (
    <Fragment>
      <Card.Header>Service Area For Project# {viewFunnelCustomer.projectName}</Card.Header>
      <Divider></Divider>

      {/* <CheckBox label="have a warranty?" onClick={onShowWarranty} /> */}
      <Segment className="LightYellowNotif">
        <Grid columns="equal">
          <Grid.Column>
            <BufferResource funnelGenID={viewFunnelCustomer.funnelGenID} />
          </Grid.Column>
        </Grid>
      </Segment>

      <Grid columns="equal">
        <Grid.Column width={16}>
          <Segment inverted className="lightOlive ph-0">
            <Header as="h4" className="pl-1">
              Service Catalog
            </Header>
            <Divider></Divider>
            <FunnelServiceCatalog funnelGenID={viewFunnelCustomer.funnelGenID} />
          </Segment>
        </Grid.Column>
      </Grid>

      <Grid columns="equal">
        <Grid.Column width={16}>
          <Segment inverted className="lightBlue ph-0">
            <Header as="h4" className="pl-1">
              BOQ
            </Header>
            <Divider></Divider>
            <FunnelBOQ funnelGenID={viewFunnelCustomer.funnelGenID} />
          </Segment>
        </Grid.Column>
      </Grid>

      {haveWarranty && (
        <Grid columns="equal">
          <Grid.Column width={16}>
            <Segment inverted className="lightYellow ph-0">
              <Header as="h4" className="pl-1">
                Warranty Support
              </Header>
              <Divider></Divider>
              <FunnelWarrantySupport funnelGenID={viewFunnelStatus.funnelGenID} />
            </Segment>
          </Grid.Column>
        </Grid>
      )}

      <Grid columns="equal">
        <Grid.Column width={16}>
          <Segment inverted className="lightOrange ph-0">
            <Header as="h4" className="pl-1">
              POC
            </Header>
            <Divider></Divider>
            <POCRequest popupLevel={2} funnelGenID={viewFunnelCustomer.funnelGenID} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default FunnelServiceArea;

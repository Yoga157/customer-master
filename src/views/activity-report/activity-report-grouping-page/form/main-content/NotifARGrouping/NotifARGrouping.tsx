import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import './NotifARGrouping.scss'

interface IProps {
  type: string;
}

const NotifARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <Segment className="LightGreyNotif">
      <Header textAlign="center">
        <Header.Content className="p-4" style={{ opacity: 0.5 }}>
          Symthom/Error Possibility
        </Header.Content>
      </Header>
      <Grid.Row>
        <Grid.Column>
          <Header textAlign="center" className="m-0">
            <Header.Content>
              Aenean rutrum purus quis odio auctor interdum eget quis urna.
            </Header.Content>
          </Header>
          <Header textAlign="center" className="m-0">
            <Header.Content>
              Fusce tincidunt eros nibh, ut blandit purus scelerisque ut.
            </Header.Content>
          </Header>
          <Header textAlign="center" className="m-0">
            <Header.Content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Segment>
  );
};

export default NotifARGrouping;

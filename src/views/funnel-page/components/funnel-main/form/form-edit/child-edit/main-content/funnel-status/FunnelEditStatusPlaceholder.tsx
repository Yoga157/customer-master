import React from 'react';
import { Grid, Header, Placeholder } from 'semantic-ui-react';

const FunnelEditStatusPlaceholder = () => {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <Header as="h4">
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length="medium" />
              </Placeholder.Header>
            </Placeholder>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column width={3}>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Grid.Column>
        <Grid.Column width={3}>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Grid.Column>
        <Grid.Column>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Grid.Column>
        <Grid.Column>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FunnelEditStatusPlaceholder;

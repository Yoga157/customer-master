import React, { Fragment } from 'react';
import { Grid, Header, Placeholder, Segment } from 'semantic-ui-react';
import classes from './FunnelEditCustomerPO.module.scss';

const FunnelEditCustomerPOPlaceholder = () => {
  return (
    <Fragment>
      <Header attached="top" textAlign="center" className={classes.Header}>
        <Grid columns="2" divided>
          <Grid.Column width="6">
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Grid.Column>
          <Grid.Column width="10">
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </Grid.Column>
        </Grid>
      </Header>
      <Segment attached>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column width="6">
              <Grid.Row>
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Grid.Row>
              <Grid.Row>
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={10}>
              <Grid.Row>
                <Grid columns="equal">
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                  <Grid.Column width="2">
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                </Grid>
              </Grid.Row>
              <Grid.Row>
                <Grid columns="2">
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
                </Grid>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
};

export default FunnelEditCustomerPOPlaceholder;

import React, { Fragment } from 'react';
import { Grid, Segment, Placeholder } from 'semantic-ui-react';

const serviceCatalogPlaceholder = () => {
  return (
    <Fragment>
      <Grid divided="vertically">
        <Grid.Row columns={4}>
          <Grid.Column width={2}>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
              </Placeholder.Header>
            </Placeholder>
          </Grid.Column>
          <Grid.Column>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
              </Placeholder.Header>
            </Placeholder>
          </Grid.Column>
          <Grid.Column width={6}>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
              </Placeholder.Header>
            </Placeholder>
          </Grid.Column>
          <Grid.Column>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length="full" />
                <Placeholder.Line length="full" />
              </Placeholder.Header>
            </Placeholder>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment color="yellow">
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length="full" />
                </Placeholder.Header>
              </Placeholder>

              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                </Placeholder.Header>
                <Placeholder.Header>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                </Placeholder.Header>
              </Placeholder>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="blue">
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment color="green">
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Image rectangular />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Image rectangular />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Image rectangular />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment color="teal">
              <Grid>
                <Grid.Row columns={4}>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                  <Grid.Column>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="full" />
                      </Placeholder.Header>
                    </Placeholder>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated="right" width={3}>
            <Placeholder>
              <Placeholder.Header image />
            </Placeholder>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default serviceCatalogPlaceholder;

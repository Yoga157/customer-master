import React from 'react';
import { Grid, Placeholder } from 'semantic-ui-react';
import classes from './FunnelEditCustomer.module.scss';
import FunnelEditCustomerPOPlaceholder from '../funnel-customer-po/FunnelEditCustomerPOPlaceholder';

const FunnelEditCustomerPlaceholder = () => {
  return (
    <Grid columns="equal" celled="internally">
      <Grid.Column>
        <Grid.Row>
          <Grid columns={2}>
            <Grid.Column width="6" className={classes.GridTop}>
              <Placeholder style={{ height: 20, width: '100%' }}>
                <Placeholder.Image />
              </Placeholder>
              <Placeholder style={{ height: 20, width: '100%' }}>
                <Placeholder.Image />
              </Placeholder>
              <Placeholder style={{ height: 20, width: '100%' }}>
                <Placeholder.Image />
              </Placeholder>
              <Placeholder style={{ height: 20, width: '100%' }}>
                <Placeholder.Image />
              </Placeholder>
              <Placeholder style={{ height: 20, width: '100%' }}>
                <Placeholder.Image />
              </Placeholder>
              <Placeholder style={{ height: 20, width: '100%' }}>
                <Placeholder.Image />
              </Placeholder>
            </Grid.Column>
            <Grid.Column width="10">
              <FunnelEditCustomerPOPlaceholder />
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Grid className={classes.GridBottom}>
              <Grid.Row columns="equal">
                <Grid.Column width={4}>
                  <Placeholder style={{ height: 20, width: '50%' }}>
                    <Placeholder.Paragraph>
                      <Placeholder.Image />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Grid.Column>

                <Grid.Column width={5}>
                  <Placeholder style={{ height: 20, width: '50%' }}>
                    <Placeholder.Paragraph>
                      <Placeholder.Image />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Placeholder style={{ height: 20, width: '50%' }}>
                    <Placeholder.Paragraph>
                      <Placeholder.Image />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Grid.Row>
                    <Placeholder style={{ height: 20, width: '50%' }}>
                      <Placeholder.Paragraph>
                        <Placeholder.Image />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Row>
                  <Grid.Row>
                    <Placeholder style={{ height: 20, width: '50%' }}>
                      <Placeholder.Paragraph>
                        <Placeholder.Image />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default FunnelEditCustomerPlaceholder;

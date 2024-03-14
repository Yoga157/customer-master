import React, { Fragment } from "react";
import { Grid, Segment, Label } from "semantic-ui-react";
import "./Segments.scss";

interface IProps {
  //   history:History
}

const Segments: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Fragment>
      <Grid centered columns={1} className="legendGrid">
        <Grid.Row>
          <Grid.Column className="FullGrid767" width={9}>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={1}>
                    <h5>Notes:</h5>
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={3}>
                    <Label
                      className="legendSA FullApprove"
                      circular
                      color="green"
                      empty
                      key="yellow"
                    />
                    <p>Full Approval</p>
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={3}>
                    <Label
                      className="legendSA Reject"
                      circular
                      color="red"
                      empty
                      key="yellow"
                    />
                    <p>Reject</p>
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={3}>
                    <Label
                      className="legendSA MyWaitApprove"
                      circular
                      color="yellow"
                      empty
                      key="yellow"
                    />
                    <p>My Waiting Approval</p>
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={3}>
                    <Label
                      className="legendSA WaitApprove"
                      circular
                      empty
                      key="grey"
                    />
                    <p>Waiting Approval</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default Segments;

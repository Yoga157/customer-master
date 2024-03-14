import React, { useState, Fragment } from "react";
import { Card, Divider, Grid, Image } from "semantic-ui-react";
import { Button } from "views/components/UI";

interface IProps {
  // item: any;
}

const ActivityReportListTableRowDelete: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Image centered src="/assets/WarningOrange.svg" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h2>AR Group ID - ARG - 3456</h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h4>Are You Sure want to delete this AR Group?</h4>
          </Grid.Column>
        </Grid.Row>

        <Divider />
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button
              floated="center"
              content="Cancel"
              //   onClick={() => onSubmit()}
            />
            <Button
              type="button"
              floated="center"
              content="Delete"
              color="blue"
              //   onClick={() => onClose()}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default ActivityReportListTableRowDelete;

import React, { useState, Fragment } from "react";
import { Card, Divider, Grid, Image } from "semantic-ui-react";
import { Button } from "views/components/UI";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ActivityReportGroupingActions from "stores/activity-report-grouping/ActivityReportGroupingActions";

interface IProps {
  item: number;
  uid: string;
}

const ActivityReportGroupingListTableRowDelete: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { item, uid } = props;
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };
  const onSubmit = () => {
    dispatch(
      ActivityReportGroupingActions.RequestActivityReportGroupingDelete(
        item,
        // currentUser.employeeID
        currentUser.employeeID
      )
    ).then(() => {
      onClose();
    });
  };

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
            <h2>AR Group ID - {uid}</h2>
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
              type="button"
              floated="center"
              content="Cancel"
              onClick={() => onClose()}
            />
            <Button
              floated="center"
              content="Submit"
              color="blue"
              onClick={() => onSubmit()}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default ActivityReportGroupingListTableRowDelete;

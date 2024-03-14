import React, { Fragment, useEffect } from 'react';
import { Form, Card, Divider, Grid, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectViewFunnelCustomerByProjectId } from 'selectors/funnel/FunnelSelector';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectPMOProjectViewEditStatus } from 'selectors/pmo/PMOSelector';
import IPMOViewEditStatus from 'selectors/pmo/models/IPMOViewEditStatus';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';
import styles from './ResubmitRequire.module.scss';
import IStore from 'models/IStore';

function ResubmitRequire({ funnelGenID, projectId }) {
  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      PMOActions.REQUIREMENT_CLOSING_PROJECT,
      PMOActions.PUT_WARRANTY_DATE_PROJECT,
      PMOActions.PUT_HANDOVER,
      PMOActions.PUT_RESUBMIT,
    ])
  );
  const pmoViewEditStatus: IPMOViewEditStatus = useSelector((state: IStore) => selectPMOProjectViewEditStatus(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onSubmitHandler = (values) => {
    const newItem = {
      projectId: +projectId,
      userLoginId: currentUser.employeeID,
      // modifyDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    };

    dispatch(PMOActions.putResubmit(newItem)).then(() => {
      dispatch(PMOActions.reqRequirementClosingProject(+projectId, +funnelGenID, pmoViewEditStatus.projectStatus));
      dispatch(PMOActions.reqViewEditProjectStatus(+projectId));
      dispatch(ModalFirstActions.CLOSE());
    });
  };

  return (
    <Fragment>
      <Card.Header className="bold-8">Resubmit Project #{projectId}</Card.Header>
      <Divider />
      <FinalForm
        // validate={}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, invalid, pristine, submitting }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid className="mb-2r mt-1r">
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Header as="h3" style={{ color: '#55637A' }}>
                    Are you sure want to re-submit this project ?
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider />
            <Grid>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Button type="submit" className="mr-3r" color="blue" floated="right" content="Submit" disabled={isRequesting || submitting} />
                  <Button className="ml-3r " floated="left" type="button" content="Cancel" onClick={() => dispatch(ModalFirstActions.CLOSE())} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
}

export default ResubmitRequire;

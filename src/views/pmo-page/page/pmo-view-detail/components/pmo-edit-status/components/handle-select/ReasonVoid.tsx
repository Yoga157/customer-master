import React, { Fragment } from 'react';
import { combineValidators, composeValidators, createValidator } from 'revalidate';
import { Card, Form, Divider, Grid } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import PMOViewEditProjectStatusEditModel from 'stores/pmo/models/PMOViewEditProjectStatusEditModel';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import PMOEditStatusHook from '../../hooks/PMOEditStatusHook';
import { Button, RichTextEditor } from 'views/components/UI';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';
import IStore from 'models/IStore';

function ReasonVoid({ page, funnelGenID, projectId, projectStatusId }) {
  const { getProjectStatus } = PMOEditStatusHook({});

  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const getProject = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        getProjectStatus();
        resolve('resolved');
      }, 1000);
    });
  };

  const onSubmitHandler = (values) => {
    const newItems = new PMOViewEditProjectStatusEditModel(values);
    newItems.projectId = +projectId;
    newItems.projectStatusId = projectStatusId;
    newItems.modifyDate = new Date();
    newItems.modifyUserID = currentUser.employeeID;

    dispatch(PMOActions.putPMOProjectStatus(newItems)).then(() => {
      getProject().then((e) => {
        dispatch(ModalFirstActions.CLOSE());
      });
    });
  };

  const isValidReason = createValidator(
    (message) => (value) => {
      if (!value?.replace(/<[^>]*>?/gm, '')) {
        return message;
      } else if (value?.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '').trim() == '') {
        return message;
      }
    },
    'Reason is required!'
  );

  const validate = combineValidators({
    remark: composeValidators(isValidReason)(),
  });

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.PMO_VIEW_EDIT_STATUS]));

  return (
    <Fragment>
      <Fragment>
        <Card.Header>
          Reason{' '}
          <label style={{ color: 'red' }} className="mandatory">
            {' '}
            *
          </label>
        </Card.Header>
        <Divider></Divider>
      </Fragment>

      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        validate={validate}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid padded>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="pb-0">
                  <Field name="remark" component={RichTextEditor} placeholder="Eg. I wanna change this Project..." />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button className="mt-1  mb-2r mr-1" floated="right" color="blue" size="small" disabled={submitting || isRequesting}>
              Submit
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
}

export default ReasonVoid;

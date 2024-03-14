import React, { useEffect, useState } from 'react';

import { Grid, Form, Divider, Card } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import tinymce from 'tinymce';
import moment from 'moment';

import IPMORequirementCloseProject from 'selectors/pmo/models/IPMORequirementCloseProject';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectPMORequirementClosingProject } from 'selectors/pmo/PMOSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Button, RadioButton, RichTextEditor } from 'views/components/UI';
import ApprovalSMOModel from 'stores/pmo/models/ApprovalSMOModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';
import styles from './ApprovalSMO.module.scss';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: number;
  projectId: number;
}

const ApprovalSMO: React.FC<IProps> = ({ funnelGenID, projectId }) => {
  const dispatch: Dispatch = useDispatch();
  const [isApprove, setIsApprove] = useState('');

  const requirmentClosingProject: IPMORequirementCloseProject = useSelector((state: IStore) => selectPMORequirementClosingProject(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.PUT_APPROVAL_SMO]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {}, []);

  const onSubmitHandler = (values) => {
    const newItem = new ApprovalSMOModel({ ...values, projectId });
    newItem.isApprove = isApprove === 'APPROVED' ? true : false;
    newItem.modifyDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.approverUserID = currentUser.employeeID;

    dispatch(PMOActions.putApprovalSmo(newItem)).then(() => {
      dispatch(ModalFirstActions.CLOSE());
    });
  };

  const isValidRemark = createValidator(
    (message) => (value) => {
      var content = tinymce.get('remarkApproval')?.getContent({ format: 'text' });

      if (value && isApprove === 'REJECTED' && $.trim(content) == '') {
        return message;
      } else if (!value && isApprove === 'REJECTED') {
        return message;
      }
    },
    'Remark is required!'
  );

  const validate = combineValidators({
    remarkApproval: composeValidators(isValidRemark)(),
  });

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={validate}
      initialValues={requirmentClosingProject}
      render={({ handleSubmit, pristine, invalid, submitting }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header> SMO HANDOVER APPROVAL/REJECT</Card.Header>
          <Divider />
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column textAlign="center" className="FullGrid767">
                <Field
                  name="approve"
                  component={RadioButton}
                  label="APPROVE"
                  checked={isApprove === 'APPROVED'}
                  onChange={() => setIsApprove('APPROVED')}
                />
              </Grid.Column>
              <Grid.Column textAlign="center" className="FullGrid767">
                <Field
                  name="reject"
                  component={RadioButton}
                  label="REJECT"
                  checked={isApprove === 'REJECTED'}
                  onChange={() => setIsApprove('REJECTED')}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Field
                  name="remarkApproval"
                  editorId="remarkApproval"
                  mandatorys={isApprove === 'REJECTED' ? false : true}
                  component={RichTextEditor}
                  placeholder=""
                  labelName="Remark"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Grid className="ph-1-5r mt-1">
            <Grid.Row columns={1} centered className="pb-0">
              <Grid.Column textAlign="center" className="pb-0">
                <Button type="button" className="mr-1" size="small" onClick={() => dispatch(ModalFirstActions.CLOSE())}>
                  Cancel
                </Button>
                <Button className="" color="blue" size="small" disabled={!isApprove || submitting || isRequesting}>
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default ApprovalSMO;

import React, { useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Segment, Grid, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { SelectInput, RichTextEditor, NumberInput } from 'views/components/UI';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import IStore from 'models/IStore';
import * as PostsalesSupportActions from 'stores/postsales-support/PostsalesSupportActions';
import * as PaymentTypeActions from 'stores/payment-type/PaymentTypeActions';
import * as ReqDedicatedResourceActions from 'stores/funnel-dedicated-resource/ReqDedicatedResourceActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectPostsalesOptions } from 'selectors/select-options/PostsalesSupportSelector';
import { selectPaymentTypeOptions } from 'selectors/select-options/PaymentTypeSelector';
import ReqDedicatedResourceModel from 'stores/funnel-dedicated-resource/models/ReqDedicatedResourceModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  //history:History
}

const FunnelDedicatedResourceForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.reqDedicatedResource.refreshPage);

  const onSubmitHandler = (values: any) => {
    console.log(values);
    values.funnelGenID = viewFunnelCustomer.funnelGenID;
    values.createUserID = currentUser.employeeID;
    values.reqResourceGenID = 0;
    values.modifyUserID = currentUser.employeeID;
    values.createDate = Date.now;
    values.modifyDate = Date.now;

    const newItems = new ReqDedicatedResourceModel(values);
    dispatch(ReqDedicatedResourceActions.postRequestDedicatedResource(newItems));
  };

  useEffect(() => {
    dispatch(PostsalesSupportActions.requestPostsalesSupport());
    dispatch(PaymentTypeActions.requestPaymentType());
  }, [dispatch]);

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const postsalesSupportOptions = useSelector((state: IStore) => selectPostsalesOptions(state));
  const paymentTypeOptions = useSelector((state: IStore) => selectPaymentTypeOptions(state));

  if (bRefreshPage) {
    dispatch(ReqDedicatedResourceActions.requestDedicatedResourceByFunnelGenID(viewFunnelCustomer.funnelGenID, 1, 5));
    dispatch(ModalSecondLevelActions.CLOSE());
  }

  const onCancel = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };
  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={viewFunnelCustomer }
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Segment>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    name="engineerDeptID"
                    component={SelectInput}
                    placeholder="Engineer Dept."
                    labelName="Engineer Dept."
                    options={postsalesSupportOptions}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field name="numOfResource" component={NumberInput} placeholder="Num Of Resource" labelName="Num Of Resource" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="requirementDescription"
                    component={RichTextEditor}
                    placeholder="Requirement Description"
                    labelName="Requirement Description"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    name="projectBudget"
                    component={NumberInput}
                    placeholder="Project Budget"
                    labelName="Project Budget"
                    thousandSeparator={true}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="paymentType"
                    component={SelectInput}
                    options={paymentTypeOptions}
                    placeholder="Payment Type"
                    labelName="Payment Type"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Grid columns="equal">
            <Grid.Column>
              <Button color="green" floated="right" content="Submit" disabled={pristine || invalid} />
              <Button type="button" floated="right" content="Cancel" onClick={onCancel} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelDedicatedResourceForm;

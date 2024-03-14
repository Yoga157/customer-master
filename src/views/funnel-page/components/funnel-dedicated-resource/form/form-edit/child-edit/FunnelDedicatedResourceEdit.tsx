import React, { useState, useEffect } from 'react';
import { Grid, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Button, NumberInput, RichTextEditor, SelectInput } from 'views/components/UI';
import { selectPostsalesOptions } from 'selectors/select-options/PostsalesSupportSelector';
import * as ReqDedicatedResourceActions from 'stores/funnel-dedicated-resource/ReqDedicatedResourceActions';
import * as PostsalesSupportActions from 'stores/postsales-support/PostsalesSupportActions';
import * as PaymentTypeActions from 'stores/payment-type/PaymentTypeActions';
import { selectReqDedicatedResource } from 'selectors/funnel-dedicated-resource/ReqDedicatedResourceSelector';
import { selectPaymentTypeOptions } from 'selectors/select-options/PaymentTypeSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import ReqDedicatedResourceModel from 'stores/funnel-dedicated-resource/models/ReqDedicatedResourceModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  reqGenID: number;
}

const FunnelDedicatedResourceEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [disableComponent, setDisableComponent] = useState(true);
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.reqDedicatedResource.refreshPage);
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE_REQ_GEN_ID])
  );

  const onSubmitHandler = (values: any) => {
    values.funnelGenID = viewFunnelCustomer.funnelGenID;
    values.createUserID = currentUser.employeeID;
    values.reqResourceGenID = props.reqGenID;
    values.modifyUserID = currentUser.employeeID;
    values.createDate = Date.now;
    values.modifyDate = Date.now;

    const newItems = new ReqDedicatedResourceModel(values);
    dispatch(ReqDedicatedResourceActions.putRequestDedicatedResource(newItems));

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
  };

  useEffect(() => {
    dispatch(PostsalesSupportActions.requestPostsalesSupport());
    dispatch(PaymentTypeActions.requestPaymentType());
    dispatch(ReqDedicatedResourceActions.requestDedicatedResourceByReqGenID(props.reqGenID));
  }, [dispatch, props.reqGenID]);

  const postsalesSupportOptions = useSelector((state: IStore) => selectPostsalesOptions(state));
  const requestDedicatedResource = useSelector((state: IStore) => selectReqDedicatedResource(state));
  const paymentTypeOptions = useSelector((state: IStore) => selectPaymentTypeOptions(state));
  if (bRefreshPage) {
    dispatch(ReqDedicatedResourceActions.requestDedicatedResourceByFunnelGenID(viewFunnelCustomer.funnelGenID, 1, 5));
  }

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={requestDedicatedResource}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid padded>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field
                  name="engineerDeptID"
                  component={SelectInput}
                  placeholder="Engineer Dept."
                  labelName="Engineer Dept."
                  options={postsalesSupportOptions}
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="numOfResource"
                  component={NumberInput}
                  placeholder="Num Of Resource"
                  labelName="Num Of Resource"
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                {disableComponent && (
                  <Button basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />
                )}
                {!disableComponent && <Button basic compact icon="save" floated="right" />}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="requirementDescription"
                  component={RichTextEditor}
                  placeholder="Requirement Description"
                  labelName="Requirement Description"
                  disabled={disableComponent}
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
                  disabled={disableComponent}
                  thousandSeparator={true}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="paymentType"
                  component={SelectInput}
                  placeholder="Payment Type"
                  labelName="Payment Type"
                  disabled={disableComponent}
                  options={paymentTypeOptions}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelDedicatedResourceEdit;

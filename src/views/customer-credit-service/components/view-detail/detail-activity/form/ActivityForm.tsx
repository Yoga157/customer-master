import React, { Fragment } from 'react';
import { Grid, Form, Divider, Card } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { RichTextEditor, Button } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Dispatch } from 'redux';
import ActivityModel from 'stores/customer-credit-service/models/ActivityModel';
import { combineValidators, isRequired } from 'revalidate';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as CustomerCreditActions from 'stores/customer-credit-service/CustomerCreditActions';

interface IProps {
  salesID: number;
  fromForm: string;
}

const ActivityForm: React.FC<IProps> = ({ salesID, fromForm }) => {
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshActivity: boolean = useSelector((state: IStore) => state.customerCredit.refreshPage);

  const onSubmitHandler = (values: any) => {
    const funnelNotes = new ActivityModel(values);
    funnelNotes.salesID = +salesID;
    funnelNotes.createUserID = currentUser.employeeID;
    dispatch(CustomerCreditActions.postActivity(funnelNotes));
  };

  const validate = combineValidators({
    notes: isRequired('Notes'),
  });

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerCreditActions.REQUEST_INSERT_ACTIVITY]));

  if (bRefreshActivity) {
    dispatch(CustomerCreditActions.requestActivity(+salesID));
    
  }

  return (
    <Fragment>
      {fromForm === 'FormCancel' && (
        <Fragment>
          <Card.Header>Reason</Card.Header>
          <Divider></Divider>
        </Fragment>
      )}

      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        validate={validate}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid padded>
              <Grid.Row columns={1} className="pb-0">
                <Grid.Column className="mt-0">
                  <Button floated="right" color="blue" size="small" disabled={invalid || pristine}>
                    Submit
                  </Button>
                </Grid.Column>
                <Grid.Column className="pb-0">
                  <Field name="notes" component={RichTextEditor} placeholder="Notes" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ActivityForm;

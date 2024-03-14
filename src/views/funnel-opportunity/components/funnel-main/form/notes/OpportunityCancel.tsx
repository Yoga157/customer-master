import React, { Fragment } from 'react';
import { Grid, Form, Divider, Card } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { RichTextEditor, Button } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as FunnelActivityActions from 'stores/funnel-activity/FunnelActivityActions';
import { Dispatch } from 'redux';
import FunnelNotesModel from 'stores/funnel-activity/models/FunnelNotesModel';
import { combineValidators, isRequired } from 'revalidate';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';

interface IProps {
  fromForm: string;
}

const FunnelNotesForm: React.FC<IProps> = ({ fromForm }) => {
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshActivity: boolean = useSelector((state: IStore) => state.funnelActivity.refreshPage);
  const bRefreshFunnel: boolean = useSelector((state: IStore) => state.funnel.refreshPage);

  const validate = combineValidators({
    notes: isRequired('Notes'),
  });

  const handleSubmit = () =>{
    console.log('Submit Cancel');
  }

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES]));

  // if(bRefreshActivity){
  //     dispatch(FunnelActivityActions.requestFunnelActivities(+funnelGenID));
  //     if(fromForm === "FormCancel"){
  //         dispatch(FunnelActions.delFunnel(+funnelGenID,currentUser.employeeID))
  //     }
  // }

  // if(bRefreshFunnel)
  // {
  //     if(fromForm === "FormCancel"){
  //         dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID))
  //         dispatch(FunnelActions.requestFunnel(currentUser.employeeID,currentUser.role,'funnelGenID','descending', 1,15))
  //         dispatch(ModalFirstLevelActions.CLOSE());
  //     }
  // }

  return (
    <Fragment>
      {fromForm === 'FormCancel' && (
        <Fragment>
          <Card.Header>Reason</Card.Header>
          <Divider></Divider>
        </Fragment>
      )}

      <FinalForm
        onSubmit={handleSubmit}
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

export default FunnelNotesForm;

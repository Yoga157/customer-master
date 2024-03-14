import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as ActionPlanNotesActions from 'stores/actionplan-notes/ActionPlanNotesActions';
import { Dispatch } from 'redux';
import { History } from 'history';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card } from 'semantic-ui-react';
import { Button, RichTextEditor, LabelName, Tooltips } from 'views/components/UI';
import ActionPlanNotesModel from 'stores/actionplan-notes/models/ActionPlanNotesModel';
import classes from './ActionPlanNotesForm.module.scss';
import HistoryActionPlanList from '../table/HistoryActionPlanList';
import { combineValidators, isRequired } from 'revalidate';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import ReactHtmlParser from 'react-html-parser';
import { RouteComponentProps } from 'react-router-dom';
import './ActionPlanNotesFormStyle.scss';
import * as UserActions from 'stores/users/UserActions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface RouteParams {
  id: string;
  type: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const ActionPlanNotesForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const bRefreshPage: boolean = useSelector((state: IStore) => state.actionPlan.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const GetLocalUser = () => {
    const jsonString = localStorage.getItem('userLogin');
    let result = null as any;
    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    if (result !== null) {
      return result.userName;
    }
  };

  useEffect(() => {
    dispatch(UserActions.requestCurrentUser());
    dispatch(ActionPlanNotesActions.requestHistory(+props.match.params.id, props.match.params.type));
    dispatch(ActionPlanNotesActions.requestActionPlanById(+props.match.params.id, props.match.params.type));
  }, [dispatch]);

  const validate = combineValidators({
    comment: isRequired('comment'),
  });

  const actionPlan = useSelector((state: IStore) => state.actionPlan.firstData);

  const onClose = () => {
    window.close();
  };

  const onSubmitHandler = (values: ActionPlanNotesModel) => {
    values.accName = GetLocalUser();
    const newValues = new ActionPlanNotesModel(values);
    newValues.funnelGenID = actionPlan.funnelGenID.toString();
    newValues.sourceNotes = props.match.params.type;
    dispatch(ActionPlanNotesActions.postActionPlanNotes(newValues));
  };

  if (bRefreshPage) {
    dispatch(ActionPlanNotesActions.requestHistory(+props.match.params.id, props.match.params.type));
    dispatch(ToastsAction.add(`Submit Comment Success`, ToastStatusEnum.Success));
  }

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: ActionPlanNotesModel) => onSubmitHandler(values)}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} className="Unupdate">
          <div className="BgBlackCover"></div>
          <Card centered raised className={classes.Card}>
            <Card.Content>
              <Card.Header className="UnupdateHeader">
                {props.match.params.type} Details
                <Tooltips
                  content="Close this windows"
                  trigger={<Button basic type="button" compact icon="close" onClick={onClose} floated="right" circular />}
                />
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={3}>
                    <Field name="funnelGenID" component={LabelName} labelName="Funnel ID" values={actionPlan.funnelGenID} />
                  </Grid.Column>
                  <Grid.Column>
                    <Field name="lastUpdate" component={LabelName} labelName="Last Update" values={actionPlan.lastUpdate} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field name="projectName" component={LabelName} labelName="Project Name" values={actionPlan.projectName} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="FullNotif">
                  <Grid.Column className="LightYellowNotif">
                    <Field name="lastComment" component={LabelName} labelName="Last Comment" values={ReactHtmlParser(actionPlan.lastComment)} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className="UnupdateText">
                    <Field name="comment" component={RichTextEditor} placeholder="Comment" labelName="Comment" />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="pt-0">
                  <Grid.Column>
                    <Button disabled={pristine || invalid} color="blue" floated="right" content="Submit" />
                  </Grid.Column>
                </Grid.Row>
                <Card.Header as="h3" className="mt-0">
                  Comment History
                </Card.Header>
                <Grid.Row>
                  <Grid.Column className="pt-0">
                    <HistoryActionPlanList />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </Form>
      )}
    />
  );
};

export default ActionPlanNotesForm;

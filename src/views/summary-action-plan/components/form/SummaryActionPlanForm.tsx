import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as SummaryActionPlanActions from 'stores/summary-actionplan/SummaryActionPlanActions';
import { Dispatch } from 'redux';
import { History } from 'history';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card } from 'semantic-ui-react';
import { DropdownInput, Button, CheckBoxInput, RichTextEditor, LabelName, Tooltips } from 'views/components/UI';
import SummaryActionPlanModel from 'stores/summary-actionplan/models/SummaryActionPlanModel';
import classes from './SummaryActionPlanForm.module.scss';
import { combineValidators, isRequired } from 'revalidate';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import ReactHtmlParser from 'react-html-parser';
import { selectSubordinateOptions } from 'selectors/select-options/EmployeeSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import HistorySummaryActionPlanList from '../table/HistorySummaryActionPlanList';
import SubOrdinateTable from '../table/SubOrdinateTable';
import { RouteComponentProps } from 'react-router-dom';
import * as UserActions from 'stores/users/UserActions';
import './SummaryActionPlanFormStyle.scss';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface RouteParams {
  id: string;
  direktorat: string;
  domain: string;
  employeeID: string;
  year: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const SummaryActionPlanForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [disableSubOrdinate, setDisableSubOrdinate] = useState(false);
  const bRefreshPage: boolean = useSelector((state: IStore) => state.summaryActionPlan.refreshPage);

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

  const GetLocalUserID = () => {
    const jsonString = localStorage.getItem('userLogin');
    let result = null as any;
    if (jsonString !== null) {
      result = JSON.parse(jsonString);
    }

    if (result !== null) {
      return result.employeeID;
    }
  };

  useEffect(() => {
    dispatch(UserActions.requestCurrentUser());
    dispatch(
      SummaryActionPlanActions.requestSummaryActionPlanById(
        props.match.params.domain,
        props.match.params.id,
        +props.match.params.year,
        +props.match.params.employeeID,
        props.match.params.direktorat
      )
    );

    dispatch(SummaryActionPlanActions.requestHistory(+props.match.params.year, +props.match.params.employeeID));
    dispatch(
      SummaryActionPlanActions.requestSubordinate(
        props.match.params.id,
        +props.match.params.year,
        +props.match.params.employeeID,
        props.match.params.direktorat
      )
    );
    dispatch(EmployeeActions.requestDirectSubordinate(+props.match.params.employeeID));
  }, [dispatch]);

  //const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onClose = () => {
    window.close();
  };

  const validate = combineValidators({
    actionPlan: isRequired('Action Plan'),
  });
  const onChangeAll = (values: any) => {
    if (values === true) setDisableSubOrdinate(true);
    else setDisableSubOrdinate(false);
  };
  const summaryActionPlan = useSelector((state: IStore) => state.summaryActionPlan.firstData);
  const subordinateOptions = useSelector((state: IStore) => selectSubordinateOptions(state));

  const onSubmitHandler = (values: any) => {
    let subordinate = '';
    if (disableSubOrdinate) {
      //true
      subordinateOptions.map((result) => (subordinate = subordinate + ',' + result.value.toString()));
    } else {
      values.subOrdinate.map((result: any) => (subordinate = subordinate + ',' + result));
    }
    values.accName = subordinate.substring(1);

    const newValues = new SummaryActionPlanModel(values);
    newValues.month = summaryActionPlan.month;
    newValues.year = +props.match.params.year;
    newValues.actionPlan = values.actionPlan;
    newValues.userLoginID = GetLocalUserID();
    newValues.direktoratName = props.match.params.direktorat;

    dispatch(SummaryActionPlanActions.postActionSummaryPlan(newValues));
  };

  if (bRefreshPage) {
    dispatch(SummaryActionPlanActions.requestHistory(+props.match.params.year, +props.match.params.employeeID));
    dispatch(
      SummaryActionPlanActions.requestSubordinate(
        props.match.params.id,
        +props.match.params.year,
        +props.match.params.employeeID,
        props.match.params.direktorat
      )
    );
    dispatch(ToastsAction.add(`Submit Comment Success`, ToastStatusEnum.Success));
  }

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: SummaryActionPlanModel) => onSubmitHandler(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="SummaryAction">
          <div className="BgBlackCover"></div>
          <Card centered raised className={classes.Card}>
            <Card.Content>
              <Card.Header className="SummaryActionHeader">
                Summary Action Plan By Month
                <Tooltips
                  content="Close this windows"
                  trigger={<Button basic type="button" compact icon="close" onClick={onClose} floated="right" circular />}
                />
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Field name="month" component={LabelName} placeholder="Month" labelName="Month" values={summaryActionPlan.month} />
                  </Grid.Column>
                  <Grid.Column>
                    <Field name="year" component={LabelName} placeholder="Year" labelName="Year" values={+props.match.params.year} />
                  </Grid.Column>
                  <Grid.Column>
                    <Field name="quotaGPM" component={LabelName} labelName="Quota GPM" values={summaryActionPlan.quotaGPM.toLocaleString()} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Field
                      name="performanceGPM"
                      component={LabelName}
                      labelName="Performance GPM"
                      values={summaryActionPlan.performanceGPM.toLocaleString()}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Field name="gapGPM" component={LabelName} labelName="GAP GPM" values={summaryActionPlan.gapGPM.toLocaleString()} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="FullNotif">
                  <Grid.Column className="LightYellowNotif">
                    <Field
                      name="lastActionPlan"
                      component={LabelName}
                      labelName="Last Action Plan"
                      values={ReactHtmlParser(summaryActionPlan.lastActionPlan)}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="SummaryActionText">
                    <Field name="actionPlan" component={RichTextEditor} placeholder="Action Plan" labelName="Action Plan" />
                  </Grid.Column>
                  <Grid.Column>
                    <Field name="subOrdinate" component={DropdownInput} options={subordinateOptions} disabled={disableSubOrdinate} />
                    <Field name="allSubOrdinate" component={CheckBoxInput} label="All Subordinate" onChange={onChangeAll} />
                    <Button color="blue" floated="right" content="Submit" />
                  </Grid.Column>
                </Grid.Row>
                <Card.Header as="h3" className="mt-0 mb-0">
                  Your Direct Subordinate List
                </Card.Header>
                <Grid.Row>
                  <Grid.Column>
                    <SubOrdinateTable />
                  </Grid.Column>
                </Grid.Row>
                <Card.Header as="h3" className="mt-0">
                  History Action Plan
                </Card.Header>{' '}
                <br />
                <Grid.Row>
                  <Grid.Column className="pt-0">
                    <HistorySummaryActionPlanList />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <br />
            </Card.Content>
          </Card>
        </Form>
      )}
    />
  );
};

export default SummaryActionPlanForm;

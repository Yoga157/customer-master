import React, { useCallback, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, SelectInput, RichTextEditor, DateInput, DropdownInput, TextInput, SearchInputList, InfoInputEnter } from 'views/components/UI';
import * as ActivityTypeActions from 'stores/activity-type/ActivityTypeActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as FunnelActivityActions from 'stores/funnel-activity/FunnelActivityActions';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectActivityTypeOptionsExludeSyst } from 'selectors/select-options/ActivityTypeSelector';
import IStore from 'models/IStore';
import { selectEmployeeEmailOptions, selectEmployeeSearchOptions, selectCCSearchOptions } from 'selectors/select-options/EmployeeSelector';
import FunnelActivityModel from 'stores/funnel-activity/models/FunnelActivityModel';
import { selectFunnelActivity } from 'selectors/funnel-activity/FunnelActivitySelector';
import moment from 'moment';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { combineValidators, isRequired } from 'revalidate';

interface IProps {
  funnelGenID: string;
}
const FunnelActivityForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [activityName, setActivityName] = useState('');
  const [enabledMeeting, setEnabledMeeting] = useState(false);
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelActivity.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [sendToArr, setSendToArr] = useState([] as any);
  const [sendToArrName, setSendToArrName] = useState([] as any);
  const [ccArrEmail, setCCArrEmail] = useState([] as any);
  const [hideDate, setHideDate] = useState<boolean>(false);
  const [hideEndDate, setHideEndDate] = useState<boolean>(false);
  const [searchAssign, setSearchAssign] = useState('');
  const [searchCC, setSearchCC] = useState('');

  const onSubmitHandler = (values: any) => {
    let varSendTo = '';
    let varCC = '';
    const newItems = new FunnelActivityModel(values);
    newItems.funnelGenID = +props.funnelGenID;

    if (activityName === 'Meeting') {
      {
        newItems.ccToArr.map((arrValues: any) => (varCC = varCC.length > 0 ? varCC + ',' + arrValues.value : arrValues.value));
      }

      newItems.activityText1 = varCC;
      newItems.activityText2 = values.subject;
      newItems.activityText3 = values.venue;
    }

    {
      newItems.assignedToArr.map((arrValues: any) => (varSendTo = varSendTo.length > 0 ? varSendTo + ',' + arrValues.value : arrValues.value));
    }

    newItems.activityText4 = values.activityNotes;
    newItems.activityTitle = activityName;
    newItems.createUserID = currentUser.employeeID;
    newItems.assignedTo = varSendTo;
    newItems.activityStartTime = moment(values.activityStartTime).format();
    newItems.activityEndTime = moment(values.activityEndTime).format();

    dispatch(FunnelActivityActions.postActivity(newItems));
  };

  if (bRefreshPage) {
    dispatch(FunnelActivityActions.requestFunnelActivities(+props.funnelGenID));
    dispatch(ModalAction.CLOSE());
  }
  const onChangeActivityType = (event: any, data: any) => {
    const value = activityTypeOptions.filter((item: any) => {
      return item.value === event;
    });

    if (event === 25 || event === 141 || event === 26) {
      setHideDate(true);
    } else {
      setHideDate(false);
    }

    if (event === 26) {
      setHideEndDate(true);
    } else {
      setHideEndDate(false);
    }

    setActivityName(value[0].text);

    if (value[0].text === 'Meeting') {
      setEnabledMeeting(true);
    } else {
      setEnabledMeeting(false);
    }
  };

  const onCancelHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  useEffect(() => {
    dispatch(ActivityTypeActions.requestActivityType());
    //dispatch(EmployeeActions.requestEmployee());
  }, [dispatch]);

  const handleSearchChangeEmployee = useCallback(
    (e, data) => {
      setSearchAssign(data.value.trim());
    },
    [dispatch]
  );

  const onChangeEmployee = (value: any) => {
    if (value.length >= 2) {
      dispatch(EmployeeActions.requestEmployeeByName(value, ''));
    }
  };

  const onResultSelectEmployee = (data: any) => {
    setSendToArr([...sendToArr, data.result.price]);
    setSendToArrName([...sendToArrName, data.result.title]);
  };

  //CC
  const handleSearchChangeCC = useCallback(
    (e, data) => {
      setSearchCC(data.value.trim());
    },
    [dispatch]
  );

  const onChangeCC = (value: any) => {
    if (value.length >= 2) {
      dispatch(EmployeeActions.requestEmployeeByName(value, ''));
    }
  };

  const onResultSelectCC = (data: any) => {
    setCCArrEmail([...ccArrEmail, data.result.price]);
  };

  const onDelete = (values: any) => {
    console.log(values);
  };

  const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeSearchOptions(state));
  const ccStoreSearch = useSelector((state: IStore) => selectCCSearchOptions(state));
  const activityTypeOptions = useSelector((state: IStore) => selectActivityTypeOptionsExludeSyst(state));
  const funnelActivity = useSelector((state: IStore) => selectFunnelActivity(state));

  const validate = combineValidators({
    activityTypeID: isRequired('Activity Type'),
    // activityStartTime: isRequired('Start Date'),
    // activityEndTime: isRequired('End Date'),
    assignedToArr: isRequired('Assigned To'),
    activityNotes: isRequired('Notes'),
  });
  const validateMeeting = combineValidators({
    activityTypeID: isRequired('Activity Type'),
    subject: isRequired('Subject'),
    activityStartTime: isRequired('Start Date'),
    activityEndTime: isRequired('End Date'),
    assignedToArr: isRequired('Assigned To'),
    activityNotes: isRequired('Notes'),
    venue: isRequired('Venue'),
  });

  return (
    <FinalForm
      validate={enabledMeeting ? validateMeeting : validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={funnelActivity}
      render={({ handleSubmit, invalid, pristine }) => (
        // <Form onSubmit={handleSubmit}>
        <Form>
          <Card.Header>Activity / To For Project #</Card.Header>
          <Divider></Divider>

          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="activityTypeID"
                  component={SelectInput}
                  placeholder="Activity Type"
                  labelName="Activity Type"
                  options={activityTypeOptions}
                  onChanged={onChangeActivityType}
                />
              </Grid.Column>
              {enabledMeeting && (
                <Grid.Column className="FullGrid767">
                  <Field name="subject" component={TextInput} placeholder="Subject" labelName="Subject" />
                </Grid.Column>
              )}
            </Grid.Row>

            <Grid.Row columns="equal">
              {enabledMeeting && (
                <Grid.Column className="FullGrid767">
                  <Field
                    name="ccToArr"
                    component={SearchInputList}
                    placeholder="e.g.CC To"
                    labelName="CC To"
                    handleSearchChange={handleSearchChangeCC}
                    onKeyPress={(event) => {
                      if (event.charCode === 13) {
                        searchCC && onChangeCC(searchCC);
                      }
                    }}
                    results={ccStoreSearch}
                    listOnDelete={(list) => list?.filter((e) => e.value !== '').length === 0 && setSearchCC('')}
                  />
                  {searchCC.length === 0 && <InfoInputEnter />}
                </Grid.Column>
              )}

              <Grid.Column className="FullGrid767">
                <Field
                  name="assignedToArr"
                  component={SearchInputList}
                  placeholder="e.g.Assigned To"
                  labelName="Assigned To"
                  handleSearchChange={handleSearchChangeEmployee}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      searchAssign && onChangeEmployee(searchAssign);
                    }
                  }}
                  results={employeeStoreSearch}
                  listOnDelete={(list) => list?.filter((e) => e.value !== '').length === 0 && setSearchAssign('')}
                />
                {searchAssign.length === 0 && <InfoInputEnter />}
              </Grid.Column>
            </Grid.Row>

            {enabledMeeting && (
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Field
                    name="venue"
                    component={TextInput}
                    placeholder="Venue (offline meeting) / Link (online meeting)"
                    labelName="Venue (offline meeting) / Link (online meeting)"
                  />
                </Grid.Column>
              </Grid.Row>
            )}
            {hideDate ? null : (
              <Grid.Row columns="equal">
                <Grid.Column className="TimeTrue FullGrid767">
                  <Field name="activityStartTime" component={DateInput} labelName="Start Date" placeholder="e.g.09/09/2020" date={true} time={true} />
                </Grid.Column>
                <Grid.Column className="TimeTrue FullGrid767">
                  <Field name="activityEndTime" component={DateInput} labelName="End Date" placeholder="e.g.09/09/2020" date={true} time={true} />
                </Grid.Column>
              </Grid.Row>
            )}

            {hideEndDate && (
              <Grid.Row columns="equal">
                <Grid.Column width={8} className="TimeTrue FullGrid767">
                  <Field name="activityStartTime" component={DateInput} labelName="Start Date" placeholder="e.g.09/09/2020" date={true} time={true} />
                </Grid.Column>
              </Grid.Row>
            )}

            <Grid.Row>
              <Grid.Column>
                <Field name="activityNotes" component={RichTextEditor} placeholder="Notes" labelName="Notes" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal" padded>
            <Grid.Column>
              <Button color="blue" floated="right" content="button" onClick={handleSubmit} disabled={pristine || invalid} />
              <Button floated="right" content="Cancel" type="button" onClick={onCancelHandler} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelActivityForm;

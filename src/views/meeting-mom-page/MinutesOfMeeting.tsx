import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DropdownInput, TextInput } from 'views/components/UI';
import IFunnelActivitiesItem from 'selectors/funnel-activity/models/IFunnelActivitiesItem';
import moment from 'moment';
import { selectEmployeeEmailOptions } from 'selectors/select-options/EmployeeSelector';
import IStore from 'models/IStore';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import MomItems from './components/child-component/mom-items/MomItems';
import MeetingMomModel from 'stores/meeting-mom/models/MeetingMomModel';
import ActivityMeeting from 'stores/meeting-mom/models/ActivityMeeting';
import * as MeetingMomActions from 'stores/meeting-mom/MeetingMomActions';
import * as ModalActions from 'stores/modal/first-level/ModalFirstLevelActions';
import './MinutesOfMeetingStyle.scss';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  readonly funnelActivity: IFunnelActivitiesItem;
}

const MinutesOfMeeting: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [changeAttendees, setChangeAttendees] = useState(0);
  const onSubmitHandler = (values: any) => {
    const activityMeeting = new ActivityMeeting();
    const meetingMom = new MeetingMomModel(values);
    meetingMom.funnelActivityID = props.funnelActivity.funnelActivityID;
    //meetingMom.attendees = values.attendeesArr.join(',')

    if (changeAttendees > 0) meetingMom.attendees = values.attendeesArr.join(',');
    else meetingMom.attendees = activityMeetings.activityMomID === 0 ? props.funnelActivity.assignedToArr.join(',') : activityMeetings.attendees;

    activityMeeting.salesActivityMOM = meetingMom;
    activityMeeting.salesActivityMOMItems = activityMeetingMomItems.rows;
    activityMeeting.salesActivityMOM.createUserID = currentUser.employeeID;
    dispatch(MeetingMomActions.postMeetingMom(activityMeeting));

    localStorage.removeItem('meetingMomItems');

    dispatch(ModalActions.CLOSE());

    //console.log(activityMeeting);
  };

  const onCancel = () => {
    dispatch(ModalActions.CLOSE());
  };

  const onAttendees = (values: any) => {
    setChangeAttendees(1);
  };

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployee());
    dispatch(MeetingMomActions.requestMeetingMom(props.funnelActivity.funnelActivityID));
  }, [dispatch]);

  const assignedToOptions = useSelector((state: IStore) => selectEmployeeEmailOptions(state));
  const activityMeetings = useSelector((state: IStore) => state.meetingMom.firstData);
  const activityMeetingMomItems = useSelector((state: IStore) => state.meetingMomItems.listData);

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={activityMeetings}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header>MOM For Meeting On {moment(props.funnelActivity.activityStartTime).format('MMMM Do YYYY, h:mm:ss a')}</Card.Header>
          <Divider />

          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column className="ViewLabel ReadOnly">
                <Field
                  name="heldBy"
                  component={TextInput}
                  labelName="Held By"
                  placeholder="Held By"
                  disabled="true"
                  values={props.funnelActivity.createUsername}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel ReadOnly">
                <Field
                  name="startDate"
                  component={TextInput}
                  labelName="Start Meeting"
                  placeholder="Start Meeting"
                  disabled="true"
                  values={moment(props.funnelActivity.activityStartTime).format('lll')}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel ReadOnly">
                <Field
                  name="endDate"
                  component={TextInput}
                  labelName="End Meeting"
                  placeholder="End Meeting"
                  disabled="true"
                  values={moment(props.funnelActivity.activityEndTime).format('lll')}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="attendeesArr"
                  component={DropdownInput}
                  labelName="Attendees"
                  placeholder="e.g.Jhon Doe"
                  allowAdditions={true}
                  options={assignedToOptions}
                  onChanged={onAttendees}
                  values={activityMeetings.activityMomID === 0 ? props.funnelActivity.assignedToArr : activityMeetings.attendees.split(',')}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <MomItems activityMomID={activityMeetings.activityMomID} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns="equal" padded>
            <Grid.Column>
              <Button color="blue" floated="right" content="Submit" />
              <Button type="button" floated="right" content="Cancel" onClick={onCancel} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default MinutesOfMeeting;

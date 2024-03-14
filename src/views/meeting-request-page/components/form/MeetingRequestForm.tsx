import React, { useEffect, Fragment, useState, useCallback } from 'react';
import { SelectInput, TextInput, DateInput, Button, RichTextEditor, DropdownInput, SearchInputList } from '../../../components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as MeetingRequestAction from 'stores/meeting-request/MeetingRequestActions';
import { combineValidators, isRequired } from 'revalidate';
import MeetingRequestModel from 'stores/meeting-request/models/MeetingRequestModel';
import BankGaransiForm from 'views/bank-garansi-page/components/form/form-create/BankGaransiForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import moment from 'moment';
import { selectEmployeeEmailOptions, selectEmployeeSearchOptions, selectCCSearchOptions } from 'selectors/select-options/EmployeeSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';

interface IProps {
  confirmBG: number;
  funnelGenID: number;
  dealCloseDate: any;
}

const MeetingRequestForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [recipient, setRecipient] = useState('');
  const [carbonCopy, setCarbonCopy] = useState('');
  const [sendToArr, setSendToArr] = useState([] as any);
  const [sendToArrName, setSendToArrName] = useState([] as any);
  const [ccArrEmail, setCCArrEmail] = useState([] as any);
  const [endDateMeeting, setEndDateMeeting] = useState('' as any);

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployee());
  }, [dispatch]);

  const validate = combineValidators({
    sendTo: isRequired('Send To'),
    subject: isRequired('Subject'),
    startDate: isRequired('Start Date'),
    //endDate: isRequired('End Date'),
    venue: isRequired('Venue'),
    message: isRequired('Message'),
  });

  const onSubmitHandler = (values: MeetingRequestModel) => {
    let varSendTo = '';
    let varCC = '';
    values.funnelGenID = props.funnelGenID;
    values.activityID = 0;
    values.createUserID = currentUser.employeeID;
    values.startDate = moment(values.startDate).format();
    values.endDate = moment(values.endDate).format();

    {
      sendToArr.map((arrValues: any) => (varSendTo = varSendTo.length > 0 ? varSendTo + ',' + arrValues : arrValues));
    }

    {
      ccArrEmail.map((arrValues: any) => (varCC = varCC.length > 0 ? varCC + ',' + arrValues : arrValues));
    }

    values.sendTo = varSendTo;
    values.carbonCopy = varCC;

    dispatch(MeetingRequestAction.postMeetingRequest(values));

    if (props.confirmBG === 1) {
      dispatch(
        ModalAction.OPEN(<BankGaransiForm dealCloseDate={props.dealCloseDate} funnelGenID={props.funnelGenID} popupLevel={1} />, ModalSizeEnum.Small)
      );
    } else {
      dispatch(ModalAction.CLOSE());
    }

    localStorage.removeItem('funnelHeader');
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
    if (props.confirmBG === 1) {
      dispatch(
        ModalAction.OPEN(<BankGaransiForm dealCloseDate={props.dealCloseDate} funnelGenID={props.funnelGenID} popupLevel={1} />, ModalSizeEnum.Small)
      );
    } else {
      dispatch(ToastsAction.add(`Submit funnel success - Funnel ID:${props.funnelGenID}`, ToastStatusEnum.Success));
    }
  };

  const onChangeRecipient = (event: any, data: any) => {
    setRecipient(event);
  };

  const handleSearchChangeEmployee = useCallback(
    (e, data) => {
      onChangeEmployee(data.value);
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
      onChangeCC(data.value);
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

  const onChangeStartDate = (value: any) => {
    setEndDateMeeting(value);
  };

  const onChangeEndMeeting = (value: any) => {
    setEndDateMeeting(value);
  };

  const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeSearchOptions(state));
  const ccStoreSearch = useSelector((state: IStore) => selectCCSearchOptions(state));
  const recipientOptions = useSelector((state: IStore) => selectEmployeeEmailOptions(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [MeetingRequestAction.POST_MEETING_REQUEST]));
  return (
    <Fragment>
      <Card.Header>MEETING REQUEST</Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="sendTo"
                    component={SearchInputList}
                    placeholder="e.g.Send To"
                    labelName="Send To"
                    handleSearchChange={handleSearchChangeEmployee}
                    onResultSelect={onResultSelectEmployee}
                    results={employeeStoreSearch}
                    listItem={sendToArrName}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="carbonCopy"
                    component={SearchInputList}
                    placeholder="e.g.CC To"
                    labelName="CC To"
                    handleSearchChange={handleSearchChangeCC}
                    onResultSelect={onResultSelectCC}
                    results={ccStoreSearch}
                    listItem={ccArrEmail}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="subject" mandatory={false} component={TextInput} placeholder="e.g.Initial Meeting..." labelName="Subject" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    name="startDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Start Date"
                    mandatory={false}
                    onChange={onChangeStartDate}
                    date={true}
                    time={true}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field
                    name="endDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="End Date"
                    mandatory={false}
                    values={endDateMeeting}
                    onChange={onChangeEndMeeting}
                    date={true}
                    time={true}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="venue"
                    component={TextInput}
                    placeholder="e.g.Venue (for Offline Meeting)/Link (for Online Meeting)"
                    labelName="Venue"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="message" mandatorys={false} component={RichTextEditor} placeholder="e.g.Something..." labelName="Message" />
                </Grid.Column>
              </Grid.Row>
            </Grid>{' '}
            <br />
            <Button type="button" onClick={cancelClick}>
              Cancel
            </Button>
            <Button type="submit" color="blue" disabled={pristine || invalid}>
              Save
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default MeetingRequestForm;

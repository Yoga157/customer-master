import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Divider, Card } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, RichTextEditor, DropdownInput } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectEmployeeEmailOptions } from 'selectors/select-options/EmployeeSelector';
import MeetingMomItemModel from 'stores/meeting-mom-items/models/MeetingMomItemModel';
import * as MeetingMomItemActions from 'stores/meeting-mom-items/MeetingMomItemActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';

interface IProps {
  activityMomID: number;
}
const MomItemForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const bRefresh: boolean = useSelector((state: IStore) => state.meetingMomItems.refreshPage);
  const onSubmitHandler = (values: any) => {
    const newItems = new MeetingMomItemModel(values);
    newItems.activityMomID = props.activityMomID;
    newItems.pic = values.picArr.join(',');

    if (props.activityMomID > 0) {
      dispatch(MeetingMomItemActions.postMeetingMomItems(newItems));
    } else {
      dispatch(MeetingMomItemActions.postMeetingMomItemsLocal(newItems));
      dispatch(MeetingMomItemActions.requestMeetingMomItemsLocal());
    }

    dispatch(ModalSecondLevelActions.CLOSE());
  };

  if (bRefresh) {
    if (props.activityMomID > 0) {
      dispatch(MeetingMomItemActions.requestMeetingMomItems(props.activityMomID, 200, 1));
    }
  }

  const onCancelHandler = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };
  const picOptions = useSelector((state: IStore) => selectEmployeeEmailOptions(state));
  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Card.Header>Mom Item</Card.Header>
          <Divider />

          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Field name="topic" component={TextInput} placeholder="Topic" labelName="Topic" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field name="picArr" component={DropdownInput} placeholder="PIC" allowAdditions={true} options={picOptions} labelName="PIC" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field name="action" component={RichTextEditor} placeholder="Action" labelName="Action" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns="equal" padded>
            <Grid.Column>
              <Button color="blue" floated="right" content="Submit" />
              <Button type="button" floated="right" content="Cancel" onClick={onCancelHandler} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default MomItemForm;

import React, { useCallback, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as MeetingMomItemActions from 'stores/meeting-mom-items/MeetingMomItemActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'views/components/UI';
import MomItemTable from './table/MomItemTable';
import MomItemForm from './form/MomItemForm';
import IMeetingMomItemTable from 'selectors/meeting-mom-items/models/IMeetingMomItemTable';
import IStore from 'models/IStore';
import { selectMeetingMomItems } from 'selectors/meeting-mom-items/MeetingMomItemSelector';

interface IProps {
  activityMomID: number;
}
const MomItems: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const onOpenPopupChild = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );
  useEffect(() => {
    if (props.activityMomID === 0) {
      dispatch(MeetingMomItemActions.requestMeetingMomItemsLocal());
    } else {
      dispatch(MeetingMomItemActions.requestMeetingMomItems(props.activityMomID, 200, 1));
    }
  }, [dispatch, props.activityMomID]);

  const meetingMomItemsTable: IMeetingMomItemTable = useSelector((state: IStore) => selectMeetingMomItems(state));
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <Button
            type="button"
            icon="plus"
            floated="right"
            color="green"
            size="small"
            content="Add Mom Item"
            onClick={() => onOpenPopupChild(<MomItemForm activityMomID={props.activityMomID} />, ModalSizeEnum.Tiny)}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <MomItemTable tableData={meetingMomItemsTable} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default MomItems;

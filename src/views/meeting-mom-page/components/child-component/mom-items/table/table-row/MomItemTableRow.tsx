import React, { useState, Fragment } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import IMeetingMomItemTableRow from 'selectors/meeting-mom-items/models/IMeetingMomItemTableRow';
import * as MeetingMomItemActions from 'stores/meeting-mom-items/MeetingMomItemActions';
import IStore from 'models/IStore';

interface IProps {
  readonly rowData: IMeetingMomItemTableRow;
}

const MomItemTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);
  const bRefresh: boolean = useSelector((state: IStore) => state.meetingMomItems.refreshPage);
  const showConfirm = () => setOpenConfirm(true);
  const handleConfirm = (id: any) => {
    setOpenConfirm(false);
    if (props.rowData.activityMomID > 0) {
      dispatch(MeetingMomItemActions.deleteMeetingMomItems(props.rowData.activityMomItemsID));
    } else {
      dispatch(MeetingMomItemActions.deleteMeetingMomItemsLocal(props.rowData.activityMomItemsID));
    }
  };

  if (bRefresh) {
    if (props.rowData.activityMomID > 0) {
      dispatch(MeetingMomItemActions.requestMeetingMomItems(props.rowData.activityMomID, 200, 1));
    } else {
      dispatch(MeetingMomItemActions.requestMeetingMomItemsLocal());
    }
  }

  const handleCancel = () => setOpenConfirm(false);
  const { rowData } = props;
  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.activityMomItemsID}>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.topic}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.action)}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.pic.split(',').join('<br/>'))}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default MomItemTableRow;

import React, { useCallback } from 'react';
import { Item } from 'semantic-ui-react';
import IActionPlanNotesItem from 'selectors/actionplan-notes/models/IActionPlanNotesItem';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import MinutesOfMeeting from 'views/meeting-mom-page/MinutesOfMeeting';
import './HistoryActionPlanItemsStyle.scss';

interface IProps {
  readonly rowData: IActionPlanNotesItem;
}

const HistoryActionPlanItems: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  return (
    <Item key={rowData.logDate?.toString()} className="UnupdateAvatar">
      <Item.Image size="tiny" src={'/assets/UserDefault.svg'} />
      <Item.Content className="pl-1">
        <Item.Header as="a">{rowData.logUser}</Item.Header>
        <Item.Meta>{rowData.logDate}</Item.Meta>
        <Item.Description>{rowData.comment.length > 0 ? ReactHtmlParser(rowData.comment) : ''}</Item.Description>
        {}
      </Item.Content>
    </Item>
  );
};

export default HistoryActionPlanItems;

import React, { useCallback } from 'react';
import { Item } from 'semantic-ui-react';
import IFunnelActivitiesItem from 'selectors/funnel-activity/models/IFunnelActivitiesItem';
import ReactHtmlParser from 'react-html-parser'; 
import { Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';

interface IProps {
  readonly rowData: any;
}

const UserListItems: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData  } = props;
  const dispatch:Dispatch = useDispatch();
  const onShowForm = useCallback(
    (content:any, size:ModalSizeEnum): void => {
        dispatch(ModalAction.OPEN(content,size));
    },
    [dispatch]
);

  return (

    <Item key={rowData.funnelActivityID}>
      <Item.Image size="tiny" src={"/assets/no-avatar.png"} />
      <Item.Content>
            <Item.Header as='a'>{rowData.createUsername}</Item.Header>
            <Item.Meta>{rowData.displayTime}</Item.Meta>
              <Item.Description>
                {rowData.descriptions.length > 0 ? ReactHtmlParser(rowData.descriptions) : ""} 
              </Item.Description>
              
      </Item.Content>
  </Item>
  );
};

export default UserListItems;

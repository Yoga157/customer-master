import React, { useEffect, useState } from 'react';
import { Menu, Container, Dropdown, Image, Icon, DropdownMenu, DropdownDivider, DropdownHeader, DropdownItem, TabPane, Tab, Grid, GridColumn, Popup, List, ListContent, ListDescription, ListHeader, ListItem, ListIcon, Label, MenuItem } from 'semantic-ui-react';
import './NavBar.scss';
import { format, max } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Dispatch } from 'redux';
import * as UserActions from 'stores/users/UserActions';
import { Redirect } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import { History } from 'history';
import { Button, ButtonWhatsNew, Tooltips } from '../UI';
import * as WhatsNewActions from 'stores/whats-new/WhatsNewAction';
import GetAllLocalStorageFunnelFormEdit from 'views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/getAllLocalStorageFunnelFormEdit';
import RemoveAllLocalStorageFunnelFormEdit from 'views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/removeAllLocalStorageFunnelFormEdit';
import MenuNavLink from '../main-nav/components/MenuNavLink';

interface IProps {
  history: History;
}
export const NavBar: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { history } = props;
  const [localStoragFunnelFormEdit] = GetAllLocalStorageFunnelFormEdit();
  const [, setClearStorage] = RemoveAllLocalStorageFunnelFormEdit();

  useEffect(() => {
    dispatch(UserActions.requestCurrentUser());
    dispatch(WhatsNewActions.requestWhatsNew('Latest'));
  }, [dispatch]);

  const handleLeaveFunnelFormEdit = (route) => {
    const isLeave = window.confirm('Are you sure want to discard changes?');
    isLeave && setClearStorage(true);

    isLeave && history.push(route);
  };

  const onLogout = () => {
    if (localStoragFunnelFormEdit) {
      const isLeave = window.confirm('Are you sure want to discard changes?');
      if (isLeave) {
        dispatch(UserActions.postLogout());
        const timeout = setTimeout(() => {
          setClearStorage(true);
          history.replace(RouteEnum.Home);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      dispatch(UserActions.postLogout());
      const timeout = setTimeout(() => {
        history.replace(RouteEnum.Home);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  };

  const countUpdate = useSelector((state: IStore) => state.whatsNew.resultActions.resultObj);

  const [currentDate] = useState(new Date());

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const panes = [
    { menuItem: (
      <MenuItem key='messages'>
        All<Label circular color='red' key='red'>15</Label>
      </MenuItem>
      ), render: () => 
      <TabPane>
        <List relaxed>
          <ListItem>
            <ListIcon circular name='envelope' verticalAlign='top' />
            <ListContent>
              <ListHeader as='a'>Rato Tangela</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListIcon circular name='exclamation' verticalAlign='top' />
            <ListContent>
              <ListHeader as='a'>Funnel ID# 456789</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListIcon circular name='envelope' verticalAlign='top' />
            <ListContent className='NotifOpen'>
              <ListHeader as='a'>Muhammad Mualim</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListIcon circular name='envelope' verticalAlign='top' />
            <ListContent className='NotifOpen'>
              <ListHeader as='a'>Muhammad Mualim</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListContent>
              <Button fluid color='primary' size='mini'>View All</Button>
            </ListContent>
          </ListItem>
        </List>
      </TabPane> },
    { menuItem: (
      <MenuItem key='messages'>
        Message<Label circular color='red' key='red'>30</Label>
      </MenuItem>
    ), render: () => <TabPane>
        <List relaxed>
          <ListItem>
            <ListIcon circular name='envelope' verticalAlign='top' />
            <ListContent>
              <ListHeader as='a'>Rato Tangela</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListIcon circular name='envelope' verticalAlign='top' />
            <ListContent className='NotifOpen'>
              <ListHeader as='a'>Muhammad Mualim</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListIcon circular name='envelope' verticalAlign='top' />
            <ListContent className='NotifOpen'>
              <ListHeader as='a'>Muhammad Mualim</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListIcon circular name='envelope' verticalAlign='top' />
            <ListContent className='NotifOpen'>
              <ListHeader as='a'>Muhammad Mualim</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
          </ListItem>
          <ListItem>
            <ListContent>
              <Button fluid color='primary' size='mini'>View All</Button>
            </ListContent>
          </ListItem>
        </List>
      </TabPane>},
    { menuItem: (
      <MenuItem key='messages'>
        Need Action<Label circular color='red' key='red'>8</Label>
      </MenuItem>
    ), render: () => 
    <TabPane>
      <List relaxed>
        <ListItem>
          <ListIcon circular name='exclamation' verticalAlign='top' />
            <ListContent>
              <ListHeader as='a'>Funnel ID# 456789</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
        </ListItem>
        <ListItem>
          <ListIcon circular name='exclamation' verticalAlign='top' />
            <ListContent>
              <ListHeader as='a'>Funnel ID# 456789</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
        </ListItem>
        <ListItem>
          <ListIcon circular name='exclamation' verticalAlign='top' />
            <ListContent>
              <ListHeader as='a'>Funnel ID# 456789</ListHeader>
              <ListDescription as='a'>Lorem ipsum dolor sit amet consectetur. Nunc feugiat libero egestas viverra.</ListDescription>
              <ListDescription as='span'>04/03/2024 - 16:12</ListDescription>
            </ListContent>
        </ListItem>
        <ListItem>
            <ListContent>
              <Button fluid color='primary' size='mini'>View All</Button>
            </ListContent>
          </ListItem>
      </List>
    </TabPane> },
  ]

  return (
    <Menu fixed="top" inverted>
      <Container className="DisInlineBlock">
        <Menu.Item className="NoBorder UserNameNav pl-0 mt-1r-767" position="left">
          <ButtonWhatsNew iconName="info circle" iconColor="violet" countUpdate={countUpdate && countUpdate.rows.length} txtSys="System Update" />
        </Menu.Item>
        <Menu.Item className="MainTitleText NavCalendar">
          <Icon name="calendar" />
          {format(new Date(currentDate), 'dd MMMM yyyy')}
        </Menu.Item>

        <Menu.Item className="MainTitleText AvatarMar" position="right">
          <Popup 
          className='NotifPopUp pb-0' 
          wide 
          trigger={
          <div>
            <Icon className='mr-1' circular name='bell' />
            <Label className='DqNotifBadge' circular color='red' floating size='mini'>
              22
            </Label>
          </div>
        } 
          on='click' position='bottom right'>
            <Grid divided columns='equal'>
              <GridColumn className='p-0'>
                <Tab panes={panes} />
              </GridColumn>
            </Grid>
          </Popup>

          <Dropdown className="CuzUsrDropdown" icon="ellipsis vertical" pointing="top left" text={currentUser.fullName}>
            <Dropdown.Menu>
              {/*   <Dropdown.Item 
                                as={Link} 
                                to={`/profile/${currentUser.userName} `} 
                                text='My profile' 
                                icon='user'
                            /> */}
              <Dropdown.Item
                text="Quota Setting"
                icon="sliders horizontal"
                as={localStoragFunnelFormEdit ? null : MenuNavLink}
                to={RouteEnum.QuotaSetting}
                onClick={() => {
                  localStoragFunnelFormEdit && handleLeaveFunnelFormEdit(RouteEnum.QuotaSetting);
                }}
              />
              <Dropdown.Item text="Logout" icon="power" onClick={onLogout} />
            </Dropdown.Menu>
          </Dropdown>
          <Image className="AvatarPosition" avatar spaced="right" src={'/assets/user.png'} />
        </Menu.Item>

        <div className="FaqButton">
          <Tooltips
            position="bottom right"
            content="Go To FAQ Page"
            trigger={
              <Button circular color="yellow" icon="question circle outline" onClick={() => window.open('https://dqfaq.berca.co.id/', '_blank')} />
            }
          />
        </div>
      </Container>
    </Menu>
  );
};

export default NavBar;

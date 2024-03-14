import React, { useCallback } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import ISidebarContainerState from 'stores/sidebar-containers/models/ISidebarContainerState';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import classes from './Sidebarcontainers.module.scss';
import { Button } from '../UI';
interface IProps {}
const SidebarContainers: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const sidebar: ISidebarContainerState = useSelector((state: IStore) => state.sidebar);
  const dispatch: Dispatch = useDispatch();

  const onHide = useCallback((): void => {
    dispatch(SidebarContainerActions.CLOSE());
  }, [dispatch]);

  return (
    <Sidebar
      visible={sidebar.bOpen}
      direction="right"
      animation="overlay"
      vertical="true"
      className={classes.SideBar + '' + ' AdvSrcContainer '}
      onHide={onHide}
      width="wide"
    >
      <Button className={classes.CloseIcon} compact icon="close" floated="right" onClick={onHide} />
      {sidebar.content}
    </Sidebar>
  );
};

export default SidebarContainers;

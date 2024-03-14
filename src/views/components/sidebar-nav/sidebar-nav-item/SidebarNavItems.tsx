import React from 'react';
import { Fragment } from 'react';
import { Menu, Icon, Divider } from 'semantic-ui-react';

interface IProps {}

const SidebarNavItems: React.FC<IProps> = () => {
  return (
    <Fragment>
      <Menu.Item position="left" header></Menu.Item>
      <Menu.Item as="a" position="left">
        <Icon name="ellipsis vertical" position="left" size="large" />
      </Menu.Item>
      <Menu.Item as="a" position="left">
        <Icon name="user circle" position="left" size="large" />
      </Menu.Item>
      <Menu.Item as="a" position="left">
        <Icon name="setting" position="left" size="large" />
      </Menu.Item>
      <Menu.Item as="a" position="left">
        <Icon name="bell outline" position="left" size="large" />
      </Menu.Item>
      <Divider section />
      <Menu.Item as="a" position="left">
        <Icon name="snowflake outline" position="left" size="large" />
      </Menu.Item>
    </Fragment>
  );
};

export default SidebarNavItems;

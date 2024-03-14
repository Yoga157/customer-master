import React, { useEffect, Fragment, useState, useCallback } from 'react';
import { SelectInput, TextInput, Button, SearchInput, RichTextEditor, Tooltips, DateInput, SelectInputOpportunity } from 'views/components/UI';
import { Form, Grid, Card, Divider, DropdownProps, Dropdown, Icon } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSizeEnum from 'constants/ModalSizeEnum';
import { useDispatch, DispatchProp } from 'react-redux';
import './ConfirmBlackListStyle.scss';
interface IProps {
  customerName: string;
  customer: number;
  onSelectBlackList: (type: string, customer: number, customerName: string) => void;
}

const ConfirmBlackList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ContainerSelector = document.querySelector('body > div.ui.page.modals.dimmer.transition.visible.active > div > div')! as HTMLDivElement;
    ContainerSelector.style.background = '#595959';
    ContainerSelector.style.zIndex = '2000';
  }, []);

  const onCloseHandler = () => dispatch(ModalFirstLevelActions.CLOSE());
  const {customerName} = props
  const styles = {};

  return (
    <Fragment>
      <div style={{ display: 'flex', color: '#db2828', fontWeight: 'bold' }}>
        <Icon name="info circle" size="large" color="red" />
        <p style={{ color: '#db2828', fontWeight: 'bold' }}>WARNING: Black List Customer</p>
      </div>
      <Divider></Divider>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'white' }}>{customerName}</p>
        <p style={{ color: 'white', marginTop: 20, marginBottom: 20 }}>This customer in our black list customers</p>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button
            floated="right"
            content="I'll Take The Risk"
            type="button"
            onClick={() => {
              props.onSelectBlackList('take', props.customer, props.customerName);
              onCloseHandler();
            }}
          />
          <Button color="blue" content="Pick Another Customer" onClick={onCloseHandler} />
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmBlackList;

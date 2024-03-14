/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import WhatsNew from 'views/whats-new-page/WhatNew';
import IStore from 'models/IStore';
import { format } from 'date-fns';

const ButtonWhatsNew = (props: any) => {
  const dispatch: Dispatch = useDispatch();

  const countUpdate = useSelector((state: IStore) => state.whatsNew.resultActions.resultObj);
  console.log(countUpdate);

  const date = new Date();
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  // if (localStorage.getItem("todayUpdate")! > String(date.getTime())) {

  if (countUpdate.flagCheckUpdate == 0) {
    localStorage.setItem('modalFlag', 'no');
  }

  if (countUpdate.flagCheckUpdate == 1) {
    if (localStorage.getItem('modalFlag')! == 'no') {
      dispatch(ModalFirstLevelActions.OPEN(<WhatsNew funnelGenID={props} funnelItemsID={'0'} type="Add" />, ModalSizeEnum.Large));
      localStorage.setItem('modalFlag', 'yes');
    }
  }
  // }

  const whatsNew = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<WhatsNew funnelGenID={props} funnelItemsID={'0'} type="Add" />, ModalSizeEnum.Large));
  }, [dispatch]);
  return (
    <Button className="BtnWhatsNew" size="mini" floated="left" color="yellow" type="submit" onClick={whatsNew}>
      <Icon className="mr-0" name={props.iconName} color={props.iconColor} /> <strong>{props.countUpdate}</strong>
      <span> {props.txtSys}</span>
    </Button>
  );
};

export default ButtonWhatsNew;

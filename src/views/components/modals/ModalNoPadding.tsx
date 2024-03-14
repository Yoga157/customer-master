import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import * as ModalNoPaddingActions from 'stores/modal/no-padding/ModalNoPaddingActions';
import ModalContainerSecond from './ModalContainerSecond';
import IModalNoPaddingState from 'stores/modal/no-padding/models/IModalNoPaddingState';
import IStore from 'models/IStore';
import './NoPaddingStyles.scss';

interface IProps {
  isChild: boolean;
}

const ModalNoPadding: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const modal: IModalNoPaddingState = useSelector((state: IStore) => state.modalNoPadding);
  const dispatch: Dispatch = useDispatch();
  let historys = useHistory();
  const onClose = useCallback(
    (url: any): void => {
      if (url != '') {
        historys.push(url);
      }
      dispatch(ModalNoPaddingActions.CLOSE());
    },
    [dispatch]
  );

  return (
    <Modal closeIcon open={modal.bOpen} size={modal.size} closeOnDimmerClick={modal.closeOnDimmerClick} onClose={() => onClose(modal.url)} centered>
      <Modal.Content className="no-padding">{modal.content}</Modal.Content>
      <ModalContainerSecond />
    </Modal>
  );
};

export default ModalNoPadding;

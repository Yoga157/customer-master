import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import IModalSecondLevelState from 'stores/modal/second-level/models/IModalSecondLevelState';
import { Modal } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import ModalContainerThird from './ModalContainerThird';
import './ModalStyling.scss';

interface IProps {}

const ModalContainerSecond: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const modal: IModalSecondLevelState = useSelector((state: IStore) => state.modalSecondLevel);
  const dispatch: Dispatch = useDispatch();

  const onClose = useCallback((): void => {
    dispatch(ModalSecondLevelActions.CLOSE());
  }, [dispatch]);

  return (
    <Modal closeIcon open={modal.bOpen} size={modal.size} onClose={onClose} centered>
      <Modal.Content>{modal.content}</Modal.Content>
      <ModalContainerThird />
    </Modal>
  );
};

export default ModalContainerSecond;

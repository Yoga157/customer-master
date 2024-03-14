import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import IModalThirdLevelState from 'stores/modal/third-level/models/IModalThirdLevelState';
import { Modal } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import './ModalStyling.scss';

interface IProps {}

const ModalContainerThird: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const modal: IModalThirdLevelState = useSelector((state: IStore) => state.modalThirdLevel);
  const dispatch: Dispatch = useDispatch();

  const onClose = useCallback((): void => {
    dispatch(ModalThirdLevelActions.CLOSE());
  }, [dispatch]);

  return (
    <Modal closeIcon open={modal.bOpen} size={modal.size} onClose={onClose} centered>
      <Modal.Content>{modal.content}</Modal.Content>
    </Modal>
  );
};

export default ModalContainerThird;

import './ModalStyling.scss';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import IModalFirstLevelState from 'stores/modal/first-level/models/IModalFirstLevelState';
import { Modal } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalContainerSecond from './ModalContainerSecond';
import { useHistory  } from 'react-router-dom';


interface IProps {
  isChild: boolean;
}

const ModalContainers: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const modal: IModalFirstLevelState = useSelector((state: IStore) => state.modalFirstLevel);
  const dispatch: Dispatch = useDispatch();
  let historys = useHistory()

  const onClose = useCallback(
    (url:any): void => {
    if(url != '')
    {
      historys.push(url);
    }
    dispatch(ModalFirstLevelActions.CLOSE());
    
  }, [dispatch]);

  return (
    <Modal
      closeIcon={modal.closeIcon}
      open={modal.bOpen}
      closeOnEscape={modal.closeOnEscape}
      size={modal.size}
      onClose={() => onClose(modal.url)}
      closeOnDimmerClick={modal.closeOnDimmerClick}
      centered
    >
      <Modal.Content>{modal.content}</Modal.Content>
      <ModalContainerSecond />
    </Modal>
  );
};

export default ModalContainers;

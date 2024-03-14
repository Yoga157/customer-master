import ButtonMicro from '../components/UI/Button/ButtonMicro';
import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import AttachmentTable from './table/AttachmentTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Button, CheckBox, Pagination } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectAttachment, selectAttachmentAndAcceptenceTrue } from 'selectors/attachment/AttachmentSelector';
import AttachmentForm from './form/AttachmentForm';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import IAttachmentTable from 'selectors/attachment/models/IAttachmentTable';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ToastStatusEnum from 'constants/ToastStatusEnum';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import { useLocation } from 'react-router-dom';

interface IProps {
  modul: number;
  isLocalFirst: boolean;
  funnelGenID: string;
  popupLevel: number;
  page?: string;
}

const Attachment: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const { funnelGenID, popupLevel, isLocalFirst, modul, page } = props;
  const AttachmentResult = useSelector((state: IStore) => state.attachment.ResultActions);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const projectId = useLocation()?.pathname?.split('/')[3];

  useEffect(() => {
    if (isLocalFirst) {
      dispatch(AttachmentActions.requestAttachmentLocal());
    } else {
      if (page !== 'pmo-view-edit') {
        dispatch(AttachmentActions.requestAttachmentServer(+funnelGenID, modul, activePage, pageSize, currentUser.employeeID));
      } else {
        dispatch(AttachmentActions.getAttachmentAndtAcceptence(+funnelGenID, +projectId, activePage, pageSize, false)); // attachment
      }
    }
  }, [activePage, dispatch, funnelGenID, isLocalFirst, modul, pageSize]);

  useEffect(() => {
    if (AttachmentResult.errorNumber === '666') {
      if (page !== 'pmo-view-edit') {
        dispatch(ToastAction.add(AttachmentResult.message, ToastStatusEnum.Error));
      }
      dispatch(AttachmentActions.removeResult());
    }

    if (AttachmentResult.errorNumber === '0') {
      if (page !== 'pmo-view-edit') {
        dispatch(ToastAction.add(AttachmentResult.message, ToastStatusEnum.Success));
      }
      dispatch(AttachmentActions.removeResult());
      dispatch(ModalSecondLevelActions.CLOSE());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AttachmentResult]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  const onAddAttachment = useCallback((): void => {
    if (popupLevel === 1) {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <AttachmentForm modul={modul} isLocalFirst={isLocalFirst} popupLevel={popupLevel} funnelGenID={funnelGenID} />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 2) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <AttachmentForm modul={modul} isLocalFirst={isLocalFirst} popupLevel={popupLevel} funnelGenID={funnelGenID} page={page} />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 3) {
      dispatch(
        ModalThirdLevelActions.OPEN(
          <AttachmentForm modul={modul} isLocalFirst={isLocalFirst} popupLevel={popupLevel} funnelGenID={funnelGenID} />,
          ModalSizeEnum.Small
        )
      );
    }
  }, [popupLevel, dispatch, modul, isLocalFirst, funnelGenID]);

  const attachment: IAttachmentTable = useSelector((state: IStore) =>
    selectAttachment(state, [
      AttachmentActions.REQUEST_ATTACHMENT_LOCAL,
      AttachmentActions.REQUEST_ATTACHMENT_SERVER,
      AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL,
      AttachmentActions.POST_ATTACHMENT,
    ])
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentActions.REQUEST_ATTACHMENT_LOCAL,
      AttachmentActions.REQUEST_ATTACHMENT_SERVER,
      AttachmentActions.GET_ATTACHMENT_AND_ACCEPTENCE_TRUE,
    ])
  );
  const pmoAttachment = useSelector((state: IStore) => selectAttachmentAndAcceptenceTrue(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal">
          <Grid.Column>
            <h4 className="ml-m-1r">
              Attachment Documents {props.funnelGenID !== '0' && viewFunnelCustomer && 'for #' && viewFunnelCustomer.projectName}
            </h4>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          {/* <CheckBox label='Select All' onChange={onChecked}  />
                <ButtonMicro 
                    type='button'
                    icon='trash' 
                    color='yellow' 
                    floated="right" 
                    size='mini' 
                    content='Delete'
                /> */}
          <Grid.Column>
            <Button type="button" icon="plus" color="green" floated="right" size="small" content="Attach Document" onClick={onAddAttachment} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <AttachmentTable tableData={page !== 'pmo-view-edit' ? attachment : pmoAttachment} isLocalFirst={isLocalFirst} modul={modul} page={page} />
          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            totalPage={page !== 'pmo-view-edit' ? attachment.totalRow : pmoAttachment.totalRow}
            pageSize={pageSize}
          />
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default Attachment;

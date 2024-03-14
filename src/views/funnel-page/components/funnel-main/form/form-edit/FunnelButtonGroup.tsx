import './FunnelButtonGroupStyle.scss';
import { Button, Icon } from 'semantic-ui-react';
import React, { useCallback, useEffect } from 'react';
import FunnelActivityForm from 'views/funnel-page/components/funnel-activity/form/FunnelActivityForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import AttachmentForm from 'views/attachment-page/form/AttachmentForm';
import POCRequestForm from 'views/funnel-page/components/funnel-poc/form/form-create/POCRequestForm';
import FunnelDedicatedResource from 'views/funnel-page/components/funnel-dedicated-resource/FunnelDedicatedResource';
import BankGaransiForm from 'views/bank-garansi-page/admin/components/form/form-create/BankGaransiForm';
import FormTicket from 'views/ticket-page/page-ticket/components/form/FormTicket';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectViewFunnelStatus } from 'selectors/funnel/FunnelSelector';
import { History } from 'history';
import { useParams } from 'react-router-dom';

interface IProps {
  page: string;
  funnelgenid: string;
  history: History;
}

const FunnelButtonGroup: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const { funnelId, projectId } = useParams() as any;

  const onShowForm = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalFirstLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));

  return (
    <Button.Group color="blue" widths="5">
      <Button size="small" onClick={() => onShowForm(<FunnelActivityForm funnelGenID={props.funnelgenid} />, ModalSizeEnum.Small)}>
        <Icon name="add" />
        <p>Add To Do</p>
      </Button>
      <Button
        size="small"
        onClick={() =>
          onShowForm(<AttachmentForm modul={1} isLocalFirst={false} popupLevel={1} funnelGenID={props.funnelgenid} />, ModalSizeEnum.Small)
        }
      >
        <Icon name="attach" />
        <p>Attachment</p>
      </Button>

      {props.page !== 'pmo-view-edit' ? (
        <>
          <Button
            onClick={() => onShowForm(<POCRequestForm popupLevel={1} funnelGenID={+props.funnelgenid} />, ModalSizeEnum.Small)}
            disabled={currentUser.role !== 'Sales' && currentUser.role !== 'Sales Admin'}
          >
            <Icon name="users" />
            <p>Request POC</p>
          </Button>
          <Button
            size="small"
            onClick={() => onShowForm(<FunnelDedicatedResource />, ModalSizeEnum.Small)}
            disabled={currentUser.role !== 'Sales' && currentUser.role !== 'Sales Admin'}
          >
            <Icon name="talk" />
            <p>Req Dedicated Resource</p>
          </Button>
          <Button
            size="small"
            color="green"
            onClick={() =>
              onShowForm(
                <BankGaransiForm
                  history={props.history}
                  dealCloseDate={viewFunnelStatus.dealCloseDate!}
                  popupLevel={2}
                  popupFrom={'funnelgroup'}
                  funnelGenID={+props.funnelgenid}
                />,
                ModalSizeEnum.Small
              )
            }
            disabled={currentUser.role !== 'Sales' && currentUser.role !== 'Sales Admin'}
          >
            <Icon name="university" />
            <p>Bank Gurantee</p>
          </Button>
        </>
      ) : (
        <>
          <Button
            size="small"
            onClick={() =>
              dispatch(
                ModalFirstLevelActions.OPEN(<FormTicket type={'ADD NEW'} page="pmo-view-edit" projectId={projectId} />, ModalSizeEnum.FullScreen)
              )
            }
          >
            <Icon name="ticket" />
            <p>Add New Ticket</p>
          </Button>
        </>
      )}
    </Button.Group>
  );
};

export default FunnelButtonGroup;

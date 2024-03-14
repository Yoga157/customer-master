import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Icon, Item, Segment } from 'semantic-ui-react';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import FunnelTeamsSupport from 'views/funnel-page/components/funnel-teams/FunnelTeamsSupport';
import { selectPMOProjectViewEditStatus, selectSmoMappingList } from 'selectors/pmo/PMOSelector';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import PMOEditStatusHook from '../pmo-edit-status/hooks/PMOEditStatusHook';
import IPMOViewEditStatus from 'selectors/pmo/models/IPMOViewEditStatus';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import Attachment from 'views/attachment-page/Attachment';
import { ApprovalSMO, ResubmitRequire } from './childs';
import * as PMOActions from 'stores/pmo/PMOActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Tooltips } from 'views/components/UI';
import RouteEnum from 'constants/RouteEnum';
import './ButtonStikyViewEditPMO.scss';
import IStore from 'models/IStore';

const ButtonStikyViewEditPMO = (props) => {
  const dispatch: Dispatch = useDispatch();

  const { funnelId, projectId }: any = useParams();
  const [isShowBtnApproval, setIsShowBtnApproval] = useState(false);
  const [isShowBtnResubmit, setIsShowBtnResubmit] = useState(false);

  const pmoViewEditStatus: IPMOViewEditStatus = useSelector((state: IStore) => selectPMOProjectViewEditStatus(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const smoMappingList = useSelector((state: IStore) => selectSmoMappingList(state));

  const { statusProject } = PMOEditStatusHook({
    projectId: +projectId,
  });

  useEffect(() => {
    dispatch(PMOActions.reqGetByEntryKey('SMOMapping'));
  }, []);

  useEffect(() => {
    if (smoMappingList.length > 0 && currentUser.email) {
      const match = smoMappingList.find((e) => e.email === currentUser.email);

      if (pmoViewEditStatus.projectStatus?.toLowerCase() === 'handover to smo' && match) {
        setIsShowBtnApproval(true);
      } else if (pmoViewEditStatus.projectStatus?.toLowerCase() === 'handover to smo' && match && pmoViewEditStatus.isApprove === null) {
        setIsShowBtnApproval(true);
      } else {
        setIsShowBtnApproval(false);
      }

      if (
        currentUser.employeeID === pmoViewEditStatus.pmoId &&
        pmoViewEditStatus.projectStatus?.toLowerCase() === 'handover to smo' &&
        pmoViewEditStatus.isApprove === false
      ) {
        setIsShowBtnResubmit(true);
      } else {
        setIsShowBtnResubmit(false);
      }
    }
  }, [currentUser, smoMappingList, pmoViewEditStatus]);

  return (
    <div className={`StickyBtnGrupPMO`}>
      {isShowBtnApproval && (
        <Segment.Group
          className={`${pmoViewEditStatus.isApprove === null ? 'BtnApprovalPMO' : 'BtnApprovalPMO Diseble'}`}
          onClick={() =>
            pmoViewEditStatus.isApprove !== null
              ? null
              : dispatch(ModalAction.OPEN(<ApprovalSMO funnelGenID={+funnelId} projectId={+projectId} />, ModalSizeEnum.Mini))
          }
        >
          <Segment clearing inverted color="blue">
            <Icon name="check" />
            <Header as="h4">APPROVAL REQUIRED</Header>
          </Segment>
        </Segment.Group>
      )}

      {isShowBtnResubmit && (
        <Item
          className="item-resubmit-pmo"
          onClick={() => dispatch(ModalAction.OPEN(<ResubmitRequire funnelGenID={+funnelId} projectId={+projectId} />, ModalSizeEnum.Mini))}
        >
          <div className="icon">
            <RiCheckDoubleFill color="#55637A" viewBox="-3 -4 30 30" size={30} />
          </div>
          <Header as="h4">RESUBMIT REQUIRE</Header>
        </Item>
      )}

      <Segment.Group className={`StickyBtnGrupYellow`}>
        <Segment clearing inverted color="yellow">
          <Tooltips
            content="Attachment Document"
            trigger={
              <Link
                to="#"
                onClick={() =>
                  dispatch(
                    ModalAction.OPEN(
                      <Attachment modul={4} isLocalFirst={false} popupLevel={2} funnelGenID={funnelId} page="pmo-view-edit" />,
                      ModalSizeEnum.Small
                    )
                  )
                }
              >
                <Icon name="paperclip" />
              </Link>
            }
          />
        </Segment>
        <Segment clearing inverted color="yellow">
          <Tooltips
            content="Config Items"
            trigger={
              <Link
                to={{
                  pathname: RouteEnum.ConfigItemsProjectPO,
                  state: { page: 'pmo-view-edit', funnelGenID: funnelId, projectId: projectId },
                }}
              >
                <Icon name="cogs" />
              </Link>
            }
          />
        </Segment>
        <Segment clearing inverted color="yellow" onClick={() => localStorage.setItem('@sttsPMOProject', statusProject)}>
          <Tooltips
            content="Project Timeline"
            trigger={
              <Link
                to={{
                  pathname: RouteEnum.ProjectGundam,
                  state: { page: 'pmo-view-edit', funnelGenID: funnelId, projectId: projectId },
                }}
              >
                <Icon name="share alternate" />
              </Link>
            }
          />
        </Segment>
        <Segment clearing inverted color="yellow">
          <Tooltips
            content="Project Scope Statement"
            trigger={
              <Link
                to={{
                  pathname: RouteEnum.ProjectScopeStatement,
                  state: { page: 'pmo-view-edit', funnelGenID: funnelId, projectId: projectId },
                }}
              >
                <Icon name="file alternate outline" />
              </Link>
            }
          />
        </Segment>
        <Segment clearing inverted color="yellow">
          <Tooltips
            content="Ticket List"
            trigger={
              <Link
                to={{
                  pathname: RouteEnum.TicketList,
                  state: { page: 'pmo-view-edit', funnelGenID: funnelId, projectId: projectId },
                }}
              >
                <Icon name="ticket" />
              </Link>
            }
          />
        </Segment>
        <Segment clearing inverted color="yellow">
          <Tooltips
            content="Team For Project"
            trigger={
              <Link to="#" onClick={() => dispatch(ModalAction.OPEN(<FunnelTeamsSupport page="pmo-view-edit" />, ModalSizeEnum.Small))}>
                <Icon name="users" />
              </Link>
            }
          />
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default ButtonStikyViewEditPMO;

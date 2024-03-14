import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { Dispatch } from 'redux';

import { SelectFunnelStatus, DateName, Button, LabelName, Tooltips, LabelNameIC } from 'views/components/UI';
import PMOViewEditProjectStatusEditModel from 'stores/pmo/models/PMOViewEditProjectStatusEditModel';
import HistoryProjectStatusPMO from './components/history-project-status/HistoryProjectStatusPMO';
import IPMORequirementCloseProject from 'selectors/pmo/models/IPMORequirementCloseProject';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectEntryKeyValNumber } from 'selectors/select-options/PMOTypeSelector';
import { selectPMORequirementClosingProject } from 'selectors/pmo/PMOSelector';
import PMOEditStatusPlaceholder from '../placeholder/PMOEditStatusPlaceholder';
import NotifSelectStatus from './components/handle-select/NotifSelectStatus';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IPMOViewEditStatus from 'selectors/pmo/models/IPMOViewEditStatus';
import IOptionsData from 'selectors/select-options/models/IOptionsData';
import ReasonVoid from './components/handle-select/ReasonVoid';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastActions from 'stores/toasts/ToastsAction';
import PMOEditStatusHook from './hooks/PMOEditStatusHook';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as PMOActions from 'stores/pmo/PMOActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: string;
  projectId: string;
  history: History;
}

const PMOEditStatus: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID, projectId } = props;
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [require, setRequire] = useState(false);

  const requirmentClosingProject: IPMORequirementCloseProject = useSelector((state: IStore) => selectPMORequirementClosingProject(state));
  const projectStatus: IOptionsData[] = useSelector((state: IStore) => selectEntryKeyValNumber(state, 'pmo-project-status'));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.PMO_VIEW_EDIT_STATUS]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const resultActions: any = useSelector((state: IStore) => state.pmo.resultActions);
  const isAllow: any = useSelector((state: IStore) => state.pmo.isAllow);

  const { getProjectStatus, pmoViewEditStatus } = PMOEditStatusHook({
    projectId: +projectId,
  });

  const voidNotif = (projectStatusId: number) => {
    dispatch(
      ModalFirstActions.OPEN(
        <ReasonVoid page="pmo-view-edit" funnelGenID={funnelGenID} projectId={projectId} projectStatusId={projectStatusId} />,
        ModalSizeEnum.Tiny
      )
    );
  };

  const defaultNotif = (projectStatusId: number) => {
    dispatch(
      ModalFirstActions.OPEN(
        <NotifSelectStatus
          page="pmo-view-edit"
          status="completed"
          funnelGenID={funnelGenID}
          projectId={projectId}
          projectStatusId={projectStatusId}
        />,
        ModalSizeEnum.Tiny
      )
    );
  };

  const notifWithWarranty = (projectStatusId: number) => {
    dispatch(
      ModalFirstActions.OPEN(
        <NotifSelectStatus
          page="pmo-view-edit"
          status="ho-to-smo"
          funnelGenID={funnelGenID}
          projectId={projectId}
          projectStatusId={projectStatusId}
        />,
        ModalSizeEnum.Tiny
      )
    );
  };

  const onChangeStatus = (values: any) => {
    const status = projectStatus?.find((e) => e.value === values);
    !requirmentClosingProject.isAllowComplete && setRequire(true);

    switch (status?.text?.toLowerCase() as any) {
      case 'void':
        voidNotif(status?.value);
        break;
      case 'completed':
        defaultNotif(status?.value);
        break;
      case 'handover bs':
        notifWithWarranty(status?.value);
        break;
      case 'handover 3rd':
        notifWithWarranty(status?.value);
        break;
      case 'handover smo':
        notifWithWarranty(status?.value);
        break;
      default:
        setRequire(false);
        break;
    }
  };

  const onClearResult = (message: any, type: any) => {
    dispatch(PMOActions.reqViewEditProjectStatus(+projectId));
    dispatch(ToastActions.add(message, type));
    dispatch(PMOActions.clearResult());
    setDisableComponent(true);
  };

  const onSubmitHandler = (values: any) => {
    const newItems = new PMOViewEditProjectStatusEditModel(values);
    newItems.projectId = +projectId;
    newItems.modifyDate = new Date();
    newItems.modifyUserID = currentUser.employeeID;

    dispatch(PMOActions.putPMOProjectStatus(newItems)).then(() => {
      setDisableComponent(true);
    });
  };

  useEffect(() => {
    dispatch(PMOActions.getAllowUpdate(+projectId, currentUser.employeeID));
  }, []);

  useEffect(() => {
    setDisableComponent(true);
  }, [pmoViewEditStatus]);

  useEffect(() => {
    getProjectStatus();
    dispatch(FunnelActions.reqDataEntyKeyBy('ProjectStatus'));
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    if (resultActions.errorNumber === '666') {
      onClearResult(resultActions.message, ToastStatusEnum.Error);
    } else if (resultActions.errorNumber === '0') {
      onClearResult(resultActions.message, ToastStatusEnum.Success);
    }
  }, [dispatch, resultActions]);

  let form = <PMOEditStatusPlaceholder />;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={pmoViewEditStatus}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid stackable padded>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h4">
                    <Header.Content>
                      Project Details
                      {disableComponent && (
                        <Fragment>
                          {/* <Tooltips
                            content="History Funnel Status Details"
                            trigger={
                              <Button
                                basic
                                type="button"
                                compact
                                icon="history"
                                onClick={(e: Event) => dispatch(ModalFirstActions.OPEN(<HistoryProjectStatusPMO />, ModalSizeEnum.Small))}
                              />
                            }
                          /> */}

                          {/* <Tooltips
                              content="Request Project Open"
                              trigger={
                                <Button
                                  basic
                                  type="button"
                                  compact
                                  icon="lock"
                                  className="m-0r"
                                  onClick={(e: Event) =>
                                    // dispatch(ModalFirstLevel.OPEN(<RequestProjectOpen funnelGenID={+funnelGenID} />, ModalSizeEnum.Small))
                                    alert('Request Project Open')
                                  }
                                />
                              }
                            /> */}

                          <Tooltips
                            content="Edit Funnel Status Details"
                            trigger={
                              <Button
                                basic
                                type="button"
                                compact
                                icon="edit"
                                className="m-0r"
                                onClick={(e: Event) => setDisableComponent(false)}
                                disabled={(pmoViewEditStatus.isApprove !== null && !isAllow) || pmoViewEditStatus.isApprove}
                              />
                            }
                          />
                        </Fragment>
                      )}
                      {/* <Tooltips
                        content="Cancle Project"
                        trigger={<Button basic type="button" compact icon="close" className="m-0r" onClick={(e: Event) => alert('cancel project')} />}
                      /> */}
                      {/* <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />} /> */}
                      {!disableComponent && (
                        <Fragment>
                          <Tooltips
                            content="Cancel Update"
                            trigger={
                              <Button
                                type="button"
                                basic
                                compact
                                icon="cancel"
                                onClick={() => {
                                  dispatch(PMOActions.reqViewEditProjectStatus(+projectId));
                                  setDisableComponent(true);
                                  setRequire(false);
                                }}
                              />
                            }
                          />
                          {/* <Tooltips content="Save Update" trigger={<Button basic compact icon="save" />} /> */}
                          <Tooltips content="Save Update" trigger={<Button basic compact icon="save" disabled={require} />} />
                        </Fragment>
                      )}
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column className={' FullGrid767 HalfGrid1200 '} width={3}>
                  <Field
                    name="projectStatusId"
                    component={SelectFunnelStatus}
                    placeholder="e.g.On Hold"
                    labelName="Project Status"
                    options={projectStatus}
                    disabled={disableComponent}
                    onChanged={onChangeStatus}
                    bg="BgPMOStatusLabel"
                  />
                </Grid.Column>
                <Grid.Column className="HalfGrid1200" width={4}>
                  <Field
                    name="warrantyStatus"
                    component={LabelNameIC}
                    icon={
                      pmoViewEditStatus?.warrantyStatus === 'Not Active' ? (
                        <Icon name="close" size="mini" circular className=" bg-red" />
                      ) : (
                        <Icon name="check" size="mini" circular className=" bg-green" />
                      )
                    }
                    labelName="Warranty Status"
                    placeholder="e.g.01234"
                  />
                </Grid.Column>
                <Grid.Column className="HalfGrid1200" width={2}>
                  <Field name="funnelGenId" component={LabelName} labelName="Funnel No" placeholder="e.g.01234" />
                </Grid.Column>
                <Grid.Column className="HalfGrid1200" width={3}>
                  <Field
                    name="soDate"
                    component={DateName}
                    date={true}
                    labelName="SO/OI Date"
                    placeholder="09/09/2020"
                    disabled={true}
                    formated="MMM yyyy"
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767 HalfGrid1200">
                  <Field name="pmoName" component={LabelName} labelName="PMO/S" placeholder="e.g.Jhon Doe.." />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    );
  }
  return <Fragment>{form}</Fragment>;
};

export default PMOEditStatus;

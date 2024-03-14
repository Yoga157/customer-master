import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Segment, Grid, Icon, Header } from 'semantic-ui-react';
import { selectFunnel, selectViewFunnelStatus, selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { FunnelEditStatus, FunnelEditCustomer, FunnelEditCustomerPO, FunnelSoftwareEdit, FunnelEditCommissionIndex, FunnelEditOrderConfirm } from './child-edit/main-content';
import { History } from 'history';
import FunnelServiceArea from 'views/funnel-page/components/funnel-service-area/FunnelServiceArea';
import FunnelActivities from 'views/funnel-page/components/funnel-activity/FunnelActivities';
import FunnelCost from 'views/funnel-page/components/funnel-cost/FunnelCost';
import FunnelButtonGroup from './FunnelButtonGroup';

import {
  FunnelEditTotalSelling,
  FunnelEditCustomerDetails,
  FunnelEditAdditionalInfo,
  //FunnelEditSummaryActivity,
  FunnelEditCustomerPIC,
} from './child-edit/side-bar';
import FunnelTeamsSupport from 'views/funnel-page/components/funnel-teams/FunnelTeamsSupport';
import * as ButtonToggle from 'stores/funnel-sales-analyst/button-toggle/ButtonToggleActions';
import Attachment from 'views/attachment-page/Attachment';
import BankGaransi from 'views/bank-garansi-page/BankGaransi';
import { Tooltips } from 'views/components/UI';
import './FunnelFormEditStyle.scss';
import ProductService from 'views/funnel-page/components/product-service/ProductService';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as PssActions from 'stores/pss/PSSActions';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import FunnelTop from 'views/funnel-page/components/funnel-top/FunnelTop';
import { selectViewFunnelCustomerPO } from 'selectors/funnel/FunnelSelector';
import ApprovalSteps from './child-edit/main-content/approval-steps/ApprovalSteps';
import FormDirectManagerApproval from './child-edit/main-content/approval-steps/components/FormDirectManagerApproval';
import CardSubmitFunnel from './child-edit/main-content/approval-steps/components/CardSubmitFunnel';
import { selectFunnelStatusOptions } from 'selectors/select-options/FunnelStatusSelector';
import UseUnsaveChangeWarning from './child-edit/main-content/approval-steps/components/hooks/useUnsaveChangeWarning';
import GetAllLocalStorageFunnelFormEdit from './child-edit/main-content/approval-steps/components/hooks/getAllLocalStorageFunnelFormEdit';
import { showICEdit, presalesWorkflow } from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import HistoryGPM from '../../table/table-row/components/table/HistoryGPM';
import RouteEnum from 'constants/RouteEnum';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import axios from "axios";
import environment from "environment";
interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const FunnelFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [closeWin, setCloseWin] = useState(false);
  const [salesAnalys, setSalesAnalys] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [isPreselesByWorkflow, setIsPreselesByWorkflow] = useState(false);
  const [flagOrderConfirm, setFlagOrderConfirm] = useState(false)

  const commercialWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj?.commercialWorkflow);
  const serviceWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj?.serviceWorkflow);
  const isReqListPss: boolean = useSelector((state: IStore) => selectRequesting(state, [PssActions.GET_LIST_PSS]));
  const isPresalesWorkflow: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isPresalesWorkflow);
  const contractOfDateSA = useSelector((state: IStore) => state.funnelSalesAnalyst.contractOfDate);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const viewFunnelCustomerPO = useSelector((state: IStore) => selectViewFunnelCustomerPO(state));
  const funnelStatusOptions = useSelector((state: IStore) => selectFunnelStatusOptions(state));
  const showApprovalStep: boolean = useSelector((state: IStore) => state.buttonToggle.bOpen);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const isbOpen: boolean = useSelector((state: IStore) => state.modalFirstLevel.bOpen); // triger
  const funnel = useSelector((state: IStore) => selectFunnel(state));
  const listPSS = useSelector((state: IStore) => state.pss.PSSList);
  useEffect(() => {
    const controllerName =
      `FunnelSupportTeam/PagePermission?empID=` + currentUser.employeeID  + `&appsNumber=` + props.match.params.id; 
    axios
      .get(environment.api.funnel.replace(":controller", controllerName),{
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then((res) => {
        if(res.data === 0)
        {
          props.history.replace(RouteEnum.NotAuthorizedPage);
        }
      });
  },[])
  useEffect(() => {
    if (+props.match.params.id > 0) {
      dispatch(FunnelActions.requestFunnelById(+props.match.params.id));
      //dispatch(PssActions.getListPSS(1, 10, +props.match.params.id));

      dispatch(FunnelSalesAnalystActions.requestGetFunnelAnalystWorkflow(+props.match.params.id));
      dispatch(FunnelSalesAnalystActions.requestGetContractOfDateSA(+props.match.params.id));
    }
  }, [dispatch, props.match.params.id]);

  const onPopupSideMenu = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalAction.OPEN(content, size));
    },
    [dispatch]
  );

  const [isStorageAll] = GetAllLocalStorageFunnelFormEdit();

  useEffect(() => {
    if (
      funnelStatusOptions?.filter((funnel) => funnel.value === viewFunnelStatus.funnelStatusID && funnel.text.trim() === 'Sales Analysis').length > 0
    ) {
      setShowApproval(true);
    } else {
      setShowApproval(false);
    }

    setCloseWin(showHideBtnSubmitNApprove(viewFunnelStatus.funnelStatusID, 'submit'));
    setSalesAnalys(showHideBtnSubmitNApprove(viewFunnelStatus.funnelStatusID, 'approve'));
    // setCloseWin(true);
    // setSalesAnalys(true);
  }, [dispatch, currentUser, viewFunnelStatus, funnelStatusOptions, commercialWorkflow, serviceWorkflow, funnel, viewFunnelCustomerPO, isStorageAll]);

  const showHideBtnSubmitNApprove = (id: number, typeBtn: string): boolean => {
    let showBtnSubmitByReject: boolean = false;
    let btnApproveIsReject: boolean = true;
    let isResetOneLevel: boolean = false;
    let isSalesAnalis: boolean = false;
    let isCommercialReject: any = [];
    let isCloseWin: boolean = false;
    let isReOpen: boolean = false;
    let isServiceReject: any = [];
    let isCommercial: any = [];
    let isService: any = [];

    if (
      // viewFunnelCustomerPO?.so &&
      // viewFunnelStatus?.flagOpen?.toLowerCase() !== 'close' &&
      // viewFunnelStatus?.flagOpen?.toLowerCase() !== 'open' &&
      viewFunnelStatus?.flagOpen?.toLowerCase() === 'open' &&
      funnel?.commercialWorkflowStatus === 'COMPLETED' &&
      viewFunnelStatus?.salesID === currentUser.employeeID
    ) {
      // if (isStorageAll) {
      //   isResetOneLevel = true;
      // } else {
      //   isResetOneLevel = false;
      // }
      isResetOneLevel = true;
      // dispatch(FunnelActions.resetOneLevel(true));
    } else if (viewFunnelStatus?.flagOpen?.toLowerCase() === 'open' && funnel?.openProjectSAWorkflowStatus === 'APPROVED') {
      isReOpen = true;
    } else {
      isResetOneLevel = false;
      dispatch(FunnelActions.resetOneLevel(false));
    }

    if (funnelStatusOptions) {
      funnelStatusOptions.map(function(funnel) {
        if (funnel.value == id) {
          if (funnel.text.trim() === 'Sales Analysis') {
            isSalesAnalis = true;
          }
          if (funnel.text.trim() === 'Close Win') {
            isCloseWin = true;
          }
        }
      });
    }

    if (commercialWorkflow && commercialWorkflow.length > 0) {
      isCommercial = commercialWorkflow.filter(
        (commercial: any) =>
          commercial.employeeID === currentUser.employeeID && commercial.status === 'Waiting For Approval' && commercial.flagApprove === 1
      );
      isCommercialReject = commercialWorkflow.filter((commercial: any) => commercial.status === 'REJECTED');
    }

    if (serviceWorkflow && serviceWorkflow.length > 0) {
      isService = serviceWorkflow.filter(
        (service: any) => service.employeeID === currentUser.employeeID && service.status === 'Waiting For Approval' && service.flagApprove === 1
      );
      isServiceReject = serviceWorkflow.filter((service: any) => service.status === 'REJECTED');
    }

    if (isSalesAnalis && isCommercialReject.length === 0 && isServiceReject.length === 0 && !isReOpen && !isResetOneLevel) {
      dispatch(showICEdit(false));
    } else if ((isCommercialReject.length > 0 && isServiceReject.length > 0) || isCommercialReject.length > 0) {
      if (currentUser.employeeID === viewFunnelStatus.salesID) {
        showBtnSubmitByReject = true;
        dispatch(showICEdit(true));
      } else {
        dispatch(showICEdit(false));
        if (isService.length > 0) {
          btnApproveIsReject = true;
        } else {
          btnApproveIsReject = false;
        }
      }
    } else if (isServiceReject.length > 0) {
      if (currentUser.employeeID === viewFunnelStatus.salesID) {
        showBtnSubmitByReject = true;
        dispatch(FunnelActions.showIcNoEditGpm(true));
      } else {
        dispatch(FunnelActions.showIcNoEditGpm(false));
        dispatch(showICEdit(false));
        if (isCommercial.length > 0) {
          btnApproveIsReject = true;
        } else {
          btnApproveIsReject = false;
        }
      }
    } else {
      dispatch(showICEdit(true));
    }

    // console.log(showBtnSubmitByReject, 'showBtnSubmitByReject');
    // console.log(isReOpen, 'isReOpen');
    // console.log(isResetOneLevel, 'isResetOneLevel');

    if (typeBtn === 'submit') {
      return (isCloseWin && viewFunnelStatus.salesID === currentUser.employeeID) || showBtnSubmitByReject || isReOpen || isResetOneLevel;
    } else {
      return isSalesAnalis && (isCommercial.length > 0 || isService.length > 0) && btnApproveIsReject;
    }
  };

  useEffect(() => {
    if (commercialWorkflow?.length > 0 || serviceWorkflow?.length > 0) {
      dispatch(ButtonToggle.OPEN());
      setShowApproval(true);

      const findUser = commercialWorkflow.find((e) => e.employeeID === currentUser.employeeID);
      currentUser.role === 'Presales'
        ? typeof findUser === 'object' && findUser !== null && dispatch(presalesWorkflow(true))
        : dispatch(presalesWorkflow(false));
    } else {
      dispatch(ButtonToggle.CLOSE());
      setShowApproval(false);
    }
  }, [commercialWorkflow, serviceWorkflow]);

  let topStikyYellow: string | number;
  let stickyEndContractTop: string | number;
  if (closeWin && salesAnalys) {
    topStikyYellow = 235;
    currentUser.role !== 'Sales' && currentUser.role !== 'Sales Admin' ? (stickyEndContractTop = 446) : (stickyEndContractTop = 500);
  } else if (closeWin || salesAnalys) {
    topStikyYellow = 146;
    currentUser.role !== 'Sales' && currentUser.role !== 'Sales Admin' ? (stickyEndContractTop = 361) : (stickyEndContractTop = 413);
  } else {
    topStikyYellow = 68;
    currentUser.role !== 'Sales' && currentUser.role !== 'Sales Admin' ? (stickyEndContractTop = 283) : (stickyEndContractTop = 335);
  }

  const [currency, setCurrency] = useState('');
  // const getRate = (currency: string) => {
  //   setCurrency(currency);
  //   dispatch(FunnelActions.requestRate(currency, moment(new Date()).format('yyyy-MM-DD')));
  // };
 const handleCancle = () => {
    dispatch(ModalAction.CLOSE());
  };
  return (
    <Fragment>
      {showApproval && <ApprovalSteps funnelGenID={props.match.params.id} />}

      <Grid stackable columns={3} className={showApprovalStep ? 'container-funnel-form-edit' : ''}>
        <Grid.Column className="FullGrid1200" width={1}>
          <Grid className="btnApproveSubmit">
            <Grid.Column>
              {salesAnalys && (
                <Segment.Group
                  className="StickyBtnCheck"
                  onClick={() => onPopupSideMenu(<FormDirectManagerApproval funnelGenID={props.match.params.id} />, ModalSizeEnum.Mini)}
                >
                  <Segment clearing inverted color="blue">
                    <Icon name="check" />
                    <Header as="h4">Approve</Header>
                  </Segment>
                </Segment.Group>
              )}

              {closeWin && (
                <Segment.Group className="StickyBtnSubmit">
                  <Segment
                    clearing
                    inverted
                    loading={isReqListPss}
                    disabled={isReqListPss}
                    color="green"
                    onClick={() => {
                      // listPSS.rows[0]?.projectId
                      //   ?
                      onPopupSideMenu(<CardSubmitFunnel funnelGenID={props.match.params.id} />, ModalSizeEnum.Mini);
                      // : dispatch(ToastsAction.add('You need add project scope statement before submit.', ToastStatusEnum.Warning));
                    }}
                  >
                    <Icon name="save" />
                    <Header as="h4">Submit</Header>
                  </Segment>
                </Segment.Group>
              )}
            </Grid.Column>
          </Grid>

          <Segment.Group className={`StickyBtn`} style={{ top: topStikyYellow }}>
            <Segment clearing inverted color="yellow">
              <Tooltips
                content="Attachment Document"
                trigger={
                  <Link
                    to="#"
                    onClick={() =>
                      onPopupSideMenu(
                        <Attachment modul={0} isLocalFirst={false} popupLevel={2} funnelGenID={props.match.params.id} />,
                        ModalSizeEnum.Small
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
                content="Project Service Area"
                trigger={
                  <Link to="#" onClick={() => onPopupSideMenu(<FunnelServiceArea />, ModalSizeEnum.Large)}>
                    <Icon name="list" />
                  </Link>
                }
              />
            </Segment>
            <Segment clearing inverted color="yellow">
              <Tooltips
                content="Team For Project"
                trigger={
                  <Link to="#" onClick={() => onPopupSideMenu(<FunnelTeamsSupport page="funnel-view-edit" />, ModalSizeEnum.Small)}>
                    <Icon name="users" />
                  </Link>
                }
              />
            </Segment>

            {/* <Segment clearing inverted color="yellow">
              <Tooltips
                content={isReqListPss ? '...' : 'Project Scope Statement'}
                trigger={
                  isReqListPss ? (
                    <Icon name="warning circle" />
                  ) : listPSS.rows.length > 1 ? (
                    <Link
                      to={{
                        pathname: `/project-scope-list/${props.match.params.id}`,
                      }}
                    >
                      <Icon name="file alternate outline" />
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: RouteEnum.ProjectScopeStatement,
                        state: {
                          page: 'funnel-view-edit',
                          funnelGenID: props.match.params.id,
                          projectId: listPSS.rows[0]?.projectId ? listPSS.rows[0].projectId : 0,
                        },
                      }}
                    >
                      <Icon name="file alternate outline" />
                    </Link>
                  )
                }
              />
            </Segment> */}

            {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && (
              <Segment clearing inverted color="yellow">
                <Tooltips
                  content="Bank Guarantee/Referance"
                  trigger={
                    <Link
                      to="#"
                      onClick={() =>
                        onPopupSideMenu(
                          <BankGaransi history={props.history} popupLevel={2} funnelGenID={props.match.params.id} />,
                          ModalSizeEnum.Large
                        )
                      }
                    >
                      <Icon name="file" />
                    </Link>
                  }
                />
              </Segment>
            )}
          </Segment.Group>

          <Grid className={`btn-sticky-end-contract`} style={{ top: stickyEndContractTop }}>
            <Grid.Column>
              <Segment.Group className="end-contract">
                <Segment clearing inverted>
                  <Icon name="warning circle" />
                  {contractOfDateSA.contract !== 0 && <Header as="h4">Contract Out of Date !</Header>}
                </Segment>
              </Segment.Group>

              {contractOfDateSA.contract !== 0 && (
                <Segment.Group className="end-contract">
                  <Segment clearing inverted>
                    <Header as="h3">{contractOfDateSA.contract}</Header>
                    <Header as="h4">Days expired</Header>
                  </Segment>
                </Segment.Group>
              )}

              <Segment.Group className="end-contract">
                <Segment clearing inverted>
                  <Header as="h3">{contractOfDateSA.invoice}</Header>
                  <Header as="h4">% Invoiced</Header>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column width={11}>
          <FunnelEditStatus history={props.history} funnelGenID={props.match.params.id} />
          <Grid stackable>
            <Grid.Column className="mt-2px" width={7}>
              <FunnelEditCustomerPO page="funnel-view-edit" funnelGenID={props.match.params.id} />
            </Grid.Column>
            <Grid.Column width={9}>
              <Segment inverted className="lightBlue">
                <FunnelEditCustomer setFlagOrderConfirm={setFlagOrderConfirm} page="funnel-view-edit" funnelGenID={props.match.params.id} projectId={'0'} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={16}>
              <Segment inverted className="lightOrange">
                <FunnelEditCommissionIndex funnelGenID={props.match.params.id} />
              </Segment>
              <Segment inverted className="lightBlue">
                    <FunnelEditOrderConfirm flagOrderConfirm={flagOrderConfirm} page="funnel-view-edit" funnelGenID={props.match.params.id} projectId={'0'} />
              </Segment>
            </Grid.Column>    
          </Grid>

          <Grid className="mt-2r">
            <Grid.Row>
              <Grid.Column>
                <ProductService customerGenID={viewFunnelCustomer.endUserCustomerGenID} currency={currency} currentDate={viewFunnelStatus.createDate} funnelGenID={props.match.params.id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin' || isPresalesWorkflow) && (
            <Grid className="mt-2r">
              <Grid.Row>
                <Grid.Column>
                  <FunnelCost funnelGenID={props.match.params.id} funnelStatusID={viewFunnelStatus.funnelStatusID} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          <Grid className="mt-2r">
            <Grid.Row>
              <Grid.Column>
                <FunnelTop funnelGenID={props.match.params.id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin' || currentUser.role === 'Presales') && isSalesAnalis && (
            <Grid className="mt-2r">
              <Grid.Row>
                <Grid.Column className="FullGrid1200 historyGpmViewEdit">
                  <HistoryGPM funnelGenID={props.match.params.id} from="historyGpmViewEdit" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          <Grid className="mt-2r">
            <Grid.Row>
              <Grid.Column className="p-2r">
                <FunnelSoftwareEdit funnelGenID={props.match.params.id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid className="mt-2r">
            <Grid.Row>
              <Grid.Column>
                <FunnelButtonGroup page="funnel-view-edit" history={props.history} funnelgenid={props.match.params.id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid className="mt-2r">
            <Grid.Row>
              <Grid.Column>
                <FunnelActivities page="funnel-view-edit" funnelGenID={props.match.params.id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment inverted className="lightOlive">
            <FunnelEditTotalSelling setCurrency={setCurrency} funnelGenID={props.match.params.id} />
          </Segment>
          <Segment inverted className="lightYellow">
            <FunnelEditCustomerDetails page="funnel-view-edit" funnelGenID={+props.match.params.id} />
            <FunnelEditCustomerPIC page="funnel-view-edit" funnelGenID={+props.match.params.id} />
          </Segment>
          <Segment inverted className="lightRed">
            <FunnelEditAdditionalInfo funnelGenID={props.match.params.id} />
          </Segment>
          {/*   <Segment>
                    <FunnelEditSummaryActivity/>
                </Segment> */}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default withRouter(FunnelFormEdit);

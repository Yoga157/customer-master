import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectFunnelStatus, DateName, Button, LabelName, Tooltips } from 'views/components/UI';
import { funnelStatusOptions } from 'constants/funnelStatusOptions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectViewFunnelCustomerPO, selectViewFunnelStatus, selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import FunnelViewEditStatus from 'stores/funnel/models/view-edit/FunnelViewEditStatus';
import FunnelEditStatusPlaceholder from './FunnelEditStatusPlaceholder';
import SubmitVerificationData from '../../verification-data/SubmitVerificationData';
import * as ModalFirstLevel from 'stores/modal/first-level/ModalFirstLevelActions';
import * as FunnelStatusActions from 'stores/funnel-status/FunnelStatusActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import { selectFunnelStatusOptions } from 'selectors/select-options/FunnelStatusSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectTotalDocument } from 'selectors/attachment/AttachmentSelector';
import ProductServiceModel from 'stores/funnel-product-service/models/ProductServiceModel';
import { selectTotalSelling } from 'selectors/funnel-product-service/ProductServiceSelector';
import FunnelNotesForm from 'views/funnel-page/components/funnel-activity/form/FunnelNotesForm';
import { History } from 'history';
import { selectVerificationFunnels } from 'selectors/verification-funnel/VerificationFunnelSelector';
import AccordianFunnelStatus from './components/accordian/AccordianFunnelStatus';
import RequestProjectOpen from './components/form/RequestProjectOpen';
import CancelProject from './components/form/CancelProject';
import moment from 'moment';

interface IProps {
  funnelGenID: string;
  history: History;
}

const FunnelEditStatus: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [isRequestOpenProject, setRequestOpenProject] = useState(false);
  const [disableComponent, setDisableComponent] = useState(true);
  const [isCancleProject, setCancleProject] = useState(false);
  const [isCancleProjectBySAdmin, setCancleProjectBySAdmin] = useState(false);
  const [statusColor, setStatusColor] = useState('');
  const { funnelGenID } = props;

  const commercialWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj?.commercialWorkflow);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const viewFunnelCustomerPO = useSelector((state: IStore) => selectViewFunnelCustomerPO(state));
  const VerificationTableData = useSelector((state: IStore) => selectVerificationFunnels(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnel.refreshPage);
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const approval = useSelector((state: IStore) => state.funnelSalesAnalyst.isApproval);
  const [funnelStatus, setFunnelStatus] = useState(viewFunnelStatus.funnelStatusID);

  const onHeaderSubmitHandler = (e: Event) => {
    dispatch(FunnelActions.requestVerificationFunnel(+funnelGenID, viewFunnelStatus.funnelStatusID));
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onChangeStatus = (values: any) => {
    setFunnelStatus(values);
    if (values == 6) {
      dispatch(ModalFirstLevel.OPEN(<FunnelNotesForm funnelGenID={funnelGenID} fromForm="FormCancel" />, ModalSizeEnum.Tiny));
    } else {
      dispatch(FunnelActions.requestVerificationFunnel(+funnelGenID, values));
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
      dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID));
      setFunnelStatus(viewFunnelStatus.funnelStatusID);
    }
  };

  const onSubmitHandler = (values: any) => {
    const funnelViewEditStatus = new FunnelViewEditStatus({});
    funnelViewEditStatus.funnelGenID = +funnelGenID;
    funnelViewEditStatus.funnelID = viewFunnelStatus.funnelID;
    funnelViewEditStatus.funnelStatusID = funnelStatus === 0 ? viewFunnelStatus.funnelStatusID : funnelStatus;
    funnelViewEditStatus.salesName = viewFunnelStatus.salesName;
    funnelViewEditStatus.salesID = viewFunnelStatus.salesID;
    funnelViewEditStatus.dealCloseDate = values.dealCloseDate;
    funnelViewEditStatus.createDate = moment(new Date()).format('YYYY-MM-DD');

    //Sales Analysis editFormFunnel
    if (getSalesAnalis(funnelViewEditStatus.funnelStatusID)) {
      const getLocalEdit = JSON.parse(localStorage.getItem('editViewFunnelStatusEdit'));
      localStorage.setItem(
        'editViewFunnelStatusEdit',
        getLocalEdit ? JSON.stringify([...getLocalEdit, funnelViewEditStatus]) : JSON.stringify([funnelViewEditStatus])
      );

      dispatch(FunnelActions.funnelStatusActive(true));
    } else {
      dispatch(FunnelActions.putViewFunnelStatus(funnelViewEditStatus));
    }

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
  };

  useEffect(() => {
    dispatch(FunnelActions.requestVerificationFunnel(+funnelGenID, viewFunnelStatus.funnelStatusID));
    dispatch(FunnelSalesAnalystActions.checkUserReopenApproval(+funnelGenID, currentUser.employeeID));

    dispatch(FunnelStatusActions.requestFunnelStatus('EDIT'));
    if (funnelGenID.length > 0) {
      dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID));
      setFunnelStatus(viewFunnelStatus.funnelStatusID);
    }

    dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));

    localStorage.removeItem('editViewFunnelStatusEdit');
    localStorage.removeItem('splitPerFormance');
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    if (VerificationTableData.status === 'False') {
      const funnelViewEditStatus = new FunnelViewEditStatus({});
      funnelViewEditStatus.funnelGenID = +funnelGenID;
      dispatch(
        ModalFirstLevel.OPEN(
          <SubmitVerificationData onClose={onCancel} history={props.history} funnelStatus={funnelViewEditStatus} funnelgenid={funnelGenID} />,
          ModalSizeEnum.Tiny
        )
      );
    }
  }, [VerificationTableData.rows]);

  if (bRefreshPage) {
    dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID));
  }

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelActions.REQUEST_VIEW_FUNNEL_STATUS,
      FunnelActions.REQUEST_UPDATE_FUNNEL_STATUS,
      FunnelActions.REQUEST_FUNNEL,
      FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW,
    ])
  );

  const funnelStatusOptions = useSelector((state: IStore) => selectFunnelStatusOptions(state));
  const totalDocumentTechnical = useSelector((state: IStore) => selectTotalDocument(state, 'Document Technical'));
  const totalQuoteCustomer = useSelector((state: IStore) => selectTotalDocument(state, 'Quote Customer'));
  const funnelProductService: ProductServiceModel[] = useSelector((state: IStore) => state.funnelProductService.listData.rows);
  const totalSellingPrice = useSelector((state: IStore) => selectTotalSelling(state));
  const disabledSave = useSelector((state: IStore) => state.funnel.funnelVerificationStatus);

  useEffect(() => {
    if (getSalesAnalis(viewFunnelStatus.funnelStatusID)) {
      dispatch(FunnelActions.funnelStatusActive(true));
    } else {
      dispatch(FunnelActions.funnelStatusActive(false));
    }

    const isSalesAdmin = commercialWorkflow?.filter(
      (e) => e.employeeID === currentUser.employeeID && e.stepName === 'Sales Admin' && e.flagApprove === 1
    );
    if (isSalesAdmin?.length > 0) {
      setCancleProjectBySAdmin(true);
    } else {
      setCancleProjectBySAdmin(false);
    }

    (viewFunnelStatus?.flagOpen?.toLowerCase() === 'close' || approval?.isApproval === 1) && setRequestOpenProject(true);
  }, [dispatch, viewFunnelStatus, funnelStatusOptions, commercialWorkflow, approval]);

  const getSalesAnalis = (id: number): boolean => {
    let isSalesAnalis: boolean = false;
    if (funnelStatusOptions?.filter((funnel) => funnel.value === id && funnel.text.trim() === 'Sales Analysis').length > 0) {
      isSalesAnalis = true;
      setCancleProject(true);
    } else if (funnelStatusOptions?.filter((funnel) => funnel.value === id && funnel.text.trim() === 'Cancel').length > 0) {
      setCancleProject(false);
      setRequestOpenProject(false);
    } else {
      isSalesAnalis = false;
      setCancleProject(false);
    }

    return isSalesAnalis;
  };

  let form = <FunnelEditStatusPlaceholder />;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={viewFunnelStatus}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid stackable padded>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h4">
                    <Header.Content>
                      Funnel Details
                      {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin' || isRequestOpenProject) && disableComponent && (
                        <Fragment>
                          <Tooltips
                            content="History Funnel Status Details"
                            trigger={
                              <Button
                                basic
                                type="button"
                                compact
                                icon="history"
                                onClick={(e: Event) =>
                                  dispatch(
                                    ModalFirstLevel.OPEN(<AccordianFunnelStatus funnelGenID={viewFunnelStatus.funnelGenID} />, ModalSizeEnum.Small)
                                  )
                                }
                              />
                            }
                          />

                          {isRequestOpenProject && (
                            <Tooltips
                              content="Request Project Open"
                              trigger={
                                <Button
                                  basic
                                  type="button"
                                  compact
                                  icon="lock"
                                  className="m-0r"
                                  onClick={(e: Event) =>
                                    dispatch(ModalFirstLevel.OPEN(<RequestProjectOpen funnelGenID={+funnelGenID} />, ModalSizeEnum.Small))
                                  }
                                />
                              }
                            />
                          )}

                          {!getSalesAnalis(viewFunnelStatus.funnelStatusID) && (
                            <Tooltips
                              content="Edit Funnel Status Details"
                              trigger={
                                <Button basic type="button" compact icon="edit" className="m-0r" onClick={(e: Event) => onHeaderSubmitHandler(e)} />
                              }
                            />
                          )}
                        </Fragment>
                      )}
                      {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin' || currentUser.role === 'Admin') && disableComponent && (
                        <>
                          {((isCancleProject && viewFunnelStatus.salesID === currentUser.employeeID) || isCancleProjectBySAdmin) && (
                            <Tooltips
                              content="Cancel Project"
                              trigger={
                                <Button
                                  basic
                                  type="button"
                                  compact
                                  icon="close"
                                  className="m-0r"
                                  disabled={viewFunnelCustomer.projectCategory === "Billing AWS" }
                                  onClick={(e: Event) =>
                                    dispatch(ModalFirstLevel.OPEN(<CancelProject funnelGenID={+funnelGenID} />, ModalSizeEnum.Tiny))
                                  }
                                />
                              }
                            />
                          )}
                        </>
                      )}
                      {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && disableComponent && (
                        <>
                          {JSON.parse(localStorage.getItem('editViewFunnelStatusEdit')) && (
                            <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />} />
                          )}
                        </>
                      )}
                      {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && !disableComponent && (
                        <Fragment>
                          <Tooltips content="Cancel Update" trigger={<Button type="button" basic compact icon="cancel" onClick={onCancel} />} />
                          <Tooltips
                            content="Save Update"
                            trigger={<Button basic compact icon="save" disabled={VerificationTableData.status == 'True' ? false : true} />}
                          />
                        </Fragment>
                      )}
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column className={statusColor + '' + ' FullGrid767 HalfGrid1200 '} width={3}>
                  <Field
                    name="funnelStatusID"
                    component={SelectFunnelStatus}
                    placeholder="e.g.Above Funnel"
                    labelName="Funnel Status"
                    options={!disableComponent ? funnelStatusOptions.filter((s) => s.text !== 'Sales Analysis') : funnelStatusOptions}
                    disabled={disableComponent}
                    onChanged={onChangeStatus}
                    toolTipPosition="top left"
                    bg="BgFunnelStatusLabel"
                    toolTipContents={
                      <div>
                        <Header as="h4">
                          Above Funnel
                          <Header.Subheader>Your first email, call, meeting, or other contact with the lead. No details required.</Header.Subheader>
                        </Header>
                        <Header as="h4">
                          In Funnel
                          <Header.Subheader>When you`ve send quotation to the customer. Deal Close Date Within 6 Months</Header.Subheader>
                        </Header>
                        <Header as="h4">
                          Best Few
                          <Header.Subheader>When you`ve send quotation to the customer. Deal Close Date Within 3 Months</Header.Subheader>
                        </Header>
                        <Header as="h4">
                          Close Win
                          <Header.Subheader>Close Win when you`ve PO from Customer.</Header.Subheader>
                        </Header>
                        <Header as="h4">
                          Close Lose
                          <Header.Subheader>Close Lose when you lose the opportunity.</Header.Subheader>
                        </Header>
                      </div>
                    }
                  />
                </Grid.Column>
                <Grid.Column className="HalfGrid1200" width={2}>
                  <Field name="funnelID" component={LabelName} labelName="Funnel No" placeholder="e.g.01234" values={viewFunnelStatus.funnelID} />
                </Grid.Column>
                <Grid.Column className="HalfGrid1200" width={3}>
                  <Field
                    name="dealCloseDate"
                    component={DateName}
                    date={true}
                    labelName="Deal Close Date"
                    placeholder="09/09/2020"
                    disabled={disableComponent}
                    formated="MMM yyyy"
                    toolTipPosition="bottom center"
                    toolTipContents="Estimate Project Close Date, not more than 1 year.
                                In Funnel Stage deal close date within 6 months, Best Few stage deal
                                close date within 3 months. When you close the funnel, deal close
                                date will auto update with the current date."
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767 HalfGrid1200">
                  <Field name="salesName" component={LabelName} labelName="Sales Name" placeholder="e.g.Jhon Doe.." />
                </Grid.Column>
                <Grid.Column className="FullGrid767 HalfGrid1200">
                  <Field name="deptName" component={LabelName} labelName="Department Name" placeholder="e.g.NI.." />
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

export default FunnelEditStatus;

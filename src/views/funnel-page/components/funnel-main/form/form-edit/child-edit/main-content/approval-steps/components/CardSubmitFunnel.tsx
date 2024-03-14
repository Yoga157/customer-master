import React, { Fragment, useEffect } from 'react';
import { Dispatch } from 'redux';
import { Form, Card, Divider, Grid, Header } from 'semantic-ui-react';
import { Button, RichTextEditor } from 'views/components/UI';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import IStore from 'models/IStore';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastAction from 'stores/toasts/ToastsAction';
import IUserResult from 'selectors/user/models/IUserResult';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelCostService from 'stores/funnel-cost/COSTAction';
import { selectRows } from 'selectors/funnel-cost/FunnelCostSelector';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import ResubmitFunnelModel from 'stores/funnel/models/ResubmitFunnelModel';
import CustomerPICModel from 'stores/customer-pic/models/CustomerPICModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ResubmitFunnelsModel from 'stores/funnel/models/ResubmitFunnelsModel';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import FunnelViewEditStatus from 'stores/funnel/models/view-edit/FunnelViewEditStatus';
import GetAllLocalStorageFunnelFormEdit from './hooks/getAllLocalStorageFunnelFormEdit';
import ProductServiceModel from 'stores/funnel-product-service/models/ProductServiceModel';
import FunnelEditCustomerModel from 'stores/funnel/models/view-edit/FunnelViewEditCustomer';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import SalesAnalystModel from 'stores/funnel-sales-analyst/funnel-sa/models/SalesAnalystModel';
import RemoveAllLocalStorageFunnelFormEdit from './hooks/removeAllLocalStorageFunnelFormEdit';
import ResubmitFunnelHeaderNameModel from 'stores/funnel/models/ResubmitFunnelHeaderNameModel';
import { FunnelViewEditCustomerPO, FunnelViewEditSelling } from 'stores/funnel/models/view-edit';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import {
  selectFunnel,
  selectViewFunnelCustomer,
  selectViewFunnelCustomerPO,
  selectViewFunnelSelling,
  selectViewFunnelStatus,
} from 'selectors/funnel/FunnelSelector';

interface IProps {
  funnelGenID: string;
  page?: string;
  type?: string;
}

const CardSubmitFunnel: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID, page, type } = props;
  const dispatch: Dispatch = useDispatch();
  const [isStorageAll] = GetAllLocalStorageFunnelFormEdit();
  const [, removeAllStorage] = RemoveAllLocalStorageFunnelFormEdit();

  const funnel = useSelector((state: IStore) => selectFunnel(state));
  const funnelCost: any[] = useSelector((state: IStore) => selectRows(state));
  const isResetOneLevel = useSelector((state: IStore) => state.funnel.isResetOneLevel);
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const viewFunnelSelling = useSelector((state: IStore) => selectViewFunnelSelling(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const resultMessage = useSelector((state: IStore) => state.funnelSalesAnalyst.resultActions);
  const viewFunnelCustomerPO = useSelector((state: IStore) => selectViewFunnelCustomerPO(state));
  const funnelProductService: ProductServiceModel[] = useSelector((state: IStore) => state.funnelProductService.listData.rows);
  const commercialWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj?.commercialWorkflow);
  const serviceWorkflowWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj?.serviceWorkflow);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMIT,
      FunnelSalesAnalystActions.REQUEST_PUT_FUNNEL_SALES_ANALYST_RESUBMIT,
    ])
  );
  const onCloseHandler = () => {
    
    dispatch(ModalAction.CLOSE());
  };

  const localFunnelStatus = JSON.parse(localStorage.getItem('editViewFunnelStatusEdit'));
  const funnelStatusState = new FunnelViewEditStatus(localFunnelStatus ? localFunnelStatus[localFunnelStatus.length - 1] : viewFunnelStatus);

  const localFunnelEditCustomer = JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit'));
  const funnelEditCustomerState = new FunnelEditCustomerModel(
    localFunnelEditCustomer ? localFunnelEditCustomer[localFunnelEditCustomer.length - 1] : viewFunnelCustomer
  );

  const localViewFunnelSelling = JSON.parse(localStorage.getItem('editViewFunnelSellingEdit'));
  const viewFunnelSellingState = new FunnelViewEditSelling(
    localViewFunnelSelling ? localViewFunnelSelling[localViewFunnelSelling.length - 1] : viewFunnelSelling
  );

  const localViewFunnelCustomerPO = JSON.parse(localStorage.getItem('editViewFunnelCustomerPOEdit'));
  const viewFunnelCustomerPOState = new FunnelViewEditCustomerPO(
    localViewFunnelCustomerPO ? localViewFunnelCustomerPO[localViewFunnelCustomerPO.length - 1] : viewFunnelCustomerPO
  );

  const salesFunnel = () => {
    const salesFunnel = new ResubmitFunnelModel({
      ...funnelStatusState,
      ...funnelEditCustomerState,
      ...viewFunnelSellingState,
      ...viewFunnelCustomerPOState,
      deliveryDate: funnelEditCustomerState.deliveryDate ? funnelEditCustomerState.deliveryDate : new Date(),
      currency: viewFunnelSellingState.currency ? viewFunnelSellingState.currency : 'IDR',
      funnelGenID: funnelStatusState.funnelGenID,
      funnelID: funnelStatusState.funnelID,
      dealCloseDate: moment(funnelStatusState.dealCloseDate).format('yyyy-MM-DD'),
      createDate: new Date(),
      modifyDate: new Date(),
      modifyUserID: currentUser.employeeID,
      flagContract:
        viewFunnelCustomerPOState.flagContract === true
          ? 1
          : viewFunnelCustomerPOState.flagContract === false
          ? 0
          : viewFunnelCustomerPOState.flagContract,
    });

    return salesFunnel;
  };

  const funnelHeaderName = () => {
    const funnelHeaderName = new ResubmitFunnelHeaderNameModel({
      ...funnelEditCustomerState,
      currency: viewFunnelSellingState.currency ? viewFunnelSellingState.currency : 'IDR',
      employeeKey: currentUser.employeeID,
      employeeEmail: currentUser.email,
      employeeName: currentUser.fullName,
      username: currentUser.userName,
      status: currentUser.status,
    });

    return funnelHeaderName;
  };

  const closeModal = () => {
    dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID));
    dispatch(FunnelSalesAnalystActions.requestGetFunnelAnalystWorkflow(+funnelGenID));
    onCloseHandler();
  };

  const reSubmit = (remark) => {
    let listBrand = '';
    funnelProductService.map(
      (arrValues: any) => (listBrand = listBrand.length > 0 ? (listBrand += ',' + arrValues.itemID.toString()) : arrValues.itemID.toString())
    );

    const reSubmitFunnel = new ResubmitFunnelsModel();
    reSubmitFunnel.remark = remark;
    reSubmitFunnel.SalesFunnel = salesFunnel();
    reSubmitFunnel.FunnelHeaderName = funnelHeaderName();
    reSubmitFunnel.SalesFunnelItems = funnelProductService;
    
    reSubmitFunnel.salesFunnelCost = funnelCost;
    reSubmitFunnel.salesFunnelTop = JSON.parse(localStorage.getItem('funnelTop'))?.rows || [];
    reSubmitFunnel.salesFunnelSplitPerformance = JSON.parse(localStorage.getItem('splitPerFormance'))?.rows || [];

    dispatch(FunnelSalesAnalystActions.requestPutFunnelAnalystReSubmit(reSubmitFunnel));
  };
  const onSubmitHandler = (values) => {
    if (commercialWorkflow?.length > 0 || serviceWorkflowWorkflow?.length > 0) {
      const isCommercialReject = commercialWorkflow?.filter((commercial: any) => commercial.status === 'REJECTED');
      const isServiceReject = serviceWorkflowWorkflow?.filter((service: any) => service.status === 'REJECTED');
      const isReOpen = funnel?.openProjectSAWorkflowStatus === 'APPROVED';
      const isResetOneLevel = funnel?.commercialWorkflowStatus === 'COMPLETED';
      const isServicesCompeted = funnel?.serviceWorkflowStatus === 'COMPLETED';

      if (isCommercialReject.length > 0 || isServiceReject.length > 0 || isStorageAll || isReOpen || isResetOneLevel || isServicesCompeted) {
        reSubmit(values.remark);
      }
    } else {
      const newItems = new SalesAnalystModel({});
      newItems.salesId = currentUser.employeeID;
      newItems.funnelGenID = +props.funnelGenID;
      dispatch(FunnelSalesAnalystActions.requestPostFunnelAnalystSubmit(newItems)).then(() => {
        if (page === 'funnel-list') {
          if (type === 'funnel') {
            if (search !== null) {
              dispatch(FunnelActions.requestSearchFunnel(currentUser.employeeID, search.text, 1, 15, 'funnel', 'funnelGenID', 'descending'));
            } else if (filter !== null) {
              const filterNew = new FunnelFilter(filter);
              filterNew.pageSize = 15;
              filterNew.page = 1;
              filterNew.column = 'funnelGenID';
              filterNew.sorting = 'descending';
              filterNew.type = 'funnel';
              dispatch(FunnelActions.postFunnelFilter(filterNew));
            } else {
              dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 'funnel', 1, 15));
            }
            dispatch(FunnelActions.setActivePage(1));
          } else {
            dispatch(FunnelActions.requestSA(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 1, 15));
          }
          onCloseHandler();
        } else {
          closeModal();
        }
      });
    }
  };
  useEffect(() => {
    if (resultMessage?.errorNumber === '666') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Warning));
      dispatch(FunnelSalesAnalystActions.removeResult());
      onCloseHandler();
    }
  }, [resultMessage]);
  useEffect(()=>{
    if (resultMessage?.errorNumber === "0" && (resultMessage?.message === "Resubmit Success!" || resultMessage?.message === "Submit Success!")){
      dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(+funnelGenID, 1, 5));
      dispatch(ProductServiceActions.requestFunnelProductService(+funnelGenID, 1, 5));
      dispatch(ProductServiceActions.requestExistingInternalService(+funnelGenID));
      dispatch(FunnelActions.requestViewFunnelCustomerPOById(+funnelGenID));
      dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));
      dispatch(FunnelActions.requestViewFunnelSellingById(+funnelGenID));
      dispatch(FunnelTopActions.requestFunnelTop(+funnelGenID, 1, 5));
      dispatch(FunnelCostService.getFunnelById(+funnelGenID));
      dispatch(FunnelActions.requestFunnelById(+funnelGenID));
      removeAllStorage(true);
      closeModal();
    }
  }, [resultMessage?.message, resultMessage?.errorNumber])

  const isValidRemark = createValidator(
    (message) => (value) => {
      const val = value?.replace(/\&nbsp;/g, '');

      if (
        value &&
        val
          ?.replace(/<[^>]+>/g, '')
          ?.trim()
          ?.replace(/\s/g, '').length < 9
      ) {
        return 'Remark min 9 character!';
      } else if (value && val?.replace(/<[^>]+>/g, '')?.trim() === '') {
        return message;
      } else if (!value) {
        return message;
      } else {
        return false;
      }
    },
    'Remark is required!'
  );

  const validate = combineValidators({
    remark: composeValidators(isValidRemark)(),
  });

  const validates = combineValidators({});

  return (
    <Fragment>
      <Card.Header className="bold-8">Submit Funnel/Project</Card.Header>
      <Divider />
      <FinalForm
        validate={commercialWorkflow?.length > 0 || serviceWorkflowWorkflow?.length > 0 ? validate : validates}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid className="mb-0 mt-1r">
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Header as="h3" style={{ color: '#55637A' }}>
                    Are you sure want to{' '}
                    {commercialWorkflow?.length > 0 || serviceWorkflowWorkflow?.length > 0
                      ? isResetOneLevel
                        ? `reset one level`
                        : `re-submit`
                      : `submit`}{' '}
                    this project ?
                  </Header>
                </Grid.Column>
              </Grid.Row>
              {(commercialWorkflow?.length > 0 || serviceWorkflowWorkflow?.length > 0) && (
                <>
                  <Grid.Row>
                    <Grid.Column className="info-message-bg-yellow-round-30">
                      <h5 className="bold-4 mv-5">Type 9 characters or more</h5>
                      <h5 className="bold-4 mv-5">FYI, SPACE IS NOT A CHARACTER</h5>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Field name="remark" component={RichTextEditor} placeholder="e.g.Re Submit.." labelName="Remark" mandatorys={false} />
                    </Grid.Column>
                  </Grid.Row>
                </>
              )}
            </Grid>

            <Button
              type="submit"
              className="mr-3r"
              color="blue"
              floated="right"
              content="Submit"
              disabled={
                isRequesting || commercialWorkflow?.length > 0 || serviceWorkflowWorkflow?.length > 0 ? pristine || invalid || isRequesting : null
              }
            />
            <Button className="ml-3r " floated="left" type="button" content="Cancel" onClick={onCloseHandler} />
          </Form>
        )}
      />
    </Fragment>
  );
};

export default CardSubmitFunnel;

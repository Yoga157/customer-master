import './FunnelEditCustomerStyle.scss';
import { durationTypeOptions } from 'constants/durationTypeOptions';
import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { Grid, Form, Dropdown, Header, List, Icon, Label, GridColumn } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, DateInput, TextInput, CheckBoxInput, Button, DropdownInput, SearchInput, Tooltips, NumberInput } from 'views/components/UI';
import { reqDedicatedResourceOptions } from 'constants/reqDedicatedResourceOptions';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import {
  selectViewFunnelCustomer,
  selectProjectCategorySAOptions,
  selectComplexityOptions,
  selectViewFunnelCustomerByProjectId,
} from 'selectors/funnel/FunnelSelector';
import moment from 'moment';
import FunnelEditCustomerModel from 'stores/funnel/models/view-edit/FunnelViewEditCustomer';

import * as ModalFirstLevel from 'stores/modal/first-level/ModalFirstLevelActions';
import * as CustomerActions from 'stores/customer/CustomerActions';
import * as PresalesSupportActions from 'stores/presales-support/PresalesSupportActions';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as CostActions from 'stores/funnel-cost/COSTAction';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectCustomerSearchOptions, selectCustomerTypeC } from 'selectors/select-options/CustomerSelector';
import { selectPresalesOptions } from 'selectors/select-options';
import * as PMOSupportActions from 'stores/pmo-support/PMOSupportActions';
import { selectPMOSupport } from 'selectors/pmo-support/PMOSupportSelector';
import AccordianCutomer from './components/accordian/AccordianCutomer';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import { selectProductServiceAll } from 'selectors/funnel-product-service/ProductServiceSelector';

interface IProps {
  page: string;
  funnelGenID: string;
  projectId: string;
  setFlagOrderConfirm: any;
}

const FunnelEditCustomer: React.FC<IProps> = ({ page, funnelGenID, projectId, setFlagOrderConfirm }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [smoDeptID, setSMODeptID] = useState('');
  const [pmoDeptID, setPMODeptID] = useState('');
  const [durationType, setDurationType] = useState('years');
  const [customerName, setCustomerName] = useState('');
  const [referTo, setReferTo] = useState('');
  const [soType, setSoType] = useState('');
  const [customer, setCustomer] = useState(0);
  const [projectCategory, setProjectCategory] = useState(' ');
  const [projectAliasVal, setProjectAliasVal] = useState('');
  const [endCustomerName, setEndCustomerName] = useState('');
  const [endCustomer, setEndCustomer] = useState(0);
  const [projectAlias, setProjectAlias] = useState([]);
  const [needPMO, setNeedPMO] = useState(false);
  const [complexityId, setComplexityId] = useState(0);

  // const viewFunnelCustomerTest = useSelector((state: IStore) => state.funnel.funnelViewEditCustomer);
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptions(state));
  const presalesSupportOptions = useSelector((state: IStore) => selectPresalesOptions(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isResetOneLevel = useSelector((state: IStore) => state.funnel.isResetOneLevel);
  const isShowIcNoEditGpm = useSelector((state: IStore) => state.funnel.isShowIcNoEditGpm);
  const pmoSupport = useSelector((state: IStore) => selectPMOSupport(state));
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const isIcEdit: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isIcEdit);
  const projectCategorySAOptions = useSelector((state: IStore) => selectProjectCategorySAOptions(state));
  const complexityOptions = useSelector((state: IStore) => selectComplexityOptions(state));
  const customerStoreSearchTypeC = useSelector((state: IStore) => selectCustomerTypeC(state));
  const funnelProductServiceListAll: IProductServiceTable = useSelector((state: IStore) =>
    selectProductServiceAll(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_ALL])
  );

  const [manDays, setManDays] = useState(isNaN(viewFunnelCustomer.manDays) ? 0 : viewFunnelCustomer.manDays);

  useEffect(() => {
    dispatch(PresalesSupportActions.requestPresales());
    dispatch(FunnelActions.requestProjectTypeSA());
    dispatch(FunnelActions.requestComplexity());
    
    if (funnelGenID.length > 0) {
      dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));
      setEndCustomer(viewFunnelCustomer.endUserCustomerGenID);
      setDurationType(viewFunnelCustomer.estDurationType);
      setCustomer(viewFunnelCustomer.customerGenID);
      setCustomerName(viewFunnelCustomer.customerName);
      setSMODeptID(viewFunnelCustomer.smoDeptID);
      setPMODeptID(viewFunnelCustomer.pmoDeptID);
      if (!isNaN(endCustomer)) onChangePMO(true);
      onChangeSMO(viewFunnelCustomer.chkSMODeptID);
    }
    localStorage.removeItem('editViewFunnelCustomerEdit');
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    if (funnelGenID.length > 0) {
      setDurationType(viewFunnelCustomer.estDurationType);
      !localStorage.getItem('editViewFunnelCustomerEdit') && setCustomer(viewFunnelCustomer.customerGenID);
      !localStorage.getItem('editViewFunnelCustomerEdit') && setCustomerName(viewFunnelCustomer.customerName);
      setSMODeptID(viewFunnelCustomer.smoDeptID);
      setPMODeptID(viewFunnelCustomer.pmoDeptID);
      onChangeSMO(viewFunnelCustomer.chkSMODeptID);
      setReferTo(viewFunnelCustomer.referTo);
    }
  }, [dispatch, funnelGenID, viewFunnelCustomer]);

  useEffect(() => {
    if (funnelGenID.length > 0) {
      if (isNaN(+endCustomer)) setEndCustomer(viewFunnelCustomer.endUserCustomerGenID);
      if (!isNaN(endCustomer)) onChangePMO(true);
    }
  }, [dispatch, funnelGenID, endCustomer, viewFunnelCustomer]);

  useEffect(() => {
    let tempData = [];
    if (funnelGenID.length > 0) {
      if (viewFunnelCustomer?.projectAlias) {
        viewFunnelCustomer.projectAlias.split(',').map((e, i) => {
          tempData = [...tempData, { id: i + 1, name: e }];
        });
      }
    }
    setProjectAlias(tempData);

    if (viewFunnelCustomer?.projectCategory) {
      setProjectCategory(viewFunnelCustomer.projectCategory);
    } else {
      setProjectCategory(' ');
    }
  }, [dispatch, funnelGenID, viewFunnelCustomer]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER,
      FunnelActions.VIEW_CUSTOMER_BY_PROJECTID,
      FunnelActions.REQUEST_FUNNEL,
      FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER,
      FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW,
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE,
    ])
  );

  const onResultSelectCustomer = (data: any) => {
    setCustomer(data.result.price);
    setCustomerName(data.result.title);
    setSoType(data.result.soType);
  };

  const onResultSelectEndCustomer = (data: any) => {
    setEndCustomer(data.result.price);
    setEndCustomerName(data.result.title);

    if (data.result.price && !isNaN(+data.result.price)) {
      dispatch(PMOSupportActions.requestPMO(currentUser.employeeID, +data.result.price));
    }
  };

  const onChangePMO = (values: any) => {
    //setNeedPMO(values);
    if (values) {
      dispatch(PMOSupportActions.requestPMO(currentUser.employeeID, +endCustomer));
    }
    /* else {
      dispatch(PMOSupportActions.requestPMO(0, 0));
    } */
  };

  const onReferTo = (event: any) => {
    setReferTo(event);
  };

  const onChangeSMO = (values: any) => {
    //SMO DEPTID Ke Pak Troy
    if (values) {
      setSMODeptID('1070604000');
    } else {
      setSMODeptID('');
    }
  };

  const onSaveComplexity = () => {
    if (needPMO && complexityId > 0) dispatch(FunnelActions.updateComplexity(complexityId, currentUser.employeeID, +funnelGenID));
  };

  const onEditHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onChangeDurationType = (e: any, data: any) => {
    setDurationType(data.value);
  };
  const onStartProjectDate = (values: any) => {
    viewFunnelCustomer.estStartProjectDate = new Date(values);
  };

  const onDurationProjectChange = (values: any) => {
    if (values?.length > 0) {
      const startDate: Date = viewFunnelCustomer.estStartProjectDate!;
      viewFunnelCustomer.estEndProjectDate = moment(startDate)
        .add(values, 'years')
        .toDate();
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));
      setEndCustomer(viewFunnelCustomer.endUserCustomerGenID);
      setDisableComponent(true);
      setProjectAliasVal(' ');
    }
  };

  const onSubmitHandler = (values: any) => {
    const funnelCustomer = new FunnelEditCustomerModel(values);

    funnelCustomer.modifyUserID = currentUser.employeeID;
    funnelCustomer.estStartProjectDate =
      values.estStartProjectDate === undefined ? undefined : new Date(moment(values.estStartProjectDate).format('yyyy-MM-DD'));
    funnelCustomer.estEndProjectDate =
      values.estEndProjectDate === undefined ? undefined : new Date(moment(values.estEndProjectDate).format('yyyy-MM-DD'));
    funnelCustomer.actStartProjectDate = values.estStartProjectDate;
    funnelCustomer.actEndProjectDate = values.estEndProjectDate;
    funnelCustomer.presalesDeptID = values.preSalesDeptArr.join(',');

    funnelCustomer.customerPICID = 0;
    funnelCustomer.customerGenID = +customer === 0 ? values.customerGenID : +customer;
    funnelCustomer.endUserCustomerGenID = +endCustomer === 0 ? values.endUserCustomerGenID : +endCustomer;
    funnelCustomer.estDurationType = durationType;
    funnelCustomer.manDays = +values.manDays;
    funnelCustomer.projectCategory = projectCategory;
    funnelCustomer.referTo = referTo.toString();
    if (needPMO && !isSalesAnalis) funnelCustomer.complexity = complexityId === 0 ? viewFunnelCustomer.complexity : complexityId;
    else if (needPMO === false && !isSalesAnalis) funnelCustomer.complexity = 0;
    funnelCustomer.projectAlias = projectAlias.length > 0 ? projectAlias.map((e) => e.name.trim()).join(',') : '';

    if (values.chkSMODeptID) {
      funnelCustomer.smoDeptID = smoDeptID;
    } else {
      funnelCustomer.smoDeptID = '';
    }

    if (values.chkPMODeptID) {
      funnelCustomer.pmoDeptID = pmoSupport.pmoDeptID;
    } else {
      funnelCustomer.pmoDeptID = '';
    }

    if (isSalesAnalis) {
      const getLocalEdit = JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit'));
      localStorage.setItem('editViewFunnelCustomerEdit', getLocalEdit ? JSON.stringify([funnelCustomer]) : JSON.stringify([funnelCustomer]));
      dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID)); //triger local
    } else {
      dispatch(FunnelActions.putViewFunnelCustomer(funnelCustomer)).then(() => dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID)));
    }

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
    setProjectAliasVal(' ');
  };

  const resultMessage = useSelector((state: IStore) => state.funnel.resultActions);
  useEffect(() => {
    if (resultMessage?.message === 'Update Project Alias Success!') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Success));
      dispatch(FunnelActions.removeResult());
    } else if (resultMessage?.message === 'Update Complexity Success!') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Success));
      dispatch(FunnelActions.removeResult());
    } else if (resultMessage?.message === 'Update Failed!') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Error));
      dispatch(FunnelActions.removeResult());
    }
  }, [resultMessage]);

  const handleSearchChangeCust = useCallback(
    (data) => {
      setCustomerName(data);
      if (data.length > 4) {
        dispatch(CustomerActions.requestCustomerByName(data.trim()));
      }
    },
    [dispatch]
  );

  const handleSearchChangeCustTypeC = useCallback(
    (data) => {
      setCustomerName(data);

      if (data.length > 4) {
        dispatch(CustomerActions.requestCustomerTypeC(data.trim()));
      }
    },
    [dispatch]
  );

  const handleSearchChangeCustEnd = useCallback(
    (data) => {
      setEndCustomerName(data);

      if (data.length > 4) {
        dispatch(CustomerActions.requestCustomerByName(data.trim()));
      }
    },
    [dispatch]
  );

  const handleSearchChangeCustTypeCEnd = useCallback(
    (data) => {
      setEndCustomerName(data);

      if (data.length > 4) {
        dispatch(CustomerActions.requestCustomerTypeC(data.trim()));
      }
    },
    [dispatch]
  );

  const onChangeProjectCategory = (e: any) => {
    setProjectCategory(e);
    if (e === 'Billing AWS' || (projectCategory === 'Billing AWS' && e !== 'Billing AWS')) {
      setCustomerName(' ');
      setCustomer(0);
      setEndCustomerName(' ');
      setEndCustomer(0);
    }
  };
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)} 
      initialValues={
        JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit'))
          ? (values) => ({
              ...values,
              chkSMODeptID: !JSON.parse(localStorage.getItem('productService'))?.find(
                (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.isDelete === 0 && e.itemType === 19
              )
                ? JSON.parse(localStorage.getItem('productService'))
                  ? false
                  : values.chkSMODeptID
                : values.chkSMODeptID,
            })
          : viewFunnelCustomer
      }
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column width={16} className="FloatRight">
                {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && disableComponent && (
                  <>
                    {JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit')) && (
                      <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning float-r mt-px-4 ml-px-4" />} />
                    )}

                    {(isIcEdit || isShowIcNoEditGpm || isResetOneLevel) && (
                      <Tooltips
                        content="Edit Customer Details"
                        trigger={<Button basic type="button" compact icon="edit" onClick={(e: Event) => onEditHandler(e)} floated="right" />}
                      />
                    )}

                    <Tooltips
                      content="History Customer Details"
                      trigger={
                        <Button
                          basic
                          type="button"
                          compact
                          icon="history"
                          floated="right"
                          onClick={(e: Event) =>
                            dispatch(ModalFirstLevel.OPEN(<AccordianCutomer funnelGenID={viewFunnelCustomer.funnelGenID} />, ModalSizeEnum.Small))
                          }
                        />
                      }
                    />
                  </>
                )}
                {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && !disableComponent && (
                  <Fragment>
                    <Tooltips
                      content="Save Update"
                      trigger={
                        <Button
                          basic
                          compact
                          icon="save"
                          floated="right"
                          disabled={
                            (!isSalesAnalis && complexityId === 0 && needPMO) ||
                            (projectCategory === 'Implementation' && (manDays <= 0 || manDays === undefined)) ||
                            /* customerName?.trim() == '' ||
                            customerName?.length <= 5 ||
                            endCustomerName?.trim() == '' ||
                            endCustomerName?.length <= 5 || */
                            customerName === 'BERCA HARDAYAPERKASA PT.'
                              ? !referTo
                              : false
                          }
                        />
                      }
                      chkPMODeptID
                    />
                    <Tooltips
                      content="Cancel Update"
                      trigger={
                        <Button
                          type="button"
                          basic
                          compact
                          icon="cancel"
                          floated="right"
                          onClick={() => {
                            onCancel();
                          }}
                        />
                      }
                    />
                  </Fragment>
                )}
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="projectName"
                  component={TextInput}
                  placeholder="e.g.Your Project Name"
                  labelName="Project Name"
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column className="ViewLabel projectAliass">
                <Field
                  name="projectAliass"
                  component={TextInput}
                  placeholder={disableComponent ? '' : 'e.g.Your Project Alias'}
                  labelName="Project Alias"
                  // disabled={disableComponent}
                  values={projectAliasVal}
                  onChange={(e) => setProjectAliasVal(e)}
                  // meta={{
                  //   touched: projectAliasVal.trim().length === 0 ? 'Project Alias is Required' : false,
                  //   error: projectAliasVal.trim().length === 0 ? 'Project Alias is Required' : false,
                  // }}
                  icon={
                    <Icon
                      inverted
                      name="plus"
                      color="blue"
                      circular
                      link
                      disabled={projectAliasVal.trim().length === 0 ? true : false}
                      onClick={() => {
                        setProjectAlias([...projectAlias, { id: projectAlias.length + 1, name: projectAliasVal }]);
                        setProjectAliasVal(' ');
                        dispatch(
                          FunnelActions.updateProjectAlias(
                            `${
                              projectAlias.length > 0
                                ? `${projectAlias?.map((e) => e.name.trim()).join(',')},${projectAliasVal.trim()}`
                                : projectAliasVal.trim()
                            }`,
                            currentUser.employeeID,
                            +funnelGenID
                          )
                        );
                        // dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));
                      }}
                    />
                  }
                />

                <Grid.Column className="ViewLabel" textAlign="center">
                  {projectAlias.map((item, i) => {
                    return (
                      <Label as="a" key={i} className="mb-5px">
                        {item.name}
                        <Icon
                          name="delete"
                          onClick={() => {
                            // !disableComponent && setProjectAlias(projectAlias?.filter((e) => e.id !== item.id));
                            setProjectAlias(projectAlias?.filter((e) => e.id !== item.id));
                            dispatch(
                              FunnelActions.updateProjectAlias(
                                `${
                                  projectAlias.length > 0
                                    ? projectAlias
                                        ?.filter((e) => e.id !== item.id)
                                        .map((e) => e.name.trim())
                                        .join(',')
                                    : ''
                                }`,
                                currentUser.employeeID,
                                +funnelGenID
                              )
                            );
                          }}
                        />
                      </Label>
                    );
                  })}
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
            {customerName === 'Berca Hardayaperkasa PT' || customerName === 'BERCA HARDAYAPERKASA PT.' ? (
              <Grid.Row columns={2} className="row-manday-exist">
                <Grid.Column width={12} className=" ViewLabel FullGrid1200">
                  <Field
                    name="customerName"
                    component={SearchInput}
                    placeholder="e.g.PT. Customer .."
                    labelName="Customer Name"
                    values={customerName}
                    handleSearchChange={projectCategory === 'Billing AWS' ? handleSearchChangeCustTypeC : handleSearchChangeCust}
                    onResultSelect={onResultSelectCustomer}
                    results={projectCategory === 'Billing AWS' ? customerStoreSearchTypeC : customerStoreSearch}
                    disabled={disableComponent}
                  />
                  {viewFunnelCustomer.flagCustomerBlacklist === '1' && <p className="BlackListText">Black List Customer</p>}
                </Grid.Column>
                <Grid.Column className=" ViewLabel FullGrid1200 " width={4}>
                  <Field
                    name="referTo"
                    component={NumberInput}
                    placeholder="e.g.37845 .."
                    labelName="ReferTo"
                    values={referTo}
                    onChange={onReferTo}
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>
            ) : (
              <Grid.Row columns={1}>
                <Grid.Column className=" ViewLabel">
                  <Field
                    name="customerName"
                    component={SearchInput}
                    placeholder="e.g.PT. Customer .."
                    labelName="Customer Name"
                    values={customerName}
                    handleSearchChange={projectCategory === 'Billing AWS' ? handleSearchChangeCustTypeC : handleSearchChangeCust}
                    onResultSelect={onResultSelectCustomer}
                    results={projectCategory === 'Billing AWS' ? customerStoreSearchTypeC : customerStoreSearch}
                    disabled={disableComponent}
                  />
                  {viewFunnelCustomer.flagCustomerBlacklist === '1' && <p className="BlackListText">Black List Customer</p>}
                </Grid.Column>
              </Grid.Row>
            )}

            <Grid.Row columns={1}>
              <Grid.Column className=" ViewLabel">
                <Field
                  name="endUserCustomerName"
                  component={SearchInput}
                  placeholder="e.g.End Customer Name"
                  labelName="End Customer Name"
                  disabled={disableComponent}
                  values={endCustomerName}
                  handleSearchChange={projectCategory === 'Billing AWS' ? handleSearchChangeCustTypeCEnd : handleSearchChangeCustEnd}
                  onResultSelect={onResultSelectEndCustomer}
                  results={projectCategory === 'Billing AWS' ? customerStoreSearchTypeC : customerStoreSearch}
                />
                {viewFunnelCustomer.flagEndCustomerBlacklist === '1' && <p className="BlackListText">Black List Customer</p>}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column className=" ViewLabel FullGrid1200">
                <Field
                  name="estStartProjectDate"
                  component={DateInput}
                  placeholder="e.g.09/09/2020"
                  labelName="Est. Start Project"
                  date={true}
                  disabled={disableComponent}
                  onChange={onStartProjectDate}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="estEndProjectDate"
                  component={DateInput}
                  placeholder="e.g.09/09/2020"
                  labelName="Est. End Project"
                  date={true}
                  disabled={disableComponent}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="deliveryDate"
                  component={DateInput}
                  placeholder="e.g.09/09/2020"
                  labelName="Delivery Date"
                  date={true}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200">
                <Field
                  name="estStartByPmo"
                  component={DateInput}
                  labelName="Est. Start Project PMO"
                  date={true}
                  disabled={true}
                  placeholder={'-'}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="estEndByPmo"
                  component={DateInput}
                  labelName="Est. End Project PMO"
                  date={true}
                  disabled={true}
                  placeholder={'-'}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} className="row-manday-exist">
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="projectCategory"
                  component={SelectInput}
                  placeholder="e.g.Implementation .."
                  labelName="Project Category"
                  disabled={projectCategory === 'Billing AWS' ? true : disableComponent}
                  options={projectCategorySAOptions}
                  values={projectCategory}
                  onChanged={onChangeProjectCategory}
                />
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                <Field
                  name="manDays"
                  component={NumberInput}
                  placeholder="e.g.99"
                  labelName="Est. Mandays"
                  disabled={disableComponent}
                  textAlign="left"
                  mandatory={projectCategory === 'Implementation' && (manDays <= 0 || manDays === undefined) ? false : true}
                  onChange={(e) => {
                    onDurationProjectChange(e);
                    setManDays(e);
                  }}
                  meta={{
                    touched:
                      projectCategory === 'Implementation' && (manDays <= 0 || manDays === undefined)
                        ? 'ManDays is must be greater than zero'
                        : false,
                    error:
                      projectCategory === 'Implementation' && (manDays <= 0 || manDays === undefined)
                        ? 'ManDays is must be greater than zero'
                        : false,
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                <Field
                  name="estDurationProject"
                  component={TextInput}
                  placeholder="e.g.99"
                  labelName="Est. Proj. Duration"
                  disabled={disableComponent}
                  textAlign="right"
                  onChange={onDurationProjectChange}
                  labeled={
                    <Dropdown
                      className="dropdown-disabled"
                      options={durationTypeOptions}
                      disabled={disableComponent}
                      onChange={onChangeDurationType}
                      value={durationType === '' ? viewFunnelCustomer.estDurationType : durationType}
                    />
                  }
                  labelPosition="right"
                  toolTipPosition="bottom center"
                  toolTipContents="Project Duration Estimation base warranty to the customer (Not Vendor Warranty)"
                />
              </Grid.Column>

              <Grid.Column width={10} className=" ViewLabel FullGrid1200">
                <Field
                  name="preSalesDeptArr"
                  component={DropdownInput}
                  placeholder="e.g. CI,NI .."
                  labelName="Presales"
                  disabled={isSalesAnalis ? true : disableComponent}
                  options={presalesSupportOptions}
                  toolTipPosition="bottom center"
                  toolTipContents={
                    <List bulleted>
                      <List.Item>TSS Infrastructure Services</List.Item>
                      <List.Item>TSS Integration Services</List.Item>
                      <List.Item>NI</List.Item>
                    </List>
                  }
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal">
              <Grid.Column width={6} className="FullGrid1200">
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Field
                      name="chkPMODeptID"
                      component={CheckBoxInput}
                      label="Need PMO/S"
                      disabled={
                        isSalesAnalis
                          ? true
                          : !disableComponent && pmoSupport.pmoEmployeeKey === 7324
                          ? false
                          : viewFunnelCustomer.chkPMODeptID &&
                            !funnelProductServiceListAll.rows.find(
                              (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.itemType === 19
                            )
                          ? disableComponent
                          : disableComponent
                          ? true
                          : JSON.parse(localStorage.getItem('productService'))
                          ? !JSON.parse(localStorage.getItem('productService'))?.find(
                              (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.isDelete === 0 && e.itemType === 19
                            )
                          : !funnelProductServiceListAll.rows.find(
                              (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.itemType === 19
                            )
                      }
                      //onChange={onChangePMO}
                      onChange={(e) => {
                        setNeedPMO(e);
                        onChangePMO(true);
                        setFlagOrderConfirm(e)
                      }}
                      toolTipPosition="top right"
                      toolTipContents={
                        <div>
                          <Header as="h4">
                            Will handle by PMO if your customer :
                            <Header.Subheader>
                              <br />
                              <List bulleted horizontal link>
                                <List.Item as="a">AKR LAND DEVELOPMENT GROUP</List.Item>
                                <List.Item as="a">ANEKA PETROINDO RAYA PT</List.Item>
                                <List.Item as="a">Artajasa PT</List.Item>

                                <List.Item as="a">Astra International Tbk PT</List.Item>
                                <List.Item as="a">Asuransi MSIG Indonesia. PT</List.Item>
                                <List.Item as="a">Bank CIMB Niaga Tbk PT</List.Item>

                                <List.Item as="a">Bank Danamon Indonesia Tbk PT</List.Item>
                                <List.Item as="a">Bank Mandiri (Persero) Tbk PT</List.Item>
                                <List.Item as="a">BANK MANDIRI SYARIAH TBK</List.Item>

                                <List.Item as="a">BANK MANDIRI TASPEN POS PT</List.Item>
                                <List.Item as="a">Beiersdorf Indonesia PT</List.Item>
                                <List.Item as="a">Berlian Sistem Informasi PT</List.Item>

                                <List.Item as="a">BURSA EFEK INODNESIA PT</List.Item>
                                <List.Item as="a">BUT. CHEVRON INDONESIA COMPANY</List.Item>
                                <List.Item as="a">CIMB Securities Indonesia PT</List.Item>

                                <List.Item as="a">CSTS JOIN OPERATION</List.Item>
                                <List.Item as="a">DANA PENSIUN CHEVRON PACIFIC INDONESIA</List.Item>
                                <List.Item as="a">DHL</List.Item>

                                <List.Item as="a">DONGGI SENORO LNG</List.Item>
                                <List.Item as="a">Eka Hospital</List.Item>
                                <List.Item as="a">ICON + (NI)</List.Item>

                                <List.Item as="a">Indah Kiat Pulp and Paper Tbk PT</List.Item>
                                <List.Item as="a">ISS Indonesia. PT</List.Item>
                                <List.Item as="a">Pertamina</List.Item>

                                <List.Item as="a">Kliring Berjangka Indonesia PT</List.Item>
                                <List.Item as="a">ISS Indonesia. PT</List.Item>
                                <List.Item as="a">Kustodian Sentral Efek Indonesia PT</List.Item>

                                <List.Item as="a">MANDIRI UTAMA FINANCE PT</List.Item>
                                <List.Item as="a">MSIG Insurance</List.Item>
                                <List.Item as="a">PLN PT</List.Item>

                                <List.Item as="a">Pupuk Indonesia (Persero)</List.Item>
                                <List.Item as="a">Smartfren PT</List.Item>
                                <List.Item as="a">TELKOM INDONESIA PT</List.Item>

                                <List.Item as="a">Telkomsel PT</List.Item>
                                <List.Item as="a">TOYOTA ASTRA MOTOR PT</List.Item>
                                <List.Item as="a">XL Axiata Tbk PT</List.Item>

                                <List.Item as="a">YAY. POLITEKNIK CHEVRON RIAU</List.Item>
                                <List.Item as="a">BANK MAYBANK INDONESIA TBK. PT</List.Item>
                              </List>
                            </Header.Subheader>
                          </Header>
                          <Header as="h5" color="red">
                            Note: Beside that will handle by PMOS
                          </Header>
                        </div>
                      }
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Field
                      name="chkSMODeptID"
                      component={CheckBoxInput}
                      label="Need SMO"
                      disabled={
                        isSalesAnalis
                          ? true
                          : viewFunnelCustomer.chkSMODeptID &&
                            !funnelProductServiceListAll.rows.find(
                              (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.itemType === 19
                            )
                          ? disableComponent
                          : disableComponent
                          ? true
                          : JSON.parse(localStorage.getItem('productService'))
                          ? !JSON.parse(localStorage.getItem('productService'))?.find(
                              (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.isDelete === 0 && e.itemType === 19
                            )
                          : !funnelProductServiceListAll.rows.find(
                              (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.itemType === 19
                            )
                      }
                      onChange={onChangeSMO}
                      toolTipPosition="top right"
                      toolTipContents="Check this flag if you have maintenance 
                                    (handle by SMO) in your project."
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column className=" ViewLabel FullGrid1200 ">
                <Field
                  name="complexity"
                  component={SelectInput}
                  placeholder="e.g.Simple .."
                  labelName="Project Complexity"
                  options={complexityOptions}
                  disabled={
                    isSalesAnalis === true
                      ? needPMO === true
                        ? false
                        : true
                      : disableComponent === true
                      ? disableComponent
                      : needPMO === true
                      ? false
                      : true
                  }
                  toolTipPosition="top right"
                  toolTipSave={'asd'}
                  toolTipContents={
                    <div>
                      <Header as="h4">
                        Complex Project :
                        <Header.Subheader>
                          <br />
                          <List bulleted horizontal link>
                            <List.Item as="a"></List.Item>
                            <List.Item as="a">An activity of deliverables that required 3 FTE and more</List.Item>
                            <List.Item as="a">Most of the activity are required coordination with more than 3 parties involved</List.Item>
                            <List.Item as="a">Activity/ deliverables are more than 10 working days to complete and no repetitive task</List.Item>

                            <List.Item as="a">Most of the transaction above 50K US$ based on contract</List.Item>
                            <List.Item as="a">Required creation project timeline, reporting and monitoring system</List.Item>
                            <List.Item as="a">Develop full scale of planning</List.Item>

                            <List.Item as="a">Most of the planning required close monitoring, review and tracking issues</List.Item>
                            <List.Item as="a">Collaboration with end users, managers, senior management and stakeholders</List.Item>
                            <List.Item as="a">
                              Effectively communicate project expectations to team members and stakeholders in a timely and clear fashion
                            </List.Item>

                            <List.Item as="a">Liaise with project stakeholders on an ongoing basis</List.Item>
                            <List.Item as="a">
                              Determine and assess need for additional staff and/or consultants and make the appropriate recruitments if necessary
                              during project cycle
                            </List.Item>
                            <List.Item as="a">Identify and resolve issues and conflicts within the project team</List.Item>

                            <List.Item as="a">Identify and manage project dependencies and critical path</List.Item>
                            <List.Item as="a">
                              Proactively manage changes in project scope, identify potential crises, and devise contingency plans
                            </List.Item>
                            <List.Item as="a">
                              Coach, mentor, motivate and supervise project team members and contractors, and influence them to take positive action
                              and accountability for their assigned work
                            </List.Item>

                            <List.Item as="a">
                              Conduct project post mortems and create a recommendations report in order to identify successful and unsuccessful
                              project elements
                            </List.Item>
                            <List.Item as="a">Involved Intangible risk and many risk may happen in managing and executing the projects</List.Item>
                            <List.Item as="a">
                              Complex dan comprehensive supporting documents preparation for BAST submission and BAST document preparation itself
                            </List.Item>
                          </List>
                        </Header.Subheader>
                      </Header>

                      <Header as="h4">
                        Moderate Project :
                        <Header.Subheader>
                          <br />
                          <List bulleted horizontal link>
                            <List.Item as="a"></List.Item>
                            <List.Item as="a">An activity of deliverables that required less than 3 FTE</List.Item>
                            <List.Item as="a">Some of the activity are required coordination with 3rd party</List.Item>
                            <List.Item as="a">Activity/ deliverables are between 2-10 working days to complete and no repetitive task</List.Item>

                            <List.Item as="a">Some of the transaction Less than 50K US$ based on Contract</List.Item>
                            <List.Item as="a">May required creation project timeline, reporting and monitoring system but not compulsory</List.Item>
                            <List.Item as="a">Moderate Planning</List.Item>

                            <List.Item as="a">May required close monitoring, review and tracking issues</List.Item>
                            <List.Item as="a">Collaboration with end users, 3rd party </List.Item>
                            <List.Item as="a">
                              Less intensive communication to stake holder but may need intensive communication among team member
                            </List.Item>

                            <List.Item as="a">Most of the time liaise internal team member</List.Item>
                            <List.Item as="a">Most of the resources used internal team member but may need external resources</List.Item>
                            <List.Item as="a">One time setup and deliver base on agree schedule/ deployment plan</List.Item>

                            <List.Item as="a">Minimum/ limited issues, may have conflict amongts project team</List.Item>
                            <List.Item as="a">As per plan/schedule, may need to manage depedencies and critical path of the deliverables</List.Item>
                            <List.Item as="a">May have change request but with minimum occurance</List.Item>

                            <List.Item as="a">Limited team member and no required people management</List.Item>
                            <List.Item as="a">Once deliver the requirement may need review if required</List.Item>
                            <List.Item as="a">Some risk may happened in managing and executing the projects</List.Item>

                            <List.Item as="a">
                              Moderate supporting documents preparation for BAST submission and BAST document preparation itself
                            </List.Item>
                          </List>
                        </Header.Subheader>
                      </Header>

                      <Header as="h4">
                        Simple Project :
                        <Header.Subheader>
                          <br />
                          <List bulleted horizontal link>
                            <List.Item as="a"></List.Item>
                            <List.Item as="a">An activity of deliverables that required less than 2FTE</List.Item>
                            <List.Item as="a">Most of the activity are not required coordination with 3rd party</List.Item>
                            <List.Item as="a">Most of the activity are less than 2 days (In some cases consist of repetitive task)</List.Item>

                            <List.Item as="a">Most of the transaction less than 50K US$ based on Contract</List.Item>
                            <List.Item as="a">No need project time line and very light reporting or monitoring system</List.Item>
                            <List.Item as="a">Very light of planning</List.Item>

                            <List.Item as="a">Most of the planning created in one time and running in "auto pilot" mode</List.Item>
                            <List.Item as="a">Collaboration with end users</List.Item>
                            <List.Item as="a">Less intensive communication to stake holder and team member</List.Item>

                            <List.Item as="a">Most of the time liaise internal team member</List.Item>
                            <List.Item as="a">Most of the resources used internal team member and very limited to have external resources</List.Item>
                            <List.Item as="a">One time setup and deliver base on agree schedule/ deployment plan</List.Item>

                            <List.Item as="a">Minimum/ limited issues/ conflict amongts project team</List.Item>
                            <List.Item as="a">As per plan/schedule, no need managing depedencies and critical path of the deliverables</List.Item>
                            <List.Item as="a">No change request apply</List.Item>

                            <List.Item as="a">Limited team member and no required people management</List.Item>
                            <List.Item as="a">Once deliver the requirement no need review</List.Item>
                            <List.Item as="a">Minimum risk in managing and executing the projects</List.Item>

                            <List.Item as="a">
                              Simple supporting documents preparation for BAST submission and BAST document preparation itself
                            </List.Item>
                          </List>
                        </Header.Subheader>
                      </Header>
                      <Header as="h5" color="red">
                        Note: Project Workload associate with Project Category. The Simples category the low workload, eg: Delivery server and Install
                      </Header>
                    </div>
                  }
                  values={viewFunnelCustomer.complexity === 0 ? '' : viewFunnelCustomer.complexity}
                  onChanged={(e) => {
                    setComplexityId(e);
                  }}
                />
                {isSalesAnalis && <Icon name="save" className="ComplexityBtn" inverted link onClick={onSaveComplexity} />}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className="row-manday-exist">
              <Grid.Column className=" ViewLabel FullGrid1200 " width={10}>
                <Field
                  name="reqDedicatedResource"
                  component={SelectInput}
                  placeholder="e.g.Request .."
                  labelName="Request Dedicated Resource"
                  disabled={disableComponent}
                  options={reqDedicatedResourceOptions}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditCustomer;

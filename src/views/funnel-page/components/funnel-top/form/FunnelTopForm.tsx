import React, { useEffect, Fragment, useState } from 'react';
import { SelectInput, Button, NumberInput, DateInput, DropdownInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
//import { selectFunnelTopItemOptions } from 'selectors/select-options/FunnelTopItemSelector';
import { selectDropdownProductDesc } from 'selectors/funnel-top/FunnelTopSelector';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import { selectFunnelTopSupportDocOptions } from 'selectors/select-options/FunnelTopSupportDocSelector';
import { selectFunnelTopTypeOptions } from 'selectors/select-options/FunnelTopTypeSelector';
import TopServiceModel from 'stores/funnel-top/models/TopServiceModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectFunnelTopAll, selectViewFunnelTopEdit } from 'selectors/funnel-top/FunnelTopSelector';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { combineValidators, isRequired } from 'revalidate';
import moment from 'moment';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IFunnelTopTable from 'selectors/funnel-top/models/IFunnelTopTable';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import { selectFunnelTop } from 'selectors/funnel-top/FunnelTopSelector';

interface IProps {
  funnelGenID: string;
  funnelTopID: number;
  type: string;
  rowData: any;
  setActivePage: any;
}

const FunnelTopForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [isEmptyProductService, setIsEmptyProductService] = useState(false);
  const [disableFieldProduct, setDisableFieldProduct] = useState(false);
  const [disableFieldService, setDisableFieldService] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [descProduct, setDescProduct] = useState('');
  const [descProductVal, setDescProductVal] = useState(0);
  const [descService, setDescService] = useState('');
  const [pctgProduct, setPctgProduct] = useState(0);
  const [serviceProduct, setServiceProduct] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durationType, setDurationType] = useState('');
  //const [productDesc, setProductDesc] = useState('');
  //const [serviceDesc, setServiceDesc] = useState('');
  const [topTypes, setTopTypes] = useState('');
  const [amount, setAmount] = useState(0);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectTopTypeOptions = useSelector((state: IStore) => selectFunnelTopTypeOptions(state));
  //const selectTopItemsOptions = useSelector((state: IStore) => selectFunnelTopItemOptions(state));
  const selectProductDescOptions = useSelector((state: IStore) => selectDropdownProductDesc(state));
  const funnelProductService = useSelector((state: IStore) => state.funnelProductService.listData);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const selectSupportingDocOptions = useSelector((state: IStore) => selectFunnelTopSupportDocOptions(state));
  const funnelTopAll: IFunnelTopTable = useSelector((state: IStore) => selectFunnelTopAll(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;
  const funnelTop: IFunnelTopTable = useSelector((state: IStore) => selectFunnelTop(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));
  const editViewFunnel = JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit'));

  const selectTopEdit = useSelector((state: IStore) =>
    selectViewFunnelTopEdit(
      state,
      props.rowData.isAdd === 0 && +props.funnelGenID > 0 && page !== 'Add New Funnel - Copy Project'
        ? isSalesAnalis
          ? { resultObj: props.rowData }
          : 'view-edit'
        : { resultObj: props.rowData }
    )
  );

  const [selectTopEditState, setSelectTopEditState] = useState(selectTopEdit);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelTopActions.REQUEST_FUNNEL_TOP_BY_ID,
      FunnelTopActions.REQUEST_POST_FUNNEL_TOP,
      FunnelTopActions.REQUEST_PUT_FUNNEL_TOP,
      FunnelTopActions.REQUEST_DROPDOWN_PRODUCT_DESC,
    ])
  );

  const saveFunnelTopLocal = (funnelTopLocal, newItems) => {
    localStorage.setItem(
      'funnelTop',
      funnelTopLocal
        ? JSON.stringify({
            rows: [...funnelTopLocal.rows, newItems],
          })
        : JSON.stringify({
            rows: [newItems],
          })
    );
  };

  const edditToLocal = (funnelTopLocal, newItems) => {
    if (funnelTopLocal) {
      const newUpdate = funnelTopLocal.rows.filter((i, k) => {
        return i.funnelTopID !== props.rowData.funnelTopID;
      });
      localStorage.setItem('funnelTop', JSON.stringify({ rows: [...newUpdate, newItems] }));
    }
  };

  const onSubmitHandler = (values: any) => {
    const newItems = new TopServiceModel(values);
    const funnelTopLocal = JSON.parse(localStorage.getItem('funnelTop'));
    setPageRefresh(true);
    //Jika sudah ada description product tidak bisa add baru lagi
    let productDesc;

    if (funnelTopLocal != null) {
      if (props.type === 'Add') {
        productDesc = funnelTopLocal.rows.filter((item: any) => {
          return (
            item.productDescStr === 'Monthly' ||
            item.productDescStr === 'Yearly' ||
            item.productDescStr === 'Per 4 Months' ||
            item.productDescStr === 'Quaterly' ||
            item.productDescStr === 'Per 6 Months'
          );
        });

        if (productDesc.length > 0) {
          if (
            descProduct === 'Monthly' ||
            descProduct === 'Yearly' ||
            descProduct === 'Per 4 Months' ||
            descProduct === 'Quaterly' ||
            descProduct === 'Per 6 Months'
          ) {
            dispatch(
              ToastsAction.add('Sudah ada Product Description Monthly / Yearly / Quaterly / Per 6 Months / Per 4 Months!', ToastStatusEnum.Error)
            );
            return;
          }
        }
      }
    } /*else {
      if (props.type === 'Add') {
        productDesc = funnelTop.rows.filter((item: any) => {
          return (
            item.productDescStr === 'Monthly' ||
            item.productDescStr === 'Yearly' ||
            item.productDescStr === 'Per 4 Months' ||
            item.productDescStr === 'Quaterly' ||
            item.productDescStr === 'Per 6 Months'
          );
        });
        if (productDesc.length > 0) {
          dispatch(ToastsAction.add('Description Product already exists', ToastStatusEnum.Error));
          return;
        }
      }
    } */

    newItems.isAdd = 0;
    newItems.notes = '';
    newItems.isUpdate = 0;
    newItems.isDelete = 0;
    newItems.productDesc = values.productDesc ? Number(values.productDesc) : 0;
    newItems.serviceDesc = values.serviceDesc ? Number(values.serviceDesc) : 0;
    newItems.funnelGenID = +props.funnelGenID;
    newItems.createUserID = currentUser.employeeID;
    newItems.funnelTopID = props.funnelTopID ? props.funnelTopID : 0;
    newItems.createDate = props.type === 'Edit' ? selectTopEdit.createDate : moment(new Date()).format('yyyy-MM-DD');
    newItems.supportDoc = values.supportDocArr.join(',');
    newItems.supportDocStr = values.supportDocArr.join(',');

    newItems.productPercentage = pctgProduct ? pctgProduct : values.productPercentage;
    newItems.servicePercentage = serviceProduct ? serviceProduct : values.servicePercentage;

    const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;
    const productDescStr = document.querySelector(
      'body > div.ui.page.modals.dimmer.transition.visible.active > div > div > form > div > div:nth-child(2) > div:nth-child(1) > div > div.ui.search.selection.dropdown > div.text'
    )?.textContent;

    const serviceDescStr = document.querySelector(
      'body > div.ui.page.modals.dimmer.transition.visible.active > div > div > form > div > div:nth-child(3) > div:nth-child(1) > div > div.ui.search.selection.dropdown > div.text'
    )?.textContent;

    const supportDocStr = document.querySelector(
      'body > div.ui.page.modals.dimmer.transition.visible.active > div > div > form > div > div:nth-child(4) > div:nth-child(1) > div > div.ui.search.selection.dropdown > div.text'
    )?.textContent;

    if (isSalesAnalis) {
      newItems.productDescStr = productDescStr === 'e.g.Down Payment' ? '' : productDescStr;
      newItems.serviceDescStr = serviceDescStr === 'e.g.Down Payment' ? '' : serviceDescStr;
      //newItems.supportDocStr = supportDocStr === 'e.g.PO/SPK/CONTRACT' ? '' : supportDocStr;

      if (props.type === 'Add') {
        newItems.isAdd = 1;
        if (funnelTopAll?.rows.length > 0) {
          if (funnelTopLocal) {
            newItems.funnelTopID = funnelTopLocal ? funnelTopLocal.rows.length + 1 : 1;
            saveFunnelTopLocal(funnelTopLocal, newItems);
          } else {
            newItems.funnelTopID =
              // eslint-disable-next-line prefer-spread
              Math.max.apply(
                Math,
                funnelTopAll?.rows?.map((item) => item.funnelTopID)
              ) + 1;
            saveFunnelTopLocal(funnelTopAll, newItems);
          }
        } else {
          newItems.funnelTopID = funnelTopLocal ? funnelTopLocal.rows.length + 1 : 1;
          saveFunnelTopLocal(funnelTopLocal, newItems);
        }

        dispatch(ModalAction.CLOSE());
      } else {
        selectTopEdit?.isAdd ? (newItems.isAdd = 1) : (newItems.isUpdate = 1);
        newItems.modifyUserID = currentUser.employeeID;

        if (funnelTopAll?.rows?.length > 0) {
          if (funnelTopLocal) {
            edditToLocal(funnelTopLocal, newItems);
          } else {
            const filterList = funnelTopAll?.rows.filter((e) => e.funnelTopID !== +props.funnelTopID);
            localStorage.setItem('funnelTop', JSON.stringify({ rows: [...filterList, newItems] }));
          }
        } else {
          edditToLocal(funnelTopLocal, newItems);
        }

        dispatch(ModalAction.CLOSE());
      }
    } else {
      if (+props.funnelGenID > 0 && page !== 'Add New Funnel - Copy Project') {
        if (props.type === 'Add') {
          //dispatch(FunnelTopActions.postFunnelTop(newItems));
          dispatch(FunnelTopActions.postFunnelTop(newItems)).then(() => {
            backAndCloseModal();
          });
        } else {
          newItems.modifyUserID = currentUser.employeeID;

          dispatch(FunnelTopActions.requestPutFunnelTop(newItems)).then(() => {
            backAndCloseModal();
          });
        }
      } else {
        newItems.productDescStr = productDescStr === 'e.g.Down Payment' ? '' : productDescStr;
        newItems.serviceDescStr = serviceDescStr === 'e.g.Down Payment' ? '' : serviceDescStr;
        //newItems.supportDocStr = supportDocStr === 'e.g.PO/SPK/CONTRACT' ? '' : supportDocStr;

        if (props.type === 'Add') {
          newItems.funnelTopID = funnelTopLocal ? funnelTopLocal.rows.length + 1 : 1;
          saveFunnelTopLocal(funnelTopLocal, newItems);
        } else {
          newItems.modifyUserID = currentUser.employeeID;
          edditToLocal(funnelTopLocal, newItems);
        }
        dispatch(ModalAction.CLOSE());
      }
    }
  };
  const backAndCloseModal = () => {
    props.setActivePage(1);
    dispatch(FunnelTopActions.requestFunnelTop(+props.funnelGenID, 1, 5));
  };

  const cancelClick = () => {
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  const onTOPType = (values: any) => {
    const tops = selectTopTypeOptions.filter((item: any) => {
      return item.value === values;
    });

    if (tops.length > 0) {
      setTopTypes(tops[0].text);
    }
  };
  const onPctgProduct = (event: any) => {
    if (event > 100) {
      setPctgProduct(100);
    } else if (event < 0) {
      setPctgProduct(1);
    } else {
      setPctgProduct(event);
    }
  };
  const onServiceProduct = (event: any) => {
    if (event > 100) {
      setServiceProduct(100);
    } else if (event < 0) {
      setServiceProduct(1);
    } else {
      setServiceProduct(event);
    }
  };
  const onProductDesc = (values: any) => {
    //setProductDesc(values);
    const prods = selectProductDescOptions.find((item: any) => {
      if (item.value === values) {
        setDescProduct(item.text);
        setDescProductVal(item.value);

        setSelectTopEditState({
          ...selectTopEditState,
          productDesc: item.value,
        });
      }
      // return item.value === values;
    });

    // if (prods.length > 0) {
    // setDescProduct(prods[0].text);
    // setDescProductVal(prods[0].value);
    // }
  };

  const onServiceDesc = (values: any) => {
    //setServiceDesc(values);
    const prods = selectProductDescOptions.filter((item: any) => {
      return item.value === values;
    });

    if (prods.length > 0) {
      setDescService(prods[0].text);
    }
  };

  const onAmount = (values: any) => {
    setAmount(values);
  };

  useEffect(() => {
    dispatch(FunnelTopActions.clearResult());
    /*dispatch(
      FunnelTopActions.requestDropdownProductDesc(
        isNaN(viewFunnelCustomer.estDurationProject)
          ? localStorage.getItem('projectDuration') != null
            ? +localStorage.getItem('projectDuration')
            : 0
          : viewFunnelCustomer.estDurationProject,
        viewFunnelCustomer.estDurationType === 'months'
          ? 'month'
          : viewFunnelCustomer.estDurationType === ''
          ? 'month'
          : viewFunnelCustomer.estDurationType,
        'product'
      )
    );*/
    dispatch(
      FunnelTopActions.requestDropdownProductDesc(
        editViewFunnel != null ? +editViewFunnel[0].estDurationProject : viewFunnelCustomer.estDurationProject,
        editViewFunnel != null ? editViewFunnel[0].estDurationType : viewFunnelCustomer.estDurationType,
        'product'
      )
    );
    if (funnelProductService?.totalRows) {
      const itemTypeService = funnelProductService.rows.find((e) => e.itemType === 19 && e.isDelete !== 1);
      const itemTypeProduct = funnelProductService.rows.find((e) => e.itemType === 18 && e.isDelete !== 1);

      funnelProductService?.totalItemProduct || itemTypeProduct ? setDisableFieldProduct(false) : setDisableFieldProduct(true);
      funnelProductService?.totalItemService || itemTypeService ? setDisableFieldService(false) : setDisableFieldService(true);

      setIsEmptyProductService(false);
    } else {
      setIsEmptyProductService(true);
    }

    if (props.type === 'Edit') {
      dispatch(FunnelTopActions.requestFunnelTopById(props.funnelTopID));
    }

    if (isSalesAnalis || page === 'Add New Funnel - Copy Project') {
      dispatch(FunnelTopActions.requestFunnelTopAll(+props.funnelGenID));
    }
  }, [funnelProductService, viewFunnelCustomer]);

  const lengthProduct = funnelProductService?.rows?.filter((item: any) => item.itemType === 18 && item.isDelete !== 1);
  const lengthService = funnelProductService?.rows?.filter((item: any) => item.itemType === 19 && item.isDelete !== 1);
  const validate = combineValidators({
    supportDocArr: isRequired('Type of Supporting Document'),
    topType: isRequired('TOP Type'),
    amount: (val) =>
      topTypes === 'Pay Per Use'
        ? val
          ? false
          : true
        : topTypes === 'Pay Per Fixed Amount' &&
          (descProduct === 'Monthly' ||
            descProduct === 'Per 4 Months' ||
            descProduct === 'Yearly' ||
            descProduct === 'Quaterly' ||
            descProduct === 'Per 6 Months')
        ? val
          ? false
          : true
        : topTypes === 'Pay Per Fixed Amount' &&
          (descService === 'Monthly' ||
            descService === 'Per 4 Months' ||
            descService === 'Yearly' ||
            descService === 'Quaterly' ||
            descService === 'Per 6 Months')
        ? val
          ? false
          : true
        : false,
    productDesc: (val) => (funnelProductService?.totalItemProduct || lengthProduct.length ? (descService != '' ? false : val ? false : true) : false),
    productPercentage: (val) =>
      funnelProductService?.totalItemProduct || lengthProduct.length
        ? val
          ? false
          : descService != ''
          ? false
          : topTypes === 'Pay Per Use' ||
            (topTypes === 'Pay Per Fixed Amount' &&
              (descProduct === 'Monthly' ||
                descProduct === 'Per 4 Months' ||
                descProduct === 'Yearly' ||
                descProduct === 'Quaterly' ||
                descProduct === 'Per 6 Months'))
          ? false
          : true
        : false,
    serviceDesc: (val) => (funnelProductService?.totalItemService || lengthService.length ? (descProduct != '' ? false : val ? false : true) : false),
    servicePercentage: (val) =>
      funnelProductService?.totalItemService || lengthService.length
        ? val
          ? false
          : descProduct != ''
          ? false
          : topTypes === 'Pay Per Use' ||
            (topTypes === 'Pay Per Fixed Amount' &&
              (descService === 'Monthly' ||
                descService === 'Per 4 Months' ||
                descService === 'Yearly' ||
                descService === 'Quaterly' ||
                descService === 'Per 6 Months'))
          ? false
          : true
        : false,
  });
  //let bRefreshPage: boolean = useSelector((state: IStore) => state.funnelTop.refreshPage);
  const resultAction = useSelector((state: IStore) => state.funnelTop.resultActions);

  useEffect(() => {
    if (pageRefresh) {
      if (resultAction?.errorNumber === '666') {
        dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Error));
        setPageRefresh(false);
      } else {
        dispatch(ModalAction.CLOSE());
        setPageRefresh(false);
      }
    }
  }, [resultAction]);

  useEffect(() => {
    if (props.type === 'Edit') {
      if (selectTopEdit.productDesc) {
        setDescProductVal(selectTopEdit.productDesc);
      } else {
        setDescProductVal(0);
      }
    }
  }, [selectProductDescOptions]);

  return (
    <Fragment>
      <Card.Header>{props.type} TOP</Card.Header>
      <Divider></Divider>

      <FinalForm
        validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={props.type === 'Edit' ? selectTopEditState : ''}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="topType"
                    labelName="TOP Type"
                    component={SelectInput}
                    placeholder="e.g.Hitachi"
                    options={selectTopTypeOptions}
                    onChanged={onTOPType}
                    mandatory={false}
                    // allowAdditions={false}
                    //onAddItems={onAddBrand}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="productDesc"
                    labelName="Description Product"
                    component={SelectInput}
                    placeholder="e.g.Down Payment"
                    options={selectProductDescOptions}
                    allowAdditions={false}
                    disabled={isEmptyProductService || disableFieldProduct}
                    onChanged={onProductDesc}
                    values={props.type === 'Edit' ? descProductVal : ''}
                    //onAddItems={onAddBrand}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="productPercentage"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Product Percentage"
                    thousandSeparator={true}
                    mandatory={false}
                    values={pctgProduct}
                    onChange={onPctgProduct}
                    disabled={
                      isEmptyProductService ||
                      disableFieldProduct ||
                      topTypes === 'Pay Per Use' ||
                      (topTypes === 'Pay Per Fixed Amount' &&
                        (descProduct === 'Monthly' ||
                          descProduct === 'Per 4 Months' ||
                          descProduct === 'Yearly' ||
                          descProduct === 'Quaterly' ||
                          descProduct === 'Per 6 Months'))
                    }
                    // values={productPercentage}
                    // defaultValue={productPercentage}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="serviceDesc"
                    labelName="Description Service"
                    component={SelectInput}
                    placeholder="e.g.Down Payment"
                    options={selectProductDescOptions}
                    allowAdditions={false}
                    onChanged={onServiceDesc}
                    disabled={isEmptyProductService || disableFieldService}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="servicePercentage"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="Service Percentage"
                    thousandSeparator={true}
                    mandatory={false}
                    values={serviceProduct}
                    onChange={onServiceProduct}
                    disabled={
                      isEmptyProductService ||
                      disableFieldService ||
                      topTypes === 'Pay Per Use' ||
                      (topTypes === 'Pay Per Fixed Amount' &&
                        (descService === 'Monthly' ||
                          descService === 'Per 4 Months' ||
                          descService === 'Yearly' ||
                          descService === 'Quaterly' ||
                          descService === 'Per 6 Months'))
                    }
                    // meta={{
                    //   error: 'Service Percentage  is required',
                    //   touched: true,
                    // }}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="supportDocArr"
                    labelName="Type of Supporting Document"
                    component={DropdownInput}
                    placeholder="e.g.PO/SPK/CONTRACT"
                    options={selectSupportingDocOptions}
                    allowAdditions={false}
                    mandatory={false}
                    //onAddItems={onAddBrand}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="docCollectionDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Supporting Doc Collection Date"
                    date={true}
                    minDate={new Date()}
                    //disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>
              {(topTypes === 'Pay Per Use' ||
                descProduct === 'Monthly' ||
                descProduct === 'Per 4 Months' ||
                descProduct === 'Yearly' ||
                descProduct === 'Quaterly' ||
                descProduct === 'Per 6 Months' ||
                descService === 'Monthly' ||
                descService === 'Per 4 Months' ||
                descService === 'Yearly' ||
                descService === 'Quaterly' ||
                descService === 'Per 6 Months') && (
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="amount"
                      labelName="Amount"
                      onChange={onAmount}
                      component={NumberInput}
                      thousandSeparator={true}
                      placeholder="e.g. 10000"
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="totalAmount"
                      labelName="Total Amount"
                      disabled
                      values={
                        viewFunnelCustomer.estDurationType === 'years' && (descProduct === 'Per 6 Months' || descService === 'Per 6 Months') // 6 Month
                          ? amount * ((viewFunnelCustomer.estDurationProject * 12) / 2)
                          : viewFunnelCustomer.estDurationType === 'years' && (descProduct === 'Yearly' || descService === 'Yearly') // Yearly
                          ? amount * viewFunnelCustomer.estDurationProject
                          : viewFunnelCustomer.estDurationType === 'years' && (descProduct === 'Quaterly' || descService === 'Quaterly') // Quaterly
                          ? amount * ((viewFunnelCustomer.estDurationProject * 12) / 3)
                          : viewFunnelCustomer.estDurationType === 'years' && (descProduct === 'Per 4 Months' || descService === 'Per 4 Months') // Per 4 Month
                          ? amount * ((viewFunnelCustomer.estDurationProject * 12) / 4)
                          : viewFunnelCustomer.estDurationType === 'years' && (descProduct === 'Monthly' || descService === 'Monthly') // Monthly
                          ? amount * viewFunnelCustomer.estDurationProject
                          : viewFunnelCustomer.estDurationType === 'months' && (descProduct === 'Per 6 Months' || descService === 'Per 6 Months') // 6 Month
                          ? amount * (viewFunnelCustomer.estDurationProject / 2)
                          : viewFunnelCustomer.estDurationType === 'months' && (descProduct === 'Yearly' || descService === 'Yearly') // Yearly
                          ? amount * viewFunnelCustomer.estDurationProject
                          : viewFunnelCustomer.estDurationType === 'months' && (descProduct === 'Quaterly' || descService === 'Quaterly') // Quaterly
                          ? amount * (viewFunnelCustomer.estDurationProject / 3)
                          : viewFunnelCustomer.estDurationType === 'months' && (descProduct === 'Per 4 Months' || descService === 'Per 4 Months') // Per 4 Month
                          ? amount * (viewFunnelCustomer.estDurationProject / 4)
                          : viewFunnelCustomer.estDurationType === 'months' && (descProduct === 'Monthly' || descService === 'Monthly') // Monthly
                          ? amount * viewFunnelCustomer.estDurationProject
                          : viewFunnelCustomer.estDurationType === 'days' && (descProduct === 'Monthly' || descService === 'Monthly') // Monthly
                          ? amount * (viewFunnelCustomer.estDurationProject / 30)
                          : amount
                      }
                      component={NumberInput}
                      thousandSeparator={true}
                      placeholder="e.g. 10000"
                    />
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
            <br />
            <Button className="MarBot20" floated="right" type="submit" disabled={invalid} color="blue">
              Save
            </Button>
            <Button floated="right" type="button" onClick={cancelClick}>
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default FunnelTopForm;

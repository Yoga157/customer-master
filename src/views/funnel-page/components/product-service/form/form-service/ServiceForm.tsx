import React, { useEffect, Fragment, useState } from 'react';
import { SelectInput, TextInput, Button, NumberInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { combineValidators, isRequired, composeValidators, createValidator } from 'revalidate';
import ProductServiceModel from 'stores/funnel-product-service/models/ProductServiceModel';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import {
  selectProductServiceSingle,
  selectTotalInternalService,
  selectSubItem,
  selectProductServiceAll,
} from 'selectors/funnel-product-service/ProductServiceSelector';
import IProductServiceTableRow from 'selectors/funnel-product-service/models/IProductServiceTableRow';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';

import { selectTotalFunnelSC } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import { selectServiceItemOptions } from 'selectors/select-options/ServiceItemSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ServiceItemAction from 'stores/service-item/ServiceItemAction';
import RowData from 'stores/funnel-cost/models/TableRowModel';
import axios from 'axios';
import environment from 'environment';
import { selectProductService } from 'selectors/funnel-product-service/ProductServiceSelector';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';

interface IProps {
  funnelGenID: string;
  funnelItemsID: string;
  type: string;
  rowData: any;
  setActivePage: any;
}

const ServiceForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [brandName, setBrandName] = useState(props.rowData.itemName);
  const [selling, setSelling] = useState(0);
  const [ordering, setOrdering] = useState(0);
  const [valDesc, setValDesc] = useState('');
  const [itemBrand, setItemBrand] = useState(props.rowData.itemID);
  const [switchDropdown, setSwitch] = useState(false);
  const [itemSubName, setItemSubName] = useState('');
  const totalInternalService = useSelector((state: IStore) =>
    +props.funnelGenID > 0 ? state.funnelProductService.internalService.existing : selectTotalInternalService(state)
  );
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelProductService.refreshPage);
  const [disableOrdering, setDisableOrdering] = useState(false);
  const [itemExisting, setItemExisting] = useState(false);
  const [filteredResult, setFilteredResult] = useState<any>([]);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const subItem = useSelector((state: IStore) => selectSubItem(state));
  const serviceOptions = useSelector((state: IStore) => selectServiceItemOptions(state));
  const funnelProductServiceListAll: IProductServiceTable = useSelector((state: IStore) =>
    selectProductServiceAll(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_ALL])
  );
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  // const resultMessage = useSelector((state: IStore) => state.funnelSalesAnalyst.resultActions);

  const onChangeBrand = (event: any, data: any) => {
    const value = serviceOptions.filter((item: any) => {
      return item.value === +event;
    });

    if (value[0].text === 'Cloud Services') {
      setSwitch(true);
      dispatch(ProductServiceActions.requestDropdownCloudService(value[0].value));
      onChangeCheckService(event);
    } else {
      setSwitch(false);
      onChangeCheckService(event);
    }

    if (value.length > 0) {
      setBrandName(value[0].text);
    }

    setItemBrand(event);
  };

  const onSubmitHandler = async (values: any) => {
    const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;

    const newItems = new ProductServiceModel(values);
    newItems.funnelGenID = props.funnelGenID === '0' ? 0 : +props.funnelGenID;
    newItems.itemType = 19; //itemType service
    newItems.itemName = brandName;
    newItems.itemID = +itemBrand;
    newItems.itemSubName = '';
    newItems.itemSubID = values.itemSubID;
    newItems.itemSubName = itemSubName;
    newItems.createUserID = currentUser.employeeID;
    newItems.orderingPrice = +values.orderingPrice ?? 0;

    const productServiceLocal = JSON.parse(localStorage.getItem('productService'));

    if (props.type === 'Add') {
      if (+props.funnelGenID > 0 && page !== 'Add New Funnel - Copy Project') {
        if (isSalesAnalis) {
          newItems.isAdd = 1;
          if (funnelProductServiceListAll?.rows?.length > 0) {
            if (productServiceLocal) {
              saveToLocal(newItems, 'add');
            } else {
              newItems.funnelItemsID =
                Math.max.apply(
                  Math,
                  funnelProductServiceListAll?.rows?.map((item) => item.funnelItemsID)
                ) + 1;
              localStorage.setItem('productService', JSON.stringify([...funnelProductServiceListAll?.rows, newItems]));
              represhPage();
            }
          } else {
            saveToLocal(newItems, 'add');
          }
        } else {
          dispatch(ProductServiceActions.postFunnelService(newItems)).then(() => {
            represhPage();
          });
        }
      } else {
        saveToLocal(newItems, 'add');
      }
    } else {
      if (+props.funnelGenID > 0 && page !== 'Add New Funnel - Copy Project') {
        if (isSalesAnalis) {
          if (funnelProductService?.isAdd) {
            newItems.isAdd = 1;
            newItems.isDelete = 0;
            newItems.isUpdate = 0;
          } else {
            newItems.isUpdate = 1;
            newItems.isAdd = 0;
            newItems.isDelete = 0;
          }

          if (funnelProductServiceListAll?.rows?.length > 0) {
            if (productServiceLocal) {
              saveToLocal(newItems, 'edit', props.funnelItemsID);
            } else {
              let filterList = funnelProductServiceListAll?.rows.filter((e) => e.funnelItemsID !== +props.funnelItemsID);
              localStorage.setItem('productService', JSON.stringify([...filterList, newItems]));
              represhPage();
            }
          } else {
            saveToLocal(newItems, 'edit', props.funnelItemsID);
          }
        } else {
          dispatch(ProductServiceActions.putFunnelService(newItems)).then(() => {
            represhPage();
          });
        }
      } else {
        saveToLocal(newItems, 'edit', props.funnelItemsID);
      }
    }
  };

  // useEffect(() => {
  //   if (resultMessage?.errorNumber === '666') {
  //     dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Warning));
  //     dispatch(FunnelSalesAnalystActions.removeResult());
  //   }
  // }, [resultMessage]);

  const saveToLocal = (newItems: any, eType: string, funnelItemsID?: string) => {
    if (eType === 'add') {
      dispatch(ProductServiceActions.postFunnelProductServiceLocal(newItems)).then(() => {
        represhPage();
      });
    } else {
      dispatch(ProductServiceActions.editFunnelProductServiceLocal(newItems, funnelItemsID)).then(() => {
        represhPage();
      });
    }
  };

  const represhPage = () => {
    const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;

    if (+props.funnelGenID > 0 && page !== 'Add New Funnel - Copy Project') {
      if (isSalesAnalis) {
        dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
      } else {
        dispatch(ProductServiceActions.requestFunnelProductServiceAll(+props.funnelGenID, 1, ''));
        dispatch(ProductServiceActions.requestFunnelProductService(+props.funnelGenID, 1, 5));
        dispatch(FunnelActions.requestViewFunnelSellingById(+props.funnelGenID));
      }
    } else {
      dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
    }
    props.setActivePage(1);
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  const cancelClick = () => {
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  const effectEditLocal = () => {
    dispatch(ProductServiceActions.requestProductServiceLocal(+props.funnelItemsID));
    checkExistingDropdownLocal();
    const itemName = document.querySelector(
      'body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(1) > div > div > div.ui.search.selection.dropdown > div.text'
    )! as HTMLInputElement;
    itemName.textContent = props.rowData.itemName;

    dispatch(ServiceItemAction.requestServiceItem(currentUser.direktoratID, props.rowData.funnelGenID, props.rowData.itemID));
    handleCheckItemExisting(props.rowData.itemID, props.rowData.funnelGenID);

    if (props.rowData.itemName === 'Cloud Services') {
      dispatch(ProductServiceActions.requestDropdownCloudService(props.rowData.itemID)).then(() => {
        setSwitch(true);
      });
    } else {
      onChangeCheckService(props.rowData.itemID);
    }
  };

  const effectEditEmptyLocalWhenSA = () => {
    dispatch(ProductServiceActions.requestFunnelService(+props.funnelItemsID));
    dispatch(ServiceItemAction.requestServiceItem(currentUser.direktoratID, props.rowData.funnelGenID, props.rowData.itemID));
    handleCheckItemExisting(props.rowData.itemID, props.rowData.funnelGenID);
    if (props.rowData.itemName === 'Cloud Services') {
      dispatch(ProductServiceActions.requestDropdownCloudService(props.rowData.itemID)).then(() => {
        setSwitch(true);
      });
    } else {
      onChangeCheckService(props.rowData.itemID);
    }
  };

  useEffect(() => {
    const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;

    if (+props.funnelGenID > 0) {
      if (isSalesAnalis || page === 'Add New Funnel - Copy Project') {
        if (props.type == 'Edit') {
          if (JSON.parse(localStorage.getItem('productService'))) {
            effectEditLocal();
          } else {
            effectEditEmptyLocalWhenSA();
          }
        } else {
          if (JSON.parse(localStorage.getItem('productService'))) {
            checkExistingDropdownLocal();
            dispatch(ProductServiceActions.requestProductServiceLocal(+props.funnelItemsID));
            dispatch(ServiceItemAction.requestServiceItem(currentUser.direktoratID, +props.funnelGenID, 0));
          } else {
            dispatch(ProductServiceActions.requestFunnelService(+props.funnelItemsID));
            dispatch(ServiceItemAction.requestServiceItem(currentUser.direktoratID, +props.funnelGenID, -0));
          }
        }
      } else {
        if (props.type == 'Edit') {
          effectEditEmptyLocalWhenSA();
        } else {
          dispatch(ProductServiceActions.requestFunnelService(+props.funnelItemsID));
          dispatch(ServiceItemAction.requestServiceItem(currentUser.direktoratID, +props.funnelGenID, -0));
        }
      }
    } else {
      if (props.type == 'Edit') {
        effectEditLocal();
      } else {
        checkExistingDropdownLocal();
        dispatch(ProductServiceActions.requestProductServiceLocal(+props.funnelItemsID));
        dispatch(ServiceItemAction.requestServiceItem(currentUser.direktoratID, +props.funnelGenID, 0));
      }
    }

    if (isSalesAnalis) {
      dispatch(ProductServiceActions.requestFunnelProductServiceAll(+props.funnelGenID, 1, ''));
    }
  }, [dispatch, props.funnelGenID, props.funnelItemsID, totalInternalService]);

  const onChangeSelling = (event: any) => {
    setSelling(event);
  };

  const onChangeOrdering = (event: any) => {
    setOrdering(event);
  };

  const onChangeDesc = (event: any) => {
    setValDesc(event);
  };

  const onChangeSub = (event: any) => {
    const value = subItem.filter((el) => el.value == event);
    console.log(subItem);
    setItemSubName(value[0].text);
    if (value[0].flag === '1') {
      setDisableOrdering(true);
    } else {
      setDisableOrdering(false);
    }
  };

  const onChangeCheckService = (itemID) => {
    const controllerName = `Udc/CheckDropdownService?itemID=` + itemID;
    axios.get(environment.api.generic.replace(':controller', controllerName)).then((res) => {
      if (res.data.flag === 0) {
        setDisableOrdering(true);
      } else {
        setDisableOrdering(false);
      }
    });
  };

  const handleCheckItemExisting = async (itemID: number, funnelGenID: number): Promise<any> => {
    const controllerName = `FunnelService/CheckItemService=${itemID}?FunnelGenID=${funnelGenID}`;
    axios.get(environment.api.funnel.replace(':controller', controllerName)).then((res) => {
      if (res.data.existing === 0) {
        setItemExisting(true);
      } else {
        setItemExisting(false);
      }
    });
  };

  const isSmaller = createValidator(
    (message) => (value) => {
      if (Number(value) < Number(ordering)) {
        return message;
      }
    },
    'Selling Price is smaller than Ordering Price'
  );

  let validate: any;

  if (switchDropdown) {
    validate = combineValidators({
      itemID: isRequired('Item Name/Brand'),
      itemSubID: isRequired('Item Sub'),
      // itemDescription: isRequired('Description'),
      // orderingPrice: isRequired('Ordering Price'),
      sellingPrice: isRequired('Selling Price'),
      // sellingPrice: composeValidators(
      //     //isSmaller,

      // )(),
    });
  } else {
    validate = combineValidators({
      itemID: isRequired('Item Name/Brand'),
      itemDescription: isRequired('Description'),
      // orderingPrice: isRequired('Ordering Price'),
      sellingPrice: isRequired('Selling Price'),
      // sellingPrice: composeValidators(
      //     //isSmaller,

      // )(),
    });
  }

  const funnelProductService: IProductServiceTableRow = useSelector((state: IStore) => selectProductServiceSingle(state));
  const funnelProductServiceTable: IProductServiceTable = useSelector((state: IStore) =>
    selectProductService(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE])
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ServiceItemAction.REQUEST_SERVICE_ITEM,
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE,
      ProductServiceActions.REQUEST_POST_FUNNEL_SERVICE,
      ProductServiceActions.REQUEST_PUT_FUNNEL_SERVICE,
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL,
    ])
  );
  const totalServiceCatalog = useSelector((state: IStore) => selectTotalFunnelSC(state));

  const checkExistingDropdownLocal = () => {
    let filteredDropdown: any = [];

    if (funnelProductServiceTable.totalRow == 1) {
      filteredDropdown = serviceOptions.filter((el) => el.text != funnelProductServiceTable.rows[0].itemName);
      serviceOptions.map((item) => {
        if (filteredDropdown.some((el) => el.text == 'Cloud Services')) {
        } else {
          if (item.text === 'Cloud Services') {
            const val = {
              text: item.text,
              value: item.value,
            };

            filteredDropdown.push(val);
          }
        }
      });
    } else if (funnelProductServiceTable.totalRow == 2) {
      filteredDropdown = serviceOptions.filter(
        (el) => el.text != funnelProductServiceTable.rows[0].itemName && el.text != funnelProductServiceTable.rows[1].itemName
      );
      serviceOptions.map((item) => {
        if (filteredDropdown.some((el) => el.text == 'Cloud Services')) {
        } else {
          if (item.text === 'Cloud Services') {
            const val = {
              text: item.text,
              value: item.value,
            };

            filteredDropdown.push(val);
          }
        }
      });
    } else if (funnelProductServiceTable.totalRow == 3) {
      filteredDropdown = serviceOptions.filter(
        (el) =>
          el.text != funnelProductServiceTable.rows[0].itemName &&
          el.text != funnelProductServiceTable.rows[1].itemName &&
          el.text != funnelProductServiceTable.rows[2].itemName
      );
      serviceOptions.map((item) => {
        if (filteredDropdown.some((el) => el.text == 'Cloud Services')) {
        } else {
          if (item.text === 'Cloud Services') {
            const val = {
              text: item.text,
              value: item.value,
            };

            filteredDropdown.push(val);
          }
        }
      });
    } else if (funnelProductServiceTable.totalRow == 4) {
      filteredDropdown = serviceOptions.filter(
        (el) =>
          el.text != funnelProductServiceTable.rows[0].itemName &&
          el.text != funnelProductServiceTable.rows[1].itemName &&
          el.text != funnelProductServiceTable.rows[2].itemName &&
          el.text != funnelProductServiceTable.rows[3].itemName
      );
      serviceOptions.map((item) => {
        if (filteredDropdown.some((el) => el.text == 'Cloud Services')) {
        } else {
          if (item.text === 'Cloud Services') {
            const val = {
              text: item.text,
              value: item.value,
            };

            filteredDropdown.push(val);
          }
        }
      });
    } else if (funnelProductServiceTable.totalRow == 5) {
      filteredDropdown = serviceOptions.filter(
        (el) =>
          el.text != funnelProductServiceTable.rows[0].itemName &&
          el.text != funnelProductServiceTable.rows[1].itemName &&
          el.text != funnelProductServiceTable.rows[2].itemName &&
          el.text != funnelProductServiceTable.rows[3].itemName &&
          el.text != funnelProductServiceTable.rows[4].itemName
      );
      serviceOptions.map((item) => {
        if (filteredDropdown.some((el) => el.text == 'Cloud Services')) {
        } else {
          if (item.text === 'Cloud Services') {
            const val = {
              text: item.text,
              value: item.value,
            };

            filteredDropdown.push(val);
          }
        }
      });
    }

    return setFilteredResult(filteredDropdown);
  };

  return (
    <Fragment>
      <Card.Header>{props.type} Service</Card.Header>
      <Divider></Divider>

      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: any) => onSubmitHandler(values)}
          initialValues={funnelProductService}
          render={({ handleSubmit, pristine, invalid }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="itemID"
                      component={SelectInput}
                      /*  options={
                        totalInternalService > 0 && props.type === 'Add'
                          ? serviceOptions.filter((c) => c.value !== 32)
                          : window.location.pathname === '/data-quality/funnel-form'
                          ? filteredResult
                          : serviceOptions
                      } */
                      options={!isSalesAnalis ? serviceOptions : serviceOptions?.filter((c) => c.flag === '1')}
                      values={itemBrand}
                      onChanged={onChangeBrand}
                      mandatory={false}
                      labelName="Item Name/Brand"
                      placeholder="e.g.Internal Services"
                      disabled={
                        serviceOptions.find((i) => i.value === props.rowData.itemID && i.text === 'SSS Services')
                          ? viewFunnelCustomer.chkPMODeptID ||
                            viewFunnelCustomer.chkSMODeptID ||
                            JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit'))?.[0]?.chkPMODeptID ||
                            JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit'))?.[0]?.chkSMODeptID
                            ? JSON.parse(localStorage.getItem('productService'))
                              ? JSON.parse(localStorage.getItem('productService'))?.filter(
                                  (e) => e.itemName === 'SSS Services' && e.isDelete === 0 && e.itemType === 19
                                ).length > 1
                                ? itemExisting
                                : true
                              : funnelProductServiceListAll.rows.filter((e) => e.itemName === 'SSS Services' && e.itemType === 19).length > 1
                              ? itemExisting
                              : true
                            : itemExisting
                          : itemExisting
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  {switchDropdown ? (
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="itemSubID"
                        component={SelectInput}
                        placeholder="Item Sub"
                        labelName="Item Sub"
                        mandatory={false}
                        options={subItem}
                        onChanged={onChangeSub}
                      />
                    </Grid.Column>
                  ) : (
                    <Grid.Column>
                      <Field
                        name="itemDescription"
                        component={TextInput}
                        onChange={onChangeDesc}
                        placeholder="Description"
                        labelName="Description"
                        mandatory={false}
                      />
                    </Grid.Column>
                  )}
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="orderingPrice"
                      component={NumberInput}
                      values={ordering}
                      onChange={onChangeOrdering}
                      placeholder="e.g.99.000.00.."
                      labelName="Ordering Price"
                      thousandSeparator={true}
                      mandatory={false}
                      // readonly={funnelProductService.itemID === 32 && +totalServiceCatalog > 0}
                      disabled={disableOrdering}
                      defaultValue="0"
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="sellingPrice"
                      component={NumberInput}
                      values={selling}
                      onChange={onChangeSelling}
                      placeholder="e.g.99.000.00.."
                      labelName="Selling Price"
                      thousandSeparator={true}
                      mandatory={false}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>{' '}
              <br />
              <Button className="MarBot20" floated="right" type="submit" disabled={invalid || isRequesting} color="blue">
                Save
              </Button>
              <Button floated="right" type="button" onClick={cancelClick}>
                Cancel
              </Button>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ServiceForm;

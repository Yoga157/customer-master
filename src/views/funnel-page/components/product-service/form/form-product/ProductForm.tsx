/* eslint-disable prefer-spread */
import React, { useEffect, Fragment, useState } from "react";
import {
  SelectInput,
  TextInput,
  DateInput,
  Button,
  NumberInput,
  SearchInput,
  CheckBoxInput,
} from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Card, Divider, DropdownProps } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as SubBrandActions from "stores/brand-sub/SubBrandAction";
import {
  selectBrandOptions,
  selectSubBrandOptions,
} from "selectors/select-options";
import * as BrandActions from "stores/brand/BrandAction";
import * as ProductServiceActions from "stores/funnel-product-service/ProductServiceActions";
import * as FunnelActions from "stores/funnel/FunnelActions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator,
} from "revalidate";
import ProductServiceModel from "stores/funnel-product-service/models/ProductServiceModel";
import {
  selectProductServiceSingle,
  selectTotalOrdering,
  selectTotalOrderProduct,
  selectTotalOrderService,
  selectTotalSelling,
  selectTotalSellingProduct,
  selectTotalSellingService,
  selectSupplierName,
  selectProductServiceAll,
  selectProductService,
  selectFunnelVoucherAmount,
  selectProcessorType,
} from "selectors/funnel-product-service/ProductServiceSelector";
import IProductServiceTableRow from "selectors/funnel-product-service/models/IProductServiceTableRow";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import SubBrandModel from "stores/brand-sub/models/SubBrandModel";
import BrandModel from "stores/brand/models/BrandModel";
import IProductServiceTable from "selectors/funnel-product-service/models/IProductServiceTable";
import axios from "axios";
import environment from "environment";
import {
  selectDropDownSearchCBV,
  selectAmountUnsettleOrdering,
  selectAmountUnsettleSelling,
  selectBillingPeriod,
  selectVoucherAmount,
} from "selectors/aws-billing/AWSBillingServiceSelector";
import * as AWSBillingActions from "stores/aws-billing/AWSBillingActions";
import moment from "moment";
import AWSAmountUnsettleModel from "stores/aws-billing/models/AWSAmountUnsettleModel";
import AWSBillingPeriodModel from "stores/aws-billing/models/AWSBillingPeriodModel";
import FunnelVoucherAmountPICNameModel from "stores/funnel-product-service/models/FunnelVoucherAmountPICNameModel";
import { selectEmployee } from "selectors/funnel/FunnelSelector";

interface IProps {
  funnelGenID: string;
  funnelItemsID: string;
  type: string;
  rowData: any;
  setActivePage: any;
  projectCategory: string;
  currency?: string;
  setValidasiSubBrand?: any;
  currentDate?: string;
  customerGenID: number;
}

const ProductForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const isLoadingSupplier: boolean = useSelector((state: IStore) => selectRequesting(state, [ProductServiceActions.REQUEST_DROPDOWN_SUPPLIER]));
  const [brandID, setBrandID] = useState(0);
  const [brandName, setBrandName] = useState(
    props.rowData.itemName ? props.rowData.itemName : ""
  );
  const [optProccessor, setOptProccessor] = useState({
    valueId: 0,
    valueText: props.rowData.processorTypeName ? "Intel" : "Intel",
  });

  const [subBrandID, setSubBrandID] = useState(0);
  const [subBrandName, setSubBrandName] = useState(
    props.rowData.itemSubName ? props.rowData.itemSubName : ""
  );
  const [selling, setSelling] = useState(
    props.rowData.sellingPrice > 0 ? props.rowData.sellingPrice : 0
  );
  const [ordering, setOrdering] = useState(0);
  const [valDesc, setValDesc] = useState("");
  const [supplier, setSupplier] = useState(
    props.projectCategory === "Billing AWS" ? "AMAZON WEB SERVICES, INC." : ""
  );
  const [description, setDescription] = useState(
    props.rowData.itemDescription ? props.rowData.itemDescription : ""
  );
  const [searchSupplier, setSearchSupplier] = useState(props.projectCategory === 'Billing AWS' ? 'AMAZON WEB SERVICES, INC.' : '');
  const [supplierID, setSupplierID] = useState('');
  const [cbvNumber, setCbvNumber] = useState("");
  const [AmountCBV, setAmountCBV] = useState(0);
  const [TriggerSubBrand, setTriggerSubBrand] = useState(false);
  const [TriggerInclude, setTriggerInclude] = useState(false);
  const [ErrorSearch, setErrorSearch] = useState(false);
  const [TempSubBrand, setTemptSubBrand] = useState([]);
  const [validasiForm, setValidasiForm] = useState("");
  const [checkVoc, setCheckVoc] = useState("true");
  const [needSales, setNeedSales] = useState(
    props.rowData.flagSalesSpesialis ? true : false
  );
  const [salesSpesialis, setSalesSpesialis] = useState(
    props.rowData.salesSpesialis ? props.rowData.salesSpesialis : null
  );

  const CBVStoreSearch = useSelector((state: IStore) =>
    selectDropDownSearchCBV(state)
  );
  const isLoadingSearch: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [AWSBillingActions.REQUEST_DROPDOWN_SEARCH_CBV])
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const totalSellingPrice = useSelector((state: IStore) =>
    selectTotalSelling(state)
  );
  const totalOrderingPrice = useSelector((state: IStore) =>
    selectTotalOrdering(state)
  );
  const totalOrderProduct = useSelector((state: IStore) =>
    selectTotalOrderProduct(state)
  );
  const totalOrderService = useSelector((state: IStore) =>
    selectTotalOrderService(state)
  );
  const totalSellingProduct = useSelector((state: IStore) =>
    selectTotalSellingProduct(state)
  );
  const totalSellingService = useSelector((state: IStore) =>
    selectTotalSellingService(state)
  );

  const funnelProductServiceListAll: IProductServiceTable = useSelector(
    (state: IStore) =>
      selectProductServiceAll(state, [
        ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_ALL,
      ])
  );
  const funnelProductService: IProductServiceTableRow = useSelector(
    (state: IStore) => selectProductServiceSingle(state)
  );
  const funnelProductServices: IProductServiceTable = useSelector(
    (state: IStore) =>
      selectProductService(state, [
        ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE,
      ])
  );

  const salesSpesialisOptions = useSelector((state: IStore) =>
    selectEmployee(state)
  );

  // useEffect(() => {
  //   if (+props.funnelGenID > 0) {
  //     let GetItemDesc = funnelProductServices.rows?.map((item) => {
  //       if(item.itemSubName === "Outpost AWS" || item.itemSubName === "CLOUD")
  //       {
  //         setDescription(item.itemDescription)
  //       }
  //     })
  //   }
  // }, [funnelProductServices.rows])
  const brandOptions = useSelector((state: IStore) =>
    selectBrandOptions(state)
  );
  const subBrandOptions = useSelector((state: IStore) =>
    selectSubBrandOptions(state)
  );
  const bRefreshSubBrand: boolean = useSelector(
    (state: IStore) => state.subBrand.refreshPage
  );
  const bRefreshBrand: boolean = useSelector(
    (state: IStore) => state.brand.refreshPage
  );
  const isSalesAnalis: boolean = useSelector(
    (state: IStore) => state.funnel.isFunnelStatusActive
  );
  const AmountOrdering: AWSAmountUnsettleModel = useSelector((state: IStore) =>
    selectAmountUnsettleOrdering(state)
  );
  const AmountSelling: AWSAmountUnsettleModel = useSelector((state: IStore) =>
    selectAmountUnsettleSelling(state)
  );
  const BillingPeriod: AWSBillingPeriodModel = useSelector((state: IStore) =>
    selectBillingPeriod(state)
  );
  const FunnelVoucherAmount: FunnelVoucherAmountPICNameModel = useSelector(
    (state: IStore) => selectFunnelVoucherAmount(state)
  );
  const processorTypeOptions = useSelector((state: IStore) =>
    selectProcessorType(state)
  );

  const [RunAPIBilling, setRunAPIBilling] = useState(false);
  const [RunAPIAmount, setRunAPIAmount] = useState(false);
  const [RunFunnelVoucher, setRunFunnelVoucher] = useState(false);

  useEffect(() => {
    if (RunAPIBilling) {
      setRunAPIBilling(false);
      setDescription(BillingPeriod.value);
      setValidasiForm(BillingPeriod.value);
      dispatch(
        AWSBillingActions.requestAmountUnsettleOrdering(
          BillingPeriod.value,
          currentUser.employeeID,
          props.currency?.toUpperCase(),
          +props.funnelGenID > 0 ? props.currentDate : currentDateNow,
          props.customerGenID
        )
      ).then(() => {
        setRunAPIAmount(true);
      });
      dispatch(
        AWSBillingActions.requestAmountUnsettleSelling(
          BillingPeriod.value,
          currentUser.employeeID,
          props.currency?.toUpperCase(),
          +props.funnelGenID > 0 ? props.currentDate : currentDateNow,
          props.customerGenID
        )
      ).then(() => {
        setRunAPIAmount(true);
      });
    }
  }, [BillingPeriod, RunAPIBilling]);

  useEffect(() => {
    if (RunAPIAmount) {
      setRunAPIAmount(false);
      if (subBrandName !== "CBV") {
        setSelling(AmountSelling.value);
        setOrdering(AmountOrdering.value);
      }
    }

    if (RunFunnelVoucher) {
      setRunFunnelVoucher(false);
      setTimeout(() => {
        setAmountCBV(FunnelVoucherAmount?.value);
      }, 1000);
    }
  }, [RunAPIAmount, AmountSelling, AmountOrdering, RunFunnelVoucher]);

  const onChangeBrand = (event: any) => {
    if (event > 0) {
      const value = brandOptions.filter((item: any) => {
        return item.value === event;
      });

      if (value.length > 0) {
        setBrandID(event);
        setBrandName(value[0].text);
      } else {
        setBrandID(0);
        setBrandName("");
      }

      dispatch(
        SubBrandActions.requestSubBrand(
          event,
          props.projectCategory ? props.projectCategory : ""
        )
      );
      if (+props.funnelGenID > 0 && props.projectCategory === "Billing AWS") {
        setTriggerSubBrand(true);
      }
    }
  };

  const onAddSubBrand = (e: any, data: DropdownProps) => {
    if (brandID > 0) {
      const newItems = new SubBrandModel({});
      newItems.brandID = brandID;
      newItems.subBrandID = 0;
      newItems.subBrandName =
        data.value === undefined ? "" : data.value?.toString();
      newItems.groupID = 0;

      dispatch(SubBrandActions.postSubBrand(newItems));
    }
  };

  const onAddBrand = (e: any, data: DropdownProps) => {
    const newItems = new BrandModel({});
    newItems.brandID = 0;
    newItems.brandName = data.value === undefined ? "" : data.value?.toString();
    newItems.productManager = currentUser.employeeID.toString();
    newItems.portfolio = 0;

    dispatch(BrandActions.postBrand(newItems));
  };

  // const onClickSubBrand = () => {
  //     dispatch(SubBrandActions.requestSubBrand(brandID))
  // }
  const now = moment();
  const [currentDateNow] = useState(moment(now).format("yyyy-MM-DD"));

  const onChangeSubBrand = (event: any, data: any) => {
    const value = subBrandOptions.filter((item: any) => {
      return item.value === event;
    });

    if (value.length > 0) {
      setSubBrandID(event);
      setSubBrandName(value[0].text);
    } else {
      setSubBrandID(0);
      setSubBrandName("");
    }

    if (brandName === "AWS") {
      // HitServiceBillingPerPriod(currentDateNow, currentUser.employeeID);
      dispatch(
        AWSBillingActions.requestBillingPeriod(
          currentDateNow,
          currentUser.employeeID,
          props.customerGenID
        )
      ).then(() => {
        setRunAPIBilling(true);
      });
    }

    if (value[0].text === "CBV") {
      setValidasiForm(value[0].text);
      setSelling(0);
      setOrdering(0);
    }
  };

  const onChangeProcessor = (event: any, data: any) => {
    const value = processorTypeOptions.filter((item: any) => {
      return item.value === event;
    });
    if (value.length > 0) {
      setOptProccessor({
        valueId: event,
        valueText: value[0].text,
      });
    } else {
      setOptProccessor({
        valueId: 0,
        valueText: "",
      });
    }
  };

  function checkSubBrandName(brandName) {
    return brandName.text === "CBV";
  }

  const onSubmitHandler = (values: any) => {
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;
    const newItems = new ProductServiceModel(values);

    // if(+props.funnelGenID === 0 && props.projectCategory === "Billing AWS")
    // {
    //   if(subBrandName !== "CBV")
    //   {
    //     let subBrand = subBrandOptions.find(checkSubBrandName)
    //     localStorage.setItem("TempSubBrand", JSON.stringify([subBrand]))
    //   }
    // }

    //Aktifkan Validasi ketika Input Non CBV
    if (props.projectCategory === "Billing AWS") {
      if (subBrandName !== "CBV") {
        const subBrand = subBrandOptions.find(checkSubBrandName);
        localStorage.setItem("TempSubBrand", JSON.stringify([subBrand]));
      }
    }

    //Ketika Update ChangeSubBrandName dari Non CBV ke CBV Validasi nya di Hapus
    if (
      props.type === "Edit" &&
      props.projectCategory === "Billing AWS" &&
      props.rowData.itemSubName !== "CBV"
    ) {
      localStorage.removeItem("TempSubBrand");
    }

    // if(+props.funnelGenID > 0 && props.projectCategory === "Billing AWS")
    // {
    //   if(subBrandName !== "CBV")
    //   {
    //     let subBrand = subBrandOptions.find(checkSubBrandName)
    //     setTemptSubBrand(oldArray => [...oldArray, subBrand])
    //   }
    // }

    newItems.funnelGenID = props.funnelGenID === "0" ? 0 : +props.funnelGenID;
    newItems.itemType = 18; //itemType product
    newItems.itemName = brandName;
    newItems.itemSubName = subBrandName;
    newItems.createUserID = currentUser.employeeID;
    newItems.itemID = values.itemID ?? props.rowData.itemID;
    newItems.itemSubID = values.itemSubID ?? props.rowData.itemSubID;

    newItems.processorType =
      values.processorType ?? props.rowData.processorType;
    newItems.processorTypeName = optProccessor.valueText;
    // newItems.itemDescription = subBrandName === 'CBV' ? cbvNumber : description ?? props.rowData.itemDescription;
    newItems.itemDescription = subBrandName === "CBV" ? cbvNumber : description;
    newItems.supplierName = supplier;
    newItems.supplierID = props.projectCategory === "Billing AWS" ? 67997 : supplierID;
    newItems.isRental = values.isRental ? 1 : 0;
    newItems.sellingPrice = selling;

    //State
    newItems.cbvNo = cbvNumber;

    //Validasi Untuk Detail
    // if(+props.funnelGenID > 0)
    // {
    //   if(props.type === "Add")
    //   {
    //     if(brandName === "AWS" && subBrandName === "CBV")
    //     {
    //       localStorage.setItem('CBV', JSON.stringify('CBV'))
    //     } else {
    //       localStorage.setItem('nonCBV', JSON.stringify(subBrandName))
    //     }
    //   }
    // }

    newItems.flagSalesSpesialis = needSales ? 1 : 0;
    newItems.salesSpesialis = needSales ? values.salesSpesialis : "";

    const productServiceLocal = JSON.parse(
      localStorage.getItem("productService")
    );
    if (props.type === "Add") {
      props.setValidasiSubBrand(true);
      localStorage.setItem("TotalSellingPrice", values.sellingPrice);
      if (+props.funnelGenID > 0 && page !== "Add New Funnel - Copy Project") {
        if (isSalesAnalis) {
          newItems.isAdd = 1;
          newItems.isDelete = 0;
          newItems.isUpdate = 0;
          if (funnelProductServiceListAll?.rows?.length > 0) {
            if (productServiceLocal) {
              saveToLocal(newItems, "add");
            } else {
              newItems.funnelItemsID =
                Math.max.apply(
                  Math,
                  funnelProductServiceListAll?.rows?.map(
                    (item) => item.funnelItemsID
                  )
                ) + 1;
              localStorage.setItem(
                "productService",
                JSON.stringify([...funnelProductServiceListAll?.rows, newItems])
              );
              represhPage();
            }
          } else {
            saveToLocal(newItems, "add");
          }
        } else {
          dispatch(ProductServiceActions.postFunnelProduct(newItems)).then(
            () => {
              represhPage();
            }
          );
        }
      } else {
        saveToLocal(newItems, "add");
      }
    } else {
      if (+props.funnelGenID > 0 && page !== "Add New Funnel - Copy Project") {
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
              saveToLocal(newItems, "edit", props.funnelItemsID);
            } else {
              const filterList = funnelProductServiceListAll?.rows.filter(
                (e) => e.funnelItemsID !== +props.funnelItemsID
              );
              localStorage.setItem(
                "productService",
                JSON.stringify([...filterList, newItems])
              );
              represhPage();
            }
          } else {
            saveToLocal(newItems, "edit", props.funnelItemsID);
          }
        } else {
          dispatch(ProductServiceActions.putFunnelProduct(newItems)).then(
            () => {
              represhPage();
            }
          );
        }
      } else {
        saveToLocal(newItems, "edit", props.funnelItemsID);
      }
    }
    setSupplier("");
    setSupplierID(null);
  };

  const saveToLocal = (
    newItems: any,
    eType: string,
    funnelItemsID?: string
  ) => {
    if (eType === "add") {
      dispatch(
        ProductServiceActions.postFunnelProductServiceLocal(newItems)
      ).then(() => {
        represhPage();
      });
    } else {
      dispatch(
        ProductServiceActions.editFunnelProductServiceLocal(
          newItems,
          funnelItemsID
        )
      ).then(() => {
        represhPage();
      });
    }
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const [validateAmountOrdering, setValidateAmountOrdering] = useState(true);
  const onChangeSelling = (event: any) => {
    if (event > 0) {
      setSelling(event);
    } else if (subBrandName === "CBV") {
      setSelling(event);
    } else {
      setSelling(0);
    }
  };

  const onChangeOrdering = (event: any) => {
    setOrdering(event);
    if (subBrandName === "CBV") {
      if (validasiForm === "CBV" ? event > 0 : ordering) {
        if (AmountCBV >= event) {
          setValidateAmountOrdering(true);
        } else if (AmountCBV <= event) {
          setValidateAmountOrdering(false);
        }
      } else {
        const Calculate = Math.abs(event);
        if (AmountCBV >= Calculate) {
          setValidateAmountOrdering(true);
        } else if (AmountCBV <= Calculate) {
          setValidateAmountOrdering(false);
        }
      }
    }
  };

  const onChangeDesc = (event: any) => {
    setValDesc(event);
  };

  const onChangeDescription = (event: any) => {
    setDescription(event);
    if (props.projectCategory !== "Billing AWS") {
      setValidasiForm(event);
    }

    if (!!!description) {
      setValidasiForm(event);
    }
  };

  const isSmaller = createValidator(
    (message) => (value) => {
      if (Number(value) < Number(ordering)) {
        return message;
      }
    },
    "Selling Price is smaller than Ordering Price"
  );

  const isValidSalesSpesialis = createValidator(
    (message) => (value) => {
      if (!value && needSales) {
        return message;
      }
    },
    "Sales Specialist is required!"
  );

  const validate = combineValidators({
    itemID: isRequired("Item Name/Brand"),
    itemSubID: isRequired("Sub Brand"),
    processorType: isRequired("Processor Type"),
    salesSpesialis: composeValidators(isValidSalesSpesialis)(),
    // itemDescription: isRequired('Description'),
    // orderingPrice: isRequired('Ordering Price'),
    // sellingPrice: composeValidators(
    //   //isSmaller,
    //   isRequired('Selling Price')
    // )(),
  });

  useEffect(() => {
    //Ketika Edit Customer SubName CBV 1
    if (
      (props.type === "Edit" && +props.funnelGenID > 0) ||
      (+props.funnelGenID == 0 && props.rowData.itemSubName === "CBV")
    ) {
      dispatch(
        AWSBillingActions.DropDownSearchCBV(
          currentUser.employeeID,
          "v",
          +props.funnelGenID
        )
      );
      setValidateAmountOrdering(true);
    }

    //Get Ketika Mau Edit di View Funnel Edit Customer
    if (+props.funnelGenID > 0 && props.projectCategory === "Billing AWS") {
      if (
        (TriggerSubBrand && TriggerInclude) ||
        (props.type === "Edit" && subBrandName === "CBV")
      ) {
        if (subBrandOptions.length > 0) {
          subBrandOptions.map((item) => {
            if (item.text === "CBV") {
              if (!JSON.parse(localStorage.getItem("TempSubBrand"))) {
                // setTemptSubBrand(oldArray => [...oldArray, item])
                localStorage.setItem("TempSubBrand", JSON.stringify([item]));
              }
            }
          });
          setTriggerInclude(false);
          setTriggerSubBrand(false);
        }
      }
    }
  }, [
    TriggerSubBrand,
    TriggerInclude,
    subBrandOptions,
    props.type,
    localStorage.getItem("TempSubBrand"),
  ]);

  useEffect(() => {
    // Checking Table ketika di Edit Customer
    if (+props.funnelGenID > 0 && props.projectCategory === "Billing AWS") {
      const ProductServices = funnelProductServices.rows.map((item) => {
        return item.itemSubName;
      });
      if (ProductServices.includes("CLOUD")) {
        setTriggerInclude(true);
      }
      if (ProductServices.includes("Outpost AWS")) {
        setTriggerInclude(true);
      }
    }

    if (
      props.type === "Edit" &&
      +props.funnelGenID > 0 &&
      props.rowData.itemSubName === "CBV"
    ) {
      setValidasiForm("CBV");
      // setOrdering(props.rowData.orderingPrice)
      // setSelling(props.rowData.sellingPrice)
      if (cbvNumber === "") {
        setCbvNumber(props.rowData.itemDescription);
      }
      // setValidateAmountOrdering(true)

      if (props.projectCategory === "Billing AWS" && validasiForm !== "CBV") {
        setValidateAmountOrdering(false);
      }
    }
  }, [props.rowData, AmountCBV, CBVStoreSearch, funnelProductServices]);

  useEffect(() => {
    dispatch(FunnelActions.getEmployeeBy("subordinate", "adrianus.wijaya"));
    dispatch(ProductServiceActions.requestProcessorType());
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;

    //Hendz Call API berdasarkan funnelID
    if(+props.funnelGenID === 0)
    {
      dispatch(BrandActions.requestBrandByUserlogin('0', currentUser.direktoratID, props.projectCategory ? props.projectCategory : ''));
    }
    else
    {
      dispatch(
        BrandActions.requestBrandByUserlogin(props.funnelGenID, currentUser.direktoratID, props.projectCategory ? props.projectCategory : '')
      );
    }

    if (props.type === "Edit") {
      localStorage.removeItem("TotalSellingPrice");
      if (
        +props.funnelGenID === 0 ||
        isSalesAnalis ||
        page === "Add New Funnel - Copy Project"
      ) {
        if (JSON.parse(localStorage.getItem("productService"))) {
          /*dispatch(
            BrandActions.requestBrandByUserlogin(
              "0",
              currentUser.direktoratID,
              props.projectCategory ? props.projectCategory : ""
            )
          );*/
          dispatch(
            ProductServiceActions.requestProductServiceLocal(
              +props.funnelItemsID
            )
          );
        } else {
          /*dispatch(
            BrandActions.requestBrandByUserlogin(
              props.funnelGenID,
              currentUser.direktoratID,
              props.projectCategory ? props.projectCategory : ""
            )
          );*/
          dispatch(
            ProductServiceActions.requestFunnelProduct(+props.funnelItemsID)
          );
          dispatch(SubBrandActions.requestSubBrand(props.rowData.itemID, ""));
        }
      } else {
        /*dispatch(
          BrandActions.requestBrandByUserlogin(
            props.funnelGenID,
            currentUser.direktoratID,
            props.projectCategory ? props.projectCategory : ""
          )
        );*/
        dispatch(
          ProductServiceActions.requestFunnelProduct(+props.funnelItemsID)
        );
        dispatch(SubBrandActions.requestSubBrand(props.rowData.itemID, ""));
      }
    } else {
      /*dispatch(
        BrandActions.requestBrandByUserlogin(
          "0",
          currentUser.direktoratID,
          props.projectCategory ? props.projectCategory : ""
        )
      );*/
      if (+props.funnelGenID === 0 || isSalesAnalis) {
        dispatch(ProductServiceActions.requestProductServiceLocal(0));
      } else {
        /*dispatch(
          BrandActions.requestBrandByUserlogin(
            currentUser.employeeID.toString(),
            currentUser.direktoratID,
            props.projectCategory ? props.projectCategory : ""
          )
        );*/
        dispatch(ProductServiceActions.requestFunnelProduct(0));
      }
    }

    if (isSalesAnalis) {
      dispatch(
        ProductServiceActions.requestFunnelProductServiceAll(
          +props.funnelGenID,
          1,
          ""
        )
      );
    }
  }, [props.projectCategory]);

  const represhPage = () => {
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;

    if (+props.funnelGenID > 0 && page !== "Add New Funnel - Copy Project") {
      if (isSalesAnalis) {
        dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
      } else {
        dispatch(
          ProductServiceActions.requestFunnelProductService(
            +props.funnelGenID,
            1,
            5
          )
        );
        dispatch(
          FunnelActions.requestViewFunnelSellingById(+props.funnelGenID)
        );
      }
    } else {
      dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
    }
    props.setActivePage(1);
    dispatch(ModalAction.CLOSE());
  };

  const handleSearchSupplier = (e: any) => {
    setSearchSupplier(e);
  };
  const [cbvVoc, setCbvVoc] = useState([]);

  const handleSearchCbv = (data) => {
    setCbvNumber(data);

    if (+props.funnelGenID === 0) {
      const ProductServices = JSON.parse(
        localStorage.getItem("productService")
      )?.map((itemY) => {
        return itemY.cbvNo;
      });

      const cbvVoc = CBVStoreSearch.filter(
        (itemX) => !ProductServices?.includes(itemX.text)
      );

      setCbvVoc(cbvVoc);
    }
    if (+props.funnelGenID > 0 && brandName === "AWS") {
      const ProductServices = funnelProductServices?.rows?.map((itemY) => {
        return itemY.itemDescription;
      });

      setTimeout(() => {
        const cbvVoc = CBVStoreSearch.filter(
          (itemX) => !ProductServices?.includes(itemX.text)
        );
        setCbvVoc(cbvVoc);
      }, 1000);
    }

    const names = CBVStoreSearch.map((el) => el.text);
    const Validate = names.includes(data);

    setTimeout(() => {
      if (subBrandName === "CBV" && Validate === true) {
        setCheckVoc("true");
      } else {
        setCheckVoc("");
      }
    }, 1000);
    dispatch(
      AWSBillingActions.DropDownSearchCBV(
        currentUser.employeeID,
        data,
        +props.funnelGenID
      )
    );
  };

  const onResultSelectCbv = (data: any) => {
    dispatch(
      ProductServiceActions.FunnelGetDetailVoucherAmount(
        data.result.text,
        currentUser.employeeID,
        props.currency?.toUpperCase(),
        +props.funnelGenID > 0 ? props.currentDate : currentDateNow,
        props.customerGenID,
        description
      )
    ).then(() => {
      setRunFunnelVoucher(true);
    });
    setCbvNumber(data.result.text);
    // setAmountCBV(data.result.value);
    const CBVStore =
      CBVStoreSearch &&
      CBVStoreSearch.map((item: any) => {
        if (item.title === data.result.text) {
          setErrorSearch(true);
        }
      });

    if (subBrandName === "CBV" && checkVoc === "") {
      setCheckVoc("true");
    }
  };

  const onResultSelectCustomer = (data: any) => {
    setSupplier(data.result.title);
    setSearchSupplier(data.result.title);
    setSupplierID(data.result.value);
  };

  const resultRenderer = ({
    sourceCustomerId,
    voucherNo,
    value,
    valueData,
    textData,
    text,
    flag,
    id,
  }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === "1" ? "rgba(255, 248, 54, 0.5)" : "",
        }}
      >
        {/* <div className="price">{voucherNo ? voucherNo : value ? value : valueData}</div> */}
        {subBrandName != "CBV" && (
          <div className="price">
            {voucherNo ? voucherNo : value ? value : valueData}
          </div>
        )}
        <div className="title">
          {" "}
          {sourceCustomerId ? sourceCustomerId : text ? text : textData}
        </div>
      </div>
    );
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE,
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL,
      ProductServiceActions.REQUEST_POST_FUNNEL_PRODUCT,
      ProductServiceActions.REQUEST_PUT_FUNNEL_PRODUCT,
      BrandActions.REQUEST_BRAND,
    ])
  );
  const optionSupplier = useSelector((state: IStore) =>
    selectSupplierName(state)
  );
  function checkCBVNumber(cbv) {
    return cbvNumber === cbv.text;
  }
  useEffect(() => {
    if (funnelProductService.supplierName) {
      if(props.type === 'Edit'){
        setSupplier(funnelProductService.supplierName);
        setSearchSupplier(funnelProductService.supplierName);
        setSupplierID(funnelProductService.supplierID);
      }
    }
    if (props.type === 'Edit' && +props.funnelGenID === 0 && props.rowData.itemSubName === 'CBV') {
      dispatch(AWSBillingActions.requestBillingPeriod(currentDateNow, currentUser.employeeID, props.customerGenID)).then(() => {
        setRunAPIBilling(true);
      });

      dispatch(
        ProductServiceActions.FunnelGetDetailVoucherAmount(
          cbvNumber,
          currentUser.employeeID,
          props.currency?.toUpperCase(),
          +props.funnelGenID > 0 ? props.currentDate : currentDateNow,
          props.customerGenID,
          description
        )
      ).then(() => {
        setRunFunnelVoucher(true);
      });
      setValidasiForm("CBV");
      setCbvNumber(props.rowData.itemDescription);
      // setOrdering(props.rowData.orderingPrice)
      // setSelling(props.rowData.sellingPrice)
    } else if (
      props.type === "Edit" &&
      +props.funnelGenID === 0 &&
      props.rowData.itemSubName !== "CBV"
    ) {
      setValidasiForm(props.rowData.itemSubName);
    }

    //Ketika Edit Customer SubName CBV 2
    if (
      props.type === "Edit" &&
      +props.funnelGenID > 0 &&
      props.rowData.itemSubName === "CBV"
    ) {
      dispatch(
        AWSBillingActions.requestBillingPeriod(
          currentDateNow,
          currentUser.employeeID,
          props.customerGenID
        )
      ).then(() => {
        setRunAPIBilling(true);
      });
      dispatch(
        ProductServiceActions.FunnelGetDetailVoucherAmount(
          cbvNumber,
          currentUser.employeeID,
          props.currency?.toUpperCase(),
          +props.funnelGenID > 0 ? props.currentDate : currentDateNow,
          props.customerGenID,
          description
        )
      ).then(() => {
        setRunFunnelVoucher(true);
      });
    }
  }, [
    funnelProductService,
    validateAmountOrdering,
    validasiForm,
    ordering,
    selling,
    checkVoc,
    description,
  ]);

  return (
    <Fragment>
      <Card.Header>{props.type} Product</Card.Header>
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
                      labelName="Item Name/Brand"
                      component={SelectInput}
                      placeholder="e.g.Hitachi"
                      options={brandOptions}
                      values={brandName}
                      allowAdditions={false}
                      mandatory={false}
                      onChanged={onChangeBrand}
                      //onAddItems={onAddBrand}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="itemSubID"
                      component={SelectInput}
                      onChanged={onChangeSubBrand}
                      placeholder="e.g.Block Storage"
                      labelName="Sub Brand"
                      options={
                        props.projectCategory === "Billing AWS" &&
                        +props.funnelGenID === 0
                          ? props.type === "Add"
                            ? JSON.parse(localStorage.getItem("TempSubBrand"))
                              ? JSON.parse(localStorage.getItem("TempSubBrand"))
                              : subBrandOptions
                            : props.type === "Edit" &&
                              JSON.parse(
                                localStorage.getItem("TempSubBrand")
                              ) &&
                              subBrandName === "CBV"
                            ? JSON.parse(localStorage.getItem("TempSubBrand"))
                            : subBrandOptions
                          : props.projectCategory === "Billing AWS" &&
                            +props.funnelGenID > 0
                          ? props.type === "Add"
                            ? JSON.parse(localStorage.getItem("TempSubBrand"))
                              ? JSON.parse(localStorage.getItem("TempSubBrand"))
                              : subBrandOptions
                            : props.type === "Edit" &&
                              JSON.parse(
                                localStorage.getItem("TempSubBrand")
                              ) &&
                              subBrandName === "CBV"
                            ? JSON.parse(localStorage.getItem("TempSubBrand"))
                            : subBrandOptions
                          : // props.type === "Add" ? JSON.parse(localStorage.getItem('TempSubBrand')) > 0 ? TempSubBrand : subBrandOptions : props.type === "Edit" && TempSubBrand.length > 0 && subBrandName === "CBV" ? TempSubBrand : subBrandOptions
                            subBrandOptions
                      }
                      values={subBrandName}
                      allowAdditions={false}
                      mandatory={false}
                      //onAddItems={onAddSubBrand}
                      //onClick={onClickSubBrand}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="processorType"
                      labelName="Processor Type"
                      onChanged={onChangeProcessor}
                      component={SelectInput}
                      placeholder="e.g.Intel"
                      options={processorTypeOptions}
                      values={optProccessor.valueText}
                      mandatory={false}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767"></Grid.Column>
                </Grid.Row>
                {subBrandName === "CBV" && (
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Field
                        name="cbvNo"
                        component={SearchInput}
                        placeholder="e.g. V001.."
                        labelName="CBV No"
                        handleSearchChange={handleSearchCbv}
                        onResultSelect={onResultSelectCbv}
                        loading={isLoadingSearch}
                        // results={CBVStoreSearch}
                        results={
                          JSON.parse(localStorage.getItem("productService")) ||
                          funnelProductServiceListAll.rows.length > 0
                            ? cbvVoc
                            : CBVStoreSearch
                        }
                        resultRenderer={resultRenderer}
                        values={cbvNumber}
                        // onKeyPress={(event) => {
                        //   if (event.charCode == 13) {
                        //     dispatch(AWSBillingActions.DropDownSearchCBV(currentUser.employeeID, cbvNumber));
                        //   }
                        // }}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="AmountCBV"
                          component={NumberInput}
                          placeholder="e.g.99.000.00.."
                          thousandSeparator={true}
                          labelName="Amount"
                          mandatory={false}
                          disabled={true}
                          values={AmountCBV}
                        />
                      </Grid.Column>
                    </Grid.Column>
                  </Grid.Row>
                )}
                {subBrandName != "CBV" && (
                  <Grid.Row>
                    <Grid.Column>
                      {/*   */}
                      <Field
                        name="itemDescription"
                        component={TextInput}
                        readOnly={
                          props.projectCategory === "Billing AWS" ? true : false
                        }
                        onChange={onChangeDescription}
                        placeholder="Description"
                        values={description}
                        labelName="Description"
                        mandatory={false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                )}
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="supplierName"
                      component={SearchInput}
                      placeholder="e.g.PT. Supplier .."
                      loading={isLoadingSupplier}
                      labelName="Order to"
                      onKeyPress={(e:any)=> { 
                        if (e.charCode == 13) {
                          dispatch(ProductServiceActions.requestDropdownSupplier(e.target.value));
                        }
                      }}
                      
                      onResultSelect={onResultSelectCustomer}
                      handleSearchChange={handleSearchSupplier}
                      results={isLoadingSupplier ? [] : optionSupplier}
                      values={searchSupplier}
                      defaultValue={supplier}
                      mandatory={false}
                      disabled={props.projectCategory === 'Billing AWS' ? true : false}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="BtmFormNote">Press enter to see the results</p>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="orderingPrice"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      thousandSeparator={true}
                      labelName="Ordering Price"
                      mandatory={subBrandName === "CBV" ? false : true}
                      onChange={onChangeOrdering}
                      values={ordering}
                      readonly={
                        props.projectCategory === "Billing AWS" &&
                        subBrandName != "CBV"
                          ? true
                          : false
                      }
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="sellingPrice"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      thousandSeparator={true}
                      labelName="Selling Price"
                      // mandatory={subBrandName === 'CBV' ? true : false}
                      onChange={onChangeSelling}
                      values={selling}
                      readonly={
                        props.projectCategory === "Billing AWS" &&
                        subBrandName != "CBV"
                          ? true
                          : false
                      }
                    />
                  </Grid.Column>
                </Grid.Row>

                {+props.funnelGenID > 0 && (
                  <>
                    <Grid.Row columns="equal">
                      <Grid.Column width={6} className="FullGrid1200">
                        <Grid.Row columns={1}>
                          <Grid.Column verticalAlign="middle">
                            <Field
                              name="needSales"
                              component={CheckBoxInput}
                              label="Need Sales Specialist"
                              onChange={(e) => {
                                setNeedSales(e);
                              }}
                              useValues={true}
                              values={needSales}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid.Column>

                      <Grid.Column className=" ViewLabel FullGrid1200 ">
                        {needSales && (
                          <Field
                            name="salesSpesialis"
                            component={SelectInput}
                            placeholder="e.g. Jhon Doe.."
                            labelName="Sales Specialist"
                            options={salesSpesialisOptions}
                            disabled={!needSales}
                            values={salesSpesialis}
                            onChanged={(e) => {
                              setSalesSpesialis(e);
                            }}
                            mandatory={!needSales}
                          />
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </>
                )}

                <Grid.Row columns={3}>
                  <Grid.Column className="FullGrid767" width={6}>
                    <Field
                      name="dealRegNo"
                      component={TextInput}
                      placeholder="e.g.123456.."
                      labelName="Deal Reg. Number"
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={6}>
                    <Field
                      name="dealRegExpiryDate"
                      component={DateInput}
                      placeholder="e.g.09/09/2020"
                      labelName="Deal Reg. Expiry Date"
                      date={true}
                      minDate={new Date()}
                      dropUp={true}
                    />
                  </Grid.Column>

                  <Grid.Column verticalAlign="middle" width={4}>
                    <Field
                      name="isRental"
                      component={CheckBoxInput}
                      label="Is Rental"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <br />
              <Button
                className="MarBot20"
                floated="right"
                type="submit"
                color="blue"
                disabled={
                  invalid || supplier?.trim() == '' || supplier?.length <= 5 || !brandName || !subBrandName || (subBrandName === 'CBV'
                    ? !ordering: false) || !checkVoc || !validateAmountOrdering || description?.trim() == ''
                    || (supplier.length >= 5 && supplier !== searchSupplier)
                }
              >
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

export default ProductForm;

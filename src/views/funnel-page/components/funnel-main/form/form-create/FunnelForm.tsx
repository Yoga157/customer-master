import React, { useState, useCallback, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { History } from 'history';
import { Form, Grid, Segment, Dropdown, Divider, Confirm, DropdownProps, Header, List, Input } from 'semantic-ui-react';
import {
  SelectInput,
  DateInput,
  Button,
  TextInput,
  CheckBoxInput,
  RichTextEditor,
  DropdownInput,
  NumberInput,
  SearchInput,
  SearchInputList,
  SoftwareList,
} from 'views/components/UI';
import { durationTypeOptions } from 'constants/durationTypeOptions';
import { reqDedicatedResourceOptions } from 'constants/reqDedicatedResourceOptions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CustomerForm from 'views/customer-page/components/form-create/CustomerForm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { selectCustomerPICOptions, selectEmployeeOptions, selectFunnelCurrencyOptions, selectPresalesOptions } from 'selectors/select-options';
import IStore from 'models/IStore';
import FunnelModel from 'stores/funnel/models/FunnelModel';
import FunnelsModel from 'stores/funnel/models/FunnelsModel';
import ProductServiceModel from 'stores/funnel-product-service/models/ProductServiceModel';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import CustomerToFunnelModel from 'stores/customer/models/CustomerToFunnelModel';
import { selectFunnel } from 'selectors/funnel/FunnelSelector';
import EmployeeModel from 'stores/employee/models/EmployeeModel';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';
import ProductService from 'views/funnel-page/components/product-service/ProductService';
import Attachment from 'views/attachment-page/Attachment';
import { selectCustomerPIC } from 'selectors/customer-pic/CustomerPICSelector';
import FunnelCost from '../../../funnel-cost/FunnelCost';
import axios from 'axios';
import {
  selectTotalSelling,
  selectTotalOrderProduct,
  selectTotalOrderService,
  selectTotalSellingProduct,
  selectTotalSellingService,
  selectTotalOrdering,
} from 'selectors/funnel-product-service/ProductServiceSelector';
import { selectTotalCost } from 'selectors/funnel-cost/FunnelCostSelector';

import moment from 'moment';
import ConfirmSubmit from './ConfirmSubmit';
import FunnelHeaderNameModel from 'stores/funnel/models/FunnelHeaderNameModel';
import styles from './FunnelCard.module.scss';
import { selectFunnelStatusOptions } from 'selectors/select-options/FunnelStatusSelector';
import * as PresalesSupportActions from 'stores/presales-support/PresalesSupportActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import RouteEnum from 'constants/RouteEnum';
import { selectCustomerSearchOptionsWithFlag, selectCustomerTypeC } from 'selectors/select-options/CustomerSelector';
import { selectEmployeeSearchOptions } from 'selectors/select-options/EmployeeSelector';
import {
  selectSoftwareSearchOptions,
  selectSoftwareBusiness,
  selectSoftwareDB,
  selectSoftwareInfra,
  selectSoftwareOS,
  selectSoftwareProgramming,
} from 'selectors/select-options/SoftwareSelector';
import { selectCompetitorOptions } from 'selectors/select-options/CompetitorSelector';
import { selectPMOSupport } from 'selectors/pmo-support/PMOSupportSelector';
import CustomerPICModel from 'stores/customer-pic/models/CustomerPICModel';
import { selectRows } from 'selectors/funnel-cost/FunnelCostSelector';
//Import Actions
import * as PMOSupportActions from 'stores/pmo-support/PMOSupportActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as FunnelStatusActions from 'stores/funnel-status/FunnelStatusActions';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as CompetitorActions from 'stores/competitor/CompetitorActions';
import * as CustomerActions from 'stores/customer/CustomerActions';
import * as CustomerPICActions from 'stores/customer-pic/CustomerPICActions';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as ServiceItemAction from 'stores/service-item/ServiceItemAction';

import { selectFunnelStatus } from 'selectors/funnel-status/FunnelStatusSelector';
import { selectTotalDocument } from 'selectors/attachment/AttachmentSelector';
import roundTo from 'round-to';
import environtment from 'environment';
import ConfirmBlackList from './ConfirmBlackList';
import RequestCopyProject from '../hooks/requestCopyProject';
import FunnelTop from 'views/funnel-page/components/funnel-top/FunnelTop';
import { selectProjectCategorySAOptions } from 'selectors/funnel/FunnelSelector';
import environment from 'environment';

interface LocationState {
  from: {
    pathname: string;
  };
  eventName: string;
  customerName: string;
  funnelOpportunityID: number;
  eventDate: string;
  funnelGenID: number;
  typePage: string;
  tab: string;
}

interface IProps {
  history: History;
}

const FunnelForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();
  const typePage = location?.state?.typePage;
  const funnelGenID = location?.state?.funnelGenID;
  const tab = location?.state?.tab;

  const dispatch: Dispatch = useDispatch();
  const [currentDate] = useState(new Date());
  const [durationType, setDurationType] = useState('years');
  const [compellingEvent, setCompellingEvent] = useState(false);
  const [totalSelling, setTotalSelling] = useState(Number(localStorage.getItem('TotalSellingPrice')));
  const [gpmPctg, setGpmPctg] = useState(0);
  const [gpm, setGpm] = useState(0);
  const [endUser, setEndUser] = useState(0);
  const [statusFunnel, setStatusFunnel] = useState(1);
  const [estDurationProject, setEstDurationProject] = useState(0);
  const [statusFunnelText, setStatusFunnelText] = useState('');
  const [dedicatedResource, setDedicatedResource] = useState(140);
  const [readOnly, setReadOnly] = useState(false);
  const [flagMail, setFlagMail] = useState(false);
  const [mandatory, setMandatory] = useState({
    sFunnelStatus: false,
    sDealCloseDate: false,
    sEndUser: false,
    sCustomerName: false,
    sTotalSelling: false,
    sProjectName: false,
    sCustomerNeeds: true,
    sCompetitor: true,
    sNotes: true,
    sGPM: true,
    sGPMPctg: true,
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const [customer, setCustomer] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [endUserCustomerGenID, setEndUserCustomerGenID] = useState(0);
  const [soType, setSoType] = useState('');
  const [customerEndName, setCustomerEndName] = useState('');
  const [customerPICName, setCustomerPICName] = useState('');
  const [customerPICID, setCustomerPICID] = useState(0);
  const [customerData, setCustomerData] = useState('' as any);
  const [smoDeptID, setSMODeptID] = useState('');
  const [pmoDeptID, setPMODeptID] = useState('');
  const [needPMO, setNeedPMO] = useState(false);
  const [customerEnd, setCustomerEnd] = useState(0);
  const [dealCloseDate, setDealCloseDate] = useState(365);
  const [validateFunnelStatus, setValidateFunnelStatus] = useState(false);
  const [accessArr, setAccessArr] = useState([] as any);
  const [accessArrName, setAccessArrName] = useState([] as any);
  const [defaultCust, setDefaultCust] = useState(0);
  const [picJobTitle, setPICJobTitle] = useState('');
  const [picEmailAddr, setPICEmailAddr] = useState('');
  const [picMobilePhone, setPICMobilePhone] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [calcGPM, setCalGPM] = useState(0);
  const [calcPtg, setCalPtg] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [referTo, setReferTo] = useState('');
  const [oppId, setOppId] = useState('');
  const [currentData, setCurrent] = useState({
    brandID: 0,
    createDate: '',
    createUserID: 0,
    customerGenID: 0,
    eventName: '',
    funnelID: 0,
    funnelOpportunityID: 0,
    modifyDate: '',
    modifyUserID: 0,
    notes: '',
    salesID: 0,
    status: '',
    eventDate: '',
  });
  const [filteredBusiness, setFilteredBusiness] = useState<any>();
  const [blackListFlagCust, setBlackListCust] = useState(false);
  const [blackListFlagEnd, setBlackListEnd] = useState(false);
  const [selectedCustomerBlackList, setSelectedCustomerBlackList] = useState(0);
  const [selectedCustomerBlackListText, setSelectedCustomerBlackListText] = useState('');
  const [take, setTake] = useState(false);
  const [CheckTypeC, setCheckTypeC] = useState(false);
  const [projectCategory, setProjectCategory] = useState(' ');
  const [validateCust, setValidateCus] = useState(false);
  const [validateEndCust, setValidateEndCus] = useState(false);
  const resultActionCustomerPIC = useSelector((state: IStore) => state.customerPIC.resultActions);
  const funnelRate = useSelector((state: IStore) => state.funnel.rate);
  const [addNewCust, setAddNewCust] = useState(false);
  const resultMessage = useSelector((state: IStore) => state.funnel.resultActions);
  const closeConfirm = () => {
    setOpenConfirm(false);
    setEndUser(0);
    if (blackListFlagCust) {
      setBlackListEnd(false);
    }
  };

  const onCloseHandler = () => {
    props.history.replace(RouteEnum.Funnel);
  };

  const onDuration = (event: any) => {
    Number(event) > 0 ? setEstDurationProject(+event) : setEstDurationProject(0);
    localStorage.setItem('projectDuration', event);
  };

  const onProjectCategory = (event: any) => {
    setProjectCategory(event);
  };
  const okConfirm = () => {
    if (take) {
      setOpenConfirm(false);
      setEndUser(selectedCustomerBlackList);
      setCustomerEnd(selectedCustomerBlackList);
      setCustomerEndName(selectedCustomerBlackListText);
      handleSearchChangeCustEnd(selectedCustomerBlackListText);
      dispatch(CustomerPICActions.requestCustomerPIC(+selectedCustomerBlackList, currentUser.employeeID));
      if (blackListFlagCust) {
        setBlackListEnd(true);
      }
    } else {
      setOpenConfirm(false);
      setEndUser(customer);
      setCustomerEnd(customer);
      setCustomerEndName(customerName);
      handleSearchChangeCustEnd(customerName);
      dispatch(CustomerPICActions.requestCustomerPIC(+customer, currentUser.employeeID));
      if (!isNaN(+customerEnd)) {
        dispatch(PMOSupportActions.requestPMO(currentUser.employeeID, +customerEnd));
      }
    }
    setValidateEndCus(true);
  };

  const onChangePMO = (values: any) => {
    if (values) {
      if (!isNaN(+customerEnd)) {
        dispatch(PMOSupportActions.requestPMO(currentUser.employeeID, +customerEnd));
      }
      setPMODeptID('True');
    } else {
      dispatch(PMOSupportActions.requestPMO(0, 0));
      setPMODeptID('');
    }
  };

  const onChangeSMO = (values: any) => {
    //SMO DEPTID Ke Pak Troy
    if (values) {
      setSMODeptID('1070604000');
    } else {
      setSMODeptID('');
    }
  };

  const onChangeCustomerDefault = (
    customerGenID: number,
    customerName: string,
    customerPICID: number,
    customerPICName: string,
    jobTitlePIC: string,
    emailPIC: string,
    phonePIC: string
  ) => {
    handleSearchChangeCust(customerName);
    setEndUser(customerGenID);
    setCustomer(customerGenID);
    setCustomerEnd(customerGenID);
    handleSearchChangeCustEnd(customerName);
    dispatch(CustomerPICActions.requestCustomerPIC(+customerGenID, currentUser.employeeID));
    setCustomerPICName(customerPICName);
    setCustomerPICID(customerPICID);
    onChangeCustomerPIC(customerPICID);
    setDefaultCust(1);
    setPICJobTitle(jobTitlePIC);
    setPICEmailAddr(emailPIC);
    setPICMobilePhone(phonePIC);
    setValidateCus(true);
    setValidateEndCus(true);
    setAddNewCust(true);
  };

  const onSelectBlackList = (type, customerID, customerNameProps) => {
    if (type === 'take') {
      setOpenConfirm(true);
      setCustomer(customerID);
      setCustomerName(customerNameProps);
      setTake(true);
    } else {
      setCustomer(0);
      setCustomerName('');
    }
  };

  const onResultSelectCustomer = (data: any) => {
    if (data.result.flag === '1') {
      setBlackListCust(true);
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ConfirmBlackList onSelectBlackList={onSelectBlackList} customer={data.result.price} customerName={data.result.title} />,
          ModalSizeEnum.Tiny
        )
      );
      setSelectedCustomerBlackList(data.result.price);
      setSelectedCustomerBlackListText(data.result.title);
    } else {
      setSoType(data.result.soType);
      setBlackListCust(false);
      setBlackListEnd(false);
      setOpenConfirm(true);
      setCustomer(data.result.price);
      setCustomerName(data.result.title);
      setTake(false);
    }

    if (CheckTypeC === true) {
      customerStoreSearchTypeC &&
        customerStoreSearchTypeC.map((item: any) => {
          if (item.title === data.result.title) {
            setValidateCus(true);
          }
        });
    } else {
      customerStoreSearch &&
        customerStoreSearch.map((item: any) => {
          if (item.title === data.result.title) {
            setValidateCus(true);
          }
        });
    }
  };

  const onResultSelectEndCustomer = (data: any) => {
    setCustomerEnd(data.result.price);
    setCustomerEndName(data.result.title);
    if (data.result.flag === '1') {
      setBlackListEnd(true);
    } else {
      setBlackListEnd(false);
    }
    dispatch(PMOSupportActions.requestPMO(currentUser.employeeID, +data.result.price));

    if (CheckTypeC === true) {
      customerStoreSearchTypeC &&
        customerStoreSearchTypeC.map((item: any) => {
          if (item.title === data.result.title) {
            setValidateEndCus(true);
          }
        });
    } else {
      customerStoreSearch &&
        customerStoreSearch.map((item: any) => {
          if (item.title === data.result.title) {
            setValidateEndCus(true);
          }
        });
    }
  };

  const [projectCategoryOptions, setProjectCategoryOptions] = useState([]);

  const onChangeTypeC = (values: any) => {
    if (values) {
      setCheckTypeC(true);
      setCustomer(0);
      setCustomerName(' ');
      setCustomerEnd(0);
      setCustomerEndName(' ');
      setProjectCategory('Billing AWS');
    } else {
      setCheckTypeC(false);
      setCustomer(0);
      setCustomerName(' ');
      setCustomerEnd(0);
      setCustomerEndName(' ');
      setSoType('');
      setReferTo(' ');
      localStorage.removeItem('productService');
      localStorage.removeItem('TempSubBrand');
    }
  };

  const onChangeDurationType = (e: any, data: any) => {
    setDurationType(data.value);
  };

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
 
  const onSubmitHandler = (values: any) => {
    let viewAccess = '';
    let softwareValue = '';
    let businessSoftware = '';
    let programmingSoftware = '';
    let infrastructureSoftware = '';
    let operatingSystem = '';
    let database = '';
    let listBrand = '';

    funnelProductService.map(
      (arrValues: any) => (listBrand = listBrand.length > 0 ? (listBrand += ',' + arrValues.itemID.toString()) : arrValues.itemID.toString())
    );

    const newFunnel = new FunnelsModel();
    newFunnel.SalesFunnel = new FunnelModel(values);
    newFunnel.SalesFunnel.rate = funnelRate.rate;
    newFunnel.FunnelHeaderName = new FunnelHeaderNameModel(values);
    newFunnel.SalesFunnelItems = funnelProductService;
    newFunnel.FileFunnelAttachment = funnelAttachment;
    newFunnel.salesFunnelCost = funnelCost;
    newFunnel.salesFunnelTop = JSON.parse(localStorage.getItem('funnelTop'))?.rows || [];

    const dealClose = new Date(values.dealCloseDate);
    newFunnel.SalesFunnel.estDurationProject = estDurationProject;
    newFunnel.SalesFunnel.estDurationType = estDurationProject > 0 ? durationType : '';
    newFunnel.SalesFunnel.customerPICID = +customerPICID;
    newFunnel.SalesFunnel.customerGenID = +customer;
    newFunnel.SalesFunnel.projectCategory = projectCategory;
    newFunnel.SalesFunnel.endUserCustomerGenID =
      typePage === 'copy-project'
        ? endUserCustomerGenID
        : typePage === 'funnel'
        ? customerEnd
        : newFunnel.SalesFunnel.endUserCustomerGenID === 0
        ? newFunnel.SalesFunnel.customerGenID
        : newFunnel.SalesFunnel.endUserCustomerGenID;
    newFunnel.SalesFunnel.createUserID = currentUser.employeeID;
    newFunnel.SalesFunnel.salesID = currentUser.employeeID;
    newFunnel.SalesFunnel.funnelGenID = 0;
    newFunnel.SalesFunnel.funnelStatusID = statusFunnel;
    newFunnel.SalesFunnel.dealCloseDate = moment(dealClose).format('yyyy-MM-DD');
    newFunnel.SalesFunnel.totalSellingPriceProduct = totalSellingProduct;
    newFunnel.SalesFunnel.totalSellingPriceService = totalSellingService;
    newFunnel.SalesFunnel.totalOrderingPriceProduct = totalOrderProduct;
    newFunnel.SalesFunnel.totalOrderingPriceService = totalOrderService;
    newFunnel.SalesFunnel.totalOrderingPrice = totalOrderingPrice;
    newFunnel.SalesFunnel.presalesDeptID = values.preSalesDeptArr.join(',');
    newFunnel.SalesFunnel.smoDeptID = smoDeptID;
    newFunnel.SalesFunnel.pmoDeptID = values.pmoDeptID ? pmoSupport.pmoDeptID : '';
    newFunnel.SalesFunnel.reqDedicatedResource = dedicatedResource;
    newFunnel.SalesFunnel.projectName = projectName;
    newFunnel.SalesFunnel.referTo = referTo.toString();
    {
      newFunnel.SalesFunnel.softwareArr.map(
        (arrValues: any) => (softwareValue = softwareValue.length > 0 ? softwareValue + ',' + arrValues.value : arrValues.value)
      );
    }
    newFunnel.SalesFunnel.softwareList = softwareValue;

    if (JSON.parse(localStorage.getItem('businessSoftware')!) != undefined) {
      JSON.parse(localStorage.getItem('businessSoftware')!).map(
        (arrValues: any) => (businessSoftware = businessSoftware.length > 0 ? businessSoftware + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('infrastructureSoftware')!) != undefined) {
      JSON.parse(localStorage.getItem('infrastructureSoftware')!).map(
        (arrValues: any) =>
          (infrastructureSoftware = infrastructureSoftware.length > 0 ? infrastructureSoftware + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('programmingSoftware')!) != undefined) {
      JSON.parse(localStorage.getItem('programmingSoftware')!).map(
        (arrValues: any) => (programmingSoftware = programmingSoftware.length > 0 ? programmingSoftware + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('operatingSystem')!) != undefined) {
      JSON.parse(localStorage.getItem('operatingSystem')!).map(
        (arrValues: any) => (operatingSystem = operatingSystem.length > 0 ? operatingSystem + ',' + arrValues.value : arrValues.value)
      );
    }

    if (JSON.parse(localStorage.getItem('database')!) != undefined) {
      JSON.parse(localStorage.getItem('database')!).map(
        (arrValues: any) => (database = database.length > 0 ? database + ',' + arrValues.value : arrValues.value)
      );
    }

    //Funnel Header Name
    newFunnel.FunnelHeaderName.customerName = customerName;
    newFunnel.FunnelHeaderName.endUserCustomerName = customerEndName;
    newFunnel.FunnelHeaderName.customerPICName = customerPICName;
    newFunnel.FunnelHeaderName.employeeKey = currentUser.employeeID;
    newFunnel.FunnelHeaderName.employeeEmail = currentUser.email;
    newFunnel.FunnelHeaderName.employeeName = currentUser.fullName;
    newFunnel.FunnelHeaderName.status = statusFunnelText;
    newFunnel.FunnelHeaderName.notes = values.notes;
    newFunnel.FunnelHeaderName.CustomerPICJobTitle = picJobTitle != '' ? picJobTitle : customerPIC.picJobTitle;
    newFunnel.FunnelHeaderName.CustomerPICEmail = picEmailAddr != '' ? picEmailAddr : customerPIC.picEmailAddr;
    newFunnel.FunnelHeaderName.CustomerPICPhone = picMobilePhone != '' ? picMobilePhone : customerPIC.picMobilePhone;
    newFunnel.FunnelHeaderName.funnelOpportunityID = oppId;
    newFunnel.FunnelHeaderName.businessSoftware = businessSoftware;
    newFunnel.FunnelHeaderName.infrastructureSoftware = infrastructureSoftware;
    newFunnel.FunnelHeaderName.programmingSoftware = programmingSoftware;
    newFunnel.FunnelHeaderName.database = database;
    newFunnel.FunnelHeaderName.operatingSystem = operatingSystem;

    {
      newFunnel.FunnelHeaderName.haveViewAccessArr.map(
        (arrValues: any) => (viewAccess = viewAccess.length > 0 ? viewAccess + ',' + arrValues.value : arrValues.value)
      );
    }

    newFunnel.FunnelHeaderName.viewAccess = viewAccess;
    onConfirmSubmit(newFunnel, values.dealCloseDate, listBrand);
  };

  const onAddNewCustomer = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<CustomerForm onCustomerChange={onChangeCustomerDefault} />, ModalSizeEnum.Small));
  }, [dispatch]);

  const onAddCustomerPIC = (e: any, data: DropdownProps) => {
    if (customer > 0) {
      const newItems = new CustomerPICModel({});
      newItems.customerGenID = +customer;
      newItems.picName = data.value === undefined ? '' : data.value.toString();
      newItems.customerPICID = 0;
      newItems.salesID = currentUser.employeeID;
      dispatch(CustomerPICActions.postCustomerPIC(newItems));
    }
  };

  const getCurrentData = (funnelOpportunityID: number) => {
    const endpoint = 'FunnelOpportunity/GetByOpportunityID?FunnelOpportunityID=' + funnelOpportunityID;
    axios
      .get(environtment.api.funnel.replace(':controller', endpoint))
      .then((res) => {
        setCurrent({
          brandID: res.data.brandID,
          createDate: res.data.createDate,
          createUserID: res.data.createUserID,
          customerGenID: res.data.customerGenID,
          eventName: res.data.eventName,
          funnelID: res.data.funnelID,
          funnelOpportunityID: res.data.funnelOpportunityID,
          modifyDate: res.data.modifyDate,
          modifyUserID: res.data.modifyUserID,
          notes: res.data.notes,
          salesID: res.data.salesID,
          status: res.data.status,
          eventDate: res.data.eventDate,
        });
        dispatch(CustomerPICActions.requestCustomerPIC(res.data.customerGenID, currentUser.employeeID));
        setCustomer(res.data.customerGenID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onConfirmSubmit = useCallback(
    (funnels: FunnelsModel, dealCloseDate: any, brandList: string): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ConfirmSubmit brandList={brandList} dealCloseDate={dealCloseDate} history={props.history} funnels={funnels} tab={tab} />,
          ModalSizeEnum.Mini
        )
      );
    },
    [dispatch, props.history]
  );

  const resultRenderer = ({ image, price, title, description, flag, id }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === '1' ? 'rgba(255, 248, 54, 0.5)' : '',
        }}
      >
        <div className="price">{price}</div>
        <div className="title"> {title}</div>
      </div>
    );
  };

  const onChangeTotalSelling = (event: any) => {
    setTotalSelling(event);
    const total = totalSelling - (totalOrderingPrice + totalFunnelCost2);
    // console.log(Math.sign(ordering))
    // if (Math.sign(ordering) === 1) {
    //     setGpm(0)
    //     setGpmPctg(0)
    // }
    localStorage.removeItem('TotalSellingPrice');

    if (totalSelling === 0 || totalSelling === null) {
      setGpm(0);
      setGpmPctg(0);
    }

    if (total === 0) {
      setGpm(0);
      setGpmPctg(0);
    }
    // else {
    //     setGpm(Number(gpmPctg) / 100 * (totalSellingPrice > 0 ? totalSellingPrice : totalSelling));
    //     if ((+statusFunnel === 2 || +statusFunnel === 3) && event > 1000000000)
    //     {
    //         setCompellingEvent(true);
    //     }
    //     else
    //     {
    //         setCompellingEvent(false);
    //     }
    // }
  };
  const onChangeGPMPctg = (event: any) => {
    setCalPtg(event);
    // if (totalSellingMain === 0) {
    // } else {
    //     setCalGPM(roundTo((totalSellingPrice - (totalOrderingPrice + totalFunnelCost)),2))
    // }
    setCalGPM((Number(event) / 100) * (totalSellingPrice > 0 ? totalSellingPrice : totalSelling));
    setGpmPctg(event);
    setGpm((Number(event) / 100) * (totalSellingPrice > 0 ? totalSellingPrice : totalSelling));
  };

  const onChangeGPM = (event: any) => {
    setGpm(event);
    setCalGPM(event);
    //setGpmPctg(Number(event) / (totalSellingPrice > 0 ? totalSellingPrice : totalSelling) * 100);
    /* if(Number(event) > Number((totalSellingPrice > 0 ? totalSellingPrice : totalSelling)))
        {   
            setGpm((totalSellingPrice > 0 ? totalSellingPrice : totalSelling));
            setGpmPctg(100);
        }
        else
        {
            let nilai = Number(event) / (totalSellingPrice > 0 ? totalSellingPrice : totalSelling) * 100; 
            setGpmPctg(roundTo(nilai,2));
            setGpmPctg(nilai);
        } */
  };

  const onEmail = (event: any) => {
    setPICEmailAddr(event);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(event)) {
      setFlagMail(true);
    } else {
      setFlagMail(false);
    }
  };

  const onReferTo = (event: any) => {
    setReferTo(event);
  };

  const onMobilePhone = (event: any) => {
    setPICMobilePhone(event);
  };

  const onJobTitle = (event: any) => {
    setPICJobTitle(event);
  };

  const onBlurGPM = (event: any) => {
    setGpm(event);
  };

  const onChangeDedicated = (event: any) => {
    setDedicatedResource(event);
  };

  const searchAttachmentByDocType = (docType: string) => {
    return funnelAttachment.filter((item: AttachmentModel) => {
      return item.documentType === docType;
    });
  };
  const onChangeFunnelStatus = (event: number) => {
    setStatusFunnel(event);

    dispatch(FunnelStatusActions.requestFunnelStatusById(event));

    if (event === 2 || event === 3) {
      const quoteCustomer = searchAttachmentByDocType('Quote Customer');
      //const dokTeknikal =  searchAttachmentByDocType("Document Technical");

      if (quoteCustomer.length === 0) {
        setValidateFunnelStatus(true);
      } else {
        setValidateFunnelStatus(false);
      }
    } else {
      setValidateFunnelStatus(false);
    }

    const data = funnelStatusOptions.filter((item: any) => {
      return item.value === +event;
    });
    if (data.length > 0) {
      setStatusFunnelText(data[0].text);
    }

    if (+event !== 5) {
      setMandatory({
        ...mandatory,
        /* "sCustomerNeeds": true,
                "sCompetitor": true,
                "sNotes": true, */
        sGPM: true,
        sGPMPctg: true,
      });
    }
    if (+event === 2 || +event === 3) {
      if (+totalSelling > 1000000000) {
        setCompellingEvent(true);
        setMandatory({
          ...mandatory,
          /*  "sCustomerNeeds": false,
                    "sCompetitor": false, */
          sNotes: false,
        });
      }

      /* setMandatory({...mandatory,
                "sGPM": false,
                "sGPMPctg": false,
            }); */
    } else if (+event === 5) {
      setCompellingEvent(true);
      setMandatory({
        ...mandatory,
        /*  "sCustomerNeeds": false,
                "sCompetitor": false, */
        sNotes: false,
        sGPM: true,
        sGPMPctg: true,
      });
    } else {
      setCompellingEvent(false);
    }
  };

  const [currency, setCurrency] = useState('');

  const getRate = (currency: string) => {
    setCurrency(currency);
    dispatch(FunnelActions.requestRate(currency, moment(new Date()).format('yyyy-MM-DD')));
  };

  useEffect(() => {
    const { eventName, customerName, funnelOpportunityID, eventDate } = location.state || { from: { pathname: '/' } };
    if (customerName != undefined || funnelOpportunityID != undefined) {
      getCurrentData(funnelOpportunityID);
      setCustomerName(customerName);
      setCustomerEndName(customerName);
      setProjectName(eventName + ' - ' + eventDate);
      setOppId(funnelOpportunityID.toString());
      setValidateCus(true);
      setValidateEndCus(true);
    }

    if (CheckTypeC === false) {
      localStorage.removeItem('productService');
    }
    // dispatch(SoftwareActions.requestSoftwareByBusiness())

    // localStorage.removeItem('productService');
    localStorage.removeItem('funnelHeader');
    localStorage.removeItem('funnelAttachment');
    localStorage.removeItem('TotalSellingPrice');
    localStorage.removeItem('projectDuration');

    if (funnelGenID === 0) {
      localStorage.removeItem('CBV');
      localStorage.removeItem('nonCBV');
      localStorage.removeItem('TempSubBrand');
    }
    dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
    dispatch(PresalesSupportActions.requestPresales());
    dispatch(EmployeeActions.requestEmployeeByRole(27));
    dispatch(FunnelStatusActions.requestFunnelStatus('ADD'));
    dispatch(FunnelActions.requestResetStateFunnel());
    dispatch(FunnelStatusActions.requestFunnelStatusById(1));
    dispatch(ServiceItemAction.requestServiceItem(currentUser.direktoratID, 0, 0));
    dispatch(CompetitorActions.requestCompetitor());
    dispatch(FunnelActions.requestCurrency());
    dispatch(FunnelActions.requestProjectTypeSA());
    getRate('idr');
    onChangeFunnelStatus(1);
  }, [dispatch, CheckTypeC]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST,
      CustomerActions.REQUEST_CUSTOMERS_TYPE_C,
      PresalesSupportActions.REQUEST_PRESALES,
      EmployeeActions.REQUEST_EMPLOYEE,
      // copyproject
      FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER,
    ])
  );

  const isLoadingCustomer: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME]));
  const customerStore = useSelector((state: IStore) => state.customer.customer);
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptionsWithFlag(state));
  const customerStoreSearchTypeC = useSelector((state: IStore) => selectCustomerTypeC(state));
  const employeeStoreSearch = useSelector((state: IStore) => selectEmployeeSearchOptions(state));
  const softwareStoreSearch = useSelector((state: IStore) => selectSoftwareSearchOptions(state));
  const softwareBusiness = useSelector((state: IStore) => selectSoftwareBusiness(state));
  const softwareInfra = useSelector((state: IStore) => selectSoftwareInfra(state));
  const softwareDB = useSelector((state: IStore) => selectSoftwareDB(state));
  const softwareProgramming = useSelector((state: IStore) => selectSoftwareProgramming(state));
  const softwareOS = useSelector((state: IStore) => selectSoftwareOS(state));
  const customerPICStore = useSelector((state: IStore) => selectCustomerPICOptions(state));
  const customerPIC = useSelector((state: IStore) => selectCustomerPIC(state));

  const employees: EmployeeModel[] = useSelector((state: IStore) => state.employee.data);
  const funnelProductService: ProductServiceModel[] = useSelector((state: IStore) => state.funnelProductService.listData.rows);
  const funnelAttachment: AttachmentModel[] = useSelector((state: IStore) => state.attachment.listData.rows);
  const customerToFunnel: CustomerToFunnelModel[] = useSelector((state: IStore) => state.customerToFunnel.listData.rows);
  const totalSellingPrice: any = useSelector((state: IStore) => (selectTotalSelling(state) === 0 ? totalSelling : selectTotalSelling(state)));
  const totalSellingMain: any = useSelector((state: IStore) => selectTotalSelling(state));
  const totalOrderingPrice = useSelector((state: IStore) => (totalSellingPrice === 0 ? 0 : selectTotalOrdering(state)));
  const totalOrderProduct = useSelector((state: IStore) => selectTotalOrderProduct(state));
  const totalOrderService = useSelector((state: IStore) => selectTotalOrderService(state));
  const totalSellingProduct = useSelector((state: IStore) => selectTotalSellingProduct(state));
  const totalSellingService = useSelector((state: IStore) => selectTotalSellingService(state));
  const presalesSupportOptions = useSelector((state: IStore) => selectPresalesOptions(state));
  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));
  const funnelStatusOptions = useSelector((state: IStore) => selectFunnelStatusOptions(state));
  const pmoSupport = useSelector((state: IStore) => selectPMOSupport(state));
  const funnelStatus = useSelector((state: IStore) => selectFunnelStatus(state));
  const competitorStore = useSelector((state: IStore) => selectCompetitorOptions(state));
  const funnelCost: any[] = useSelector((state: IStore) => selectRows(state));
  const totalQuoteCustomer = useSelector((state: IStore) => selectTotalDocument(state, 'Quote Customer'));
  const totalFunnelCost: number = useSelector((state: IStore) => (totalSellingPrice === 0 ? 0 : selectTotalCost(state)));
  const totalFunnelCost2: number = useSelector((state: IStore) => selectTotalCost(state));
  const funnelCurrency = useSelector((state: IStore) => selectFunnelCurrencyOptions(state));
  const projectCategorySAOptions = useSelector((state: IStore) => selectProjectCategorySAOptions(state));
  // const mounted: any = useRef();
  // useEffect(() => {
  //   if (!mounted.current) {
  //     // do componentDidMount logic
  //     mounted.current = true;
  //   } else {
  //         setGpm(roundTo((totalSelling - (totalOrderingPrice + totalFunnelCost)), 2))
  //         setGpmPctg(roundTo((((totalSelling - (totalOrderingPrice + totalFunnelCost)) / totalSellingPrice) * 100.00), 2))
  //       // do componentDidUpdate logic
  //         console.log("update")

  //   }
  // });
  useEffect(() => {
    const total = totalSelling - (totalOrderingPrice + totalFunnelCost2);

    if (totalSelling > 0) {
      setGpm(roundTo(totalSelling - (totalOrderingPrice + totalFunnelCost2), 2));
      setGpmPctg(roundTo(((totalSelling - (totalOrderingPrice + totalFunnelCost2)) / totalSelling) * 100.0, 2));
      setCalPtg(roundTo(((totalSelling - (totalOrderingPrice + totalFunnelCost2)) / totalSelling) * 100.0, 2));
    }

    const totalS = (document.getElementById('totalSellingPrice') as HTMLInputElement)?.value;
    const GpmPC = document.getElementById('gpmPctg') as HTMLInputElement;
    const GpmA = document.getElementById('gpmAmount') as HTMLInputElement;

    if (total === 0 || totalSelling === 0 || totalS === '0' || totalSelling == null) {
      GpmPC.value = '0';
      GpmA.value = '0';
    }
  }, [totalFunnelCost2, totalSelling]);

  const validate = combineValidators({
    funnelStatusID: isRequired('Funnel Status'),
    dealCloseDate: isRequired('Deal Close Date'),
    //customerName: isRequired('Customer Name'),
    //endUserCustomerName: isRequired('End Customer Name'),
    //customerPICID:isRequired('Customer PIC'),
    customerPICID: hasLengthGreaterThan(0)('Customer PIC'),
    totalSellingPrice: composeValidators(isRequired('Total Selling Value'))(),
    gpmPctg: composeValidators(isRequired('GPM Percent'))(),
    gpmAmount: composeValidators(isRequired('GPM Amount'))(),
    // projectName: isRequired('Project Name'),
  });

  const validateMandatory = combineValidators({
    funnelStatusID: isRequired('Funnel Status'),
    dealCloseDate: isRequired('Deal Close Date'),
    //customerName: isRequired('Customer Name'),
    customerPICID: isRequired('Customer PIC'),
    projectName: isRequired('Project Name'),
    totalSellingPrice: composeValidators(isRequired('Total Selling Value'))(),
    gpmPctg: composeValidators(isRequired('GPM Percent'))(),
    gpmAmount: composeValidators(isRequired('GPM Amount'))(),
    //competitor: isRequired('Competitor'),
    //customerNeeds: isRequired('Customer Needs'),
  });

  const handleSearchChangeCust = useCallback(
    (data) => {
      setCustomerName(data);
      setDefaultCust(0);
      setPICJobTitle('');
      setPICMobilePhone('');
      setPICEmailAddr('');
      if (data.length >= 4) {
        // dispatch(CustomerActions.requestCustomerByNameBlackList(data));
      }

      if (CheckTypeC === true) {
        customerStoreSearchTypeC &&
          customerStoreSearchTypeC.map((item: any) => {
            if (item.title === customerName) {
              setValidateCus(true);
            } else if (customerName !== data) {
              setValidateCus(false);
            }
          });
      } else {
        customerStoreSearch &&
          customerStoreSearch.map((item: any) => {
            if (item.title === customerName) {
              setValidateCus(true);
            } else if (customerName !== data) {
              setValidateCus(false);
            }
          });
      }
    },
    [dispatch, customerStoreSearch, customerStoreSearchTypeC]
  );

  const handleSearchChangeEmployee = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(EmployeeActions.requestEmployeeByName(data.value, ''));
      }
    },
    [dispatch]
  );

  const handleSearchBusinessSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByBusiness(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchDatabaseSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByDB(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchProgrammingSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByProgramming(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchInfrastructureSoftware = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByInfra(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchOS = useCallback(
    (e, data) => {
      if (data.value.length >= 2) {
        dispatch(SoftwareActions.requestSoftwareByOS(data.value));
      }
    },
    [dispatch]
  );

  const handleSearchChangeCustEnd = useCallback(
    (value) => {
      setCustomerEndName(value);
      if (value.length >= 4) {
        // dispatch(CustomerActions.requestCustomerByNameBlackList(value));
      }

      if (CheckTypeC === true) {
        customerStoreSearchTypeC &&
          customerStoreSearchTypeC.map((item: any) => {
            if (item.title === customerEndName) {
              setValidateEndCus(true);
            } else if (customerEndName !== value) {
              setValidateEndCus(false);
            }
          });
      } else {
        customerStoreSearch &&
          customerStoreSearch.map((item: any) => {
            if (item.title === customerEndName) {
              setValidateEndCus(true);
            } else if (customerEndName !== value) {
              setValidateEndCus(false);
            }
          });
      }
    },
    [dispatch, customerStoreSearch, customerStoreSearchTypeC]
  );

  const onChangeCustomerPIC = (value: any) => {
    setDefaultCust(0);
    const data = customerPICStore.filter((item: any) => {
      return item.value === value;
    });

    if (data.length > 0) {
      setCustomerPICName(data[0].text);
      dispatch(CustomerPICActions.requestCustomerPICBYID(+value)).then(() => {
        setCustomerPICID(value);
      });
    }
  };

  useEffect(() => {
    if (typePage !== 'copy-project' && addNewCust == false) {
      setPICMobilePhone(customerPIC.picMobilePhone);
      setPICEmailAddr(customerPIC.picEmailAddr);
      /* if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customerPIC.picEmailAddr)) {
        setFlagMail(true);
      } else {
        setFlagMail(false);
      } */
      setPICJobTitle(customerPIC.picJobTitle);
    }
    setAddNewCust(false);
  }, [customerPICID]);

  useEffect(() => {
    dispatch(CustomerPICActions.requestCustomerPIC(Number(customer), currentUser.employeeID));
  }, [resultActionCustomerPIC]);

  const funnels: any = useSelector((state: IStore) => selectFunnel(state));
  const d = totalSellingPrice - (totalOrderingPrice + totalFunnelCost);
  const totalSellingPriceLocal: any = localStorage.getItem('TotalSellingPrice');
  // let totalNumberSelling = parseInt(totalSellingPriceLocal)
  // let totalSellingDOM = document.querySelector("#root > div.ui.container > div > div:nth-child(2) > form > div > div:nth-child(5) > div > div > div > div > div:nth-child(1) > div > input[type=text]")! as HTMLInputElement

  // copy-project
  const [defaultValueCopyProject] = RequestCopyProject({
    typePage,
    funnelGenID,
    // funnelGenID: 57990,
    setEndUserCustomerGenID,
    setEstDurationProject,
    setCustomerEndName,
    setPICMobilePhone,
    setCustomerPICID,
    setCustomerName,
    setPICEmailAddr,
    setDurationType,
    setTotalSelling,
    setProjectName,
    setCustomer,
    setGpmPctg,
    onChangeSMO,
    onChangePMO,
  });
  const [disableComponent, setDisableComponent] = useState(true);
  useEffect(() => {
    if (
      !JSON.parse(localStorage.getItem('productService'))?.find(
        (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.isDelete === 0 && e.itemType === 19
      )
    ) {
      if (pmoSupport.pmoEmployeeKey !== 7324) {
        setPMODeptID('');
      }

      onChangeSMO(false);
    }
  }, [JSON.parse(localStorage.getItem('productService'))]);

  useEffect(() => {
    if (CheckTypeC === false) {
      const arr = projectCategorySAOptions.filter(function(item) {
        return item.text !== 'Billing AWS';
      });
      setProjectCategoryOptions(arr);
    }
  }, [projectCategorySAOptions]);

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={compellingEvent ? validateMandatory : validate}
      // initialValues={funnels}
      initialValues={typePage === 'copy-project' ? defaultValueCopyProject : funnels}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Confirm
            open={openConfirm}
            content="This customer is also an End User ?"
            onCancel={closeConfirm}
            onConfirm={okConfirm}
            cancelButton="No"
            confirmButton="Yes"
            size="mini"
          />
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="funnelStatusID"
                  component={SelectInput}
                  placeholder="e.g.Above Funn.."
                  labelName="Funnel Status "
                  options={funnelStatusOptions}
                  onChanged={onChangeFunnelStatus}
                  mandatory={mandatory.sFunnelStatus}
                  values={statusFunnel}
                  toolTipPosition="top left"
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
                        <Header.Subheader>
                          Close Lose when you lose the opportunity.
                          <List bulleted horizontal link>
                            test
                          </List>
                        </Header.Subheader>
                      </Header>
                    </div>
                  }
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="dealCloseDate"
                  component={DateInput}
                  labelName="Deal Close Date"
                  placeholder="e.g.09/09/2020"
                  mandatory={mandatory.sDealCloseDate}
                  date={true}
                  minDate={currentDate}
                  maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                  toolTipPosition="bottom center"
                  toolTipContents="Estimate Project Close Date, not more than 1 year.
                                    In Funnel Stage deal close date within 6 months, Best Few stage deal
                                    close date within 3 months. When you close the funnel, deal close
                                    date will auto update with the current date."
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Field name="TypeC" component={CheckBoxInput} label="Only Type C Customer For AWS Billing" onChange={onChangeTypeC} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="customerName"
                  component={SearchInput}
                  placeholder="e.g.PT. Customer .."
                  loading={isLoadingCustomer}
                  labelName="Customer Name"
                  handleSearchChange={handleSearchChangeCust}
                  onResultSelect={onResultSelectCustomer}
                  results={CheckTypeC === true ? customerStoreSearchTypeC : customerStoreSearch}
                  mandatory={mandatory.sCustomerName}
                  values={customerName}
                  resultRenderer={resultRenderer}
                  onKeyPress={(event) => {
                    if (event.charCode == 13) {
                      if (CheckTypeC === true) {
                        dispatch(CustomerActions.requestCustomerTypeC(customerName.trim()));
                      } else {
                        dispatch(CustomerActions.requestCustomerByNameBlackList(customerName.trim()));
                      }
                    }
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <p className="BtmFormNote">Press enter to see the results</p>
                  {blackListFlagCust && <p className="BlackListText">Black List Customer</p>}
                </div>
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="endUserCustomerName"
                  component={SearchInput}
                  placeholder="e.g.PT. Customer .."
                  loading={isLoadingCustomer}
                  labelName="End Customer Name"
                  handleSearchChange={handleSearchChangeCustEnd}
                  onResultSelect={onResultSelectEndCustomer}
                  results={CheckTypeC === true ? customerStoreSearchTypeC : customerStoreSearch}
                  mandatory={mandatory.sEndUser}
                  values={customerEndName}
                  resultRenderer={resultRenderer}
                  onKeyPress={(event) => {
                    if (event.charCode == 13) {
                      if (CheckTypeC === true) {
                        dispatch(CustomerActions.requestCustomerTypeC(customerEndName.trim()));
                      } else {
                        dispatch(CustomerActions.requestCustomerByNameBlackList(customerEndName.trim()));
                      }
                    }
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: `${!blackListFlagEnd ? 'flex-start' : 'flex-end'}`,
                  }}
                >
                  {blackListFlagEnd && <p className="BlackListText">Black List Customer</p>}
                  {!blackListFlagEnd && <p className="BtmFormNote">Press enter to see the results</p>}
                </div>
              </Grid.Column>
            </Grid.Row>
            {customerName === 'BERCA HARDAYAPERKASA PT.' || customerName === 'Berca Hardayaperkasa PT' ? (
              <>
                <Grid.Row columns="equal">
                  <Grid.Column>
                    <p className={styles.NoteGenerateSOTransfer}>This customer will generate SO Transfer</p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="equal">
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="ReferTo"
                      component={NumberInput}
                      placeholder="e.g.3245.."
                      labelName="ReferTo"
                      values={referTo}
                      onChange={onReferTo}
                      mandatory={false}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767"></Grid.Column>
                </Grid.Row>
              </>
            ) : null}
            <Grid.Row columns="equal">
              <Grid.Column>
                <Button
                  type="button"
                  icon="plus"
                  color="green"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="New Customer"
                  onClick={onAddNewCustomer}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment className="LightGreyNotif">
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="customerPICID"
                          component={SelectInput}
                          onChanged={onChangeCustomerPIC}
                          placeholder="e.g.Jhon Doe.."
                          labelName="Customer PIC"
                          allowAdditions={true}
                          onAddItems={onAddCustomerPIC}
                          mandatory={false}
                          options={customerPICStore}
                          values={customerPICID}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="PICJobTitle"
                          component={TextInput}
                          placeholder="e.g.Manager .."
                          labelName="Job Title"
                          values={picJobTitle}
                          onChange={onJobTitle}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="PICEmailAddr"
                          component={TextInput}
                          placeholder="e.g.email@mail.com.."
                          labelName="Email"
                          values={picEmailAddr}
                          onChange={onEmail}
                          mandatory={false}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="PICMobilePhone"
                          component={TextInput}
                          placeholder="e.g.0812345.."
                          labelName="Phone"
                          values={picMobilePhone}
                          onChange={onMobilePhone}
                          mandatory={false}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="FullNotif">
                <Segment className="LightYellowNotif">
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column width={3} className="FullGrid767 LabelNameLabel">
                        <Field
                          name="currency"
                          component={SelectInput}
                          placeholder="e.g. IDR.."
                          labelName="Currency "
                          options={funnelCurrency}
                          className="selectInputWidt08"
                          defaultValue="IDR"
                          onChanged={(e) => getRate(e)}
                        />
                      </Grid.Column>
                      <Grid.Column width={2} className="FullGrid767 CurrencyRate">
                        <Field
                          name="rate"
                          component={NumberInput}
                          placeholder="0"
                          labelName="Rate"
                          values={funnelRate.rate}
                          thousandSeparator={true}
                          readonly
                          // onChange={onChangeTotalSelling}
                          // values={totalSellingPrice > 0 ? totalSellingPrice : totalSelling}
                          // mandatory={mandatory.sTotalSelling}
                          // // readonly={totalSellingPrice > 0}
                          // id="#rate"
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767 LabelNameLabel">
                        <Field
                          name="totalSellingPrice"
                          component={NumberInput}
                          placeholder="e.g.99.000.00.."
                          labelName="Total Selling Value"
                          onChange={onChangeTotalSelling}
                          values={totalSellingPrice > 0 ? totalSellingPrice : totalSelling}
                          mandatory={mandatory.sTotalSelling}
                          thousandSeparator={true}
                          id="totalSellingPrice"
                          // readonly={totalSellingPrice > 0}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="gpmAmount"
                          component={NumberInput}
                          placeholder="e.g.99.000.0.."
                          labelName="GPM Amount"
                          onChange={onChangeGPM}
                          mandatory={mandatory.sGPM}
                          id="gpmAmount"
                          values={
                            totalSellingMain > 0
                              ? totalSellingMain === 0
                                ? calcGPM
                                : roundTo(totalSellingPrice - (totalOrderingPrice + totalFunnelCost), 2)
                              : gpm
                          }
                          readonly={totalSellingMain > 0 || totalFunnelCost2 > 0}
                          thousandSeparator={true}
                        />
                      </Grid.Column>
                      <Grid.Column width={2} className="FullGrid767">
                        <Field
                          name="gpmPctg"
                          component={NumberInput}
                          placeholder="e.g.5.3"
                          labelName="GPM %"
                          label={{ basic: true, content: '%' }}
                          labelPosition="right"
                          onChange={onChangeGPMPctg}
                          mandatory={mandatory.sGPMPctg}
                          id="gpmPctg"
                          values={
                            totalSellingPrice > 0 || totalFunnelCost > 0
                              ? totalSellingMain === 0
                                ? calcPtg
                                : roundTo(((totalSellingPrice - (totalOrderingPrice + totalFunnelCost)) / totalSellingPrice) * 100.0, 2)
                              : gpmPctg
                          }
                          // values={totalSellingPrice > 0 || totalFunnelCost > 0 ? roundTo((totalSellingPrice === 0 ? totalSellingPriceLocal  : totalSellingPrice) -  (totalOrderingPrice + totalFunnelCost)/totalSellingPrice * 100, 2): gpmPctg}

                          readonly={totalSellingMain > 0 || totalFunnelCost2 > 0}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Field
                  name="projectName"
                  component={TextInput}
                  placeholder="e.g.Instalation Project.."
                  mandatory={mandatory.sProjectName}
                  labelName="Project Name"
                  values={projectName}
                  defaultValue={projectName}
                  onChange={(value) => setProjectName(value)}
                />
              </Grid.Column>
              {CheckTypeC === true ? (
                <Grid.Column>
                  <Field
                    name="projectCategory"
                    component={TextInput}
                    placeholder="e.g.Implementation .."
                    labelName="Project Category"
                    disabled={true}
                    options={projectCategorySAOptions}
                    values={projectCategory}
                    onChange={onProjectCategory}
                  />
                </Grid.Column>
              ) : (
                <Grid.Column>
                  <Field
                    name="projectCategory"
                    component={SelectInput}
                    placeholder="e.g.Implementation .."
                    labelName="Project Category"
                    options={projectCategoryOptions}
                    values={projectCategory}
                    onChanged={onProjectCategory}
                  />
                </Grid.Column>
              )}
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column className={styles.DisNone + '' + ' FullGrid767 '}>
                <Field
                  name="estDurationProject"
                  component={TextInput}
                  labeled={<Dropdown options={durationTypeOptions} onChange={onChangeDurationType} value={durationType} />}
                  type="number"
                  min={true}
                  onChange={onDuration} //Hendz - 2022-02-23 untuk add cof karena membutuhkan project duration
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  values={estDurationProject}
                  labelPosition="right"
                  placeholder="e.g.90.."
                  labelName="Est. Proj. Duration (extended / renewal maintenance) "
                  toolTipPosition="top center"
                  toolTipContents="Fill this estimate project duration, if you have
                                    warranty to the customer (Not Vendor Warranty)"
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Segment className="LightGreyNotif PadPmoNotif">
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="pmoDeptID"
                          component={CheckBoxInput}
                          label="Need PMO/S"
                          onChange={onChangePMO}
                          toolTipPosition="top right"
                          useValues={true}
                          values={pmoDeptID !== '' ? true : false}
                          disabled={
                            pmoSupport.pmoEmployeeKey === 7324
                              ? false
                              : !JSON.parse(localStorage.getItem('productService'))?.find(
                                  (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.isDelete === 0 && e.itemType === 19
                                )
                          }
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
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="smoDeptID"
                          component={CheckBoxInput}
                          label="Need SMO"
                          onChange={onChangeSMO}
                          values={smoDeptID !== '' ? true : false}
                          useValues={true}
                          disabled={
                            !JSON.parse(localStorage.getItem('productService'))?.find(
                              (e) => (e.itemName === 'TSS Integration Services' || e.itemName === 'TSS Infrastructure Services' || e.itemName === 'TSS End User Computer Services') && e.isDelete === 0 && e.itemType === 19
                            )
                          }
                          toolTipPosition="top right"
                          toolTipContents="Check this flag if you have maintenance 
                                                    (handle by SMO) in your project."
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="2">
              <Grid.Column className="FullGrid767">
                <Field
                  name="reqDedicatedResource"
                  component={SelectInput}
                  placeholder="e.g. Seat Management.."
                  labelName="Request Dedicated Resource"
                  options={reqDedicatedResourceOptions}
                  values={dedicatedResource}
                  onChanged={onChangeDedicated}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="preSalesDeptArr"
                  component={DropdownInput}
                  placeholder="e.g.CI, NI .."
                  labelName="Presales Support"
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
            <Divider></Divider>
            <Grid.Row columns="equal">
              <Grid.Column>
                <ProductService customerGenID={customerEnd} currency={currency} projectCategory={projectCategory} funnelGenID={'0'} />
              </Grid.Column>
            </Grid.Row>
            <Divider></Divider>
            <Grid.Row columns="equal">
              <Grid.Column>
                <FunnelCost funnelGenID={'0'} funnelStatusID={statusFunnel} />
              </Grid.Column>
            </Grid.Row>
            <Divider></Divider>
            {/*  <Grid.Row columns="equal">
              <Grid.Column>
                <FunnelTop funnelGenID={'0'} />
              </Grid.Column>
            </Grid.Row> */}
            <Divider></Divider>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Segment className="LightGreyNotif">
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Header>Software is being used</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Field
                      name="database1"
                      component={SoftwareList}
                      placeholder="e.g.Database"
                      labelName="Software is being used"
                      handleSearchBusinessSoftware={handleSearchBusinessSoftware}
                      handleSearchProgrammingSoftware={handleSearchProgrammingSoftware}
                      handleSearchDatabaseSoftware={handleSearchDatabaseSoftware}
                      handleSearchInfrastructureSoftware={handleSearchInfrastructureSoftware}
                      handleSearchOperatingSystem={handleSearchOS}
                      resultDB={softwareDB}
                      resultOS={softwareOS}
                      resultInfra={softwareInfra}
                      resultProg={softwareProgramming}
                      resultBuss={softwareBusiness}
                    />
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Divider></Divider>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Attachment modul={1} isLocalFirst={true} funnelGenID={'0'} popupLevel={1} />
              </Grid.Column>
            </Grid.Row>
            <Divider></Divider>
            <Grid.Row columns="equal">
              <Grid.Column className="FullGrid767">
                <Field
                  name="notes"
                  component={RichTextEditor}
                  placeholder="e.g.Information Notes.."
                  labelName="Notes"
                  defaultValue={currentData.notes}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="haveViewAccessArr"
                  component={SearchInputList}
                  placeholder="e.g.Employee Name"
                  labelName="Give this project view access to.."
                  handleSearchChange={handleSearchChangeEmployee}
                  results={employeeStoreSearch}
                />
              </Grid.Column>
            </Grid.Row>
            {compellingEvent && (
              <Grid.Row>
                <Grid.Column>
                  <Segment inverted color="yellow">
                    <Grid>
                      <Grid.Row columns="equal">
                        <Grid.Column>
                          <Field name="compellingEvent" component={TextInput} placeholder="e.g. Compelling Ev.." labelName="Compelling Event" />
                        </Grid.Column>
                        <Grid.Column>
                          {/* <Field
                                                    name='competitor'
                                                    component={TextInput}
                                                    placeholder='e.g.Competitor ..'
                                                    labelName='Competitor'
                                                    mandatory={mandatory.sCompetitor}
                                                /> */}
                          <Field
                            name="competitor"
                            component={SelectInput}
                            placeholder="e.g.Competitor .."
                            labelName="Competitor"
                            options={competitorStore}
                            mandatory={mandatory.sCompetitor}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns="equal">
                        <Grid.Column>
                          <Field
                            name="customerBudget"
                            component={NumberInput}
                            placeholder="e.g.99,000,00.."
                            labelName="Customer Budget"
                            thousandSeparator={true}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Field name="supportiveCoach" component={TextInput} placeholder="Supportive Coach" labelName="Supportive Coach" />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Field
                            name="customerNeeds"
                            component={RichTextEditor}
                            placeholder="e.g.What customer need.."
                            labelName="Customer Needs"
                            mandatorys={mandatory.sCustomerNeeds}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            )}
            <Divider />
            <Grid.Row>
              <Grid.Column>
                <Button
                  color="blue"
                  floated="right"
                  content="Submit"
                  disabled={
                    // pristine ||
                    invalid ||
                    +totalSelling === 0 ||
                    customerPICID === 0 ||
                    (picEmailAddr === '' && customerPIC.picEmailAddr === '') ||
                    (picMobilePhone === '' && customerPIC.picMobilePhone === '') ||
                    +gpmPctg === 0 ||
                    //flagMail === false ||
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,100})+$/.test(picEmailAddr) === false ||
                    (statusFunnel === 2 && totalQuoteCustomer === 0) ||
                    (statusFunnel === 3 && totalQuoteCustomer === 0) ||
                    (statusFunnel === 2 && funnelProductService.length === 0) ||
                    (statusFunnel === 3 && funnelProductService.length === 0) ||
                    projectCategory === 'Billing AWS'
                      ? !!!JSON.parse(localStorage.getItem('nonCBV'))
                      : null || projectCategory === 'Billing AWS'
                      ? !!!JSON.parse(localStorage.getItem('CBV'))
                      : null ||
                        customerName?.trim() == '' ||
                        !validateCust ||
                        // customerName.length <= 5 ||
                        customerEndName?.trim() == '' ||
                        !validateEndCust ||
                        !projectName ||
                        // customerEndName.length <= 5 ||
                        CheckTypeC === true
                      ? !referTo
                      : false
                  }
                />

                <Button floated="right" content="Cancel" type="button" onClick={onCloseHandler} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelForm;

import React, { useEffect, Fragment, useState, useCallback } from 'react';
import {
  SelectInput,
  TextInput,
  DateInput,
  Button,
  DropdownClearInput,
  TextInputWithFocus,
  NumberInput,
  RichTextEditor,
  SearchInput,
} from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider, Segment } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { combineValidators, isRequired, createValidator, composeValidators } from 'revalidate';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import Attachment from 'views/bank-garansi-page/admin/components/attachment/Attachment';
import * as BondTypeAction from 'stores/bond-type/BondTypeAction';
import * as LanguageAction from 'stores/language/LanguageAction';
import * as LetterTypeAction from 'stores/letter-type/LetterTypeAction';
import * as BankAction from 'stores/bank/BankAction';
import * as InsuranceAction from 'stores/insurance/InsuranceAction';
import * as BondIssuerAction from 'stores/bond-issuer/BondIssuerAction';
import {
  selectBondTypeOptions,
  selectLanguageOptions,
  selectLetterTypeOptions,
  selectBondIssuerOptions,
  selectBankOptions,
  selectInsuranceOptions,
} from 'selectors/select-options';
import moment from 'moment';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import BankGaransiAdminModel from 'stores/bank-garansi/models/BankGaransiAdminModel';
import BankGaransisAdminModel from 'stores/bank-garansi/models/BankGaransisAdminModel';
import FunnelHeaderNameModel from 'stores/funnel/models/FunnelHeaderNameModel';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import * as FunnelAction from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectViewFunnelSelling, selectViewFunnelStatus, selectFunnelHeader, selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import {
  selectBankRecomended,
  selectBankEstimated,
  selectCompanyOptions,
  selectCompanyApplicantOptions,
  selectObjectFunnelSA,
  selectObjectFunnelPO,
  selectMaxAmount,
} from 'selectors/bank-garansi/BankGaransiSelector';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import { History } from 'history';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import CustomerForm from 'views/customer-page/components/form-create/CustomerForm';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectCustomerSearchOptions } from 'selectors/select-options/CustomerSelector';
import RouteEnum from 'constants/RouteEnum';
import FunnelSATable from '../../FunnelSATable';
import FunnelPOTable from '../../FunnelPOTable';
import FunnelSASearchModel from 'stores/bank-garansi/models/FunnelSearchSAModel';
import { selectFunnelSAOutside, selectCheckExpired } from 'selectors/bank-garansi/BankGaransiSelector';
import FunnelSARowModel from 'stores/bank-garansi/models/FunnelSARowModel';
import FunnelPORowModel from 'stores/bank-garansi/models/FunnelPORowModel';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';

interface IProps {
  history: History;
  funnelGenID: any;
  dealCloseDate: any;
  popupLevel: number;
  popupFrom: string;
}

const BankGaransiForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  let selectedFunnelSA: FunnelSARowModel = useSelector((state: IStore) => selectObjectFunnelSA(state));

  let selectedFunnelPO: FunnelPORowModel = useSelector((state: IStore) => selectObjectFunnelPO(state));

  useEffect(() => {
    selectedFunnelSA = [] as any;
    selectedFunnelPO = [] as any;

    dispatch(FunnelAction.requestFunnelHeaderLocal());
    dispatch(FunnelAction.requestViewFunnelStatusById(+props.funnelGenID));
    dispatch(BondTypeAction.requestBondType());
    dispatch(LanguageAction.requestLanguage());
    dispatch(LetterTypeAction.requestLetterType());
    dispatch(BondIssuerAction.requestBondIssuer());
    dispatch(BankGaransiAction.requestCompany());
    dispatch(BankGaransiAction.requestCompanyApplicant());
    dispatch(BankGaransiAction.requestBankRecomended('', moment(new Date()).format('YYYY/MM/DD')));
    dispatch(BankGaransiAction.checkExpired(currentUser.userName));

    localStorage.removeItem('funnelAttachment');
    dispatch(AttachmentActions.requestAttachmentLocal());

    if (props.funnelGenID > 0) {
    }
  }, [dispatch, props.funnelGenID]);

  const resultAction = useSelector((state: IStore) => state.bankGaransi.resultActions);
  const [bondType, setBondType] = useState<string | null>('');
  const [requireOn, setRequireOn] = useState(new Date());
  const [mandatory, setMandatory] = useState({
    sTenderNo: true,
    sTenderDate: true,
    sNilai: true,
  });
  const [bondIssuerID, setBondIssuerID] = useState('');
  const [bondIssuer, setBondIssuer] = useState('');
  const [letterType, setLetterType] = useState('');
  const [currentDate] = useState(new Date());
  const [storeIssuer, setStoreIssuer] = useState([]);
  const [letterStore, setLetterStore] = useState([]);
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [company, setCompany] = useState('');
  const [nilai, setNilai] = useState(0);
  const [estimated, setEstimated] = useState(0);

  const funnelAttachment: AttachmentModel[] = useSelector((state: IStore) => state.attachment.listData.rows);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const viewFunnelSelling = useSelector((state: IStore) => selectViewFunnelSelling(state));
  const currentFunnelHeader = useSelector((state: IStore) => selectFunnelHeader(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  const [expiredDate, setExpiredDate] = useState(new Date());
  const [customer, setCustomer] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerNameSearch, setCustomerNameSearch] = useState("");
  const [selectedSA, setSelectedSA] = useState('');
  const [selectedFunnel, setSelectedFunnel] = useState('');
  const [selectedSO, setSelectedSO] = useState('');
  const [selectedPO, setSelectedPO] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectAmount, setProjectAmount] = useState(0);
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptions(state));
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);

  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);
  const mandatoryAttach: string = useSelector((state: IStore) => state.bankGaransi.mandatoryAttach);
  const separator = mandatoryAttach.split(',');
  const attachMandatory = separator[0];
  const maxProject = separator[1];
  const angka = maxProject != undefined ? maxProject.split('%') : '';
  const [bgAmount, setBgAmount] = useState(0);
  const rowExpired: any = useSelector((state: IStore) => selectCheckExpired(state));
  const filter: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listSearch.filter);
  const direction: string = useSelector((state: IStore) => state.bankGaransi.listSearch.sorting);
  const columnsorting: string = useSelector((state: IStore) => state.bankGaransi.listSearch.column);
  const search: any = useSelector((state: IStore) => state.bankGaransi.listSearch.search);

  const isLoadingCustomer: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME]));

  const attach = funnelAttachment.filter((item: any) => {
    return item.documentTypeID === 298;
  });

  const FunnelSAStoreSearch = useSelector((state: IStore) => selectFunnelSAOutside(state));
  useEffect(() => {
    if (selectedFunnelSA.projectName != 'undefined') {
      setProjectName(selectedFunnelSA.projectName);
      setProjectAmount(selectedFunnelSA.projectAmount);
      setSelectedSA(selectedFunnelSA.saNo);
      setSelectedFunnel(selectedFunnelSA.funnelGenID);
      setSelectedSO(selectedFunnelSA.so);
      setCustomerName(selectedFunnelSA.customerName);
      setCustomerNameSearch(selectedFunnelSA.customerName);
      setCustomer(+selectedFunnelSA.customerGenID);
      //setBgAmount((+angka[0] / 100) * selectedFunnelSA.projectAmount);

      dispatch(CustomerActions.requestCustomerByName(selectedFunnelSA.customerName)).then(() => {
        /*  dispatch(
                    CustomerPICActions.requestCustomerPIC(
                        Number(selectedFunnelSA.customerGenID),
                    currentUser.employeeID
                    )
                ); */
      });
    }

    if (selectedFunnelPO.po != 'undefined') {
      setSelectedPO(selectedFunnelPO.po);
      setCustomerName(selectedFunnelPO.customer);
      setCustomerNameSearch(selectedFunnelPO.customer);
      setCustomer(+selectedFunnelSA.customerGenID);
      setProjectName(selectedFunnelPO.projectName);
      setProjectAmount(selectedFunnelPO.projectAmount);
      //setBgAmount((+angka[0] / 100) * selectedFunnelSA.projectAmount);
      dispatch(CustomerActions.requestCustomerByName(selectedFunnelPO.customer)).then(() => {
        /*  dispatch(
                    CustomerPICActions.requestCustomerPIC(
                        Number(selectedFunnelSA.customerGenID),
                    currentUser.employeeID
                    )
                ); */
      });
    }
  }, [selectedFunnelSA, selectedFunnelPO]);

  //let maxAmounts: any = useSelector((state: IStore) => selectMaxAmount(state));

  const onResultSelectFunnelSA = (data: any) => {
    const {
      projectName,
      funnelDate,
      customerName,
      customerGenID,
      funnelGenID,
      saDate,
      saNo,
      salesName,
      customerAddress,
      projectAmount,
    } = data.result;
    const selectedFunnelSA = new FunnelSARowModel({});
    selectedFunnelSA.customerName = customerName;
    selectedFunnelSA.funnelDate = funnelDate;
    selectedFunnelSA.projectName = projectName;
    selectedFunnelSA.saDate = saDate;
    selectedFunnelSA.saNo = saNo;
    selectedFunnelSA.salesName = salesName;
    selectedFunnelSA.customerGenID = customerGenID;
    selectedFunnelSA.funnelGenID = funnelGenID;
    selectedFunnelSA.projectAmount = projectAmount;
    selectedFunnelSA.customerAddress = customerAddress;

    dispatch(BankGaransiAction.insertFunnelSAObject(selectedFunnelSA));
    setCustomerName(customerName);
    setCustomerNameSearch(customerName);
    setCustomer(customerGenID);
  };

  const onResultSelectFunnelPO = (data: any) => {
    const { po, customer, projectName, projectAmount } = data.result;
    const selectedFunnelPO = new FunnelPORowModel({});
    selectedFunnelPO.po = po;
    selectedFunnelPO.customer = customer;
    selectedFunnelPO.projectName = projectName;
    selectedFunnelPO.projectAmount = projectAmount;
    dispatch(BankGaransiAction.insertFunnelPOObject(selectedFunnelPO));
    setCustomerName(customerName);
    setCustomerNameSearch(customerName);
    //setCustomer(customerGenID)
  };

  const onSubmitHandler = (values: any) => {
    //Initialize object
    const newBankGaransi = new BankGaransisAdminModel();
    newBankGaransi.SalesBankGuarantee = new BankGaransiAdminModel(values);
    newBankGaransi.FunnelHeaderName = new FunnelHeaderNameModel(values);
    newBankGaransi.SalesBankGuaranteeAttachment = funnelAttachment;

    //Funnel Header Name
    newBankGaransi.FunnelHeaderName.employeeEmail = currentUser.email;
    newBankGaransi.FunnelHeaderName.domain = currentUser.userName;
    newBankGaransi.FunnelHeaderName.nilaiProject = viewFunnelSelling.totalSellingPrice;
    newBankGaransi.FunnelHeaderName.employeeKey = currentUser.employeeKey;

    const requireOn = new Date(values.requireOn);
    const effectiveDate = new Date(values.effectiveDate);
    const expireDate = new Date(values.expireDate);
    //const tenderDate = new Date(values.tenderAnnouncementDate);
    const submitDate = new Date();
    const bonds: any = [];

    newBankGaransi.SalesBankGuarantee.bankGuaranteeGenID = 1;
    newBankGaransi.SalesBankGuarantee.bankGuaranteeID = '';
    newBankGaransi.SalesBankGuarantee.funnelGenID = 0;
    //newBankGaransi.SalesBankGuarantee.submitDate = submitDate;
    newBankGaransi.SalesBankGuarantee.requireOn = requireOn;
    newBankGaransi.SalesBankGuarantee.reqEffectiveDate = effectiveDate;
    newBankGaransi.SalesBankGuarantee.reqExpireDate = expireDate;
    newBankGaransi.SalesBankGuarantee.status = 'ON PROGRESS';
    newBankGaransi.SalesBankGuarantee.workflowID = 0;
    newBankGaransi.SalesBankGuarantee.cocode = +company;
    newBankGaransi.SalesBankGuarantee.projectAmount = +values.projectAmount;

    if (values.tenderAnnouncementDate != undefined) {
      newBankGaransi.SalesBankGuarantee.tenderAnnouncementDate = new Date(values.tenderAnnouncementDate);
    }
    if (values.tenderNo != undefined) {
      newBankGaransi.SalesBankGuarantee.tenderNo = values.tenderNo;
    }
    if (values.letterType === 'Dukungan Bank') {
      newBankGaransi.SalesBankGuarantee.bondType = '';
    }
    if (values.nilai === undefined) {
      newBankGaransi.SalesBankGuarantee.nilai = 0;
    }
    newBankGaransi.SalesBankGuarantee.bondIssuerType = bondIssuer;
    newBankGaransi.SalesBankGuarantee.createUserID = currentUser.employeeID;
    newBankGaransi.SalesBankGuarantee.createDate = values.submitDate;

    if (props.funnelGenID > 0) {
      newBankGaransi.SalesBankGuarantee.projectAmount = viewFunnelSelling.totalSellingPrice;
      newBankGaransi.SalesBankGuarantee.funnelGenID = props.funnelGenID;
      newBankGaransi.SalesBankGuarantee.linkTo = props.funnelGenID.toString();
    } else {
      newBankGaransi.SalesBankGuarantee.projectAmount = values.projectAmount;
    }

    if (bondIssuer === 'Bank') {
      /* bonds = bankStore.filter((item:any) => {
                return item.value === values.bondIssuerID
            }) */
      newBankGaransi.SalesBankGuarantee.process = 'REQUEST';
    } else {
      newBankGaransi.SalesBankGuarantee.process = 'REQUEST INSURANCE';
    }

    //Jika request nya letter aja tanpa bond || REQUEST LETTER
    if (letterType === 'Dukungan Bank' || (letterType === 'Refensi Bank' && bondType === null)) {
      newBankGaransi.SalesBankGuarantee.process = 'REQUEST LETTER';
      newBankGaransi.SalesBankGuarantee.projectAmount = 0;
    }

    newBankGaransi.SalesBankGuarantee.bondIssuer = bondIssuerID;

    if (bondIssuer === 'Insurance') {
      newBankGaransi.SalesBankGuarantee.letterType = '';
    }

    dispatch(BankGaransiAction.postBankGaransiAdmin(newBankGaransi));
  };

  const cancelClick = () => {
    if (props.funnelGenID > 0) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else {
      props.history.push(RouteEnum.BankGaransi);
    }
  };
  if (bRefreshPage) {
    if (resultAction.errorNumber == '666') {
      dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Error));
      setTimeout(() => {
        dispatch(BankGaransiAction.clearResult());
      }, 2000);
    } else {
      if (search !== null && search.searchText != null) {
        dispatch(BankGaransiAction.requestBGSearch(currentUser.userName, search.searchText, activePage, pageSize, 0, columnsorting, direction));
      } else if (filter !== null) {
        const filterNew = new FilterSearchModel(filter);
        filterNew.pageSize = pageSize;
        filterNew.page = activePage;
        filterNew.column = columnsorting;
        filterNew.sorting = direction;
        dispatch(BankGaransiAction.postFilterSearch(filterNew));
      } else {
        dispatch(BankGaransiAction.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, columnsorting, direction));
      }
      //dispatch(BankGaransiAction.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, 'BankGuaranteeGenID', 'descending'));
      if (props.funnelGenID > 0) {
        dispatch(BankGaransiAction.requestBankGaransis(+props.funnelGenID, activePage, pageSize));
      }
      dispatch(ToastsAction.add('Success', ToastStatusEnum.Success));
      localStorage.removeItem('funnelAttachment');
      localStorage.removeItem('funnelHeader');

      cancelClick();
    }
  }

  const onBondType = (values: any) => {
    setBondType(values);
    if (values != '' && values != null) {
      let letterStores: any = [];
      dispatch(BankGaransiAction.requestMandatoryAttachment(values));
      letterStores = letterTypeStore.filter((item: any) => {
        return item.value === 'Referensi Bank';
      });
      setLetterStore(letterStores);
    }

    if (values != 'Bid Bond') {
      setMandatory({ ...mandatory, sTenderNo: false, sTenderDate: false });
    }
  };

  const onLetterType = (values: any) => {
    setLetterType(values);
    let storesIssuer: any = [];
    if (bondType === '' || bondType === null) {
      setProjectAmount(0);
      onBondType(null);
      storesIssuer = bondIssuerStore.filter((item: any) => {
        return item.value === 'Bank';
      });
      setStoreIssuer(storesIssuer);
    }
  };

  const onLanguage = (values: any) => {
    setLanguage(values);
  };

  const onCompany = (values: any) => {
    setCompany(values);
  };

  const onBondIssuer = (values: any) => {
    if (values === 'Bank') {
      setBondIssuer('Bank');
      dispatch(BankAction.requestBank());
    } else {
      setBondIssuer('Insurance');
      dispatch(InsuranceAction.requestInsurance());
    }
    setEstimated(0);
    dispatch(BankGaransiAction.requestBankRecomended(values, moment(new Date()).format('YYYY/MM/DD')));
  };

  const onBankName = (values: any) => {
    setBondIssuerID(values);
    setEstimated(1);
    dispatch(BankGaransiAction.requestBankEstimated(values));
  };

  const onRequireOnHandler = (value: any) => {
    setRequireOn(value);
    dispatch(BankGaransiAction.requestBankRecomended(bondIssuer, moment(new Date(value)).format('YYYY/MM/DD')));
  };

  const onExpiredDate = (values: any) => {
    setExpiredDate(values);
  };

  const onChangeNilai = (event: any) => {
    setNilai(event);
    setBgAmount(event);
  };

  const onChangeProjectAmount = (event: any) => {
    console.log('test');
  };

  const isSmaller = createValidator(
    (message) => (value) => {
      if (Number(value) >= Number(projectAmount)) {
        return message;
      }
    },
    'BG Amount is bigger than Project Amount'
  );

  const validateDukungan = combineValidators({
    requireOn: isRequired('Require On'),
    bondIssuer: isRequired('Bond Issuer'),
    bondIssuerID: isRequired('Bank/Insurance Name'),
    cocode: isRequired('Company'),
  });

  const validateReferensi = combineValidators({
    //requireOn: isRequired('Require On'),
    bondIssuer: isRequired('Bond Issuer'),
    bondIssuerID: isRequired('Bank/Insurance Name'),
    cocode: isRequired('Company'),
  });

  const validate = combineValidators({
    requireOn: isRequired('Require On'),
    bondIssuer: isRequired('Bond Issuer'),
    bondIssuerID: isRequired('Bank/Insurance Name'),
    effectiveDate: isRequired('Effective Date'),
    expireDate: isRequired('Expire Date'),
    cocode: isRequired('Company'),
    //nilai: composeValidators(isSmaller, isRequired('BG Amount'))(),
  });
  const validateTender = combineValidators({
    cocode: isRequired('Company'),
    requireOn: isRequired('Require On'),
    bondIssuer: isRequired('Bond Issuer'),
    bondIssuerID: isRequired('Bank/Insurance Name'),
    effectiveDate: isRequired('Effective Date'),
    expireDate: isRequired('Expire Date'),
    tenderNo: isRequired('Tender No'),
    tenderAnnouncementDate: isRequired('Tender Announcement Date'),
    //nilai: composeValidators(isSmaller, isRequired('BG Amount'))(),
  });
  
  const onAddNewCustomer = useCallback((): void => {
    dispatch(ModalFirstLevelActions.OPEN(<CustomerForm onCustomerChange={onChangeCustomerDefault} />, ModalSizeEnum.Small));
  }, [dispatch]);

  const onFocusFunnelSA = () => {
    dispatch(
      bondType === 'Custom Bond'
        ? ModalFirstLevelActions.OPEN(<FunnelPOTable modals={'add'} />, ModalSizeEnum.Large)
        : ModalFirstLevelActions.OPEN(
            <FunnelSATable modals={'add'} bondTypes={bondType === null ? '' : bondType} pFunnelGenID={props.funnelGenID} />,
            ModalSizeEnum.Large
          )
    );
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
    console.log('customer');
  };

  const handleSearchChangeCust = (data) => {
    setCustomerNameSearch(data);
    //setCustomerName(data);
  }
 
  const onResultSelectCustomer = (data: any) => {
    setCustomer(data.result.price);
    setCustomerName(data.result.title);
    setCustomerNameSearch(data.result.title);
  };
  const handleSearchFunnelSA = (data: any) => {
    const searchModel = new FunnelSASearchModel({});
    searchModel.page = 1;
    searchModel.pageSize = 20;
    //searchModel.formType = 2415
    searchModel.projectName = '';
    //searchModel.saDate = ""
    searchModel.salesName = '';
    //searchModel.funnelDate = ""
    searchModel.customerName = '';
    //searchModel.so = ""
    if (data != '') {
      if (data.slice(0, 2) == 'SA') {
        searchModel.funnelGenID = '';
        searchModel.saNo = data;
        dispatch(BankGaransiAction.requestDropdownSearchFunnelSA(currentUser.userName, data));
      } else {
        searchModel.saNo = '';
        searchModel.funnelGenID = data;
        dispatch(BankGaransiAction.requestDropdownSearchFunnelSA(currentUser.userName, data));
      }
    }
  };

  const bondTypeStore = useSelector((state: IStore) => selectBondTypeOptions(state));
  const languageStore = useSelector((state: IStore) => selectLanguageOptions(state));
  const letterTypeStore = useSelector((state: IStore) => selectLetterTypeOptions(state));
  const bondIssuerStore = useSelector((state: IStore) => selectBondIssuerOptions(state));
  const bankStore = useSelector((state: IStore) => selectBankOptions(state));
  const insuranceStore = useSelector((state: IStore) => selectInsuranceOptions(state));
  const bankRecommended = useSelector((state: IStore) => selectBankRecomended(state));
  const bankEstimated = useSelector((state: IStore) => selectBankEstimated(state));
  const companyStore = useSelector((state: IStore) => selectCompanyOptions(state));
  const companyApplicantStore = useSelector((state: IStore) => selectCompanyApplicantOptions(state));

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [BankGaransiAction.REQUEST_POST_BANK_GARANSI_ADMIN]));

  return (
    <Fragment>
      <Card.Header>REQUEST BANK REFERENCE LETTER / GUARANTEE</Card.Header>
      <Divider></Divider>
      <FinalForm
        initialValues={props.funnelGenID > 0 ? viewFunnelCustomer : undefined}
        validate={
          bondType != null && bondType == 'Bid Bond'
            ? validateTender
            : letterType === 'Dukungan Bank'
            ? validateDukungan
            : bondType === null && letterType == 'Referensi Bank'
            ? validateReferensi
            : validate
        }
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="bondType"
                    component={DropdownClearInput}
                    options={bondTypeStore}
                    labelName="Bond Type"
                    onChanged={onBondType}
                    values={bondType}
                    disabled={letterType == 'Dukungan Bank' ? true : false}
                    placeholder="Bond Type"
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Segment className="LightYellowNotif p-1r">
                    Estimated Time To Complete at {estimated === 1 ? bankEstimated.estimationFinish : bankRecommended.estimationFinish}, Recommended
                    to use {bankRecommended.bankInsurance} for faster BG Proses <br />
                    Mandatory Attachment :{attachMandatory == '[object Object]' || bondType == '' ? '' : attachMandatory} <br />
                    {maxProject == '[object Object]' || bondType == '' ? '' : maxProject}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="letterType"
                    component={DropdownClearInput}
                    //options={letterTypeStore}
                    options={bondType != '' && bondType != null ? letterStore : letterTypeStore}
                    mandatory={true}
                    placeholder="e.g.Bid Bond.."
                    labelName="Letter Type"
                    disabled={bondIssuer === 'Insurance' ? true : false}
                    onChanged={onLetterType}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="language"
                    component={SelectInput}
                    options={languageStore}
                    mandatory={false}
                    disabled={letterType == 'Referensi Bank' && bondType == null ? true : false}
                    placeholder="e.g.Bahasa Indonesia.."
                    labelName="Language"
                    onChanged={onLanguage}
                    values={language}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="requireOn"
                    component={DateInput}
                    labelName="Require On"
                    placeholder="e.g.09/09/2020"
                    disabled={letterType == 'Referensi Bank' && bondType == null ? true : false}
                    mandatory={false}
                    date={true}
                    //onChange={onRequireOnHandler}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="bondIssuer"
                    options={bondType === null || bondType === '' ? storeIssuer : bondIssuerStore}
                    component={SelectInput}
                    mandatory={false}
                    placeholder="e.g.Bank.."
                    onChanged={onBondIssuer}
                    values={language}
                    labelName="Bond Issuer"
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="bondIssuerID"
                    options={bondIssuer === 'Bank' ? bankStore : insuranceStore}
                    component={SelectInput}
                    mandatory={false}
                    onChanged={onBankName}
                    placeholder="e.g.AXA.."
                    labelName="Bank / Insurance Name"
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="cocode"
                    options={companyStore}
                    component={SelectInput}
                    mandatory={false}
                    onChanged={onCompany}
                    placeholder="e.g.MSG.."
                    //labelName={(bondIssuerID === "Danamon" && bondType != null && bondType != "" ) ? 'Company Principal' : 'Company'}
                    labelName={'Company'}
                    values={company}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="effectiveDate"
                    component={DateInput}
                    mandatory={false}
                    labelName="Effective Date"
                    placeholder="e.g.09/09/2020"
                    date={true}
                    disabled={(letterType == 'Referensi Bank' && bondType == null) || letterType === 'Dukungan Bank' ? true : false}
                    //maxDate={expiredDate}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="expireDate"
                    component={DateInput}
                    mandatory={false}
                    labelName="Expired Date"
                    placeholder="e.g.09/09/2020"
                    date={true}
                    disabled={(letterType == 'Referensi Bank' && bondType == null) || letterType === 'Dukungan Bank' ? true : false}
                    minDate={currentDate}
                    //onChange={onExpiredDate}
                    //values={expiredDate}
                    //maxDate={props.dealCloseDate}
                    toolTipPosition="top right"
                    toolTipContents={<p>BG Expired Date doesnt exceed Funnel Deal Close Date</p>}
                  />
                </Grid.Column>
              </Grid.Row>
              <Divider></Divider>
              <Grid className="LightGreyNotif m-1r">
                {letterType != 'Dukungan Bank' && bondType != null && (
                  <Fragment>
                    <Grid.Row columns={2}>
                      <Grid.Column className="FullGrid767">
                        <Field
                          disabled={props.funnelGenID > 0 ? true : false}
                          name="linkTo"
                          readOnly={true}
                          component={TextInputWithFocus}
                          placeholder={bondType === 'Custom Bond' ? 'PO' : 'Quotation / SA / SO(e.g.SO#12345)'}
                          onFocus={() => onFocusFunnelSA()}
                          editMode={props.funnelGenID != '0' || props.funnelGenID != '' ? false : true}
                          defaultValue={
                            props.funnelGenID > 0
                              ? props.funnelGenID
                              : bondType === 'Custom Bond' && selectedPO != 'undefined'
                              ? selectedPO
                              : selectedSA != 'undefined' && selectedSA != ''
                              ? selectedSA
                              : selectedFunnel != ''
                              ? selectedFunnel.toString()
                              : selectedSO
                          }
                          labelName="Link To"
                          handleSearchChange={handleSearchFunnelSA}
                          results={FunnelSAStoreSearch}
                          onResultSelect={bondType === 'Custom Bond' ? onResultSelectFunnelPO : onResultSelectFunnelSA}
                        />
                      </Grid.Column>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="customerName"
                          component={SearchInput}
                          placeholder="e.g.PT. Customer .."
                          loading={isLoadingCustomer}
                          labelName="Customer Name"
                          handleSearchChange={handleSearchChangeCust}
                          onKeyPress={(e:any)=> { 
                            if (e.charCode == 13) {
                              if (e.target.value.length >= 2) {
                                dispatch(CustomerActions.requestCustomerByName(e.target.value));
                              }
                            }
                          }}
                          onResultSelect={onResultSelectCustomer}
                          results={isLoadingCustomer ? [] : customerStoreSearch}
                          //mandatory={mandatory.sCustomerName}
                          disabled={props.funnelGenID > 0 ? true : false}
			  readOnly={true}	
                          values={customerNameSearch}
                          defaultValue={customerName}
                        />
                        <p className="BtmFormNote">Press enter to see the results</p>
                      </Grid.Column>
                    </Grid.Row>
                    {/* {props.funnelGenID === 0 && (
                      <Grid.Row columns={2}>
                        <Grid.Column className="FullGrid767"></Grid.Column>
                        <Grid.Column className="FullGrid767">
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
                    )} */ }
                  </Fragment>
                )}
                {(letterType == 'Dukungan Bank' || bondType == null) && (
                  <Fragment>
                    <Grid.Row columns={2}>
                      <Grid.Column className="FullGrid767"></Grid.Column>
                      <Grid.Column className="FullGrid767"></Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                      <Grid.Column className="FullGrid767"></Grid.Column>
                      <Grid.Column className="FullGrid767"></Grid.Column>
                    </Grid.Row>
                  </Fragment>
                )}
                <Grid.Row>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="projectName"
                      component={TextInput}
                      placeholder="Project Name"
                      values={projectName}
                      labelName="Project Name"
                      disabled={props.funnelGenID > 0 ? true : false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="nilai"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName="BG Amount"
                      mandatory={false}
                      values={bgAmount}
                      disabled={letterType == 'Referensi Bank' && bondType == null ? true : false}
                      thousandSeparator={true}
                      onChange={onChangeNilai}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="projectAmount"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName="Project Amount"
                      mandatory={false}
                      values={props.funnelGenID > 0 ? viewFunnelSelling.totalSellingPrice : projectAmount}
                      disabled={bondType === 'Custom Bond' ? false : true}
                      thousandSeparator={true}
                      onChange={onChangeProjectAmount}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {bondType != null && bondType == 'Bid Bond' && (
                <Grid.Row columns={2} className="LightGreyNotif m-1r">
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="tenderNo"
                      component={TextInput}
                      mandatory={mandatory.sTenderNo}
                      placeholder="e.g.SPX-001002.."
                      labelName="Tender No"
                      disabled={bondType == null || bondType != 'Bid Bond' ? true : false}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="tenderAnnouncementDate"
                      component={DateInput}
                      mandatory={mandatory.sTenderDate}
                      labelName="Tender Announcement Date"
                      placeholder="09/09/2020"
                      date={true}
                      disabled={bondType == null || bondType != 'Bid Bond' ? true : false}
                    />
                  </Grid.Column>
                </Grid.Row>
              )}
              <Grid.Row>
                <Grid.Column className="FullGrid767">
                  <Field name="notes" component={RichTextEditor} placeholder="e.g.Information Notes.." labelName="Notes" />
                </Grid.Column>
              </Grid.Row>
              {/* attachment */}
              <Attachment
                modul={2}
                isLocalFirst={true}
                funnelGenID={'0'}
                bankGuaranteeID={'0'}
                popupLevel={props.popupFrom === 'funnelgroup' ? 2 : props.funnelGenID > 0 ? 3 : 1}
                expireds={false}
                bgNo={'0'}
              />
            </Grid>{' '}
            <br />
            <Button
              type="submit"
              color="blue"
              floated="right"
              /*disabled={
                rowExpired.message === 'BG Expired!' ||
                pristine ||
                funnelAttachment.length == 0 ||
                (bondType == null && attach.length == 0) ||
                (props.funnelGenID == 0 && bondType != null && selectedFunnelSA.saNo === 'undefined') || 
                (customerName === undefined || customerName === "") || customerName !== customerNameSearch
              }*/
            >
              Save
            </Button>
            {/* <Button type="submit" color='blue' floated='right'>Save</Button> */}
            <Button type="button" onClick={cancelClick} floated="right">
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default BankGaransiForm;

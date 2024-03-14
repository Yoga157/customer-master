import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form, Segment, Divider } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, DateInput, TextInput, Button, DropdownClearInput, Tooltips, TextInputWithFocus, NumberInput } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import classes from './RequesterForm.module.scss';
import { selectBGEditRequester, selectCompanyOptions, selectCompanyApplicantOptions } from 'selectors/bank-garansi/BankGaransiSelector';
import * as BondTypeAction from 'stores/bond-type/BondTypeAction';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import {
  selectBondTypeOptions,
  selectLetterTypeOptions,
  selectBondIssuerOptions,
  selectBankOptions,
  selectInsuranceOptions,
  selectLanguageOptions,
} from 'selectors/select-options';
import BankGaransiModel from 'stores/bank-garansi/models/BankGaransiModel';
import BankGaransiEditViewRequesterModel from 'stores/bank-garansi/models/BankGaransiEditViewRequesterModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as LetterTypeAction from 'stores/letter-type/LetterTypeAction';
import * as BankAction from 'stores/bank/BankAction';
import * as InsuranceAction from 'stores/insurance/InsuranceAction';
import * as BondIssuerAction from 'stores/bond-issuer/BondIssuerAction';
import moment from 'moment';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import FunnelSATable from '../../../../FunnelSATable';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import FunnelSASearchModel from 'stores/bank-garansi/models/FunnelSearchSAModel';
import { selectFunnelSAOutside } from 'selectors/bank-garansi/BankGaransiSelector';
import FunnelSARowModel from 'stores/bank-garansi/models/FunnelSARowModel';
import * as LanguageAction from 'stores/language/LanguageAction';
import './AdminFormStyle.scss';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';

interface IProps {
  expireds: boolean;
  process: string;
  funnelGenID: number;
  so: string;
}

const RequesterForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [disableComponent, setDisableComponent] = useState(true);
  const [letterType, setLetterType] = useState('');
  const bankGaransi = useSelector((state: IStore) => selectBGEditRequester(state));
  const letterTypeStore = useSelector((state: IStore) => selectLetterTypeOptions(state));
  const [storeIssuer, setStoreIssuer] = useState([]);
  const bondIssuerStore = useSelector((state: IStore) => selectBondIssuerOptions(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [bondIssuerID, setBondIssuerID] = useState('');
  const [bondIssuer, setBondIssuer] = useState('');
  const [estimated, setEstimated] = useState(0);
  const [language, setLanguage] = useState('');
  const [mandatory, setMandatory] = useState({
    sTenderNo: true,
    sTenderDate: true,
    sNilai: true,
  });
  const [customer, setCustomer] = useState(0);
  const [customerName, setCustomerName] = useState('');

  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshRequesterPage);

  useEffect(() => {
    dispatch(BondTypeAction.requestBondType());
    dispatch(LetterTypeAction.requestLetterType());
    dispatch(BondIssuerAction.requestBondIssuer());
    dispatch(LanguageAction.requestLanguage());
    dispatch(BankGaransiAction.requestCompany());
    dispatch(BankGaransiAction.requestCompanyApplicant());
  }, [dispatch]);

  const bondTypeStore = useSelector((state: IStore) => selectBondTypeOptions(state));
  const bankStore = useSelector((state: IStore) => selectBankOptions(state));
  const insuranceStore = useSelector((state: IStore) => selectInsuranceOptions(state));
  const languageStore = useSelector((state: IStore) => selectLanguageOptions(state));
  const companyStore = useSelector((state: IStore) => selectCompanyOptions(state));
  const companyApplicantStore = useSelector((state: IStore) => selectCompanyApplicantOptions(state));
  const FunnelSAStoreSearch = useSelector((state: IStore) => selectFunnelSAOutside(state));
  const resultAction = useSelector((state: IStore) => state.bankGaransi.resultActions);
  const filter: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listSearch.filter);
  const direction: string = useSelector((state: IStore) => state.bankGaransi.listSearch.sorting);
  const columnsorting: string = useSelector((state: IStore) => state.bankGaransi.listSearch.column);
  const search: any = useSelector((state: IStore) => state.bankGaransi.listSearch.search);

  const onLanguage = (values: any) => {
    setLanguage(values);
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
      //Bond Issuer
      if (bankGaransi.bondIssuerType === 'Bank') {
        setBondIssuer('Bank');
        dispatch(BankAction.requestBank());
      } else {
        setBondIssuer('Insurance');
        dispatch(InsuranceAction.requestInsurance());
      }
    }
  };

  const onSubmitHandler = (values: BankGaransiEditViewRequesterModel) => {
    if (!disableComponent) {
      setDisableComponent(true);
      const newValues = new BankGaransiEditViewRequesterModel(values);
      newValues.funnelGenID = 0;
      newValues.bankGuaranteeNo = bankGaransi.bankGuaranteeNo;
      newValues.process = props.process;
      newValues.modifyUserID = currentUser.employeeID;

      dispatch(BankGaransiActions.putBankGaransiRequester(newValues));
    }
  };

  if (bRefreshPage) {
    if (resultAction.errorNumber == '666') {
      dispatch(ToastsAction.add(resultAction.message, ToastStatusEnum.Warning));
    } else {
      if (search !== null && search.searchText != null) {
        dispatch(BankGaransiAction.requestBGSearch(currentUser.userName, search.searchText, activePage, pageSize, 0, columnsorting, direction));
      } else if (filter !== null) {
        const filterNew = new FilterSearchModel(filter);
        filterNew.pageSize = pageSize;
        filterNew.page = activePage;
        filterNew.column = columnsorting;
        filterNew.sorting = direction;
        dispatch(BankGaransiActions.postFilterSearch(filterNew));
      } else {
        dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, columnsorting, direction));
      }
    }
  }

  const onLetterType = (values: any) => {
    setLetterType(values);
    let storesIssuer: any = [];
    if (values == 'Dukungan Bank') {
      onBondType(null);
      storesIssuer = bondIssuerStore.filter((item: any) => {
        return item.value === 'Bank';
      });
      setStoreIssuer(storesIssuer);
    }
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
    dispatch(BankGaransiActions.requestBankRecomended(values, moment(new Date()).format('YYYY/MM/DD')));
  };

  const onBondType = (values: any) => {
    console.log('change');
  };

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(BankGaransiActions.requestBGViewEditRequester(bankGaransi.bankGuaranteeGenID));
      setDisableComponent(true);
    }
  };

  const onBankName = (values: any) => {
    setBondIssuerID(values);
    setEstimated(1);
    dispatch(BankGaransiActions.requestBankEstimated(values));
  };

  const onFocusFunnelSA = () => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <FunnelSATable modals={'edit'} bondTypes={bankGaransi.bondType} pFunnelGenID={props.funnelGenID} />,
        ModalSizeEnum.Large
      )
    );
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
        dispatch(BankGaransiActions.requestDropdownSearchFunnelSA(currentUser.userName, data));
      } else {
        searchModel.saNo = '';
        searchModel.funnelGenID = data;
        dispatch(BankGaransiActions.requestDropdownSearchFunnelSA(currentUser.userName, data));
      }
    }
  };

  const onResultSelectFunnelSA = (data: any) => {
    const { projectName, funnelDate, customerName, customerGenID, funnelGenID, saDate, saNo, salesName } = data.result;
    const selectedFunnelSA = new FunnelSARowModel({});
    selectedFunnelSA.customerName = customerName;
    selectedFunnelSA.funnelDate = funnelDate;
    selectedFunnelSA.projectName = projectName;
    selectedFunnelSA.saDate = saDate;
    selectedFunnelSA.saNo = saNo;
    selectedFunnelSA.salesName = salesName;
    selectedFunnelSA.customerGenID = customerGenID;
    selectedFunnelSA.funnelGenID = funnelGenID;
    dispatch(BankGaransiActions.insertFunnelSAObject(selectedFunnelSA));
    setCustomerName(customerName);
    setCustomer(customerGenID);
    /*  setProjectName(projectName)
        setSelectedSA(saNo)
        setSelectedFunnel(funnelGenID)
        setPICMobilePhone("");
        setPICEmailAddr("");
        setPICJobTitle(""); */
  };

  let form: any;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={bankGaransi}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Segment className="LightGreyNotif p-0">
              <Grid padded className="pb-0">
                <Grid.Row>
                  <Grid.Column>
                    <Header>
                      <Header.Content>Requester</Header.Content>
                      <Header.Content className="FloatRight">
                        {(disableComponent && !props.expireds && bankGaransi.stepName === 'Approval Admin') ||
                          (disableComponent && !props.expireds && bankGaransi.status === 'REJECTED' && (
                            <Tooltips
                              position="top right"
                              content="Edit Requester Details"
                              trigger={
                                <Button
                                  circular
                                  basic
                                  type="button"
                                  compact
                                  icon="edit"
                                  onClick={(e: Event) => onHeaderSubmitHandler(e)}
                                  floated="right"
                                />
                              }
                            />
                          ))}
                        {!disableComponent && (
                          <Fragment>
                            <Tooltips
                              position="top right"
                              content="Cancel Update"
                              trigger={<Button onClick={onCancel} type="button" basic compact icon="cancel" circular />}
                            />
                            <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                          </Fragment>
                        )}
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider className="m-0" />
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="bondType"
                      component={SelectInput}
                      placeholder="Bond Type"
                      labelName="Bond Type"
                      disabled={disableComponent}
                      options={bondTypeStore}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="letterType"
                      component={DropdownClearInput}
                      placeholder="Letter Type"
                      labelName="Letter Type"
                      disabled={disableComponent}
                      options={letterTypeStore}
                      onChanged={onLetterType}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="bondIssuerType"
                      options={letterType === 'Dukungan Bank' ? storeIssuer : bondIssuerStore}
                      component={SelectInput}
                      mandatory={false}
                      placeholder="e.g.Bank.."
                      onChanged={onBondIssuer}
                      labelName="Bond Issuer"
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    {disableComponent && (
                      <Field
                        name="bondIssuer"
                        component={TextInput}
                        placeholder="Bank / Insurance Name"
                        labelName="Bank / Insurance Name"
                        disabled={disableComponent}
                      />
                    )}
                    {!disableComponent && (
                      <Field
                        name="bondIssuer"
                        options={bondIssuer === 'Bank' ? bankStore : insuranceStore}
                        component={SelectInput}
                        mandatory={false}
                        onChanged={onBankName}
                        placeholder="e.g.AXA.."
                        labelName="Bank / Insurance Name"
                        disabled={disableComponent}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel ReadOnly">
                    <Field
                      name="cocode"
                      options={companyStore}
                      component={SelectInput}
                      mandatory={false}
                      placeholder="e.g.MSG.."
                      disabled={disableComponent}
                      labelName="Company"
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel ReadOnly">
                    <Field name="so" component={TextInput} placeholder="SO" labelName="SO" disabled={true} values={props.so} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel FullGrid767">
                    <Field
                      name="linkTo"
                      component={TextInputWithFocus}
                      placeholder="Quotation / SA / SO(e.g.SO#12345)"
                      editMode={disableComponent ? false : props.funnelGenID > 0 ? false : true}
                      onFocus={() => onFocusFunnelSA()}
                      /*  defaultValue={
                                (selectedSA != "undefined")?selectedSA:selectedSO
                            } */
                      labelName="Link To"
                      disabled={disableComponent}
                      handleSearchChange={handleSearchFunnelSA}
                      results={FunnelSAStoreSearch}
                      onResultSelect={onResultSelectFunnelSA}
                    />
                  </Grid.Column>
                  <Grid.Column className={!disableComponent ? 'ViewLabel' : 'ViewLabel ReadOnly'}>
                    <Field
                      name="nilai"
                      component={NumberInput}
                      labelColor="white"
                      thousandSeparator={true}
                      placeholder="Amount"
                      labelName="BG Amount"
                      disabled={disableComponent}
                      TextAlign="left"
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="requireOn"
                      component={DateInput}
                      placeholder="Require On"
                      labelName="Require On"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="language"
                      component={SelectInput}
                      options={languageStore}
                      mandatory={false}
                      disabled={disableComponent}
                      placeholder="e.g.Bahasa Indonesia.."
                      labelName="Language"
                      onChanged={onLanguage}
                      values={language}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="reqEffectiveDate"
                      component={DateInput}
                      placeholder="Effective Date"
                      labelName="Effective Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel rw-right">
                    <Field
                      name="reqExpireDate"
                      component={DateInput}
                      placeholder="Expire Date"
                      labelName="Expire Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                </Grid.Row>
                {bankGaransi.bondType === 'Bid Bond' && (
                  <Grid.Row columns={2}>
                    <Grid.Column className="ViewLabel">
                      <Field name="tenderNo" component={TextInput} placeholder="Tender No" labelName="Tender No" disabled={disableComponent} />
                    </Grid.Column>
                    <Grid.Column className="ViewLabel rw-right">
                      <Field
                        name="tenderAnnouncementDate"
                        component={DateInput}
                        placeholder="Tender Announcement Date"
                        labelName="Tender Announcement Date"
                        date={true}
                        disabled={disableComponent}
                      />
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Grid>
            </Segment>
          </Form>
        )}
      />
    );
  }

  return form;
};

export default RequesterForm;

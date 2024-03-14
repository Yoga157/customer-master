import React, { useEffect, Fragment, useState } from 'react';
import { SelectInput, TextInput, DateInput, Button, DropdownClearInput, DateName, NumberInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider, Segment } from 'semantic-ui-react';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import { combineValidators, isRequired } from 'revalidate';
import Attachment from 'views/attachment-page/Attachment';
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
import BankGaransiModel from 'stores/bank-garansi/models/BankGaransiModel';
import BankGaransisModel from 'stores/bank-garansi/models/BankGaransisModel';
import FunnelHeaderNameModel from 'stores/funnel/models/FunnelHeaderNameModel';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import * as FunnelAction from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectViewFunnelSelling, selectViewFunnelStatus, selectFunnelHeader } from 'selectors/funnel/FunnelSelector';
import { selectBankRecomended, selectBankEstimated } from 'selectors/bank-garansi/BankGaransiSelector';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from 'stores/toasts/ToastsAction';

interface IProps {
  popupLevel: number;
  funnelGenID: number;
  dealCloseDate: any;
}

const BankGaransiForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(FunnelAction.requestFunnelHeaderLocal());
    dispatch(FunnelAction.requestViewFunnelStatusById(+props.funnelGenID));
    dispatch(BondTypeAction.requestBondType());
    dispatch(LanguageAction.requestLanguage());
    dispatch(LetterTypeAction.requestLetterType());
    dispatch(BondIssuerAction.requestBondIssuer());
    dispatch(BankGaransiAction.requestBankRecomended('', moment(new Date()).format('YYYY/MM/DD')));
    setExpiredDate(new Date(props.dealCloseDate));
  }, [dispatch, props.funnelGenID]);

  const { popupLevel } = props;
  const [bondType, setBondType] = useState(null);
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
  const [language, setLanguage] = useState('');
  const [nilai, setNilai] = useState(0);
  const [estimated, setEstimated] = useState(0);

  const funnelAttachment: AttachmentModel[] = useSelector((state: IStore) => state.attachment.listData.rows);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const currentFunnelHeader = useSelector((state: IStore) => selectFunnelHeader(state));
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const viewFunnelSelling = useSelector((state: IStore) => selectViewFunnelSelling(state));
  const [expiredDate, setExpiredDate] = useState(new Date());

  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);

  const attach = funnelAttachment.filter((item: any) => {
    return item.documentTypeID === 298;
  });

  const onSubmitHandler = (values: any) => {
    //Initialize object
    const newBankGaransi = new BankGaransisModel();
    newBankGaransi.SalesBankGuarantee = new BankGaransiModel(values);
    newBankGaransi.FunnelHeaderName = new FunnelHeaderNameModel(values);
    newBankGaransi.SalesBankGuaranteeAttachment = funnelAttachment;

    //Funnel Header Name
    newBankGaransi.FunnelHeaderName.employeeEmail = currentUser.email;
    newBankGaransi.FunnelHeaderName.domain = currentUser.userName;
    newBankGaransi.FunnelHeaderName.nilaiProject = viewFunnelSelling.totalSellingPrice;
    newBankGaransi.FunnelHeaderName.employeeKey = currentUser.employeeKey;
    newBankGaransi.FunnelHeaderName.customerName = currentFunnelHeader.customerName;
    newBankGaransi.FunnelHeaderName.endUserCustomerName = currentFunnelHeader.endUserCustomerName;
    newBankGaransi.FunnelHeaderName.customerPICName = currentFunnelHeader.customerPICName;
    newBankGaransi.FunnelHeaderName.CustomerPICJobTitle = currentFunnelHeader.CustomerPICJobTitle;
    newBankGaransi.FunnelHeaderName.CustomerPICEmail = currentFunnelHeader.CustomerPICEmail;
    newBankGaransi.FunnelHeaderName.CustomerPICPhone = currentFunnelHeader.CustomerPICPhone;

    const requireOn = new Date(values.requireOn);
    const effectiveDate = new Date(values.effectiveDate);
    const expireDate = new Date(expiredDate);
    //const tenderDate = new Date(values.tenderAnnouncementDate);
    const submitDate = new Date();
    let bonds: any = [];

    newBankGaransi.SalesBankGuarantee.bankGuaranteeGenID = 1;
    newBankGaransi.SalesBankGuarantee.funnelGenID = props.funnelGenID;
    newBankGaransi.SalesBankGuarantee.submitDate = submitDate;
    newBankGaransi.SalesBankGuarantee.requireOn = requireOn;
    newBankGaransi.SalesBankGuarantee.reqEffectiveDate = effectiveDate;
    newBankGaransi.SalesBankGuarantee.reqExpireDate = expireDate;
    newBankGaransi.SalesBankGuarantee.projectAmount = viewFunnelSelling.totalSellingPrice;
    newBankGaransi.SalesBankGuarantee.nilai = nilai;
    //newBankGaransi.SalesBankGuarantee.tenderAnnouncementDate = tenderDate;
    if (values.tenderAnnouncementDate != undefined) {
      newBankGaransi.SalesBankGuarantee.tenderAnnouncementDate = new Date(values.tenderAnnouncementDate);
    }
    if (values.tenderNo != undefined) {
      newBankGaransi.SalesBankGuarantee.tenderNo = values.tenderNo;
    }
    if (values.letterType === 'Dukungan Bank') {
      newBankGaransi.SalesBankGuarantee.bondType = '';
    }
    newBankGaransi.SalesBankGuarantee.bondIssuerType = bondIssuer;
    newBankGaransi.SalesBankGuarantee.createUserID = currentUser.employeeID;
    newBankGaransi.SalesBankGuarantee.createDate = values.submitDate;
    newBankGaransi.SalesBankGuarantee.status = 'Process In Admin';

    if (bondIssuer === 'Bank') {
      bonds = bankStore.filter((item: any) => {
        return item.value === values.bondIssuerID;
      });
    } else {
      bonds = insuranceStore.filter((item: any) => {
        return item.value === values.bondIssuerID;
      });
    }

    newBankGaransi.SalesBankGuarantee.bondIssuer = bonds[0].text;

    dispatch(BankGaransiAction.postBankGaransi(newBankGaransi));

    localStorage.removeItem('funnelAttachment');
    localStorage.removeItem('funnelHeader');
  };

  const cancelClick = () => {
    if (popupLevel === 1) {
      dispatch(ModalFirstLevelActions.CLOSE());
    } else if (popupLevel === 2) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else if (popupLevel === 3) {
      dispatch(ModalThirdLevelActions.CLOSE());
    }
  };

  if (bRefreshPage) {
    dispatch(ToastsAction.add(`Submit funnel success - Funnel ID:${props.funnelGenID}`, ToastStatusEnum.Success));
    dispatch(BankGaransiAction.requestBankGaransis(+props.funnelGenID, 1, 2000));

    cancelClick();
  }

  const onBondType = (values: any) => {
    setBondType(values);
    setMandatory({ ...mandatory, sTenderNo: false, sTenderDate: false });
  };

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

  const onLanguage = (values: any) => {
    setLanguage(values);
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
    console.log(value);
    setRequireOn(value);
    dispatch(BankGaransiAction.requestBankRecomended(bondIssuer, moment(new Date(value)).format('YYYY/MM/DD')));
  };

  const onExpiredDate = (values: any) => {
    setExpiredDate(values);
  };

  const onChangeNilai = (event: any) => {
    setNilai(event);
  };

  const validate = combineValidators({
    language: isRequired('Language'),
    requireOn: isRequired('Require On'),
    bondIssuer: isRequired('Bond Issuer'),
    bondIssuerID: isRequired('Bank/Insurance Name'),
    effectiveDate: isRequired('Effective Date'),
    //expireDate: isRequired('Expire Date'),
  });
  const validateTender = combineValidators({
    language: isRequired('Language'),
    requireOn: isRequired('Require On'),
    bondIssuer: isRequired('Bond Issuer'),
    bondIssuerID: isRequired('Bank/Insurance Name'),
    effectiveDate: isRequired('Effective Date'),
    //expireDate: isRequired('Expire Date'),
    tenderNo: isRequired('Tender No'),
    tenderAnnouncementDate: isRequired('Tender Announcement Date'),
  });

  const bondTypeStore = useSelector((state: IStore) => selectBondTypeOptions(state));
  const languageStore = useSelector((state: IStore) => selectLanguageOptions(state));
  const letterTypeStore = useSelector((state: IStore) => selectLetterTypeOptions(state));
  const bankStore = useSelector((state: IStore) => selectBankOptions(state));
  const bondIssuerStore = useSelector((state: IStore) => selectBondIssuerOptions(state));
  const insuranceStore = useSelector((state: IStore) => selectInsuranceOptions(state));
  const bankRecommended = useSelector((state: IStore) => selectBankRecomended(state));
  const bankEstimated = useSelector((state: IStore) => selectBankEstimated(state));

  return (
    <Fragment>
      <Card.Header>REQUEST BANK REFERENCE LETTER / GUARANTEE FunnelNo# or SO#</Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={bondType != null ? validateTender : validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine }) => (
          <Form onSubmit={handleSubmit}>
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
                    to use {bankRecommended.bankInsurance} for faster BG Proses
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="letterType"
                    component={DropdownClearInput}
                    options={letterTypeStore}
                    mandatory={true}
                    placeholder="e.g.Bid Bond.."
                    labelName="Letter Type"
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
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="nilai"
                    component={NumberInput}
                    placeholder="e.g.99.000.00.."
                    labelName="BG Amount"
                    mandatory={false}
                    values={nilai > viewFunnelSelling.totalSellingPrice ? viewFunnelSelling.totalSellingPrice : nilai}
                    disabled={letterType == 'Referensi Bank' && bondType == null ? true : false}
                    thousandSeparator={true}
                    onChange={onChangeNilai}
                  />
                </Grid.Column>
              </Grid.Row>
              <Divider></Divider>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767">
                  <Field
                    name="bondIssuer"
                    options={letterType === 'Dukungan Bank' ? storeIssuer : bondIssuerStore}
                    component={SelectInput}
                    mandatory={false}
                    placeholder="e.g.Bank.."
                    onChanged={onBondIssuer}
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
                    disabled={letterType == 'Referensi Bank' && bondType == null ? true : false}
                    maxDate={expiredDate}
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
                    disabled={letterType === 'Referensi Bank' && bondType === null ? true : false}
                    minDate={currentDate}
                    onChange={onExpiredDate}
                    values={expiredDate}
                    maxDate={props.dealCloseDate}
                    toolTipPosition="top right"
                    toolTipContents={<p>BG Expired Date doesnt exceed Funnel Deal Close Date</p>}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Grid className="LightGreyNotif p-1r">
                    <Grid.Row columns={2}>
                      <Grid.Column className="FullGrid767">
                        <Field
                          name="tenderNo"
                          component={TextInput}
                          mandatory={mandatory.sTenderNo}
                          placeholder="e.g.SPX-001002.."
                          labelName="Tender No"
                          disabled={bondType === null ? true : false}
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
                          disabled={bondType == null ? true : false}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              {/* attachment */}
              <Attachment modul={2} isLocalFirst={true} funnelGenID={'0'} popupLevel={popupLevel + 1} />
            </Grid>{' '}
            <br />
            <Button
              type="submit"
              color="blue"
              floated="right"
              disabled={pristine || funnelAttachment.length === 0 || (bondType === 0 && attach.length === 0)}
            >
              Save
            </Button>
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

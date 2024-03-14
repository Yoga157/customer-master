import React, { useEffect, useState, useCallback, Fragment } from 'react';
import moment from 'moment';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Divider, Card } from 'semantic-ui-react';
import { TextInput, Button, NumberInput, RichTextEditor, SearchInput, RadioButton } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions'
import * as CustomerActions from 'stores/customer/CustomerActions';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { combineValidators, isRequired } from 'revalidate';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectCustomerSearchOptionsWithFlag } from 'selectors/select-options/CustomerSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import Attachment from 'views/main-cbv-page/components/attachment/Attachment';
import AssignCBV from 'views/main-cbv-page/components/assign-cbv/AssignCBV';
import CBVCreditBillingModels from 'stores/main-cbv/models/CBVCreditBillingModels';
import { selectCBVTypeVoucher, selectCBVCreditEntitlement } from 'selectors/main-cbv/CreditBillingServiceSelector';
import TotalCredit from './total-credit/totalCredit';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import './MainCBVServiceFormStyle.scss';

interface IProps {
  id: number;
  type: string;
}

const validate = combineValidators({
  voucherAmountH: isRequired('Voucher Amount')
});

const MainCBVServiceForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const CBVTypeVoucher = useSelector((state: IStore) => selectCBVTypeVoucher(state))

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const result = useSelector((state: IStore) => state.creditBilling.resultActions);
  //Form
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [totalusedAmountHState, setTotalusedAmountH] = useState(0);
  const [AccountId, setAccountId] = useState('')
  const [note, setNote] = useState('');
  const [dataAttachment, setDataAttachment] = useState([])
  const [dataAssign, setDataAssign] = useState([])
  const [typecbv, setTypeCbv] = useState(CBVTypeVoucher[0] && CBVTypeVoucher[0].udcid)
  const [typeCbvName, setTypeCbvName] = useState(CBVTypeVoucher[0] && CBVTypeVoucher[0].text1)
  const [validasiAttachment,setValidasiAttachment] = useState(false)

  const [validateTotalused, setValidateTotalUsed] = useState(false);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CreditBillingActions.POST_CREDIT_BILLINGS,
      CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST,
      CreditBillingActions.REQUEST_POST_ATTACHMENT,
      CreditBillingActions.REQUEST_POST_ASSIGN_CBV,
      CreditBillingActions.REQUEST_ENTITLEMENT,
      CreditBillingActions.REQUEST_CBVTYPEVOUCHER
    ])
  );

  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptionsWithFlag(state));
  const CBVEntitlement = useSelector((state: IStore) => selectCBVCreditEntitlement(state))
  const isLoadingCustomer: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME]));
  const refreshSubmit: boolean = useSelector((state: IStore) => state.creditBilling.refreshPageSubmit);
  const resultSubmit: any = useSelector((state: IStore) => state.creditBilling.resultActions);
  const handleSubmit = (values?: any) => {
    const newValues = new CBVCreditBillingModels();
    const now = moment();
    
    const itemValues = values;
    itemValues.creditId = 0;
    itemValues.voucherNo = values.voucherNo;
    itemValues.sourceCustomerId = customerId; 
    itemValues.voucherAmountH = values.voucherAmountH;
    itemValues.usedAmountH = totalusedAmountHState;
    itemValues.notes = values.notes;
    itemValues.accountId = AccountId;
    itemValues.creditType = typecbv;
    itemValues.createDate = moment(now).format('yyyy-MM-DD');
    itemValues.createUserID = currentUser.employeeID;
    itemValues.modifyDate = moment(now).format('yyyy-MM-DD');
    itemValues.modifyUserID =  currentUser.employeeID;

    const creditDetail = dataAssign;

    const cbvAttachment = dataAttachment;

    newValues.creditHeader = itemValues;
    newValues.creditDetail = creditDetail;
    newValues.cbvAttachment = cbvAttachment;
    newValues.entId = CBVEntitlement.entId;
    console.log('newValues',newValues)
    dispatch(CreditBillingActions.postCreditBilling(newValues)).then(() => {
      // dispatch(CreditBillingActions.requestCBVTypeVoucher())
      setTimeout(() => {
        onClose()
      },500)
    })
  }

  
  const [TotalAmount, setTotalAmount] = useState(0)
  const [validasiRemove, setValidasiRemove] = useState(false)

  useEffect(() => {
  
    let totalusedAmountH: number = 0;
    dataAssign.map((item:any) => {
      totalusedAmountH +=item.voucherAmountD
    })
    setTotalusedAmountH(totalusedAmountH)
    if(voucherAmount >= totalusedAmountHState)
    {
      setValidateTotalUsed(true)
    } else if(voucherAmount <= totalusedAmountHState)
    {
      setValidateTotalUsed(false)
    }

    if(validasiRemove)
    {
      setValidateTotalUsed(true)
      setValidasiRemove(false)
    }

    dataAttachment.map((item:any) => {
      if(typeCbvName === "Credit Memo")
      {
        if(item.DocumentTypeName === "Email" || item.DocumentTypeName === "PO")
        {
          setValidasiAttachment(true)
        }
      } else {
        setValidasiAttachment(true)
      }
    })

    if(typeCbvName === "Voucher")
    {
      if(CBVEntitlement.creditRemaining <= voucherAmount)
      {
        setValidateVoucher(false)
      } 
    }else{
      setValidateVoucher(true)
    }
    
    dispatch(CreditBillingActions.requestCBVTypeVoucher())
    dispatch(CreditBillingActions.requestEntitlement())

  },[result, validateTotalused, totalusedAmountHState, dataAssign, validasiRemove, typecbv, dispatch])
  
  const [mandatory, setMandatory] = useState({
    svoucherAmountH: false,
    screditType: false
  });

  const [errorCustomerName, setErrorCustomer] = useState(false)

  const handleSearchChangeCust = useCallback(
    (data) => {
      setCustomerName(data);
      customerStoreSearch && customerStoreSearch.map((item: any) => {
        if(item.title === customerName)
        {
          setErrorCustomer(true)
        } else if (customerName !== data) 
        {
          setErrorCustomer(false)
        }
      })
    },
    [dispatch,customerStoreSearch]
  );

  const onResultSelectCustomer = (data: any) => {
    setCustomerName(data.result.title);
    setCustomerId(data.result.price)
    customerStoreSearch && customerStoreSearch.map((item: any) => {
      if(item.title === data.result.title)
        {
          setErrorCustomer(true)
        } 
    })

    customerStoreSearch && customerStoreSearch.map((item: any) => {
      if(item.title === data.result.title)
        {
          setErrorCustomer(true)
        } 
    })
  };

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

  const onAccountID = (event: any) => {
    setAccountId(event)
  }
  const [validateVoucher,setValidateVoucher] = useState(false)
  
  const AmountVoucher = (event: any) => {
    if(typeCbvName === "Voucher")
    {
      if(CBVEntitlement.creditRemaining >= event)
      {
        setValidateVoucher(true)
      } else if(CBVEntitlement.creditRemaining <= event)
      {
        setValidateVoucher(false)
      } 
    }else{
      setValidateVoucher(true)
    }
     
    setVoucherAmount(event)
    setTotalAmount(event)
  }

  const onNote = (event: any) => {
    setNote(event)
  }

  
  const onChangeTypeCBV = (event: any) => {
    setTypeCbv(event.udcid)
    setTypeCbvName(event.text1)
  }
  const [validateEntr, setValidateEntr] = useState(false)
  useEffect(() => {
    if(validateEntr)
    {
      dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
      setValidateEntr(false)
    }
    // if(validateEntr)
    // {
    //   const listener = event => {
    //     if (event.code === "Enter" || event.code === "NumpadEnter") {
    //       event.preventDefault();
    //     }
    //   };
    //   document.addEventListener("keydown", listener);
    //   return () => {
    //     document.removeEventListener("keydown", listener);
    //   };
    // }
  }, [validateEntr]);

  const Styling = () => {
    if(validateVoucher)
    {
      return  "20px"
    } else {
      return  "0px"
    }
  }

  return (
    <Fragment>
      <Card.Header>ADD NEW VOUCHER</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
      <FinalForm
        validate={validate}
        onSubmit={(values: CBVCreditBillingModels) => handleSubmit(values)}
        // initialValues={softwareMains}
        render={({ handleSubmit, invalid, pristine }) => (
          // loading={isRequesting}
          <Form onSubmit={handleSubmit} >
            <Grid>

              <Grid.Row centered columns={4} textAlign='center' style={{backgroundColor:"#EBEBEB", borderRadius: "10px", top: "10px", marginLeft:"20px", marginRight:"20px"}} >
                 {CBVTypeVoucher && CBVTypeVoucher.map((item) => (
                  <Grid.Column>
                    <Field
                        className="text-primary text-center"
                        name="creditType"
                        component={RadioButton}
                        label={item.text1}
                        mandatory={mandatory.screditType}
                        thousandSeparator={true}
                        checked={typecbv === item.udcid}
                        onChange={() => onChangeTypeCBV(item)}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>

              <Grid.Row className="mx-10r TotalCreaditResponsive" textAlign='center' centered columns={1}>
                <Grid.Column>
                    <TotalCredit CreditRemainingLastPeriod={CBVEntitlement.creditRemainingLastPeriod.toString()} CreditEntitlement={CBVEntitlement.creditEntitlement.toString()} CreditUsage={CBVEntitlement.creditUsage.toString()} CreditRemaining={CBVEntitlement.creditRemaining.toString()}  />
                </Grid.Column>
              </Grid.Row>

                <Grid.Row columns={3} verticalAlign="middle">
                  <Grid.Column mobile={8} tablet={5} computer={4} style={{ paddingRight: "0px", marginBottom: Styling() }}>
                    <Field
                      name="voucherAmountH"
                      component={NumberInput}
                      placeholder="e.g.99.000.00.."
                      labelName="Amount Voucher (USD)"
                      mandatory={mandatory.svoucherAmountH}
                      values={voucherAmount}
                      thousandSeparator={true}
                      onChange={AmountVoucher}
                    />
                    {
                      validateVoucher === false &&
                      (<div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <p className="BtmFormMessage">Can't more than remaining credit</p>
                      </div>)
                    }

                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={3} computer={2} className="TotalCreditInfo">
                    <div>
                      <p>/ {CBVEntitlement.creditRemaining}</p>
                    </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={10} className="FullGrid767">
                    <Field
                      name="customerName"
                      component={SearchInput}
                      placeholder="e.g.PT. Customer .."
                      loading={isLoadingCustomer}
                      labelName="Customer Name"
                      handleSearchChange={handleSearchChangeCust}
                      onResultSelect={onResultSelectCustomer}
                      results={customerStoreSearch}
                      // mandatory={mandatory.sCustomerName}
                      values={customerName}
                      resultRenderer={resultRenderer}
                      onKeyPress={(event) => {
                        // if (event.charCode == 13) {
                        //   dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
                        // }
                        if (event.charCode === 13) {
                          event.preventDefault()
                          setValidateEntr(true)
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
                      {/* {blackListFlagCust && <p className="BlackListText">Black List Customer</p>} */}
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    <Field
                      name="accountId"
                      component={TextInput}
                      placeholder="e.g.123-456.."
                      values={AccountId}
                      // mandatory={mandatory.saccountId}
                      onChange={onAccountID}
                      thousandSeparator={true}
                      labelName="Account Id"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    {/* onChange={onNote} values={note} */}
                    <Field name="notes" component={RichTextEditor} placeholder="e.g.Notes.." labelName="Notes" />
                  </Grid.Column>
                </Grid.Row>
                <Attachment type={"Add"} typecbv={typecbv} setValidasiAttachment={setValidasiAttachment} dataAttachment={dataAttachment} setDataAttachment={setDataAttachment} modul={2} isLocalFirst={true} funnelGenID={'0'} bankGuaranteeID={'0'} popupLevel={2} expireds={false} bgNo={'0'} />
                <AssignCBV type={"Add"} setValidasiRemove={setValidasiRemove} TotalAmount={TotalAmount} setTotalAmount={setTotalAmount} setTotalusedAmountH={setTotalusedAmountH} dataAssign={dataAssign} setDataAssign={setDataAssign} />
                <Grid.Row>
                  <Grid.Column>
                    {/* || !errorCustomerName */}
                    <Button color="blue" floated="right" content="Submit" disabled={pristine || dataAttachment.length === 0 || !validateTotalused || !typecbv || !validateVoucher || !validasiAttachment} />
                    <Button type="button" floated="right" content="Cancel" onClick={onClose} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default MainCBVServiceForm;

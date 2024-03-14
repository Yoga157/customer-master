import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Grid, Form, Segment, Label, Header, Divider } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Tooltips, NumberInput, SearchInput, RichTextEditor } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import './CreditBillingFormEdit.scss';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectCustomerSearchOptionsWithFlag } from 'selectors/select-options/CustomerSelector';
import ChangeCreditBilling from 'stores/main-cbv/models/ChangeCreditBilling';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import { selectCBVAssignDetail } from 'selectors/main-cbv/CreditBillingServiceSelector';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

interface IProps {
  /*  id: number;
  history: History; */
  rowData: any;
  CBVCreditId: any;
}

const CreditBillingFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [disableComponent, setDisableComponent] = useState(true);

  const { rowData, CBVCreditId } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const result = useSelector((state: IStore) => state.creditBilling.resultActions);
  // console.log('resultCreditBilling',result)
  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: any) => {

    const now = moment();
    const newValues = new ChangeCreditBilling(values);
    newValues.creditId = CBVCreditId.creditId;
    newValues.voucherNo = CBVCreditId.voucherNo;
    newValues.sourceCustomerId = customerID;
    newValues.voucherAmountH = voucherAmountH;
    newValues.usedAmountH = usedAmountH;
    newValues.notes = values.notes;
    newValues.createDate = moment(now).format('yyyy-MM-DD');
    newValues.createUserID = currentUser.employeeID;
    newValues.modifyDate = moment(now).format('yyyy-MM-DD');
    newValues.modifyUserID = currentUser.employeeID;
    console.log('newValues', newValues);
    dispatch(CreditBillingActions.putCreditBilling(newValues));
    if (!disableComponent) {
      setDisableComponent(true);
      dispatch(CreditBillingActions.removeResult());
    }


    // return () => {
    //   document.removeEventListener("keydown", listener);
    // };
  };

  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
      setUsedAmountH(CBVCreditId.usedAmountH);
      setVoucherAmountH(CBVCreditId.voucherAmountH);
      setCustomerName(CBVCreditId.sourceCustomerIdStr);
      setNotes(CBVCreditId.notes);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST]));

  const isLoadingCustomer: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME]));
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptionsWithFlag(state));
  const DetailCbv: any = useSelector((state: IStore) => selectCBVAssignDetail(state));

  const [customerName, setCustomerName] = useState('');
  const [voucherAmountH, setVoucherAmountH] = useState(0);
  const [usedAmountH, setUsedAmountH] = useState(0);
  const [customerID, setCustomerID] = useState(0);
  const [notes, setNotes] = useState('');
  const [remainingAmountH, setRemainingAmountH] = useState(0);
  const [errorCustomerName, setErrorCustomer] = useState(false);
  const [mandatory, setMandatory] = useState({
    sCustomerName: false,
  });
  // console.log('remainingAmountH',remainingAmountH)
  useEffect(() => {
    // setRemainingAmountH(CBVCreditId.voucherAmountH && CBVCreditId.usedAmountH === 0 ? CBVCreditId.voucherAmountH : CBVCreditId.voucherAmountH && CBVCreditId.usedAmountH ? CBVCreditId.voucherAmountH - CBVCreditId.usedAmountH : )
    // voucherAmountH && usedAmountH === 0 ? voucherAmountH : remainingAmountH + ""
    setRemainingAmountH(CBVCreditId.voucherAmountH - CBVCreditId.usedAmountH);
    setCustomerName(CBVCreditId.sourceCustomerIdStr);
    setCustomerID(CBVCreditId.sourceCustomerId);
    setUsedAmountH(CBVCreditId.usedAmountH);
    setVoucherAmountH(CBVCreditId.voucherAmountH);
    setNotes(CBVCreditId.notes);
    setErrorCustomer(true);
  }, [CBVCreditId, DetailCbv]);

  const onNotes = (event: any) => {
    setNotes(event);
  };

  const onvoucherAmountH = (event: any) => {
    setRemainingAmountH(event - usedAmountH);
    setVoucherAmountH(event);
  };

  const onusedAmountH = (event: any) => {
    setRemainingAmountH(voucherAmountH - event);
    setUsedAmountH(event);
  };

  const handleSearchChangeCust = useCallback(
    (data) => {
      // console.log('data1',data)
      setCustomerName(data);

      // if (data.length >= 2) {
      //   dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
      // }
      customerStoreSearch &&
        customerStoreSearch.map((item: any) => {
          if (item.title === customerName) {
            setErrorCustomer(true);
          } else if (customerName !== data) {
            setErrorCustomer(false);
          }
        });
    },
    [dispatch, customerStoreSearch]
  );

  const onResultSelectCustomer = (data: any) => {
    // console.log('data2',data)
    setCustomerName(data.result.title);
    setCustomerID(data.result.price);
    customerStoreSearch &&
      customerStoreSearch.map((item: any) => {
        if (item.title === data.result.title) {
          setErrorCustomer(true);
        }
      });
  };

  const resultRenderer = ({ image, price, title, valueData, textData, description, flag, id }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === '1' ? 'rgba(255, 248, 54, 0.5)' : '',
        }}
      >
        <div className="price">{price ? price : valueData}</div>
        <div className="title"> {title ? title : textData}</div>
      </div>
    );
  };

  // useEffect(() => {
  //   if(disableComponent === false)
  //   {
  //     const listener = event => {
  //       if (event.code === "Enter" || event.code === "NumpadEnter") {
  //         event.preventDefault();
  //       }
  //     };
  //     document.addEventListener("keydown", listener);
  //     return () => {
  //       document.removeEventListener("keydown", listener);
  //     };
  //   }
  // }, [disableComponent]);

  const [validasiPermission, setValidasiPermission] = useState(false);
  useEffect(() => {
    permission.map((item) => {
      if (item.text1 === currentUser.userName) {
        setValidasiPermission(true);
      }
    });
  }, []);
  const permission = useSelector((state: IStore) => selectPermission(state));
  const [validateResultCustomer, setValidateResultCustomer] = useState(false)
  useEffect(() => {
    if (validateResultCustomer) {
      setValidateResultCustomer(false)
      dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
    }
  }, [validateResultCustomer])

  return (
    <Fragment>
      <Header>
        <Header.Content className="pl-1">EDIT CBV</Header.Content>
      </Header>
      <Divider></Divider>
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={CBVCreditId}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            {/* <p>{ReactHtmlParser(notes)}</p> */}
            {/*  */}
            <Segment className="LightYellowNotif PadPmoNotif">
              <Grid>
                <Grid.Column>
                  <Grid.Row>
                    <Grid.Column className="mt-1r-767">
                      {disableComponent && (
                        <Tooltips
                          content="Edit CBV Detail"
                          trigger={
                            <Button basic type="button" disabled={validasiPermission === false ? true : false} compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />
                          }
                        />
                      )}
                      {!disableComponent && (
                        <Fragment>
                          <Tooltips
                            content="Save Update"
                            trigger={
                              <Button
                                //disabled={!customerName || !customerID || !errorCustomerName}
                                disabled={voucherAmountH <= 0 || voucherAmountH === undefined}
                                onClick={(e: Event) => onHeaderSubmitHandler(e)}
                                basic
                                compact
                                icon="save"
                                floated="right"
                              />
                            }
                          />
                          <Tooltips
                            content="Cancel Update"
                            trigger={<Button type="button" basic compact icon="cancel" floated="right" onClick={onCancel} />}
                          />
                        </Fragment>
                      )}
                    </Grid.Column>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column className="ViewLabel" mobile={16} tablet={16} computer={8}>
                          <Field
                            name="customerID"
                            component={SearchInput}
                            placeholder={rowData.sourceCustomerIDStr}
                            loading={isLoadingCustomer}
                            labelName="Source Customer Name"
                            disabled={disableComponent}
                            handleSearchChange={handleSearchChangeCust}
                            onResultSelect={onResultSelectCustomer}
                            results={customerStoreSearch}
                            //mandatory={mandatory.sCustomerName}
                            values={customerName}
                            resultRenderer={resultRenderer}
                            onKeyPress={(event) => {
                              if (event.charCode == 13) {
                                event.preventDefault()
                                setValidateResultCustomer(true)
                                // dispatch(EmployeeActions.searchALL(employeeName,''));
                              }
                            }}
                          />
                          {
                            !disableComponent && 
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <p className="BtmFormNote">Press enter to see the results</p>
                            </div>
                          }
                        </Grid.Column>
                        {/* <Grid.Column className="ViewLabel"></Grid.Column>
                        <Grid.Column className="ViewLabel"> */}
                        {/* <Field
                            name="expiredDate"
                            component={DateInput}
                            placeholder={rowData.createdDate}
                            labelName="Expired Date"
                            date={true}
                            disabled={disableComponent}
                          /> */}
                        {/* </Grid.Column> */}
                      </Grid.Row>

                      <Grid.Row>
                        <Grid.Column className={`ViewLabel ${disableComponent ? 'ReadOnly' : null}`} mobile={8} tablet={8} computer={4}>
                          <Field
                            name="voucherAmountH"
                            component={NumberInput}
                            labelColor="white"
                            thousandSeparator={true}
                            // placeholder={rowData.voucherAmountH}
                            labelName="Voucher Amount"
                            // disabled={disableComponent}
                            values={voucherAmountH?.toLocaleString()}
                            onChange={onvoucherAmountH}
                            TextAlign="left"
                            disabled={DetailCbv.length > 0 ? true : false}
                          />
                        </Grid.Column>
                        <Grid.Column className={`ViewLabel ${disableComponent ? 'ReadOnly' : null}`} mobile={8} tablet={8} computer={4}>
                          <Field
                            name="usedAmountH"
                            component={NumberInput}
                            labelColor="white"
                            thousandSeparator={true}
                            // placeholder={rowData.usedAmountH}
                            values={usedAmountH?.toLocaleString()}
                            onChange={onusedAmountH}
                            labelName="Used Amount"
                            disabled={true}
                            TextAlign="left"
                          />
                        </Grid.Column>
                        <Grid.Column className={`ViewLabel ${disableComponent ? 'ReadOnly' : null}`} mobile={8} tablet={8} computer={4}>
                          <Field
                            name="remainingAmount"
                            component={NumberInput}
                            labelColor="white"
                            thousandSeparator={true}
                            // placeholder={rowData.remainingAmountH}
                            labelName="Remaining Amount"
                            disabled={true}
                            values={remainingAmountH?.toLocaleString()}
                            TextAlign="left"
                          />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={2}>
                        <Grid.Column className={`ViewLabel ${disableComponent ? 'ReadOnly' : null}`}>
                          {/* <Field
                            name="notes"
                            component={TextInput}
                            labelColor="white"
                            thousandSeparator={true}
                            placeholder="Description"
                            labelName="Description"
                            disabled={disableComponent}
                            onChange={onNotes}
                            values={ReactHtmlParser(notes)}
                            TextAlign="left"
                          /> */}
                          {disableComponent ? (
                            <>
                              <Label >
                                Note
                              </Label>
                              <br />
                              <br />
                              <Label style={{ padding: 0, color: '#55637A', backgroundColor: '#FFFB9A', fontSize: '1.75rem', fontWeight: 'normal' }}>
                                {ReactHtmlParser(notes)}
                              </Label>
                            </>
                          ) : (
                            <Field
                              name="notes"
                              component={RichTextEditor}
                              placeholder="e.g.What customer need.."
                              labelName="Note"
                              // disabled={disableComponent}
                              onChange={onNotes}
                              values={notes}
                              TextAlign="left"
                            // mandatorys={mandatory.sCustomerNeeds}
                            />
                          )}
                        </Grid.Column>
                        <Grid.Column className="ViewLabel ReadOnly"></Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Segment>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default CreditBillingFormEdit;

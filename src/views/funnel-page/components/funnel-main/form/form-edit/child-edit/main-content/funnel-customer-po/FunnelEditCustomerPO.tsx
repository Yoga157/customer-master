import './FunnelEditCustomerPOStyle.scss';
import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Icon, Form, Segment, Label } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { LabelInput, LabelName, DateInput, TextInput, Button, Tooltips, RadioButton, CheckBoxInput } from 'views/components/UI';
import classes from './FunnelEditCustomerPO.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as PMOActions from 'stores/pmo/PMOActions';
import * as ModalFirstLevel from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IStore from 'models/IStore';
import { selectViewFunnelCustomerPO } from 'selectors/funnel/FunnelSelector';
import FunnelEditCustomerPOPlaceholder from './FunnelEditCustomerPOPlaceholder';
import FunnelEditCustomer from '../funnel-customer/FunnelEditCustomer';
import { FunnelViewEditCustomerPO } from 'stores/funnel/models/view-edit';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import AccordianCustomerPODetails from './components/accordian/AccordianCustomerPODetails';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { combineValidators, isRequired } from 'revalidate';
import { selectPMOViewEditPO } from 'selectors/pmo/PMOSelector';

interface IProps {
  page: string;
  funnelGenID: string;
  projectId?: string;
}

const FunnelEditCustomerPO: React.FC<IProps> = ({ page, funnelGenID, projectId }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [flagContract, setFlagContract] = useState(false as any);
  const [valueRadio, setValueRadio] = useState('');
  const [valueRunRate, setValueRunRate] = useState('');
  const [oiNumberForm, setOiNumberForm] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const isIcEdit: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isIcEdit);
  const isResetOneLevel = useSelector((state: IStore) => state.funnel.isResetOneLevel);
  const isShowIcNoEditGpm = useSelector((state: IStore) => state.funnel.isShowIcNoEditGpm);
  const funnelSellingLocal = JSON.parse(localStorage.getItem('editViewFunnelSellingEdit'));
  const resultMessage = useSelector(
    (state: IStore) => [state.funnel.resultActions, state.funnelSalesAnalyst.resultActions],
    
  );
  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(FunnelActions.requestViewFunnelCustomerPOById(+funnelGenID));
      setDisableComponent(true);
    }
  };

  const onSubmitHandler = (values: any, form: any) => {
    const newItems = new FunnelViewEditCustomerPO(values);
    newItems.funnelGenID = +funnelGenID;
    newItems.modifyUserID = currentUser.employeeID;
    newItems.flagKontrakPayung = valueRadio;
    newItems.flagContract = flagContract ? 1 : 0;
    newItems.runRate = valueRunRate;
    newItems.oiNo = oiNumberForm;
    if (isSalesAnalis) {
      const getLocalEdit = JSON.parse(
        localStorage.getItem("editViewFunnelCustomerPOEdit")
      );
      localStorage.setItem(
        "editViewFunnelCustomerPOEdit",
        getLocalEdit
          ? JSON.stringify([...getLocalEdit, newItems])
          : JSON.stringify([newItems])
      );
      form.change("oiNo", "");
    } else {
      dispatch(FunnelActions.putViewFunnelCustomerPO(newItems)).then(() => {
        form.change("oiNo", "");
      });
    }

    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_PO,
      FunnelActions.REQUEST_FUNNEL,
      FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW,
      PMOActions.PMO_VIEW_EDIT_PO,
    ])
  );
  const viewFunnelCustomerPO = useSelector((state: IStore) => selectViewFunnelCustomerPO(state));

  const [contractNo, setContractNo] = useState(viewFunnelCustomerPO.contractNo);
  useEffect(() => {
    if (+funnelGenID?.length > 0) {
      dispatch(FunnelActions.requestViewFunnelCustomerPOById(+funnelGenID));
    }
    localStorage.removeItem('editViewFunnelCustomerPOEdit');
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    setValueRadio(viewFunnelCustomerPO.flagKontrakPayung);
    setValueRunRate(viewFunnelCustomerPO.runRate);
    setContractNo(viewFunnelCustomerPO.contractNo);
    setFlagContract(viewFunnelCustomerPO.flagContract);
    setOiNumberForm(viewFunnelCustomerPO.oiNo);
  }, [dispatch, viewFunnelCustomerPO]);

  const IcEdit = (
    <Tooltips
      content="Edit Customer PO Details"
      trigger={<Button basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} floated="right" />}
    />
  );

  const validate = combineValidators({
    contractNo: (val) => (!val && valueRadio !== 'YES' ? false : val ? false : 'Contract No. is Required'),
  });

  function disabledEnter(e:any){
    if(e.keyCode == 13){
      e.preventDefault();
      return false;
    }
  }
  useEffect(() => {
    if (resultMessage[0].message === "OI No Tidak Ditemukan!") {
      setOiNumberForm(
        viewFunnelCustomerPO.oiNo ? viewFunnelCustomerPO.oiNo : ""
      );
      return;
    }
    if(resultMessage[1] !== undefined){
      if (resultMessage[1].message === "OI No Tidak Ditemukan!") {
        setOiNumberForm(
          viewFunnelCustomerPO.oiNo ? viewFunnelCustomerPO.oiNo : ""
        );
        return;
      }
    }
  }, [resultMessage]);

  return (
    <FinalForm
      onSubmit={(values: any, form: any) => onSubmitHandler(values, form)}
      validate={validate}
      initialValues={viewFunnelCustomerPO}
      key={2}
      render={({ handleSubmit, invalid }) => (
        <Form onKeyDown={(e:any)=>disabledEnter(e)} key={2} onSubmit={handleSubmit} loading={isRequesting}>
          <Header textAlign="center" attached="top" className={classes.Header}>
            <Grid className="WhiteNote">
              <Grid.Column width={16} className="FullGrid1200">
                <Field name="sa" component={LabelName} labelName="SA No." placeholder="e.g.01234" disabled={disableComponent} labelColor="white" />
              </Grid.Column>
              {viewFunnelCustomerPO.flagManual != "" && (
                <Grid.Column width={16} className="FullGrid1200">
                  <Label className={`mb-1 background-color: red !important; ${classes.labelRounded20}`}>
                    {viewFunnelCustomerPO.flagManual}
                  </Label>
                </Grid.Column>
              )}
              <Grid.Column className="FullGrid1200 pt-0 SoNumber" width={16}>
                <Field name="so" component={LabelName} labelName="SO No." placeholder="e.g.01234" disabled={disableComponent} labelColor="white" />
              </Grid.Column>
            </Grid>
          </Header>
          <Segment attached className="borderless">
            <Grid>
              <Grid.Column className="EditSaveBtn" floated="right" width={16}>
                {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && disableComponent && (
                  <>
                    {JSON.parse(localStorage.getItem('editViewFunnelCustomerPOEdit')) && (
                      <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning float-r mt-px-4 ml-px-4" />} />
                    )}

                    {(isIcEdit || isShowIcNoEditGpm || isResetOneLevel) && IcEdit}

                    <Tooltips
                      content="History Customer PO Details"
                      trigger={
                        <Button
                          basic
                          type="button"
                          compact
                          icon="history"
                          floated="right"
                          onClick={(e: Event) =>
                            dispatch(ModalFirstLevel.OPEN(<AccordianCustomerPODetails funnelGenID={funnelGenID} />, ModalSizeEnum.Small))
                          }
                        />
                      }
                    />
                  </>
                )}
                {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && !disableComponent && (
                  <Fragment>
                    <Tooltips content="Save Update" trigger={<Button basic compact icon="save" floated="right" disabled={invalid} />} />
                    <Tooltips
                      content="Cancel Update"
                      trigger={<Button type="button" basic compact icon="cancel" floated="right" onClick={onCancel} />}
                    />
                  </Fragment>
                )}
              </Grid.Column>
            </Grid>

            <Grid className="mt-0 ViewLabel">
              <Grid.Row className="pt-0">
                <Grid.Column className="FullGrid1200">
                  <Header size="tiny" className={classes.textGrey}>
                    SO IDC
                  </Header>
                </Grid.Column>
              </Grid.Row>
              {viewFunnelCustomerPO.soidc && (
                <Grid.Row className="pt-0">
                  <Grid.Column className="FullGrid1200">
                    {viewFunnelCustomerPO.soidc.split(',').map((color, k) => (
                      <Label key={k} className={`mb-1 ${classes.bgPuple} ${classes.labelRounded20}`}>
                        {color}
                      </Label>
                    ))}
                  </Grid.Column>
                </Grid.Row>
              )}
              <div className="ui divider FullHdivider"></div>
            </Grid>

            {viewFunnelCustomerPO.soParent && (
              <Grid className="mt-0 ViewLabel">
                <Grid.Row className="pt-0">
                  <Grid.Column className="FullGrid1200">
                    <Header size="tiny" className={classes.textGrey}>
                      SO Parent
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="pt-0">
                  <Grid.Column className="FullGrid1200">
                    {viewFunnelCustomerPO.soParent.split(',').map((color, k) => (
                      <Label key={k} className={`mb-1 ${classes.bgPuple} ${classes.labelRounded20}`}>
                        {color}
                      </Label>
                    ))}
                  </Grid.Column>
                </Grid.Row>
                <div className="ui divider FullHdivider"></div>
              </Grid>
            )}

            <Grid className="ViewLabel" columns={1}>
                <Grid.Row>
                  <Grid.Column className="pt-0" width={16}>
                    <Field 
                      name="oiNo" 
                      labelName="OI Number" 
                      component={TextInput} 
                      placeholder="e.g.OI/CI-2023/00052" 
                      values={oiNumberForm} 
                      onChange={(e:any)=>setOiNumberForm(e)}
                      defaultValue={viewFunnelCustomerPO.oiNo} 
                      disabled={disableComponent} 
                    />
                  </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid className="ViewLabel" columns={2}>
              <Grid.Row>
                <Grid.Column className="FullGrid1200" width={8}>
                  <Field
                    name="soDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Target SO Close Date"
                    date={true}
                    disabled={disableComponent}
                    toolTipPosition="bottom center"
                    toolTipContents={'Target SO Close Date: End Date + BAST + TOP(Collection)'}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid1200" width={8}></Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="ui divider FullHdivider"></div>
            {/* <Grid className="mt-0 ViewLabel" columns={2}> */}
            <Grid className="ViewLabel" columns={2}>
              <Grid.Row className="pt-0">
                <Grid.Column className="FullGrid1200">
                  <Field name="poCustomerNo" component={TextInput} placeholder="e.g.01234" labelName="PO Customer No." disabled={disableComponent} />
                </Grid.Column>

                <Grid.Column className="FullGrid1200">
                  <Field
                    name="poCustomerDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="PO Date"
                    date={true}
                    disabled={disableComponent}
                    className="rw-right"
                  />
                </Grid.Column>
              </Grid.Row>
              <div className="ui divider FullHdivider"></div>
              <Grid.Row className="pt-0" columns="equal">
                <Grid.Column className=" FullGrid1200">
                  <Field
                    name="contractNo"
                    component={TextInput}
                    placeholder="e.g.01234"
                    labelName="Contract No."
                    disabled={disableComponent}
                    mandatory={valueRadio === 'YES' && !contractNo ? false : true}
                    onChange={(e) => setContractNo(e)}
                    meta={{
                      touched: valueRadio === 'YES' && !contractNo ? 'Contract No. is Required' : false,
                      error: valueRadio === 'YES' && !contractNo ? 'Contract No. is Required' : false,
                    }}
                  />
                </Grid.Column>

                <Grid.Column className=" ViewLabel FullGrid1200 " verticalAlign="middle">
                  <Field
                    name="chkFlagContract"
                    component={CheckBoxInput}
                    label="Flag Contract"
                    onChange={(e) => {
                      setFlagContract(!flagContract);
                    }}
                    values={flagContract}
                    useValues={true}
                    disabled={disableComponent}
                    toolTipPosition="bottom center"
                    toolTipContents={'Please check if this project has contract documents, contract documents are needed for billing'}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column className=" FullGrid1200">
                  <Grid className={classes.gridContentPayung}>
                    <Header size="tiny" className={classes.headerContentPayung}>
                      Run Rate
                    </Header>
                    <Grid.Row className={`pv-10px`} columns="equal">
                      <Grid.Column className=" FullGrid1200" width={8}>
                        <Field
                          name="runRateYes"
                          component={RadioButton}
                          label="YES"
                          checked={valueRunRate === 'YES'}
                          onChange={() => setValueRunRate('YES')}
                          //disabled={viewFunnelCustomerPO.flagRunRate === 1 && !disableComponent ? false : true}
                          disabled={
                            !disableComponent && funnelSellingLocal != null
                              ? (funnelSellingLocal[0].currency === 'USD' &&
                                  funnelSellingLocal[0].totalSellingPrice <= 30000 &&
                                  funnelSellingLocal[0].gpmPctg >= 7 &&
                                  viewFunnelCustomerPO.dept === 'ISD') ||
                                (funnelSellingLocal[0].currency === 'IDR' &&
                                  funnelSellingLocal[0].totalSellingPrice <= 400000000 &&
                                  funnelSellingLocal[0].gpmPctg >= 7 &&
                                  viewFunnelCustomerPO.dept === 'ISD')
                                ? false
                                : true
                              : viewFunnelCustomerPO.flagRunRate === 1 && !disableComponent
                              ? false
                              : true
                          }
                        />
                      </Grid.Column>
                      <Grid.Column className=" FullGrid1200" width={8}>
                        <Field
                          name="runRateNo"
                          className="text-danger"
                          component={RadioButton}
                          label="NO"
                          checked={valueRunRate === 'NO'}
                          onChange={() => setValueRunRate('NO')}
                          //disabled={viewFunnelCustomerPO.flagRunRate === 1 && !disableComponent ? false : true}
                          disabled={
                            !disableComponent && funnelSellingLocal != null
                              ? (funnelSellingLocal[0].currency === 'USD' &&
                                  funnelSellingLocal[0].totalSellingPrice <= 30000 &&
                                  funnelSellingLocal[0].gpmPctg >= 7) ||
                                (funnelSellingLocal[0].currency === 'IDR' &&
                                  funnelSellingLocal[0].totalSellingPrice <= 400000000 &&
                                  funnelSellingLocal[0].gpmPctg >= 7)
                                ? false
                                : true
                              : viewFunnelCustomerPO.flagRunRate === 1 && !disableComponent
                              ? false
                              : true
                          }
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column className=" FullGrid1200">
                  <Grid className={classes.gridContentPayung}>
                    <Header size="tiny" className={classes.headerContentPayung}>
                      Contract Payung
                    </Header>
                    <Grid.Row className={`pv-10px`} columns="equal">
                      <Grid.Column className=" FullGrid1200" width={8}>
                        <Field
                          name="contractPayungYes"
                          component={RadioButton}
                          label="YES"
                          checked={valueRadio === 'YES'}
                          onChange={() => setValueRadio('YES')}
                          disabled={disableComponent}
                        />
                      </Grid.Column>
                      <Grid.Column className=" FullGrid1200" width={8}>
                        <Field
                          name="contractPayungNo"
                          className="text-danger"
                          component={RadioButton}
                          label="NO"
                          checked={valueRadio === 'NO'}
                          onChange={() => setValueRadio('NO')}
                          disabled={disableComponent}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column className="FullGrid1200" width={8}>
                  <Field
                    name="contractStartDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Start Contract"
                    date={true}
                    disabled={disableComponent}
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid1200" width={8}>
                  <Field
                    name="contractEndDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="End Contract"
                    date={true}
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default FunnelEditCustomerPO;

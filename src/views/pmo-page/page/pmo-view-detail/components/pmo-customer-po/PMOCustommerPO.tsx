import React, { useState, useEffect } from 'react';
import { Grid, Header, Form, Segment, Label, Dropdown, List } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { combineValidators } from 'revalidate';
import { Dispatch } from 'redux';

import {
  LabelName,
  DateInput,
  TextInput,
  Button,
  Tooltips,
  RadioButton,
  NumberInput,
  SelectInput,
  SearchInput,
  CheckBoxInput,
  DropdownInput,
} from 'views/components/UI';
import {
  selectComplexityOptions,
  selectProjectCategorySAOptions,
  selectViewFunnelCustomer,
  selectViewFunnelCustomerPO,
} from 'selectors/funnel/FunnelSelector';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { FunnelViewEditCustomerPO } from 'stores/funnel/models/view-edit';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';
import IStore from 'models/IStore';

import * as PresalesSupportActions from 'stores/presales-support/PresalesSupportActions';
import { reqDedicatedResourceOptions } from 'constants/reqDedicatedResourceOptions';
import { durationTypeOptions } from 'constants/durationTypeOptions';
import { selectPresalesOptions } from 'selectors/select-options';
import { selectPMOViewEditPO } from 'selectors/pmo/PMOSelector';
import classes from './PMOCustommerPO.module.scss';
import './PMOCustommerPO.scss';

interface IProps {
  page: string;
  funnelGenID: string;
  projectId?: string;
}

const PMOCustommerPO: React.FC<IProps> = ({ page, funnelGenID, projectId }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [valueRadio, setValueRadio] = useState('');
  const [valueRunRate, setValueRunRate] = useState('');

  const projectCategorySAOptions = useSelector((state: IStore) => selectProjectCategorySAOptions(state));
  const viewFunnelCustomerPO = useSelector((state: IStore) => selectViewFunnelCustomerPO(state));
  const presalesSupportOptions = useSelector((state: IStore) => selectPresalesOptions(state));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const complexityOptions = useSelector((state: IStore) => selectComplexityOptions(state));
  const funnelSellingLocal = JSON.parse(localStorage.getItem('editViewFunnelSellingEdit'));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const pmoViewCustomerPO = useSelector((state: IStore) => selectPMOViewEditPO(state));

  const [contractNo, setContractNo] = useState(viewFunnelCustomerPO.contractNo);

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

  const onSubmitHandler = (values: any) => {
    const newItems = new FunnelViewEditCustomerPO(values);
    newItems.funnelGenID = +funnelGenID;
    newItems.modifyUserID = currentUser.employeeID;
    newItems.flagKontrakPayung = valueRadio;
    newItems.runRate = valueRunRate;

    dispatch(FunnelActions.putViewFunnelCustomerPO(newItems));

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

  useEffect(() => {
    dispatch(PresalesSupportActions.requestPresales());
    dispatch(FunnelActions.requestProjectTypeSA());
    dispatch(FunnelActions.requestComplexity());

    if (+funnelGenID?.length > 0) {
      dispatch(FunnelActions.requestViewFunnelCustomerPOById(+funnelGenID));
    }
    if (+projectId?.length > 0 && page === 'pmo-view-edit') {
      // dispatch(PMOActions.reqPMOCustommerViewEditPO(+projectId));
      dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));
    }
  }, [dispatch, funnelGenID, projectId]);

  useEffect(() => {
    setValueRadio(viewFunnelCustomerPO.flagKontrakPayung);
    setValueRunRate(viewFunnelCustomerPO.runRate);
    setContractNo(viewFunnelCustomerPO.contractNo);
  }, [dispatch, viewFunnelCustomerPO]);

  const validate = combineValidators({
    contractNo: (val) => (!val && valueRadio !== 'YES' ? false : val ? false : 'Contract No. is Required'),
  });

  const viewPMOCustomerPO = {
    ...viewFunnelCustomerPO,
    ...viewFunnelCustomer,
    ...pmoViewCustomerPO,
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={validate}
      initialValues={viewPMOCustomerPO}
      key={2}
      render={({ handleSubmit, invalid }) => (
        <Form key={2} onSubmit={handleSubmit} loading={isRequesting}>
          <Header textAlign="center" attached="top" className={classes.Header}>
            <Grid className="WhiteNote">
              <Grid.Column width={16} className="FullGrid1200">
                <Field
                  name="projectName"
                  component={LabelName}
                  labelName="Project Name"
                  placeholder="e.g.Project Gundam OO Riser"
                  disabled={disableComponent}
                  labelColor="white"
                />
              </Grid.Column>
            </Grid>
          </Header>
          <Segment attached className="borderless">
            <Grid>
              <Grid.Row columns={3} className="row-manday-exist">
                <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                  <Field
                    name="projectCategory"
                    component={SelectInput}
                    placeholder="e.g.Implementation .."
                    labelName="Project Category"
                    disabled={disableComponent}
                    options={projectCategorySAOptions}
                  />
                </Grid.Column>

                <Grid.Column className=" ViewLabel FullGrid1200 " width={5}>
                  <Field
                    name="estDurationProject"
                    component={TextInput}
                    placeholder="e.g.99"
                    labelName="Est. Proj. Duration"
                    disabled={disableComponent}
                    textAlign="right"
                    labeled={
                      <Dropdown
                        className="dropdown-disabled"
                        options={durationTypeOptions}
                        disabled={disableComponent}
                        value={viewFunnelCustomer.estDurationType}
                      />
                    }
                    labelPosition="right"
                    toolTipPosition="bottom center"
                    toolTipContents="Project Duration Estimation base warranty to the customer (Not Vendor Warranty)"
                  />
                </Grid.Column>

                <Grid.Column className=" ViewLabel FullGrid1200 " width={5}>
                  <Field
                    name="manDays"
                    component={NumberInput}
                    placeholder="e.g.99"
                    labelName="Est. Mandays"
                    disabled={disableComponent}
                    // textAlign="left"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column className=" ViewLabel">
                  <Field
                    name="customerName"
                    component={SearchInput}
                    placeholder="e.g.PT. Customer .."
                    labelName="Customer Name"
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column className=" ViewLabel">
                  <Field
                    name="endUserCustomerName"
                    component={SearchInput}
                    placeholder="e.g.End Customer Name"
                    labelName="End Customer Name"
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
                <Grid.Column className=" ViewLabel FullGrid1200 ">
                  <Field
                    name="reqDedicatedResource"
                    component={SelectInput}
                    placeholder="e.g.Request .."
                    labelName="Request Dedicated Resource Name"
                    disabled={disableComponent}
                    options={reqDedicatedResourceOptions}
                  />
                </Grid.Column>

                <Grid.Column width={6} className="FullGrid1200">
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Field
                        name="chkPMODeptID"
                        component={CheckBoxInput}
                        label="Need PMO/S"
                        disabled={disableComponent}
                        // onChange={onChangePMO}
                        toolTipPosition="top right"
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
                                  <List.Item as="a">Komatsu</List.Item>

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
                    <Grid.Column>
                      <Field
                        name="chkSMODeptID"
                        component={CheckBoxInput}
                        label="Need SMO"
                        disabled={disableComponent}
                        // onChange={onChangeSMO}
                        toolTipPosition="top right"
                        toolTipContents="Check this flag if you have maintenance 
                                    (handle by SMO) in your project."
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={3}>
                {/* <Grid.Column className=" ViewLabel FullGrid1200">
                  <Field
                    name="actStartProjectDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Act. Start Project"
                    date={true}
                    disabled={disableComponent}
                    // onChange={onStartProjectDate}
                  />
                </Grid.Column>
                <Grid.Column className=" ViewLabel FullGrid1200 ">
                  <Field
                    name="actEndProjectDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Act.End Project"
                    date={true}
                    disabled={disableComponent}
                  />
                </Grid.Column> */}

                <Grid.Column className=" ViewLabel FullGrid1200" width={5}>
                  <Field
                    name="estStartProjectDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Est. Start Project"
                    date={true}
                    disabled={disableComponent}
                    // onChange={onStartProjectDate}
                  />
                </Grid.Column>
                <Grid.Column className=" ViewLabel FullGrid1200 " width={5}>
                  <Field
                    name="estEndProjectDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Est. End Project"
                    date={true}
                    disabled={disableComponent}
                  />
                </Grid.Column>

                <Grid.Column className=" ViewLabel FullGrid1200 ">
                  <Field
                    name="deliveryDate"
                    component={DateInput}
                    placeholder="e.g.09/09/2020"
                    labelName="Delivery Date"
                    date={true}
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={3}>
                <Grid.Column className=" ViewLabel FullGrid1200 " width={6}>
                  <Field
                    name="complexity"
                    component={SelectInput}
                    placeholder="e.g.Simple .."
                    labelName="Project Complexity"
                    options={complexityOptions}
                    disabled={disableComponent}
                    toolTipPosition="top right"
                    toolTipContents={
                      <div>
                        <Header as="h4">
                          Complex Project :
                          <Header.Subheader>
                            <br />
                            <List bulleted horizontal link>
                              <List.Item as="a"></List.Item>
                              <List.Item as="a">An activity of deliverables that required 3 FTE and more</List.Item>
                              <List.Item as="a">Most of the activity are required coordination with more than 3 parties involved</List.Item>
                              <List.Item as="a">Activity/ deliverables are more than 10 working days to complete and no repetitive task</List.Item>

                              <List.Item as="a">Most of the transaction above 50K US$ based on contract</List.Item>
                              <List.Item as="a">Required creation project timeline, reporting and monitoring system</List.Item>
                              <List.Item as="a">Develop full scale of planning</List.Item>

                              <List.Item as="a">Most of the planning required close monitoring, review and tracking issues</List.Item>
                              <List.Item as="a">Collaboration with end users, managers, senior management and stakeholders</List.Item>
                              <List.Item as="a">
                                Effectively communicate project expectations to team members and stakeholders in a timely and clear fashion
                              </List.Item>

                              <List.Item as="a">Liaise with project stakeholders on an ongoing basis</List.Item>
                              <List.Item as="a">
                                Determine and assess need for additional staff and/or consultants and make the appropriate recruitments if necessary
                                during project cycle
                              </List.Item>
                              <List.Item as="a">Identify and resolve issues and conflicts within the project team</List.Item>

                              <List.Item as="a">Identify and manage project dependencies and critical path</List.Item>
                              <List.Item as="a">
                                Proactively manage changes in project scope, identify potential crises, and devise contingency plans
                              </List.Item>
                              <List.Item as="a">
                                Coach, mentor, motivate and supervise project team members and contractors, and influence them to take positive action
                                and accountability for their assigned work
                              </List.Item>

                              <List.Item as="a">
                                Conduct project post mortems and create a recommendations report in order to identify successful and unsuccessful
                                project elements
                              </List.Item>
                              <List.Item as="a">Involved Intangible risk and many risk may happen in managing and executing the projects</List.Item>
                              <List.Item as="a">
                                Complex dan comprehensive supporting documents preparation for BAST submission and BAST document preparation itself
                              </List.Item>
                            </List>
                          </Header.Subheader>
                        </Header>

                        <Header as="h4">
                          Moderate Project :
                          <Header.Subheader>
                            <br />
                            <List bulleted horizontal link>
                              <List.Item as="a"></List.Item>
                              <List.Item as="a">An activity of deliverables that required less than 3 FTE</List.Item>
                              <List.Item as="a">Some of the activity are required coordination with 3rd party</List.Item>
                              <List.Item as="a">Activity/ deliverables are between 2-10 working days to complete and no repetitive task</List.Item>

                              <List.Item as="a">Some of the transaction Less than 50K US$ based on Contract</List.Item>
                              <List.Item as="a">May required creation project timeline, reporting and monitoring system but not compulsory</List.Item>
                              <List.Item as="a">Moderate Planning</List.Item>

                              <List.Item as="a">May required close monitoring, review and tracking issues</List.Item>
                              <List.Item as="a">Collaboration with end users, 3rd party </List.Item>
                              <List.Item as="a">
                                Less intensive communication to stake holder but may need intensive communication among team member
                              </List.Item>

                              <List.Item as="a">Most of the time liaise internal team member</List.Item>
                              <List.Item as="a">Most of the resources used internal team member but may need external resources</List.Item>
                              <List.Item as="a">One time setup and deliver base on agree schedule/ deployment plan</List.Item>

                              <List.Item as="a">Minimum/ limited issues, may have conflict amongts project team</List.Item>
                              <List.Item as="a">As per plan/schedule, may need to manage depedencies and critical path of the deliverables</List.Item>
                              <List.Item as="a">May have change request but with minimum occurance</List.Item>

                              <List.Item as="a">Limited team member and no required people management</List.Item>
                              <List.Item as="a">Once deliver the requirement may need review if required</List.Item>
                              <List.Item as="a">Some risk may happened in managing and executing the projects</List.Item>

                              <List.Item as="a">
                                Moderate supporting documents preparation for BAST submission and BAST document preparation itself
                              </List.Item>
                            </List>
                          </Header.Subheader>
                        </Header>

                        <Header as="h4">
                          Simple Project :
                          <Header.Subheader>
                            <br />
                            <List bulleted horizontal link>
                              <List.Item as="a"></List.Item>
                              <List.Item as="a">An activity of deliverables that required less than 2FTE</List.Item>
                              <List.Item as="a">Most of the activity are not required coordination with 3rd party</List.Item>
                              <List.Item as="a">Most of the activity are less than 2 days (In some cases consist of repetitive task)</List.Item>

                              <List.Item as="a">Most of the transaction less than 50K US$ based on Contract</List.Item>
                              <List.Item as="a">No need project time line and very light reporting or monitoring system</List.Item>
                              <List.Item as="a">Very light of planning</List.Item>

                              <List.Item as="a">Most of the planning created in one time and running in "auto pilot" mode</List.Item>
                              <List.Item as="a">Collaboration with end users</List.Item>
                              <List.Item as="a">Less intensive communication to stake holder and team member</List.Item>

                              <List.Item as="a">Most of the time liaise internal team member</List.Item>
                              <List.Item as="a">
                                Most of the resources used internal team member and very limited to have external resources
                              </List.Item>
                              <List.Item as="a">One time setup and deliver base on agree schedule/ deployment plan</List.Item>

                              <List.Item as="a">Minimum/ limited issues/ conflict amongts project team</List.Item>
                              <List.Item as="a">As per plan/schedule, no need managing depedencies and critical path of the deliverables</List.Item>
                              <List.Item as="a">No change request apply</List.Item>

                              <List.Item as="a">Limited team member and no required people management</List.Item>
                              <List.Item as="a">Once deliver the requirement no need review</List.Item>
                              <List.Item as="a">Minimum risk in managing and executing the projects</List.Item>

                              <List.Item as="a">
                                Simple supporting documents preparation for BAST submission and BAST document preparation itself
                              </List.Item>
                            </List>
                          </Header.Subheader>
                        </Header>
                        <Header as="h5" color="red">
                          Note: Project Workload associate with Project Category. The Simples category the low workload, eg: Delivery server and
                          Install
                        </Header>
                      </div>
                    }
                    values={viewFunnelCustomer.complexity === 0 ? '' : viewFunnelCustomer.complexity}
                  />
                </Grid.Column>

                <Grid.Column className=" ViewLabel FullGrid1200 " width={10}>
                  <Field
                    name="preSalesDeptArr"
                    component={DropdownInput}
                    placeholder="e.g. CI,NI .."
                    labelName="Presales"
                    disabled={disableComponent}
                    options={presalesSupportOptions}
                    toolTipPosition="bottom center"
                    toolTipContents={
                      <List bulleted>
                        <List.Item>SSS Solution Architect</List.Item>
                        <List.Item>SSS Integration (Nutanix Brand)</List.Item>
                        <List.Item>NI</List.Item>
                      </List>
                    }
                  />
                </Grid.Column>
              </Grid.Row>
              <div className="ui divider FullHdivider"></div>
            </Grid>

            {/* {viewFunnelCustomerPO.soidc && (
              <Grid className="mt-0 ViewLabel">
                <Grid.Row className="pt-0">
                  <Grid.Column className="FullGrid1200">
                    <Header size="tiny" className={classes.textGrey}>
                      SO IDC
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="pt-0">
                  <Grid.Column className="FullGrid1200">
                    {viewFunnelCustomerPO.soidc.split(',').map((color, k) => (
                      <Label key={k} className={`mb-1 ${classes.bgPuple} ${classes.labelRounded20}`}>
                        {color}
                      </Label>
                    ))}
                  </Grid.Column>
                </Grid.Row>
                <div className="ui divider FullHdivider"></div>
              </Grid>
            )} */}

            {viewFunnelCustomerPO.soParent && page !== 'pmo-view-edit' && (
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

            {/* {viewFunnelCustomerPO.oiNo && (
              <Grid className="mt-0 ViewLabel">
                <Grid.Row className="pt-0">
                  <Grid.Column className="FullGrid1200">
                    <Header size="tiny" className={classes.textGrey}>
                      OI No
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="pt-0">
                  <Grid.Column className="FullGrid1200">
                    <Label className={`mb-1 ${classes.bgPuple} ${classes.labelRounded20}`}>{viewFunnelCustomerPO.oiNo}</Label>
                  </Grid.Column>
                </Grid.Row>
                <div className="ui divider FullHdivider"></div>
              </Grid>
            )} */}

            <Grid className="ViewLabel" columns={2}>
              <Grid.Row columns="equal">
                <Grid.Column width={11} className=" FullGrid1200">
                  <Field name="salesName" component={TextInput} placeholder="e.g.Jhon Doe" labelName="Sales Name" disabled={disableComponent} />
                </Grid.Column>
                <Grid.Column width={5} className=" FullGrid1200">
                  <Field name="dept" component={TextInput} placeholder="e.g.Sales" labelName="Dept." disabled={disableComponent} />
                </Grid.Column>
              </Grid.Row>
              <div className="ui divider FullHdivider"></div>
              <Grid.Row className="pt-0" columns="equal">
                <Grid.Column className=" FullGrid1200">
                  <Field
                    name="salesAdminName"
                    component={TextInput}
                    placeholder="e.g.Jhon Doe"
                    labelName="Sales Admin Name"
                    disabled={disableComponent}
                  />
                </Grid.Column>
              </Grid.Row>
              <div className="ui divider FullHdivider"></div>

              <Grid.Row columns="equal">
                <Grid.Column className="FullGrid1200">
                  <Field name="sa" component={TextInput} placeholder="e.g.01234" labelName="SA No." disabled={disableComponent} />
                </Grid.Column>
                <Grid.Column className="FullGrid1200">
                  <Field name="so" component={TextInput} placeholder="e.g.01234" labelName="SO No." disabled={disableComponent} />
                </Grid.Column>
              </Grid.Row>

              {viewFunnelCustomerPO.soidc && (
                <Grid.Row className="mb-0 pb-0">
                  <Grid.Column className="FullGrid1200">
                    <Header size="tiny" className={classes.textGrey}>
                      SO IDC
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              )}
              {viewFunnelCustomerPO.soidc && (
                <Grid.Row className="mt-0">
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

              <Grid.Row columns="equal">
                <Grid.Column className="FullGrid1200">
                  <Field name="oiNo" component={TextInput} placeholder="e.g.01234" labelName="OI Number" disabled={disableComponent} />
                </Grid.Column>
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
              </Grid.Row>
              <div className="ui divider FullHdivider"></div>

              <Grid.Row columns="equal">
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
            </Grid>

            <Grid className="ViewLabel">
              <Grid.Row columns="equal">
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
            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};

export default PMOCustommerPO;

import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Grid, Form, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { SelectInput, TextInput, Button, Tooltips } from "views/components/UI";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import {
  selectViewFunnelConfirmation,
  selectFunnelDropDownCustomerConfirmation,
  selectFunnelDropDownUserConfirmation,
  selectViewFunnelCustomer,
  selectFunnel
} from "selectors/funnel/FunnelSelector";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import * as FunnelActions from "stores/funnel/FunnelActions";
import { FunnelViewEditConfirmation } from "stores/funnel/models/view-edit";
import moment from "moment";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";
import { combineValidators, isRequired } from "revalidate";

interface IProps {
  page: string;
  funnelGenID: string;
  projectId: string;
  flagOrderConfirm: any;
}

const FunnelEditOrderConfirm: React.FC<IProps> = ({
  page,
  funnelGenID,
  projectId,
  flagOrderConfirm,
}) => {
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const viewFunnelConfirmation = useSelector((state: IStore) =>
    selectViewFunnelConfirmation(state)
  );
  const viewFunnelDropdownCustomerConfirmation = useSelector((state: IStore) =>
    selectFunnelDropDownCustomerConfirmation(state)
  );
  const viewFunnelDropdownUserConfirmation = useSelector((state: IStore) =>
    selectFunnelDropDownUserConfirmation(state)
  );
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const funnel = useSelector((state: IStore) => selectFunnel(state));

  const result: any = useSelector(
    (state: IStore) => state.funnel.resultActions
  );

  const [disableComponent, setDisableComponent] = useState(true);
  const [customer, setCustomer] = useState("");
  const [customerRemark, setCustomerRemark] = useState("");
  const [building, setBuilding] = useState("");
  const [buildingRemark, setBuildingRemark] = useState("");
  const [supportSystem, setSupportSystem] = useState("");
  const [supportSystemRemark, setSupportSystemRemark] = useState("");

  const validate = combineValidators({
    customerReadinessRemark: isRequired("Remark Readiness"),
    thirdPartyRemark: isRequired("Remark Third Party"),
    supportSystemRemark: isRequired("Remark Support Systems"),
  });

  const ValidateCustomerReadiness = combineValidators({
    customerReadinessRemark: isRequired("Remark Readiness"),
  });

  const ValidateThirdParty = combineValidators({
    thirdPartyRemark: isRequired("Remark Third Party"),
  });

  const ValidateSupportSystem = combineValidators({
    supportSystemRemark: isRequired("Remark Support Systems"),
  });

  const NoValidate = combineValidators({});

  const [ValidasiCustomer, setValidasiCustomer] = useState(false);
  const [ValidasiBuilding, setValidasiBuilding] = useState(false);
  const [ValidasiSupportSystem, setValidasiSupportSystem] = useState(false);

  useEffect(() => {
    if (funnelGenID.length > 0) {
      dispatch(FunnelActions.requestViewFunnelConfimation(+funnelGenID));
      dispatch(FunnelActions.requestViewFunnelDropdownCustomerConfimation());
      dispatch(FunnelActions.requestViewFunnelDropdownUserConfimation());
    }
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    //Default Render Check mandatory For Remarks and Validasi
    setCustomer(viewFunnelConfirmation.customerReadinessStr);
    setBuilding(viewFunnelConfirmation.thirdpartyStr);
    setSupportSystem(viewFunnelConfirmation.supportSystemStr);

    setCustomerRemark(viewFunnelConfirmation.customerReadinessRemark);
    setBuildingRemark(viewFunnelConfirmation.thirdPartyRemark);
    setSupportSystemRemark(viewFunnelConfirmation.supportSystemRemark);

    setValidasiCustomer(viewFunnelConfirmation.customerReadinessStr !== "" ? false : true)
    setValidasiBuilding(viewFunnelConfirmation.thirdpartyStr !== "" ? false : true)
    setValidasiSupportSystem(viewFunnelConfirmation.supportSystemStr !== "" ? false : true)
  }, [
    viewFunnelConfirmation.customerReadinessStr,
    viewFunnelConfirmation.thirdpartyStr,
    viewFunnelConfirmation.supportSystemStr,
  ]);

  const onChangeCustomer = (event: any) => {
    const docTypes = viewFunnelDropdownCustomerConfirmation.filter(
      (item: any) => {
        return item.value === event;
      }
    );
    setCustomer(docTypes[0] && docTypes[0].text);
    setValidasiCustomer(
      docTypes[0] && docTypes[0].text === "Ready" ? false : true
    );
  };

  const onChangeSupportSystem = (event: any) => {
    const docTypes = viewFunnelDropdownUserConfirmation.filter((item: any) => {
      return item.value === event;
    });
    setSupportSystem(docTypes[0] && docTypes[0].text);
    setValidasiSupportSystem(
      docTypes[0] && docTypes[0].text === "Ready" ? false : true
    );
  };

  const onChangeBuilding = (event: any) => {
    const docTypes = viewFunnelDropdownUserConfirmation.filter((item: any) => {
      return item.value === event;
    });
    setBuilding(docTypes[0] && docTypes[0].text);
    setValidasiBuilding(
      docTypes[0] && docTypes[0].text === "Ready" ? false : true
    );
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelActions.REQUEST_GET_FUNNEL_CONFIRMATION,
      FunnelActions.REQUEST_FUNNEL_DROPDOWN_CUSTOMER_CONFIRMATION,
      FunnelActions.REQUEST_FUNNEL_DROPDOWN_USER_CONFIRMATION,
      FunnelActions.REQUEST_UPDATE_FUNNEL_CONFIRMATION,
    ])
  );

  const onEditHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
      if(viewFunnelConfirmation.customerReadinessStr == "")
        setCustomer("");
      if(viewFunnelConfirmation.thirdpartyStr == "")
        setBuilding("");
      if(viewFunnelConfirmation.supportSystemStr == "")
        setSupportSystem("");
      dispatch(FunnelActions.requestViewFunnelConfimation(+funnelGenID));
      console.log(customerRemark);
    }
  };

  const onSubmitHandler = (values: any) => {
    const newValues = new FunnelViewEditConfirmation({});
    const now = moment();
    newValues.funnelConfirmationID = 0;
    newValues.funnelGenID = +funnelGenID;
    newValues.customerReadiness = values.customerReadiness;
    newValues.customerReadinessRemark = values.customerReadinessRemark;
    newValues.thirdparty = values.thirdparty;
    newValues.thirdPartyRemark = values.thirdPartyRemark;
    newValues.supportSystem = values.supportSystem;
    newValues.supportSystemRemark = values.supportSystemRemark;
    newValues.createDate = moment(now).format("yyyy-MM-DD");
    newValues.createUserID = currentUser.employeeID;
    newValues.modifyDate = moment(now).format("yyyy-MM-DD");
    newValues.modifyUserID = currentUser.employeeID;
    dispatch(FunnelActions.putViewFunnelConfirmation(newValues));
    setDisableComponent(true);
  };

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  useEffect(() => {
    if (result?.errorNumber == "0") {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      dispatch(FunnelActions.requestViewFunnelConfimation(+funnelGenID));
      dispatch(FunnelActions.removeResult());
    } else if (result?.bSuccess === false) {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Warning));
      dispatch(FunnelActions.removeResult());
    }
  }, [result]);

  return (
    <FinalForm
      /*validate={
        ValidasiCustomer && ValidasiBuilding && ValidasiSupportSystem
          ? validate
          : ValidasiCustomer
          ? ValidateCustomerReadiness
          : ValidateCustomerReadiness
          ? ValidateThirdParty
          : ValidasiSupportSystem
          ? ValidateSupportSystem
          : NoValidate
      }*/
      
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={viewFunnelConfirmation}
      render={({ handleSubmit, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>Order Confirmation</Header.Content>
                  <Header.Content className="FloatRight">
                    {disableComponent && (
                      <>
                        <Tooltips
                          position="top right"
                          content="Edit Order Confirmation"
                          trigger={
                            <Button
                              onClick={(e: Event) => onHeaderSubmitHandler(e)}
                              disabled={
                                (funnel?.commercialWorkflowStatus === 'COMPLETED' && funnel?.serviceWorkflowStatus === 'COMPLETED') 
                                || currentUser.role !== "Presales"
                              }
                              circular
                              basic
                              type="button"
                              compact
                              icon="edit"
                              // onClick={(e: Event) => onHeaderSubmitHandler(e)}
                            />
                          }
                        />
                      </>
                    )}
                    {!disableComponent && (
                      <Fragment>
                        <Tooltips
                          position="top right"
                          content="Cancel Update"
                          trigger={
                            <Button
                              type="button"
                              basic
                              compact
                              icon="cancel"
                              circular
                              onClick={onCancel}
                            />
                          }
                        />
                        <Tooltips
                          position="top right"
                          content="Save Update"
                          trigger={
                            <Button
                              circular
                              basic
                              type="submit"
                              compact
                              icon="save"
                              disabled={
                                (viewFunnelCustomer.chkPMODeptID &&   
                                (customer === "" || building === "" || supportSystem === "") ||
                                ((customerRemark === "" || customerRemark === "undefined") && (customer === "Not Ready" || customer === "Need Customer Confirmation")) ||
                                ((buildingRemark === "" || buildingRemark === "undefined") && (building === "Not Ready" || building === "Need Customer Confirmation")) ||
                                ((supportSystemRemark === "" || supportSystemRemark === "undefined") && (supportSystem === "Not Ready" || supportSystem === "Need User Confirmation")) 
                                ) ? true : false
                              }
                            />
                          }
                        />
                      </Fragment>
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider mt-0"></div>
            <Grid.Row className="pt-0" columns="2">
              <Grid.Column>
                <Grid.Row className="mb-1r" columns="1">
                <Grid.Column className="ViewLabel pb-1">
                  <Field
                    name="customerReadiness"
                    component={SelectInput}
                    placeholder="e.g.Ready .."
                    labelName="Customer Readiness"
                    disabled={disableComponent}
                    options={viewFunnelDropdownCustomerConfirmation}
                    onChanged={onChangeCustomer}
                    mandatory={viewFunnelCustomer.chkPMODeptID === false ? true : false}
                  />
                </Grid.Column>
                <Grid.Column className="ViewLabel">
                  <Field
                    name="customerReadinessRemark"
                    component={TextInput}
                    placeholder="e.g.Remark"
                    labelName="Remark"
                    mandatory={
                      customer === "Not Ready" ||
                      customer === "Need Customer Confirmation"
                        ? false
                        : true
                    }
                    disabled={disableComponent}
                    onChange={(value) => {
                      setCustomerRemark(value);
                    }}
                  />
                </Grid.Column>
                </Grid.Row>
                
                <Grid.Row columns={1}>
                  <Grid.Column className="ViewLabel pb-1">
                    <Field
                      name="supportSystem"
                      component={SelectInput}
                      placeholder="e.g.Ready .."
                      labelName="Support System"
                      disabled={disableComponent}
                      options={viewFunnelDropdownUserConfirmation}
                      onChanged={onChangeSupportSystem}
                      mandatory={viewFunnelCustomer.chkPMODeptID === false ? true : false}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="supportSystemRemark"
                      component={TextInput}
                      placeholder="e.g.Remark"
                      labelName="Remark"
                      mandatory={
                        supportSystem === "Not Ready" ||
                        supportSystem === "Need User Confirmation"
                          ? false
                          : true
                      }
                      disabled={disableComponent}
                      onChange={(value) => {
                        setSupportSystemRemark(value);
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
              <Grid.Row columns={1}>
              <Grid.Column className="ViewLabel pb-1">
                <Field
                  name="thirdparty"
                  component={SelectInput}
                  placeholder="e.g.Ready .."
                  labelName="3rd Party - DC/Building"
                  disabled={disableComponent}
                  options={viewFunnelDropdownUserConfirmation}
                  onChanged={onChangeBuilding}
                  mandatory={viewFunnelCustomer.chkPMODeptID === false ? true : false}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="thirdPartyRemark"
                  component={TextInput}
                  placeholder="e.g.Remark"
                  labelName="Remark"
                  mandatory={
                    building === "Not Ready" ||
                    building === "Need User Confirmation"
                      ? false
                      : true
                  }
                  disabled={disableComponent}
                  onChange={(value) => {
                    setBuildingRemark(value);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
              </Grid.Column>
            </Grid.Row>               
            
            
            
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditOrderConfirm;

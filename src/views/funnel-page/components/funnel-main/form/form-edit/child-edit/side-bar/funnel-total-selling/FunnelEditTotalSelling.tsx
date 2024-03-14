import React, { useState, useEffect, Fragment } from "react";
import { Grid, Form, Icon, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  TextInput,
  Button,
  NumberInput,
  Tooltips,
  SelectInput,
} from "../../../../../../../../components/UI";
import classes from "./FunnelEditTotalSelling.module.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as FunnelSalesAnalystActions from "stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions";
import * as FunnelActions from "stores/funnel/FunnelActions";
import * as ModalFirstLevel from "stores/modal/first-level/ModalFirstLevelActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import IStore from "models/IStore";
import {
  selectViewFunnelSelling,
  costSelector,
} from "selectors/funnel/FunnelSelector";
import "./FunnelEditTotalSellingStyle.scss";
import {
  selectTotalSelling,
  selectTotalOrderProduct,
  selectTotalOrderService,
  selectTotalSellingProduct,
  selectTotalSellingService,
  selectTotalOrdering,
} from "selectors/funnel-product-service/ProductServiceSelector";

import { FunnelViewEditSelling } from "stores/funnel/models/view-edit";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import {
  selectRows,
  selectTotalCost,
} from "selectors/funnel-cost/FunnelCostSelector";
import AccordionTotalSelling from "./components/accordion/AccordionTotalSelling";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectFunnelCurrencyOptions } from "selectors/select-options";
import LocalDataField from "./hook/LocalDataField";
import moment from "moment";
import * as PresalesViewAction from "stores/presales-view/PresalesViewAction"
import { selectPresalesViewResult } from "selectors/presales-view/PresalesViewSelector";
interface IProps {
  funnelGenID: string;
  setCurrency: any;
}

const CostPPh = (amount: number) => {
  return (
    <h6
      className="text-black"
      style={{
        fontSize: "13px",
      }}
    >
      % Expenses - {((amount * 78) / 100).toLocaleString()} (78%) | % PPH -{" "}
      {((amount * 22) / 100).toLocaleString()} (22%)
    </h6>
  );
};

const FunnelEditTotalSelling: React.FC<IProps> = ({
  setCurrency,
  funnelGenID,
}) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const [currancy, setCurrancy] = useState("");
  const [resultRate, setSesultRate] = useState(0);
  const [resultRateOrdering, setSesultRateOrdering] = useState(0);

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
  const totalCost = useSelector((state: IStore) => selectTotalCost(state));
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const isSalesAnalis: boolean = useSelector(
    (state: IStore) => state.funnel.isFunnelStatusActive
  );
  const presalesView = useSelector((state: IStore) => selectPresalesViewResult(state));
  const presalesViewPrivilage = presalesView?.findIndex((p: any)=>p?.text1 === currentUser?.userName)

  const funnelCurrency = useSelector((state: IStore) =>
    selectFunnelCurrencyOptions(state)
  );
  const isIcEdit: boolean = useSelector(
    (state: IStore) => state.funnelSalesAnalyst.isIcEdit
  );
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelActions.REQUEST_VIEW_FUNNEL_SELLING,
      FunnelActions.REQUEST_GET_RATE,
      FunnelActions.REQUEST_FUNNEL,
      FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW,
    ])
  );
  const viewFunnelSelling = useSelector((state: IStore) =>
    selectViewFunnelSelling(state)
  );
  const funnelRate = useSelector((state: IStore) => state.funnel.rate);
  const isPresalesWorkflow: boolean = useSelector(
    (state: IStore) => state.funnelSalesAnalyst.isPresalesWorkflow
  );

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: any) => {
    const funnelEditTotalSelling = new FunnelViewEditSelling(values);
    funnelEditTotalSelling.modifyUserID = currentUser.employeeID;
    funnelEditTotalSelling.currency = currancy;
    funnelEditTotalSelling.rate = funnelRate?.rate;

    if (isSalesAnalis) {
      const getLocalEdit = JSON.parse(
        localStorage.getItem("editViewFunnelSellingEdit")
      );
      localStorage.setItem(
        "editViewFunnelSellingEdit",
        getLocalEdit
          ? JSON.stringify([funnelEditTotalSelling])
          : JSON.stringify([funnelEditTotalSelling])
      );
    } else {
      dispatch(FunnelActions.putViewFunnelSelling(funnelEditTotalSelling));
    }

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
  };

  const getRate = (currency: string) => {
    setCurrancy(currency);
    setCurrency(currency);
    dispatch(
      FunnelActions.requestRate(
        currency,
        moment(new Date()).format("yyyy-MM-DD")
      )
    );
  };
  useEffect(()=>{
    dispatch(PresalesViewAction.getPresalesView());
  }, [])
  useEffect(() => {
    if (funnelGenID.length > 0) {
      dispatch(FunnelActions.requestViewFunnelSellingById(+funnelGenID));
      dispatch(FunnelActions.requestCurrency());
    }
    localStorage.removeItem("editViewFunnelSellingEdit");
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    if (funnelGenID.length > 0) {
      getRate(viewFunnelSelling.currency ? viewFunnelSelling.currency : "IDR");
    }
  }, [dispatch, viewFunnelSelling]);

  const generateRate = (totalSellingPrice: number) => {
    if (currancy === "IDR") {
      setSesultRate(totalSellingPrice * viewFunnelSelling.rate);
    } else {
      setSesultRate(totalSellingPrice * viewFunnelSelling.rate);
    }
  };

  const generateRateOrdering = (totalOrderingPrice: number) => {
    if (currancy === "IDR") {
      setSesultRateOrdering(totalOrderingPrice * viewFunnelSelling.rate);
    } else {
      setSesultRateOrdering(totalOrderingPrice * viewFunnelSelling.rate);
    }
  };

  useEffect(() => {
    if (funnelGenID.length > 0) {
      generateRate(viewFunnelSelling.totalSellingPrice);
      generateRateOrdering(viewFunnelSelling.totalOrderingPrice);
    }
  }, [dispatch, viewFunnelSelling]);

  const onChangeTotalSelling = (event: any) => {
    viewFunnelSelling.totalSellingPrice = +event;
    generateRate(+event ? viewFunnelSelling.totalSellingPrice : 0);

    //viewFunnelSelling.gpmAmount =  Number(viewFunnelSelling.gpmPctg) / 100 * ( totalSellingPrice > 0 ?  totalSellingPrice : viewFunnelSelling.totalSellingPrice);
  };

  const onChangeTotalOrdering = (event: any) => {
    viewFunnelSelling.totalOrderingPrice = +event;
    generateRateOrdering(+event ? viewFunnelSelling.totalOrderingPrice : 0);

    //viewFunnelSelling.gpmAmount =  Number(viewFunnelSelling.gpmPctg) / 100 * ( totalSellingPrice > 0 ?  totalSellingPrice : viewFunnelSelling.totalSellingPrice);
  };

  const onChangeGPMPctg = (event: any) => {
    viewFunnelSelling.gpmPctg = +event;
    // console.log(event);
    //viewFunnelSelling.gpmAmount =  Number(viewFunnelSelling.gpmPctg) / 100 * ( totalSellingPrice > 0 ?  totalSellingPrice : viewFunnelSelling.totalSellingPrice);
  };

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(FunnelActions.requestViewFunnelSellingById(+funnelGenID));
      setDisableComponent(true);
    }
  };

  const Cost: any = useSelector((state: IStore) => costSelector(state));

  const [viewFunnelSellingLocal] = LocalDataField();

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={
        JSON.parse(localStorage.getItem("editViewFunnelSellingEdit"))
          ? viewFunnelSellingLocal
          : viewFunnelSelling
      }
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid columns="equal">
            <Grid.Row className="RoundedTopHeader pb-05" color="blue">
              {currancy === "USD" && (
                <Grid.Column width={8}>
                  <span className="CurrencyIDR">
                    IDR {viewFunnelSelling?.rate?.toLocaleString()}
                    <Icon
                      name="warning"
                      className="ic-rounded-14 bg-warning ml-px-6"
                    />
                  </span>
                </Grid.Column>
              )}
              <Grid.Column>
                {(currentUser.role === "Sales" ||
                  currentUser.role === "Sales Admin") &&
                  disableComponent && (
                    <>
                      {JSON.parse(
                        localStorage.getItem("editViewFunnelSellingEdit")
                      ) && (
                        <Tooltips
                          position="top right"
                          content="New Update"
                          trigger={
                            <Icon
                              name="warning"
                              className="ic-rounded-18 bg-warning float-r ml-px-6"
                            />
                          }
                        />
                      )}
                      {isIcEdit && (
                        <Tooltips
                          position="top right"
                          content="Edit Total Selling Details"
                          trigger={
                            <Button
                              circular
                              basic
                              type="button"
                              compact
                              icon="edit"
                              className="ml-px-6"
                              onClick={(e: Event) => onHeaderSubmitHandler(e)}
                              inverted
                            />
                          }
                        />
                      )}

                      <Tooltips
                        position="top right"
                        content="History Total Selling Details"
                        trigger={
                          <Button
                            type="button"
                            basic
                            compact
                            icon="history"
                            circular
                            inverted
                            onClick={(e: Event) =>
                              dispatch(
                                ModalFirstLevel.OPEN(
                                  <AccordionTotalSelling
                                    funnelGenID={+funnelGenID}
                                  />,
                                  ModalSizeEnum.Small
                                )
                              )
                            }
                          />
                        }
                      />
                    </>
                  )}
                {(currentUser.role === "Sales" ||
                  currentUser.role === "Sales Admin") &&
                  !disableComponent && (
                    <Fragment>
                      <Tooltips
                        position="top right"
                        content="Save Update"
                        trigger={
                          <Button basic compact icon="save" circular inverted />
                        }
                      />
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
                            inverted
                            onClick={onCancel}
                          />
                        }
                      />
                    </Fragment>
                  )}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row
              className="CardTwoTotalSelling"
              color="blue"
              textAlign={disableComponent ? "center" : "left"}
              columns={disableComponent ? 1 : 2}
            >
              <Grid.Column width={disableComponent ? 16 : 10}>
                {(currentUser.role === "Sales" ||
                  currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                  isPresalesWorkflow) && (
                  <Field
                    name="totalSellingPrice"
                    component={NumberInput}
                    placeholder="Total Selling"
                    disabled={disableComponent}
                    labelColor="white"
                    thousandSeparator={true}
                    TextAlign="center"
                    labelName="Total Selling"
                    onChange={onChangeTotalSelling}
                    readonly={totalSellingPrice > 0}
                    //values={viewFunnelSelling.totalSellingPrice}
                  />
                )}

                {currentUser.role !== "Sales" &&
                  currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                  !isPresalesWorkflow && (
                    <Field
                      name="totalSellingPriceNotSales"
                      component={NumberInput}
                      placeholder="Total Selling"
                      disabled={disableComponent}
                      labelColor="white"
                      thousandSeparator={true}
                      TextAlign="center"
                      labelName="Total Selling"
                      onChange={onChangeTotalSelling}
                      readonly={true}
                      values={"-"}
                    />
                  )}
              </Grid.Column>
              {!disableComponent && (
                <Grid.Column width={6}>
                  {(currentUser.role === "Sales" ||
                    currentUser.role === "Sales Admin") && (
                    <Field
                      name="currency"
                      component={SelectInput}
                      labelName="Currency "
                      options={funnelCurrency}
                      className="selectInputWidt05"
                      defaultValue="IDR"
                      values={currancy}
                      onChanged={(e) => {
                        getRate(e);
                        // calCulateRate(e);
                      }}
                    />
                  )}
                </Grid.Column>
              )}
            </Grid.Row>
            {/* currency rate========= */}
            {currancy === "USD" && (
              <Grid.Row
                color="blue"
                textAlign="center"
                columns={1}
                className="pt-0"
              >
                <Grid.Column textAlign="center" className="pt-0">
                  <span className="CurrencyExchange pt-0">
                    {currentUser.role !== "Sales" &&
                    currentUser.role !== "Sales Admin" &&
                    !isPresalesWorkflow
                      ? ""
                      : `Rp.${resultRate.toLocaleString()}`}
                  </span>
                </Grid.Column>
              </Grid.Row>
            )}
            {/* Total Ordering */}
            <Grid.Row
              color="blue"
              className="CardTwoTotalSelling TotalOrdering"
              style={{ "background-color": "#53589B" }}
              textAlign={disableComponent ? "center" : "left"}
              columns={disableComponent ? 1 : 2}
            >
              <Grid.Column width={disableComponent ? 16 : 10}>
                {(currentUser.role === "Sales" ||
                  currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                  isPresalesWorkflow) && (
                  <Field
                    name="totalOrderingPrice"
                    component={NumberInput}
                    placeholder="Total Ordering"
                    disabled={disableComponent}
                    labelColor="white"
                    thousandSeparator={true}
                    TextAlign="center"
                    labelName="Total Ordering"
                    onChange={onChangeTotalOrdering}
                    readonly={totalOrderingPrice > 0}
                    //values={viewFunnelSelling.totalSellingPrice}
                  />
                )}

                {currentUser.role !== "Sales" &&
                  currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                  !isPresalesWorkflow && (
                    <Field
                      name="totalOrderingPriceNotSales"
                      component={NumberInput}
                      placeholder="Total Ordering"
                      disabled={disableComponent}
                      labelColor="white"
                      thousandSeparator={true}
                      TextAlign="center"
                      labelName="Total Ordering"
                      onChange={onChangeTotalOrdering}
                      readonly={true}
                      values={"-"}
                    />
                  )}
              </Grid.Column>
              {!disableComponent && (
                <Grid.Column width={6}>
                  {(currentUser.role === "Sales" ||
                    currentUser.role === "Sales Admin") && (
                    <Field
                      name="currency"
                      component={SelectInput}
                      labelName="Currency "
                      options={funnelCurrency}
                      className="selectInputWidt05"
                      defaultValue="IDR"
                      values={currancy}
                      onChanged={(e) => {
                        getRate(e);
                        // calCulateRate(e);
                      }}
                    />
                  )}
                </Grid.Column>
              )}
            </Grid.Row>
            {currancy === "USD" && (
              <Grid.Row
                style={{ "background-color": "#53589B" }}
                textAlign="center"
                columns={1}
                className="pt-0"
              >
                <Grid.Column textAlign="center" className="pt-0">
                  <span className="CurrencyExchange pt-0">
                    {currentUser.role !== "Sales" &&
                    currentUser.role !== "Sales Admin" &&
                    !isPresalesWorkflow
                      ? ""
                      : `Rp.${resultRateOrdering.toLocaleString()}`}
                  </span>
                </Grid.Column>
              </Grid.Row>
            )}

            <Grid.Row textAlign="center" className={classes.Row + "" + " odd "}>
              <Grid.Column className="ContentInputStyle">
                <Grid padded textAlign="center">
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      isPresalesWorkflow) && (
                      <Field
                        name="totalInvoice"
                        component={NumberInput}
                        placeholder="Total Invoice"
                        labelName="Total Invoice"
                        thousandSeparator={true}
                        TextAlign="center"
                        readonly={true}
                        // values={`0`}
                      />
                    )}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      !isPresalesWorkflow && (
                        <Field
                          name="totalInvoiceNotSales"
                          component={NumberInput}
                          placeholder="Total Invoice"
                          labelName="Total Invoice"
                          thousandSeparator={true}
                          TextAlign="center"
                          readonly={true}
                          values={`-`}
                        />
                      )}
                  </Grid.Column>
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      isPresalesWorkflow) && (
                      <Field
                        name="totalCollection"
                        component={NumberInput}
                        placeholder="Total Collection"
                        thousandSeparator={true}
                        TextAlign="center"
                        labelName="Total Collection"
                        readonly={true}
                        // values={`0`}
                      />
                    )}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      !isPresalesWorkflow && (
                        <Field
                          name="totalCollectionNotSales"
                          component={NumberInput}
                          placeholder="Total Collection"
                          thousandSeparator={true}
                          TextAlign="center"
                          labelName="Total Collection"
                          readonly={true}
                          values={`-`}
                        />
                      )}
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row textAlign="center">
              <Grid.Column className="ContentInputStyle">
                <p>Total Product Value</p>
                <Grid padded textAlign="center">
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      isPresalesWorkflow) && (
                      <Field
                        name="totalSellingPriceProduct"
                        component={NumberInput}
                        placeholder="Selling"
                        labelName="Selling"
                        thousandSeparator={true}
                        TextAlign="center"
                        readonly={true}
                      />
                    )}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      !isPresalesWorkflow && (
                        <Field
                          name="totalSellingPriceProductNotSales"
                          component={NumberInput}
                          placeholder="Selling"
                          labelName="Selling"
                          thousandSeparator={true}
                          TextAlign="center"
                          readonly={true}
                          values={"-"}
                        />
                      )}
                  </Grid.Column>
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      isPresalesWorkflow) && (
                      <Field
                        name="totalOrderingPriceProduct"
                        component={NumberInput}
                        placeholder="Ordering"
                        labelName="Ordering"
                        thousandSeparator={true}
                        TextAlign="center"
                        readonly={true}
                      />
                    )}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      !isPresalesWorkflow && (
                        <Field
                          name="totalOrderingPriceProductNotSales"
                          component={NumberInput}
                          placeholder="Ordering"
                          labelName="Ordering"
                          thousandSeparator={true}
                          TextAlign="center"
                          readonly={true}
                          values={"-"}
                        />
                      )}
                  </Grid.Column>
                </Grid>

                <Grid padded textAlign="center">
                  <Grid.Column
                    className=" ph-3px ViewLabel FullGrid1200"
                    width={8}
                  >
                    <Header
                      className="gpm-sa-act"
                      as="h5"
                      content="GPM SA Product"
                      subheader={
                        currentUser.role !== "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : JSON.parse(
                              localStorage.getItem("editViewFunnelSellingEdit")
                            )
                          ? viewFunnelSellingLocal.gpmsaProduct
                            ? viewFunnelSellingLocal.gpmsaProduct?.toLocaleString() +
                              " (" +
                              viewFunnelSellingLocal.gpmsaProductPctg?.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              ) +
                              "%)"
                            : 0 + " (0%)"
                          : viewFunnelSelling.gpmsaProduct
                          ? viewFunnelSelling.gpmsaProduct?.toLocaleString() +
                            " (" +
                            viewFunnelSelling.gpmsaProductPctg?.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            ) +
                            "%)"
                          : 0 + " (0)%"
                      }
                    />
                  </Grid.Column>
                  <Grid.Column
                    className=" ph-3px ViewLabel FullGrid1200 "
                    width={8}
                  >
                    <Header
                      className="gpm-sa-act"
                      as="h5"
                      content="GPM Act. Product"
                      subheader={
                        currentUser.role !== "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : viewFunnelSelling.gpmActProduct
                          ? viewFunnelSelling.gpmActProduct?.toLocaleString() +
                            " (" +
                            viewFunnelSelling.gpmActProductPctg?.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            ) +
                            "%)"
                          : 0 + " (0%)"
                      }
                    />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row textAlign="center" className={classes.Row + "" + " odd "}>
              <Grid.Column className="ContentInputStyle">
                <p>Total Cost Product</p>
                <Grid padded textAlign="center">
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    <Field
                      name="totalCostProduct"
                      component={NumberInput}
                      placeholder="Cost Product"
                      thousandSeparator={true}
                      TextAlign="center"
                      labelName="Cost Product"
                      readonly={true}
                      values={`${
                        currentUser.role != "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : JSON.parse(
                              localStorage.getItem("editViewFunnelSellingEdit")
                            )
                          ? viewFunnelSellingLocal.totalCostProduct
                          : Cost.totalCostProduct
                      }`}
                    />
                  </Grid.Column>
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    <Field
                      name="totalExpendProduct"
                      component={NumberInput}
                      placeholder="Expense Product"
                      thousandSeparator={true}
                      TextAlign="center"
                      labelName="Expense Product"
                      readonly={true}
                      values={`${
                        currentUser.role !== "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : JSON.parse(
                              localStorage.getItem("editViewFunnelSellingEdit")
                            )
                          ? viewFunnelSellingLocal.totalExpendProduct
                          : Cost.totalExpendProduct
                      }`}
                    />

                    {currentUser.role !== "Sales" &&
                    currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                    !isPresalesWorkflow
                      ? ""
                      : JSON.parse(
                          localStorage.getItem("editViewFunnelSellingEdit")
                        )
                      ? viewFunnelSellingLocal.totalExpendProduct
                        ? CostPPh(
                            viewFunnelSellingLocal.totalExpendProduct || 0
                          )
                        : ""
                      : Cost.totalExpendProduct
                      ? CostPPh(Cost.totalExpendProduct || 0)
                      : ""}
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column className="ContentInputStyle">
                <p>Total Service Value</p>
                <Grid padded textAlign="center">
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      isPresalesWorkflow) && (
                      <Field
                        name="totalSellingPriceService"
                        component={NumberInput}
                        placeholder="Selling"
                        thousandSeparator={true}
                        TextAlign="center"
                        labelName="Selling"
                        readonly={true}
                      />
                    )}{" "}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      !isPresalesWorkflow && (
                        <Field
                          name="totalSellingPriceServiceNotSales"
                          component={NumberInput}
                          placeholder="Selling"
                          thousandSeparator={true}
                          TextAlign="center"
                          labelName="Selling"
                          readonly={true}
                          values={"-"}
                        />
                      )}
                  </Grid.Column>
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      currentUser.role === "Presales" ||
                      isPresalesWorkflow) && (
                      <Field
                        name="totalOrderingPriceService"
                        component={NumberInput}
                        placeholder="Ordering"
                        thousandSeparator={true}
                        TextAlign="center"
                        labelName="Ordering"
                        readonly={true}
                      />
                    )}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      currentUser.role !== "Presales" &&
                      !isPresalesWorkflow && (
                        <Field
                          name="totalOrderingPriceServiceNotSales"
                          component={NumberInput}
                          placeholder="Ordering"
                          thousandSeparator={true}
                          TextAlign="center"
                          labelName="Ordering"
                          readonly={true}
                          values={"-"}
                        />
                      )}
                  </Grid.Column>
                </Grid>
                <Grid padded textAlign="center">
                  <Grid.Column
                    className=" ph-3px ViewLabel FullGrid1200"
                    width={8}
                  >
                    <Header
                      className="gpm-sa-act"
                      as="h5"
                      content="GPM SA Service"
                      subheader={
                        currentUser.role !== "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : JSON.parse(
                              localStorage.getItem("editViewFunnelSellingEdit")
                            )
                          ? viewFunnelSellingLocal.gpmsaService
                            ? viewFunnelSellingLocal.totalSellingPriceService ===
                                0 &&
                              viewFunnelSellingLocal.totalOrderingPriceService >
                                0
                              ? viewFunnelSellingLocal.gpmsaService?.toLocaleString() +
                                " (100%)" //jika service selling 0 maka 100%
                              : viewFunnelSellingLocal.gpmsaService?.toLocaleString() +
                                " (" +
                                viewFunnelSellingLocal.gpmsaServicePctg?.toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                ) +
                                "%)"
                            : 0 + " (0)%"
                          : viewFunnelSelling.gpmsaService
                          ? viewFunnelSelling.totalSellingPriceService === 0 &&
                            viewFunnelSelling.totalOrderingPriceService > 0
                            ? viewFunnelSelling.gpmsaService?.toLocaleString() +
                              " (100%)" //jika service selling 0 maka 100%
                            : viewFunnelSelling.gpmsaService?.toLocaleString() +
                              " (" +
                              viewFunnelSelling.gpmsaServicePctg?.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              ) +
                              "%)"
                          : 0 + " (0)%"
                      }
                    />
                  </Grid.Column>
                  <Grid.Column
                    className=" ph-3px ViewLabel FullGrid1200 "
                    width={8}
                  >
                    <Header
                      className="gpm-sa-act"
                      as="h5"
                      content="GPM Act. Service"
                      subheader={
                        currentUser.role !== "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : viewFunnelSelling.gpmActService
                          ? viewFunnelSelling.gpmActService?.toLocaleString() +
                            " (" +
                            viewFunnelSelling.gpmActServicePctg?.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            ) +
                            "%)"
                          : 0 + " (0)%"
                      }
                    />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center" className={classes.Row + "" + " odd "}>
              <Grid.Column className="ContentInputStyle">
                <p>Total Cost Service</p>
                <Grid padded textAlign="center">
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    <Field
                      name="Cost Service"
                      component={NumberInput}
                      placeholder="Cost Service"
                      thousandSeparator={true}
                      TextAlign="center"
                      labelName="Cost Service"
                      readonly={true}
                      values={`${
                        currentUser.role != "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : JSON.parse(
                              localStorage.getItem("editViewFunnelSellingEdit")
                            )
                          ? viewFunnelSellingLocal.totalCostService
                          : Cost.totalCostService
                      }`}
                    />
                  </Grid.Column>
                  <Grid.Column className=" ViewLabel ReadOnly" width={16}>
                    <Field
                      name="totalExpendService"
                      component={NumberInput}
                      placeholder="Expense Service"
                      thousandSeparator={true}
                      TextAlign="center"
                      labelName="Expense Service"
                      readonly={true}
                      values={`${
                        currentUser.role != "Sales" &&
                        currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                        !isPresalesWorkflow
                          ? "-"
                          : JSON.parse(
                              localStorage.getItem("editViewFunnelSellingEdit")
                            )
                          ? viewFunnelSellingLocal.totalExpendService
                          : Cost.totalExpendService
                      }`}
                    />
                    {currentUser.role != "Sales" &&
                    currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                    !isPresalesWorkflow
                      ? "-"
                      : JSON.parse(
                          localStorage.getItem("editViewFunnelSellingEdit")
                        )
                      ? viewFunnelSellingLocal.totalExpendService
                        ? CostPPh(
                            viewFunnelSellingLocal.totalExpendService || 0
                          )
                        : ""
                      : Cost.totalExpendService
                      ? CostPPh(Cost.totalExpendService || 0)
                      : ""}
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column className="ContentInputStyle">
                <p>GPM</p>
                <Grid padded textAlign="center">
                  <Grid.Column className=" ViewLabel FullGrid1200" width={5}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      isPresalesWorkflow) && (
                      <Field
                        name="gpmPctg"
                        component={NumberInput}
                        placeholder="e.q.28.."
                        labelName="Percent(%)"
                        disabled={disableComponent}
                        TextAlign="center"
                        onChange={onChangeGPMPctg}
                        values={
                          JSON.parse(
                            localStorage.getItem("editViewFunnelSellingEdit")
                          )
                            ? viewFunnelSellingLocal.gpmPctg
                            : viewFunnelSelling.gpmPctg
                          // ? viewFunnelSellingLocal.gpmPctg.toFixed(2)
                          // : viewFunnelSelling.gpmPctg.toFixed(2)
                        }
                      />
                    )}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      !isPresalesWorkflow && (
                        <Field
                          name="gpmPctgNotSales"
                          component={NumberInput}
                          placeholder="e.q.28.."
                          labelName="Percent(%)"
                          disabled={disableComponent}
                          TextAlign="center"
                          values={"-"}
                        />
                      )}
                  </Grid.Column>
                  <Grid.Column className=" ViewLabel FullGrid1200 " width={11}>
                    {(currentUser.role === "Sales" ||
                      currentUser.role === "Sales Admin" || presalesViewPrivilage > -1 ||
                      isPresalesWorkflow) && (
                      <Field
                        name="gpmAmount"
                        component={NumberInput}
                        placeholder="e.q.100.000.0.."
                        disabled={disableComponent}
                        thousandSeparator={true}
                        labelName="Amount(IDR)"
                        TextAlign="center"
                        values={
                          JSON.parse(
                            localStorage.getItem("editViewFunnelSellingEdit")
                          )
                            ? viewFunnelSellingLocal.gpmAmount
                            : viewFunnelSelling.gpmAmount
                        }
                        //values={totalSellingPrice > 0 ? (totalSellingPrice -  (totalOrderingPrice + totalCost) ) : viewFunnelSelling.gpmAmount}
                      />
                    )}
                    {currentUser.role !== "Sales" &&
                      currentUser.role !== "Sales Admin" && presalesViewPrivilage <= -1 &&
                      !isPresalesWorkflow && (
                        <Field
                          name="gpmAmountNotSales"
                          component={NumberInput}
                          placeholder="e.q.100.000.0.."
                          disabled={disableComponent}
                          thousandSeparator={true}
                          labelName="Amount(IDR)"
                          TextAlign="center"
                          values={"-"}
                        />
                      )}
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditTotalSelling;

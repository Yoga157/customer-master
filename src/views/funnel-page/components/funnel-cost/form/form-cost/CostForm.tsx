import React, { useEffect, Fragment, useState } from "react";
import {
  SelectInput,
  TextInput,
  Button,
  NumberInput,
  Tooltips,
} from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Form,
  Grid,
  Card,
  Divider,
  DropdownProps,
  Header,
  Label,
} from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as SubBrandActions from "stores/brand-sub/SubBrandAction";
import {
  selectBrandOptions,
  selectSubBrandOptions,
} from "selectors/select-options";
import * as BrandActions from "stores/brand/BrandAction";
import * as ProductServiceActions from "stores/funnel-product-service/ProductServiceActions";
import * as FunnelActions from "stores/funnel/FunnelActions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator,
} from "revalidate";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as ServiceCost from "stores/funnel-cost/COSTAction";
import { selectCostTypeOptions } from "selectors/select-options/FunnelCostSelector";
import {
  selectViewFunnelStatus,
  selectViewFunnelCustomerPO,
} from "selectors/funnel/FunnelSelector";
import {
  selectCostNameOptions,
  selectRows,
  selectTotalCost,
} from "selectors/funnel-cost/FunnelCostSelector";
import CostNameModel from "stores/funnel-cost/models/CostNameModel";
import CostTypeModel from "stores/funnel-cost/models/CostTypeModel";
import CostRequestModel from "stores/funnel-cost/models/COSTRequestModel";
import TableRowModel from "stores/funnel-cost/models/TableRowModel";
import { format, endOfDay } from "date-fns";
import modalFirstLevelReducer from "stores/modal/first-level/ModalFirstLevelReducer";
import axios from "axios";
import environment from "environment";
import * as FunnelAction from "stores/funnel/FunnelActions";
import IProductServiceTable from "selectors/funnel-product-service/models/IProductServiceTable";
import { selectProductService } from "selectors/funnel-product-service/ProductServiceSelector";
import IOptionsData from "selectors/select-options/models/IOptionsData";
import {
  selectTotalSelling,
  selectTotalOrdering,
} from "selectors/funnel-product-service/ProductServiceSelector";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import COFForm from "./COFForm";
import { selectTotalFinancing } from "selectors/funnel-cost/FunnelCostSelector";
import * as COSTAction from "stores/funnel-cost/COSTAction";
import * as FunnelCostService from "stores/funnel-cost/COSTAction";
import IFunnelTopTable from "selectors/funnel-top/models/IFunnelTopTable";
import { selectFunnelTops } from "selectors/funnel-top/FunnelTopSelector";
import * as FunnelTopActions from "stores/funnel-top/FunnelTopActions";

interface IProps {
  funnelGenID: any;
  funnelItemsID: string;
  type: string;
  funnelStatusID: number;
}

const ProductForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { funnelStatusID } = props;
  const dispatch: Dispatch = useDispatch();
  const [costType, setCost] = useState<{ text: string; value: number }[]>([]);
  const [price, setPrice] = useState("");
  const [selectedCost, setSelect] = useState("");
  const [selectedType, setType] = useState("");
  const [costName, setCostName] = useState("");
  const [hide, setHide] = useState(false);
  const [vCostName, setVCostName] = useState("");
  const [remark, setRemark] = useState("");
  const [costTypeId, setCostId] = useState(0);
  const [vAmount, setVAmount] = useState(0);
  const [expense, setExpense] = useState({
    product: 0,
    service: 0,
  });
  const [total, setTotal] = useState(0);
  const bRefreshPage: boolean = useSelector(
    (state: IStore) => state.costTable.refreshPage
  );
  const totalSellingPrice = useSelector((state: IStore) =>
    selectTotalSelling(state)
  );
  const totalOrderingPrice = useSelector((state: IStore) =>
    selectTotalOrdering(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const viewFunnelStatus = useSelector((state: IStore) =>
    selectViewFunnelStatus(state)
  );
  const funnelTopStorage = JSON.parse(localStorage.getItem("funnelTop"));
  const viewFunnelPO = useSelector((state: IStore) =>
    selectViewFunnelCustomerPO(state)
  );
  const viewFunnelPOStorage = JSON.parse(
    localStorage.getItem("editViewFunnelCustomerPOEdit")
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE,
      ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_LOCAL,
      BrandActions.REQUEST_BRAND,
    ])
  );
  const rowData: any = useSelector((state: IStore) => selectRows(state));
  const CostNameOptions: any = useSelector((state: IStore) =>
    selectCostNameOptions(state)
  );
  const isSalesAnalis: boolean = useSelector(
    (state: IStore) => state.funnel.isFunnelStatusActive
  );
  const funnelProductService = useSelector(
    (state: IStore) => state.funnelProductService.listData
  );
  const CostTypeOptions: IOptionsData[] = useSelector((state: IStore) =>
    selectCostTypeOptions(state)
  );
  let CostNameOptionFilter: IOptionsData[];
  if (funnelProductService?.totalRows) {
    const itemTypeProduct = funnelProductService.rows.find(
      (e) => e.itemType === 18
    );
    if (funnelProductService?.totalItemProduct || itemTypeProduct) {
      CostNameOptionFilter = CostNameOptions;
    } else {
      CostNameOptionFilter = CostNameOptions.filter(
        (i) => i.text !== "Freight (Local)" && i.text !== "Freight (Import)"
      );
    }
  } else {
    CostNameOptionFilter = CostNameOptions.filter(
      (i) => i.text !== "Freight (Local)" && i.text !== "Freight (Import)"
    );
  }
  const viewPMT = useSelector((state: IStore) => selectTotalFinancing(state));

  useEffect(() => {
    checkExpense();
    dispatch(ServiceCost.requestCostType());
    dispatch(COSTAction.requestPersenCOF("persenCOF"));
    //Hendz 18/02/2022 ini untuk clear localStorage ketika perhitungan PMT
    localStorage.removeItem("totalFinancing");
    setVCostName("");

    //dispatch(FunnelTopActions.requestFunnelTopAll(+props.funnelGenID));
  }, []);

  const funnelTop: IFunnelTopTable = useSelector((state: IStore) =>
    selectFunnelTops(state)
  );

  const onChangeCost = (event: any) => {
    setCostId(event);

    const value = CostTypeOptions.filter((item: any) => {
      return item.value === event;
    });

    if (
      value[0].text == "Expense Product" ||
      value[0].text == "Expense Service"
    ) {
      setHide(true);
    } else {
      setHide(false);
      dispatch(
        ServiceCost.requestCostNameById(
          event,
          currentUser.employeeID,
          funnelStatusID ? funnelStatusID : viewFunnelStatus.funnelStatusID
        )
      );
    }
  };

  if (bRefreshPage) {
    dispatch(
      ServiceCost.requestCostNameById(
        costTypeId,
        currentUser.employeeID,
        funnelStatusID ? funnelStatusID : viewFunnelStatus.funnelStatusID
      )
    );
  }

  const onAddCostName = (e: any, data: any) => {
    if (data.value.length > 0) {
      const newCostName = new CostNameModel({});
      newCostName.id = 0;
      newCostName.name = data.value === undefined ? "" : data.value?.toString();
      newCostName.costTypeID = costTypeId;
      newCostName.createUserID = currentUser.employeeID;
      dispatch(ServiceCost.postCostName(newCostName)).then(() => {
        dispatch(FunnelAction.requestViewFunnelSellingById(props.funnelGenID));
      });
    }
  };

  const onCalculator = (values: any) => {
    dispatch(ModalSecondLevelActions.OPEN(<COFForm />, ModalSizeEnum.Small));
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onChangeCostName = (event: any) => {
    const tops = CostNameOptions.filter((item: any) => {
      return item.value === event;
    });
    if (tops.length > 0) {
      setVCostName(tops[0].text);
    }
  };
  const onChangeRemark = (value: any)=>{
    setRemark(value)
  }
  const onChangePrice = (event: any) => {
    setVAmount(event || 0);
  };

  const onSubmitHandler = async (e: any) => {
    /// define page & costName & costType
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;
    const userId: any = localStorage.getItem("userLogin");
    const data = new TableRowModel({});
    const date = format(new Date(), "yyyy-MM-dd");
    data.cost = e.Amount;
    data.createDate = date;
    data.modifyDate = date;
    data.funnelCostType = e.costType;
    data.funnelGenID = parseInt(e.FunnelGenID);
    data.modifyUserID = JSON.parse(userId).employeeID;
    data.createUserID = JSON.parse(userId).employeeID;
    data.funnelCostID = 0;
    data.costID = e.costName;
    if(vCostName === "Others Cost" && remark?.length > 0){
      data.costRemark = remark;
    }
    const costTypeName = document.querySelector(
      "body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(2) > div > div > div.ui.search.selection.dropdown > div.text"
    )!.textContent;

    const costName = document.querySelector(
      "body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(3) > div > div > div.ui.search.selection.dropdown.WarningBg > div.text"
    )?.textContent;

    if (page === "Add New Funnel" || page === "Add New Funnel - Copy Project") {
      const gpmSelector = document.querySelector(
        "#root > div.ui.container > div > div:nth-child(2) > form > div > div:nth-child(5) > div > div > div > div > div:nth-child(3) > div > input[type=text]"
      )! as HTMLInputElement;
      data.costName = costName ?? costTypeName;
      data.funnelCostTypeName = costTypeName;
      saveCostLocal(data);
    } else {
      if (isSalesAnalis) {
        data.isAdd = 1;
        data.isDelete = 0;
        const funnelCostLocal = JSON.parse(localStorage.getItem("funnelCost"));
        data.costName = costName ?? costTypeName;
        data.funnelCostTypeName = costTypeName;
        if (rowData?.length > 0) {
          if (funnelCostLocal) {
            saveCostLocal(data);
          } else {
            data.funnelCostID =
              // eslint-disable-next-line prefer-spread
              Math.max.apply(
                Math,
                rowData.map((item) => item.funnelCostID)
              ) + 1;
            localStorage.setItem(
              "funnelCost",
              JSON.stringify([...rowData, data])
            );
            dispatch(ModalAction.CLOSE());
            dispatch(ServiceCost.getFunnelByIdLocal());
            localStorage.setItem("postFunnelCost", JSON.stringify(""));
          }
        } else {
          saveCostLocal(data);
        }
      } else {
        dispatch(ServiceCost.postFunnelCost(data)).then(() => {
          dispatch(ModalAction.CLOSE());
          dispatch(ServiceCost.getFunnelById(props.funnelGenID));
          dispatch(
            FunnelAction.requestViewFunnelSellingById(props.funnelGenID)
          );
        });
      }
    }
  };

  const saveCostLocal = (data) => {
    dispatch(ServiceCost.postFunnelCostLocal(data)).then(() => {
      dispatch(ModalAction.CLOSE());
      dispatch(ServiceCost.getFunnelByIdLocal());
      localStorage.setItem("postFunnelCost", JSON.stringify(""));
    });
  };

  const validate = combineValidators({
    costType: isRequired("Item Name/Brand"),
    Amount: isRequired("Amount"),
  });

  ///check if ExpenseSelected on local/server
  const checkExpense = async (): Promise<any> => {
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;

    if (page === "Add New Funnel") {
      const localFunnelCost = JSON.parse(localStorage.getItem("funnelCost")!);
      if (localFunnelCost != null) {
        const Product = localFunnelCost.some(
          (item: TableRowModel) => item.funnelCostTypeName === "Expense Product"
        );
        const Service = localFunnelCost.some(
          (item: TableRowModel) => item.funnelCostTypeName === "Expense Service"
        );

        if (Service || Product) {
          setExpense({
            service: Service ? 1 : 0,
            product: Product ? 1 : 0,
          });
        }
      }
    } else {
      const controllerName =
        `FunnelCost/CheckExistingExpend?funnelGenID=` + props.funnelGenID;
      axios
        .get(environment.api.funnel.replace(":controller", controllerName))
        .then((res) => {
          setExpense({
            product: res.data.existingExpendProduct,
            service: res.data.existingExpendService,
          });
        });
    }
  };

  let FinalFilter;

  const filteredCostType: any = CostTypeOptions.filter((el) =>
    expense.product === 1 ? el.text !== "Expense Product" : el
  );
  //const FinalFilter = filteredCostType.filter((el: any) => (expense.service === 1 ? el.text !== 'Expense Product' : el));

  //Hendz 08-04-2022 cost type menyesuaikan dengan product / service
  const prods = funnelProductService.rows.find((e) => e.itemType === 18);
  const servs = funnelProductService.rows.find((e) => e.itemType === 19);

  if (prods != undefined && servs === undefined) {
    FinalFilter = CostTypeOptions.filter(
      (el) => el.text !== "Expense Service" && el.text !== "Cost Service"
    );
    FinalFilter = FinalFilter.filter((el: any) =>
      expense.service === 1 ? el.text !== "Expense Product" : el
    );
  }
  if (servs != undefined && prods === undefined) {
    FinalFilter = CostTypeOptions.filter(
      (el) => el.text !== "Expense Product" && el.text !== "Cost Product"
    );
  }
  if (servs != undefined && prods != undefined) {
    FinalFilter = CostTypeOptions;
  }

  return (
    <Fragment>
      <Card.Header>{props.type} Cost</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: any) => onSubmitHandler(values)}
          render={({ handleSubmit, pristine, invalid }) => (
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row style={{ display: "none" }}>
                  <Grid.Column>
                    <Field
                      type="hidden"
                      name="FunnelGenID"
                      labelName="FunnelGenID"
                      component={TextInput}
                      defaultValue={props.funnelGenID}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="costType"
                      labelName="Cost Type"
                      component={SelectInput}
                      placeholder="Expense Product"
                      onChanged={onChangeCost}
                      options={FinalFilter}
                    />
                  </Grid.Column>
                </Grid.Row>
                {hide ? null : (
                  <Grid.Row>
                    <Grid.Column width={14}>
                      <Field
                        name="costName"
                        labelName="Cost Name"
                        component={SelectInput}
                        placeholder="Cost Name"
                        allowAdditions={true}
                        options={CostNameOptionFilter}
                        onChanged={onChangeCostName}
                        onAddItems={onAddCostName}
                      />
                    </Grid.Column>
                    {vCostName === "Others Cost" && 
                      <Grid.Column width={14}>
                        <Field
                          name="Remark"
                          labelName="Remark"
                          component={TextInput}
                          placeholder={"Remark"}
                          onChange={onChangeRemark}
                          mandatory={false}
                        />
                      </Grid.Column>
                    }
                    {vCostName === "Interest (if rental)" &&
                      (funnelTopStorage != null || funnelTop.rows.length > 0) &&
                      ((viewFunnelPO.contractEndDate != undefined &&
                        viewFunnelPO.contractStartDate != undefined) ||
                        (viewFunnelPOStorage != null &&
                          viewFunnelPOStorage[0].contractEndDate != undefined &&
                          viewFunnelPOStorage[0].contractStartDate)) && (
                        <Grid.Column width={2}>
                          <Tooltips
                            content="COF Calculator"
                            trigger={
                              <Button
                                className="mt-1n7r"
                                onClick={onCalculator}
                                type="button"
                                circular
                                color="blue"
                                size="large"
                                icon="calculator"
                              />
                            }
                            position="left center"
                          />
                        </Grid.Column>
                      )}
                  </Grid.Row>
                )}
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="Amount"
                      component={NumberInput}
                      placeholder="Rp. 99.000.00.."
                      thousandSeparator={true}
                      labelName="Amount"
                      mandatory={false}
                      onChange={onChangePrice}
                      values={
                        vCostName === "Interest (if rental)"
                          ? viewPMT.totalFinancing
                          : 0
                      }
                      disabled={vCostName === "Interest (if rental)"}
                    />
                  </Grid.Column>

                  {hide && (
                    <Grid.Column className="FullGrid767" verticalAlign="middle">
                      <Label as="a" tag className="mt-1">
                        <p>
                          Expenses 78% (
                          {((vAmount * 78) / 100).toLocaleString()})
                        </p>
                        <p>
                          PPH 22% ({((vAmount * 22) / 100).toLocaleString()})
                        </p>
                      </Label>
                    </Grid.Column>
                  )}
                </Grid.Row>
              </Grid>{" "}
              <br />
              <Button
                className="MarBot20"
                floated="right"
                type="submit"
                color="blue"
                disabled={
                  pristine ||
                  invalid ||
                  (vCostName === "Interest (if rental)" &&
                    viewPMT.totalFinancing === 0) || (remark?.length < 1 && vCostName === "Others Cost")
                }
              >
                Save
              </Button>
              <Button floated="right" type="button" onClick={cancelClick}>
                Cancel
              </Button>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ProductForm;

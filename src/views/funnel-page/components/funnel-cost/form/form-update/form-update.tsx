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
  selectCostNameOptions,
  selectRows,
} from "selectors/funnel-cost/FunnelCostSelector";
import CostNameModel from "stores/funnel-cost/models/CostNameModel";
import CostRequestModel from "stores/funnel-cost/models/COSTRequestModel";
import { selectViewFunnelStatus } from "selectors/funnel/FunnelSelector";
import TableRowModel from "stores/funnel-cost/models/TableRowModel";
import RowData from "stores/funnel-cost/models/TableRowModel";
import { format, endOfDay } from "date-fns";
import modalFirstLevelReducer from "stores/modal/first-level/ModalFirstLevelReducer";
import axios from "axios";
import environment from "environment";
import * as FunnelAction from "stores/funnel/FunnelActions";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import moment from "moment";
import { selectTotalFinancing } from "selectors/funnel-cost/FunnelCostSelector";
import * as COSTAction from "stores/funnel-cost/COSTAction";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import COFForm from "../form-cost/COFForm";
import IFunnelTopTable from "selectors/funnel-top/models/IFunnelTopTable";
import { selectFunnelTops } from "selectors/funnel-top/FunnelTopSelector";

interface IProps {
  rowData: any;
  funnelStatusID: number;
}

const EditForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelStatusID } = props;
  const dispatch: Dispatch = useDispatch();
  const [costType, setCost] = useState<{ text: string; value: number }[]>([]);
  const [price, setPrice] = useState("");
  const [selectedCost, setSelect] = useState("");
  const [vAmount, setVAmount] = useState(0);
  const [selectedType, setType] = useState("");
  const [costName, setCostName] = useState([]);
  const [remark, setRemark] = useState("");
  const [vCostName, setVCostName] = useState("");
  const [hide, setHide] = useState(false);
  const [costTypeId, setCostId] = useState(props.rowData.funnelCostType);
  const [expense, setExpense] = useState<{ product: number; service: number }>({
    product: 0,
    service: 0,
  });
  const bRefreshPage: boolean = useSelector(
    (state: IStore) => state.costTable.refreshPage
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ServiceCost.REQUEST_COSTNAME])
  );
  const CostTypeOptions: any = useSelector((state: IStore) =>
    selectCostTypeOptions(state)
  );
  const CostNameOptions: any = useSelector((state: IStore) =>
    selectCostNameOptions(state)
  );
  const rowDataList: any = useSelector((state: IStore) => selectRows(state));
  const viewFunnelStatus = useSelector((state: IStore) =>
    selectViewFunnelStatus(state)
  );
  const isSalesAnalis: boolean = useSelector(
    (state: IStore) => state.funnel.isFunnelStatusActive
  );
  const funnelTopStorage = JSON.parse(localStorage.getItem("funnelTop"));
  const funnelTop: IFunnelTopTable = useSelector((state: IStore) =>
    selectFunnelTops(state)
  );
  useEffect(()=>{
    if(props?.rowData !== undefined){
      setRemark(props?.rowData?.costRemark);
    }
  }, [props?.rowData])
  useEffect(() => {
    onChangePrice(props.rowData.cost);
  }, [props.rowData]);
  useEffect(() => {
    checkExpense();
    dispatch(ServiceCost.requestCostType());
    dispatch(COSTAction.requestPersenCOF("persenCOF"));

    //Hendz 18/02/2022 ini untuk clear localStorage ketika perhitungan PMT
    localStorage.removeItem("totalFinancing");

    setVCostName(props.rowData.costName);

    const costName = document.querySelector(
      "body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(3) > div > div > div.ui.search.selection.dropdown.WarningBg > div.text"
    )!;
    const costTypeColor = document.querySelector<HTMLElement>(
      "body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(2) > div > div > div.ui.search.selection.dropdown > div.text"
    )!;
    const costTypeName = document.querySelector(
      "body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(2) > div > div > div.ui.search.selection.dropdown > div.text"
    )!;
    costName.textContent = props.rowData.costName;
    costTypeColor.style.color = "#55637A";
    costTypeName.textContent = props.rowData.funnelCostTypeName;

    if (
      props.rowData.funnelCostTypeName === "Expense Product" ||
      props.rowData.funnelCostTypeName === "Expense Service"
    ) {
      setHide(true);
    }
  }, [dispatch, props.rowData.costName, props.rowData.funnelCostTypeName]);

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
      dispatch(ServiceCost.postCostName(newCostName));
    }
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

  const onChangePrice = (event: any) => {
    setVAmount(event || 0);
  };

  const viewPMT = useSelector((state: IStore) => selectTotalFinancing(state));

  const onCalculator = (values: any) => {
    dispatch(ModalSecondLevelActions.OPEN(<COFForm />, ModalSizeEnum.Small));
  };

  const onSubmitHandler = async (e: any) => {
    /// define page
    const userId: any = localStorage.getItem("userLogin");
    const funnelCostLocal: any = localStorage.getItem("funnelCost");
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;
    const costName = document.querySelector(
      "body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(3) > div > div > div.ui.search.selection.dropdown.WarningBg > div.text"
    )?.textContent;
    const costTypeName = document.querySelector(
      "body > div.ui.page.modals.dimmer.transition.visible.active > div > div > div:nth-child(3) > form > div > div:nth-child(2) > div > div > div.ui.search.selection.dropdown > div.text"
    )!.textContent;

    const newItem = new TableRowModel(props.rowData);
    newItem.cost = e.Amount;
    newItem.funnelGenID = parseInt(e.FunnelGenID);
    newItem.modifyUserID = JSON.parse(userId).employeeID;
    newItem.createUserID = props.rowData.createUserID;
    newItem.funnelCostID = props.rowData.funnelCostID;
    newItem.costID = e.costName;
    newItem.funnelCostTypeName = costTypeName;
    newItem.costName = costName ?? costTypeName;
    newItem.funnelCostType = e.costType ? e.costType : costTypeId;
    newItem.createDate = moment(props.rowData.createDate).format(
      "YYYY-MM-DDTHH:mm:ss.SSS"
    );
    newItem.modifyDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSS");
    if(remark?.length > 0 && (vCostName === "Others Cost" || props.rowData.costID === "Others Cost")){
      newItem.costRemark = remark;
    }
    if (page === "Add New Funnel" || page === "Add New Funnel - Copy Project") {
      editCostLocal(newItem, props.rowData.funnelCostID);
    } else {
      if (isSalesAnalis) {
        newItem.isDelete = 0;
        props.rowData.isAdd ? (newItem.isAdd = 1) : (newItem.isUpdate = 1);
        if (rowDataList?.length > 0) {
          if (funnelCostLocal) {
            editCostLocal(newItem, props.rowData.funnelCostID);
          } else {
            const filterList = rowDataList.filter(
              (e) => e.funnelCostID !== +props.rowData.funnelCostID
            );
            localStorage.setItem("funnelCost", JSON.stringify(filterList));
            editCostLocal(newItem, props.rowData.funnelCostID);
          }
        } else {
          editCostLocal(newItem, props.rowData.funnelCostID);
        }
      } else {
        const data = new CostRequestModel({});
        data.cost = e.Amount;
        data.funnelCostType = e.costType ? e.costType : costTypeId;
        data.funnelGenID = parseInt(e.FunnelGenID);
        data.modifyUserID = JSON.parse(userId).employeeID;
        data.createUserID = JSON.parse(userId).employeeID;
        data.funnelCostID = props.rowData.funnelCostID;
        data.costID = e.costName;
        if(remark?.length > 0 && (vCostName === "Others Cost" || props.rowData.costID === "Others Cost")){
          data.costRemark = remark;
        }
        dispatch(ServiceCost.putFunnelCost(data)).then(() => {
          dispatch(ModalAction.CLOSE());
          dispatch(ServiceCost.getFunnelById(props.rowData.funnelGenID));
          dispatch(
            FunnelAction.requestViewFunnelSellingById(props.rowData.funnelGenID)
          );
        });
      }
    }
  };
  const onChangeRemark = (value: any)=>{
    setRemark(value)
  }
  const editCostLocal = (data, id) => {
    dispatch(ServiceCost.putFunnelCostLocal(data, id)).then(() => {
      dispatch(ModalAction.CLOSE());
      dispatch(ServiceCost.getFunnelByIdLocal());
      localStorage.setItem("putFunnelCost", JSON.stringify(""));
    });
  };

  const validate = combineValidators({
    //costType: isRequired('Cost Type'),
    Amount: isRequired("Amount"),
    costName: isRequired("costName"),
  });

  const checkExpense = async (): Promise<any> => {
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;

    if (page === "Add New Funnel" || page === "Add New Funnel - Copy Project") {
      const localFunnelCost = JSON.parse(localStorage.getItem("funnelCost")!);
      if (localFunnelCost != null) {
        const Product = localFunnelCost.some(
          (item: TableRowModel) => item.funnelCostTypeName === "Expense Product"
        );
        const Service = localFunnelCost.some(
          (item: TableRowModel) => item.funnelCostTypeName === "Expense Service"
        );

        if (Service || Product) {
          setExpense({ service: Service ? 1 : 0, product: Product ? 1 : 0 });
        }
      }
    } else {
      const controllerName =
        `FunnelCost/CheckExistingExpend?funnelGenID=` +
        props.rowData.funnelGenID;
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

  const filteredCostType: any = CostTypeOptions.filter((el) =>
    expense.product === 1 ? el.text !== "Expense Product" : el
  );
  const FinalFilter = filteredCostType.filter((el: any) =>
    expense.service === 1 ? el.text !== "Expense Product" : el
  );

  return (
    <Fragment>
      <Card.Header>Edit Cost</Card.Header>
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
                      defaultValue={props.rowData.funnelGenID}
                      value={props.rowData.funnelGenID}
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
                      options={FinalFilter}
                      defaultValue={props.rowData.costType}
                      onChanged={onChangeCost}
                      value={props.rowData.costType}
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
                        options={CostNameOptions}
                        onChanged={onChangeCostName}
                        onAddItems={onAddCostName}
                        defaultValue={props.rowData.costID}
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
                          defaultValue={remark}
                          mandatory={false}
                        />
                      </Grid.Column>
                    }
                    {vCostName === "Interest (if rental)" &&
                      (funnelTopStorage != null ||
                        funnelTop.rows.length > 0) && (
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
                  <Grid.Column>
                    <Field
                      name="Amount"
                      component={NumberInput}
                      placeholder="Rp. 99.000.00.."
                      thousandSeparator={true}
                      labelName="Amount"
                      mandatory={false}
                      onChange={onChangePrice}
                      defaultValue={props.rowData.cost}
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

export default EditForm;

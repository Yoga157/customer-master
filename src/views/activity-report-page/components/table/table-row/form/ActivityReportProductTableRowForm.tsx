import environment from "environment";
import React, { useEffect, useState } from "react";
import { Button, Table, Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { format } from "date-fns";
import axios from "axios";
import moment from "moment";

import IStore from "models/IStore";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import * as ActivityReportProductActions from "stores/activity-report-product/ActivityReportProductActions";
import ActivityReportProductUpdateModel from "stores/activity-report-product/models/ActivityReportProductUpdateModel";
import ActivityReportProductListLocalModel from "stores/activity-report-product/models/ActivityReportProductLocalModel";
import ActivityReportProductModel from "stores/activity-report-product/models/ActivityReportProductModel";

interface IFormType {
  activityReportGenID: number;
  activityReportProductGenID: number;
  productName: string;
  productNumber: string;
  licenseNumber: string;
  quantity: number;
  serialNumber: string;
  salesUnit: string;
  createUserID: number;
}

interface IProps {
  type: string;
  rowData: any;
  enableRow: any;
  indexItem: number;
  activityReportGenID: number;
}

const ActivityReportProductTableRowForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { rowData, type } = props;
  const dispatch: Dispatch = useDispatch();
  const detailProductARInLocalStorage: string = "detailProductAR";
  const detailProductsLocal = localStorage.getItem(
    detailProductARInLocalStorage
  );

  const [form, setForm] = useState<IFormType>({
    activityReportGenID: 0,
    activityReportProductGenID: 0,
    productName: "",
    productNumber: "",
    serialNumber: "",
    licenseNumber: "",
    quantity: 0,
    salesUnit: "",
    createUserID: 0,
  });

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const activityReportProductState: any = useSelector(
    (state: IStore) => state.activityReportProduct.rowTable
  );

  useEffect(() => {
    if (type == "EDIT") {
      if (props.activityReportGenID === 0) {
        getActionReportProductByID(rowData.activityReportProductGenID);
      } else {
        getActionReportProductByID(rowData.activityReportProductGenID);
      }
    }
    if (props.activityReportGenID === 0) {
      dispatch(ActivityReportProductActions.getActivityReportProductLocal());
    }
  }, []);

  const getActionReportProductByID = (activityReportProductGenID: number) => {
    if (props.activityReportGenID === 0) {
      /**
       * Untuk get item dari halaman Add New Activity Report
       */
      setForm({
        ...form,
        activityReportProductGenID: props.rowData.activityReportProductGenID,
        activityReportGenID: props.rowData.activityReportGenID,
        productName: props.rowData.productName,
        productNumber: props.rowData.productNumber,
        serialNumber: props.rowData.serialNumber,
        salesUnit: props.rowData.salesUnit,
        licenseNumber: props.rowData.licenseNumber,
        quantity: props.rowData.quantity,
      });
    } else {
      /**
       * Untuk get item dari halaman Edit Activity Report
       */
      const controllerName = `ActivityReportItem/GetById?activityReportItemGenID=${activityReportProductGenID}`;
      const endpoint: string = environment.api.generic.replace(
        ":controller",
        controllerName
      );

      axios
        .get(endpoint, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userLogin")
            ).token + ""}`,
          }, // default, so we can ignore
        })
        .then((res) => {
          setForm({
            ...form,
            activityReportProductGenID: res.data.activityReportProductGenID,
            activityReportGenID: res.data.activityReportGenID,
            productName: res.data.productName,
            productNumber: res.data.productNumber,
            licenseNumber: res.data.licenseNumber,
            quantity: res.data.quantity,
            serialNumber: res.data.serialNumber,
            salesUnit: res.data.salesUnit,
          });
        });
    }
  };

  const reset = () => {
    setForm({
      ...form,
      productName: "",
      productNumber: "",
      serialNumber: "",
      licenseNumber: "",
      quantity: 0,
      salesUnit: "",
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (props.activityReportGenID === 0) {
      const date = format(new Date(), "yyyy-MM-dd");
      if (props.type === "EDIT") {
        /**
         * Untuk edit item dari halaman Add New Activity Report
         */
        const editItem = new ActivityReportProductUpdateModel({});
        editItem.activityReportGenID = Number(props.activityReportGenID);
        editItem.activityReportProductGenID = Number(
          props.rowData.activityReportProductGenID
        );
        editItem.productName = form.productName;
        editItem.productNumber = form.productNumber;
        editItem.serialNumber = form.serialNumber;
        editItem.salesUnit = form.salesUnit;
        editItem.licenseNumber = form.licenseNumber;
        editItem.quantity = form.serialNumber ? 1 : form.quantity;
        editItem.modifyDate = date;
        editItem.modifyUserID = currentUser.employeeID;
        editItem.createDate = date;
        editItem.createUserID = currentUser.employeeID;
        console.log('editItem',editItem)
        const newItemsLocal = new ActivityReportProductListLocalModel({
          ...editItem,
        });
        newItemsLocal.isDelete = 0;
        if (props.rowData.isAdd) {
          newItemsLocal.isUpdate = 0;
          newItemsLocal.isAdd = 1;
        } else {
          newItemsLocal.isUpdate = 1;
          newItemsLocal.isAdd = 0;
        }

        if (detailProductsLocal) {
          const localData = JSON.parse(detailProductsLocal);
          const newARProductList = localData.rows.filter(
            (e) =>
              +e.activityReportProductGenID !==
              +props.rowData.activityReportProductGenID
          );
          localStorage.setItem(
            detailProductARInLocalStorage,
            JSON.stringify({ rows: [...newARProductList, newItemsLocal] })
          );
        } else {
          if (activityReportProductState?.rows?.length > 0) {
            const newARProductList = activityReportProductState.rows.filter(
              (e) =>
                e.activityReportProductGenID !==
                props.rowData.activityReportProductGenID
            );
            localStorage.setItem(
              detailProductARInLocalStorage,
              JSON.stringify({ rows: [...newARProductList, newItemsLocal] })
            );
          }
        }
        props.enableRow(editItem);
        dispatch(ActivityReportProductActions.getActivityReportProductLocal());
      } else {
        /**
         * Untuk add item dari halaman Add New Activity Report
         */
        const newItem = new ActivityReportProductModel({});
        newItem.activityReportGenID = Number(props.activityReportGenID);
        newItem.productName = form.productName;
        newItem.productNumber = form.productNumber;
        newItem.serialNumber = form.serialNumber;
        newItem.salesUnit = form.salesUnit;
        newItem.licenseNumber = form.licenseNumber;
        newItem.quantity = form.serialNumber ? 1 : form.quantity;

        const newItemLocal = new ActivityReportProductListLocalModel({
          ...newItem,
        });
        newItemLocal.activityReportGenID = Number(props.activityReportGenID);
        newItemLocal.productName = form.productName;
        newItemLocal.productNumber = form.productNumber;
        newItemLocal.serialNumber = form.serialNumber;
        newItemLocal.salesUnit = form.salesUnit;
        newItemLocal.licenseNumber = form.licenseNumber;
        newItemLocal.quantity = form.serialNumber ? 1 : form.quantity;
        newItemLocal.createDate = date;
        newItemLocal.createUserID = currentUser.employeeID;
        newItemLocal.isUpdate = 0;
        newItemLocal.isDelete = 0;
        newItemLocal.isAdd = 1;
        if (detailProductsLocal) {
          const objDetailProductsLocal = JSON.parse(detailProductsLocal);
          newItemLocal.activityReportProductGenID =
            Math.max.apply(
              Math,
              objDetailProductsLocal?.rows?.map(
                (item) => +item.activityReportProductGenID
              )
            ) + 1;
          localStorage.setItem(
            detailProductARInLocalStorage,
            JSON.stringify({
              rows: [...objDetailProductsLocal.rows, newItemLocal],
            })
          );
        } else {
          if (activityReportProductState?.rows?.length > 0) {
            newItemLocal.activityReportProductGenID =
              Math.max.apply(
                Math,
                activityReportProductState?.rows?.map(
                  (item) => +item.activityReportProductGenID
                )
              ) + 1;
            localStorage.setItem(
              detailProductARInLocalStorage,
              JSON.stringify({
                rows: [...activityReportProductState.rows, newItemLocal],
              })
            );
          } else {
            newItemLocal.activityReportProductGenID = 1;
            localStorage.setItem(
              detailProductARInLocalStorage,
              JSON.stringify({ rows: [newItemLocal] })
            );
          }
        }

        reset();
        dispatch(ActivityReportProductActions.getActivityReportProductLocal());
      }
    } else {
      if (props.type === "EDIT") {
        /**
         * Untuk edit item dari halaman Edit Activity Report
         */
        const editItem = new ActivityReportProductModel({});
        editItem.activityReportProductGenID = Number(
          props.rowData.activityReportProductGenID
        );
        editItem.activityReportGenID = Number(props.activityReportGenID);
        editItem.productName = form.productName;
        editItem.productNumber = form.productNumber;
        editItem.serialNumber = form.serialNumber;
        editItem.salesUnit = form.salesUnit;
        editItem.licenseNumber = form.licenseNumber;
        editItem.quantity = form.serialNumber ? 1 : form.quantity;
        editItem.createUserID = currentUser.employeeID;
        editItem.createDate = moment(Date.now()).format();
        editItem.modifyUserID = currentUser.employeeID;
        editItem.modifyDate = moment(Date.now()).format();

        dispatch(
          ActivityReportProductActions.putActivityProduct(editItem)
        ).then(() => {
          props.enableRow(editItem);
          dispatch(
            ActivityReportProductActions.requestViewProductByActivityReportGenID(
              +editItem.activityReportGenID
            )
          );
        });
      } else {
        /**
         * Untuk add item dari halaman Edit Activity Report
         */
        const newItem = new ActivityReportProductModel({});
        newItem.activityReportProductGenID = 0;
        newItem.activityReportGenID = Number(props.activityReportGenID);
        newItem.productName = form.productName;
        newItem.productNumber = form.productNumber;
        newItem.serialNumber = form.serialNumber;
        newItem.salesUnit = form.salesUnit;
        newItem.licenseNumber = form.licenseNumber;
        newItem.quantity = form.serialNumber ? 1 : form.quantity;
        newItem.createUserID = currentUser.employeeID;
        newItem.createDate = moment(Date.now()).format();
        newItem.modifyUserID = currentUser.employeeID;
        newItem.modifyDate = moment(Date.now()).format();

        dispatch(
          ActivityReportProductActions.postActivityProduct(newItem)
        ).then(() => {
          dispatch(
            ActivityReportProductActions.requestViewProductByActivityReportGenID(
              +newItem.activityReportGenID
            )
          );
          reset();
        });
      }
    }
  };
  
  return (
    <Table.Row>
      <Table.Cell textAlign="center">
        <Input
          value={form.productName}
          placeholder="e.g. product name.."
          fluid
          onChange={(e, data) => setForm({ ...form, productName: data.value })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Input
          value={form.productNumber}
          placeholder="e.g. product number.."
          fluid
          onChange={(e, data) =>
            setForm({ ...form, productNumber: data.value })
          }
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Input
          value={form.serialNumber}
          placeholder="e.g. serial number.."
          fluid
          onChange={(e, data) => setForm({ ...form, serialNumber: data.value })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Input
          value={form.salesUnit}
          placeholder="e.g. sales unit.."
          fluid
          onChange={(e, data) => setForm({ ...form, salesUnit: data.value })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Input
          value={form.licenseNumber}
          placeholder="e.g. license number.."
          fluid
          onChange={(e, data) =>
            setForm({ ...form, licenseNumber: data.value })
          }
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Input
          disabled={form.serialNumber ? true : false}
          value={form.serialNumber ? 1 : form.quantity}
          placeholder="e.g. quantity.."
          fluid
          onChange={(e, data) =>
            setForm({ ...form, quantity: form.serialNumber ? 1 : Number(data.value) })
          }
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        {type === "EDIT" ? (
          <Button.Group size="tiny">
            <Button
              color="yellow"
              type="button"
              content="Cancel"
              onClick={() => props.enableRow({})}
              className="mr-1"
            />
            <Button
              color="blue"
              type="button"
              content="Save"
              // disabled={isExist}
              onClick={(e) => onSubmitHandler(e)}
            />
          </Button.Group>
        ) : (
          <Button
            content="Save"
            color="blue"
            disabled={
              form.productName.length === 0 &&
              form.productNumber.length === 0 &&
              form.serialNumber.length === 0 &&
              form.salesUnit.length === 0 &&
              form.licenseNumber.length === 0 &&
              form.quantity === 0
            }
            onClick={(e) => onSubmitHandler(e)}
          />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default ActivityReportProductTableRowForm;
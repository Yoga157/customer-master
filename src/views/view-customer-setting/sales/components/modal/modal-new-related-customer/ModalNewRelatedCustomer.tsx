import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Label, Icon, Divider, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button, SearchInput } from "views/components/UI";

import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import {
  selectAllAccount,
  selectCustomerSetting,
  selectCustomerSettingOptions,
  selectSearchCustomerByName,
} from "selectors/customer-setting/CustomerSettingSelector";
import RelatedCustomerPostModel from "stores/related-customer/models/RelatedCustomerPostModel";
import * as RelatedCustomer from "stores/related-customer/RelatedCustomerActivityActions";

import IStore from "models/IStore";

interface IProps {
  customerID: number;
}

interface customerData {
  customerName: string;
  customerID: number;
  blacklist: boolean;
  holdshipment: boolean;
  avgAR: number;
  customerAddress: string;
}

const ModalNewRelatedCondition: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [customerName, setCustomerName] = useState();
  const [customerData, setCustomerData] = useState<customerData | undefined>(
    undefined
  );

  const customerStoreSearch = useSelector((state: IStore) =>
    selectSearchCustomerByName(state)
  );

  const handleSearchChangeCustomer = useCallback(
    (data) => {
      setCustomerName(data);
      if (data.length >= 5) {
        dispatch(CustomerSetting.requestCustomerDataByName(data));
      } else if (data.length == 0) {
        setCustomerData(undefined);
      }
    },
    [dispatch]
  );

  const onResultSelectCustomer = async (data: any) => {
    setCustomerName(data.result.customerName);

    setCustomerData(data.result);
  };

  const onSubmitCustomerName = async (values) => {};

  const onSubmitHandler = async () => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    let newRelatedCustomer = new RelatedCustomerPostModel({});
    newRelatedCustomer.rCustomerID = 0;
    newRelatedCustomer.customerID = props.customerID;
    newRelatedCustomer.relatedCustomerID = customerData.customerID;
    newRelatedCustomer.createUserID = userLogin?.employeeID;
    newRelatedCustomer.modifyUserID = userLogin?.employeeID;

    await dispatch(RelatedCustomer.postRelatedCustomer(newRelatedCustomer));
    await dispatch(RelatedCustomer.requestRelatedCustomer(props.customerID));
    await dispatch(ModalAction.CLOSE());
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  useEffect(() => {
    dispatch(CustomerSetting.requestAllAcc(1, 5));
  }, [dispatch]);

  return (
    <Fragment>
      <p className="title-paragraph">ADD NEW RELATED CUSTOMER</p>
      <Divider></Divider>

      <div className="new-related-container">
        <div style={{ width: "49%" }}>
          <FinalForm
            onSubmit={(values: any) => onSubmitCustomerName(values)}
            render={({ handleSubmit, pristine, invalid }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="customerName"
                  component={SearchInput}
                  placeholder="Type customer name here.."
                  labelName="Customer Name"
                  handleSearchChange={handleSearchChangeCustomer}
                  onResultSelect={onResultSelectCustomer}
                  results={customerStoreSearch}
                  values={customerName}
                  mandatory={true}
                />
              </Form>
            )}
          />
          <p className="new-related-label">
            Type customer name and press ENTER
          </p>
        </div>
      </div>

      {customerData != undefined && (
        <>
          <div className="space-between-container">
            <div className="flex-column text-align-center">
              <label className="new-related-title-information">
                CustomerID
              </label>
              <p className="new-related-data-information">
                {customerData.customerID}
              </p>
            </div>

            <div className="flex-column">
              <label className="new-related-title-information">Blacklist</label>
              <Label
                color={customerData.blacklist ? "red" : "teal"}
                style={{ borderRadius: "20px", width: "fit-content" }}
              >
                <Icon name="address book" />
                {customerData.blacklist ? "Yes" : "No"}
              </Label>
            </div>

            <div className="flex-column">
              <label className="new-related-title-information">
                Holdshipment
              </label>
              <Label
                color={customerData.holdshipment ? "red" : "blue"}
                style={{ borderRadius: "20px", width: "fit-content" }}
              >
                <Icon name="truck" />
                {customerData.holdshipment ? "Yes" : "No"}
              </Label>
            </div>

            <div className="flex-column text-align-center">
              <label className="new-related-title-information">
                Avg. AR (days)
              </label>
              <p className="new-related-data-information">0</p>
            </div>
          </div>

          <div style={{ margin: "14px 0" }}>
            <label
              style={{
                marginRight: "10px",
                marginBottom: "5px",
                color: "#A0A8B3",
              }}
            >
              Address
            </label>
            <p className="new-related-address-information">
              {customerData.customerAddress}
            </p>
          </div>

          <Divider></Divider>

          <div className="button-container">
            <Button
              textAlign="center"
              className="MarBot10"
              type="submit"
              color="blue"
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
            <Button type="button" onClick={cancelClick}>
              Cancel
            </Button>
          </div>
        </>
      )}

      {customerData == undefined && (
        <>
          <Divider></Divider>

          <div className="button-container">
            <Button
              textAlign="center"
              className="MarBot10"
              color="blue"
              disabled
            >
              Submit
            </Button>
            <Button type="button" onClick={cancelClick}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ModalNewRelatedCondition;

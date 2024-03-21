import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, SearchInput } from "views/components/UI";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import { selectSearchCustomerByName } from "selectors/customer-setting/CustomerSettingSelector";

import IStore from "models/IStore";

interface customerData {
  title: string;
  customerName: string;
  customerID: number;
  blacklist: boolean;
  holdshipment: boolean;
  avgAR: number;
  customerAddress: string;
}

const ModalNewRelatedCustomer: React.FC = (props) => {
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

  const onSubmitCustomerName = async (values) => {
    console.log(customerData);
    console.log(values);
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <p className="title-paragraph">ADD PRELATED ACCOUNT/CUSTOMER</p>
      <Divider></Divider>

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

            {customerData != undefined && (
              <>
                <Divider></Divider>
                <p>{`${customerData.customerID} - ${customerData.title}`}</p>
              </>
            )}

            <Divider></Divider>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                textAlign="center"
                className="MarBot10"
                type="submit"
                color="blue"
                //   onClick={}
              >
                Submit
              </Button>
              <Button type="button" onClick={cancelClick}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ModalNewRelatedCustomer;

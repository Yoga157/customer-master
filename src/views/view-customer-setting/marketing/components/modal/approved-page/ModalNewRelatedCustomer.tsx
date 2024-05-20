import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, SearchInput } from "views/components/UI";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import { selectSearchCustomerByName } from "selectors/customer-setting/CustomerSettingSelector";

import IStore from "models/IStore";
import RelatedCustomerModel from "stores/related-customer/models/RelatedCustomerModel";
import RelatedCustomerPostModel from "stores/related-customer/models/RelatedCustomerPostModel";
import * as RelatedCustomerActions from "stores/related-customer/RelatedCustomerActivityActions";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";

interface customerData {
  title: string;
  customerName: string;
  customerID: number;
  blacklist: boolean;
  holdshipment: boolean;
  avgAR: number;
  customerAddress: string;
}

interface IProps {
  data?: customerData;
  isView?: boolean;
  customerGenId?: number;
  customerId?: number;
}

const ModalNewRelatedCustomer: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { data, isView, customerGenId, customerId } = props;

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
    const userId: any = JSON.parse(localStorage.getItem("userLogin"));

    const RelatedCustomer = new RelatedCustomerPostModel({});
    RelatedCustomer.relatedCustomerID = customerData.customerID;
    if (!isView) {
      RelatedCustomer.customerGenID = customerGenId;
    } else {
      RelatedCustomer.customerID = customerId;
    }
    RelatedCustomer.createUserID = userId.employeeID;
    RelatedCustomer.modifyUserID = userId.employeeID;
    RelatedCustomer.modifyDate = new Date();
    RelatedCustomer.createDate = new Date();

    await dispatch(RelatedCustomerActions.postRelatedCustomer(RelatedCustomer));

    if (customerId || data?.customerID) {
      await dispatch(
        CustomerMasterActions.requestCustomerMoreDetailsByCustId(
          customerId || data.customerID
        )
      );
    }

    if (customerId) {
      await dispatch(
        CustomerMasterActions.requestCustomerMoreDetailsByCustId(customerId)
      );
      await dispatch(
        CustomerMasterActions.requestAccountHistoryByCustId(customerId)
      );
    }

    if (customerGenId) {
      await dispatch(
        CustomerMasterActions.requestApprovedCustomerByGenId(customerGenId)
      );
      await dispatch(
        CustomerMasterActions.requestAccountHistoryByGenId(customerGenId)
      );
    }

    if (isView) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else {
      dispatch(ModalAction.CLOSE());
    }
  };

  const cancelClick = () => {
    if (isView) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else {
      dispatch(ModalAction.CLOSE());
    }
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

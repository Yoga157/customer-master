import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Button,
  SearchInput,
  TextAreaInput,
  TextInput,
} from "views/components/UI";
import CustomerOfficeNumberModel from "stores/customer-master/models/CustomerOficeNumberModel";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";

interface IData {
  id: any;
  type: string;
  address: string;
  officeNumber: string;
  phoneNumber: string;
  alternateNumber: string;
  faxNumber: string;
  customerGenID: any;
  customerID: any;
}

interface IProps {
  data?: IData;
  isView?: boolean;
  customerId?: any;
  customerGenId?: any;
}

const ModalNewCustomerAddress: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { data, isView, customerId, customerGenId } = props;

  const onSubmitNewAddress = async (values) => {
    const customerOfficeNumber = new CustomerOfficeNumberModel({});
    if (data) {
      customerOfficeNumber.customerGenID = data.customerGenID;
      customerOfficeNumber.customerID = data.customerID;
      customerOfficeNumber.type = data.type.toUpperCase();
      customerOfficeNumber.fullAddress = values.fullAddress;
      customerOfficeNumber.phoneNumber = values.phoneNumber;
      customerOfficeNumber.alternateNumber = values.alternateNumber;
      customerOfficeNumber.faxNumber = values.faxNumber;
      customerOfficeNumber.modifyDate = new Date();
      customerOfficeNumber.modifyUserID = 0;

      await dispatch(
        CustomerMasterActions.updateCustomerOfficeNumber(
          customerOfficeNumber,
          data.id
        )
      );
    } else {
      customerOfficeNumber.customerGenID = customerGenId;
      customerOfficeNumber.customerID = customerId;
      customerOfficeNumber.type = "BRANCH";
      customerOfficeNumber.fullAddress = values.fullAddress;
      customerOfficeNumber.phoneNumber = values.phoneNumber;
      customerOfficeNumber.alternateNumber = values.alternateNumber;
      customerOfficeNumber.faxNumber = values.faxNumber;
      customerOfficeNumber.createDate = new Date();
      customerOfficeNumber.createUserID = 0;

      await dispatch(
        CustomerMasterActions.postCustomerOfficeNumber(customerOfficeNumber)
      );
    }

    if (customerId || data?.customerID) {
      await dispatch(
        CustomerMasterActions.requestCustomerMoreDetailsByCustId(
          customerId || data.customerID
        )
      );
    }

    if (customerGenId || data?.customerGenID) {
      await dispatch(
        CustomerMasterActions.requestApprovedCustomerByGenId(
          customerGenId || data.customerGenID
        )
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
      <p className="title-paragraph">ADD NEW CUSTOMER ADDRESS</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitNewAddress(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <div style={{ margin: "1rem 0" }}>
              <Field
                name="fullAddress"
                component={TextAreaInput}
                placeholder="Type full address here.."
                labelName="Full Address"
                mandatory={true}
                defaultValue={data?.address || null}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Field
                name="phoneNumber"
                component={TextInput}
                labelName="Phone Number"
                placeholder="Type phone number here.."
                mandatory={true}
                defaultValue={data?.phoneNumber || null}
              />
              <Field
                name="alternateNumber"
                component={TextInput}
                labelName="Alternate Number"
                placeholder="Type alternate number here.."
                mandatory={true}
                defaultValue={data?.alternateNumber || null}
              />
              <Field
                name="faxNumber"
                component={TextInput}
                labelName="Fax Number"
                placeholder="Type fax number here.."
                mandatory={true}
                defaultValue={data?.faxNumber || null}
              />
            </div>

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

export default ModalNewCustomerAddress;

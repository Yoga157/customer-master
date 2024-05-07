import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Button,
  CheckBoxInput,
  DropdownClearInput,
  TextAreaInput,
  TextInput,
} from "views/components/UI";
import PostPeopleInChargerModel from "stores/customer-master/models/PostPeopleInChargerModel";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { Console } from "console";
import { valueState } from "stores/customer-transfer/CustomerTransferActions";
import IStore from "models/IStore";
import { selectAddressOfficeOptions } from "selectors/customer-master/CustomerMasterSelector";

interface IData {
  id: any;
  name: string;
  jobTitle: string;
  email: string;
  address: string;
  phoneNumber: string;
  customerGenID?: any;
  customerId?: any;
}

interface IProps {
  data?: IData;
  isView?: boolean;
  customerId?: any;
  customerGenId?: any;
}

const ModalNewPIC: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { data, isView, customerId, customerGenId } = props;
  const userId: any = localStorage.getItem("userLogin");

  const addressOptions = useSelector((state: IStore) =>
    selectAddressOfficeOptions(state)
  );
  console.log(addressOptions);

  const onSubmitPIC = async (values) => {
    console.log(values);
    const userId: any = localStorage.getItem("userLogin");

    const RequestPIC = new PostPeopleInChargerModel(values);
    if (data) {
      RequestPIC.customerPICID = data.id;
      RequestPIC.customerGenID = data.customerGenID;
      RequestPIC.picName = values.name;
      RequestPIC.picJobTitle = values.jobTitle;
      RequestPIC.picEmailAddr = values.email;
      RequestPIC.picMobilePhone = values.phoneNumber;
      RequestPIC.picAddress = values.officeAddress;
      RequestPIC.modifyDate = new Date();
      RequestPIC.modifyUserID = JSON.parse(userId).employeeID;
      // console.log(RequestPIC);
      await dispatch(CustomerMasterActions.updatePIC(RequestPIC, data.id));
    } else {
      RequestPIC.customerGenID = customerGenId;
      RequestPIC.picName = values.name;
      RequestPIC.picJobTitle = values.jobTitle;
      RequestPIC.picEmailAddr = values.email;
      RequestPIC.picMobilePhone = values.phoneNumber;
      RequestPIC.picAddress = values.officeAddress;
      RequestPIC.createDate = new Date();
      RequestPIC.createdUserID = JSON.parse(userId).employeeID;
      await dispatch(CustomerMasterActions.postPIC(RequestPIC));
    }

    if (customerId || data?.customerId) {
      await dispatch(
        CustomerMasterActions.requestCustomerMoreDetailsByCustId(
          customerId || data.customerId
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
  console.log("role", userId);

  return (
    <Fragment>
      <p className="title-paragraph">ADD PEOPLE IN CHARGE (PIC)</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitPIC(values)}
        render={({ handleSubmit, pristine, invalid, values }) => (
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "1rem", width: "100%" }}>
                <Field
                  name="name"
                  component={TextInput}
                  labelName="PIC Name"
                  placeholder="Type pic name here.."
                  mandatory={false}
                  defaultValue={data?.name || null}
                />
              </div>

              <Field
                name="jobTitle"
                component={TextInput}
                labelName="Job Title"
                placeholder="Type job title here.."
                mandatory={false}
                defaultValue={data?.jobTitle || null}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1rem",
              }}
            >
              <div style={{ marginRight: "1rem" }}>
                <Field
                  name="email"
                  component={TextInput}
                  labelName="Email"
                  placeholder="Type email here.."
                  mandatory={false}
                  defaultValue={data?.email || null}
                />
              </div>
              <Field
                name="phoneNumber"
                component={TextInput}
                labelName="PIC Mobile Phone"
                placeholder="Type mobile phone here.."
                mandatory={false}
                defaultValue={data?.phoneNumber || null}
              />
            </div>

            <div style={{ margin: "1rem 0" }}>
              <Field
                labelName="Office Address"
                name="officeAddress"
                component={DropdownClearInput}
                placeholder="Choose office address..."
                options={addressOptions}
                mandatory={false}
                defaultValue={data?.address || null}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "1rem " }}>
                <Field
                  label="Pin to show as main PIC"
                  name="mainPIC"
                  component={CheckBoxInput}
                  defaultChecked={false}
                />
              </div>

              <div>
                <Field
                  style={{
                    margin: "0 1rem",
                    transform: "scale(1)",
                  }}
                  label="CAP Customer"
                  name="capCustomer"
                  component={CheckBoxInput}
                  defaultChecked={false}
                  disabled={JSON.parse(userId).role !== "Admin" ? true : false}
                />
              </div>
            </div>
            <Divider></Divider>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="button" onClick={cancelClick}>
                Cancel
              </Button>
              <Button
                textAlign="center"
                className="MarBot10"
                type="submit"
                color="blue"
                disabled={
                  !values.name ||
                  !values.jobTitle ||
                  !values.email ||
                  !values.phoneNumber ||
                  !values.officeAddress
                }
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ModalNewPIC;

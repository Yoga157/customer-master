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
import { Button, TextAreaInput, TextInput } from "views/components/UI";
import PostPeopleInChargerModel from "stores/customer-master/models/PostPeopleInChargerModel";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { Console } from "console";

interface IData {
  id: any;
  name: string;
  jabatan: string;
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

  console.log("Customer Gen ID", customerGenId);
  console.log("Customer ID", customerId);

  const onSubmitPIC = async (values) => {
    const userId: any = localStorage.getItem("userLogin");

    const RequestPIC = new PostPeopleInChargerModel(values);
    if (data) {
      RequestPIC.customerPICID = data.id;
      RequestPIC.customerGenID = data.customerGenID;
      RequestPIC.picName = values.name;
      RequestPIC.picJobTitle = values.jabatan;
      RequestPIC.picEmailAddr = values.address;
      RequestPIC.picMobilePhone = values.phoneNumber;
      RequestPIC.modifyDate = new Date();
      RequestPIC.modifyUserID = JSON.parse(userId).employeeID;
      // console.log(RequestPIC);
      await dispatch(CustomerMasterActions.updatePIC(RequestPIC, data.id));
    } else {
      RequestPIC.customerGenID = customerGenId;
      RequestPIC.picName = values.name;
      RequestPIC.picJobTitle = values.jabatan;
      RequestPIC.picEmailAddr = values.address;
      RequestPIC.picMobilePhone = values.phoneNumber;
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

  return (
    <Fragment>
      <p className="title-paragraph">ADD PEOPLE IN CHARGE (PIC)</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitPIC(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "1rem", width: "100%" }}>
                <Field
                  name="name"
                  component={TextInput}
                  labelName="Name"
                  placeholder="Type pic name here.."
                  mandatory={true}
                  defaultValue={data?.name || null}
                />
              </div>

              <Field
                name="jabatan"
                component={TextInput}
                labelName="Jabatan"
                placeholder="Type jabatan here.."
                mandatory={true}
                defaultValue={data?.jabatan || null}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "1rem" }}>
                <Field
                  name="email"
                  component={TextInput}
                  labelName="Email"
                  placeholder="Type email here.."
                  mandatory={true}
                  defaultValue={data?.email || null}
                />
              </div>
              <Field
                name="phoneNumber"
                component={TextInput}
                labelName="Phone Number"
                placeholder="Type phone number here.."
                mandatory={true}
                defaultValue={data?.phoneNumber || null}
              />
            </div>

            <div style={{ margin: "1rem 0" }}>
              <Field
                name="officeAddress"
                component={TextAreaInput}
                placeholder="Type office address here.."
                labelName="Office Address"
                mandatory={true}
                defaultValue={data?.address || null}
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

export default ModalNewPIC;

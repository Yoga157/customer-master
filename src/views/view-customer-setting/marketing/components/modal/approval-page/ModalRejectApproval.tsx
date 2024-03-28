import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  DropdownClearInput,
  Button,
  FileUpload,
  RichTextEditor,
} from "views/components/UI";
import PostStatusNewCustomerModel from "stores/customer-master/models/PostStatusNewCustomerModel";
import { useHistory, useLocation } from "react-router-dom";

interface ICustomer {
  titleCustomer: any;
  customerName: any;
  industryClass: any;
  customerAddress: any;
  phoneNumber: any;
  website: any;
  socialMedia: any;
  picName: any;
  picJobTitle: any;
  picMobilePhone: any;
  picEmailAddr: any;
  requestor: any;
  modifyUserID: any;
}

interface IMatchCustomer {
  titleCustomer: string;
  customerName: string;
  picName: string;
  customerID: any;
}

interface IProps {
  customerGenId: string;
  customer: ICustomer;
  matchCustomer?: IMatchCustomer;
  jenis: string;
}

const ModalRejectApproval: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const { customer, customerGenId, matchCustomer, jenis } = props;

  const [remark, setRemark] = useState("");

  const onReject = async (data) => {
    const rejectCustomerData = new PostStatusNewCustomerModel({});
    rejectCustomerData.customerGenID = customerGenId;
    rejectCustomerData.approvalStatus = "REJECT";
    rejectCustomerData.remark = data.remark;

    await dispatch(
      CustomerMasterActions.updateStatusNewCustomer(rejectCustomerData)
    );
    dispatch(ModalAction.CLOSE());

    history.push({
      pathname: "customer-setting/",
    });
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <p className="title-paragraph">REJECT REQUEST - Match Customer</p>
      <Divider></Divider>

      <p className="warning-text" style={{ backgroundColor: "#FFFB9A" }}>
        {jenis.toUpperCase() == "MATCH"
          ? "There is a MATCH customer with our database."
          : "You just want to REJECT new customer request."}
      </p>

      <Divider></Divider>

      <div className="title-button-row">
        <p className="grey margin-0 bold text-align-left">
          New Request Customer
        </p>
      </div>

      <Divider></Divider>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="customer-data-container-left">
          <label className="customer-data-label">Title Customer</label>
          <p style={{ fontSize: "20px", fontWeight: "bold" }} className="grey">
            {customer.titleCustomer}
          </p>
        </div>
        <div className="customer-data-container-left">
          <label className="customer-data-label">Customer Name</label>
          <p style={{ fontSize: "20px", fontWeight: "bold" }} className="grey">
            {customer.customerName}
          </p>
        </div>
      </div>

      <div className="customer-data-container-left">
        <label className="customer-data-label">PIC Name</label>
        <p style={{ fontSize: "20px", fontWeight: "bold" }} className="grey">
          {customer.picName}
        </p>
      </div>

      {jenis.toUpperCase() == "MATCH" && (
        <>
          <Divider></Divider>

          <div className="title-button-row">
            <p className="grey margin-0 bold text-align-left">
              Match Existing Customer
            </p>
          </div>

          <Divider></Divider>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="customer-data-container-left">
              <label className="customer-data-label">Title Customer</label>
              <p
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="grey"
              >
                {matchCustomer.titleCustomer.toUpperCase()}
              </p>
            </div>
            <div className="customer-data-container-left">
              <label className="customer-data-label">Customer Name</label>
              <p
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="grey"
              >
                {matchCustomer.customerName}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="customer-data-container-left">
              <label className="customer-data-label">Cust. ID</label>
              <p
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="grey"
              >
                {matchCustomer.customerID}
              </p>
            </div>
            <div className="customer-data-container-left">
              <label className="customer-data-label">PIC Name</label>
              <p
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="grey"
              >
                {matchCustomer.picName}
              </p>
            </div>
          </div>
        </>
      )}

      <FinalForm
        onSubmit={(values: any) => onReject(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="remark"
              initialValue={remark}
              component={RichTextEditor}
              placeholder="Reason to reject the request data"
              value={remark}
              defaultValue={remark}
            />

            <Divider></Divider>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                textAlign="center"
                className="MarBot10"
                type="submit"
                color="blue"
                style={{ marginRight: "1rem" }}
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

export default ModalRejectApproval;

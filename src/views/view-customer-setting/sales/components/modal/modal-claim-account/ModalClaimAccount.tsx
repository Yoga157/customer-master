import React, { Fragment, useState, useCallback } from "react";
import "../Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button } from "views/components/UI";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import CustomerClaimAccount from "stores/customer-setting/models/CustomerClaimAccount";

interface IProps {
  customer: any;
}

const ModalClaimAccount: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { customer } = props;

  const onSubmitHandler = async (data: any) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    const PostCustomerSetting = new CustomerClaimAccount({});
    PostCustomerSetting.customerID = customer.customerID;
    PostCustomerSetting.salesID = userLogin?.employeeID;
    PostCustomerSetting.requestedBy = userLogin?.employeeID;

    dispatch(CustomerSetting.claimAccount(PostCustomerSetting)).then(() => {
      dispatch(CustomerSetting.requestCustomerDataById(customer.customerID));
      dispatch(ModalAction.CLOSE());
    });
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <FinalForm
        onSubmit={onSubmitHandler}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid.Row>
              <div className="img-container">
                <div style={{ padding: "0px" }}>
                  <img
                    className="ui centered medium"
                    src="/assets/info.png"
                    sizes="small"
                  />
                </div>
              </div>
            </Grid.Row>
            <Grid.Row centered className="text-align-center">
              <span style={{ padding: "10px" }}>
                {customer.accountStatus == "Shareable Account"
                  ? "Do you want to request this account to be shareable account?"
                  : "Are you sure you want to claim this account?"}
              </span>
              <p className="text-bold">{customer.customerName}</p>
            </Grid.Row>
            <Divider></Divider>
            <div className="text-align-center">
              <Button type="button" onClick={cancelClick}>
                Cancel
              </Button>
              <Button className="MarBot10" type="submit" color="blue">
                Submit
              </Button>
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ModalClaimAccount;

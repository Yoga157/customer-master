import React, { Fragment, useState, useCallback } from "react";
import "../Modal.scss";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button, TextAreaInput } from "views/components/UI";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  customer: any;
}

const ModalAcceptRequestShareableAccount: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { customer } = props;
  const [isReject, setIsReject] = useState(null);
  const [alasan, setAlasan] = useState(null);

  const actionOptions = [
    { key: 1, value: "Reject", text: "Reject" },
    { key: 2, value: "Approve", text: "Approve" },
  ];

  const onSubmitAction = (value: any) => {};

  const onChangeAction = (data: any) => {
    if (data == "Reject") {
      setIsReject(true);
    } else if (data == "Approve") {
      setIsReject(false);
    }
  };

  const onSubmitHandler = async (values) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    dispatch(
      CustomerSetting.acceptRequestShareableAccount(
        customer.customerID,
        Number(customer.shareableApprovalStatus.requestedUserID),
        !isReject,
        userLogin?.employeeID,
        alasan
      )
    ).then(() => {
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
        onSubmit={(values: any) => onSubmitHandler(values)}
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
            <Grid.Row
              centered
              style={{ textAlign: "center", marginBottom: "1rem" }}
            >
              <span style={{ padding: "10px" }}>
                Are you sure want to approve this shareable account request?
              </span>
              <p className="text-bold" style={{ margin: 0 }}>
                {customer.customerName}
              </p>
              <span>
                Request By{" "}
                <span className="text-bold">
                  {customer.shareableApprovalStatus.requestedBy}
                </span>
              </span>
            </Grid.Row>
            <Grid.Row centered>
              <FinalForm
                onSubmit={(values: any) => onSubmitAction(values)}
                render={({ handleSubmit, pristine, invalid }) => (
                  <Form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      minWidth: "fit-content",
                    }}
                  >
                    <Field
                      labelName="Choose Action To Continue"
                      name="action"
                      component={DropdownClearInput}
                      placeholder="Choose action"
                      options={actionOptions}
                      onChanged={onChangeAction}
                      mandatory={true}
                    />
                  </Form>
                )}
              />
              {isReject && (
                <TextAreaInput
                  input={{
                    value: alasan,
                    onChange: setAlasan,
                    name: "alasan",
                    onBlur: () => {},
                    onFocus: () => {},
                  }}
                  meta={{ touched: null, error: null }}
                  labelName={"Reason To Reject"}
                ></TextAreaInput>
              )}
            </Grid.Row>
            <Divider></Divider>
            <div className="text-align-center">
              <Button type="button" onClick={cancelClick}>
                Cancel
              </Button>
              <Button
                className="MarBot10"
                type="submit"
                color="blue"
                disabled={isReject == null}
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

export default ModalAcceptRequestShareableAccount;

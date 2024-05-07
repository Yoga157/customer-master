import React, { Fragment, useState, useCallback, useEffect } from "react";
import "../Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import * as ModalAction from "stores/modal/no-padding/ModalNoPaddingActions";
import { Divider, Form, Grid, Card } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import ModCloseApprove from "../modal-closeApprove/ModalRequestApprove";
import ModCloseReject from "../modal-closeReject/ModalRequestReject";
import ModalSizeEnum from "constants/ModalSizeEnum";
import {
  DropdownClearInput,
  Button,
  TextAreaInput,
  RadioButton,
} from "views/components/UI";
import IStore from "models/IStore";

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

  const onChangeAction = (data) => {
    if (data === "Approve") {
      setIsReject(false);
    } else if (data === "Reject") {
      setIsReject(true);
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

      dispatch(CustomerMasterActions.setSuccessModal(isReject));

      if (!isReject) {
        dispatch(ModalAction.CLOSE());
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModCloseApprove customer={customer} />,
            ModalSizeEnum.Tiny
          )
        );
      } else {
        dispatch(ModalAction.CLOSE());
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModCloseReject customer={customer} />,
            ModalSizeEnum.Tiny
          )
        );
      }
    });
  };

  const isSuccess = useSelector(
    (state: IStore) => state.customerMaster.isSuccess
  );
  const openModal = useCallback(() => {
    if (isSuccess) {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModCloseApprove customer={customer} />,
          ModalSizeEnum.Tiny
        )
      );
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      openModal();
      dispatch(CustomerMasterActions.setSuccessModal(false));
    }
  }, [isSuccess]);

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <Card.Header style={{ padding: "1.5rem 1rem 0" }}>
        <h4>APPROVE/REJECT JOIN REQUEST ACCOUNTS</h4>
      </Card.Header>
      {/* <Divider className="divider0"></Divider> */}

      <div
        style={{
          backgroundColor: "#FFE0D9",
          display: "flex",
          alignItems: "center",
          padding: "1rem 0rem",
        }}
      >
        <div style={{ marginLeft: "1rem", marginRight: "0.5rem" }}>
          {" "}
          <p className="text-bold" style={{ margin: 0 }}>
            {customer.customerName}
          </p>
        </div>
        <div style={{ marginRight: "1rem" }}>
          {" "}
          <p style={{ color: "#F97452", margin: 0 }}>Cross BU Account</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <span>
          Request by.{" "}
          <span className="text-bold">
            {customer.shareableApprovalStatus.requestedBy}{" "}
          </span>
          <span>from CSS</span>
        </span>
      </div>

      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <div style={{ display: "flex", marginBottom: "1rem" }}>
                <label style={{ marginRight: "1rem" }}>
                  <input
                    type="radio"
                    name="approval"
                    value="Approve"
                    checked={isReject === false}
                    onChange={(e) => onChangeAction(e.target.value)}
                  />
                  <span style={{ marginRight: "1rem", marginLeft: "0.5rem" }}>
                    APPROVE
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="reject"
                    value="Reject"
                    checked={isReject === true}
                    onChange={(e) => onChangeAction(e.target.value)}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>REJECT</span>
                </label>
              </div>
              {isReject && (
                <div style={{ width: "90%" }}>
                  <label style={{ color: "rgb(85 99 122 / 77%)" }}>
                    Reason to reject <span style={{ color: "red" }}>*</span>
                    <textarea
                      style={{ width: "100%" }}
                      value={alasan}
                      onChange={(e) => setAlasan(e.target.value)}
                    />
                  </label>
                </div>
              )}
            </div>

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

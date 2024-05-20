import React, { Fragment } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import "../Modal.scss";
import PostStatusNewCustomerModel from "stores/customer-master/models/PostStatusNewCustomerModel";

interface IProps {
  customerGenID: string;
  setIsApprove: (status: boolean) => void;
}

const ApprovePopUp: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { customerGenID, setIsApprove } = props;

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const approveClick = async () => {
    const userLogin: any = localStorage.getItem("userLogin");

    const approveCustomerData = new PostStatusNewCustomerModel({});
    approveCustomerData.customerGenID = customerGenID;
    approveCustomerData.approvalStatus = "APPROVE";
    approveCustomerData.remark = null;
    approveCustomerData.modifyUserID = userLogin.employeeID;

    await dispatch(
      CustomerMasterActions.updateStatusNewCustomer(approveCustomerData)
    );
    setIsApprove(true);

    await dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <FinalForm
        onSubmit={approveClick}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid.Row>
              <div className="img-container">
                <div className="ui segment" style={{ padding: "0px" }}>
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
                Are you sure you want to APPROVE this customer data?
              </span>
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

export default ApprovePopUp;

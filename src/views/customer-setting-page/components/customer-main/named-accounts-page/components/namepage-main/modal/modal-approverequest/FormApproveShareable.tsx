import React, { Fragment } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import "../Modal.scss";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
  isDirectorate: boolean;
  isAdmin: boolean;
  refreshFunc: (page?: any, pageSize?: any, column?: any, sorting?: any) => any;
}

const ApproveShareableReq: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, isDirectorate, isAdmin, refreshFunc } = props;

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CustomerSettingAct.PUT_ACCEPT_REQUEST_SHAREABLE])
  );

  const onSubmitHandler = async (e) => {
    const userId: any = JSON.parse(localStorage.getItem("userLogin"));

    for (let j = 0; j < rowData.length; j++) {
      await dispatch(
        CustomerSettingAct.approveRejectClaimAccount(
          (rowData.customerID = props.rowData[j].customerID),
          (rowData.salesID = props.rowData[j].salesHistory.salesID),
          true,
          (rowData.modifyUserID = userId.employeeID),
          isDirectorate ? userId.employeeID : null,
          isAdmin ? userId.employeeID : null
        )
      );
    }
    dispatch(ModalAction.CLOSE());
    dispatch(refreshFunc(1, 10, "CustomerID", "ascending"));
  };

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={onSubmitHandler}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid.Row>
                {rowData.length == 1}
                <div className="flex-center">
                  <div style={{ padding: "0px" }}>
                    <img
                      className="ui centered medium"
                      src="/assets/info.png"
                      sizes="small"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
              </Grid.Row>
              <Grid.Row
                centered
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  Are you sure want to approve this shareable account <br />
                  request?{" "}
                </span>
              </Grid.Row>
              <Grid.Row centered>
                {rowData.map((data) => (
                  <Grid.Column
                    key={data.customerID}
                    style={{ marginTop: "1rem" }}
                  >
                    <p className="p-customerName">{data.customerName}</p>
                  </Grid.Column>
                ))}
              </Grid.Row>

              <Grid.Row centered style={{ textAlign: "center" }}>
                {rowData.map((data) => (
                  <span key={data.customerID}>
                    Request By{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {data.salesHistory.requestedBy}
                    </span>
                  </span>
                ))}
              </Grid.Row>

              <Divider></Divider>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Button type="button" onClick={cancelClick}>
                  Cancel
                </Button>
                <Button type="submit" color="blue">
                  Approve
                </Button>
              </div>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ApproveShareableReq;

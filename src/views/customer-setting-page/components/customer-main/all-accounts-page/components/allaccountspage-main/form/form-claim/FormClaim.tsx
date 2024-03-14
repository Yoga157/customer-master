import React, { Fragment } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import CustomerSettingPostModel from "stores/customer-setting/models/CustomerSettingPostModel";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
}

const ClaimAccount: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");

    for (let j = 0; j < rowData.length; j++) {
      const NewClaimAccount = new CustomerSettingPostModel(e);
      NewClaimAccount.customerSettingID = 0;
      NewClaimAccount.customerID = rowData[j].customerID;
      NewClaimAccount.salesID = JSON.parse(userId)?.employeeID;
      NewClaimAccount.requestedBy = JSON.parse(userId)?.employeeID;
      NewClaimAccount.requestedDate = new Date();
      NewClaimAccount.createDate = new Date();
      NewClaimAccount.createUserID = JSON.parse(userId)?.employeeID;

      await dispatch(CustomerSettingAct.postRequestAccount(NewClaimAccount));
    }
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestAllAcc(1, 10, "CustomerID", "ascending")
    );
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
                <div className="container-modal">
                  <div style={{ padding: "0px" }}>
                    <img
                      className="ui centered medium"
                      src="/assets/info.png"
                      sizes="small"
                      style={{ width: "135px", height: "135px" }}
                    />
                  </div>
                </div>
              </Grid.Row>
              <Grid.Row
                centered
                style={{
                  textAlign: "center",
                  // marginTop: "1.5rem",
                }}
              >
                <span style={{ padding: "10px" }}>
                  Are you sure want to claim this account?
                </span>
              </Grid.Row>
              <Grid.Row>
                {rowData.map((data) => {
                  return (
                    <div>
                      <Grid.Row
                        centered
                        width={1}
                        style={{ padding: "0px" }}
                        key={data.customerID}
                      >
                        <Grid.Column style={{ marginBottom: "2rem" }}>
                          <p className="p-customerName">{data.customerName}</p>
                        </Grid.Column>
                      </Grid.Row>
                    </div>
                  );
                })}
              </Grid.Row>

              <Divider></Divider>
              <div style={{ textAlign: "center" }}>
                <Button type="button" onClick={cancelClick}>
                  Cancel
                </Button>
                <Button type="submit" color="blue">
                  Yes, Claim it
                </Button>
              </div>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ClaimAccount;

import React, { Fragment, useEffect, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import "../Modal.scss";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider, Card } from "semantic-ui-react";
import * as ModalAction from "stores/modal/no-padding/ModalNoPaddingActions";
import {} from "revalidate";
import CustomerSettingPostModel from "stores/customer-setting/models/CustomerSettingPostModel";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import { selectEmployeeDeptId } from "selectors/employee/EmployeeSelector";
import * as EmployeeActions from "stores/employee/EmployeeActions";

interface IProps {
  rowData: any;
}

const ClaimAccountEdit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployeeById(userLogin.employeeID));
  }, [dispatch]);

  let userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const [isRemark, setRemark] = useState(null);

  const employeeData = useSelector((state: IStore) =>
    selectEmployeeDeptId(state)
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerSettingAct.POST_CLAIM_ACCOUNT,
      EmployeeActions.REQUEST_EMPLOYEES_ENGINEER_BY_ID,
    ])
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
      NewClaimAccount.claimRemark = isRemark;
      NewClaimAccount.createDate = new Date();
      NewClaimAccount.createUserID = JSON.parse(userId)?.employeeID;

      await dispatch(CustomerSettingAct.postClaimAccount(NewClaimAccount));
    }
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestNoNameAcc(1, 10, "CustomerID", "ascending")
    );
  };

  return (
    <Fragment>
      <Card.Header>
        <h4 style={{ paddingInline: "2rem", paddingTop: "2rem" }}>
          Claim Accounts
        </h4>
      </Card.Header>
      <Divider></Divider>

      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={onSubmitHandler}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <div
                  className="modal-container-claim"
                  style={{
                    marginInline: "2rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p className="text-claim">
                    Are you sure want to claim this account ?
                  </p>
                </div>
                <Divider style={{ margin: 0, padding: 0 }}></Divider>
                {rowData.map((data) => {
                  return (
                    <>
                      <Grid.Row
                        width={1}
                        key={data.customerID}
                        style={{
                          backgroundColor:
                            !data.industryClassBusiness.includes(
                              employeeData.buToCompare
                            ) && "#FFE0D9",
                          paddingInline: "2rem",
                          paddingTop: "1rem",
                          paddingBottom: "1rem",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <h4
                            style={{
                              color: "#55637a",
                              marginRight: "1rem",
                              padding: 0,
                              marginBottom: 0,
                            }}
                          >
                            {data.customerName}
                          </h4>
                          {!data.industryClassBusiness.includes(
                            employeeData.buToCompare
                          ) && (
                            <p style={{ color: "red", fontStyle: "italic" }}>
                              Cross BU Account
                            </p>
                          )}
                        </div>
                        {!data.industryClassBusiness.includes(
                          employeeData.buToCompare
                        ) && (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div style={{ width: "100%", marginTop: "1rem" }}>
                              <label style={{ color: "rgb(85 99 122 / 77%)" }}>
                                Reason to claim cross BU{" "}
                                <span style={{ color: "red" }}>*</span>
                                <textarea
                                  style={{ width: "100%" }}
                                  rows={4}
                                  value={isRemark}
                                  onChange={(e) => setRemark(e.target.value)}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </Grid.Row>

                      <Divider style={{ padding: 0, margin: 0 }}></Divider>
                    </>
                  );
                })}
              </div>

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

export default ClaimAccountEdit;

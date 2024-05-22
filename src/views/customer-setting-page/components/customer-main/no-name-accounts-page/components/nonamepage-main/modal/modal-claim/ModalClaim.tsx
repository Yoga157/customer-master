import React, { Fragment, useEffect, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Card, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/no-padding/ModalNoPaddingActions";
import "../Modal.scss";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import CustomerSettingPostModel from "stores/customer-setting/models/CustomerSettingPostModel";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import * as EmployeeActions from "stores/employee/EmployeeActions";
import { selectEmployeeDeptId } from "selectors/employee/EmployeeSelector";

interface IProps {
  rowData: any;
  getRowData: (data: any) => void;
  filterData: any;
}

interface FilterData {
  pmo_customer: any;
  holdshipment: any;
  blacklist: any;
}

const ClaimAccount: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const [filterData, setFilterData] = useState<FilterData | undefined>(
    props.filterData || undefined
  );
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const [isRemark, setRemark] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [showRemark, setShowRemark] = useState(false);

  let userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const employeeData = useSelector((state: IStore) =>
    selectEmployeeDeptId(state)
  );

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployeeById(userLogin.employeeID));
  }, [dispatch]);

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerSettingAct.POST_CLAIM_ACCOUNT,
      EmployeeActions.REQUEST_EMPLOYEES_ENGINEER_BY_ID,
    ])
  );

  const addRemark = (remark: string, jdeCustomerID: number) => {
    let obj = rowData.find((item) => item.jdeCustomerID === jdeCustomerID);
    obj["remark"] = remark;
    setRemark(remark);
  };

  //kondisi button modal claim jika ada remark dan bu
  useEffect(() => {
    const isCrossBUAccount = rowData.some(
      (data) => !data.industryClassBusiness.includes(employeeData.buToCompare)
    );

    setShowRemark(isCrossBUAccount);

    if (isCrossBUAccount && isRemark.trim() === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [isRemark, rowData, employeeData]);

  const onSubmitHandler = async (e) => {
    for (let j = 0; j < rowData.length; j++) {
      const NewClaimAccount = new CustomerSettingPostModel(e);
      NewClaimAccount.customerSettingID = 0;
      NewClaimAccount.customerID = rowData[j].customerID;
      NewClaimAccount.salesID = userLogin?.employeeID;
      NewClaimAccount.requestedBy = userLogin?.employeeID;
      NewClaimAccount.requestedDate = new Date();
      NewClaimAccount.claimRemark = rowData[j]?.remark
        ? rowData[j].remark
        : null;
      NewClaimAccount.createDate = new Date();
      NewClaimAccount.createUserID = userLogin?.employeeID;

      await dispatch(CustomerSettingAct.postClaimAccount(NewClaimAccount));
    }
    props.getRowData([]);
    dispatch(ModalAction.CLOSE());
    if (filterData != undefined) {
      dispatch(
        CustomerSettingAct.requestSearchNoNameAcc(
          activePage,
          10,
          "CustomerID",
          null,
          "ascending",
          filterData.pmo_customer,
          filterData.blacklist,
          filterData.holdshipment
        )
      );
    } else {
      dispatch(
        CustomerSettingAct.requestNoNameAcc(
          activePage,
          10,
          "CustomerID",
          "ascending"
        )
      );
    }
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
                    Please pay more attention to customer accounts that you
                    choose.
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
                                  onChange={(e) =>
                                    addRemark(
                                      e.target.value,
                                      data.jdeCustomerID
                                    )
                                  }
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

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Button
                  type="button"
                  onClick={() => cancelClick()}
                  className="btn-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="blue"
                  disabled={showRemark && isButtonDisabled}
                >
                  Submit
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

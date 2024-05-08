import React, { Fragment, useState } from "react";
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
  const BU_LoginUser = "1070102003";
  const BU_ToCompare = BU_LoginUser.slice(0, -5) + "00000";

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CustomerSettingAct.POST_CLAIM_ACCOUNT])
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

      await dispatch(CustomerSettingAct.postClaimAccount(NewClaimAccount));
    }
    props.getRowData([]);
    dispatch(ModalAction.CLOSE());
    if (filterData != undefined) {
      // console.log(filterData);
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
                              BU_ToCompare
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
                            BU_ToCompare
                          ) && (
                            <p style={{ color: "red", fontStyle: "italic" }}>
                              Cross BU Account
                            </p>
                          )}
                        </div>
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
                <Button className="btn-submit" type="submit" color="blue">
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

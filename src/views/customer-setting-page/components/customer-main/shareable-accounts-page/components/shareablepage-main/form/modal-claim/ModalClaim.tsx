import React, { Fragment, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import "../Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import CustomerSettingPostModel from "stores/customer-setting/models/CustomerSettingPostModel";
import {} from "revalidate";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
  filterData: any;
  myAccount: boolean;
}

interface FilterData {
  nonameAccount: any;
  namedAccount: any;
  pmo_customer: any;
  newsalesAssign: any;
  holdshipment: any;
  blacklist: any;
  shareableAccount: any;
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
      NewClaimAccount.modifyDate = new Date();
      NewClaimAccount.modifyUserID = JSON.parse(userId)?.employeeID;

      await dispatch(CustomerSettingAct.postClaimAccount(NewClaimAccount));
    }

    dispatch(ModalAction.CLOSE());
    if (filterData != undefined) {
      dispatch(
        CustomerSettingAct.requestSearchAllAcc(
          activePage,
          10,
          "CustomerID",
          null,
          "ascending",
          filterData.newsalesAssign,
          filterData.pmo_customer,
          filterData.blacklist,
          filterData.holdshipment,
          filterData.nonameAccount,
          filterData.namedAccount,
          filterData.shareableAccount
        )
      );
    } else if (props.myAccount) {
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerSettingAct.requestSearchShareabelAcc(
          activePage,
          10,
          "CustomerID",
          null,
          "ascending",
          salesID
        )
      );
    } else {
      dispatch(
        CustomerSettingAct.requestShareabledAcc(
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
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={onSubmitHandler}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid.Row>
                {rowData.length == 1}
                <div className="container-flex">
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
              <Grid.Row centered className="text-center">
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

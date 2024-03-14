import React, { useEffect, Fragment, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import "../Modal.scss";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Card, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import ReleaseAccount from "stores/customer-setting/models/ReleaseAccounts";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
  getRowData: (data: any) => void;
  readonly myAccount: boolean;
  readonly filterData: any;
}

interface FilterData {
  pmo_customer: any;
  newsalesAssign: any;
  holdshipment: any;
  blacklist: any;
}

const RelaseAccountMod: React.FC<IProps> = (
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
    selectRequesting(state, [CustomerSettingAct.PUT_RELEASES_ACCOUNTS])
  );

  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");

    for (let j = 0; j < rowData.length; j++) {
      await dispatch(
        CustomerSettingAct.putReleaseAccount(
          (rowData.customerID = props.rowData[j].customerID),
          (rowData.salesID = JSON.parse(userId)?.employeeID),
          (rowData.modifyUserID = JSON.parse(userId)?.employeeID)
        )
      );
    }
    props.getRowData([]);
    dispatch(ModalAction.CLOSE());
    if (filterData != undefined) {
      console.log(filterData);
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
          filterData.holdshipment
        )
      );
    } else if (props.myAccount) {
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerSettingAct.requestSearchNamedAcc(
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
        CustomerSettingAct.requestNamedAcc(
          activePage,
          10,
          "CustomerID",
          "ascending"
        )
      );
    }
  };

  const onHandlerSearch = () => {};

  return (
    <Fragment>
      <Card.Header>
        <h4>Release Accounts</h4>
      </Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={() => onHandlerSearch()}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <div className="modal-release-edit">
                  <p className="p-text-release">
                    Are you sure want to release all this accounts ?
                  </p>
                </div>
                <Divider></Divider>
                {rowData.map((data) => {
                  return (
                    <>
                      <Grid.Row
                        width={1}
                        className="padding-0"
                        key={data.customerGenID}
                      >
                        <Grid.Column>
                          <h2 style={{ color: "#55637a" }}>
                            {data.customerName}
                          </h2>
                        </Grid.Column>
                      </Grid.Row>

                      <Divider></Divider>
                    </>
                  );
                })}
              </div>
            </Form>
          )}
        />

        <div style={{ textAlign: "center" }}>
          <Button type="button" onClick={cancelClick} className="btn-cancel ">
            Cancel
          </Button>
          <Button
            className="MarBot10 btn-submit"
            type="submit"
            color="blue"
            onClick={onSubmitHandler}
          >
            Submit
          </Button>
        </div>
      </LoadingIndicator>
    </Fragment>
  );
};

export default RelaseAccountMod;

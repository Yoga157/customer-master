import React, { Fragment, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {}

const NewRequestCustomerClose: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestAllAcc(1, 10, "CustomerID", "ascending")
    );
  };

  return (
    <Fragment>
      <LoadingIndicator>
        <Grid.Row>
          <div className="container-modal">
            <div style={{ padding: "0px" }}>
              <img
                className="ui centered medium"
                src="/assets/checkgreen.png"
                sizes="small"
                style={{ width: "135px", height: "135px" }}
              />
            </div>
          </div>
        </Grid.Row>
        <Grid.Row centered className="text-center">
          <span style={{ padding: "10px" }}>
            You customer request has been submit. The update will be send to
            your email.
          </span>
        </Grid.Row>

        <Divider></Divider>
        <div style={{ textAlign: "center" }}>
          <Button type="button" color="blue" onClick={cancelClick}>
            Ok
          </Button>
        </div>
      </LoadingIndicator>
    </Fragment>
  );
};

export default NewRequestCustomerClose;

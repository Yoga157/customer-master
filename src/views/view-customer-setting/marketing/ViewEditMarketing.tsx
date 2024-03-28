import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
// import "./ViewCustomerSetting.scss";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import IStore from "models/IStore";
import ViewApprovedData from "./ViewApprovedData";
import ViewApproval from "./ViewApproval";

interface routeParams {
  id: string;
}

interface IProps {
  status: string;
}

const ViewEditMarketing: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { status } = props;
  const { id } = useParams<routeParams>();

  dispatch(CustomerMasterActions.setActiveTabs(4));

  // let status = "PENDING";

  return (
    <Fragment>
      {(status == "APPROVE" || status == "NOT_NEW") && (
        <ViewApprovedData isView={false}></ViewApprovedData>
      )}
      {status == "PENDING" && <ViewApproval></ViewApproval>}
    </Fragment>
  );
};

export default ViewEditMarketing;

import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
// import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import IStore from "models/IStore";
import ViewApprovedData from "./ViewApprovedData";
import ViewApproval from "./ViewApproval";

interface routeParams {
  id: string;
}

const ViewEditMarketing: React.FC = (props) => {
  const dispatch: Dispatch = useDispatch();
  const { id } = useParams<routeParams>();

  let status = "APPROVE";

  return (
    <Fragment>
      {status == "APPROVE" ? (
        <ViewApprovedData isView={false}></ViewApprovedData>
      ) : (
        <ViewApproval></ViewApproval>
      )}
    </Fragment>
  );
};

export default ViewEditMarketing;

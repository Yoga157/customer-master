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
import { selectNewCustomerDetailPending } from "selectors/customer-master/CustomerMasterSelector";

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
  const [realStatus, setRealStatus] = useState(status);

  const customer = useSelector((state: IStore) =>
    selectNewCustomerDetailPending(state)
  );

  dispatch(CustomerMasterActions.setActiveTabs(4));
  useEffect(() => {
    if (status === "NOT_NEW") {
      dispatch(
        CustomerMasterActions.requestNewCustomerDetailByGenId(Number(id))
      );
    }
  }, [status, id]);

  useEffect(() => {
    if (status == "NOT_NEW") {
      if (Array.isArray(customer) && customer.length == 0) {
        setRealStatus("NOT_NEW");
      } else {
        setRealStatus(customer.approvalStatus.toUpperCase());
      }
    }
  }, [status, customer]);

  return (
    <Fragment>
      {(realStatus == "APPROVE" || realStatus == "NOT_NEW") && (
        <ViewApprovedData isView={false} status={realStatus}></ViewApprovedData>
      )}
      {realStatus == "PENDING" && <ViewApproval></ViewApproval>}
    </Fragment>
  );
};

export default ViewEditMarketing;

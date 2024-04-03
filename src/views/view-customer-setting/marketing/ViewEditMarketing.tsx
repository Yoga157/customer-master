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
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";

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
    if (status == "NOT_NEW") {
      dispatch(
        CustomerMasterActions.requestNewCustomerDetailByGenId(Number(id))
      );
    }
  }, [status, id]);

  useEffect(() => {
    if (Array.isArray(customer)) {
      setRealStatus("NOT_NEW");
    } else {
      setRealStatus(customer.approvalStatus.toUpperCase());
    }
  }, [customer]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID,
    ])
  );

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        {(realStatus == "APPROVE" || realStatus == "NOT_NEW") && (
          <ViewApprovedData
            isView={false}
            status={realStatus}
          ></ViewApprovedData>
        )}
        {realStatus == "PENDING" && <ViewApproval></ViewApproval>}
      </LoadingIndicator>
    </Fragment>
  );
};

export default ViewEditMarketing;

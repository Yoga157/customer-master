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
import { Link, useLocation, useParams } from "react-router-dom";
import IStore from "models/IStore";

import ViewEditCustomer from "./sales/components/base/ViewEditCustomer";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import { selectCustomerDataById } from "selectors/customer-setting/CustomerSettingSelector";
import ViewApproval from "./marketing/ViewApproval";
import ViewEditMarketing from "./marketing/ViewEditMarketing";

interface ICustomerData {
  rowData: {
    approvalStatus: any;
    blacklist: any;
    createdBy: any;
    createdDate: any;
    customerAddress: any;
    customerCategory: any;
    customerGenID: any;
    customerID: any;
    customerName: any;
    holdshipment: any;
    industryClass: any;
    isNew: any;
    jdeCustomerID: any;
    lastProjectName: any;
    modifiedBy: any;
    modifiedDate: any;
    named: any;
    pmoCustomer: any;
    relatedCustomer: any;
    requestedBy: any;
    salesName: any;
    salesShareableID: any;
    shareable: any;
    status: any;
  };
}

interface IProps {
  history: any;
}

interface routeParams {
  id: string;
}

const ViewEditCustomerSettingPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const location = useLocation<ICustomerData>();
  const [customerData, setCustomerData] = useState(
    location.state.rowData || undefined
  );
  const dispatch: Dispatch = useDispatch();
  const { id } = useParams<routeParams>();
  let userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const role = userLogin.role;
  const customer = useSelector((state: IStore) =>
    selectCustomerDataById(state)
  );

  useEffect(() => {
    if (id != undefined) {
      dispatch(CustomerSetting.requestCustomerDataById(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <Fragment>
      {role == "Marketing" ? (
        <ViewEditMarketing
          status={customerData.approvalStatus?.toUpperCase() || "NOT_NEW"}
        ></ViewEditMarketing>
      ) : (
        customer.customerID != undefined && (
          <ViewEditCustomer customer={customer} role={role} />
        )
      )}
    </Fragment>
  );
};

export default ViewEditCustomerSettingPage;

import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import "./ModalApprovedData.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Icon, Divider, Form, Button } from "semantic-ui-react";
import IStore from "models/IStore";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput } from "views/components/UI";
import TableCustomerDetail from "./components/table/TableCustomerDetail";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalNewCustomerAddress from "./components/modal/approved-page/ModalNewCustomerAddress";
import ModalNewWebsiteMedia from "./components/modal/approved-page/ModalNewWebsiteMedia";
import ModalNewPIC from "./components/modal/approved-page/ModalNewPIC";
import ModalNewRelatedCustomer from "./components/modal/approved-page/ModalNewRelatedCustomer";
import BaseViewApprovedData from "./components/view/BaseViewApprovedData";

interface IProps {
  isView?: boolean;
}

const ViewApprovedData: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { isView } = props;

  return (
    <Fragment>
      {!isView && (
        <Link to={"/customer-setting"} className="link">
          {"< Back to Customer Setting List"}
        </Link>
      )}

      {!isView ? (
        <div className="form-container">
          <BaseViewApprovedData isView={isView} />
        </div>
      ) : (
        <BaseViewApprovedData isView={isView} />
      )}
    </Fragment>
  );
};

export default ViewApprovedData;

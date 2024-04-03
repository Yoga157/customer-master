import React, { Fragment, useEffect } from "react";
import "./ModalApprovedData.scss";
import { Link, useParams } from "react-router-dom";
import BaseViewApprovedData from "./components/view/BaseViewApprovedData";

interface IProps {
  isView?: boolean;
  customerId?: number;
  status?: string;
}

const ViewApprovedData: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { isView, customerId, status } = props;

  return (
    <Fragment>
      {!isView && (
        <Link to={"/customer-setting"} className="link">
          {"< Back to Customer Setting List"}
        </Link>
      )}

      {!isView ? (
        <div className="form-container">
          <BaseViewApprovedData
            isView={isView}
            customerId={customerId}
            status={status}
          />
        </div>
      ) : (
        <BaseViewApprovedData
          isView={isView}
          customerId={customerId}
          status={status}
        />
      )}
    </Fragment>
  );
};

export default ViewApprovedData;

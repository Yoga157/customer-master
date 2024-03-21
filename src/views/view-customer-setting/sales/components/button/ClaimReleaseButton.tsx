import React, { Fragment } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Button } from "semantic-ui-react";
import "./ClaimReleaseButton.scss";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalClaimAccount from "../modal/modal-claim-account/ModalClaimAccount";
import ModalReleaseAccount from "../modal/modal-release-account/ModalReleaseAccount";
import ModalAcceptRequestShareableAccount from "../modal/modal-request-shareable/ModalRequestShareable";

interface IProps {
  customer: any;
  accountStatus: string;
  isEmployeeOwnCustomer: boolean;
  isEmployeeRequestShareable: boolean;
  role: string;
}

const ClaimReleaseButton: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const {
    customer,
    accountStatus,
    isEmployeeOwnCustomer,
    isEmployeeRequestShareable,
    role,
  } = props;
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin"));

  /** Claim Account */
  const onClaimAccount = async () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalClaimAccount customer={customer} />,
        ModalSizeEnum.Tiny
      )
    );
  };

  /** Release Account */
  const onReleaseAccount = async () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalReleaseAccount
          customer={customer}
          accountStatus={accountStatus}
        />,
        ModalSizeEnum.Tiny
      )
    );
  };

  /** Request Shareable Account */
  const onAcceptRequestShareableAccount = async () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalAcceptRequestShareableAccount customer={customer} />,
        ModalSizeEnum.Tiny
      )
    );
  };

  return (
    <Fragment>
      {/* claim no name account */}
      {accountStatus == "No Name Account" && role?.toUpperCase() == "SALES" && (
        <Button
          color="yellow"
          size="small"
          type="button"
          onClick={() => onClaimAccount()}
        >
          <Icon name="check circle" />
          Claim Account
        </Button>
      )}

      {/* release named account */}
      {accountStatus == "Named Account" &&
        isEmployeeOwnCustomer &&
        role?.toUpperCase() == "SALES" && (
          <Button
            color="red"
            size="small"
            type="button"
            onClick={() => onReleaseAccount()}
          >
            <Icon name="remove circle" />
            Release Account
          </Button>
        )}

      {/* request shareable account */}
      {accountStatus == "Named Account" &&
        !isEmployeeOwnCustomer &&
        !isEmployeeRequestShareable &&
        customer.shareableApprovalStatus.length == 0 &&
        role?.toUpperCase() == "SALES" && (
          <Button
            color="yellow"
            size="small"
            type="button"
            onClick={() => onClaimAccount()}
          >
            <Icon name="share" />
            Request Shareable Account
          </Button>
        )}

      {/* request shareable account but already get rejected */}
      {accountStatus == "Named Account" &&
        !isEmployeeOwnCustomer &&
        !isEmployeeRequestShareable &&
        customer.shareableApprovalStatus?.requestedBy == userLogin.fullName &&
        customer.shareableApprovalStatus?.status.toUpperCase() == "REJECTED" &&
        role?.toUpperCase() == "SALES" && (
          <Button
            color="yellow"
            size="small"
            type="button"
            onClick={() => onClaimAccount()}
          >
            <Icon name="share" />
            Request Shareable Account
          </Button>
        )}

      {/* already had request */}
      {accountStatus == "Named Account" &&
        !isEmployeeOwnCustomer &&
        !isEmployeeRequestShareable &&
        customer.shareableApprovalStatus.length != 0 &&
        customer.shareableApprovalStatus?.requestedBy != userLogin.fullName &&
        role?.toUpperCase() == "SALES" && (
          <Button size="small" type="button" disabled>
            <Icon name="wait" />
            Already had pending request
          </Button>
        )}

      {/* release shareable account */}
      {accountStatus == "Shareable Account" &&
        isEmployeeOwnCustomer &&
        role?.toUpperCase() == "SALES" && (
          <Button
            color="red"
            size="small"
            type="button"
            onClick={() => onReleaseAccount()}
          >
            <Icon name="remove circle" />
            Release Account
          </Button>
        )}

      {/* claim shareable account */}
      {accountStatus == "Shareable Account" &&
        !isEmployeeOwnCustomer &&
        role?.toUpperCase() == "SALES" && (
          <Button
            color="yellow"
            size="small"
            type="button"
            onClick={() => onClaimAccount()}
          >
            <Icon name="check circle" />
            Claim Account
          </Button>
        )}

      {/* already claimed shareable account */}
      {accountStatus == "Named Account" &&
        !isEmployeeOwnCustomer &&
        isEmployeeRequestShareable &&
        role?.toUpperCase() == "SALES" && (
          <Button size="small" type="button" disabled>
            <Icon name="wait" />
            Wait For Approval
          </Button>
        )}

      {/* accept shareable request */}
      {accountStatus == "Named Account" &&
        customer.shareableApprovalStatus.status?.toUpperCase() == "PENDING" &&
        role?.toUpperCase() == "ADMIN" && (
          <div className="accept-shareable-container">
            <p className="text-request-by">
              Request by {customer.shareableApprovalStatus?.requestedBy}
            </p>
            <Button
              color="red"
              size="small"
              type="button"
              onClick={() => onAcceptRequestShareableAccount()}
            >
              <Icon name="share" />
              Accept Shareable Request
            </Button>
          </div>
        )}
    </Fragment>
  );
};

export default ClaimReleaseButton;

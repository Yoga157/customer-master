import React, { Fragment } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Button } from "semantic-ui-react";
import "./ClaimReleaseButton.scss";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalNoPaddingFirstLevelActions from "stores/modal/no-padding/ModalNoPaddingActions";
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

  const isSubordinate = (employeeKey: any) => {
    if (employeeKey != undefined) {
      let foundEmployee = userLogin.hirarki.find(
        (obj) => obj.employeeID === employeeKey
      );
      return foundEmployee && userLogin.employeeKey != foundEmployee.employeeID
        ? true
        : false;
    }
    return false;
  };

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
  const onAcceptRequestAccount = async (isDirectorate, isAdmin) => {
    dispatch(
      ModalNoPaddingFirstLevelActions.OPEN(
        <ModalAcceptRequestShareableAccount
          customer={customer}
          isDirectorate={isDirectorate}
          isAdmin={isAdmin}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  return (
    <Fragment>
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

      {/* accept pending request by directorate */}
      {customer.shareableApprovalStatus.status?.toUpperCase() ==
        "PENDING_DIRECTORATE" &&
        isSubordinate(customer.shareableApprovalStatus?.requestedUserKey) && (
          <Button
            color="yellow"
            size="small"
            type="button"
            onClick={() => onAcceptRequestAccount(true, false)}
          >
            <Icon name="check circle" style={{ color: "black" }} />
            Approve/Reject Join Request
          </Button>
        )}

      {/* accept pending requets by admin */}
      {customer.shareableApprovalStatus.status?.toUpperCase() ==
        "PENDING_ADMIN" &&
        role?.toUpperCase() == "ADMIN" && (
          <Button
            color="yellow"
            size="small"
            type="button"
            onClick={() => onAcceptRequestAccount(false, true)}
          >
            <Icon name="check circle" style={{ color: "black" }} />
            Approve/Reject Join Request
          </Button>
        )}
    </Fragment>
  );
};

export default ClaimReleaseButton;

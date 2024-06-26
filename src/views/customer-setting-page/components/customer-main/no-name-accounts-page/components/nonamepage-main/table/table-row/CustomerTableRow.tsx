import React, { Fragment, useState, useCallback } from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalNoPaddingFirstLevelActions from "stores/modal/no-padding/ModalNoPaddingActions";
import * as CustomerSettingAction from "stores/customer-setting/CustomerActivityActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import "./CustomerTableRowStyle.scss";
import ClaimFormEdit from "../../modal/modal-claim-edit/FormClaim";
import ApproveReq from "../../../../../named-accounts-page/components/namepage-main/modal/modal-approverequest/FormApproveShareable";
import { useHistory } from "react-router-dom";

interface IProps {
  readonly rowData: any;
  readonly history: any;
  readonly role: string;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const { role } = props;
  const [isChecked, setIsChecked] = useState(false);
  const { rowData, getRowData, data } = props;

  const setRowData = (data) => {
    let checkData = props.data.find(
      (obj) => obj.customerID === data.customerID
    );

    if (checkData) {
      getRowData(
        props.data.filter(
          (selectedData) => selectedData.customerID !== data.customerID
        )
      );
    } else {
      getRowData([...props.data, data]);
    }
  };

  const onClaimAccount = useCallback((): void => {
    dispatch(
      ModalNoPaddingFirstLevelActions.OPEN(
        <ClaimFormEdit rowData={[rowData]} />,
        ModalSizeEnum.Small
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onEdit = (id: number) => {
    history.push({
      pathname: "customer-setting/" + id,
      state: { rowData, activeTab: 1 },
    });
  };

  // mengecek apakah sales yang melakukan request ada di hirarki
  const isSubordinate = (employeeKey: any) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

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

  const onApproveRequestAccount = useCallback((): void => {
    let isDirectorate =
      isSubordinate(rowData.salesHistory?.salesKey) && role != "Admin";

    dispatch(
      ModalFirstLevelActions.OPEN(
        <ApproveReq
          rowData={[rowData]}
          isDirectorate={isDirectorate}
          isAdmin={!isDirectorate}
          refreshFunc={CustomerSettingAction.requestNoNameAcc}
        />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  return (
    <Fragment>
      {rowData && data && (
        <Table.Row key={rowData.CustomerID}>
          <Table.Cell width="1">
            <div className="container-center">
              <div>
                <label style={{ margin: "0.8rem", verticalAlign: "middle" }}>
                  <input
                    type="checkbox"
                    onChange={() => setRowData(rowData)}
                    checked={
                      data.find((item) => item.customerID == rowData.customerID)
                        ? true
                        : false
                    }
                    disabled={
                      role === "Admin" ||
                      role === "Marketing" ||
                      rowData.industryClass === null ||
                      rowData.salesHistory?.status === "PENDING_DIRECTORATE" ||
                      rowData.salesHistory?.status === "PENDING_ADMIN"
                    }
                  ></input>
                </label>
              </div>
              <Dropdown pointing="left" icon="ellipsis vertical">
                <Dropdown.Menu>
                  {role === "Sales" && (
                    <>
                      <Dropdown.Item
                        text="Claim Account"
                        icon="circle check"
                        onClick={onClaimAccount}
                        disabled={
                          rowData.industryClass === null ||
                          rowData.salesHistory?.status ===
                            "PENDING_DIRECTORATE" ||
                          rowData.salesHistory?.status === "PENDING_ADMIN"
                        }
                      />

                      {rowData.salesHistory?.status == "PENDING_DIRECTORATE" &&
                        isSubordinate(rowData.salesHistory?.salesKey) && (
                          <>
                            <Dropdown.Item
                              text="View/Edit"
                              icon="edit outline"
                              onClick={() => onEdit(rowData.customerID)}
                            />
                            <Dropdown.Item
                              text="Approve Claim Request"
                              icon="circle check"
                              onClick={onApproveRequestAccount}
                            />
                          </>
                        )}

                      {rowData.status !== "CANCEL" &&
                        rowData.CustomerID === "" && (
                          <Dropdown.Item text="Cancel" icon="remove circle" />
                        )}
                    </>
                  )}

                  {role === "Admin" && (
                    <>
                      <Dropdown.Item
                        text="View/Edit"
                        icon="edit outline"
                        onClick={() => onEdit(rowData.customerID)}
                      />
                      {rowData.salesHistory?.status == "PENDING_ADMIN" && (
                        <>
                          <Dropdown.Item
                            text="Approve Claim Request"
                            icon="circle check"
                            onClick={onApproveRequestAccount}
                          />
                        </>
                      )}
                    </>
                  )}

                  {role === "Marketing" && (
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.customerID)}
                    />
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Table.Cell>
          <Table.Cell textAlign="center">
            <div className="status-noNameAccount">
              <p style={{ fontSize: "1rem", textAlign: "center" }}>
                {" "}
                No Name Accounts{" "}
              </p>{" "}
            </div>
          </Table.Cell>
          <Table.Cell textAlign="center">{rowData.jdeCustomerID}</Table.Cell>
          <Table.Cell textAlign="center">{rowData.customerGenID}</Table.Cell>
          <Table.Cell textAlign="center">{rowData.industryClass}</Table.Cell>
          <Table.Cell>
            <div className="row-customerName">
              <p style={{ fontSize: "1rem" }}> {rowData.customerName}</p>{" "}
            </div>
          </Table.Cell>
          <Table.Cell>
            {" "}
            <div className="row-customerAddres">
              <p style={{ fontSize: "1rem" }}> {rowData.customerAddress}</p>{" "}
            </div>
          </Table.Cell>
          <Table.Cell textAlign="center">
            {rowData.blacklist === true ? (
              <div className="row-blacklist-yes">
                <Icon name="address book" size="small" />
                <span>Yes</span>
              </div>
            ) : (
              <div className="row-blacklist-no">
                <Icon name="address book" size="small" />
                <span>No</span>
              </div>
            )}
          </Table.Cell>
          <Table.Cell textAlign="center">
            {rowData.holdshipment === true ? (
              <div className="row-holdshipment-yes">
                <Icon name="truck" size="small" />
                <span>Yes</span>
              </div>
            ) : (
              <div className="row-holdshipment-no">
                <Icon name="truck" size="small" />
                <span>No</span>
              </div>
            )}
          </Table.Cell>
          <Table.Cell textAlign="center">
            <div className="row-created">
              <p
                style={{
                  fontSize: "1rem",
                  color: "#46494c",
                }}
              >
                {" "}
                {rowData.createdBy}
              </p>{" "}
            </div>
          </Table.Cell>
          <Table.Cell>
            {" "}
            <div className="row-created">
              <p
                style={{
                  fontSize: "1rem",
                  color: "#46494c",
                }}
              >
                {" "}
                {rowData.createdDate}
              </p>{" "}
            </div>
          </Table.Cell>
          <Table.Cell>
            {" "}
            <div className="row-created">
              <p
                style={{
                  fontSize: "1rem",
                  color: "#46494c",
                }}
              >
                {" "}
                {rowData.modifiedBy}
              </p>{" "}
            </div>{" "}
          </Table.Cell>
          <Table.Cell>
            <div className="row-created">
              <p
                style={{
                  fontSize: "1rem",
                  color: "#46494c",
                }}
              >
                {" "}
                {rowData.modifiedDate}
              </p>{" "}
            </div>
          </Table.Cell>
        </Table.Row>
      )}
    </Fragment>
  );
};

export default CustomerTableRow;

import React, { Fragment, useState, useCallback } from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import "./CustomerTableRowStyle.scss";
import ClaimForm from "../../form/form-claim/FormClaim";
import { useHistory } from "react-router-dom";
import RequestForm from "../../form/form-reqshareaccount/FormReqShare";
import ApproveReq from "../../form/form-release/FormRelease";
import ShareableReq from "../../form/modal-approverequest/ModalApproveShareable";

interface IProps {
  readonly rowData: any;
  readonly history: any;
  readonly role: string;
  readonly myAccount: boolean;
  readonly filterData: any;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const history = useHistory();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const { rowData, getRowData } = props;
  const { role } = props;
  const userId: any = JSON.parse(localStorage.getItem("userLogin"));

  const onRequestAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <RequestForm rowData={[rowData]} />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onApproveShareable = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ShareableReq
          rowData={[rowData]}
          isDirectorate={true}
          isAdmin={false}
        />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onReleaseAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ApproveReq
          rowData={[rowData]}
          filterData={props.filterData}
          myAccount={props.myAccount}
        />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onClaimAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ClaimForm rowData={[rowData]} />,
        ModalSizeEnum.Tiny
      )
    );
  }, [dispatch, rowData]);

  const onEdit = (id: number) => {
    history.push({
      pathname: `customer-setting/${id}`,
      state: { rowData },
    });
  };

  return (
    <Fragment>
      <Table.Row
        key={rowData.CustomerID}
        style={{
          backgroundColor:
            rowData.requestedBy === userId?.fullName &&
            rowData.status?.toUpperCase() === "REJECTED"
              ? "#ffe0d9"
              : rowData.status?.toUpperCase() === "APPROVE"
              ? "#00FF7F"
              : role === "Marketing" &&
                rowData.approvalStatus?.toUpperCase() == "REJECT"
              ? "#FFE0D9"
              : role === "Marketing" &&
                rowData.approvalStatus?.toUpperCase() == "PENDING"
              ? "#FFF7CB"
              : role === "Marketing" &&
                rowData.approvalStatus?.toUpperCase() == "APPROVE"
              ? "#ECF9C6"
              : role === "Sales" && rowData.isNew == true
              ? "#fffb9a"
              : "",
        }}
      >
        <Table.Cell width="4">
          <div className="table-row-container">
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                {(rowData.isNew ||
                  rowData?.salesName?.includes(userId.fullName) ||
                  role === "Admin" ||
                  role === "Marketing") && (
                  <Dropdown.Item
                    text="View/Edit"
                    icon="edit outline"
                    // disabled={rowData.approvalStatus?.toUpperCase() == "REJECT"}
                    onClick={() =>
                      onEdit(
                        rowData.isNew
                          ? rowData.customerGenID
                          : rowData.customerID
                      )
                    }
                  />
                )}

                {rowData.named === false &&
                  rowData.shareable === false &&
                  rowData.isNew === false &&
                  role === "Sales" && (
                    <Dropdown.Item
                      text="Claim Account"
                      icon="circle check"
                      onClick={onClaimAccount}
                    />
                  )}

                {rowData.named === true && role === "Admin" && (
                  <>
                    {rowData.status != "Rejected" && (
                      <Dropdown.Item
                        text="Approve Shareable Request"
                        icon="circle check"
                        onClick={onApproveShareable}
                      />
                    )}
                  </>
                )}

                {rowData.named === true && role === "Sales" && (
                  <>
                    {rowData.salesName != userId.fullName &&
                      rowData.status != "Pending" && (
                        <Dropdown.Item
                          text="Request Share Account"
                          icon="share"
                          onClick={onRequestAccount}
                        />
                      )}

                    {rowData.salesName.includes(userId.fullName) && (
                      <Dropdown.Item
                        text="Realease Account"
                        icon="times circle"
                        onClick={onReleaseAccount}
                      />
                    )}
                  </>
                )}

                {rowData.shareable === true && role === "Sales" && (
                  <>
                    {rowData.salesName.includes(userId.fullName) && (
                      <Dropdown.Item
                        text="Release Account"
                        icon="times circle"
                        onClick={onReleaseAccount}
                      />
                    )}
                  </>
                )}

                {/* {rowData.status != "CANCEL" && rowData.customerID == "" && (
                  <Dropdown.Item text="Cancel" icon="remove circle" />
                )} */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Table.Cell>
        <Table.Cell>
          {rowData.named === false &&
            rowData.shareable === false &&
            rowData.isNew === false && (
              <div className="no-name-label">
                <p className="label-text">No Name Accounts</p>
              </div>
            )}

          {rowData.named === true && (
            <div className="named-label">
              <p className="label-text">Named Accounts</p>
            </div>
          )}

          {rowData.shareable === true && rowData.named === false && (
            <div className="shareable-label">
              <p className="label-text">Shareable Accounts</p>
            </div>
          )}

          {rowData.isNew === true && (
            <div className="new-account-label">
              <p className="label-text">New Accounts</p>
            </div>
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.JDECustId ? rowData.jdeCustomerID : "-"}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.customerID == 0 ? "-" : rowData.customerID}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.IndustryClass == null ? "-" : rowData.industryClass}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.customerCategory == null ? "-" : rowData.customerCategory}
        </Table.Cell>
        <Table.Cell>
          <div className="name-container">
            <p className="head-text"> {rowData.customerName}</p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>
          {" "}
          <div className="address-container">
            <p
              style={{ fontSize: "1rem" }}
              dangerouslySetInnerHTML={{ __html: rowData.customerAddress }}
            ></p>
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="project-container">
            <p className="head-text">
              {" "}
              {rowData.lastProjectName == null ? "-" : rowData.lastProjectName}
            </p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>
          {" "}
          <div className="sales-container">
            <p className="head-text">
              {" "}
              {rowData.salesName == null ? "-" : rowData.salesName}{" "}
            </p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.isNew === true ? (
            "-"
          ) : rowData.pmoCustomer === true ? (
            <div style={{ textAlign: "center" }}>
              <span>Yes</span>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell>
          {" "}
          <div className="related-customer-container">
            <p className="head-text">
              {rowData.relatedCustomer == null ? "-" : rowData.relatedCustomer}
            </p>
          </div>
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {rowData.blacklist === true ? (
            <div className="blacklist-yes">
              <Icon name="address book" size="small" />
              <span>Yes</span>
            </div>
          ) : (
            <div className="blacklist-no">
              <Icon name="address book" size="small" />
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.holdshipment === true ? (
            <div className="holdshipment-yes">
              <Icon name="truck" size="small" />
              <span>Yes</span>
            </div>
          ) : (
            <div className="holdshipment-no">
              <Icon name="truck" size="small" />
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">
          <div className="created-container">
            <p className="head-text"> {rowData.createdBy}</p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>
          {" "}
          <div className="created-container">
            <p className="head-text"> {rowData.createdDate}</p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>
          {" "}
          <div className="created-container">
            <p className="head-text"> {rowData.modifiedBy}</p>{" "}
          </div>{" "}
        </Table.Cell>
        <Table.Cell>
          <div className="created-container">
            <p className="head-text"> {rowData.modifiedDate}</p>{" "}
          </div>
        </Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default CustomerTableRow;

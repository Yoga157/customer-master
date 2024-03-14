import React, { useEffect, useState } from "react";
import { Table, Dropdown, Button } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import ModalSizeEnum from "constants/ModalSizeEnum";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import styles from "../DedicatedResourcesServiceTable.module.scss";
import ApproveReject from "../../form/form-create/ApproveReject/ApproveReject";
import Terminate from "../../form/form-create/Terminate/Terminate";
import { Link } from "react-router-dom";
import ProjectHistory from "../../form/form-create/ProjectHistory/ProjectHistory";
import ReceiveDocument from "../../form/form-create/ReceiveDocument/ReceiveDocument";
import ReturnDocument from "../../form/form-create/ReturnDocument/ReturnDocument";
import SendDocument from "../../form/form-create/SendDocument/SendDocument";
import IDedicatedResourceTableRow from "selectors/dedicated-resources/models/IDedicatedResourceTableRow";
import "./DedicatedResourcesTableRowStyle.scss";
import moment from "moment";
import PrintDR from "../../prints/PrintDR";

interface IProps {
  readonly rowData: IDedicatedResourceTableRow;
  // readonly rowData: any;
}

const DedicatedResourcesTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const { rowData } = props;
  const viewARPopUp = () => {
    // dispatch(ModalFirstLevelActions.OPEN(<AWSBillingService item={rowData} id={1} type={'Edit'} />, ModalSizeEnum.Large));
  };

  const viewProjectHistory = (EmployeeID) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ProjectHistory EmployeeID={EmployeeID} />,
        ModalSizeEnum.Large
      )
    );
  };

  const ApproveRejectPopUp = (contractID) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ApproveReject contractID={contractID} />,
        ModalSizeEnum.Small
      )
    );
  };

  const TerminatePopUp = (contractID) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <Terminate contractID={contractID} />,
        ModalSizeEnum.Small
      )
    );
  };

  const ReceiveDocumentPopUp = (contractID) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ReceiveDocument contractID={contractID} />,
        ModalSizeEnum.Small
      )
    );
  };

  const ReturnDocumentPopUp = (contractID) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ReturnDocument contractID={contractID} />,
        ModalSizeEnum.Small
      )
    );
  };

  const ReturnSendDocumentPopUp = (contractID) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <SendDocument contractID={contractID} />,
        ModalSizeEnum.Small
      )
    );
  };

  return (
    <>
      <Table.Row
        className={
          rowData.statusApprovalSubmit === "COMPLETED"
            ? styles.FullApproved
            : rowData.statusApprovalSubmit === "WAITING APPROVAL" &&
              currentUser.userName === rowData.statusApprovalSubmitOwner
            ? styles.MyWaitingApproval
            : rowData.statusApprovalSubmit === "REJECTED"
            ? styles.Rejected
            : "none"
        }
      >
        <Table.Cell width="1" textAlign="center">
          {currentUser.role === "Admin" && rowData.flagView === 0 ? (
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
              {rowData.flagButtonDocument === "Sent" || rowData.flagButtonDocument === "Received" || rowData.flagButtonDocument === "Return" ? (
                  <Dropdown.Item
                    text="Send Document"
                    icon="paper plane outline"
                    onClick={() => ReturnSendDocumentPopUp(rowData.contractID)}
                  />
                ) : null}
                {
                   rowData.flagButtonDocument === "Received" || rowData.flagButtonDocument === "Return" ? (
                    <Dropdown.Item
                      text="Receive Document"
                      icon="handshake outline"
                      onClick={() => ReceiveDocumentPopUp(rowData.contractID)}
                    />
                  )
                  :
                  null
                }
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                {/* User yang dapat mengakses halaman view edit hanya Service Manajer, IS Director, dan HR ComBen */}
               
                  <Dropdown.Item
                    text="View/Edit"
                    to={`/dedicated-resources/${rowData.contractID}`}
                    icon="edit outline"
                    as={Link}
                    target={"_blank"}
                    onClick={() => {
                      window.localStorage.setItem(
                        "StatusApproval",
                        JSON.stringify(rowData.statusApprovalSubmit)
                      );
                    }}
                  />
                
                {currentUser.userName === rowData.statusApprovalSubmitOwner && (
                  <Dropdown.Item
                    text="Approve or Reject"
                    icon="check circle outline"
                    onClick={() => ApproveRejectPopUp(rowData.contractID)}
                  />
                )}

                <Dropdown.Item
                  text="View Activity Report"
                  icon="file alternate outline"
                  as={Link}
                  target={"_blank"}
                  onClick={() => {
                  window.localStorage.setItem(
                      "TempDedicated",
                      JSON.stringify([])
                    )
                    const newItems = [
                      ...JSON.parse(localStorage.getItem("TempDedicated")),
                      rowData,
                    ];
                    window.localStorage.setItem(
                      "TempDedicated",
                      JSON.stringify(newItems)
                    );
                  }}
                  to={`activity-report/${rowData.employeeID}`}
                />
                <Dropdown.Item
                  text="Terminate"
                  icon="times"
                  onClick={() => TerminatePopUp(rowData.contractID)}
                />
                <Dropdown.Item
                  text="Contract & Project History"
                  icon="history"
                  onClick={() => viewProjectHistory(rowData.employeeID)}
                />
                {rowData.flagButtonDocument === "Sent" || rowData.flagButtonDocument === "Received" || rowData.flagButtonDocument === "Return" ? (
                  <Dropdown.Item
                    text="Send Document"
                    icon="paper plane outline"
                    onClick={() => ReturnSendDocumentPopUp(rowData.contractID)}
                  />
                ) : null}
                {
                   rowData.flagButtonDocument === "Received" || rowData.flagButtonDocument === "Return" ? (
                    <Dropdown.Item
                      text="Receive Document"
                      icon="handshake outline"
                      onClick={() => ReceiveDocumentPopUp(rowData.contractID)}
                    />
                  ) : null
                }
               
                {
                  rowData.flagButtonDocument === "Return" && rowData.employeeName === currentUser.fullName ?
                  (<Dropdown.Item
                    text="Return Document"
                    icon="print"
                    onClick={() => ReturnDocumentPopUp(rowData.contractID)}
                  />)
                  :
                  null
                }

                <Dropdown.Item
                  text="Print"
                  icon="print"
                  onClick={() => dispatch(ModalFirstLevelActions.OPEN(<PrintDR contractID={`${rowData.contractID}`} />, ModalSizeEnum.Large))}
                />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Table.Cell>
        <Table.Cell>{rowData.employeeID}</Table.Cell>
        <Table.Cell>{rowData.employeeName}</Table.Cell>
        <Table.Cell>{rowData.employeeDept}</Table.Cell>
        <Table.Cell>{rowData.supervisorName}</Table.Cell>
        <Table.Cell>{rowData.employeeClassName}</Table.Cell>
        <Table.Cell>{rowData.lastProjectName}</Table.Cell>
        <Table.Cell>
          {rowData.lastContractBeginDate &&
            moment(rowData.lastContractBeginDate).format("DD MMMM yyyy")}
        </Table.Cell>
        <Table.Cell>
          {" "}
          {rowData.lastContractEndDate &&
            moment(rowData.lastContractEndDate).format("DD MMMM yyyy")}{" "}
        </Table.Cell>
        <Table.Cell>
          {" "}
          {rowData.newContractBeginDate &&
            moment(rowData.newContractBeginDate).format("DD MMMM yyyy")}{" "}
        </Table.Cell>
        <Table.Cell>
          {" "}
          {rowData.newContractEndDate &&
            moment(rowData.newContractEndDate).format("DD MMMM yyyy")}{" "}
        </Table.Cell>
        <Table.Cell> {rowData.days} </Table.Cell>
        <Table.Cell> {rowData.contractNo} </Table.Cell>
        <Table.Cell className="DedicatedStatusBtn">
          <Button
            type="button"
            // color={
            //   rowData.contractStatusName === 'Full Approval'
            //     ? 'green'
            //     : rowData.contractStatusName === 'Reject'
            //     ? 'blue'
            //     : rowData.contractStatusName === 'My Waiting Approval'
            //     ? 'yellow'
            //     : rowData.contractStatusName === 'Close Lose'
            // }
            className={
              rowData.statusApprovalSubmit === "COMPLETED"
                ? "approval"
                : rowData.statusApprovalSubmit === "WAITING APPROVAL" &&
                  currentUser.userName === rowData.statusApprovalSubmitOwner
                ? "my-waiting-approval"
                : rowData.statusApprovalSubmit === "REJECTED"
                ? "rejected"
                : "none"
            }
          >
            {rowData.statusApprovalSubmit} {rowData.statusApprovalSubmitOwner}
          </Button>{" "}
        </Table.Cell>
        <Table.Cell> {rowData.contractStatusName} </Table.Cell>
        <Table.Cell> {rowData.returnDoc} </Table.Cell>
        <Table.Cell> {rowData.submittedByName} </Table.Cell>
        <Table.Cell> {rowData.submittedDate} </Table.Cell>
        <Table.Cell> {rowData.contractAdmin} </Table.Cell>
      </Table.Row>
    </>
  );
};

export default DedicatedResourcesTableRow;

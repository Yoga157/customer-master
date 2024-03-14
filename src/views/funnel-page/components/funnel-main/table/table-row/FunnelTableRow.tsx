import React, { Fragment, useEffect, useState } from "react";
import { Table, Dropdown, Confirm, Button, Icon } from "semantic-ui-react";
import IFunnelTableRow from "selectors/funnel/models/IFunnelTableRow";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ReAssignSales from "views/customer-transfer-page/components/reassign/ReAssignSales";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { format } from "date-fns";
import * as FunnelActions from "stores/funnel/FunnelActions";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import FunnelNotesForm from "views/funnel-page/components/funnel-activity/form/FunnelNotesForm";
import "./FunnelTableRowStyle.scss";
import ReactHtmlParser from "react-html-parser";
// import RequestProjectOpen from './components/form/RequestProjectOpen';
import RouteEnum from "constants/RouteEnum";
import FormDirectManagerApproval from "../../form/form-edit/child-edit/main-content/approval-steps/components/FormDirectManagerApproval";
import CardSubmitFunnel from "../../form/form-edit/child-edit/main-content/approval-steps/components/CardSubmitFunnel";
import PrintSA from "../../components/prints/PrintSA";
import RequestProjectOpen from "../../form/form-edit/child-edit/main-content/funnel-status/components/form/RequestProjectOpen";
import CancelProject from "../../form/form-edit/child-edit/main-content/funnel-status/components/form/CancelProject";
import AssignSalesAdmin from "./components/form/AssignSalesAdmin";
import HistoryGPM from "./components/table/HistoryGPM";

interface IProps {
  readonly rowData: IFunnelTableRow;
  readonly tabItem: string;
  readonly presalesViewPrivilage: number;
}

const FunnelTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { tabItem } = props;
  const dispatch: Dispatch = useDispatch();
  const history = useHistory();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const confColumns = useSelector((state: IStore) => state.funnel.columns);
  const isExportExl = useSelector((state: IStore) => state.funnel.isExportExl);

  const { rowData, presalesViewPrivilage } = props;

  const reassignClick = (
    funnelGenID: number,
    funnelID: string,
    salesId: number,
    salesFromText: string,
    tabItem: string
  ) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ReAssignSales
          funnelGenID={funnelGenID}
          funnelID={funnelID}
          salesFrom={salesId}
          salesFromText={salesFromText}
          tabItem={tabItem}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const showConfirmCancel = () => setOpenConfirm(true);

  const handleConfirm = () => {
    if (tabItem === "salesAnalysis") {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <CancelProject
            funnelGenID={+rowData.funnelGenID}
            page="funnel-list-sa"
          />,
          ModalSizeEnum.Tiny
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <FunnelNotesForm
            funnelGenID={rowData.funnelGenID.toString()}
            fromForm="FormCancel"
          />,
          ModalSizeEnum.Tiny
        )
      );
    }
    setOpenConfirm(false);
  };

  const handleCancel = () => setOpenConfirm(false);

  const handleCopyProject = (genID) => {
    history.push({
      pathname: RouteEnum.FunnelForm,
      state: {
        typePage: "copy-project",
        funnelGenID: genID,
        tab: tabItem == "salesAnalysis" ? "list-sa" : "funnel",
      },
    });
  };

  const sttsWorkflow = (type: string): string => {
    let typeClass: string;
    if (type?.split(" ")[0] === "REJECTED") {
      typeClass = "bg-danger";
    } else if (type?.split(" ")[0] === "Waiting") {
      typeClass = "bg-warning";
    } else if (type?.split(" ")[0] === "COMPLETED") {
      typeClass = "bg-success";
    }

    return typeClass;
  };

  return (
    <Fragment>
      <Confirm
        open={openConfirm}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        centered
        size="tiny"
      />

      <Table.Row
        className={
          rowData.commercialWorkflowStatus.includes("REJECTED") ||
          rowData.serviceWorkflowStatus.includes("REJECTED")
            ? "rejected"
            : (rowData.commercialWorkflowStatus.includes("COMPLETED") &&
                rowData.serviceWorkflowStatus.includes("COMPLETED")) ||
              (rowData.commercialWorkflowStatus.includes("COMPLETED") &&
                rowData.serviceWorkflowStatus.includes("-"))
            ? "completed"
            : rowData.commercialWorkflowStatus
                .toLowerCase()
                .includes(currentUser.userName) ||
              rowData.serviceWorkflowStatus
                .toLowerCase()
                .includes(currentUser.userName)
            ? "approval"
            : ""
        }
        key={rowData.funnelGenID}
      >
        {!isExportExl && (
          <Table.Cell width="1">
            <Dropdown
              className="dropdownLeftCstm"
              pointing="left"
              icon="ellipsis vertical"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  to={`/funnel-form/${rowData.funnelGenID}`}
                  as={Link}
                  text="View/Edit"
                  icon="edit outline"
                  target={"_blank"}
                />

                {(currentUser.role === "Sales" ||
                  rowData.stepName === "Sales Admin") && (
                  <Fragment>
                    {(rowData.salesID === currentUser.employeeID ||
                      (rowData.stepName === "Sales Admin" &&
                        rowData.flagSA === 1)) && (
                      <Dropdown.Item
                        text="Cancel"
                        icon="cancel"
                        onClick={handleConfirm}
                      />
                    )}
                  </Fragment>
                )}

                {currentUser.role === "Sales" && (
                  <Dropdown.Item
                    text="Reassign Sales"
                    icon="users"
                    onClick={() =>
                      reassignClick(
                        rowData.funnelGenID,
                        rowData.funnelID,
                        rowData.salesID,
                        rowData.salesName,
                        tabItem
                      )
                    }
                  />
                )}

                {tabItem == "salesAnalysis" &&
                  currentUser.role === "Sales Admin" && (
                    <Dropdown.Item
                      text="Assign Sales Admin"
                      icon="user outline"
                      onClick={() =>
                        dispatch(
                          ModalFirstLevelActions.OPEN(
                            <AssignSalesAdmin
                              rowData={rowData}
                              page="funnel-list"
                            />,
                            ModalSizeEnum.Small
                          )
                        )
                      }
                    />
                  )}

                {rowData.funnelStatus === "Close Win" &&
                  rowData.salesID === currentUser.employeeID && (
                    <Dropdown.Item
                      text="Submit"
                      icon="save"
                      onClick={() =>
                        dispatch(
                          ModalFirstLevelActions.OPEN(
                            <CardSubmitFunnel
                              funnelGenID={`${rowData.funnelGenID}`}
                              page="funnel-list"
                              type={
                                tabItem == "salesAnalysis" ? "sa" : "funnel"
                              }
                            />,
                            ModalSizeEnum.Mini
                          )
                        )
                      }
                    />
                  )}

                {tabItem == "salesAnalysis" && rowData.flagOpen === "close" && (
                  <Dropdown.Item
                    text="Open Project"
                    icon="lock"
                    onClick={() =>
                      dispatch(
                        ModalFirstLevelActions.OPEN(
                          <RequestProjectOpen
                            funnelGenID={rowData.funnelGenID}
                            page="funnel-list-sa"
                          />,
                          ModalSizeEnum.Mini
                        )
                      )
                    }
                  />
                )}

                {tabItem == "salesAnalysis" && rowData.flagSA === 1 && (
                  <Dropdown.Item
                    text="Approve/Reject"
                    icon="check"
                    onClick={() =>
                      dispatch(
                        ModalFirstLevelActions.OPEN(
                          <FormDirectManagerApproval
                            funnelGenID={`${rowData.funnelGenID}`}
                            page="funnel-list-sa"
                          />,
                          ModalSizeEnum.Mini
                        )
                      )
                    }
                  />
                )}

                {(currentUser.role === "Sales" ||
                  currentUser.role === "SuperAdmin") && (
                  <Dropdown.Item
                    text="Copy Project"
                    icon="copy outline"
                    onClick={() => handleCopyProject(rowData.funnelGenID)}
                  />
                )}

                {tabItem == "salesAnalysis" &&
                  (currentUser.role === "Sales" || presalesViewPrivilage > -1 ||
                    currentUser.role === "Sales Admin") && (
                    <Dropdown.Item
                      text="History Revisi GPM"
                      icon="history"
                      onClick={() =>
                        dispatch(
                          ModalFirstLevelActions.OPEN(
                            <HistoryGPM
                              funnelGenID={`${rowData.funnelGenID}`}
                              from="funnelList"
                            />,
                            ModalSizeEnum.Large
                          )
                        )
                      }
                    />
                  )}

                {tabItem == "salesAnalysis" && (
                  <Dropdown.Item
                    text="Print"
                    icon="print"
                    onClick={() =>
                      dispatch(
                        ModalFirstLevelActions.OPEN(
                          <PrintSA funnelGenID={`${rowData.funnelGenID}`} />,
                          ModalSizeEnum.Large
                        )
                      )
                    }
                  />
                )}
                {/* <Dropdown.Item text="History" icon="history" onClick={() => alert('history')} /> */}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        )}

        <Table.Cell>{rowData.funnelGenID}</Table.Cell>
        <Table.Cell>{rowData.salesName}</Table.Cell>

        <Table.Cell>{rowData.dept}</Table.Cell>
        {(currentUser.role === "Presales" ||
          currentUser.role === "Product Manager") && (
          <Table.Cell>
            {currentUser.role === "Presales"
              ? ReactHtmlParser(rowData.presalesName)
              : ReactHtmlParser(rowData.productManager)}
          </Table.Cell>
        )}

        {tabItem == "salesAnalysis" && (
          <>
            <Table.Cell>{rowData.soParent}</Table.Cell>
            <Table.Cell>{rowData.soidc}</Table.Cell>
            <Table.Cell>{rowData.saNumber}</Table.Cell>
            <Table.Cell>
              {format(new Date(rowData.saDate), "dd-MM-yyyy")}
            </Table.Cell>
          </>
        )}

        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.projectName}</Table.Cell>

        {(currentUser.role === "Sales" || presalesViewPrivilage > -1 ||
          currentUser.role === "Sales Admin") && (
          <Fragment>
            <Table.Cell data-t="n">
              {isExportExl
                ? rowData.totalOrderingItem * 1000000
                : rowData.totalOrderingItem?.toLocaleString()}
            </Table.Cell>
            <Table.Cell data-t="n">
              {isExportExl
                ? rowData.totalSellingPrice * 1000000
                : rowData.totalSellingPrice?.toLocaleString()}
            </Table.Cell>
            <Table.Cell>{rowData.currency}</Table.Cell>
            <Table.Cell>{rowData.rate?.toLocaleString()}</Table.Cell>
            <Table.Cell>{rowData.gpmPctg?.toLocaleString()}%</Table.Cell>
            <Table.Cell data-t="n">
              {isExportExl
                ? rowData.gpmAmount * 1000000
                : rowData.gpmAmount?.toLocaleString()}
            </Table.Cell>
          </Fragment>
        )}

        {(currentUser.role === "Presales" ||
          currentUser.role === "Product Manager") && (
          <Fragment>
            <Table.Cell data-t="n">
              {isExportExl
                ? rowData.totalOrderingItem * 1000000
                : rowData.totalOrderingItem?.toLocaleString()}
            </Table.Cell>
          </Fragment>
        )}
        <Table.Cell>
          {format(new Date(rowData.dealCloseDate), "MMM yyyy")}
        </Table.Cell>
        <Table.Cell>
          {format(new Date(rowData.createDate), "dd-MM-yyyy")}
        </Table.Cell>

        {tabItem == "funnel" && (
          <Table.Cell className="FunnelStatusBtn">
            <Button
              type="button"
              color={
                rowData.funnelStatus === "Close Win"
                  ? "green"
                  : rowData.funnelStatus === "Best Few"
                  ? "blue"
                  : rowData.funnelStatus === "In Funnel"
                  ? "yellow"
                  : rowData.funnelStatus === "Close Lose"
                  ? "red"
                  : rowData.funnelStatus === "Cancel"
                  ? "purple"
                  : "grey"
              }
            >
              {rowData.funnelStatus}
            </Button>
          </Table.Cell>
        )}

        {tabItem == "salesAnalysis" && (
          <>
            <Table.Cell>
              {rowData.commercialWorkflowStatus &&
                rowData.commercialWorkflowStatus !== "-" && (
                  <Icon
                    size="small"
                    name="warning"
                    className={`ic-rounded-14 ${sttsWorkflow(
                      rowData.commercialWorkflowStatus
                    )}`}
                  />
                )}
              {rowData.commercialWorkflowStatus}
            </Table.Cell>
            <Table.Cell>
              {rowData.serviceWorkflowStatus &&
                rowData.serviceWorkflowStatus !== "-" && (
                  <Icon
                    size="small"
                    name="warning"
                    className={`ic-rounded-14 ${sttsWorkflow(
                      rowData.serviceWorkflowStatus
                    )}`}
                  />
                )}
              {rowData.serviceWorkflowStatus}
            </Table.Cell>
            <Table.Cell>
              {rowData.reopenProjectStatusApproval}
            </Table.Cell>
          </>
        )}
        {confColumns.flagManual && (
          <Table.Cell>{rowData.flagManual}</Table.Cell>
        )}
        {confColumns.lastNotesActivityThisWeek && tabItem == "funnel" && (
          <Table.Cell>
            {ReactHtmlParser(rowData.lastNotesActivityThisWeek)}
          </Table.Cell>
        )}
        {confColumns.lastNotesActivityPrevWeek && tabItem == "funnel" && (
          <Table.Cell>
            {ReactHtmlParser(rowData.lastNotesActivityPrevWeek)}
          </Table.Cell>
        )}

        {isExportExl && <Table.Cell></Table.Cell>}
        {/*<Table.Cell>{rowData.flagManual}</Table.Cell>
         <Table.Cell>{(ReactHtmlParser(rowData.lastNotesActivity))}</Table.Cell> */}
      </Table.Row>
    </Fragment>
  );
};

export default FunnelTableRow;

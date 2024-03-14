import React, { Fragment } from "react";
import { Button, Dropdown, Icon, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IStore from "models/IStore";
import { format } from "date-fns";
import { Dispatch } from "redux";

// import NotifSelectStatus from 'views/pmo-page/page/pmo-view-detail/components/pmo-edit-status/components/handle-select/NotifSelectStatus';
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalNoPaddingActions from "stores/modal/no-padding/ModalNoPaddingActions";
import ReassignPMOS from "./components/form/ReassignPMOS";
import styles from "./PMOTableRowStyles.module.scss";
import * as PMOActions from "stores/pmo/PMOActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import FormPMO from "../../form/FormPMO";

function PMOTableRow({ rowData }: any) {
  const dispatch: Dispatch = useDispatch();
  const isExportExcel: any = useSelector(
    (state: IStore) => state.pmo.isExportExcel
  );

  const sttsWarranty = (type: string): any => {
    let sttsColor: {};
    if (type?.trim() === "Not Active") {
      sttsColor = {
        typeClass: "bg-danger",
        ic: "delete",
      };
    } else {
      sttsColor = {
        typeClass: "bg-success",
        ic: "check",
      };
    }

    return sttsColor;
  };

  const bgStatus = (status: string): any => {
    let color = {};
    switch (status) {
      case "Not Started":
        color = { bgRow: "", text: "text-black", bg: "bg-gray-light" };
        break;
      case "On Progress":
        color = { bgRow: "", text: "text-white", bg: "bg-purple2" };
        break;
      case "On Hold":
        color = { bgRow: "row-hold", text: "text-black", bg: "bg-yellow" };
        break;
      case "Handover to SMO":
        color = { bgRow: "", text: "text-white", bg: "bg-green" };
        break;
      case "Handover to Berca Support":
        color = { bgRow: "", text: "text-white", bg: "bg-purple1" };
        break;
      case "Handover 3rd":
        color = { bgRow: "", text: "text-white", bg: "bg-brown" };
        break;
      case "Completed":
        color = { bgRow: "row-completed", text: "text-white", bg: "bg-blue" };
        break;
      case "Void":
        color = { bgRow: "row-void", text: "text-white", bg: "bg-red" };
        break;
      default:
        color = { bgRow: "", text: "text-black", bg: "bg-white" };
    }
    return color;
  };

  return (
    <Fragment>
      <Table.Row className={bgStatus(rowData.projectStatus).bgRow}>
        {!isExportExcel && (
          <Table.Cell>
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                {/* <Dropdown.Item
                  text="Change Status"
                  icon="sliders"
                  onClick={() => {
                    dispatch(
                      ModalFirstLevelActions.OPEN(
                        <NotifSelectStatus
                          page="pmo-list"
                          status="ho-to-smo"
                          funnelGenID={`${rowData.funnelGenId}`}
                          projectId={`${rowData.projectId}`}
                          projectStatusId={123}
                          //  butuh proj stts id
                          // di row baru ada projectStatus	"On Progress"
                        />,
                        ModalSizeEnum.Tiny
                      )
                    );
                  }}
                /> */}
                <Dropdown.Item
                  to={`/pmo-view/${rowData.funnelGenId}/${rowData.projectId}`}
                  as={Link}
                  text="View/Edit"
                  icon="edit outline"
                />
                <Dropdown.Item
                  text="Reassign PMO/S"
                  icon="users"
                  onClick={() =>
                    dispatch(
                      ModalFirstLevelActions.OPEN(
                        <ReassignPMOS rowData={rowData} page="list-pmo" />,
                        ModalSizeEnum.Small
                      )
                    )
                  }
                />
                {/* <Dropdown.Item
                  text="Copy Project"
                  icon="copy outline"
                  onClick={() => {
                    dispatch(ModalNoPaddingActions.OPEN(<FormPMO type={'COPY PROJECT'} projectID={rowData.projectId} />, ModalSizeEnum.Small));
                  }}
                /> */}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        )}

        <Table.Cell data-t="n">{rowData.projectId}</Table.Cell>
        <Table.Cell data-t="n">{rowData.funnelGenId}</Table.Cell>
        <Table.Cell>{rowData.oiNumber}</Table.Cell>
        <Table.Cell>{rowData.soNumber}</Table.Cell>
        <Table.Cell>{rowData.salesName}</Table.Cell>
        <Table.Cell>{rowData.salesDepartment}</Table.Cell>
        <Table.Cell>{rowData.pmoName}</Table.Cell>
        <Table.Cell>{rowData.pmoDepartment}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.projectName}</Table.Cell>
        <Table.Cell>{rowData.projectAlias}</Table.Cell>
        <Table.Cell>
          {rowData.estStartBypmo &&
            format(new Date(rowData.estStartBypmo), "dd/MM/yyyy")}
        </Table.Cell>
        <Table.Cell>
          {rowData.estEndBypmo &&
            format(new Date(rowData.estEndBypmo), "dd/MM/yyyy")}
        </Table.Cell>
        <Table.Cell>
          {rowData.actualStartBypmo &&
            format(new Date(rowData.actualStartBypmo), "dd/MM/yyyy")}
        </Table.Cell>
        <Table.Cell>
          {rowData.actualEndBypmo &&
            format(new Date(rowData.actualEndBypmo), "dd/MM/yyyy")}
        </Table.Cell>
        <Table.Cell>{rowData.milestone}</Table.Cell>
        <Table.Cell>
          {rowData.createDate &&
            format(new Date(rowData.createDate), "dd/MM/yyyy")}
        </Table.Cell>
        <Table.Cell>
          <div
            className={`${styles.PMOStatus} ${
              bgStatus(rowData.projectStatus).bg
            }`}
          >
            <span className={bgStatus(rowData.projectStatus).text}>
              {rowData.projectStatus}
            </span>
          </div>
        </Table.Cell>
        <Table.Cell>
          {rowData.modifyDate &&
            format(new Date(rowData.modifyDate), "dd/MM/yyyy")}
        </Table.Cell>

        <Table.Cell>
          {rowData.warrantyStatus && (
            <Icon
              size="small"
              name={sttsWarranty(rowData.warrantyStatus).ic}
              className={`ic-rounded-14 ${
                sttsWarranty(rowData.warrantyStatus).typeClass
              }`}
            />
          )}
          {rowData.warrantyStatus}
        </Table.Cell>
      </Table.Row>
    </Fragment>
  );
}

export default PMOTableRow;

import environment from "environment";
import React, { Fragment, useCallback, useState } from "react";
import { Table, Dropdown, Confirm } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as AttachmentActions from "stores/attachment/AttachmentActions";
import IAttachmentTableRow from "selectors/attachment/models/IAttachmentTableRow";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import { CheckBox } from "views/components/UI";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { format } from "date-fns";
import AttachmentVersions from "../../attachment-versions/AttachmentVersions";
import IStore from "models/IStore";
import { selectBankGaransi } from "selectors/bank-garansi/BankGaransiSelector";
import axios from "axios";
import fileDownload from "js-file-download";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import { useLocation } from "react-router-dom";
import AttachmentModel from "stores/attachment/models/AttachmentModel";
import IAttachmentAndAcceptenceTableRow from "selectors/attachment/models/IAttachmentAndAcceptenceTableRow";
import './AttachmentTableRow-Style.scss';

interface IProps {
  readonly rowData: IAttachmentTableRow | IAttachmentAndAcceptenceTableRow;
  isLocalFirst: boolean;
  modul: number;
  page: string;
}

const AttachmentTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, isLocalFirst, modul, page } = props;
  const funnelGenId = useLocation()?.pathname?.split("/")[2];
  const projectId = useLocation()?.pathname?.split("/")[3];

  const [openConfirm, setOpenConfirm] = useState(false);
  const showConfirm = () => setOpenConfirm(true);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const bankGaransi = useSelector((state: IStore) => selectBankGaransi(state));

  const onVersion = useCallback((): void => {
    if (!isLocalFirst) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <AttachmentVersions
            isChild={true}
            rowData={rowData}
            modul={modul}
            page={page}
          />,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <AttachmentVersions
            isChild={false}
            rowData={rowData}
            modul={modul}
            page={page}
          />,
          ModalSizeEnum.Small
        )
      );
    }
  }, [dispatch, isLocalFirst, rowData]);
  const onCheckedAttachment = (e: any, data: any) => {
    console.log("checke");
  };

  const handleCancel = () => setOpenConfirm(false);
  const handleConfirm = () => {
    if (isLocalFirst) {
      dispatch(
        AttachmentActions.deleteAttachmentLocal(rowData.funnelAttachmentID)
      );
      const timeout = setTimeout(() => {
        dispatch(AttachmentActions.requestAttachmentLocal());
        setOpenConfirm(false);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      if (page === "pmo-view-edit") {
        const newItem = new AttachmentModel({
          ...rowData,
          modul: 4,
          docNumber: projectId,
          topNumber: `${rowData.topNumber}`,
        });
        dispatch(
          AttachmentActions.deleteDocumentAllVersion({
            ...newItem,
            documentTypeId: rowData.documentTypeID,
          })
        ).then(() => {
          setOpenConfirm(false);
          dispatch(AttachmentActions.removeResult());
          dispatch(
            AttachmentActions.getAttachmentAndtAcceptence(
              +rowData.funnelGenID,
              +projectId,
              1,
              5,
              false
            )
          ); // attachment
          dispatch(
            AttachmentActions.getAttachmentAndtAcceptence(
              +rowData.funnelGenID,
              +projectId,
              1,
              5,
              true
            )
          ); // acceptence
        });
      } else {
        dispatch(
          AttachmentActions.deleteAttachment(
            rowData.funnelGenID,
            rowData.documentTypeID,
            rowData.fileName,
            currentUser.employeeID
          )
        );
        const timeout = setTimeout(() => {
          dispatch(
            AttachmentActions.requestAttachmentServer(
              rowData.funnelGenID,
              modul,
              1,
              5,
              currentUser.employeeID
            )
          );
          setOpenConfirm(false);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }
  };

  const onDownloadFile = () => {
    const controllerName =
      page === "pmo-view-edit"
        ? rowData.modul === 4
          ? `FileFunnel/download-file-DocNumber/${rowData.funnelAttachmentID}`
          : `FileFunnel/download-file/${rowData.funnelAttachmentID}`
        : `FileFunnel/download-file/${rowData.funnelAttachmentID}`;
    const endpoint: string = environment.api.funnel.replace(
      ":controller",
      controllerName
    );
    handleDownload(
      endpoint,
      page === "pmo-view-edit" ? rowData.fileDownload : rowData.fileName
    );
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <Fragment>
      <Confirm
        open={openConfirm}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        centered
        size="mini"
      />
      <Table.Row className={(new Date("06/01/2023") < new Date(rowData.uploadTime)) ? '' : 'noAttachment'} >
        <Table.Cell>
          {/* <CheckBox type="checkbox" value={rowData.funnelAttachmentID} onChange={onCheckedAttachment} /> */}
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              {window.location.pathname !== "/data-quality/funnel-form" && (
                <Dropdown.Item
                  text="Version History"
                  icon="dashboard"
                  onClick={onVersion}
                />
              )}

              {page === "pmo-view-edit" ? (
                <>
                  {rowData.modul === 4 && (
                    <Dropdown.Item
                      text="Delete"
                      icon="trash alternate"
                      onClick={showConfirm}
                    />
                  )}
                </>
              ) : (
                <>
                  {rowData.flagView !== "0" && (
                    <Dropdown.Item
                      text="Delete"
                      icon="trash alternate"
                      disabled={
                        bankGaransi.bondType === "Bid Bond" &&
                        bankGaransi.status !== "Cancel" &&
                        rowData.documentTypeID === 298
                          ? true
                          : false
                      }
                      onClick={showConfirm}
                    />
                  )}
                </>
              )}
              {
                new Date("06/01/2023") < new Date(rowData.uploadTime)
                && (
                <Dropdown.Item
                  text="Download"
                  icon="download"
                  onClick={onDownloadFile}
                ></Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.documentName}</Table.Cell>
        <Table.Cell>{rowData.documentType}</Table.Cell>
        <Table.Cell>{rowData.versionNumber}</Table.Cell>
        <Table.Cell>
          {format(new Date(rowData.uploadTime), "dd-MM-yyyy hh:mm:ss")}
        </Table.Cell>
        <Table.Cell>{rowData.uploadBy}</Table.Cell>
        {page === "pmo-view-edit" && (
          <Table.Cell>{rowData.topNumber}</Table.Cell>
        )}
      </Table.Row>
    </Fragment>
  );
};

export default AttachmentTableRow;

import environment from 'environment';
import React, { Fragment, useCallback, useState } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import IAttachmentTableRow from 'selectors/bank-garansi/models/IAttachmentTableRow';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { CheckBox } from 'views/components/UI';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { format } from 'date-fns';
import AttachmentVersion from 'views/bank-garansi-page/admin/components/attachment-version/AttachmentVersion';
import IStore from 'models/IStore';
import { selectBankGaransi } from 'selectors/bank-garansi/BankGaransiSelector';
import axios from 'axios';
import fileDownload from 'js-file-download';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  readonly rowData: IAttachmentTableRow;
  isLocalFirst: boolean;
  modul: number;
  bankGuaranteeID: string;
  bgNo: string;
}

const AttachmentTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, isLocalFirst, modul, bgNo } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const showConfirm = () => setOpenConfirm(true);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const bankGaransi = useSelector((state: IStore) => selectBankGaransi(state));

  const onVersion = useCallback((): void => {
    if (!isLocalFirst) {
      dispatch(ModalSecondLevelActions.OPEN(<AttachmentVersion isChild={true} rowData={rowData} modul={modul} bgNo={bgNo} />, ModalSizeEnum.Small));
    } else {
      dispatch(ModalFirstLevelActions.OPEN(<AttachmentVersion isChild={false} rowData={rowData} modul={modul} bgNo={bgNo} />, ModalSizeEnum.Small));
    } 
  }, [dispatch, isLocalFirst, rowData]);

  const handleCancel = () => setOpenConfirm(false);
  const handleConfirm = () => {
    if (isLocalFirst) {
      dispatch(AttachmentActions.deleteAttachmentLocal(rowData.funnelAttachmentID));
      const timeout = setTimeout(() => {
        dispatch(AttachmentActions.requestAttachmentLocal());
        setOpenConfirm(false);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      dispatch(AttachmentActions.deleteAttachment(rowData.funnelGenID, rowData.documentTypeID, rowData.fileName, currentUser.employeeID));
      const timeout = setTimeout(() => {
        dispatch(BankGaransiActions.requestAttachmentServer(1,5,props.bankGuaranteeID, currentUser.employeeID, 2));
        setOpenConfirm(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  };


  const onDownloadFile = () => {
    const controllerName = `FileFunnel/download-file-DocNumber/${rowData.funnelAttachmentID}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
    handleDownload(endpoint, rowData.fileName);
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        console.log(res.data);
        fileDownload(res.data, filename);
      });
  };

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered size="mini" />
      <Table.Row>
        <Table.Cell>
          <CheckBox type="checkbox" value={rowData.funnelAttachmentID} />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item text="Version History" icon="dashboard" onClick={onVersion} />
              <Dropdown.Item
                text="Delete"
                icon="trash alternate"
                disabled={bankGaransi.bondType == 'Bid Bond' && bankGaransi.status != 'Cancel' && rowData.documentTypeID == 298 ? true : false}
                onClick={showConfirm}
              />
              <Dropdown.Item text="Download" icon="download" onClick={onDownloadFile}></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.documentName}</Table.Cell>
        <Table.Cell>{rowData.documentType}</Table.Cell>
        <Table.Cell>{rowData.versionNumber}</Table.Cell>
        <Table.Cell>{format(new Date(rowData.uploadTime), 'dd-MM-yyyy hh:mm:ss')}</Table.Cell>
        <Table.Cell>{rowData.uploadBy}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default AttachmentTableRow;

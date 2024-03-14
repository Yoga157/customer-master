import React, { Fragment, useState } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IAttachmentVersionTableRow from 'selectors/attachment-versions/models/IAttachmentVersionsTableRow';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import * as AttachmentVersionActions from 'stores/attachment-versions/AttachmentVersionsActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import ReactHtmlParser from 'react-html-parser';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

interface IProps {
  readonly rowData: IAttachmentVersionTableRow;
  readonly modul: number;
}

const AttachmentVersionsTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, modul } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [typeActive, setTypeActive] = useState('');
  const projectId = useLocation()?.pathname?.split('/')[3];
  const showConfirm = (type: string) => {
    setOpenConfirm(true);
    setTypeActive(type);
  };
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const handleCancel = () => setOpenConfirm(false);
  const handleConfirm = () => {
    if (typeActive === 'RESTORE') {
      console.log('RESTORE');
      dispatch(AttachmentVersionActions.restoreAttachment(rowData.funnelAttachmentID, currentUser.employeeID));
    } else if (typeActive === 'DELETE') {
      console.log('DELETE');
      dispatch(AttachmentVersionActions.deleteAttachment(rowData.funnelAttachmentID, currentUser.employeeID));
    }

    const timeout = setTimeout(() => {
      if (modul === 4) {
        // 4 === pmo-view-edit
        dispatch(AttachmentActions.removeResult());
        dispatch(AttachmentVersionActions.requestAttachmentVersionsPMO(+rowData.docNumber, rowData.fileName, rowData.documentTypeID, 1));
        dispatch(AttachmentActions.getAttachmentAndtAcceptence(+rowData.funnelGenID, +rowData.docNumber, 1, 5, false)); // attachment
        dispatch(AttachmentActions.getAttachmentAndtAcceptence(+rowData.funnelGenID, +rowData.docNumber, 1, 5, true)); // acceptence
      } else {
        dispatch(
          AttachmentVersionActions.requestAttachmentVersions(
            rowData.funnelGenID,
            rowData.fileName,
            rowData.documentTypeID,
            modul,
            currentUser.employeeID
          )
        );
        dispatch(AttachmentActions.requestAttachmentServer(rowData.funnelGenID, modul, 1, 15, currentUser.employeeID));
      }
      setOpenConfirm(false);
    },1000);

   return () => clearTimeout(timeout);
  } 

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered size="mini" />
      <Table.Row key={rowData.funnelAttachmentID}>
        <Table.Cell textAlign="center">
          {rowData.flagView === '0' && (
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => showConfirm('RESTORE')} text="Restore" icon="edit" />
                <Dropdown.Item onClick={() => showConfirm('DELETE')} text="Delete" icon="trash alternate" />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">{rowData.notes ? ReactHtmlParser(rowData.notes) : ''}</Table.Cell>
        <Table.Cell>{rowData.versionNumber}</Table.Cell>
        <Table.Cell textAlign="center">{rowData?.uploadTime && format(new Date(rowData?.uploadTime), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{rowData.uploadBy}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default AttachmentVersionsTableRow;

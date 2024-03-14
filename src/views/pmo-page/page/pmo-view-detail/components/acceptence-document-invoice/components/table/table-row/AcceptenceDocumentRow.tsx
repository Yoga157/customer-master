import React, { useEffect, useState } from 'react';
import { Confirm, Dropdown, Table } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import IAttachmentTopActiveTableRow from 'selectors/attachment/models/IAttachmentAndAcceptenceTableRow';
import AcceptenceDocumentForm from '../../form/AcceptenceDocument/AcceptenceDocumentForm';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IStore from 'models/IStore';

interface IProps {
  rowData: IAttachmentTopActiveTableRow;
}

const AcceptenceDocumentRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  const dispatch = useDispatch();
  const funnelGenId = useLocation()?.pathname?.split('/')[2];
  const projectId = useLocation()?.pathname?.split('/')[3];

  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const handleConfirm = () => {
    const newItem = new AttachmentModel({ ...rowData, modul: 4, topNumber: `${rowData.topNumber}` });
    dispatch(AttachmentActions.deleteDocumentAllVersion({ ...newItem, documentTypeId: rowData.documentTypeID })).then(() => {
      setOpenConfirm(false);
      dispatch(AttachmentActions.removeResult());
      dispatch(AttachmentActions.getAttachmentAndtAcceptence(+rowData.funnelGenID, +projectId, 1, 5, true)); // acceptence
    });
  };

  return (
    <>
      <Confirm open={openConfirm} onCancel={() => setOpenConfirm(false)} onConfirm={handleConfirm} centered size="mini" />
      <Table.Row>
        <Table.Cell textAlign="center">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="Edit"
                icon="edit outline"
                onClick={() => dispatch(ModalFirstLevelActions.OPEN(<AcceptenceDocumentForm type={'EDIT'} rowData={rowData} />, ModalSizeEnum.Small))}
              />
              <Dropdown.Item onClick={() => setOpenConfirm(true)} text="Delete" icon="trash alternate" />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        {/* <Table.Cell textAlign="center" style={{ display: 'inline-block', wordBreak: 'break-word' }}>
        {rowData.funnelAttachmentID}
      </Table.Cell> */}
        <Table.Cell textAlign="center">{rowData.documentName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.documentType}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.notes ? ReactHtmlParser(rowData.notes) : ''}</Table.Cell>
        <Table.Cell textAlign="center">{rowData?.uploadTime && format(new Date(rowData?.uploadTime), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.topNumber}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default AcceptenceDocumentRow;

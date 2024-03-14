import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import moment from 'moment';

import CopyFunnelAttachmentModel from 'stores/work-list/models/CopyFunnelAttachmentModel';
import { selectListWorkAttachment } from 'selectors/work-list/WorklistSelector';
import AttachmentTableRow from './table-row/GeneralAttachmentTableRow';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './GeneralAttachment.module.scss';
import IStore from 'models/IStore';

interface LocationState {
  from: {
    pathname: string;
  };
  funnelGenID: string;
  projectId: string;
}

interface IProps {
  readonly tableData: any;
  setListAttachment: any;
  listAttacment: any;
  type: any;
  docTypeId: any;
  getAttachment: any;
  setPaginConfig: any;
  paginConfig: any;
}

const GeneralAttachment: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData, setListAttachment, listAttacment, type, docTypeId, getAttachment, setPaginConfig, paginConfig } = props;
  const dispatch: Dispatch = useDispatch();

  const location = useLocation<LocationState>();
  const listWorkAttachmentAll = useSelector((state: IStore) => state.workList.listWorkAttachmentAll);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const listAttachment = useSelector((state: IStore) => selectListWorkAttachment(state));

  useEffect(() => {
    if (type?.createDate) {
      dispatch(WorkListActions.getListWorkAttachmentAll(1, listAttachment.totalRows, 5, type.uid));
    }
  }, [listAttachment]);

  const onCheckedAttachment = (rowData) => {
    const newItem = new CopyFunnelAttachmentModel({});
    newItem.funnelAttachmentID = rowData.funnelAttachmentID;
    newItem.funnelGenID = +location?.state?.funnelGenID;
    newItem.documentTypeID = docTypeId;
    newItem.docNumber = type.uid;
    newItem.modul = 5;
    newItem.createDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    newItem.createUserID = currentUser.employeeID;

    if (type?.createDate) {
      if (listWorkAttachmentAll.rows?.find((e) => e.fileDownload === rowData.fileDownload)) {
        dispatch(
          WorkListActions.deleteWorkAttachment(listWorkAttachmentAll.rows?.find((e) => e.fileDownload === rowData.fileDownload).funnelAttachmentID)
        ).then(() => {
          getAttachment(1);
          setPaginConfig({ ...paginConfig, pageAttach: 1 });
        });
      } else {
        newItem.funnelGenID = +rowData.funnelGenID;

        dispatch(WorkListActions.copyFunnelAttachment({ ...newItem, fileName: '' })).then(() => {
          getAttachment(1);
          setPaginConfig({ ...paginConfig, pageAttach: 1 });
        });
      }
    } else {
      newItem.fileName = rowData.fileName;

      if (listAttacment.find((e) => e.funnelAttachmentID === rowData.funnelAttachmentID)) {
        const newList = listAttacment.filter((e) => e.funnelAttachmentID !== rowData.funnelAttachmentID);
        setListAttachment(newList);
      } else {
        setListAttachment([
          ...listAttacment,
          {
            ...newItem,
            isLocal: false,

            // file: e.target.files[0],
            // fileDownload: '',
            // docNumber: '',
            uploadByName: currentUser.fullName,
          },
        ]);
      }
    }
  };

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Document Name</Table.HeaderCell>
          <Table.HeaderCell>Document Type</Table.HeaderCell>
          <Table.HeaderCell>Version</Table.HeaderCell>
          <Table.HeaderCell>Upload Time</Table.HeaderCell>
          <Table.HeaderCell>Upload By</Table.HeaderCell>
          <Table.HeaderCell>Top Number</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={7} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: any, k) => (
          <AttachmentTableRow
            key={k}
            rowData={model}
            listAttacment={listAttacment}
            onCheckedAttachment={onCheckedAttachment}
            type={type?.createDate ? 'EDIT' : 'ADD'}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default GeneralAttachment;

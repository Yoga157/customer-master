import React from 'react';
import { Dropdown, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import fileDownload from 'js-file-download';
import environment from 'environment';
import { Dispatch } from 'redux';
import moment from 'moment';
import axios from 'axios';

import { ListWorkAttachmentRowModel } from 'stores/work-list/models/ListWorkAttachmentModel';
import { selectWorkListDetail } from 'selectors/work-list/WorklistSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import IStore from 'models/IStore';

function AttachmentFilesTableRow({
  rowData,
  activePage,
  setActivePage,
}: {
  rowData: ListWorkAttachmentRowModel;
  activePage: any;
  setActivePage: any;
}) {
  const dispatch: Dispatch = useDispatch();

  const workDetail = useSelector((state: IStore) => selectWorkListDetail(state));

  const onDownloadFile = () => {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const controllerName = `WorkAttachment/download-file?funnelAttachmentID=${rowData.funnelAttachmentID}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

    axios
      .get(endpoint, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${userLogin === null ? '' : userLogin.token}`,
        },
      })
      .then((res) => {
        fileDownload(res.data, rowData.fileDownload);
      });
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            <Dropdown.Item text="Download" icon="download" onClick={onDownloadFile} />
            <Dropdown.Item
              text="Delete"
              icon="trash"
              onClick={() => {
                dispatch(WorkListActions.deleteWorkAttachment(rowData.funnelAttachmentID)).then(() => {
                  dispatch(WorkListActions.getListWorkAttachment(1, 5, 5, workDetail.uid || workDetail.taskUID));
                  setActivePage({
                    ...activePage,
                    pageAttach: 1,
                  });
                });
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
      <Table.Cell>{rowData.fileName}</Table.Cell>
      <Table.Cell>{rowData.uploadDate ? moment(rowData.uploadDate).format('DD/MM/YYYY') : ''}</Table.Cell>
      <Table.Cell>{rowData.uploadByName}</Table.Cell>
    </Table.Row>
  );
}

export default AttachmentFilesTableRow;

import React from 'react';
import { Dropdown, Table } from 'semantic-ui-react';
import fileDownload from 'js-file-download';
import { useDispatch } from 'react-redux';
import environment from 'environment';
import { Dispatch } from 'redux';
import moment from 'moment';
import axios from 'axios';

import * as WorkListActions from 'stores/work-list/WorkListActions';

function AttachmentTable({ tableData, setListAttachment, type, rowData, setPaginConfig, paginConfig }) {
  const dispatch: Dispatch = useDispatch();

  const onDownloadFile = (item) => {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const controllerName = `WorkAttachment/download-file?funnelAttachmentID=${item.funnelAttachmentID}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

    axios
      .get(endpoint, {
        responseType: 'blob',

        headers: {
          Authorization: `Bearer ${userLogin === null ? '' : userLogin.token}`,
        },
      })
      .then((res) => {
        fileDownload(res.data, item.fileDownload);
      });
  };

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Document Name</Table.HeaderCell>
          <Table.HeaderCell>Upload Date</Table.HeaderCell>
          <Table.HeaderCell>Uploader</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData?.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell textAlign="center">
                <Dropdown pointing="left" icon="ellipsis vertical">
                  <Dropdown.Menu>
                    <Dropdown.Item
                      text="Delete"
                      icon="trash alternate"
                      onClick={() => {
                        if (type !== 'EDIT') {
                          setListAttachment(tableData.filter((e) => e.funnelAttachmentID !== item.funnelAttachmentID));
                        } else {
                          dispatch(WorkListActions.deleteWorkAttachment(item.funnelAttachmentID)).then(() => {
                            dispatch(WorkListActions.getListWorkAttachment(1, 5, 5, rowData.ticketUID || rowData.uid));
                            setPaginConfig({ ...paginConfig, pageAttach: 1 });
                          });
                        }
                      }}
                    />

                    {type === 'EDIT' && <Dropdown.Item text="Download" icon="download" onClick={() => onDownloadFile(item)} />}
                  </Dropdown.Menu>
                </Dropdown>
              </Table.Cell>
              <Table.Cell textAlign="left">{item.fileName}</Table.Cell>
              <Table.Cell textAlign="center">{moment(item.createDate).format('DD/MM/YYYY')}</Table.Cell>
              <Table.Cell textAlign="center">{item.uploadByName}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default AttachmentTable;

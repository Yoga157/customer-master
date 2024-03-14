import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';

import { ListWorkAttachmentRowModel } from 'stores/work-list/models/ListWorkAttachmentModel';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import AttachmentFilesTableRow from './table-row/AttachmentFilesTableRow';
import IStore from 'models/IStore';

function AttachmentFilesTable({ tableData, activePage, setActivePage }) {
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));
  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
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
            {tableData.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4} textAlign="center">
                  No Data
                </Table.Cell>
              </Table.Row>
            )}

            {tableData.map((rowData: ListWorkAttachmentRowModel, i) => (
              <AttachmentFilesTableRow rowData={rowData} key={i} activePage={activePage} setActivePage={setActivePage} />
            ))}
          </Table.Body>
        </Table>
      </LoadingIndicator>
    </Fragment>
  );
}

export default AttachmentFilesTable;

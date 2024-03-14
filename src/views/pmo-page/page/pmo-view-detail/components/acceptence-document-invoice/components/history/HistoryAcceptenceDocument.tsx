import React, { Fragment, useEffect, useState } from 'react';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useLocation } from 'react-router-dom';
import { Dispatch } from 'redux';
import moment from 'moment';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectFileAttachmentTop } from 'selectors/attachment/AttachmentSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

function HistoryAcceptenceDocument(props) {
  const funnelGenId = useLocation()?.pathname?.split('/')[2];
  const projectId = useLocation()?.pathname?.split('/')[3];
  const dispatch: Dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);
  let funnelHistory = [];

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [AttachmentActions.GET_HISTORY_FILE_ATTACHMENT]));
  funnelHistory = useSelector((state: IStore) => selectFileAttachmentTop(state, [AttachmentActions.GET_HISTORY_FILE_ATTACHMENT]));

  useEffect(() => {
    dispatch(AttachmentActions.getHistoryFileAttachment(+projectId, 4, 0, currentUser.employeeID));
  }, []);

  if (funnelHistory?.length === 0) {
    funnelHistory = [
      {
        historyDate: new Date(),
        historyList: [],
      },
    ];
  }

  return (
    <Fragment>
      <Card.Header className="bold-8">Acceptence Document - Revision History</Card.Header>
      <Divider />

      <Accordion fluid styled style={{ maxHeight: 400, overflow: 'auto' }}>
        <LoadingIndicator isActive={isRequesting}>
          {funnelHistory?.map((i, k) => {
            return (
              <div key={k}>
                <Accordion.Title active={activeIndex === k} onClick={handleClick} index={k}>
                  <Icon name="dropdown" />
                  {moment(i.historyDate).format('dddd, MMMM DD, YYYY')}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === k}>
                  <Table striped>
                    <Table.Header>
                      <Table.Row>
                        {/* <Table.HeaderCell>Document ID</Table.HeaderCell> */}
                        <Table.HeaderCell>Document Name</Table.HeaderCell>
                        <Table.HeaderCell>Document Type</Table.HeaderCell>
                        <Table.HeaderCell>Document Desc.</Table.HeaderCell>
                        <Table.HeaderCell>Upload Date</Table.HeaderCell>
                        <Table.HeaderCell>Top Number</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {i.historyList.map((item: any, k) => (
                        <Table.Row key={k}>
                          {/* <Table.Cell>{item.funnelAttachmentID}</Table.Cell> */}
                          <Table.Cell>{item.documentName}</Table.Cell>
                          <Table.Cell>{item.documentType}</Table.Cell>
                          <Table.Cell>{item.notes ? ReactHtmlParser(item.notes) : ''}</Table.Cell>
                          <Table.Cell>{item?.uploadTime && moment(item?.uploadTime).format('DD/MM/yyyy')}</Table.Cell>
                          <Table.Cell>{item.topNumber}</Table.Cell>
                        </Table.Row>
                      ))}

                      {i.historyList.length === 0 && (
                        <Table.Row>
                          <Table.Cell colSpan={5} textAlign="center">
                            No Data
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                </Accordion.Content>
              </div>
            );
          })}
        </LoadingIndicator>
      </Accordion>
    </Fragment>
  );
}

export default HistoryAcceptenceDocument;

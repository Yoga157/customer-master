import React, { Fragment, useState } from 'react';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IStore from 'models/IStore';

function HistoryProjectStatusPMO(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));
  //  let funnelHistory = useSelector((state: IStore) => selectFunnelHistory(state, [FunnelActions.REQUEST_FUNNEL_HISTORY]));
  let funnelHistory = [];
  if (funnelHistory?.length === 0) {
    funnelHistory = [
      {
        historyDate: new Date(),
        historyList: [1, 1],
      },
    ];
  }

  return (
    <Fragment>
      <Card.Header className="bold-8">Project Status - Revision History</Card.Header>
      <Divider />

      <Accordion fluid styled style={{ maxHeight: 400, overflow: 'auto' }}>
        <LoadingIndicator isActive={isRequesting}>
          {!isRequesting &&
            funnelHistory.map((i, k) => {
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
                          <Table.HeaderCell>Project Status</Table.HeaderCell>
                          <Table.HeaderCell>Project No</Table.HeaderCell>
                          <Table.HeaderCell>SO Date</Table.HeaderCell>
                          <Table.HeaderCell>OI Date</Table.HeaderCell>
                          <Table.HeaderCell>PMO Name</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {i.historyList.map((item: any, k) => (
                          <Table.Row key={k}>
                            <Table.Cell>xxxx</Table.Cell>
                            <Table.Cell>xxxxx</Table.Cell>
                            <Table.Cell>xxxxx</Table.Cell>
                            <Table.Cell>xxxxx</Table.Cell>
                            <Table.Cell>xxxxxx</Table.Cell>
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

export default HistoryProjectStatusPMO;

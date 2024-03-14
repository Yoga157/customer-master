import IStore from 'models/IStore';
import React, { Fragment, useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectFunnelHistory } from 'selectors/funnel/FunnelSelector';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import SalesFunnelHistoryModel from 'stores/funnel/models/SalesFunnelHistoryModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import moment from 'moment';

function AccordianFunnelStatus(props) {
  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    dispatch(FunnelActions.requestFunnelHistoryById(props.funnelGenID));
  }, [dispatch]);

  let funnelHistory = useSelector((state: IStore) => selectFunnelHistory(state, [FunnelActions.REQUEST_FUNNEL_HISTORY]));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_FUNNEL_HISTORY]));

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
      <Card.Header className="bold-8">Funnel Details - Revision History</Card.Header>
      <Divider />
      <Accordion fluid styled style={{ maxHeight: 400, minHeight: 100, overflow: 'auto' }}>
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
                          <Table.HeaderCell>Funnel Status</Table.HeaderCell>
                          <Table.HeaderCell>Funnel No</Table.HeaderCell>
                          <Table.HeaderCell>Deal Close Date</Table.HeaderCell>
                          <Table.HeaderCell>Sales Name</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {i.historyList.map((item: SalesFunnelHistoryModel, k) => (
                          <Table.Row key={k}>
                            <Table.Cell>{item.funnelStatus}</Table.Cell>
                            <Table.Cell>{item.funnelGenID}</Table.Cell>
                            <Table.Cell>{item.dealCloseDate}</Table.Cell>
                            <Table.Cell>{item.salesName}</Table.Cell>
                          </Table.Row>
                        ))}

                        {i.historyList.length === 0 && (
                          <Table.Row>
                            <Table.Cell colSpan={4} textAlign="center">
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

export default AccordianFunnelStatus;

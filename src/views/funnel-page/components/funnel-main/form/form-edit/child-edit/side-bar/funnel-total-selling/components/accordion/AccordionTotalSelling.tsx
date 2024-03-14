import IStore from 'models/IStore';
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectFunnelHistory } from 'selectors/funnel/FunnelSelector';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';

function AccordionTotalSelling(props) {
  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    dispatch(FunnelActions.requestFunnelHistoryById(props.funnelGenID));
    console.log('props', props);
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
      <Card.Header className="bold-8">Total Selling Details - Revision History</Card.Header>
      <Divider />
      <Accordion fluid styled style={{ height: 400, overflow: 'auto' }}>
        <LoadingIndicator isActive={isRequesting}>
          {!isRequesting &&
            funnelHistory.map((i, k) => {
              return (
                <>
                  <div key={k}>
                    <Accordion.Title active={activeIndex === k} onClick={handleClick} index={k}>
                      <Icon name="dropdown" />
                      {moment(i.historyDate).format('dddd, MMMM DD, YYYY')}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === k}>
                      <Table striped>
                        <Table.Header>
                          <Table.Row>
                            {/* <Table.HeaderCell></Table.HeaderCell> */}
                            <Table.HeaderCell>Total Ordering</Table.HeaderCell>
                            <Table.HeaderCell>Total Selling</Table.HeaderCell>
                            <Table.HeaderCell>GPM Percent (%)</Table.HeaderCell>
                            <Table.HeaderCell>GPM Amount(IDR)</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {i.historyList.map((i, k) => (
                            <Table.Row key={k}>
                              {/* <Table.Cell width="1"></Table.Cell> */}
                              <Table.Cell>{i.totalOrderingPrice?.toLocaleString()}</Table.Cell>
                              <Table.Cell>{i.totalSellingPrice?.toLocaleString()}</Table.Cell>
                              <Table.Cell>{i.gpmPctg?.toLocaleString()}%</Table.Cell>
                              <Table.Cell>{i.gpmAmount?.toLocaleString()}</Table.Cell>
                            </Table.Row>
                          ))}

                          {i.historyList.length === 0 && (
                            <Table.Row>
                              <Table.Cell colSpan={3} textAlign="center">
                                No Data
                              </Table.Cell>
                            </Table.Row>
                          )}
                        </Table.Body>
                      </Table>
                    </Accordion.Content>
                  </div>
                </>
              );
            })}
        </LoadingIndicator>
      </Accordion>
    </Fragment>
  );
}

export default AccordionTotalSelling;

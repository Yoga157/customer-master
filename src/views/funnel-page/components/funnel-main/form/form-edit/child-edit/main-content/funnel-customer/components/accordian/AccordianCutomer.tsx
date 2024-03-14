import IStore from 'models/IStore';
import { Accordion, Card, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react';
import React, { Fragment, useState, useEffect } from 'react';
import { selectFunnelHistory } from 'selectors/funnel/FunnelSelector';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import * as FunnelActions from 'stores/funnel/FunnelActions';
import SalesFunnelHistoryModel from 'stores/funnel/models/SalesFunnelHistoryModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';

function AccordianCutomer(props) {
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
      <Card.Header className="bold-8">Customer - Revision History</Card.Header>
      <Divider />
      <Accordion fluid styled style={{ height: 400, overflow: 'auto' }}>
        <LoadingIndicator isActive={isRequesting}>
          {!isRequesting &&
            funnelHistory
              .filter((c) => c != undefined)
              .map((i, k) => {
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
                              <Table.HeaderCell>Project Name</Table.HeaderCell>
                              <Table.HeaderCell>Customer Name</Table.HeaderCell>
                              <Table.HeaderCell>End Customer Name</Table.HeaderCell>
                              <Table.HeaderCell>Start Project</Table.HeaderCell>
                              <Table.HeaderCell>End Project</Table.HeaderCell>
                              <Table.HeaderCell>Est. Proj. Duration</Table.HeaderCell>
                              <Table.HeaderCell>Request Dedicated Resource</Table.HeaderCell>
                              <Table.HeaderCell>Presales</Table.HeaderCell>
                              <Table.HeaderCell>PMO/S</Table.HeaderCell>
                              <Table.HeaderCell>SMO</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {i.historyList.map((i, k) => (
                              <Table.Row key={k}>
                                {/* <Table.Cell width="1"></Table.Cell> */}
                                <Table.Cell>{i.projectName}</Table.Cell>
                                <Table.Cell>{i.customerName}</Table.Cell>
                                <Table.Cell>{i.endCustomerName}</Table.Cell>
                                <Table.Cell>{i.estStartProjectDate}</Table.Cell>
                                <Table.Cell>{i.estEndProjectDate}</Table.Cell>
                                <Table.Cell>{i.estDurationProject}</Table.Cell>
                                <Table.Cell>{i.reqDedicatedResource}</Table.Cell>
                                <Table.Cell>{i.presales}</Table.Cell>
                                <Table.Cell>{i.pmo}</Table.Cell>
                                <Table.Cell>{i.smo}</Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>

                          {i.historyList.length === 0 && (
                            <Table.Row>
                              <Table.Cell colSpan={10} textAlign="center">
                                No Data
                              </Table.Cell>
                            </Table.Row>
                          )}
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

export default AccordianCutomer;

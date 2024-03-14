import IStore from 'models/IStore';
import React, { Fragment, useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import * as ServiceCost from 'stores/funnel-cost/COSTAction';
import { selectFunnelCostHistory } from 'selectors/funnel-cost/FunnelCostSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import moment from 'moment';

function AccordionCost(props) {
  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    dispatch(ServiceCost.requestFunnelCostHistoryById(props.funnelGenID));
  }, [dispatch]);

  let funnelHistory = useSelector((state: IStore) => selectFunnelCostHistory(state, [ServiceCost.REQUEST_FUNNEL_COST_HISTORY]));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ServiceCost.REQUEST_FUNNEL_COST_HISTORY]));

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
      <Card.Header className="bold-8">Cost - Revision History</Card.Header>
      <Divider />
      <Accordion fluid styled style={{ height: 400, overflow: 'auto' }}>
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
                          {/* <Table.HeaderCell></Table.HeaderCell> */}
                          <Table.HeaderCell>Cost Name</Table.HeaderCell>
                          <Table.HeaderCell>Cost Type</Table.HeaderCell>
                          <Table.HeaderCell>Remarks</Table.HeaderCell>
                          <Table.HeaderCell>Amount</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {i.historyList.map((i, k) => (
                          <Table.Row key={k}>
                            {/* <Table.Cell width="1"></Table.Cell> */}
                            <Table.Cell>{i.costName}</Table.Cell>
                            <Table.Cell>{i.costType}</Table.Cell>
                            <Table.Cell>{i.costRemark}</Table.Cell>
                            <Table.Cell>{i.cost.toLocaleString()}</Table.Cell>
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
              );
            })}
        </LoadingIndicator>
      </Accordion>
    </Fragment>
  );
}

export default AccordionCost;

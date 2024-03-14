import IStore from 'models/IStore';
import React, { Fragment, useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectFunnelCustomerPOHistory, selectFunnelHistory } from 'selectors/funnel/FunnelSelector';
import { Accordion, Card, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import SalesFunnelHistoryModel from 'stores/funnel/models/SalesFunnelHistoryModel';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

function AccordianCustomerPODetails(props) {
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

  const funnelHistory = useSelector((state: IStore) => selectFunnelCustomerPOHistory(state, [FunnelActions.REQUEST_FUNNEL_HISTORY]));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_FUNNEL_HISTORY]));

  return (
    <Fragment>
      <Card.Header className="bold-8">Customer PO Details - Revision History</Card.Header>
      <Divider />

      <LoadingIndicator isActive={isRequesting}>
        {!isRequesting && funnelHistory.filter((c) => c != undefined).length > 0 ? (
          <Accordion fluid styled style={{ maxHeight: 400, overflow: 'auto' }}>
            {funnelHistory.map((i, k) => {
              return (
                <div key={k}>
                  <Accordion.Title active={activeIndex === k} onClick={handleClick} index={k}>
                    <Icon name="dropdown" />
                    {i.historyDate}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === k}>
                    <Table striped>
                      <Table.Header>
                        <Table.Row>
                          {/* <Table.HeaderCell></Table.HeaderCell> */}
                          <Table.HeaderCell>PO Customer No.</Table.HeaderCell>
                          <Table.HeaderCell>PO Date</Table.HeaderCell>
                          <Table.HeaderCell>Contract No.</Table.HeaderCell>
                          <Table.HeaderCell>Start Contract</Table.HeaderCell>
                          <Table.HeaderCell>End Contract</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {i.historyList.map((i, k) => (
                          <Table.Row key={k}>
                            {/* <Table.Cell width="1"></Table.Cell> */}
                            <Table.Cell>{i.pOCustomerNo}</Table.Cell>
                            <Table.Cell>{i.pOCustomerDate}</Table.Cell>
                            <Table.Cell>{i.contractNo}</Table.Cell>
                            <Table.Cell>{i.contractStartDate}</Table.Cell>
                            <Table.Cell>{i.contractEndDate}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Accordion.Content>
                </div>
              );
            })}
          </Accordion>
        ) : (
          <Grid columns={1} padded>
            <Grid.Column textAlign="center">
              <Header size="tiny" style={{ color: '#a0a8b3' }}>
                No Data
              </Header>
            </Grid.Column>
          </Grid>
        )}
      </LoadingIndicator>
    </Fragment>
  );
}

export default AccordianCustomerPODetails;

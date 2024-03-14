import React, { Fragment, useEffect, useState } from 'react';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IStore from 'models/IStore';

function AccordionCommissionIndex(props) {
  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_FUNNEL_COMMISSION_HISTORY]));
  let funnelHistory: any[] = useSelector((state: IStore) => state.funnel.funnelCommissionHistory);

  if (funnelHistory?.length === 0) {
    funnelHistory = [
      {
        historyDate: new Date(),
        historyList: [],
      },
    ];
  }

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    dispatch(FunnelActions.requestFunnelCommissionHistory(props.funnelGenID));
  }, [dispatch]);

  return (
    <Fragment>
      <Card.Header className="bold-8">Commission Index - Revision History</Card.Header>
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
                          <Table.HeaderCell>Creator</Table.HeaderCell>
                          <Table.HeaderCell>Direct Superior</Table.HeaderCell>
                          <Table.HeaderCell>Superior Level 2</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {i.historyList.map((i, k) => (
                          <Table.Row key={k}>
                            {/* <Table.Cell width="1"></Table.Cell> */}
                            <Table.Cell>{i.indexCreator}</Table.Cell>
                            <Table.Cell>{i.indexDirectSuperior}</Table.Cell>
                            <Table.Cell>{i.indexSuperiorLevel2}</Table.Cell>
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

export default AccordionCommissionIndex;

import React, { Fragment, useEffect, useState } from 'react';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import moment from 'moment';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectFunnelTopHistory } from 'selectors/funnel/FunnelSelector';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';

function AccordionTop(props) {
  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  let funnelHistory = useSelector((state: IStore) => selectFunnelTopHistory(state, [FunnelTopActions.REQUEST_FUNNEL_TOP_HISTORY]));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelTopActions.REQUEST_FUNNEL_TOP_HISTORY]));

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
    dispatch(FunnelTopActions.requestFunnelTopHistoryById(props.funnelGenID));
  }, [dispatch]);

  return (
    <Fragment>
      <Card.Header className="bold-8">Top - Revision History</Card.Header>
      <Divider />
      <Accordion fluid styled style={{ minHeight: 200, maxHeight: 400, overflow: 'auto' }}>
        <LoadingIndicator isActive={isRequesting}>
          {!isRequesting &&
            funnelHistory.map((i, k) => {
              return (
                <>
                  <Accordion.Title active={activeIndex === k} onClick={handleClick} index={k} key={k}>
                    <Icon name="dropdown" />
                    {moment(i.historyDate).format('dddd, MMMM DD, YYYY')}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === k}>
                    <Table striped>
                      <Table.Header>
                        <Table.Row>
                          {/* <Table.HeaderCell></Table.HeaderCell> */}
                          {props?.page === 'view-edit-pmo' && (
                            <>
                              <Table.HeaderCell>Invoice Number</Table.HeaderCell>
                              <Table.HeaderCell>Invoice Date</Table.HeaderCell>
                            </>
                          )}

                          <Table.HeaderCell>Description Product</Table.HeaderCell>
                          <Table.HeaderCell>Percentage Product</Table.HeaderCell>
                          <Table.HeaderCell>Description Service</Table.HeaderCell>
                          <Table.HeaderCell>Percentage Service</Table.HeaderCell>
                          <Table.HeaderCell>Type Of Supporting Document*</Table.HeaderCell>
                          <Table.HeaderCell>Supporting Document Collection Date*</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {i.historyList.map((i, k) => (
                          <Table.Row key={k}>
                            {/* <Table.Cell width="1"></Table.Cell> */}
                            {props?.page === 'view-edit-pmo' && (
                              <>
                                <Table.Cell textAlign="center" style={{ display: 'inline-block', wordBreak: 'break-word' }}>
                                  {i?.invoiceNumber}
                                </Table.Cell>
                                <Table.Cell textAlign="center">{i?.invoiceDate && moment(i?.invoiceDate).format('DD-MM-yyyy')}</Table.Cell>
                              </>
                            )}

                            <Table.Cell>{i.productDesc}</Table.Cell>
                            <Table.Cell>{i.productPercentage}</Table.Cell>
                            <Table.Cell>{i.serviceDesc}</Table.Cell>
                            <Table.Cell>{i.servicePercentage}</Table.Cell>
                            <Table.Cell>{i.supportDoc}</Table.Cell>
                            <Table.Cell>{moment(i.docCollectionDate).format('DD-MM-yyyy')}</Table.Cell>
                          </Table.Row>
                        ))}

                        {i.historyList.length === 0 && (
                          <Table.Row>
                            <Table.Cell colSpan={8} textAlign="center">
                              No Data
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </Accordion.Content>
                </>
              );
            })}
        </LoadingIndicator>
      </Accordion>
    </Fragment>
  );
}

export default AccordionTop;

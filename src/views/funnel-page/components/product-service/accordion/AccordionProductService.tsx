import IStore from 'models/IStore';
import React, { Fragment, useState, useEffect } from 'react';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectFunnelItemHistory } from 'selectors/funnel-product-service/ProductServiceSelector';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

function AccordionProductService(props) {
  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    dispatch(ProductServiceActions.requestFunnelItemHistory(props.funnelGenID));
  }, [dispatch]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ProductServiceActions.REQUEST_FUNNEL_ITEM_HISTORY]));
  let funnelHistory = useSelector((state: IStore) => selectFunnelItemHistory(state, [ProductServiceActions.REQUEST_FUNNEL_ITEM_HISTORY]));
  const isPresalesWorkflow: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isPresalesWorkflow);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

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
      <Card.Header className="bold-8">Product and Service - Revision History</Card.Header>
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
                          <Table.HeaderCell>Item Type</Table.HeaderCell>
                          <Table.HeaderCell>Item Name</Table.HeaderCell>
                          <Table.HeaderCell>Item Description</Table.HeaderCell>
                          <Table.HeaderCell>Ordering Price</Table.HeaderCell>
                          {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin' || isPresalesWorkflow) && (
                            <Table.HeaderCell>Selling Price</Table.HeaderCell>
                          )}
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {i.historyList.map((i, k) => (
                          <Table.Row key={k}>
                            <Table.Cell>{i.itemType}</Table.Cell>
                            <Table.Cell>{i.itemName}</Table.Cell>
                            <Table.Cell>{i.itemDescription}</Table.Cell>
                            <Table.Cell>{i.orderingPrice?.toLocaleString()}</Table.Cell>
                            {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin' || isPresalesWorkflow) && (
                              <Table.Cell>{i.sellingPrice?.toLocaleString()}</Table.Cell>
                            )}
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

export default AccordionProductService;

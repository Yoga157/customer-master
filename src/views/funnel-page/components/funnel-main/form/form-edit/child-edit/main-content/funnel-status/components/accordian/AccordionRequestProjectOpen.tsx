import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Icon, Table } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectGetActivityRequestOpen } from 'selectors/funnel/FunnelSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IStore from 'models/IStore';
import './accordion.scss';

function AccordionRequestProjectOpen(props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const getActivityReqReopenSA = useSelector((state: IStore) => selectGetActivityRequestOpen(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelSalesAnalystActions.REQUEST_GET_ACTIVITY_REOPEN_SA]));

  return (
    <Accordion fluid styled className="containerAccordionRequest">
      <LoadingIndicator isActive={isRequesting}>
        <Accordion.Title active={activeIndex === 1} onClick={handleClick} index={1}>
          <Icon name="dropdown" />
          {'HISTORY'}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={3}>Date</Table.HeaderCell>
                <Table.HeaderCell width={3}>Creator</Table.HeaderCell>
                <Table.HeaderCell width={9}>Reasson</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {!isRequesting && getActivityReqReopenSA?.length === 0 && (
                <Table.Row>
                  <Table.Cell width="1" colSpan={4} textAlign="center">
                    No Data
                  </Table.Cell>
                </Table.Row>
              )}

              {!isRequesting &&
                getActivityReqReopenSA?.map((i: any, k) => (
                  <Table.Row key={k}>
                    <Table.Cell width="1">{i.no}</Table.Cell>
                    <Table.Cell>{i.date}</Table.Cell>
                    <Table.Cell>{i.creator}</Table.Cell>
                    <Table.Cell>{ReactHtmlParser(i.reasson)}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </LoadingIndicator>
    </Accordion>
  );
}

export default AccordionRequestProjectOpen;

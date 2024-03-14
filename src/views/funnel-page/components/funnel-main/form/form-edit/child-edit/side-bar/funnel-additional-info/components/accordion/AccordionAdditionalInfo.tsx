import React, { Fragment, useState } from 'react';
import { Accordion, Card, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react';

function AccordionAdditionalInfo(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  let dummy = [
    {
      title: 'Additional Info - 26 Juni 2021 11:30:15',
      data: [
        {
          compellingEvent: '20000000',
          customerBudgetWinningPrice: '2',
          supporter: '200000',
          enemy: '200000',
          fox: '20000000',
          competitor: '2',
          competitorProduct: '200000',
          competitorService: '200000',
          competitorAmount: '200000',
          customerNeeds: '200000',
        },
        {
          compellingEvent: '20000000',
          customerBudgetWinningPrice: '2',
          supporter: '200000',
          enemy: '200000',
          fox: '20000000',
          competitor: '2',
          competitorProduct: '200000',
          competitorService: '200000',
          competitorAmount: '200000',
          customerNeeds: '200000',
        },
      ],
    },
    {
      title: 'Additional Info - 23 Juni 2021 11:30:15',
      data: [
        {
          compellingEvent: '20000000',
          customerBudgetWinningPrice: '2',
          supporter: '200000',
          enemy: '200000',
          fox: '20000000',
          competitor: '2',
          competitorProduct: '200000',
          competitorService: '200000',
          competitorAmount: '200000',
          customerNeeds: '200000',
        },
      ],
    },
  ];

  return (
    <Fragment>
      <Card.Header className="bold-8">Additional Info - Revision History</Card.Header>
      <Divider />
      <Accordion fluid styled style={{ height: 400, overflow: 'auto' }}>
        {dummy.map((i, k) => {
          return (
            <>
              <Accordion.Title active={activeIndex === k} onClick={handleClick} index={k} key={k}>
                <Icon name="dropdown" />
                {i.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === k}>
                <Table striped>
                  <Table.Header>
                    <Table.Row>
                      {/* <Table.HeaderCell></Table.HeaderCell> */}
                      <Table.HeaderCell>Compelling Event</Table.HeaderCell>
                      <Table.HeaderCell>Customer Budget / Winning Price</Table.HeaderCell>
                      <Table.HeaderCell>Supporter</Table.HeaderCell>
                      <Table.HeaderCell>Enemy</Table.HeaderCell>
                      <Table.HeaderCell>Fox</Table.HeaderCell>
                      <Table.HeaderCell>Competitor</Table.HeaderCell>
                      <Table.HeaderCell>Competitor Product</Table.HeaderCell>
                      <Table.HeaderCell>Competitor Service</Table.HeaderCell>
                      <Table.HeaderCell>Competitor Amount</Table.HeaderCell>
                      <Table.HeaderCell>Customer Needs</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {i.data.map((i, k) => (
                      <>
                        <Table.Row key={k}>
                          {/* <Table.Cell width="1"></Table.Cell> */}
                          <Table.Cell>{i.compellingEvent}</Table.Cell>
                          <Table.Cell>{i.customerBudgetWinningPrice}</Table.Cell>
                          <Table.Cell>{i.supporter}</Table.Cell>
                          <Table.Cell>{i.enemy}</Table.Cell>
                          <Table.Cell>{i.fox}</Table.Cell>
                          <Table.Cell>{i.competitor}</Table.Cell>
                          <Table.Cell>{i.competitorProduct}</Table.Cell>
                          <Table.Cell>{i.competitorService}</Table.Cell>
                          <Table.Cell>{i.competitorAmount}</Table.Cell>
                          <Table.Cell>{i.customerNeeds}</Table.Cell>
                        </Table.Row>
                      </>
                    ))}
                  </Table.Body>
                </Table>
              </Accordion.Content>
            </>
          );
        })}
      </Accordion>
    </Fragment>
  );
}

export default AccordionAdditionalInfo;

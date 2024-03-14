import React, { Fragment, useState } from 'react';
import { Accordion, Card, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react';

function AccordionCustomerDetail(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  let dummy = [
    {
      title: 'Customer Details - 26 Juni 2021 11:30:15',
      data: [
        {
          customerName: '20000000',
          customerAddress: '2',
          phone: '200000',
          NPWP: '200000',
        },
        {
          customerName: '20000000',
          customerAddress: '2',
          phone: '200000',
          NPWP: '200000',
        },
      ],
    },
    {
      title: 'Customer Details - 23 Juni 2021 11:30:15',
      data: [
        {
          customerName: '20000000',
          customerAddress: '2',
          phone: '200000',
          NPWP: '200000',
        },
      ],
    },
  ];

  return (
    <Fragment>
      <Card.Header className="bold-8">Customer Details - Revision History</Card.Header>
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
                      <Table.HeaderCell>Customer Name</Table.HeaderCell>
                      <Table.HeaderCell>Customer Address</Table.HeaderCell>
                      <Table.HeaderCell>Phone</Table.HeaderCell>
                      <Table.HeaderCell>NPWP</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {i.data.map((i, k) => (
                      <>
                        <Table.Row key={k}>
                          {/* <Table.Cell width="1"></Table.Cell> */}
                          <Table.Cell>{i.customerName}</Table.Cell>
                          <Table.Cell>{i.customerAddress}</Table.Cell>
                          <Table.Cell>{i.phone}</Table.Cell>
                          <Table.Cell>{i.NPWP}</Table.Cell>
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

export default AccordionCustomerDetail;

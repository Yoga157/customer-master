import React, { Fragment, useState } from 'react';
import { Accordion, Card, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react';

function AccordianSoftware(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  let dummy = [
    {
      title: 'Software - 26 Juni 2021 11:30:15',
      data: [
        {
          businessSoftware: '-',
          programmingSoftware: '-',
          database: '-',
          infrastructureSoftware: '-',
          operatingSystem: '-',
        },
        {
          businessSoftware: '-',
          programmingSoftware: '-',
          database: '-',
          infrastructureSoftware: '-',
          operatingSystem: '-',
        },
      ],
    },
    {
      title: 'Software - 23 Juni 2021 11:30:15',
      data: [
        {
          businessSoftware: '-',
          programmingSoftware: '-',
          database: '-',
          infrastructureSoftware: '-',
          operatingSystem: '-',
        },
      ],
    },
  ];

  return (
    <Fragment>
      <Card.Header className="bold-8">Software - Revision History</Card.Header>
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
                      <Table.HeaderCell>Business Software</Table.HeaderCell>
                      <Table.HeaderCell>Programming Software</Table.HeaderCell>
                      <Table.HeaderCell>Database</Table.HeaderCell>
                      <Table.HeaderCell>Infrastructure Software</Table.HeaderCell>
                      <Table.HeaderCell>Operating System</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {i.data.map((i, k) => (
                      <>
                        <Table.Row key={k}>
                          {/* <Table.Cell width="1"></Table.Cell> */}
                          <Table.Cell>{i.businessSoftware}</Table.Cell>
                          <Table.Cell>{i.programmingSoftware}</Table.Cell>
                          <Table.Cell>{i.database}</Table.Cell>
                          <Table.Cell>{i.infrastructureSoftware}</Table.Cell>
                          <Table.Cell>{i.operatingSystem}</Table.Cell>
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

export default AccordianSoftware;

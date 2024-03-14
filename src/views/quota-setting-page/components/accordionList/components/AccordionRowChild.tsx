import React, { useState } from 'react';
import { Accordion, Form, Grid, Header, Icon } from 'semantic-ui-react';
import { Button, TextInput, Tooltips, CheckBox } from 'views/components/UI';
import { Form as FinalForm, Field } from 'react-final-form';
import './AccordionRowChildStyles.scss';

const AccordionRowChild = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(false);

  const [disableComponent, setDisableComponent] = useState(true);

  const onSubmitHandler = (values) => {
    console.log('test');
  };

  const handleClick = () => {
    setActiveIndex(!activeIndex);
  };

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  return (
    <Grid className={`TeamQuotaChild`}>
      <Grid.Row>
        <Grid.Column>
          <Accordion fluid styled>
            <Accordion.Title active={activeIndex} onClick={handleClick}>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Icon name="dropdown" />
                    Sales Name Child xxxx <br />
                    <span className="ml-20">Divisi Name Child xxxx</span>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <h2>423,111,555</h2>
                    <span>1 January 2022 - 31 December 2022</span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Title>
            <Accordion.Content active={activeIndex}>
              <FinalForm
                onSubmit={(values: any) => onSubmitHandler(values)}
                // initialValues={}
                render={({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} loading={false}>
                    <Grid>
                      <Grid.Row className="pt-0 px-2r">
                        <Grid.Column width={16}>
                          <h4>
                            JHONAATHAN DOE QUOTA
                            {disableComponent && (
                              <Tooltips
                                content="Edit My Own Quota"
                                trigger={<Button basic type="button" compact icon="edit" onClick={(e) => onHeaderSubmitHandler(e)} />}
                              />
                            )}
                            {!disableComponent && (
                              <>
                                <Tooltips
                                  content="Cancel Update"
                                  trigger={<Button type="button" basic compact icon="cancel" onClick={() => setDisableComponent(true)} />}
                                />
                                <Tooltips content="Save Update" trigger={<Button basic compact icon="save" />} />
                              </>
                            )}
                          </h4>
                        </Grid.Column>
                        <Grid.Column width={8} className="ViewFormChild">
                          <Field name="contractNo" component={TextInput} placeholder="e.g.01234" labelName="Quota GPM" disabled={disableComponent} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    {/*  */}
                    <Grid columns={2}>
                      <Grid.Column computer={11} mobile={16}>
                        <div className="card-quota-brand-child">
                          <Header as="h3">Quota Brand</Header>
                          <Grid columns={2}>
                            <Grid.Column computer={8} mobile={16}>
                              <div className="col-hardware">
                                <Grid className="header-hardware-child" columns="equal">
                                  <Grid.Column textAlign="left" className="pt-1r pb-0">
                                    <Header as="h3">
                                      <Header.Content>Hardware</Header.Content>
                                    </Header>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" className="pt-1r pb-0">
                                    <Header as="h3">
                                      6<span>/10</span> <span>Available</span>
                                    </Header>
                                  </Grid.Column>
                                </Grid>
                                <span className="text-danger">Choose 6 products to meet minimum requirement</span>
                                {['HPE', 'HPI', 'HITACHI', 'DELL-EUC', 'DELL-ESG', 'CISCO', 'NETAPP', 'FORTINET', 'HUAWEI', 'LENOVO', 'Paloalto'].map(
                                  (e, i) => {
                                    return (
                                      <Grid key={i} className="item-hardware" columns="equal" verticalAlign="middle">
                                        <Grid.Column textAlign="left" className="pt-1r pb-0">
                                          <Header as="span">
                                            <Header.Content>
                                              {e}
                                              <Header.Subheader as="h3">{1 + i * 4},000,000,000,00</Header.Subheader>
                                            </Header.Content>
                                          </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign="right" className="pt-1r pb-0 item-toggle" verticalAlign="middle">
                                          <span>OFF</span>
                                          <span>
                                            <Field name="hpe" toggle component={CheckBox} disabled={disableComponent} />
                                          </span>
                                          <span>ON</span>
                                        </Grid.Column>
                                      </Grid>
                                    );
                                  }
                                )}
                              </div>
                            </Grid.Column>
                            <Grid.Column computer={8} mobile={16}>
                              <div className="col-software">
                                <Grid className="header-software-child" columns="equal">
                                  <Grid.Column textAlign="left" className="pt-1r pb-0">
                                    <Header as="h3">
                                      <Header.Content>Software</Header.Content>
                                    </Header>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" className="pt-1r pb-0">
                                    <Header as="h3">
                                      6<span>/11</span> <span>Available</span>
                                    </Header>
                                  </Grid.Column>
                                </Grid>
                                <span className="text-danger">Choose 6 software to meet minimum requirement</span>
                                {[
                                  'VMWARE',
                                  'VERITAS',
                                  'VEEAM',
                                  'UPATH',
                                  'NUTANIX',
                                  'AWS',
                                  'Citrix',
                                  'Cohesity',
                                  'Sophos',
                                  'EnterpriseDB',
                                  'Apigee/Axway/Kong',
                                ].map((e, i) => {
                                  return (
                                    <Grid key={i} className="item-hardware" columns="equal" verticalAlign="middle">
                                      <Grid.Column textAlign="left" className="pt-1r pb-0">
                                        <Header as="span">
                                          <Header.Content>
                                            {e}
                                            <Header.Subheader as="h3">{1 + i * 3},000,000,000,00</Header.Subheader>
                                          </Header.Content>
                                        </Header>
                                      </Grid.Column>
                                      <Grid.Column textAlign="right" className="pt-1r pb-0 item-toggle" verticalAlign="middle">
                                        <span>OFF</span>
                                        <span>
                                          <Field name="hpe" toggle component={CheckBox} disabled={disableComponent} />
                                        </span>
                                        <span>ON</span>
                                      </Grid.Column>
                                    </Grid>
                                  );
                                })}
                              </div>
                            </Grid.Column>
                          </Grid>
                        </div>
                      </Grid.Column>
                      <Grid.Column computer={5} mobile={16}>
                        <div className="card-quota-service-child">
                          <Grid className="header-quota-service-child">
                            <Grid.Column textAlign="left" className="pt-1r pb-0">
                              <Header as="h3">
                                <Header.Content>Quota Service</Header.Content>
                              </Header>
                            </Grid.Column>
                          </Grid>
                          {[1, 2, 3, 4, 5].map((i) => {
                            return (
                              <Grid className="item-quota-service" key={i}>
                                <Grid.Column textAlign="left" className="pt-1 pb-0">
                                  <Header as="span">
                                    <Header.Content>
                                      Cloud Services
                                      <Header.Subheader as="h3">{i * 3},000,000,000,00</Header.Subheader>
                                    </Header.Content>
                                  </Header>
                                </Grid.Column>
                              </Grid>
                            );
                          })}
                        </div>
                      </Grid.Column>
                    </Grid>
                  </Form>
                )}
              />
            </Accordion.Content>
          </Accordion>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AccordionRowChild;

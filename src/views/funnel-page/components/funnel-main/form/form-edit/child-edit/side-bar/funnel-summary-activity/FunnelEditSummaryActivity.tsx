import React, { useState } from 'react';
import { Grid, Header, Icon, Form, Label, Menu } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { LabelSubLabel } from 'views/components/UI';

interface IProps {
  //serviceCatalog:ServiceCatalogModel
}

const FunnelEditSummaryActivity: React.FC<IProps> = () => {
  const [disableComponent, setDisableComponent] = useState(true);
  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };
  const onSubmitHandler = (values: any) => {
    console.log(values);
    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>Acitivity Summary</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Menu compact>
                  <Menu.Item as="a">
                    <Icon name="edit" />
                    <Label color="red" floating circular>
                      22
                    </Label>
                  </Menu.Item>
                  <Menu.Item as="a">
                    <Icon name="paperclip" />
                    <Label color="red" floating circular>
                      22
                    </Label>
                  </Menu.Item>
                  <Menu.Item as="a">
                    <Icon name="users" />
                    <Label color="red" floating circular>
                      22
                    </Label>
                  </Menu.Item>
                  <Menu.Item as="a">
                    <Icon name="clock" />
                    <Label color="red" floating circular>
                      22
                    </Label>
                  </Menu.Item>
                  <Menu.Item as="a">
                    <Icon name="chat" />
                    <Label color="red" floating circular>
                      22
                    </Label>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid.Row>
            <div className="ui divider FullHdivider mt-0"></div>
            <Grid.Row columns={2}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="totalOrderingProduct"
                  component={LabelSubLabel}
                  labelName="Sales Last Activity"
                  values="999"
                  valueDetails="days ago"
                  sublabel="by. Jhon Doe"
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="totalOrderingProduct"
                  component={LabelSubLabel}
                  labelName="Others Last Activit"
                  values="999"
                  valueDetails="days ago"
                  sublabel="by. Liam Nelson"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="totalOrderingProduct"
                  component={LabelSubLabel}
                  labelName="Last Status Change"
                  values="999"
                  valueDetails="days ago"
                  sublabel="by. Liam Nelson"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="ViewLabel">
                <Field
                  name="totalOrderingProduct"
                  component={LabelSubLabel}
                  labelName="Last Notes"
                  values="999"
                  valueDetails="days ago"
                  sublabel="by. Liam Nelson"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelEditSummaryActivity;

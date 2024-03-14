import React from 'react';
import NumberFormat from 'react-number-format';
import { Grid, Header, Icon } from 'semantic-ui-react';
import './totalSalesAndGpmStyle.scss'

interface IProps {
CBVAmount: number;
usedAmount: number;
remainingAmount: number;
}

const TotalSalesAndGpm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { CBVAmount, usedAmount, remainingAmount } = props;
  return (
    <Grid>
        <Grid.Row>
          <Grid.Column className="GrandTotalNote" mobile={16} tablet={16} computer={16} floated="right">
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="money" />
                    <Header.Content>
                      <Header.Subheader>Total CBV Amount</Header.Subheader>
                      <NumberFormat value={CBVAmount?.toLocaleString()} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                    </Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="money" />
                    <Header.Content>
                      <Header.Subheader>Total Used Amount</Header.Subheader>
                      <NumberFormat value={usedAmount?.toLocaleString()} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                    </Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="money" />
                    <Header.Content>
                      <Header.Subheader>Total Remaining Amount</Header.Subheader>
                      <NumberFormat value={remainingAmount?.toLocaleString()} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
    </Grid>
  );
};

export default TotalSalesAndGpm;

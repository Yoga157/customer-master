import React from 'react';
import NumberFormat from 'react-number-format';
import IFunnelTable from 'selectors/funnel/models/IFunnelTable';
import { Button, Grid, Header, Icon, Popup } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData: IFunnelTable;
}

const TotalSalesAndGpm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  return (
    <Grid>
      {(currentUser.role === 'Sales' || currentUser.role === 'SuperAdmin') && (
        <Grid.Row>
          <Grid.Column className="GrandTotalNote" mobile={16} tablet={16} computer={8} floated="right">
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="money" />
                    <Header.Content>
                      <Header.Subheader>Total Ordering (IDR)</Header.Subheader>
                      <NumberFormat value={tableData.totalOrderingItem} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                    </Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="money" />
                    <Header.Content>
                      <Header.Subheader>Total Selling (IDR)</Header.Subheader>
                      <NumberFormat value={tableData.totalSellingPriceSum} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                    </Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="money" />
                    <Header.Content>
                      <Header.Subheader>Total GPM (IDR)</Header.Subheader>
                      <NumberFormat value={tableData.gpmAmountSum} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      )}
      {currentUser.role != 'Sales' && currentUser.role !== 'SuperAdmin' && (
        <Grid.Row>
          <Grid.Column className="GrandTotalNote" width={4} floated="left">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2">
                    <Icon name="money" />
                    <Header.Content>
                      <Header.Subheader>Total Ordering Item (IDR)</Header.Subheader>
                      <NumberFormat value={tableData.totalOrderingItem} displayType={'text'} thousandSeparator={true} />
                    </Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

export default TotalSalesAndGpm;

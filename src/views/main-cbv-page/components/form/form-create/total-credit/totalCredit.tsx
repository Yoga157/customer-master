import React from 'react';
import NumberFormat from 'react-number-format';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector } from 'react-redux';
import IStore from 'models/IStore';
import './totalCredit.scss'

interface IProps {
CreditEntitlement: string;
CreditUsage: string;
CreditRemaining: string;
CreditRemainingLastPeriod: string;
}

const TotalCredit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { CreditEntitlement, CreditUsage, CreditRemaining, CreditRemainingLastPeriod } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  return (
    <Grid className='TotalCreditCBV'>
      <Grid.Row>
        <Grid.Column mobile={8} tablet={4} computer={4} className="WrapperColumn mt-1r">
          <Header as="h2">
            <Header.Content>
              <Header.Subheader>Credit Entitlement</Header.Subheader>
              <NumberFormat value={CreditEntitlement} displayType={'text'} thousandSeparator={true} decimalScale={2} />
            </Header.Content>
          </Header>
        </Grid.Column>
        
        <Grid.Column mobile={8} tablet={4} computer={4} className="WrapperColumn  mt-1r">
          <Grid.Row>
            <Grid.Column >
              <Icon className='SeparateIcon' name='plus' size='small' />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">
                <Header.Content>
                  <Header.Subheader>Last Period</Header.Subheader>
                  <NumberFormat value={CreditRemainingLastPeriod} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
       
        <Grid.Column mobile={8} tablet={4} computer={4} className="WrapperColumn  mt-1r">
          <Grid.Row>
            <Grid.Column>
              <Icon className='SeparateIcon' name='minus' size='small' />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">
                <Header.Content>
                  <Header.Subheader>Credit Usage</Header.Subheader>
                  <NumberFormat value={CreditUsage} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        
        <Grid.Column mobile={8} tablet={4} computer={4} className="WrapperColumn  mt-1r">
          <Grid.Row>
            <Grid.Column>
            <Header as="h2">
              <Header.Content>
                <Header.Subheader>Credit Remaining</Header.Subheader>
                <NumberFormat value={CreditRemaining} displayType={'text'} thousandSeparator={true} decimalScale={2} />
              </Header.Content>
            </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TotalCredit;

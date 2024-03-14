import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import BillingTable from './table/BillingTable';
import './BillingServiceForm.scss';

interface IProps {
  DataPerProduct: any;
}

const BillingServiceForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { DataPerProduct } = props;

  return (
    <Fragment>
      <Grid padded>
        <Grid.Row columns="equal">
          <Grid.Column>
            <h4 className="ml-m-1r">Detail Billing Per Product Code</h4>
          </Grid.Column>
        </Grid.Row>
        <div className="wrapper-table-Billing">
          <BillingTable DataPerProduct={DataPerProduct.awsBillingDetail} />
        </div>
        <Grid.Row columns={'equal'}>
          <Grid.Column textAlign="right" floated="right" mobile={16} tablet={8} computer={8}>
            <div className="wrapperTotalUsage">
              <p>
                Total Usage Amount <span>{DataPerProduct.totalAmount}</span>
              </p>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default BillingServiceForm;

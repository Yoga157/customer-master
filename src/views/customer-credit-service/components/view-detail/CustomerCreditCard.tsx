import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { History } from 'history';
import classes from './SoftwareCard.module.scss';

import SoftwareHeaderModel from 'stores/software/models/SoftwareHeaderModel';
import SoftwareMainModel from 'stores/software/models/SoftwareMainModel';
import { selectSoftware, selectSoftwareMain } from 'selectors/software/SoftwareSelector';
//import ISoftwareHeaderTableRow from 'selectors/software/models/ISoftwareHeaderTableRow';
import IStore from 'models/IStore';
import MainContent from './main-content/MainContent';
import TableViewDetail from './table/CustomerCreditTableDetail';
import DetailActivity from './detail-activity/CustomerCreditServiceActivity';
import * as CustomerCreditAction from 'stores/customer-credit-service/CustomerCreditActions';
import { selectCreditSource, selectUsageAmount, selectUsageDetail } from 'selectors/customer-credit-service/CustomerCreditServiceSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ICreditSourceTableRow from 'selectors/customer-credit-service/models/ICreditSourceTableRow';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  history: History;
}

const CustomerCreditCard: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  let form;
  const dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(CustomerCreditAction.requestUsageDetail(1, 10, +props.match.params.id));
    dispatch(CustomerCreditAction.requestUsageAmount(1, 10, +props.match.params.id));
    dispatch(CustomerCreditAction.requestCreditSource(1, 10, +props.match.params.id));
    dispatch(CustomerCreditAction.requestListDetailCreditService(+props.match.params.id));
  }, []);

  const usageDetail = useSelector((state: IStore) => selectUsageDetail(state));
  const usageAmount = useSelector((state: IStore) => selectUsageAmount(state));
  const creditSource = useSelector((state: IStore) => selectCreditSource(state));

  return (
    <Card centered raised className={props.match.params.id ? classes.CardEdit : classes.Card}>
      <Card.Content>
        <Card.Header>Customer Credit Service Details</Card.Header>
      </Card.Content>
      <Card.Content>
        <MainContent history={props.history} id={+props.match.params.id} />
        <TableViewDetail title="Usage Detail" tableData={usageDetail} type="usage-detail" salesID={+props.match.params.id} />
        <TableViewDetail title="Usage Amount by Customer" tableData={usageAmount} type="usage-amount" salesID={+props.match.params.id} />
        <TableViewDetail title="Credit Source Data" tableData={creditSource} type="credit-source" salesID={+props.match.params.id} />
        <DetailActivity salesID={+props.match.params.id} />
      </Card.Content>
    </Card>
  );
};

export default withRouter(CustomerCreditCard);

import React, { useCallback } from 'react';
import { Input, Button } from 'semantic-ui-react';
import styles from './SearchTicket.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import * as CustomerCreditActions from 'stores/customer-credit-service/CustomerCreditActions';
export const SearchTicekt: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onChangeSearch = (event: any, data: any) => {
    if (data.value.length > 1) {
      dispatch(CustomerCreditActions.requestUsageDetailSearch(1, 15, data.value, currentUser.employeeID));
    }

    if (data.value.length < 1) {
      dispatch(CustomerCreditActions.requestUsageDetail(1, 10, currentUser.employeeID));
    }
  };

  return (
    <Input
      fluid
      flex={1}
      className={styles.Rounded + ' roundedSearchInput '}
      icon="search"
      iconPosition="left"
      placeholder="Search registered ticket here..."
      onChange={onChangeSearch}
    />
  );
};

export default SearchTicekt;

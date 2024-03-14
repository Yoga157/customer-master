import React, { useState } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';
import styles from './InputSearch.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import * as CustomerCreditActions from 'stores/customer-credit-service/CustomerCreditActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {}

const InputSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerCreditActions.REQUEST_CUSTOMER_CREDIT_SEARCH]));

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(CustomerCreditActions.requestCustomerCreditSales(1, 15, currentUser.employeeID));
      setSearchText('');
      setBtnCancel(false);
    } else {
      if (searchText.length > 1) {
        dispatch(CustomerCreditActions.requestCustomerCreditSearch(1, 15, searchText, currentUser.employeeID));
        setBtnCancel(!btnCancel);
      }
    }
  };

  return (
    <Grid.Column className="SearchFormDQ">
      <Input
        className={styles.Rounded + ' roundedSearchInput '}
        placeholder="Search..."
        onChange={onChangeSearch}
        onKeyPress={(event) => {
          if (event.charCode == 13) {
            onSearch();
          }
        }}
        value={searchText}
      />
      <Button
        className="Rounded SearchBtn"
        size="small"
        color="blue"
        icon={btnCancel ? 'close' : 'search'}
        onClick={onSearch}
        loading={isRequesting}
      />
    </Grid.Column>
  );
};

export default InputSearch;

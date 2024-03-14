import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { Grid, GridColumn, Input, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchDelegation.module.scss';

import * as DelegationActions from 'stores/delegation/DelegationActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  setSearch: any;
  setActivePage: (page: number) => void;
}

export const SearchDelegation: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(DelegationActions.requestDelegation(currentUser.employeeID, 1, 10));
      setSearchText('');
      props.setSearch('');
      props.setActivePage(1);
      setBtnCancel(false);
    } else {
      if (searchText.length > 1) {
        dispatch(DelegationActions.requestDelegation(currentUser.employeeID, 1, 10, searchText));
        props.setSearch(searchText);
        props.setActivePage(1);
        setBtnCancel(!btnCancel);
      }
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [DelegationActions.REQUEST_DELEGATION]));

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
        loading={isRequesting}
        onClick={onSearch}
      />
    </Grid.Column>
  );
};

export default SearchDelegation;

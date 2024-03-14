import React, { useCallback, useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './InputSearch.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

export const InputSearch: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_FUNNELS_SEARCH]));

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 'funnel', 1, 15));
      setSearchText('');
      setBtnCancel(false);
    } else {
      if (searchText.length > 1) {
        dispatch(FunnelActions.requestSearchFunnel(currentUser.employeeID, searchText, 1, 15, 'funnel', 'funnelGenID', 'descending'));
        setBtnCancel(!btnCancel);
      }
    }
  };

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

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

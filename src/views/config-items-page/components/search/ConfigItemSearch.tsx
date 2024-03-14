import React, { useEffect, useState, useCallback } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import AdvancedSearch from '../advance-search/AdvanceSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './Styles.module.scss';
import IStore from 'models/IStore';

const ConfigItemSearch: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ConfigItemsActions.CONFIG_ITEMS_LIST_SEARCH]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const column = useSelector((state: IStore) => state.configItems.listData.column);
  const filter = useSelector((state: IStore) => state.configItems.listData.filter);
  const sort = useSelector((state: IStore) => state.configItems.listData.sorting);

  const onShowAdvancedSearch = useCallback((): void => {
    dispatch(SidebarContainerActions.OPEN(<AdvancedSearch />));
  }, [dispatch]);

  useEffect(() => {
    if (filter) {
      onChangeSearch('', { value: '' });
    }
  }, [filter]);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(ConfigItemsActions.reqConfigItemsList(1, 10, 'poNumber', 'descending', currentUser.employeeID));
      setBtnCancel(false);
      setSearchText('');
    } else {
      if (searchText.length > 1) {
        dispatch(ConfigItemsActions.reqConfigItemsListSearch(1, 10, column, sort, searchText, currentUser.employeeID, 'PERPAGE'));
        setBtnCancel(!btnCancel);
        dispatch(ConfigItemsActions.setActivePageListConf(1));
      }
    }
  };

  return (
    <Grid.Column className="SearchFormDQ">
      <Button
        className="AdvSearchBtn"
        icon="sliders horizontal"
        size="small"
        color="yellow"
        button="true"
        floating="true"
        onClick={onShowAdvancedSearch}
      />
      <Input
        className={styles.Rounded + ' roundedSearchInput '}
        // iconPosition="left"
        placeholder="Serch by PO Number, Serial Number, etc .."
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

export default ConfigItemSearch;

import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import AdvancedSearch from '../advance-search/AdvanceSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import * as PMOActions from 'stores/pmo/PMOActions';
import styles from './Styles.module.scss';
import IStore from 'models/IStore';

const PMOSearch: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.PMO_LIST_SEARCH]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: any = useSelector((state: IStore) => state.pmo.data.filter);
  const column: any = useSelector((state: IStore) => state.pmo.data.column);

  const onShowAdvancedSearch = useCallback((): void => {
    dispatch(SidebarContainerActions.OPEN(<AdvancedSearch />));
  }, [dispatch]);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(PMOActions.reqPMOList(1, 15, column, 'descending', currentUser.employeeID));
      dispatch(PMOActions.setActivePage(1));
      setBtnCancel(false);
      setSearchText('');
    } else {
      if (searchText.length > 1) {
        dispatch(PMOActions.reqPMOListBySearch(1, 15, column, 'descending', searchText, currentUser.employeeID));
        dispatch(PMOActions.setActivePage(1));
        setBtnCancel(!btnCancel);
      }
    }
  };

  useEffect(() => {
    if (filter) {
      onChangeSearch(null, { value: '' });
    }
  }, [filter]);

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
        placeholder="Type: funnel id, account name, sales name, project name or project alias"
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

export default PMOSearch;

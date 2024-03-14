import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import AdvancedSearch from '../advance-search/AdvanceSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './Styles.module.scss';
import IStore from 'models/IStore';

const SearchMain: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: any = useSelector((state: IStore) => state.workList?.workList?.filter);

  const onShowAdvancedSearch = useCallback((): void => {
    dispatch(SidebarContainerActions.OPEN(<AdvancedSearch setBtnCancel={setBtnCancel} />));
  }, [dispatch]);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(WorkListActions.getWorklist(1, 15, 'workId', 'descending', currentUser.employeeID));
      setBtnCancel(false);
      setSearchText('');
    } else {
      if (searchText.length > 1) {
        dispatch(WorkListActions.getWorklistSearch(1, 15, 'workId', 'descending', searchText, currentUser.employeeID));
        setBtnCancel(!btnCancel);
      }
    }
    dispatch(WorkListActions.setActivePage(1));
  };

  useEffect(() => {
    if (filter) {
      onChangeSearch(null, { value: '' });
    }
  }, [filter]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [WorkListActions.GET_WORK_LIST_SEARCH]));

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
        // icon="search"
        placeholder="Type: work id, project name, customer name, enginer name, descriptio etc"
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

export default SearchMain;

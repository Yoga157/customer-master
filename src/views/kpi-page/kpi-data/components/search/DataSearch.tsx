import React, { useState, useCallback } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import DataAdvancedSearch from './DataAdvancedSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as KpiDataActions from 'stores/kpi/kpi-data/KpiDataActions';
import styles from './InputSearch.module.scss';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

const DataSearch: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onShowAdvancedSearch = useCallback((): void => {
    dispatch(SidebarContainerActions.OPEN(<DataAdvancedSearch setSearchText={setSearchText} setBtnCancel={setBtnCancel} />));
  }, [dispatch]);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(KpiDataActions.requestKpiDatas(new Date().getFullYear(), currentUser.userName, 1, 25));
      dispatch(KpiDataActions.setActivePage(1));
      setBtnCancel(false);
      setSearchText('');
    } else {
      if (searchText.length > 1) {
        dispatch(KpiDataActions.reqSearchKpiData(1, 25, currentUser.userName, searchText));
        dispatch(KpiDataActions.setActivePage(1));
        setBtnCancel(!btnCancel);
      }
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [KpiDataActions.REQUEST_SEARCH_KPI_DATA]));

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

export default DataSearch;

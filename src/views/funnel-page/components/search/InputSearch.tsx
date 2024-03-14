import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './InputSearch.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import AdvancedSearch from './AdvancedSearch';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ConfigTableColumn from './ConfigTableColumn';

interface IProps {
  searchType: string;
}

export const InputSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { searchType } = props;
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);

  useEffect(() => {
    setSearchText('');
    setBtnCancel(false);
  }, [searchType, filter]);

  const onShowAdvancedSearch = useCallback(
    (searchType): void => {
      dispatch(SidebarContainerActions.OPEN(<AdvancedSearch searchType={searchType} />));
    },
    [dispatch]
  );

  const onShowConfigColumn = useCallback(
    (searchType): void => {
      // dispatch(SidebarContainerActions.OPEN(<ConfigTableColumn />));
    },
    [dispatch]
  );

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (searchType === 'funnel') {
      if (btnCancel || searchText.length === 0) {
        dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 'funnel', 1, 15));
        dispatch(FunnelActions.setActivePage(1));
        setSearchText('');
        setBtnCancel(false);
      } else {
        if (searchText.length > 1) {
          dispatch(FunnelActions.requestSearchFunnel(currentUser.employeeID, searchText, 1, 15, 'funnel', 'funnelGenID', 'descending'));
          dispatch(FunnelActions.setActivePage(1));
          setBtnCancel(!btnCancel);
        }
      }
    } else {
      if (btnCancel || searchText.length === 0) {
        dispatch(FunnelActions.requestSA(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 1, 15));
        dispatch(FunnelActions.setActivePage(1));
        setSearchText('');
        setBtnCancel(false);
      } else {
        if (searchText.length > 1) {
          dispatch(FunnelActions.requestSearchSA(currentUser.employeeID, searchText, 1, 15, 'funnelGenID', 'descending'));
          dispatch(FunnelActions.setActivePage(1));
          setBtnCancel(!btnCancel);
        }
      }
    }
  };

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_FUNNELS_SEARCH, FunnelActions.REQUEST_SA_SEARCH])
  );

  return (
    <Grid.Column className="SearchFormDQ">
      {/* <Button
        className="AdvSearchBtn"
        icon="sliders horizontal"
        size="small"
        color="yellow"
        button="true"
        floating="true"
        onClick={() => onShowConfigColumn(searchType)}
      /> */}
      <Button
        className="AdvSearchBtn"
        icon="sliders horizontal"
        size="small"
        color="yellow"
        button="true"
        floating="true"
        onClick={() => onShowAdvancedSearch(searchType)}
      />
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
        icon={btnCancel ? 'close' : 'search'}
        size="small"
        color="blue"
        onClick={onSearch}
        loading={isRequesting}
      />
    </Grid.Column>
  );
};

export default InputSearch;

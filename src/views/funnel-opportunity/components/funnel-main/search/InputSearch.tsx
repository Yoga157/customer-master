import React, { useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './InputSearch.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import * as FunnelOpportunity from 'stores/funnel-opportunity/FunnelActivityActions';
import { useLocation, RouteProps } from 'react-router-dom';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as FunnelOpportunityA from 'stores/funnel-opportunity/FunnelActivityActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';

export const InputSearch: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (location.pathname == '/funnel-opportunity') {
      if (btnCancel || searchText.length === 0) {
        dispatch(FunnelOpportunity.requestFunnelOpp(1, 10, 'FunnelOpportunityID', 'ascending'));
        dispatch(FunnelActions.setActivePage(1));
        setSearchText('');
        setBtnCancel(false);
      } else {
        if (searchText.length > 1) {
          dispatch(FunnelOpportunity.requestSearchMarketing(1, 15, searchText));
          dispatch(FunnelActions.setActivePage(1));
          setBtnCancel(!btnCancel);
        }
      }
    } else {
      if (btnCancel || searchText.length === 0) {
        dispatch(FunnelOpportunity.requestFunnelSales(1, 10, currentUser.employeeID));
        dispatch(FunnelActions.setActivePage(1));
        setSearchText('');
        setBtnCancel(false);
      } else {
        if (searchText.length > 1) {
          dispatch(FunnelOpportunity.requestSearchOpp(1, 15, currentUser.employeeID, searchText));
          dispatch(FunnelActions.setActivePage(1));
          setBtnCancel(!btnCancel);
        }
      }
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelOpportunityA.REQUEST_SEARCH_MARKETING, FunnelOpportunityA.REQUEST_SEARCH_OPP])
  );

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
        id={'search-input-opportunity'}
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

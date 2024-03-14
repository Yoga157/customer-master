import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { Grid, Input } from 'semantic-ui-react';
import styles from './SearchBankGaransiAdmin.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { Button } from 'views/components/UI';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import AdvancedSearch from './AdvanceSearch';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';

interface IProps {
  tabPage: number;
}

const SearchBankGaransiAdmin: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filterBankGaransi: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listSearch.filter);
  const filterListExpired: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listExpiredDataAdmin.filter);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      BankGaransiActions.REQUEST_BG_SEARCH,
      BankGaransiActions.REQUEST_BG_SEARCH_EX,
      BankGaransiActions.REQUEST_MASTER_INSURANCE,
    ])
  );

  const onShowAdvancedSearch = useCallback((): void => {
    dispatch(SidebarContainerActions.OPEN(<AdvancedSearch tabPage={props.tabPage} />));
  }, [dispatch, props.tabPage]);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (props.tabPage === 0) {
      if (btnCancel || searchText.length === 0) {
        dispatch(BankGaransiActions.requestBankGaransiAdmins(currentUser.userName, 1, 15, 0, '', ''));
        setSearchText('');
        setBtnCancel(false);
      } else {
        if (searchText.length > 1) {
          dispatch(BankGaransiActions.requestBGSearch(currentUser.userName, searchText, 1, 15, 0, '', ''));
          setBtnCancel(!btnCancel);
        }
      }
    } else if (props.tabPage === 1) {
      if (btnCancel || searchText.length === 0) {
        dispatch(BankGaransiActions.requestBankGaransiAdminExs(currentUser.userName, 1, 15, 1, '', ''));
        setSearchText('');
        setBtnCancel(false);
      } else {
        if (searchText.length > 1) {
          dispatch(BankGaransiActions.requestBGExSearch(currentUser.userName, searchText, 1, 15, 1, '', ''));
          setBtnCancel(!btnCancel);
        }
      }
    } else if (props.tabPage === 2) {
      if (btnCancel || searchText.length === 0) {
        dispatch(BankGaransiActions.requestMasterInsurance(1, 15, ''));
        setSearchText('');
        setBtnCancel(false);
      } else {
        if (searchText.length > 1) {
          dispatch(BankGaransiActions.requestMasterInsurance(1, 15, searchText));
          setBtnCancel(!btnCancel);
        }
      }
    }
    dispatch(BankGaransiActions.setActivePage(1));
  };

  useEffect(() => {
    setBtnCancel(false);
    setSearchText('');
  }, [props.tabPage, filterBankGaransi, filterListExpired]);

  const inputSearch = (
    <>
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
        onClick={onSearch}
        loading={isRequesting}
      />
    </>
  );

  return (
    <Fragment>
      {props.tabPage < 2 && (
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
          {inputSearch}
        </Grid.Column>
      )}
      {props.tabPage === 2 && <Grid.Column className="SearchFormDQ">{inputSearch}</Grid.Column>}
    </Fragment>
  );
};

export default SearchBankGaransiAdmin;

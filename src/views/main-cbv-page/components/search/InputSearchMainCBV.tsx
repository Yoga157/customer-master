import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './InputSearchMainCBV.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import AdvancedSearchMainCBV from './AdvancedSearchMainCBV';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';

interface IProps {
  searchType: string;
  pageSize: number;
  page: number;
  searchText: string;
  setSearchText: any;
}

export const InputSearchMainCBV: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { searchType, pageSize, page, setSearchText, searchText } = props;
  const dispatch: Dispatch = useDispatch();
  // const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);

  useEffect(() => {
    setSearchText('');
    setBtnCancel(false);
  }, [searchType, filter]);

  const onShowAdvancedSearch = useCallback(
    (searchType): void => {
      dispatch(SidebarContainerActions.OPEN(<AdvancedSearchMainCBV searchType={searchType} />));
    },
    [dispatch]
  );

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onSearch = () => {
    dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, btnCancel ? "" : searchText,'creditId','descending', page, pageSize));
    if(btnCancel)
      {
        setSearchText('');
      }
    setBtnCancel(!btnCancel);
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
        // loading={isRequesting}
      />
    </Grid.Column>
  );
};

export default InputSearchMainCBV;

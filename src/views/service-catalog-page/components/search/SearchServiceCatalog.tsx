import React, { useCallback, useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './SearchServiceCatalog.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ServiceCatalogActions from 'stores/service-catalog/ServiceCatalogActions';

interface IProps {
  setSearch: any;
  setActivePage: (setActivePage: number) => void;
}

export const SearchServiceCatalog: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const isActive: boolean = useSelector((state: IStore) => state.serviceCatalog.isActive);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(ServiceCatalogActions.requestServiceCatalog(currentUser.employeeID, isActive ? 1 : 0, 1, pageSize));
      props.setSearch('');
      props.setActivePage(1);
      setSearchText('');
      setBtnCancel(false);
    } else {
      if (searchText.length > 1) {
        dispatch(ServiceCatalogActions.requestServiceCatalogSearch(currentUser.employeeID, searchText, 1, pageSize));
        props.setActivePage(1);
        props.setSearch(searchText);
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
      <Button className="Rounded SearchBtn" icon={btnCancel ? 'close' : 'search'} size="small" color="blue" onClick={onSearch} />
    </Grid.Column>
  );
};

export default SearchServiceCatalog;

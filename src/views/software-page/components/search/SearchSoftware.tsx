import React, { useState } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';
import styles from './SearchSoftware.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  searchText: string;
  setSearchText: (text: string) => void;
  setActivePage: (page: number) => void;
}
export const SearchSoftware: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { searchText, setSearchText, setActivePage } = props;
  const [btnCancel, setBtnCancel] = useState(false);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [SoftwareActions.REQUEST_SOFTWARES_SEARCH]));

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(SoftwareActions.requestSoftwares(1, 15));
      setActivePage(1);
      setSearchText('');
      setBtnCancel(false);
    } else {
      if (searchText.length > 1) {
        dispatch(SoftwareActions.requestSoftwareSearch(searchText, 1, 15));
        setActivePage(1);
        setBtnCancel(!btnCancel);
      }
    }
  };

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

export default SearchSoftware;

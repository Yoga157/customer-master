import React, { useState } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';
import styles from './SearchBrand.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import * as BrandTypeActions from 'stores/brand-model/BrandTypeAction';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  searchText: string;
  setSearchText: (searchType: string) => void;
  setActivePage: (searchType: number) => void;
}

export const SearchBrand: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { searchText, setSearchText, setActivePage } = props;
  const dispatch: Dispatch = useDispatch();
  const [btnCancel, setBtnCancel] = useState(false);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [BrandTypeActions.REQUEST_BRAND_MODELS_SEARCH]));

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(BrandTypeActions.requestBrandModels(1, 15));
      setSearchText('');
      setBtnCancel(false);
      setActivePage(1);
    } else {
      if (searchText.length > 1) {
        dispatch(BrandTypeActions.requestBrandModelSearch(searchText, 1, 15));
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

export default SearchBrand;

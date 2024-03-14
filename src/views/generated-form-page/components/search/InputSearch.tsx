import React, { useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './InputSearch.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import * as GeneratedActions from 'stores/generated-form/GenerateFormActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  setActivePage: (page: number) => void;
}
export const InputSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [GeneratedActions.REQUEST_SEARCH_GENERATED_FORM_TABLE]));

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(GeneratedActions.requestGeneratedForm(1, 10, currentUser.employeeID));
      props.setActivePage(1);
      setSearchText('');
      setBtnCancel(false);
    } else {
      if (searchText.length > 1) {
        dispatch(GeneratedActions.requestSearchGeneratedForm(1, 10, currentUser.employeeID, searchText));
        props.setActivePage(1);
        setBtnCancel(!btnCancel);
      }
    }
  };

  return (
    <Grid.Column className="SearchFormDQ">
      <Input
        className={styles.Rounded + ' roundedSearchInput '}
        id="search-generated-form"
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

export default InputSearch;

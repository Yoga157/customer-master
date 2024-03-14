import React, { useState, useEffect } from 'react';
import { Button, Grid, Input } from 'semantic-ui-react';
import styles from './SearchAwsCredit.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as AWSCredentialActions from 'stores/aws-credential/AWSCredentialActions';

interface IProps {
  searchType: string;
  page: number;
  pageSize: number;
  setSearchText: any;
  searchText: string;
}
export const SearchAwsCredit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { searchType, page, pageSize, searchText, setSearchText } = props;
  const [btnCancel, setBtnCancel] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    setSearchText('');
    setBtnCancel(false);
  }, [searchType]);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };


  const onSearch = () => {
      dispatch(AWSCredentialActions.requestAWSCredentials(currentUser.employeeID, btnCancel ? "" : searchText,'descending','createdDate', page, pageSize));

      if(btnCancel)
      {
        setSearchText('');
      }
      setBtnCancel(!btnCancel);
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
      />
    </Grid.Column>
  );
};

export default SearchAwsCredit;

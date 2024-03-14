import React from 'react';
import IStore from 'models/IStore';
import { useSelector } from 'react-redux';
import { Button, Input, Search } from 'semantic-ui-react';

import { selectEmployeeSearch, selectEmployeeSearchQuota } from 'selectors/select-options/EmployeeSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import styles from './InputSearch.module.scss';

interface IProps {
  onChangeSearch: any;
  onResultEmployee: any;
  handleSearchEmployee: any;
  selectedEmployee: string;
}
export const InputSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { handleSearchEmployee, selectedEmployee, onResultEmployee, onChangeSearch } = props;

  const userEmployee = useSelector((state: IStore) => selectEmployeeSearch(state));
  const userEmployeeQuota = useSelector((state: IStore) => selectEmployeeSearchQuota(state));
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [EmployeeActions.REQUEST_EMPLOYEES_BY_NAME]));

  return (
    // <Input
    //   className={styles.Rounded + ' roundedSearchInput '}
    //   icon="search"
    //   iconPosition="left"
    //   placeholder="Search..."
    //   onChange={props.onChangeSearch}
    // />
    <Search
      input={{ icon: 'search', iconPosition: 'left' }}
      minCharacters={3}
      placeholder="Search..."
      results={onChangeSearch === 'quota' ? userEmployeeQuota : userEmployee}
      onSearchChange={handleSearchEmployee}
      onResultSelect={onResultEmployee}
      value={selectedEmployee}
      className={styles.Rounded + ' roundedSearchInput '}
      loading={isRequesting}
    />
  );
};

export default InputSearch;

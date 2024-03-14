import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './InputSearchCreditBilling.module.scss';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import AdvancedSearchCreditBilling from './AdvancedSearchCreditBilling';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';

interface IProps {
  searchType: string;
  pageSize: number;
  page: number;
  searchText: string;
  setSearchText: any;
}

export const InputSearchCreditBilling: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { searchType, pageSize, page, setSearchText, searchText } = props;
  const dispatch: Dispatch = useDispatch();
  const [btnCancel, setBtnCancel] = useState(false);

  useEffect(() => {
    setSearchText('');
    setBtnCancel(false);
  }, [searchType]);

  const onShowAdvancedSearch = useCallback(
    (): void => {
      dispatch(SidebarContainerActions.OPEN(<AdvancedSearchCreditBilling page={page} pageSize={pageSize}  />));
    },
    [dispatch]
  );
    
  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    dispatch(AWSBillingActions.requestAWSBillings(currentUser.employeeID, btnCancel ? "" : searchText,'descending','billingPeriod', page, pageSize))
    if(btnCancel)
      {
        setSearchText('');
      }
    setBtnCancel(!btnCancel);
  };

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AWSBillingActions.REQUEST_AWS_BILLING,
      AWSBillingActions.REQUEST_FILTER_AWS_BILLING
    ])
  );

  return (
    <Grid.Column className="SearchFormDQ">
      <Button
        className="AdvSearchBtn"
        icon="sliders horizontal"
        size="small"
        color="yellow"
        button="true"
        floating="true"
        onClick={() => onShowAdvancedSearch()}
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

export default InputSearchCreditBilling;

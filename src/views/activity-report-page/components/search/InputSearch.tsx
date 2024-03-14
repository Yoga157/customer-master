import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Grid, Input } from 'semantic-ui-react';
import styles from './InputSearch.module.scss';
import '../../../../index.scss';
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import AdvancedSearch from './AdvancedSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';

const InputSearch: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const [searchText, setSearchText] = useState('');

    const onChangeSearch = (event: any, data: any) => {
        if (data.value.trim().length > 1) {
            setSearchText(data.value.trim());
        } else {
            setSearchText('');
        }
    };

    const handleSearchByEnter = (event: any) => {
        if (event.key === 'Enter') {
             if (event.target.value.trim().length > 1) {
                dispatch(ActivityReportActions.requestActivityReportSearch(1, 10, 'activityReportGenID', 'descending', event.target.value.trim(), currentUser.email, +currentUser.employeeID));
            }

            if (event.target.value.trim().length < 1) {
                dispatch(ActivityReportActions.requestActivityReports(1, 10, 'activityReportGenID', 'descending', currentUser.email, +currentUser.employeeID));
            }
        }
    };

    const handleOnClickSearch = (event: any) => {
        if (searchText.trim().length > 1) {
            dispatch(ActivityReportActions.requestActivityReportSearch(1, 10, 'activityReportGenID', 'descending', searchText.trim(), currentUser.email, +currentUser.employeeID));
        }

        if (searchText.trim().length < 1) {
            dispatch(ActivityReportActions.requestActivityReports(1, 10, 'activityReportGenID', 'descending', currentUser.email, +currentUser.employeeID));
        }
    };

    const onShowAdvancedSearch = useCallback(
        (): void => {
          dispatch(SidebarContainerActions.OPEN(<AdvancedSearch />));
        },
        [dispatch]
    );

    return (
        <Grid>
            <Grid.Row>
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
                    iconPosition="left" 
                    placeholder="Type ID or Ticket/Task Number or SO Number or Customer Name or Address or Contact Name or Engineer or Status" 
                    onChange={onChangeSearch} 
                    onKeyDown={handleSearchByEnter}
                />
                <Button 
                    className="Rounded SearchBtn" 
                    icon="search" 
                    size="small" 
                    color="blue" 
                    onClick={handleOnClickSearch} />
            </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default InputSearch;
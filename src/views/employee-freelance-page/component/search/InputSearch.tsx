import IStore from 'models/IStore';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Grid, Input } from 'semantic-ui-react';
import '../../../../index.scss';
import styles from './InputSearch.module.scss';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import AdvancedSearch from './AdvancedSearch';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';

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
                dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceSearch(1, 10, 'employeeFreelanceGenID', 'descending', event.target.value.trim(), currentUser.email));
            }

            if (event.target.value.trim().length < 1) {
                dispatch(EmployeeFreelanceActions.requestEmployeeFreelances(1, 10, 'employeeFreelanceGenID', 'descending', currentUser.email));
            }
        }
    };

    const handleOnClickSearch = (event: any) => {
        if (searchText.trim().length > 1) {
            dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceSearch(1, 10, 'employeeFreelanceGenID', 'descending', searchText.trim(), currentUser.email));
        }

        if (searchText.trim().length < 1) {
            dispatch(EmployeeFreelanceActions.requestEmployeeFreelances(1, 10, 'employeeFreelanceGenID', 'descending', currentUser.email));
        }
    };

    const onShowAdvancedSearch = useCallback(
        (): void => {
            dispatch(SidebarContainerActions.OPEN(<AdvancedSearch />))
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
                    placeholder="Type ID or Email or Full Name or NIK KTP or Phone" 
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
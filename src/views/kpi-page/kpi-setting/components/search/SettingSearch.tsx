import IStore from "models/IStore";
import { Input, Button } from 'semantic-ui-react';
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dispatch } from 'redux';
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import styles from "./InputSearch.module.scss";
import SettingAdvancedSearch from './SettingAdvancedSearch';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";

const SettingSearch: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    const location = useLocation();
    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));    

    const onShowAdvancedSearch = useCallback(
        (): void => {
            dispatch(SidebarContainerActions.OPEN(<SettingAdvancedSearch />));
        }, 
        [dispatch]
    );

    const onChangeSearch = (event: any, data: any) => {
        if (data.value.length > 1)
        {
            dispatch(KpiSettingActions.requestSearchKpiSetting(data.value, 1, 15, "descending"));
        }

        if (data.value.length < 1)
        {
            console.log("requestKpiSetting aja");
            dispatch(KpiSettingActions.requestKpiSettings(1, 15));
        }
    };

    return (
        <Input 
            className={`${styles.Rounded} roundedSearchInput` }
            action={
                <Button 
                    icon="sliders horizontal"
                    button="true"
                    floating="true"
                    onClick={onShowAdvancedSearch}
                />
            }
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            onChange={onChangeSearch}
        />
    );
};

export default SettingSearch
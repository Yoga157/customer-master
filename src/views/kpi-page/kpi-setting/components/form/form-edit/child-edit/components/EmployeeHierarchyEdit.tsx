import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Grid, Header, Form, List } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import "./EmployeeHierarchyEditStyle.scss";

interface IProps {
    kpiSettingID: string
};

declare global {
    interface Window {
        jQuery:any;
    }
};

const EmployeeHierarchyEdit: React.FC<IProps> = ({ kpiSettingID }) => {
    return (
        <Fragment>EmployeeHierarchyEdit {kpiSettingID}</Fragment>
    );
};

export default EmployeeHierarchyEdit;

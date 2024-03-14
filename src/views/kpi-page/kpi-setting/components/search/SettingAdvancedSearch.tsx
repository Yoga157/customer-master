import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from 'redux';
import { Form as FinalForm, Field} from 'react-final-form';
import { Form, Grid, Header } from 'semantic-ui-react';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import { Button, DropdownInput } from 'views/components/UI';
import styles from './InputSearch.module.scss';
import * as KpiSettingActions from "stores/kpi/kpi-setting/KpiSettingActions";
import IStore from "models/IStore";
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import {
    selectDivisionDropdownOptions,
    selectDepartmentDropdownOptions,
    selectFunctionDropdownOptions,
    selectEmployeeDropdownOptions
} from "selectors/kpi/kpi-setting/KpiSettingSelector";

interface IProps {};

const SettingAdvancedSearch: React.FC<IProps> = () => {
    const dispatch: Dispatch = useDispatch();
    const [divisions, setDivisions] = useState("");
    const [departments, setDepartments] = useState("");
    const [functions, setFunctions] = useState("");
    const [pics, setPics] = useState("");

    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));

    useEffect(() => {
        if (currentUser.employeeID > 0)
        {
            dispatch(KpiSettingActions.requestDivisionsDropdown());
            dispatch(KpiSettingActions.requestDepartmentsDropdown());
            dispatch(KpiSettingActions.requestFunctionsDropdown());
            dispatch(KpiSettingActions.requestEmployeesDropdown());
        }
    }, [dispatch, currentUser.employeeID, currentUser.email]);

    let divisionDropdownOptions = useSelector((state: IStore) => selectDivisionDropdownOptions(state));    
    let departmentDropdownOptions = useSelector((state: IStore) => selectDepartmentDropdownOptions(state));
    let functionDropdownOptions = useSelector((state: IStore) => selectFunctionDropdownOptions(state));
    let employeeDropdownOptions = useSelector((state:IStore) => selectEmployeeDropdownOptions(state));
    console.log("employeeDropdownOptions", employeeDropdownOptions);

    const onSubmitHandler = (values: any) => {
        console.log("values", values);
        alert("Hello Setting Advanced Search");
        // var filter = new KpiDataFilter(values);
        // filter.year = values.filterYear;
        // filter.page = 1;
        // filter.pageSize = 15;
        // filter.sorting = 'descending';
    };

    const onCancel = () => {
        dispatch(SidebarContainerActions.CLOSE());        
    };

    return (
        <FinalForm
            onSubmit={(values: any) => onSubmitHandler(values)}
            render={({
                handleSubmit
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid padded columns='equal'>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <Header as='h3' inverted dividing>
                                    <Header.Content className={styles.FilterTitle}>
                                        Advance Filter
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns='equal' className={styles.divider}>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <h4 className={styles.FilterSubtitle}>Division</h4>
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <Field 
                                    name='filterDiv'
                                    component={DropdownInput}
                                    options={divisionDropdownOptions}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns='equal' className={styles.divider}>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <h4 className={styles.FilterSubtitle}>Department</h4>
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <Field 
                                    name='filterDept'
                                    component={DropdownInput}
                                    options={departmentDropdownOptions}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns='equal' className={styles.divider}>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <h4 className={styles.FilterSubtitle}>Function</h4>
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <Field 
                                    name='filterFunc'
                                    component={DropdownInput}
                                    options={functionDropdownOptions}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns='equal' className={styles.divider}>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <h4 className={styles.FilterSubtitle}>Employee</h4>
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <Field 
                                    name='filterPic'
                                    component={DropdownInput}
                                    options={employeeDropdownOptions}
                                    values={pics}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns='equal'>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16} className={styles.PadBtnFilter}>
                                <Button fluid color='blue'>Apply Filter</Button>
                            </Grid.Column>
                            <Grid.Column width={16} className={styles.PadBtnFilter}>
                                <Button type='button' fluid onClick={onCancel}>Cancel</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            )}
        ></FinalForm>
    );
};

export default SettingAdvancedSearch;
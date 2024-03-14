import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './InputSearch.module.scss';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Header } from 'semantic-ui-react';

import EmployeeFreelanceSearch from 'stores/employee-freelance/models/EmployeeFreelanceSearch';
import EmployeeFreelanceFilter from 'stores/employee-freelance/models/EmployeeFreelanceFilter';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import { Button, CheckBoxInput, DateInput, RadioButton } from 'views/components/UI';
import moment from 'moment';

interface IProps {}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    
    const [initialValues, setInitialValues] = useState({
        effectiveDate: undefined,
        expiredDate: undefined,
        employeeActive: undefined,
        employeeNonactive: undefined,        
    });

    const onCancelHandler = () => {
        dispatch(EmployeeFreelanceActions.requestEmployeeFreelances(1, 10, 'employeeFreelanceGenID', 'descending', currentUser.email));
    };

    const onSubmitHandler = (values: any) => {
        let employeeStatus = '';
        if (values.employeeActive == true && (values.employeeNonactive == false || values.employeeNonactive == undefined)) {
            employeeStatus = '1';
        } else if ((values.employeeActive == false || values.employeeActive == undefined) && values.employeeNonactive == true) {
            employeeStatus = '0';
        }

        let employeeHaveActivity = '';
        if (values.employeeHaveActivity == true && (values.employeeNotHaveActivity == false || values.employeeNotHaveActivity == undefined)) {
            employeeHaveActivity = '1';
        } else if ((values.employeeHaveActivity == false || values.employeeHaveActivity == undefined) && values.employeeNotHaveActivity == true) {
            employeeHaveActivity = '0';
        }

        const filter = new EmployeeFreelanceFilter({});
        filter.effectiveDate = values.effectiveDate === undefined ? '' : moment(values.effectiveDate).format();
        filter.expiredDate = values.expiredDate === undefined ? '' : moment(values.expiredDate).format();
        filter.employeeStatusList = employeeStatus;
        filter.isHaveActivityList = employeeHaveActivity;
        filter.column = 'employeeFreelanceGenID';
        filter.sorting = 'descending';
        filter.page = 1;
        filter.pageSize = 10;
        filter.userLogin = currentUser.email;

        console.log(filter);
        dispatch(EmployeeFreelanceActions.requestEmployeeFreelanceFilterSearch(filter));
    };

    return (
        <FinalForm 
            onSubmit={(values: any) => onSubmitHandler(values)}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                     <Grid padded columns="equal">
                        <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <Header as="h3" inverted dividing>
                            <Header.Content className={styles.FilterTitle}>Advanced Filter</Header.Content>
                            </Header>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <h4 className={styles.FilterSubtitle}>Effective Date</h4>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Field name="effectiveDate" component={DateInput} date={true} />
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <h4 className={styles.FilterSubtitle}>Expired Date</h4>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Field name="expiredDate" component={DateInput} date={true} />
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <h4 className={styles.FilterSubtitle}>Employee Status</h4>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Grid columns="equal">
                                <Grid.Column className='LabelGreen ml-20' width={7}>
                                    <Field name="employeeActive" component={CheckBoxInput} label="Active" />
                                </Grid.Column>
                                <Grid.Column className='LabelGrey' width={7}>
                                    <Field name="employeeNonactive" component={CheckBoxInput} label="Not Active" />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <h4 className={styles.FilterSubtitle}>Employee Have Task</h4>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Grid columns="equal">
                                <Grid.Column className='LabelGreen ml-20' width={7}>
                                    <Field name="employeeHaveActivity" component={CheckBoxInput} label="Yes" />
                                </Grid.Column>
                                <Grid.Column className='LabelGrey' width={7}>
                                    <Field name="employeeNotHaveActivity" component={CheckBoxInput} label="No" />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal">
                        <Grid.Row columns={1}>
                        <Grid.Column width={16} className={styles.PadBtnFilter}>
                            <Button fluid color="blue">
                            Apply Filter
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={16} className={styles.PadBtnFilter}>
                            <Button type="button" fluid onClick={onCancelHandler}>
                            Cancel
                            </Button>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            )}
        />
    );
};

export default AdvancedSearch;
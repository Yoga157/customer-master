import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Grid, Header } from 'semantic-ui-react';

import IStore from 'models/IStore';
import styles from './InputSearch.module.scss';
import ActivityReportFilter from 'stores/activity-report/models/ActivityReportFilter';
import { Button, DropdownInput, CheckBoxInput } from 'views/components/UI';
import * as ActivityReportActions from 'stores/activity-report/ActivityReportActions';
import { selectActivityReportCustomerOptions } from 'selectors/select-options/ActivityReportCustomerSelector';
import { selectActivityReportEngineerOptions } from 'selectors/select-options/ActivityReportEngineerSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {}

const AdvancedSearch: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [reviewStatus, setReviewStatus] = useState([]);
    const [customerSignStatus, setCustomerSignStatus] = useState([]);
    const [draftStatus, setDraftStatus] = useState([]);
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const activityReportCustomerOptions = useSelector((state: IStore) => selectActivityReportCustomerOptions(state));
    const activityReportEngineerOptions = useSelector((state: IStore) => selectActivityReportEngineerOptions(state));
    
    useEffect(() => {
        dispatch(ActivityReportActions.requestActivityReportCustomer(currentUser.email));
        dispatch(ActivityReportActions.requestActivityReportEngineer(currentUser.email));
    }, [dispatch]);

    const onChangeReviewBySuperiorDone = (values: boolean) => {
        onChangeReviewStatus(values, '1');
    };

    const onChangeReviewBySuperiorNotYet = (values: boolean) => {
        onChangeReviewStatus(values, '0');
    };

    const onChangeReviewStatus = (values: boolean, statusID: string) => {
        if (values) {
            setReviewStatus((reviewStatus) => [...reviewStatus, statusID]);
        } else {
            const activityReportReviewStatusArr = reviewStatus.filter((id) => id != statusID);
            setReviewStatus(activityReportReviewStatusArr);
        }
    };

    const onChangeCustomerSignDone = (values: boolean) => {
        onChangeCustomerSignStatus(values, '1');
    };

    const onChangeCustomerSignNotYet = (values: boolean) => {
        onChangeCustomerSignStatus(values, '0');
    };

    const onChangeCustomerSignStatus = (values: boolean, statusID: string) => {
        if (values) {
            setCustomerSignStatus((customerSignStatus) => [...customerSignStatus, statusID]);
        } else {
            const activityReportCustomerSignStatusArr = customerSignStatus.filter((id) => id != statusID);
            setCustomerSignStatus(activityReportCustomerSignStatusArr);
        }
    };

    const onChangeDraftAR = (values: boolean) => {
        onChangeDraftStatus(values, '1');
    };

    const onChangeNormalAR = (values: boolean) => {
        onChangeDraftStatus(values, '0');
    };

    const onChangeDraftStatus = (values: boolean, statusID: string) => {
        if (values) {
            setDraftStatus((draftStatus) => [...draftStatus, statusID]);
        } else {
            const draftStatusArr = draftStatus.filter((id) => id != statusID);
            setDraftStatus(draftStatusArr);
        }
    };

    const onCancelHandler = () => {
        dispatch(ActivityReportActions.requestActivityReports(1, 10, 'activityReportGenID', 'descending', currentUser.email, +currentUser.employeeID));
    };

    const onSubmitHandler = (values: any) => {
        const filter = new ActivityReportFilter({});
        filter.reviewStatus = reviewStatus.length === 0 ? '' : reviewStatus.join(';');
        filter.customerSignStatus = customerSignStatus.length === 0 ? '' : customerSignStatus.join(';');
        filter.draftStatus = draftStatus.length === 0 ? '' : draftStatus.join(';');
        filter.customer = values.filterCustomer === undefined ? '' : values.filterCustomer.join(';');
        filter.engineer = values.filterEngineer === undefined ? '' : values.filterEngineer.join(';');
        filter.column = 'activityReportGenID';
        filter.sorting = 'descending';
        filter.page = 1;
        filter.pageSize = 10;
        filter.userLogin = currentUser.email;
        filter.userLoginId = +currentUser.employeeID;

        console.log(filter)
        dispatch(ActivityReportActions.requestActivityReportFilterSearch(filter));
    };

    return (
        <FinalForm 
            onSubmit={(values: any) => onSubmitHandler(values)}
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
                                <h4 className={styles.FilterSubtitle}>Superior Review Status</h4>
                            </Grid.Column>
                            <Grid columns="equal">
                                <Grid.Column className='LabelGreen ml-20' width={7}>
                                    <Field name="reviewBySuperiorDone" component={CheckBoxInput} label="DONE" onChange={onChangeReviewBySuperiorDone} />
                                </Grid.Column>
                                <Grid.Column className='LabelGrey' width={7}>
                                    <Field name="reviewBySuperiorNotYet" component={CheckBoxInput} label="NOT YET" onChange={onChangeReviewBySuperiorNotYet}  />
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <h4 className={styles.FilterSubtitle}>Customer Sign Status</h4>
                            </Grid.Column>
                            <Grid columns="equal">
                                <Grid.Column className='LabelGreen ml-20' width={7}>
                                    <Field name="customerSignDone" component={CheckBoxInput} label="DONE" onChange={onChangeCustomerSignDone} />
                                </Grid.Column>
                                <Grid.Column className='LabelGrey' width={7}>
                                    <Field name="customerSignNotYet" component={CheckBoxInput} label="NOT YET" onChange={onChangeCustomerSignNotYet}  />
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <h4 className={styles.FilterSubtitle}>Customer Name</h4>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Field name="filterCustomer" component={DropdownInput} options={activityReportCustomerOptions} />
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <h4 className={styles.FilterSubtitle}>Engineer</h4>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Field name="filterEngineer" component={DropdownInput} options={activityReportEngineerOptions} />
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid padded columns="equal" className={styles.divider}>
                        <Grid.Row columns={1}>
                            <Grid.Column width={16}>
                                <h4 className={styles.FilterSubtitle}>Draft Status</h4>
                            </Grid.Column>
                            <Grid columns="equal">
                                <Grid.Column className='LabelGreen ml-20' width={7}>
                                    <Field name="draftAR" component={CheckBoxInput} label="YES" onChange={onChangeDraftAR} />
                                </Grid.Column>
                                <Grid.Column className='LabelGrey' width={7}>
                                    <Field name="normalAR" component={CheckBoxInput} label="NO" onChange={onChangeNormalAR}  />
                                </Grid.Column>
                            </Grid>
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



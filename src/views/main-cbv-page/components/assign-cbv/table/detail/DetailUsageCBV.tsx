import React, { useEffect, useState } from 'react'
import { Table, Grid, Form } from 'semantic-ui-react'
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import { selectDropDownperiod, selectDashboardDetailUsageCBV } from 'selectors/main-cbv/CreditBillingServiceSelector';
import { SelectInput, Pagination } from 'views/components/UI';
import { Form as FinalForm, Field } from 'react-final-form';
import TotalSalesAndGpm from 'views/main-cbv-page/components/assign-cbv/table/detail/total-sales-n-gpm/totalSalesAndGpm';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from '../../../../../components/loading-indicator/LoadingIndicator';
import ReactHtmlParser from 'react-html-parser';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';


interface IProps {
    CreditId?: number;
    item: any;
    voucherNo?: string;
}

const DetailUsageCBV: React.FC<IProps> = ({ CreditId, item, voucherNo }) => {
    const dispatch: Dispatch = useDispatch();
    const handlePaginationChange = (e: any, data: any) => {
        setActivePage(data.activePage);
        dispatch(CreditBillingActions.requestDetailUsageCBV(BillingPeriod, voucherNo, item.picName, data.activePage, pageSize))
    };

      const [activePage, setActivePage] = useState(1);
      const [pageSize, setPage] = useState(10);
      const [BillingPeriod, setBillingPeriod] = useState('');
      const DropDownPeriod: any = useSelector((state: IStore) => selectDropDownperiod(state));
      const DataUsageDashboard: any = useSelector((state: IStore) => selectDashboardDetailUsageCBV(state));
      const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    useEffect(() => {
        dispatch(CreditBillingActions.requestDetailCBV(item && item.creditDetail[0].creditId, currentUser.employeeID))
        dispatch(CreditBillingActions.DropDownBillingPeriod(item && item.creditDetail[0].creditId, item && item.creditDetail[0].salesId))
        
    },[CreditId,item,voucherNo])

    useEffect(() => {
        if(!!!BillingPeriod)
        {
           return () => {
            dispatch(CreditBillingActions.requestDetailUsageCBV(BillingPeriod, voucherNo, item.picName, activePage, pageSize))
           }
        }
    },[])

    const onSubmitHandler = (values) => {
        console.log("Submit")
    }

    const onChangePeriod = (event: any) => {
        const docTypes = DropDownPeriod.filter((item: any) => {
            return item.value === event;
        });
        
        setBillingPeriod(docTypes[0].text);

        dispatch(CreditBillingActions.requestDetailUsageCBV(docTypes[0].text, voucherNo, item.picName, activePage, pageSize))
        
    };

    const isSubmitting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CreditBillingActions.REQUEST_DROPDOWN_BILLING_PERIODE,
      CreditBillingActions.REQUEST_DETAIL_USAGE_CBV
    ])
  );
    const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [
        CreditBillingActions.REQUEST_DROPDOWN_BILLING_PERIODE,
        CreditBillingActions.REQUEST_DETAIL_USAGE_CBV
    ]));
    return (
        <FinalForm
        // validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isSubmitting}>
            <LoadingIndicator isActive={isRequesting}>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <h3>Detail Usage CBV {item.salesName} - {voucherNo}</h3>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={5}>
                    <Grid.Column>
                        <Field
                            name="documentTypeID"
                            component={SelectInput}
                            options={DropDownPeriod}
                            placeholder="-- Select Period --"
                            labelName="Billing Period"
                            onChanged={onChangePeriod}
                            mandatory={false}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table style={{padding:0}}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="left">Funnel Id</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Period</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Account Id</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Amount</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Neccesity</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Resources</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Customer Name</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Project Name</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Notes</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Status</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Created By</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="left">Created Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {DataUsageDashboard && DataUsageDashboard.rows.length === 0 && (
                                    <Table.Row>
                                      <Table.Cell colSpan={16} textAlign="center" >
                                        No data
                                      </Table.Cell>
                                    </Table.Row>
                                  )}

                                {DataUsageDashboard && DataUsageDashboard.rows.map((item) => (
                                    <Table.Row>
                                        <Table.Cell> {item.funnelId} </Table.Cell>
                                        <Table.Cell>{item.period}</Table.Cell>
                                        <Table.Cell>{item.accountId}</Table.Cell>
                                        <Table.Cell>{item.amount}</Table.Cell>
                                        <Table.Cell>{item.necessity}</Table.Cell>
                                        <Table.Cell> {ReactHtmlParser(item.resources)} </Table.Cell>
                                        <Table.Cell> {item.customerName} </Table.Cell>
                                        <Table.Cell> {item.projectName} </Table.Cell>
                                        <Table.Cell> {ReactHtmlParser(item.notes)} </Table.Cell>
                                        <Table.Cell> {item.status} </Table.Cell>
                                        <Table.Cell> {item.createdBy} </Table.Cell>
                                        <Table.Cell> {item.createdDate} </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8} floated='right'>
                        <TotalSalesAndGpm CBVAmount={DataUsageDashboard.totalCBVAmount} usedAmount={DataUsageDashboard.totalUsedAmount} remainingAmount={DataUsageDashboard.totalRemainingAmount} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Pagination
                        activePage={activePage}
                        onPageChange={(e, data) => handlePaginationChange(e, data)}
                        totalPage={DataUsageDashboard.totalRows}
                        pageSize={pageSize}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </LoadingIndicator>
        </Form>
        
        )}
      />
        
    )
}

export default DetailUsageCBV
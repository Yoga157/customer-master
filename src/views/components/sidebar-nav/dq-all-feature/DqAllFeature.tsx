import React, { useEffect, useState } from 'react';
import { Card, Grid, Image, Segment } from 'semantic-ui-react';
import RouteEnum from 'constants/RouteEnum';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import { useSelector, useDispatch } from 'react-redux';
import EmployeeFreelanceMenuAccess from 'stores/employee-freelance/models/EmployeeFreelanceMenuAccess';
import * as EmployeeFreelanceActions from 'stores/employee-freelance/EmployeeFreelanceActions';
import { Dispatch } from 'redux';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';
import * as AWSBillingActions from 'stores/aws-billing/AWSBillingActions';
import { selectActivityReportGroupingRoleFlag } from "selectors/activity-report-grouping/ActivityReportGroupingSelector";

const DqAllFeature = (props: any) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const employeeFreelanceMenuAccess: EmployeeFreelanceMenuAccess = useSelector(
    (state: IStore) => state.employeeFreelance.employeeFreelanceMenuAccess
  );
  const RoleFlag = useSelector((state: IStore) =>
    selectActivityReportGroupingRoleFlag(state)
  );
  useEffect(() => {
    if (employeeFreelanceMenuAccess.status === 'success') {
      if (employeeFreelanceMenuAccess.email !== 'undefined') {
        const emp = new EmployeeFreelanceMenuAccess({});
        emp.email = employeeFreelanceMenuAccess.email;
        emp.isAllowAccess = employeeFreelanceMenuAccess.isAllowAccess;
        dispatch(EmployeeFreelanceActions.requestPostEmployeeFreelanceMenuAccessLocal(emp));
      }
    }
  }, [employeeFreelanceMenuAccess]);

  const [validasiPermission, setValidasiPermission] = useState(false);
  const permission = useSelector((state: IStore) => selectPermission(state));
  useEffect(() => {
    permission.map((item) => {
      if (item.text1 === currentUser.userName) {
        setValidasiPermission(true);
      }
    });
  }, [permission, validasiPermission]);

  useEffect(() => {
    dispatch(EmployeeFreelanceActions.requestGetEmployeeFreelanceMenuAccessLocal());
    dispatch(AWSBillingActions.requestAWSBillingPermission());
  }, [dispatch]);
  return (
    <Grid>
      <Grid.Row equal className="AllDqContent">
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.Funnel}>
            <Image src="/assets/FunnelAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">FUNNEL</Card.Header>
              <Card.Description textAlign="center">Funnel, Opprtunity & SA</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {(currentUser.role === 'Marketing' ||
          currentUser.role === 'Product Manager' ||
          currentUser.permission === 'FullControl' ||
          currentUser.role === 'SuperAdmin') && (
          <Grid.Column mobile={16} tablet={4} computer={2}>
            <Card href={window.location.origin + '/data-quality' + RouteEnum.FunnelOpportunity}>
              <Image src="/assets/OpportunityAll.svg" wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">PRODUCT MANAGEMENT GENERATED FUNNEL</Card.Header>
                <Card.Description textAlign="center">Event/Product Management Generated Funnel</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )}
        {(currentUser.role === 'Presales' || currentUser.permission === 'FullControl' || currentUser.role === 'SuperAdmin') && (
          <Grid.Column mobile={16} tablet={4} computer={2}>
            <Card href={window.location.origin + '/data-quality' + RouteEnum.ServiceCatalog}>
              <Image src="/assets/ServiceCatalogAll.svg" wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">SERVICE CATALOG</Card.Header>
                <Card.Description textAlign="center">List of BHP Services</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )}
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.BrandModel}>
            <Image src="/assets/BrandModelAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">BRAND MODEL</Card.Header>
              <Card.Description textAlign="center">Brand Model List</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.Software}>
            <Image src="/assets/SoftwareAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">SOFTWARE</Card.Header>
              <Card.Description textAlign="center">Software Tools</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>

        {validasiPermission === true && (
          <Grid.Column mobile={16} tablet={4} computer={2}>
            <Card href={window.location.origin + '/data-quality' + RouteEnum.AWSCredential}>
              <Image src="/assets/AwsCredentialAll.svg" wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">AWS Credential</Card.Header>
                <Card.Description textAlign="center">List of AWS Credential</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )}
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.MainCBVService}>
            <Image src="/assets/MainCbvAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">Main CBV</Card.Header>
              <Card.Description textAlign="center">Main CBV Services</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.CreditBillingService}>
            <Image src="/assets/AwsBillingAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">AWS Billing</Card.Header>
              <Card.Description textAlign="center">List of AWS Billing</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.GeneratedForm}>
            <Image src="/assets/LetterAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">LETTER</Card.Header>
              <Card.Description textAlign="center">Generate Form Letter</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.BankGaransi}>
            <Image src="/assets/BankGuaranteeAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">BANK GUARANTEE</Card.Header>
              <Card.Description textAlign="center">Bank Guarantee & Expired Bank Guarantee</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.CustomerCreditService}>
            <Image src="/assets/CusCreditServiceAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">CUSTOMER CREDIT SERVICE</Card.Header>
              <Card.Description textAlign="center">Customer Credit Service List</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.ReportManager}>
            <Image src="/assets/ReportManagementAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">MANAGEMENT REPORTS</Card.Header>
              <Card.Description textAlign="center">Data Quality Report</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.Kpi}>
            <Image src="/assets/KpiAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">KPI</Card.Header>
              <Card.Description textAlign="center">Dashboard & KPI Data</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.ActivityReport}>
            <Image src="/assets/ActivityReportAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">Activity Report</Card.Header>
              <Card.Description textAlign="center">Activity Report</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {employeeFreelanceMenuAccess.isAllowAccess === true && (
          <Grid.Column mobile={16} tablet={4} computer={2}>
            <Card href={window.location.origin + '/data-quality' + RouteEnum.EmployeeFreelance}>
              <Image src="/assets/FreelanceAll.svg" wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">Employee Freelance</Card.Header>
                <Card.Description textAlign="center">Employee Freelance</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )}
        
        {/* PMO Module */}
         {(currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') && (
          <Grid.Column mobile={16} tablet={4} computer={2}>
            <Card href={window.location.origin + '/data-quality' + RouteEnum.Pmo}>
              <Image src="/assets/PmoAll.svg" wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">PMO</Card.Header>
                <Card.Description textAlign="center">PMO</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )}
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.ConfigItems}>
            <Image src="/assets/ConfigItemAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">Config Items</Card.Header>
              <Card.Description textAlign="center">Config Items</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.TicketListAll}>
            <Image src="/assets/TicketListAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">Ticket List</Card.Header>
              <Card.Description textAlign="center">Ticket List</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {(currentUser.role === 'PMO' ||
          currentUser.role === 'PMOS' ||
          currentUser.role === 'SMO' ||
          currentUser.role === 'Presales' ||
          currentUser.role === 'Engineer') && (
          <Grid.Column mobile={16} tablet={4} computer={2}>
            <Card href={window.location.origin + '/data-quality' + RouteEnum.WorkListPage}>
              <Image src="/assets/WorkListAll.svg" wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">Work List</Card.Header>
                <Card.Description textAlign="center">Work List</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )} 
        {RoleFlag.isSuperior && (
          <Grid.Column mobile={16} tablet={4} computer={2}>
            <Card
              href={
                window.location.origin +
                "/data-quality" +
                RouteEnum.ActivityReportGroupingList
              }
            >
              <Image src="/assets/ArGroupingAll.svg" wrapped ui={false} />
              <Card.Content>
                <Card.Header textAlign="center">AR Grouping</Card.Header>
                <Card.Description textAlign="center">
                  AR Grouping
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )}
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href={window.location.origin + '/data-quality' + RouteEnum.DedicatedResources}>
            <Image src="/assets/DedicatedResourceAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">Dedicated Resources</Card.Header>
              <Card.Description textAlign="center">Dedicated Resources</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>

        {/* End PMO Module */}
        {/* <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href="#">
            <Image src="/assets/PmoAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">PMO</Card.Header>
              <Card.Description textAlign="center">Project Item List</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href="#">
            <Image src="/assets/ConfigItemAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">CONFIG ITEM</Card.Header>
              <Card.Description textAlign="center">Config Item List</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={2}>
          <Card href="#">
            <Image src="/assets/WorkListAll.svg" wrapped ui={false} />
            <Card.Content>
              <Card.Header textAlign="center">WORK LIST</Card.Header>
              <Card.Description textAlign="center">Work List</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column> */}
      </Grid.Row>
    </Grid>
  );
};

export default DqAllFeature;

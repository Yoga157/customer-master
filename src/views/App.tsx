import React, { Suspense, lazy, Fragment } from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { Container } from "semantic-ui-react";
import { PrivateRoute } from "views/components/private-route/PrivateRoute";
import SidebarContainers from "./components/sidebar-containers/SidebarContainers";
import IAction from "../models/IAction";
import RouteEnum from "../constants/RouteEnum";
import NavBar from "./components/nav-bar/NavBar";
import SidebarNav from "./components/sidebar-nav/SidebarNav";
import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";
import Toasts from "./components/toasts/Toasts";
import ModalContainers from "./components/modals/ModalContainers";
import ModalNoPadding from "./components/modals/ModalNoPadding";
import CustomerTransferPage from "./customer-transfer-page/CustomerTransferPage";
import ActionPlanNotesForm from "./actionplan-notes-page/components/form/ActionPlanNotesForm";
import SummaryActionPlanForm from "./summary-action-plan/components/form/SummaryActionPlanForm";
// import {FunnelFormCard, FunnelFormEdit} from './funnel-page/components/funnel-main/form'
import DashboardPage from "./dashboard-page/DashboardPage";

const ServiceCatalogPage = lazy(() =>
  import("./service-catalog-page/ServiceCatalogPage")
);
const ServiceCatalogCard = lazy(() =>
  import("./service-catalog-page/components/form/ServiceCatalogCard")
);
const FunnelPage = lazy(() => import("./funnel-page/FunnelPage"));
const DelegationPage = lazy(() => import("./delegation-page/DelegationPage"));
const DelegationCard = lazy(() =>
  import("./delegation-page/components/form/DelegationCard")
);

const QuotaSetting = lazy(() => import("./quota-setting-page/QuotaSetting"));
const UnsetQuota = lazy(() =>
  import("./quota-setting-page/child-page/UnsetQuota")
);
const NotFullQuota = lazy(() =>
  import("./quota-setting-page/child-page/NotFullQuota")
);

const FunnelFormCard = lazy(() =>
  import("./funnel-page/components/funnel-main/form/form-create/FunnelCard")
);
const FunnelFormEdit = lazy(() =>
  import("./funnel-page/components/funnel-main/form/form-edit/FunnelFormEdit")
);
const FunnelOpportunity = lazy(() =>
  import("./funnel-opportunity/FunnelOpportunity")
);
const GeneratedForm = lazy(() => import("./generated-form-page/GeneratedForm"));
const GeneratedFormAdd = lazy(() =>
  import("./generated-form-page/components/form/form-create/GeneratedCard")
);
const CustomerCreditServicePage = lazy(() =>
  import("./customer-credit-service/CustomerCreditService")
);
const CustomerCreditServiceDetail = lazy(() =>
  import("./customer-credit-service/components/view-detail/CustomerCreditCard")
);

const NotFoundPage = lazy(() => import("./not-found-page/NotFoundPage"));
const NotAuthorizedPage = lazy(() =>
  import("./not-authorized-page/NotAuthorizedPage")
);
const AllFeaturesPage = lazy(() =>
  import("./all-features-page/AllFeaturesPage")
);

const LoginPage = lazy(() => import("./login-page/LoginPage"));
const BrandModelPage = lazy(() => import("./brand-model-page/BrandModelPage"));
const BrandModelCard = lazy(() =>
  import("./brand-model-page/components/form/BrandModelCard")
);
const SoftwarePage = lazy(() => import("./software-page/SoftwarePage"));
const SoftwareCard = lazy(() =>
  import("./software-page/components/form/SoftwareCard")
);

const BankGaransiPage = lazy(() =>
  import("./bank-garansi-page/admin/BankGaransiAdminPage")
);
const BankGaransiPopup = lazy(() =>
  import("./bank-garansi-page/admin/BankGaransiAdminPage")
);
const BankGaransiEditPopup = lazy(() =>
  import("./bank-garansi-page/admin/BankGaransiAdminPage")
);
const BankGaransiFormCard = lazy(() =>
  import(
    "./bank-garansi-page/admin/components/form/form-create/BankGaransiCard"
  )
);
const MasterInsuranceFormCard = lazy(() =>
  import(
    "./bank-garansi-page/admin/components/form/insurance-form-create/MasterInsuranceCard"
  )
);

const ReportManagerPage = lazy(() =>
  import("./report-manager/ReportManagerPage")
);
const ReportPage = lazy(() => import("./report-manager/components/ReportPage"));
const KpiPage = lazy(() => import("./kpi-page/KpiPage"));
const KpiFormCard = lazy(() =>
  import("./kpi-page/kpi-setting/components/form/KpiCard")
);
const KpiSettingFormEdit = lazy(() =>
  import("./kpi-page/kpi-setting/components/form/form-edit/KpiSettingFormEdit")
);

const PMOPage = lazy(() => import("./pmo-page/page/pmo/PMOPage"));
const PMOViewDetailPage = lazy(() =>
  import("./pmo-page/page/pmo-view-detail/PMOViewDetail")
);
const ProjectGundam = lazy(() =>
  import("./pmo-page/page/pmo-project-gundam/ProjectGundam")
);
const ProjectScopeStatement = lazy(() =>
  import("./pmo-page/page/pmo-project-scope-statement/ProjectScopeStatement")
);
const ProjectScopeList = lazy(() =>
  import("./pmo-page/page/pmo-project-scope-statement/page/ProjectScopeList")
);
const CreditBillingServicePage = lazy(() =>
  import("./aws-billing-page/CreditBillingServicePage")
);
// const CreditBillingServiceFormCard = lazy(() => import('./aws-billing-page/components/form/CreditBillingServiceCard'));

const ConfigItems = lazy(() =>
  import("./config-items-page/page/ConfigItemPage")
);
const WorkListPage = lazy(() => import("./work-list-page/page/WorkListPage"));
const MainCBVServicePage = lazy(() =>
  import("./main-cbv-page/MainCBVServicePage")
);
const TicketPage = lazy(() => import("./ticket-page/page-ticket/TicketPage"));
const DedicatedResourcesPage = lazy(() =>
  import("./dedicated-resources-page/DedicatedResourcesPage")
);
const DedicatedResourcesPageEdit = lazy(() =>
  import(
    "./dedicated-resources-page/components/form/form-edit/DedicatedResourcesFormEdit"
  )
);
const DedicatedResourcesBulkUpdatePage = lazy(() =>
  import(
    "./dedicated-resources-page/components/form/form-create/BulkUpdate/BulkUpdateCard"
  )
);
const AWSCredentialPage = lazy(() =>
  import("./aws-credential-page/AWSCredentialPage")
);

const IndexCard = lazy(() => import("./hendy-page/IndexCard"));

const ActivityReportPage = lazy(() =>
  import("./activity-report-page/ActivityReportPage")
);
const ActivityReportFormAdd = lazy(() =>
  import("./activity-report-page/components/form/ActivityReportCard")
);
const ActivityReportFormEdit = lazy(() =>
  import(
    "./activity-report-page/components/form/form-edit/ActivityReportFormEdit"
  )
);

const EmployeeFreelancePage = lazy(() =>
  import("./employee-freelance-page/EmployeeFreelancePage")
);
const EmployeeFreelanceFormAdd = lazy(() =>
  import("./employee-freelance-page/component/form/EmployeeFreelanceCard")
);
const EmployeeFreelanceFormEdit = lazy(() =>
  import(
    "./employee-freelance-page/component/form/form-edit/EmployeeFreelanceFormEdit"
  )
);

const ActivityReportListPage = lazy(() =>
  import("./activity-report/activity-report-list-page/ActivityReportListPage")
);
const ActivityReportGroupingListPage = lazy(() =>
  import(
    "./activity-report/activity-report-grouping-page/ActivityReportGroupingListPage"
  )
);

const ViewCustomerSetting = lazy(() =>
  import("./view-customer-setting/ViewEditCustomerSettingPage")
);

const CustomerSettingPage = lazy(() =>
  import("./customer-setting-page/CustomerSettingPage")
);

const AddNewCustomerSetting = lazy(() =>
  import("./customer-setting-add-new-page/AddNewCustomerSetting")
);

const CollabToolsPage = lazy(() =>
  import("./collab-tools-page/CollabToolsPage")
);

interface RouteParams {
  id: string;
}

interface IProps {
  readonly history: History;
  readonly dispatch: Dispatch<IAction<any>>;
}

const App: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => (
  <ConnectedRouter history={props.history}>
    <Suspense fallback={<LoadingIndicator isActive />}>
      <ModalContainers isChild={false} />
      <ModalNoPadding isChild={false} />
      <Route exact path={RouteEnum.Home} component={LoginPage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar history={props.history} />
            <SidebarNav size="very thin" />
            <SidebarContainers />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute path={RouteEnum.Funnel} component={FunnelPage} />
                <PrivateRoute
                  exact
                  path={RouteEnum.FunnelForm}
                  component={FunnelFormCard}
                />
                <PrivateRoute
                  path={RouteEnum.FunnelFormEdit}
                  component={FunnelFormEdit}
                />
                <PrivateRoute
                  path={RouteEnum.FunnelOpportunity}
                  component={FunnelOpportunity}
                />
                <PrivateRoute
                  path={RouteEnum.GeneratedForm}
                  component={GeneratedForm}
                />
                <PrivateRoute
                  path={RouteEnum.GeneratedFormAdd}
                  component={GeneratedFormAdd}
                />

                <PrivateRoute
                  path={RouteEnum.Dashboard}
                  component={DashboardPage}
                />

                <PrivateRoute
                  path={RouteEnum.Delegation}
                  component={DelegationPage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.DelegationCard}
                  component={DelegationCard}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.DelegationCardEdit}
                  component={DelegationCard}
                />

                <PrivateRoute
                  path={RouteEnum.QuotaSetting}
                  component={QuotaSetting}
                />
                <PrivateRoute
                  path={RouteEnum.UnsetQuota}
                  component={UnsetQuota}
                />
                <PrivateRoute
                  path={RouteEnum.NotFullQuota}
                  component={NotFullQuota}
                />

                <PrivateRoute
                  path={RouteEnum.ServiceCatalog}
                  component={ServiceCatalogPage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.ServiceCatalogCard}
                  component={ServiceCatalogCard}
                />
                <PrivateRoute
                  path={RouteEnum.ServiceCatalogCardEdit}
                  component={ServiceCatalogCard}
                />
                <PrivateRoute
                  path={RouteEnum.CustomerTransfer}
                  component={CustomerTransferPage}
                />
                <PrivateRoute
                  path={RouteEnum.ActionPlanNotes}
                  component={ActionPlanNotesForm}
                />
                <PrivateRoute
                  path={RouteEnum.SummaryActionPlan}
                  component={SummaryActionPlanForm}
                />
                <PrivateRoute
                  path={RouteEnum.BrandModel}
                  component={BrandModelPage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.BrandModelCard}
                  component={BrandModelCard}
                />
                <PrivateRoute
                  path={RouteEnum.BrandModelCardEdit}
                  component={BrandModelCard}
                />

                <PrivateRoute
                  path={RouteEnum.Software}
                  component={SoftwarePage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.SoftwareCard}
                  component={SoftwareCard}
                />
                <PrivateRoute
                  path={RouteEnum.SoftwareCardEdit}
                  component={SoftwareCard}
                />

                <PrivateRoute
                  path={RouteEnum.ReportManager}
                  component={ReportManagerPage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.ReportPage}
                  component={ReportPage}
                />

                <PrivateRoute
                  path={RouteEnum.BankGaransi}
                  component={BankGaransiPage}
                />
                <PrivateRoute
                  path={RouteEnum.BankGaransiPopup}
                  component={BankGaransiPopup}
                />
                <PrivateRoute
                  path={RouteEnum.BankGaransiEditPopup}
                  component={BankGaransiEditPopup}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.BankGaransiForm}
                  component={BankGaransiFormCard}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.MasterInsuranceForm}
                  component={MasterInsuranceFormCard}
                />
                <PrivateRoute
                  path={RouteEnum.CustomerCreditServiceDetail}
                  component={CustomerCreditServiceDetail}
                />
                <PrivateRoute
                  path={RouteEnum.CustomerCreditService}
                  component={CustomerCreditServicePage}
                />
                <PrivateRoute path={RouteEnum.Kpi} component={KpiPage} />
                <PrivateRoute
                  exact
                  path={RouteEnum.KpiSettingAddForm}
                  component={KpiFormCard}
                />
                <PrivateRoute
                  path={RouteEnum.KpiSettingEditForm}
                  component={KpiSettingFormEdit}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.IndexForm}
                  component={IndexCard}
                />

                <PrivateRoute
                  path={RouteEnum.GeneratedForm}
                  component={GeneratedForm}
                />
                <PrivateRoute
                  path={RouteEnum.GeneratedFormAdd}
                  component={GeneratedFormAdd}
                />

                <PrivateRoute
                  path={RouteEnum.TicketList}
                  component={TicketPage}
                />
                <PrivateRoute
                  path={RouteEnum.TicketListAll}
                  component={TicketPage}
                />
                <PrivateRoute path={RouteEnum.Pmo} component={PMOPage} />
                <PrivateRoute
                  path={RouteEnum.PmoViewDetail}
                  component={PMOViewDetailPage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.ProjectGundam}
                  component={ProjectGundam}
                />
                <PrivateRoute
                  path={RouteEnum.ProjectScopeStatement}
                  component={ProjectScopeStatement}
                />
                <PrivateRoute
                  path={RouteEnum.ProjectScopeList}
                  component={ProjectScopeList}
                />

                <PrivateRoute
                  path={RouteEnum.WorkListPage}
                  component={WorkListPage}
                />

                <PrivateRoute
                  path={RouteEnum.ConfigItems}
                  component={ConfigItems}
                />
                <PrivateRoute
                  path={RouteEnum.ConfigItemsProjectPO}
                  component={ConfigItems}
                />
                <PrivateRoute
                  path={RouteEnum.ActivityReport}
                  component={ActivityReportPage}
                />
                <PrivateRoute
                  path={RouteEnum.ActivityReportDedicated}
                  component={ActivityReportPage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.ActivityReportForm}
                  component={ActivityReportFormAdd}
                />
                <PrivateRoute
                  path={RouteEnum.ActivityReportFormEdit}
                  component={ActivityReportFormEdit}
                />
                <PrivateRoute
                  path={RouteEnum.CreditBillingService}
                  component={CreditBillingServicePage}
                />
                <PrivateRoute
                  path={RouteEnum.MainCBVService}
                  component={MainCBVServicePage}
                />
                <PrivateRoute
                  path={RouteEnum.AWSCredential}
                  component={AWSCredentialPage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.DedicatedResources}
                  component={DedicatedResourcesPage}
                />
                <PrivateRoute
                  path={RouteEnum.DedicatedResourcesBulkUpdate}
                  component={DedicatedResourcesBulkUpdatePage}
                />
                <PrivateRoute
                  path={RouteEnum.DedicatedResourcesEdit}
                  component={DedicatedResourcesPageEdit}
                />
                {/* <PrivateRoute exact path={RouteEnum.CreditBillingServiceForm} component={CreditBillingServiceFormCard} />
                <PrivateRoute path={RouteEnum.CreditBillingServiceCardEdit} component={CreditBillingServiceFormCard} /> */}

                <PrivateRoute
                  path={RouteEnum.EmployeeFreelance}
                  component={EmployeeFreelancePage}
                />
                <PrivateRoute
                  exact
                  path={RouteEnum.EmployeeFreelanceForm}
                  component={EmployeeFreelanceFormAdd}
                />
                <PrivateRoute
                  path={RouteEnum.EmployeeFreelanceFormEdit}
                  component={EmployeeFreelanceFormEdit}
                />
                <PrivateRoute
                  path={RouteEnum.ActivityReportList}
                  component={ActivityReportListPage}
                />
                <PrivateRoute
                  path={RouteEnum.ActivityReportGroupingList}
                  component={ActivityReportGroupingListPage}
                />
                <PrivateRoute
                  path={RouteEnum.AllFeatures}
                  component={AllFeaturesPage}
                />
                <Route
                  path={RouteEnum.AddNewCustomerSetting}
                  component={AddNewCustomerSetting}
                />
                <Route
                  path={RouteEnum.ViewCustomerSetting}
                  component={ViewCustomerSetting}
                />
                <Route
                  path={RouteEnum.CustomerSetting}
                  component={CustomerSettingPage}
                />
                <PrivateRoute
                  path={RouteEnum.CollabTools}
                  component={CollabToolsPage}
                />
                {/*<Route component={NotFoundPage} />*/}
                <Route component={NotAuthorizedPage} />
              </Switch>
            </Container>
          </>
        )}
      />

      <Toasts />
    </Suspense>
  </ConnectedRouter>
);

export default App;

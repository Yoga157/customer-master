import { combineReducers, Reducer, ReducersMapObject } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import IStore from "../models/IStore";
import requestingReducer from "./requesting/RequestingReducer";
import errorReducer from "./error/ErrorReducer";
import toastsReducer from "./toasts/ToastsReducer";
import modalFirstLevelReducer from "./modal/first-level/ModalFirstLevelReducer";
import modalSecondLevelReducer from "./modal/second-level/ModalSecondLevelReducer";
import modalThirdLevelReducer from "./modal/third-level/ModalThirdLevelReducer";
import ModalNoPaddingReducer from "./modal/no-padding/ModalNoPaddingReducer";
import serviceCatalogReducer from "./service-catalog/ServiceCatalogReducer";
import serviceCatalogCategoryReducer from "./service-catalog-category/ServiceCatalogCategoryReducer";
import {
  customerTransferReducer,
  historyReducer,
  dataFunnelReducer,
  dataFunnelCustomerReducer,
  dataValueReducer,
} from "./customer-transfer/CustomerTransferReducer";
import employeeReducer from "./employee/EmployeeReducer";
import customerReducer from "./customer/CustomerReducer";
import brandReducer from "./brand/BrandReducer";
import bondTypeReducer from "./bond-type/BondTypeReducer";
import letterTypeReducer from "./letter-type/LetterTypeReducer";
import languageReducer from "./language/LanguageReducer";
import bankReducer from "./bank/BankReducer";
import bondIssuerReducer from "./bond-issuer/BondIssuerReducer";
import documentTypeReducer from "./document-type/DocumentTypeReducer";
import industryClassReducer from "./industry-class/IndustryClassReducer";
import presalesSupportReducer from "./presales-support/PresalesSupportReducer";
import serviceOnwerReducer from "./service-owner/ServiceOwnerReducer";
import funnelReducer from "./funnel/FunnelReducer";
import customerPICReducer from "./customer-pic/CustomerPICReducer";
import productServiceReducer from "./funnel-product-service/ProductServiceReducer";
import funnelActivityReducer from "./funnel-activity/FunnelActivityReducer";
import activityTypeReducer from "./activity-type/ActivityTypeReducer";
import subBrandReducer from "./brand-sub/SubBrandReducer";
import meetingRequestReducer from "./meeting-request/MeetingRequestReducer";
import brandTypeReducer from "./brand-model/BrandTypeReducer";
import sidebarContainerReducer from "./sidebar-containers/SidebarContainerReducer";
import customerToFunnelReducer from "./customer/CustomerToFunnelReducer";
import attachmentReducer from "./attachment/AttachmentReducer";
import attachmentVersionsReducer from "./attachment-versions/AttachmentVersionsReducer";
import meetingMomItemsReducer from "./meeting-mom-items/MeetingMomItemReducer";
import meetingMomReducer from "./meeting-mom/MeetingMomReducer";
import funnelServiceCatalogReducer from "./funnel-service-catalog/FunnelServiceCatalogReducer";
import boqReducer from "./boq/BOQReducer";
import insuranceReducer from "./insurance/InsuranceReducer";
import postsalesSupportReducer from "./postsales-support/PostsalesSupportReducer";
import pocReducer from "./funnel-poc-request/POCReducer";
import funnelStatusReducer from "./funnel-status/FunnelStatusReducer";
import userReducer from "./users/UserReducer";
import bankGaransiReducer from "./bank-garansi/BankGaransiReducer";
import supportRoleReducer from "./support-role/SupportRoleReducer";
import funnelSupportTeamReducer from "./funnel-support-teams/FunnelSupportTeamReducer";
import ReqDedicatedResourceReducer from "./funnel-dedicated-resource/ReqDedicatedResourceReducer";
import paymentTypeReducer from "./payment-type/PaymentTypeReducer";
import pmoSupportReducer from "./pmo-support/PMOSupportReducer";
import funnelWarrantyReducer from "./funnel-warranty/FunnelWarrantyReducer";
import pocRequirementReducer from "./funnel-poc-requirement/POCRequirementReducer";
import actionPlanNotesReducer from "./actionplan-notes/ActionPlanNotesReducer";
import summaryActionPlanReducer from "./summary-actionplan/SummaryActionPlanReducer";
import serviceItemReducer from "./service-item/ServiceItemReducer";
import softwareReducer from "./software/SoftwareReducer";
import competitorReducer from "./competitor/CompetitorReducer";
import competitorProductReducer from "./competitor-product/CompetitorProductReducer";
import costReducer from "./funnel-cost/COSTReducer";
import funnelOpportunityReducer from "./funnel-opportunity/FunnelActivityReducer";
import reportManagerReducer from "./report-manager/ReportManagerReducer";
import generateFormReducer from "./generated-form/GenerateFormReducer";
import whatsNewReducer from "./whats-new/WhatsNewReducer";
import FunnelSplitReducer from "./funnel-split-performance/FunnelPerformanceReducer";
import CoverageHourReducer from "./coverage-hour/CoverageHourReducer";
import ResponseResolutionReducer from "./response-resolution/ResponseResolutionReducer";
import PreventiveScheduleReducer from "./preventive-schedule/PreventiveScheduleReducer";
import FunnelTopReducer from "./funnel-top/FunnelTopReducer";
import commissionIndexReducer from "./commision-index/CommissionIndexReducer";
import buttonToggleReducer from "./funnel-sales-analyst/button-toggle/ButtonToggleReducer";
import SalesAnalystReducer from "./funnel-sales-analyst/funnel-sa/FunnelSalesAnalystReducer";
import DelegationReducer from "./delegation/DelegationReducer";
import QuotaReducer from "./quota/QuotaReducer";
import CustomerCreditReducer from "./customer-credit-service/CustomerCreditReducer";
import kpiDashboardReducer from "./kpi/kpi-dashboard/KpiDashboardReducer";
import kpiDataReducer from "./kpi/kpi-data/KpiDataReducer";
import kpiSettingReducer from "./kpi/kpi-setting/KpiSettingReducer";
import ActivityReportReducer from "./activity-report/ActivityReportReducers";
import ActivityReportProductReducer from "./activity-report-product/ActivityReportProductReducers";
import ActivityReportCategoryReducer from "./activity-report-category/ActivityReportCategoryReducers";
import ActivityReportActivityInformationReducer from "./activity-report-activity-information/ActivityReportActivityInformationReducers";
import ActivityReportNotesReducers from "./activity-report-notes/ActivityReportNotesReducers";
import ActivityReportSuperiorReviewReducers from "./activity-report-superior-review/ActivityReportSuperiorReviewReducers";
import ActivityReportCustomerSignatureReducer from "./activity-report-customer-signature/ActivityReportCustomerSignatureReducers";
import ActivityReportTotalCustomerExperienceReducer from "./activity-report-total-customer-experience/ActivityReportTotalCustomerExperienceReducers";
import ActivityReportTicketInformationReducer from "./activity-report-ticket-information/ActivityReportTicketInformationReducers";
import EmployeeFreelanceReducer from "./employee-freelance/EmployeeFreelanceReducers";
import EmployeeFreelancePermanentReducers from "./employee-freelance-permanent/EmployeeFreelancePermanentReducers";
import creditBillingReducer from "./main-cbv/CreditBillingReducer";
import AWSCredentialReducer from "./aws-credential/AWSCredentialReducer";
import AWSBillingReducer from "./aws-billing/AWSBillingReducer";
import pssReducer from "./pss/PSSReducer";
import pmoReducer from "./pmo/PMOReducer";
import configItemsReducer from "./config-items/ConfigItemsReducer";
import projectGundamReducer from "./project-gundam/ProjectGundamReducer";
import workListReducer from "./work-list/WorkListReducer";
import ticketReducer from "./ticket/TicketReducer";
import DedicatedResourcesReducer from "./dedicated-resources/DedicatedResourcesReducer";
import presalesViewReducer from "./presales-view/PresalesViewReducer";
import ActivityReportGroupingReducer from "./activity-report-grouping/ActivityReportGroupingReducer";
import customerSettingReducer from "./customer-setting/CustomerActivityReducer";
import CustomerMasterReducer from "./customer-master/CustomerMasterActivityReducer";
import SalesAssignReducer from "./customer-sales/SalesAssignActivityReducer";
import CustomerNameReducer from "./customer-name/CustomerNameActivityReducer";
import BrandSummaryReducer from "./brand-summary/BrandSummaryActivityReducer";
import ServiceSummaryReducer from "./service-summary/ServiceSummaryActivityReducer";
import InvoicingScheduleReducer from "./invoicing-schedule/InvoicingScheduleActivityReducer";
import InvoicingConditionReducer from "./invoicing-condition/InvoicingConditionActivityReducer";
import RelatedCustomerReducer from "./related-customer/RelatedCustomerActivityReducer";
import RelatedFileReducer from "./related-file/RelatedFileActivityReducer";
import ConfigItemReducer from "./config-item/ConfigItemActivityReducer";
import CollectionHistoryReducer from "./collection-history/CollectionHistoryActivityReducer";
import ProjectHistoryReducer from "./project-history/ProjectHistoryActivityReducer";
import CollabToolsReducer from "./collab-tools/CollabToolsReducer";
import customerMasterReducer from "./customer-master/CustomerMasterActivityReducer";

const rootReducer = (history: History): Reducer<IStore> => {
  const reducerMap: ReducersMapObject<IStore> = {
    error: errorReducer,
    requesting: requestingReducer,
    router: connectRouter(history) as any,
    toasts: toastsReducer,
    modalFirstLevel: modalFirstLevelReducer,
    modalSecondLevel: modalSecondLevelReducer,
    modalThirdLevel: modalThirdLevelReducer,
    modalNoPadding: ModalNoPaddingReducer,
    serviceCatalog: serviceCatalogReducer,
    serviceCatalogCategory: serviceCatalogCategoryReducer,
    customerTransfer: customerTransferReducer,
    historyTransfer: historyReducer,
    dataFunnel: dataFunnelReducer,
    dataFunnelCustomer: dataFunnelCustomerReducer,
    dataValue: dataValueReducer,
    employee: employeeReducer,
    customer: customerReducer,
    brand: brandReducer,
    bondType: bondTypeReducer,
    language: languageReducer,
    bank: bankReducer,
    bondIssuer: bondIssuerReducer,
    letterType: letterTypeReducer,
    documentType: documentTypeReducer,
    subBrand: subBrandReducer,
    brandModel: brandTypeReducer,
    industryClass: industryClassReducer,
    presalesSupport: presalesSupportReducer,
    serviceOwner: serviceOnwerReducer,
    funnel: funnelReducer,
    customerPIC: customerPICReducer,
    funnelProductService: productServiceReducer,
    funnelActivity: funnelActivityReducer,
    activityType: activityTypeReducer,
    sidebar: sidebarContainerReducer,
    attachment: attachmentReducer,
    attachmentVersions: attachmentVersionsReducer,
    customerToFunnel: customerToFunnelReducer,
    meetingRequest: meetingRequestReducer,
    meetingMomItems: meetingMomItemsReducer,
    meetingMom: meetingMomReducer,
    funnelServiceCatalog: funnelServiceCatalogReducer,
    funnelBoq: boqReducer,
    insurance: insuranceReducer,
    postsalesSupport: postsalesSupportReducer,
    poc: pocReducer,
    funnelStatus: funnelStatusReducer,
    userLogin: userReducer,
    supportRole: supportRoleReducer,
    funnelSupportTeams: funnelSupportTeamReducer,
    bankGaransi: bankGaransiReducer,
    reqDedicatedResource: ReqDedicatedResourceReducer,
    paymentType: paymentTypeReducer,
    pmoSupport: pmoSupportReducer,
    funnelWarrantySLA: funnelWarrantyReducer,
    pocRequirement: pocRequirementReducer,
    serviceItem: serviceItemReducer,
    actionPlan: actionPlanNotesReducer,
    summaryActionPlan: summaryActionPlanReducer,
    software: softwareReducer,
    competitor: competitorReducer,
    competitorProduct: competitorProductReducer,
    costTable: costReducer,
    funnelOpportunity: funnelOpportunityReducer,
    reportManager: reportManagerReducer,
    generatedForm: generateFormReducer,
    whatsNew: whatsNewReducer,
    funnelSplit: FunnelSplitReducer,
    coverageHour: CoverageHourReducer,
    responseResolution: ResponseResolutionReducer,
    preventiveSchedule: PreventiveScheduleReducer,
    funnelTop: FunnelTopReducer,
    commissionIndex: commissionIndexReducer,
    buttonToggle: buttonToggleReducer,
    funnelSalesAnalyst: SalesAnalystReducer,
    delegation: DelegationReducer,
    quota: QuotaReducer,
    customerCredit: CustomerCreditReducer,
    kpiDashboard: kpiDashboardReducer,
    kpiData: kpiDataReducer,
    kpiSetting: kpiSettingReducer,
    activityReport: ActivityReportReducer,
    activityReportProduct: ActivityReportProductReducer,
    activityReportCategory: ActivityReportCategoryReducer,
    activityReportActivityInformation: ActivityReportActivityInformationReducer,
    activityReportNotes: ActivityReportNotesReducers,
    activityReportSuperiorReview: ActivityReportSuperiorReviewReducers,
    activityReportCustomerSignature: ActivityReportCustomerSignatureReducer,
    activityReportTotalCustomerExperience: ActivityReportTotalCustomerExperienceReducer,
    activityReportTicketInformation: ActivityReportTicketInformationReducer,
    activityReportGrouping: ActivityReportGroupingReducer,
    employeeFreelance: EmployeeFreelanceReducer,
    employeeFreelancePermanent: EmployeeFreelancePermanentReducers,
    creditBilling: creditBillingReducer,
    awsCredentital: AWSCredentialReducer,
    awsBilling: AWSBillingReducer,
    pss: pssReducer,
    pmo: pmoReducer,
    configItems: configItemsReducer,
    configItem: ConfigItemReducer,
    projectGundam: projectGundamReducer,
    workList: workListReducer,
    dedicatedresources: DedicatedResourcesReducer,
    ticket: ticketReducer,
    presalesView: presalesViewReducer,
    customerSetting: customerSettingReducer,
    customerMaster: customerMasterReducer,
    customerSalesAssign: SalesAssignReducer,
    brandSummary: BrandSummaryReducer,
    customerName: CustomerNameReducer,
    serviceSummary: ServiceSummaryReducer,
    invoicingSchedule: InvoicingScheduleReducer,
    invoicingCondition: InvoicingConditionReducer,
    relatedCustomer: RelatedCustomerReducer,
    relatedFile: RelatedFileReducer,
    collectionHistory: CollectionHistoryReducer,
    projectHistory: ProjectHistoryReducer,
    collabTools: CollabToolsReducer,
  };

  return combineReducers(reducerMap);
};

export default rootReducer;

import QuotaBrandHardwareModelMaster from "./QuotaBrandHardwareModelMaster";
import QuotaBrandSoftwareModelMaster from "./QuotaBrandSoftwareModelMaster";
import ReportSummarySharedQuota from "./ReportSummarySharedQuota.model";
import QuotaServiceModelMaster from "./QuotaServiceModelMaster";
import QuotaModelByEntryKey from "./QuotaModelByEntryKey";
import EmplyeeHirarcyModel from "./EmplyeeHirarcyModel";
import SummaryQuotaModel from "./SummaryQuotaModel";
import QuotaMasterModel from "./QuotaMasterModel";


export default interface IQuotaState {
  error: boolean,
  refreshPage: boolean,
  resultActions: any,
  quotaHeader: QuotaModelByEntryKey[],
  quotaMaster: QuotaMasterModel,
  summarySharedQuota: ReportSummarySharedQuota,
  quotaMasterMyTeam: QuotaMasterModel[],
  summaryQuota: SummaryQuotaModel,
  quotaBrandHardwareMaster: QuotaBrandHardwareModelMaster[],
  quotaBrandSoftwareMaster: QuotaBrandSoftwareModelMaster[],
  quotaServiceMaster: QuotaServiceModelMaster[],
  emplyeeHirarcy: EmplyeeHirarcyModel[],

}



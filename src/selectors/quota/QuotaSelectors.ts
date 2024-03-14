import { createSelector, ParametricSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
// import { Selector } from 'react-redux';

import IOptionsData from 'selectors/select-options/models/IOptionsData';
import quotaBrandHardwareModelMaster from 'stores/quota/models/QuotaBrandHardwareModelMaster';
import quotaBrandSoftwareModelMaster from 'stores/quota/models/QuotaBrandSoftwareModelMaster';
import quotaServiceModelMaster from 'stores/quota/models/QuotaServiceModelMaster';
import IEmplyeeHirarcy from './models/IEmplyeeHirarcy';
import EmplyeeHirarcyModel from 'stores/quota/models/EmplyeeHirarcyModel';
import QuotaMasterModel, {
  HardwareSoftwareModel,
  RowHardwareSoftwareModel,
  RowServiceModel,
  ServiceModel,
} from 'stores/quota/models/QuotaMasterModel';
import SummaryQuotaModel from 'stores/quota/models/SummaryQuotaModel';

const _selectQuotaHardwareMaster = (models: quotaBrandHardwareModelMaster[]): IOptionsData[] => {
  return models.map(
    (model: quotaBrandHardwareModelMaster): IOptionsData => ({
      value: model.minQuota,
      text: model.brandName,
    })
  );
};
export const selectQuotaHardwareMaster: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.quota.quotaBrandHardwareMaster,
  _selectQuotaHardwareMaster
);

const _selectQuotaSoftwareMaster = (models: quotaBrandSoftwareModelMaster[]): IOptionsData[] => {
  return models.map(
    (model: quotaBrandSoftwareModelMaster): IOptionsData => ({
      value: model.minQuota,
      text: model.brandName,
    })
  );
};
export const selectQuotaSoftwareMaster: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.quota.quotaBrandSoftwareMaster,
  _selectQuotaSoftwareMaster
);

const _selectQuotaServiceMaster = (models: quotaServiceModelMaster[]): IOptionsData[] => {
  return models.map(
    (model: quotaServiceModelMaster): IOptionsData => ({
      value: model.minQuota,
      text: model.brandName,
    })
  );
};
export const selectQuotaServiceMaster: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.quota.quotaServiceMaster,
  _selectQuotaServiceMaster
);

const _selectEmployeeHirarcy = (models: EmplyeeHirarcyModel[]): IEmplyeeHirarcy[] => {
  return models.map(
    (model: EmplyeeHirarcyModel): IEmplyeeHirarcy => ({
      employeeID: model.employeeID,
      employeeName: model.employeeName,
      deptID: model.deptID,
    })
  );
};
export const selectEmployeeHirarcy: Selector<IStore, IEmplyeeHirarcy[]> = createSelector(
  (state: IStore) => state.quota.emplyeeHirarcy,
  _selectEmployeeHirarcy
);



const _mappingHardwareSoftwareRowModel = (models:RowHardwareSoftwareModel[]):any=>{
  return models?.length > 0 ? models.map((model:RowHardwareSoftwareModel):any=>({
    quotaBrandID: model.quotaBrandID,
    brandName: model.brandName,
    quotaPrincipal: model.quotaPrincipal,
    minQuota: model.minQuota,
    brandChoice: model.brandChoice,
    quotaGPM: model.quotaGPM,
    brandAchieve: model.brandAchieve,
    effectiveDate: model.effectiveDate,
    expireDate: model.expireDate
  })) : []
}
const _mappingServiceRowModel = (models:RowServiceModel[]):any=>{
  return  models?.length > 0 ? models.map((model:RowServiceModel):any=>({
    quotaBrandID: model.quotaBrandID,
    brandName: model.brandName,
    quotaCompany: model.quotaCompany,
    minQuota: model.minQuota,
    effectiveDate: model.effectiveDate,
    expireDate: model.expireDate
  })) : []
}

const _mappingHardwareSoftwareModel = (model: HardwareSoftwareModel): any => {
  if (model) {
    return {
      achieveInformation: model.achieveInformation,
      minAchieve: model.minAchieve,
      minChoice: model.minChoice,
      quotaName: model.quotaName ? model.quotaName : '',
      rows: _mappingHardwareSoftwareRowModel(model.rows),
    };
  } else {
    return new HardwareSoftwareModel({});
  }
};
const _mappingSoftware = (model: ServiceModel): any => {
  if (model) {
    return {
      achieveInformation: model.achieveInformation,
      minAchieve: model.minAchieve,
      minChoice: model.minChoice,
      quotaName: model.quotaName ? model.quotaName : '',
      rows: _mappingServiceRowModel(model.rows),
    };
  } else {
    return new ServiceModel({});
  }
};

const _selectQuotaMaster = (model: QuotaMasterModel): any => {
  return {
    salesID: model.salesID,
    salesDomain: model.salesDomain,
    salesInfo: model.salesInfo,
    quotaEffective: model.quotaEffective,
    salesName: model.salesName,
    quotaGPM: model.quotaGPM,
    quotaSelling: model.quotaSelling,
    unsetQuotaPeople: model.unsetQuotaPeople,
    notFullDistributed: model.notFullDistributed,
    mustFullDistributed: model.mustFullDistributed,
    directorat: model.directorat,
    hardware: _mappingHardwareSoftwareModel(model.hardware),
    software: _mappingHardwareSoftwareModel(model.software),
    service: _mappingSoftware(model.service),
  };
};

export const selectQuotaMaster: Selector<IStore, QuotaMasterModel> = createSelector((state: IStore) => state.quota.quotaMaster, _selectQuotaMaster);

const _selectQuotaMasterTeam = (models: QuotaMasterModel[]): any => {
  if (models) {
    return models.map((model: QuotaMasterModel): any => ({
      salesID: model.salesID,
      salesDomain: model.salesDomain,
      salesInfo: model.salesInfo,
      quotaEffective: model.quotaEffective,
      salesName: model.salesName,
      quotaGPM: model.quotaGPM,
      quotaSelling: model.quotaSelling,
      unsetQuotaPeople: model.unsetQuotaPeople,
      notFullDistributed: model.notFullDistributed,
      hardware: model.hardware,
      software: model.software,
      service: model.service,
      directorat: model.directorat,
    }));
  } else {
    return [];
  }
};

export const selectQuotaMasterTeam: Selector<IStore, QuotaMasterModel[]> = createSelector(
  (state: IStore) => state.quota.quotaMasterMyTeam,
  _selectQuotaMasterTeam
);

const _selectSummaryQuota = (model: SummaryQuotaModel): any => {
  return {
    salesID: model.salesID,
    quotaGPM: model.quotaGPM,
    unsetQuotaPeople: model.unsetQuotaPeople,
    notFullDistributed: model.notFullDistributed,
  };
};

export const selectSummaryQuota: Selector<IStore, SummaryQuotaModel> = createSelector(
  (state: IStore) => state.quota.summaryQuota,
  _selectSummaryQuota
);

// const _selectDelegationEdit = (models: DelegationModel): IDelegationEdit =>{
//   return {
//     delegasiID : models.delegasiID,
//     fromUser : models.fromUser,
//     fromUserStr : models.fromUserStr,
//     effDate : new Date(models.effDate),
//     effDateStr : models.effDateStr,
//     expDate : new Date(models.expDate),
//     expDateStr : models.expDateStr,
//     remarks : models.remarks,
//     userLoginID : models.userLoginID,
//     detailDelegasi : models.detailDelegasi
//   };
// }

// export const selectDelegationEdit: Selector<IStore, any> = createSelector(
//   (state: IStore) => state.delegation.firstData,
//   _selectDelegationEdit
// );

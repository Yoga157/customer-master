import BankGaransiModel from 'stores/bank-garansi/models/BankGaransiModel';
import BankGaransiEditViewAdminModel from 'stores/bank-garansi/models/BankGaransiEditViewAdminModel';
import BankGaransiEditViewRequesterModel from 'stores/bank-garansi/models/BankGaransiEditViewRequesterModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IAttachmentVersionTable from './models/IAttachmentVersionTable';
import IBankGaransiTable from './models/IBankGaransiTable';
import IBankGaransiAdminTable from './models/IBankGaransiAdminTable';
import IMasterInsuranceTable from './models/IMasterInsuranceTable';
import IBankGaransiTableRow from './models/IBankGaransiTableRow';
import IAttachmentVersionTableRow from './models/IAttachmentVersionTableRow';
import IBankGaransiAdminTableRow from './models/IBankGaransiAdminTableRow';
import IMasterInsuranceTableRow from './models/IMasterInsuranceTableRow';
import BankGaransiEnvelope from 'stores/bank-garansi/models/BankGaransiEnvelope';
import BankGaransiAdminEnvelope from 'stores/bank-garansi/models/BankGaransiAdminEnvelope';
import MasterInsuranceEnvelope from 'stores/bank-garansi/models/MasterInsuranceEnvelope';
import { Selector } from 'react-redux';
import BankRecommended from 'stores/bank-garansi/models/BankRecommended';
import BankGaransiAdminModel from 'stores/bank-garansi/models/BankGaransiAdminModel';
import MasterInsuranceModel from 'stores/bank-garansi/models/MasterInsuranceModel';
import FunnelSALinkToModel from 'stores/bank-garansi/models/FunnelSALinkToModel';
import AttachmentEnvelope from 'stores/bank-garansi/models/AttachmentEnvelope';
import AttachmentModel from 'stores/bank-garansi/models/AttachmentModel';
import MasterInsuranceUdcModel from 'stores/bank-garansi/models/MasterInsuranceUdcModel';
import IAttachmentTable from './models/IAttachmentTable';
import IAttachmentTableRow from './models/IAttachmentTableRow';
import IBankGaransiAdminEditRow from './models/IBankGaransiAdminEditRow';
import IMasterInsuranceEditRow from './models/IMasterInsuranceEditRow';
import CompetitorProductModel from 'stores/competitor-product/models/CompetitorProductModel';
import ExtendAttachmentModel from 'stores/bank-garansi/models/ExtendAttachmentModel';
import IOptionsDataString from 'selectors/select-options/models/IOptionsDataString';
import DropdownFunnelSAModel from 'stores/bank-garansi/models/DropdownFunnelSAModel';
import BankGaransiDashboardEnvelope from 'stores/bank-garansi/models/BankGaransiDashboardEnvelope';
import BankGaransiActivityModel from 'stores/bank-garansi/models/BankGaransiActivityModel';
import AttachmentVersionEnvelope from 'stores/bank-garansi/models/AttachmentVersionEnvelope';
import AttachmentVersionModel from 'stores/bank-garansi/models/AttachmentVersionModel';
import CheckExpireModel from 'stores/bank-garansi/models/CheckExpireModel';
import MaxAmountModel from 'stores/bank-garansi/models/MaxAmountModel';

//Company
const _selectCompany = (models: MasterInsuranceUdcModel[]): any[] => {
  return models.map((model: MasterInsuranceUdcModel): any => ({
    text: model.text1,
    value: model.inum1,
  }));
};

export const selectCompanyOptions: Selector<IStore, any[]> = createSelector((state: IStore) => state.bankGaransi.dataCompany, _selectCompany);

//Company Applicant
const _selectCompanyApplicant = (models: MasterInsuranceUdcModel[]): any[] => {
  return models.map((model: MasterInsuranceUdcModel): any => ({
    text: model.text1,
    value: model.text1,
  }));
};

export const selectCompanyApplicantOptions: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.bankGaransi.dataCompanyApplicant,
  _selectCompanyApplicant
);

//Bank CG
const _selectBankCG = (models: DropdownFunnelSAModel[]): any[] => {
  return models.map((model: DropdownFunnelSAModel): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectBankCGOptions: Selector<IStore, any[]> = createSelector((state: IStore) => state.bankGaransi.dataBankCG, _selectBankCG);

const _selectPrint = (models: CompetitorProductModel[]): IOptionsDataString[] => {
  return models.map(
    (model: CompetitorProductModel): IOptionsDataString => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectPrintOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.bankGaransi.dataPrint,
  _selectPrint
);

//Attachment
const _selectAttachment = (models: AttachmentEnvelope): IAttachmentTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableAttachmentRows(models.rows),
  };
};

const _createTableAttachmentRows = (models: AttachmentModel[]): IAttachmentTableRow[] => {
  return models.map((model: AttachmentModel): IAttachmentTableRow => _mappingObjectTableAttachmentRow(model));
};

const _mappingObjectTableAttachmentRow = (model: AttachmentModel): IAttachmentTableRow => {
  return {
    funnelAttachmentID: model.funnelAttachmentID,
    funnelGenID: model.funnelGenID,
    documentTypeID: model.documentTypeID,
    documentType: model.documentType,
    documentName: model.documentName,
    versionNumber: model.versionNumber,
    status: model.status,
    uploadTime: model.uploadTime,
    uploadBy: model.uploadBy,
    fileName: model.fileName,
  };
};

export const selectAttachment: ParametricSelector<IStore, string[], IAttachmentTable> = createSelector(
  (state: IStore) => state.bankGaransi.dataAttachment,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectAttachment
);
//----------------------------------------------------------------------------------------------------------

/* const _selectBankGaransiAdmins = (models: BankGaransiAdminEnvelope): IBankGaransiAdminTable => {
  return {
    totalRow:models.totalRows,
    rows: _createAdminTableRows(models.rows),
  };
}; */
const _mappingObjectAdminTableRow = (model: BankGaransiAdminModel): IBankGaransiAdminTableRow => {
  return {
    bankGuaranteeGenID: model.bankGuaranteeGenID,
    funnelGenID: model.funnelGenID,
    linkTo: model.linkTo,
    createUserID: model.createUserID,
    status: model.status,
    process: model.process,
    bondIssuer: model.bondIssuer,
    createBy: model.createBy,
    bondType: model.bondType,
    bondIssuerType: model.bondIssuerType,
    letterType: model.letterType,
    letterNo: model.letterNo,
    stepName: model.stepName,
    stepOwner: model.stepOwner,
    bankGuaranteeNo: model.bankGuaranteeNo,
    bankGuaranteeID: model.bankGuaranteeID,
    createDate: new Date(model.createDate!),
    expireDate: new Date(model.reqExpireDate!),
    adminEffectiveDate: new Date(model.adminEffectiveDate!),
    adminExpireDate: new Date(model.adminExpireDate!),
    statusProject: model.statusProject,
    customerName: model.customerName,
    bu: model.bu,
    so: model.so,
    nilai: model.nilai,
    companyApplicant: model.companyApplicant,
  };
};
const _createAdminTableRows = (models: BankGaransiAdminModel[]): IBankGaransiAdminTableRow[] => {
  return models.map((model: BankGaransiAdminModel): IBankGaransiAdminTableRow => _mappingObjectAdminTableRow(model));
};

const _selectBankGaransiAdmins = (models: BankGaransiDashboardEnvelope): IBankGaransiAdminTable => {
  return {
    totalRow: models.totalRows,
    rows: _createAdminTableRows(models.rows),
  };
};

/* const _createAdminTableRows = (models: BankGaransiAdminModel[]): IBankGaransiAdminTableRow[] => {
  return models.map(
    (model: BankGaransiAdminModel): IBankGaransiAdminTableRow => (_mappingObjectAdminTableRow(model))
  );
}; */

export const selectBankGaransiAdmins: Selector<IStore, IBankGaransiAdminTable> = createSelector(
  (state: IStore) => state.bankGaransi.listSearch!,
  _selectBankGaransiAdmins
);

/* export const selectBankGaransiAdmins: ParametricSelector<IStore,string[], IBankGaransiAdminTable> = createSelector(
  (state: IStore) => state.bankGaransi.listDataAdmin!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectBankGaransiAdmins); */

//---------------------------------------------------------------------------------------------------------------

//Attachment Versions
const _createAttachmentVersionTableRows = (models: AttachmentVersionModel[]): IAttachmentVersionTableRow[] => {
  return models.map((model: AttachmentVersionModel): IAttachmentVersionTableRow => _mappingObjectAttachmentVersionTableRow(model));
};
const _selectAttachmentVersions = (models: AttachmentVersionEnvelope): IAttachmentVersionTable => {
  return {
    totalRow: models.totalRows,
    rows: _createAttachmentVersionTableRows(models.rows),
  };
};
const _mappingObjectAttachmentVersionTableRow = (model: AttachmentVersionModel): IAttachmentVersionTableRow => {
  return {
    funnelAttachmentID: model.funnelAttachmentID,
    funnelGenID: model.funnelGenID,
    documentTypeID: model.documentTypeID,
    documentType: model.documentType,
    documentName: model.documentName,
    versionNumber: model.versionNumber,
    status: model.status,
    uploadTime: model.uploadTime,
    uploadBy: model.uploadBy,
    fileName: model.fileName,
    flagView: model.flagView,
    docNumber: model.docNumber,
  };
};
export const selectAttachmentVersions: Selector<IStore, IAttachmentVersionTable> = createSelector(
  (state: IStore) => state.bankGaransi.attachmentVersion!,
  _selectAttachmentVersions
);
//---------------------------------------------------------------------------------------------------------------

//Expired BG
/*const _selectBankGaransiAdminExs = (models: BankGaransiAdminEnvelope): IBankGaransiAdminTable => {
  return {
    totalRow:models.totalRows,
    rows: _createAdminExTableRows(models.rows),
  };
}; */

/*const _createAdminExTableRows = (models: BankGaransiAdminModel[]): IBankGaransiAdminTableRow[] => {
  return models.map(
    (model: BankGaransiAdminModel): IBankGaransiAdminTableRow => (_mappingObjectAdminExTableRow(model))
  );
}; */

/*export const selectBankGaransiAdminExs: ParametricSelector<IStore,string[], IBankGaransiAdminTable> = createSelector(
  (state: IStore) => state.bankGaransi.listExpiredDataAdmin!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectBankGaransiAdminExs);

  const _mappingObjectAdminExTableRow = (model: BankGaransiAdminModel): IBankGaransiAdminTableRow => {
    return {
        bankGuaranteeGenID:model.bankGuaranteeGenID,
        linkTo:model.linkTo,
        funnelGenID:model.funnelGenID,
        createUserID:model.createUserID,
        status:model.status,
        createBy:model.createBy,
        process:model.process,
        bondIssuer:model.bondIssuer,
        bondType:model.bondType,
        letterType:model.letterType,
        letterNo:model.letterNo,
        bondIssuerType:model.bondIssuerType,
        stepName:model.stepName,
        stepOwner:model.stepOwner,
        bankGuaranteeNo:model.bankGuaranteeNo,
        bankGuaranteeID:model.bankGuaranteeID,
        createDate:new Date(model.createDate!),
        expireDate:new Date(model.reqExpireDate!),
        adminEffectiveDate:new Date(model.adminEffectiveDate!),
        adminExpireDate:new Date(model.adminExpireDate!),
        statusProject:model.statusProject,
    };
};
*/

const _mappingObjectAdminExTableRow = (model: BankGaransiAdminModel): IBankGaransiAdminTableRow => {
  return {
    bankGuaranteeGenID: model.bankGuaranteeGenID,
    funnelGenID: model.funnelGenID,
    linkTo: model.linkTo,
    createUserID: model.createUserID,
    status: model.status,
    process: model.process,
    bondIssuer: model.bondIssuer,
    createBy: model.createBy,
    bondType: model.bondType,
    bondIssuerType: model.bondIssuerType,
    letterType: model.letterType,
    letterNo: model.letterNo,
    stepName: model.stepName,
    stepOwner: model.stepOwner,
    bankGuaranteeNo: model.bankGuaranteeNo,
    bankGuaranteeID: model.bankGuaranteeID,
    createDate: new Date(model.createDate!),
    expireDate: new Date(model.reqExpireDate!),
    adminEffectiveDate: new Date(model.adminEffectiveDate!),
    adminExpireDate: new Date(model.adminExpireDate!),
    statusProject: model.statusProject,
    customerName: model.customerName,
    bu: model.bu,
    so: model.so,
    nilai: model.nilai,
    companyApplicant: model.companyApplicant,
  };
};
const _createAdminTableExRows = (models: BankGaransiAdminModel[]): IBankGaransiAdminTableRow[] => {
  return models.map((model: BankGaransiAdminModel): IBankGaransiAdminTableRow => _mappingObjectAdminExTableRow(model));
};

const _selectBankGaransiAdminExs = (models: BankGaransiDashboardEnvelope): IBankGaransiAdminTable => {
  return {
    totalRow: models.totalRows,
    rows: _createAdminTableExRows(models.rows),
  };
};

export const selectBankGaransiAdminExs: Selector<IStore, IBankGaransiAdminTable> = createSelector(
  (state: IStore) => state.bankGaransi.listExpiredDataAdmin!,
  _selectBankGaransiAdminExs
);

//---------------------------------------------------------------------------------------------------------------

//Master Insurance
const _selectMasterInsurance = (models: MasterInsuranceEnvelope): IMasterInsuranceTable => {
  return {
    totalRow: models.totalRows,
    rows: _createInsuranceTableRows(models.rows),
  };
};

const _createInsuranceTableRows = (models: MasterInsuranceModel[]): IMasterInsuranceTableRow[] => {
  return models.map((model: MasterInsuranceModel): IMasterInsuranceTableRow => _mappingObjectInsuranceTableRow(model));
};

export const selectMasterInsurance: ParametricSelector<IStore, string[], IMasterInsuranceTable> = createSelector(
  (state: IStore) => state.bankGaransi.dataInsurance!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectMasterInsurance
);

const _mappingObjectInsuranceTableRow = (model: MasterInsuranceModel): IMasterInsuranceTableRow => {
  return {
    id: model.id,
    entryKey: model.entryKey,
    rekening: model.rekening,
    insuranceName: model.insuranceName,
    addr1: model.addr1,
    addr2: model.addr2,
    city: model.city,
    postalCode: model.postalCode,
    insuranceEmail: model.insuranceEmail,
    waktuProses: model.waktuProses,
  };
};
//---------------------------------------------------------------------------------------------------------------

const _selectBankGaransis = (models: BankGaransiEnvelope): IBankGaransiTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: BankGaransiModel[]): IBankGaransiTableRow[] => {
  return models.map((model: BankGaransiModel): IBankGaransiTableRow => _mappingObjectTableRow(model));
};

export const selectBankGaransis: ParametricSelector<IStore, string[], IBankGaransiTable> = createSelector(
  (state: IStore) => state.bankGaransi.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectBankGaransis
);

const _mappingObjectTableRow = (model: BankGaransiModel): IBankGaransiTableRow => {
  return {
    bankGuaranteeGenID: model.bankGuaranteeGenID,
    funnelGenID: model.funnelGenID,
    status: model.status,
    bondIssuer: model.bondIssuer,
    bondType: model.bondType,
    letterType: model.letterType,
    nilai: model.nilai,
    projectAmount: model.projectAmount,
    bankGuaranteeNo: model.bankGuaranteeNo,
    submitDate: new Date(model.submitDate!),
    expireDate: new Date(model.reqExpireDate!),
  };
};

const _selectBankGaransi = (model: BankGaransiModel): BankGaransiModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: BankGaransiModel): BankGaransiModel => {
  return new BankGaransiModel({
    bankGuaranteeGenID: model.bankGuaranteeGenID,
    funnelGenID: model.funnelGenID,
    status: model.status,
    bondIssuer: model.bondIssuer,
    bondType: model.bondType,
    letterType: model.letterType,
    bankGuaranteeNo: model.bankGuaranteeNo,
    tenderNo: model.tenderNo,
    submitDate: new Date(model.submitDate!),
    createDate: new Date(model.createDate!),
    reqExpireDate: new Date(model.reqExpireDate!),
    reqEffectiveDate: new Date(model.reqEffectiveDate!),
    tenderAnnouncementDate: new Date(model.tenderAnnouncementDate!),
    requireOn: new Date(model.requireOn!),
    createUserID: model.createUserID,
    modifyUserID: model.modifyUserID,
    modifyDate: new Date(model.modifyDate!),
  });
};

export const selectBankGaransi: Selector<IStore, BankGaransiModel> = createSelector(
  (state: IStore) => state.bankGaransi.firstData!,
  _selectBankGaransi
);

//Select Extend Attachment
const _selectExtendAttachment = (model: ExtendAttachmentModel): any => {
  return _mappingObjectExtendAttachment(model);
};

const _mappingObjectExtendAttachment = (model: ExtendAttachmentModel): any => {
  return {
    bankGuaranteeNo: model.bankGuaranteeNo,
    createdDate: model.createdDate,
    notes: model.notes,
    extendDate: model.extendDate,
    fileName: model.fileName,
    funnelAttachmentID: model.funnelAttachmentID,
  };
};

export const selectExtendAttachment: Selector<IStore, any> = createSelector(
  (state: IStore) => state.bankGaransi.extendAttachment!,
  _selectExtendAttachment
);

//----------------------------------------------------------------------------------------------

//Max Amount
const _selectMaxAmount = (model: MaxAmountModel): any => {
  return _mappingObjectMaxAmount(model);
};

const _mappingObjectMaxAmount = (model: MaxAmountModel): any => {
  return {
    nilai: model.nilai,
  };
};

export const selectMaxAmount: Selector<IStore, any> = createSelector((state: IStore) => state.bankGaransi.maxAmount!, _selectMaxAmount);

//----------------------------------------------------------------------------------------------

//Check Expired
const _selectCheckExpired = (model: CheckExpireModel): any => {
  return _mappingObjectCheckExpired(model);
};

const _mappingObjectCheckExpired = (model: CheckExpireModel): any => {
  return {
    message: model.message,
  };
};

export const selectCheckExpired: Selector<IStore, any> = createSelector((state: IStore) => state.bankGaransi.expired!, _selectCheckExpired);

//----------------------------------------------------------------------------------------------

//Select Edit Admin
const _selectBGEditAdmin = (model: BankGaransiEditViewAdminModel): IBankGaransiAdminEditRow => {
  return _mappingObjectEditAdmin(model);
};

const _mappingObjectEditAdmin = (model: BankGaransiEditViewAdminModel): IBankGaransiAdminEditRow => {
  return {
    bankGuaranteeGenID: model.bankGuaranteeGenID,
    bankGuaranteeNo: model.bankGuaranteeNo,
    bankGuaranteeID: model.bankGuaranteeID,
    increamentNo: model.increamentNo,
    claimPeriod: model.claimPeriod,
    companyApplicant: model.companyApplicant,
    bankCG: model.bankCG,
    modifyByUser: model.modifyByUser,
    modifiedDate: model.modifiedDate,
    suratPerjanjianNo: model.suratPerjanjianNo,
    submitDate: model.submitDate == undefined ? undefined : new Date(model.submitDate!),
    adminExpireDate: model.adminExpireDate == undefined ? undefined : new Date(model.adminExpireDate!),
    adminEffectiveDate: model.adminEffectiveDate == undefined ? undefined : new Date(model.adminEffectiveDate!),
    publishDate: model.publishDate == undefined ? undefined : new Date(model.publishDate!),
    createDate: new Date(model.createDate!),
    createUserID: model.createUserID,
    modifyUserID: model.modifyUserID,
    modifyDate: new Date(model.modifyDate!),
  };
};

export const selectBGEditAdmin: Selector<IStore, IBankGaransiAdminEditRow> = createSelector(
  (state: IStore) => state.bankGaransi.firstDataAdmin!,
  _selectBGEditAdmin
);

//----------------------------------------------------------------------------------------------

//Select Edit Requester
const _selectBGEditRequester = (model: BankGaransiEditViewRequesterModel): BankGaransiEditViewRequesterModel => {
  return _mappingObjectEditRequester(model);
};

const _mappingObjectEditRequester = (model: BankGaransiEditViewRequesterModel): BankGaransiEditViewRequesterModel => {
  return new BankGaransiEditViewRequesterModel({
    bankGuaranteeGenID: model.bankGuaranteeGenID,
    linkTo: model.linkTo,
    bankGuaranteeNo: model.bankGuaranteeNo,
    bankGuaranteeID: model.bankGuaranteeID,
    bondType: model.bondType,
    letterType: model.letterType,
    letterNo: model.letterNo,
    language: model.language,
    requireOn: new Date(model.requireOn!),
    bondIssuerType: model.bondIssuerType,
    bondIssuer: model.bondIssuer,
    reqExpireDate: new Date(model.reqExpireDate!),
    reqEffectiveDate: new Date(model.reqEffectiveDate!),
    tenderNo: model.tenderNo,
    tenderAnnouncementDate: new Date(model.tenderAnnouncementDate!),
    nilai: model.nilai,
    projectName: model.projectName,
    projectAmount: model.projectAmount,
    status: model.status,
    createDate: new Date(model.createDate!),
    createUserID: model.createUserID,
    createUserdomain: model.createUserdomain,
    modifyUserID: model.modifyUserID,
    modifyDate: new Date(model.modifyDate!),
    cocode: model.cocode,
    process: model.process,
    stepName: model.stepName,
    customerName: model.customerName,
    customerAddress: model.customerAddress,
  });
};

export const selectBGEditRequester: Selector<IStore, BankGaransiEditViewRequesterModel> = createSelector(
  (state: IStore) => state.bankGaransi.requesterData!,
  _selectBGEditRequester
);

//----------------------------------------------------------------------------------------------

//Select Edit Insurance
const _selectInsurance = (model: MasterInsuranceUdcModel): IMasterInsuranceEditRow => {
  return _mappingObjectEditInsurance(model);
};

const _mappingObjectEditInsurance = (model: MasterInsuranceUdcModel): IMasterInsuranceEditRow => {
  return {
    udcid: model.udcid,
    entryKey: model.entryKey,
    text1: model.text1,
    text2: model.text2,
    text3: model.text3,
    text4: model.text4,
    text5: model.text5,
    text6: model.text6,
    text7: model.text7,
    inum1: model.inum1,
  };
};

export const selectInsuranceEdit: Selector<IStore, IMasterInsuranceEditRow> = createSelector(
  (state: IStore) => state.bankGaransi.firstDataInsurance!,
  _selectInsurance
);

//----------------------------------------------------------------------------------------------

const _selectBankRecomended = (model: BankRecommended): BankRecommended => {
  return _mappingObjectBankRecommended(model);
};

const _mappingObjectBankRecommended = (model: BankRecommended): BankRecommended => {
  return new BankRecommended({
    estimationFinish: model.estimationFinish,
    bankInsurance: model.bankInsurance,
  });
};

export const selectBankRecomended: Selector<IStore, BankRecommended> = createSelector(
  (state: IStore) => state.bankGaransi.bankRecomended!,
  _selectBankRecomended
);

const _selectBankEstimated = (model: BankRecommended): BankRecommended => {
  return _mappingObjectBankEstimated(model);
};

const _mappingObjectBankEstimated = (model: BankRecommended): BankRecommended => {
  return new BankRecommended({
    estimationFinish: model.estimationFinish,
  });
};

export const selectBankEstimated: Selector<IStore, BankRecommended> = createSelector(
  (state: IStore) => state.bankGaransi.bankEstimated!,
  _selectBankEstimated
);

//Funnel PO
const _selectFunnelPO = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRowsPO(models.rows),
  };
};

export const selectFunnelPO: Selector<IStore, any> = createSelector((state: IStore) => state.bankGaransi.dataFunnelPO!, _selectFunnelPO);

const _createTableRowsPO = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableRowPO(model));
};

const _mappingObjectTableRowPO = (model: any): any => {
  return {
    po: model.po == '' ? '' : model.po,
    customer: model.customer === '' ? '' : model.customer,
    supplier: model.supplier === '' ? '' : model.supplier,
    bu: model.bu === '' ? '' : model.bu,
    orderDate: model.orderDate === '' ? '' : model.orderDate,
    projectName: model.projectName === '' ? '' : model.projectName,
    projectAmount: model.projectAmount === '' ? '' : model.projectAmount,
  };
};

//Funnel SA
const _selectFunnelSA = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRowsSA(models.rows),
  };
};

export const selectFunnelSA: Selector<IStore, any> = createSelector((state: IStore) => state.bankGaransi.dataFunnelSA!, _selectFunnelSA);

const _createTableRowsSA = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableRowSA(model));
};

const _mappingObjectTableRowSA = (model: any): any => {
  return {
    funnelGenID: model.funnelGenID === null ? '' : model.funnelGenID,
    saNo: model.saNo == '' ? '' : model.saNo,
    so: model.so == '' ? '' : model.so,
    projectName: model.projectName === '' ? '' : model.projectName,
    eventName: model.eventName === '' ? '' : model.eventName,
    customerName: model.customerName === '' ? '' : model.customerName,
    salesName: model.salesName === '' ? '' : model.salesName,
    funnelDate: model.funnelDate === '' ? '' : model.funnelDate,
    saDate: model.saDate === '' ? '' : model.saDate,
    projectAmount: model.projectAmount === undefined ? 0 : model.projectAmount,
    customerAddress: model.customerAddress === null ? '' : model.customerAddress,
    customerGenID: model.customerGenID === '' ? '' : model.customerGenID,
  };
};

//Select Link To Funnel SA
const _selectLinkToFunnelSA = (model: FunnelSALinkToModel): FunnelSALinkToModel => {
  return _mappingObjectLinkToFunnelSA(model);
};

const _mappingObjectLinkToFunnelSA = (model: FunnelSALinkToModel): FunnelSALinkToModel => {
  return new FunnelSALinkToModel({
    funnelGenID: model.funnelGenID,
    customerAddress: model.customerAddress,
    projectAmount: model.projectAmount,
    saNo: model.saNo,
    customerGenID: model.customerGenID,
    projectName: model.projectName,
    customerName: model.customerName,
    salesName: model.salesName,
    funnelDate: model.funnelDate,
    saDate: model.saDate,
    so: model.so,
  });
};

export const selectLinkToFunnelSA: Selector<IStore, FunnelSALinkToModel> = createSelector(
  (state: IStore) => state.bankGaransi.dataLinkTo!,
  _selectLinkToFunnelSA
);

//----------------------------------------------------------------------------------------------

//Customer BG
const _selectCustomerBG = (models: DropdownFunnelSAModel[]): any[] => {
  return models.map((model: DropdownFunnelSAModel): any => ({
    text: model.textData,
    value: model.textData,
  }));
};

export const selectCustomerBG: Selector<IStore, any[]> = createSelector((state: IStore) => state.bankGaransi.customerBG, _selectCustomerBG);
//-----------------------------------------------------------------------

//Creator BG
const _selectCreatorBG = (models: DropdownFunnelSAModel[]): any[] => {
  return models.map((model: DropdownFunnelSAModel): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectCreatorBG: Selector<IStore, any[]> = createSelector((state: IStore) => state.bankGaransi.creatorBG, _selectCreatorBG);
//-----------------------------------------------------------------------

//History BG
const _selectHistory = (models: BankGaransiActivityModel[]): any[] => {
  return models.map((model: BankGaransiActivityModel): any => _mappingObjectHistory(model));
};

const _mappingObjectHistory = (model: BankGaransiActivityModel): any => {
  return {
    funnelActivityID: model.funnelActivityID,
    funnelGenID: model.funnelGenID,
    activityTypeID: model.activityTypeID,
    activityName: model.activityName,
    activityTitle: model.activityTitle,
    activityStartTime: model.activityStartTime,
    activityEndTime: model.activityEndTime,
    descriptions: model.descriptions,
    link: model.link,
    status: model.status,
    displayTime: model.displayTime,
    createDate: model.createDate,
    createUserID: model.createUserID,
    createUsername: model.createUsername,
    photoProfile: model.photoProfile,
    docNumber: model.docNumber,
    assignedTo: model.assignedTo === 'undefined' ? '' : model.assignedTo,
  };
};

export const selectHistory: ParametricSelector<IStore, string[], any[]> = createSelector(
  (state: IStore) => state.bankGaransi.listHistory,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectHistory
);
//-----------------------------------------------------------------------

export const selectObjectFunnelSA: Selector<IStore, any> = createSelector(
  (state: IStore) => state.bankGaransi.funnelSAObject!,
  _mappingObjectTableRowSA
);

const _selectFunnelSAOutside = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    title: model.textData,
    description: model.valueData,
    price: model.valueData,
  }));
};

export const selectFunnelSAOutside: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.bankGaransi.dropdownFunnelSA,
  _selectFunnelSAOutside
);

//Selected PO
export const selectObjectFunnelPO: Selector<IStore, any> = createSelector(
  (state: IStore) => state.bankGaransi.funnelPOObject!,
  _mappingObjectTableRowPO
);

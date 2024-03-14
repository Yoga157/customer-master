import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class PSSFirstLastModel extends BaseModel {
  projectId: number = 0;
  funnelGenId: number = 0;
  pssDocumentId: number = 0;
  versionNumber: number = 0;
  documentHeader: string = '';
  documentInformation: string = '';
  documentControl: string = '';
  distributionList: string = '';
  projectScopeStatement: string = '';
  projectDeliverables: string = '';
  scopeOfWork: string = '';
  projectOrganization: string = '';
  projectTimeline: string = '';
  projectAcceptance: string = '';
  projectExclusion: string = '';
  projectConstraint: string = '';
  assumption: string = '';
  risk: string = '';
  projectApproval: string = '';
  createDate: string = '';
  modifyDate: string = '';
  createUserID: number = 0;
  createUserName: string = '';
  modifyUserID: number = 0;
  modifyUserName: string = '';
  isActive: boolean = false;
    
    constructor(data: Partial<PSSFirstLastModel>) {
      super();
  
      this.update(data);
    }

  }



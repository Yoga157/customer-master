import { BaseModel } from 'sjs-base-model';

export class ActualDuration extends BaseModel {
  month: number = 0;
  day: number = 0;

  constructor(data: Partial<ActualDuration>) {
    super();
    this.update(data);
  }
}

export default class FunnelViewEditCustomerByProjectId extends BaseModel {
  projectId: number = 0;
  funnelGenId: number = 0;
  so: number = 0;
  projectAlias: String = "";
  estStartByPmo: String | Date = undefined;
  estEndByPmo: String | Date = undefined;
  warrantyStart: String | Date = undefined;
  warrantyEnd: String | Date = undefined;
  contractStart: String | Date = undefined;
  contractEnd: String | Date = undefined;
  
  actStartByPmo: String | Date = undefined;
  actEndByPmo: String | Date = undefined;
  thirdPartyName: String = "";
  thirdPartyPicName: String = "";
  thirdPartyPhoneNumber: String = "";
  serviceDescription: String = "";
  serviceLocation: String = "";
  month: number = 0;
  day: number = 0;
  actualDuration = new ActualDuration({});

  modifyDate: String | Date = undefined;
  modifyUserID: number = 0;


  constructor(data: Partial<FunnelViewEditCustomerByProjectId>) {
    super();
    this.update(data);
  }
}

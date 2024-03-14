import { BaseModel } from 'sjs-base-model';

export default class FunnelViewEditConfirmation extends BaseModel {
    funnelConfirmationID: number = 0;
    funnelGenID: number = 0;
    customerReadiness: number = 0;
    customerReadinessRemark: string = "";
    thirdparty: number = 0;
    thirdPartyRemark: string = "";
    supportSystem: number = 0;
    supportSystemRemark: string = "";
    createDate?: Date = undefined;
    createUserID: number = 0;
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;

  constructor(data: Partial<FunnelViewEditConfirmation>) {
    super();
    this.update(data);
  }
}

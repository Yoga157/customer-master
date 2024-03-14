import { BaseModel } from "sjs-base-model";


export class AssignSalesAdminModel extends BaseModel {
  public readonly salesIDFrom: number = 0;
  public readonly salesIDTo: number = 0;
  public readonly createUserID: number = 0;
  public readonly listFunnelID: any[] = [];
  constructor(data: Partial<AssignSalesAdminModel>) {
    super();
    this.update(data);
  }
}
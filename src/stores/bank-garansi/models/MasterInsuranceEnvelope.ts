import { BaseModel } from "sjs-base-model";
import MasterInsuranceModel from "./MasterInsuranceModel";

export default class MasterInsuranceEnvelope extends BaseModel {
  public readonly totalRows:number = 0;
  public readonly rows:MasterInsuranceModel[] = [];

  constructor(data: Partial<MasterInsuranceEnvelope>){
    super();
    this.update(data)
  }
 }

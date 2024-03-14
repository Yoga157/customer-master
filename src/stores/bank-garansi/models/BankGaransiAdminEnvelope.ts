import { BaseModel } from "sjs-base-model";
import BankGaransiAdminModel from "./BankGaransiAdminModel";

export default class BankGaransiAdminEnvelope extends BaseModel {
  public readonly totalRows:number = 0;
  public readonly rows:BankGaransiAdminModel[] = [];

  constructor(data: Partial<BankGaransiAdminEnvelope>){
    super();
    this.update(data)
  }
 }

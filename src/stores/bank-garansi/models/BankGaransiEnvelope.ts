import { BaseModel } from "sjs-base-model";
import BankGaransiModel from "./BankGaransiModel";

export default class BankGaransiEnvelope extends BaseModel {
  public readonly totalRows:number = 0;
  public readonly rows:BankGaransiModel[] = [];

  constructor(data: Partial<BankGaransiEnvelope>){
    super();
    this.update(data)
  }
 }

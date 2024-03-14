import { BaseModel } from "sjs-base-model";
import CustomerMasterRow from "./CustomerMasterRow";

export default class CustomerMasterModel extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: CustomerMasterRow[] = [];

  constructor(data: Partial<CustomerMasterModel>) {
    super();
    this.update(data);
  }
}

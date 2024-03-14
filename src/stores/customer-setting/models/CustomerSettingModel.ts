import { BaseModel } from "sjs-base-model";
import CustomerSettingRow from "./CustomerSettingRow";

export default class CustomerSetting extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: CustomerSettingRow[] = [];

  constructor(data: Partial<CustomerSetting>) {
    super();

    this.update(data);
  }
}

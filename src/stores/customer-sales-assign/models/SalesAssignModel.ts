import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";
import SalesAssignRow from "./SalesAssignRow";

export default class SalesAssign extends BaseModel {
  readonly totalRows: number = 0;
  readonly rows: SalesAssignRow[] = [];

  constructor(data: Partial<SalesAssign>) {
    super();

    this.update(data);
  }
}

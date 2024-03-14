import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";
import CustomerSignatureView from "views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView";

export default class RoleFlagARGroupingModel extends BaseModel {
  isSuperior: boolean = false;
  isEngineer: boolean = false;

  constructor(data: Partial<RoleFlagARGroupingModel>) {
    super();
    this.update(data);
  }
}

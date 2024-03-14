import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";
import CustomerSignatureView from "views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView";

export default class SearchResultModel extends BaseModel {
  activityReportGenID: number = 0;
  ticketId: string = "";
  so: number = 0;
  funnelGenId: number = 0;
  customerName: string = "";
  createDate: string = "";
  contactName: string = "";
  actionTaken: string = "";
  engineerList: string = "";
  startDate: string = "";
  endDate: string = "";
  totalCustomerExperience: string = "";
  customerSignStatus: boolean = false;
  isDraft: boolean = false;
  isDelete: boolean = false;

  constructor(data: Partial<SearchResultModel>) {
    super();
    this.update(data);
  }

  // public update(data: Partial<AWSCredentialModel>): void {
  //   const conversionOptions: IConversionOption = {
  //       awsid: ConversionTypeEnum.String,
  //       accessKey: ConversionTypeEnum.String,
  //       secretKey: ConversionTypeEnum.String,
  //       notes: ConversionTypeEnum.String,
  //       userLoginID: ConversionTypeEnum.Number,
  //       createdBy: ConversionTypeEnum.String,
  //       modifiedBy: ConversionTypeEnum.String,
  //       createUserID: ConversionTypeEnum.Number,
  //       modifyUserID: ConversionTypeEnum.Number
  //   };

  //   super.update(data, conversionOptions);
  // }
}

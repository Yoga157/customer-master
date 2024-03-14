import {
    BaseModel,
    ConversionTypeEnum,
    IConversionOption,
  } from "sjs-base-model";
  import CustomerSignatureView from "views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView";
  
  export default class ActivityReportGroupingModel extends BaseModel {
    activityReportGroupGenId: number = 0;
    uid: string = "";
    activityReportGenIdRelated: string = "";
    activityReportTotalRelated: number = 0;
    customerSignStatus: boolean = false;
    so: string = "";
    customerName: string = "";
    address: string = "";
    contactName: string = "";
    createDate: string = "";
    createUserID: number = 0;
    createUserName: string = "";
  
    constructor(data: Partial<ActivityReportGroupingModel>) {
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
  
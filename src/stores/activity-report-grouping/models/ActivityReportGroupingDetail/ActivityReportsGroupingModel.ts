import {
    BaseModel,
    ConversionTypeEnum,
    IConversionOption,
  } from "sjs-base-model";
  
  export default class ActivityReportsGroupingModel extends BaseModel {
    activityReportGenID: number = 0;
    ticketId: string = "";
    so: number = 0;
    funnelGenId: string = "";
    customerName: string = "";
    engineerList: string = "";
    contactName: string = "";
    actionTaken: string = "";
    customerSignStatus: boolean = false;
    createDate: string = "";
    activityCategory: string = "";
    totalCustomerExperience: string = "";
  
    constructor(data: Partial<ActivityReportsGroupingModel>) {
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
  
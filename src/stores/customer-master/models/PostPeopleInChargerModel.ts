import { BaseModel } from "sjs-base-model";

export default class PostPeopleInChargerModel extends BaseModel {
  customerPICID?: number = 0;
  customerGenID?: number = 0;
  picName: string = "";
  picJobTitle: string = "";
  picEmailAddr: string = "";
  picMobilePhone: string = "";
  createDate?: Date = undefined;
  createdUserID?: number = 0;
  modifyDate?: Date = undefined;
  modifyUserID?: number = 0;

  constructor(data: Partial<PostPeopleInChargerModel>) {
    super();
    this.update(data);
  }
  // public update(data: Partial<PostPeopleInChargerModel>): void {
  //   const conversionOptions: IConversionOption = {
  //     customerPICID: ConversionTypeEnum.Number,
  //     customerGenID: ConversionTypeEnum.Number,
  //     picName: ConversionTypeEnum.String,
  //     picJobTitle: ConversionTypeEnum.String,
  //     picEmailAddr: ConversionTypeEnum.String,
  //     picMobilePhone: ConversionTypeEnum.String,
  //     createUserID: ConversionTypeEnum.Number,
  //     modifyUserID: ConversionTypeEnum.Number,
  //   };
  //   super.update(data, conversionOptions);
  // }
}

import {
    BaseModel,
    ConversionTypeEnum,
    IConversionOption,
  } from "sjs-base-model";

  export default class SalesNameModel extends BaseModel {
    salesName: string = '';
    salesID: number = 0;

    constructor(data: Partial<SalesNameModel>) {
        super();
        this.update(data);
      }
  }
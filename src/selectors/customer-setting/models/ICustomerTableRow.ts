export default interface ICustomerTable {
  readonly customerSettingID: number;
  readonly customerGenID: number;
  readonly customerCategory: string;
  readonly customerName: string;
  readonly customerAddress: string;
  readonly lastProjectName: string;
  readonly name: boolean;
  readonly relatedCustomer: string;
  readonly invoiceCondition: string;
  readonly shareable: boolean;
  readonly pmoCustomer: boolean;
  readonly blacklist: boolean;
  readonly holdshipment: boolean;
  readonly createdBy: string;
  readonly createDate: Date;
  readonly modifiedBy: string;
  readonly modifiedDate?: Date;
}

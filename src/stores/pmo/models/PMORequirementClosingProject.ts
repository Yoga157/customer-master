import { BaseModel } from 'sjs-base-model';


export class PMORequirements extends BaseModel {
      readonly requirementGenId: number;
      readonly title: string;
      readonly statusFullfilled: boolean;
      readonly note: string;

  constructor(data: Partial<PMORequirements>) {
    super();
    this.update(data);
  }
}


export default class PMORequirementClosingProject extends BaseModel {
  readonly isAllowComplete: boolean;
  readonly startContract: string | Date ;
  readonly endContract: string | Date ;
  readonly startWarranty: string | Date ;
  readonly endWarranty: string | Date ;
  readonly actualStartByPmo: string | Date ;
  readonly actualEndByPmo: string | Date ;
  readonly requirements: PMORequirements[]

  constructor(data: Partial<PMORequirementClosingProject>) {
    super();
    this.update(data);
  }
}
 
 
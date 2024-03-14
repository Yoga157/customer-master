
import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export class HistoryRowsModel extends BaseModel {
  public readonly pssDocumentId: number  = 0;
  public readonly versionNumber: number  = 0;
  public readonly documentName: string = '';
  public readonly documentType: string = '';
  public readonly projectName: string = '';
  public readonly customerName: string = '';
  public readonly createUserName: string = '';
  public readonly modifyUserName: string = '';
  public readonly createDate: string = '';
  public readonly createUserID: number  = 0;
  public readonly modifyDate: string = '';
  public readonly modifyUserID: number  = 0;

    constructor(data: Partial<HistoryRowsModel>) {
    super();

    this.update(data);
  }
}

export default class HistoryPSSModels extends BaseModel {
  
  public readonly totalRows: number  = 0;
  public readonly rows: HistoryRowsModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly search: string = '';
  public readonly filter: string = '';

      
  constructor(data: Partial<HistoryPSSModels>) {
    super();

    this.update(data);
  }

}
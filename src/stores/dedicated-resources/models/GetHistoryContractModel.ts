import { BaseModel } from 'sjs-base-model';

export default class GetHistoryContractModel extends BaseModel {
    contractID: number = 0;
    contractNo: number = 0;
    projectName: string = '';
    newContractBeginDate: string = '';
    newContractEndDate: string = '';
}

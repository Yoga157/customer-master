import { BaseModel } from 'sjs-base-model';
import OtherBenefitModel from './OtherBenefitModel';

export default class SaveOtherBenefitModel extends BaseModel {
    public totalRows: 0;
    public column: "";
    public sorting: "";
    public rows: OtherBenefitModel[];

    constructor(data: Partial<SaveOtherBenefitModel>) {
        super();
        this.update(data);
    }
}

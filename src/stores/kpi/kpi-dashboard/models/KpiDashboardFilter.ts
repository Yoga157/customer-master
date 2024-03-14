import { BaseModel } from 'sjs-base-model';

export default class KpiDashboardFilter extends BaseModel {
    year: string = '';
    pic: string = '';
    page: number = 0;
    pageSize: number = 0;
    sorting: string = '';

    constructor(data: Partial<KpiDashboardFilter>)  {
        super();
        this.update(data);
    }
};
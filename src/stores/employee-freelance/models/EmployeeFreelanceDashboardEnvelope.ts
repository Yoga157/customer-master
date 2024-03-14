import { BaseModel } from 'sjs-base-model';
import EmployeeFreelanceDashboardModel from './EmployeeFreelanceDashboardModel';

export default class EmployeeFreelanceDashboardEnvelope extends BaseModel {
    public readonly totalRows: number = 0;
    public readonly rows: EmployeeFreelanceDashboardModel[] = [];
    public readonly column: string = '';
    public readonly sorting: string = '';
    public readonly filter: any = null;
    public readonly search: any = null;
    
    constructor(data: Partial<EmployeeFreelanceDashboardEnvelope>) {
        super();
        this.update(data);
    }
};
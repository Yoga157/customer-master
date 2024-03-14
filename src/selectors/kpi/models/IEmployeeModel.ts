export default interface IEmployeeModel {
    readonly employeeID:number;
    readonly employeeKey:number;
    readonly effDate:string;
    readonly employeeName:string;
    readonly bu:string;
    readonly deptID:string;
    readonly employeeEmail:string;
    readonly role:number;
    readonly superiorID:number;
    readonly deptLeadFlag:number;
    readonly cocode:number;
    readonly isLocked:number;
    readonly kpiList: string;
    // readonly type: string;
  }

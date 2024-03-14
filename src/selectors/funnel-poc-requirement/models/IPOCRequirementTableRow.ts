export default interface IPOCRequirementTableRow {
  readonly pocGenHID: number;
  readonly pocGenReqID: number;
  readonly pocReqType: number;
  readonly requirementType: string;
  readonly sourceType: string;
  readonly itemQty: number;
  readonly itemDescription: string;
  readonly pocReqPICDeptID: string;
  readonly pocReqDeptName: string;
  readonly pocReqPICID: string;
  readonly pocReqPICName: string;
  readonly pocReqPICAssign: string;
  readonly pocReqRemarks: string;
  readonly pocReqStatusID: number;
  readonly createBy: string;
  readonly lastModifyBy: string;
  readonly createDate?: Date | null;
  readonly createUserID: number;
  readonly modifyDate?: Date | null;
  readonly modifyUserID: number;
}


export interface IPMORequirements {
  requirementGenId: number,
  title: string,
  statusFullfilled: boolean
  note: string,
}

export default interface IPMORequirementCloseProject {
  isAllowComplete: boolean,
  startContract: string | Date,
  endContract: string | Date,
  startWarranty: string | Date,
  endWarranty: string | Date,
  actualStartByPmo: string | Date | any,
  actualEndByPmo: string | Date | any,
  requirements: IPMORequirements[],
}

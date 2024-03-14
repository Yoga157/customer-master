import FunnelSATableModel from './FunnelSATableModel'
import FormTypeModel from './FormTypeModel'
import GeneratedTableModel from './GeneratedTableModel'
import FunnelSARowModel from './FunnelSARowModel'

export default interface IGeneratedState {
  readonly dataFunnelSA: FunnelSATableModel
  readonly dataGeneratedForm: GeneratedTableModel[]
  employee: any[],
  error: boolean,
  refreshPage: boolean,
  resultActions: any,
  dataById: any,
  listDirektorat: any[]
  checkData: string,
  listFormType: FormTypeModel[],
  funnelSAObject: FunnelSARowModel,
  projectList: any[]
}



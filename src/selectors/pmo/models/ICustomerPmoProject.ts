export default interface ICustomerPmoProject {
  readonly   funnelGenID: number
  readonly   salesName: string
  readonly   presalesNameList: string
  readonly   customerName: string
  readonly   projectName: string
  readonly   projectAlias: string
  readonly   estStartProjectDate?: string | Date 
  readonly   estEndProjectDate?: string | Date 
}
export default interface IAttachmentTableRow {
    readonly funnelAttachmentID:string;
    readonly funnelGenID:number;
    readonly documentTypeID:number;
    readonly documentType:string;
    readonly documentName:string;
    readonly versionNumber:number;
    readonly status:string;
    readonly uploadTime:string;
    readonly uploadBy:string;
    readonly fileName:string;
    readonly fileDownload:string;
    readonly flagView: string;
    readonly modul: number;
    readonly docNumber:string;
    readonly notes:string;
    readonly topNumber: string;
  }
  
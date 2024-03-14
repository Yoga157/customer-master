export default interface IAttachmentAndAcceptenceTableRow {
    readonly funnelAttachmentID:string;
    readonly funnelGenID:number;
    readonly documentName:string;
    readonly fileName:string;
    readonly fileDownload:string;
    readonly documentTypeID:number;
    readonly documentType:string;
    readonly versionNumber:number;
    readonly uploadTime:string;
    readonly uploadBy:string;
    readonly status:string;
    readonly flagView: string;
    readonly modul: number;
    readonly docNumber: string;
    readonly notes:string;
    readonly topNumber:number;
  }
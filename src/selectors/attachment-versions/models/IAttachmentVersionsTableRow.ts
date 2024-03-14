export default interface IAttachmentTableRow {
    readonly funnelAttachmentID:string;
    readonly funnelGenID:number;
    readonly documentName:string;
    readonly documentType: string;
    readonly documentTypeID:number;
    readonly fileName:string;
    readonly versionNumber:number;
    readonly notes:string;
    readonly uploadTime:string;
    readonly uploadBy:string;
    readonly flagView: string;
    readonly docNumber: string;
    readonly status: string;
}

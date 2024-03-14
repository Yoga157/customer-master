export default interface IAttachmentTableRow {
    readonly funnelAttachmentID: string;
    readonly funnelGenID: number;
    readonly documentTypeID: number;
    readonly documentType: string;
    readonly documentName: string;
    readonly versionNumber: number;
    readonly status: string;
    readonly uploadTime: string;
    readonly uploadBy: string;
    readonly fileName: string;
  }
  
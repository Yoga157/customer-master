import DocumentTypeModel from './DocumentTypeModel';

export default interface IDocumentTypeState {
  readonly data: DocumentTypeModel[];
  readonly invoiceCategory: DocumentTypeModel[];
  readonly error: boolean;
}

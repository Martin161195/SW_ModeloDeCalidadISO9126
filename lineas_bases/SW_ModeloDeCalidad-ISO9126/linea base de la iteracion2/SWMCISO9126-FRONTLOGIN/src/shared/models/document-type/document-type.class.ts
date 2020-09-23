import { IDocument, IDocumentType } from './document-type.interface';

export class DocumentType {
  id: number;
  code: string;
  description: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(obj?: IDocumentType) {
    this.id = obj && obj.id || null;
    this.code = obj && obj.code || null;
    this.description = obj && obj.description || null;
    this.status = obj && obj.status || null;
    this.createdAt = obj && obj.createdAt && new Date(obj.createdAt) || null;
    this.updatedAt = obj && obj.updatedAt && new Date(obj.updatedAt) || null;
  }
}

export class Document extends DocumentType {
  document: string;
  constructor(obj?: IDocument) {
    super(obj);
    this.document = obj && obj.document || null;
  }
}

export interface IDocumentType {
  id: number;
  code: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDocument extends IDocumentType {
  document: string;
}

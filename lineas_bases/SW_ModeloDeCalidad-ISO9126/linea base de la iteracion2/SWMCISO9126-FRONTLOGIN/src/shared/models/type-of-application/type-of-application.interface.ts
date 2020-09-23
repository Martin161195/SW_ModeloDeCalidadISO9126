export interface ITypeOfApplication {
  id: number;
  name: string;
  description: string;
  code: string;
  enabled: number;
  status: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ITypeOfApplicationEditRequest {
  id: number;
  enabled: number;
}

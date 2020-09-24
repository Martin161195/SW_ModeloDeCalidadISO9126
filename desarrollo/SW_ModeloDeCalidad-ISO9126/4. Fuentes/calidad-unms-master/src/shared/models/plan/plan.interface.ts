export interface IPlan {
  code: string;
  name: string;
  isTrial?: number;
  trial?: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPlanUpdateRequest {
  code: string;
  trial: number;
  quantity?: number;
}

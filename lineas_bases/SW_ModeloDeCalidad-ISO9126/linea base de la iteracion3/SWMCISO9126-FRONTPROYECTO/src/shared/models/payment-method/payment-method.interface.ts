export interface IPaymentMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  status: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  localEstablishmentId?: number;
}

export interface IPaymentMethodUpdateRequest {
  paymentMethodId: number;
  localEstablishmentId: number;
  status: number;
}

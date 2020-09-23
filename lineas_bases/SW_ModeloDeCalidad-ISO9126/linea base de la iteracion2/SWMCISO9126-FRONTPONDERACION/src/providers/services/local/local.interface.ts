export interface ILocalCreateOrEditRequest {
  name: string;
  username: string;
  phone: Array<string>;
  description: string;
  address: string;
  status: number;
  visible: number;
  latitude: number;
  longitude: number;
  images: Array<string>;
  userLocalId: number;
}

export interface ILocal extends ILocalCreateOrEditRequest {
  id: number;
  dateRegister: Date;
}

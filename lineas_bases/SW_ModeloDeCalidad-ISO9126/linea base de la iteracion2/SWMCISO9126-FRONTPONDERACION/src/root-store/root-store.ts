import { AppointmentStoreState } from './appointment-store';
import { AuthStoreState } from './auth-store';
import { CategoryStoreState } from './category-store';
import { CurrencyStoreState } from './currency-store';
import { EstablishmentStoreState } from './establishment-store';
import { GeneralStoreState } from './general-store';
import { LocalStoreState } from './local-store';
import { ModuleStoreState } from './module-store';
import { PaymentMethodStoreState } from './payment-method-store';
import { ProductStoreState } from './product-store';
import { PromotionStoreState } from './promotion-store';
import { RoleStoreState } from './role-store';
import { ServiceStoreState } from './service-store';
import { StatusAppointmentStoreState } from './status-appointment-store';
import { TypeOfApplicationStoreState } from './type-of-application-store';
import { UserAppStoreState } from './user-app-store';
import { UserEstablishmentScheduleStoreState } from './user-establishment-schedule-store';
import { UserEstablishmentStoreState } from './user-establishment-store';
import { UserLocalStoreState } from './user-local-store';
import { VoucherStoreState } from './voucher-store';

// tslint:disable-next-line: interface-name
export interface State {
  appointment: AppointmentStoreState.State;
  auth: AuthStoreState.State;
  category: CategoryStoreState.State;
  currency: CurrencyStoreState.State;
  establishment: EstablishmentStoreState.State;
  general: GeneralStoreState.State;
  local: LocalStoreState.State;
  module: ModuleStoreState.State;
  paymentMethod: PaymentMethodStoreState.State;
  product: ProductStoreState.State;
  promotion: PromotionStoreState.State;
  role: RoleStoreState.State;
  service: ServiceStoreState.State;
  statusAppointment: StatusAppointmentStoreState.State;
  typeOfApplication: TypeOfApplicationStoreState.State;
  userApp: UserAppStoreState.State;
  userEstablishment: UserEstablishmentStoreState.State;
  userEstablishmentSchedule: UserEstablishmentScheduleStoreState.State;
  userLocal: UserLocalStoreState.State;
  voucher: VoucherStoreState.State;
}

import { Inject, Injectable } from '@angular/core';
import { ApiService, IOptionsRequest, OptionsRequestBefore } from '@core/api/api.service';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { HistoryEndpoint } from '@providers/endpoints/history.endpoint';
import { LocalEstablishmentEndpoint } from '@providers/endpoints/local-establishment.endpoint';
import { URL_APP } from '@settings/config/config';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { IAppointment } from '@shared/models/appointment/appointment.interface';
import { Category } from '@shared/models/category/category.class';
import { ICategory, ICategoryUpdateRequest } from '@shared/models/category/category.interface';
import { Currency } from '@shared/models/currency/currency.class';
import { ICurrency, ICurrencyUpdateRequest } from '@shared/models/currency/currency.interface';
import { LocalEstablishment, LocalEstablishmentResponse } from '@shared/models/local-establishment/local-establishment.class';
import {
  IEstablishmentStatusEditRequest,
  ILocalEstablishment,
  ILocalEstablishmentCreateRequest,
  ILocalEstablishmentInformationForm,
  ILocalEstablishmentResponse
} from '@shared/models/local-establishment/local-establishment.interface';
import { PaymentMethod } from '@shared/models/payment-method/payment-method.class';
import { IPaymentMethod, IPaymentMethodUpdateRequest } from '@shared/models/payment-method/payment-method.interface';
import { Promotion, PromotionWithPagination } from '@shared/models/promotion/promotion.class';
import { IPromotion, IPromotionCreate, IPromotionWithPagination } from '@shared/models/promotion/promotion.interface';
import { Service, ServiceWithPagination } from '@shared/models/service/service.class';
import { IService, IServiceCreateRequestOrEdit, IServiceWithPagination } from '@shared/models/service/service.interface';
import { StatusAppointment } from '@shared/models/status-appointment/status-appointment.class';
import { IStatusAppointment, IStatusAppointmentUpdateRequest } from '@shared/models/status-appointment/status-appointment.interface';
import { UserApp, UserAppWithPagination } from '@shared/models/user-app/user-app.class';
import { IUserApp, IUserAppCreateRequestOrEdit, IUserAppointmentHistoryPagination, IUserAppWithPagination } from '@shared/models/user-app/user-app.interface';
import { UserEstablishmentSchedule } from '@shared/models/user-establishment-schedule/user-establishment-schedule.class';
import {
  IUserEstablishmentSchedule,
  IUserEstablishmentScheduleCreateRequestOrEdit
} from '@shared/models/user-establishment-schedule/user-establishment-schedule.interface';
import { UserEstablishment, UserEstablishmentWithPagination } from '@shared/models/user-establishment/user-establishment.class';
import {
  IUserEstablishment,
  IUserEstablishmentAddRequest,
  IUserEstablishmentCreateRequestOrEdit,
  IUserEstablishmentWithPagination
} from '@shared/models/user-establishment/user-establishment.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { IVMDeleteInterface } from '@shared/models/vmdelete/vm-delete.interface';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalEstablishmentService {
  constructor(
    private readonly http: ApiService,
    @Inject(URL_APP) private readonly apiUrl: string
  ) { }

  create(obj: ILocalEstablishmentCreateRequest): Observable<LocalEstablishment> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.create}`;
    const opts: IOptionsRequest = { withCredentials: true };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: ILocalEstablishment) => new LocalEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

  createPromotion(localEstablishmentId: number, obj: IPromotionCreate): Observable<Promotion> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.createPromotion}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IPromotion) => new Promotion(res)),
        catchError(this.http.handleError)
      );
  }

  createService(localEstablishmentId: number, obj: IServiceCreateRequestOrEdit): Observable<Service> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.createService}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IService) => new Service(res)),
        catchError(this.http.handleError)
      );
  }

  createUserApp(localEstablishmentId: number, obj: IUserAppCreateRequestOrEdit): Observable<UserApp> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.createUserApp}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IUserApp) => new UserApp(res)),
        catchError(this.http.handleError)
      );
  }

  createUserEstablishment(localEstablishmentId: number, obj: IUserEstablishmentCreateRequestOrEdit): Observable<UserEstablishment> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.createUserEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IUserEstablishment) => new UserEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

  addUserApp(localEstablishmentId: number, userAppId: number): Observable<UserApp> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.addUserApp}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userAppId
      }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), {})
      .pipe(
        map((res: IUserApp) => new UserApp(res)),
        catchError(this.http.handleError)
      );
  }

  deleteUserApp(localEstablishmentId: number, userAppId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.deleteUserApp}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userAppId
      }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  // tslint:disable-next-line: max-line-length
  addUserEstablishment(localEstablishmentId: number, userEstablishmentId: number, obj: IUserEstablishmentAddRequest): Observable<UserEstablishment> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.addUserEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userEstablishmentId
      }
    };

    return this.http.post(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IUserEstablishment) => new UserEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

  deleteUserEstablishment(localEstablishmentId: number, userEstablishmentId: number): Observable<VMDelete> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.deleteUserEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userEstablishmentId
      }
    };

    return this.http.delete(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IVMDeleteInterface) => new VMDelete(res)),
        catchError(this.http.handleError)
      );
  }

  getCategories(localEstablishmentId: number): Observable<Array<Category>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getCategories}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<ICategory>) => res.map((obj: ICategory) => new Category(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getCurrencies(localEstablishmentId: number): Observable<Array<Currency>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getCurrencies}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<ICurrency>) => res.map((obj: ICurrency) => new Currency(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getCurrencyBase(localEstablishmentId: number): Observable<Currency> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getCurrencyBase}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: ICurrency) => new Currency(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getInformation(localEstablishmentId: number): Observable<LocalEstablishmentResponse> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getInformation}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: ILocalEstablishmentResponse) => new LocalEstablishmentResponse(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getPaymentMethods(localEstablishmentId: number): Observable<Array<PaymentMethod>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getPaymentMethods}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IPaymentMethod>) => res.map((obj: IPaymentMethod) => new PaymentMethod(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getPromotions(localEstablishmentId: number, params?: IPagination): Observable<PromotionWithPagination> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getPromotions}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };
    if (!!params) { opts.params = { ...opts.params, ...params }; }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IPromotionWithPagination) => new PromotionWithPagination(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getPromotionsByCode(localEstablishmentId: number, code: string): Observable<Array<Promotion>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getPromotionsByCode}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        code
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IPromotion>) => res.map((obj: IPromotion) => new Promotion(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getServices(localEstablishmentId: number, params?: IPagination): Observable<ServiceWithPagination> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getServices}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };
    if (!!params) { opts.params = { ...opts.params, ...params }; }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IServiceWithPagination) => new ServiceWithPagination(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getStatusAppointments(localEstablishmentId: number): Observable<Array<StatusAppointment>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getStatusAppointments}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IStatusAppointment>) => res.map((obj: IStatusAppointment) => new StatusAppointment(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getUsersApp(localEstablishmentId: number, params?: IPagination): Observable<UserAppWithPagination> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getUsersApp}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };
    if (!!params) { opts.params = { ...opts.params, ...params }; }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserAppWithPagination) => new UserAppWithPagination(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getUserAppByEmail(localEstablishmentId: number, email: string): Observable<UserApp> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getUserAppByEmail}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        email
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserApp) => new UserApp(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getUsersAppByEmail(localEstablishmentId: number, email: string): Observable<Array<UserApp>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getUsersAppByEmail}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        email
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IUserApp>) => res.map((obj: IUserApp) => new UserApp(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getUsersAppByEmailOrNames(localEstablishmentId: number, search: string): Observable<Array<UserApp>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getUsersAppByEmailOrNames}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        search
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IUserApp>) => res.map((obj: IUserApp) => new UserApp(obj))),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getUsersEstablishment(localEstablishmentId: number, params?: IPagination): Observable<UserEstablishmentWithPagination> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getUsersEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };
    if (!!params) { opts.params = { ...opts.params, ...params }; }

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserEstablishmentWithPagination) => new UserEstablishmentWithPagination(res)),
        retry(3),
        catchError(this.http.handleError)
      );
  }

  getUserEstablishment(localEstablishmentId: number, userEstablishmentId: number): Observable<UserEstablishment> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getUserEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userEstablishmentId
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserEstablishment) => new UserEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

  // tslint:disable-next-line: max-line-length
  getSchedulesUserEstablishment(localEstablishmentId: number, userEstablishmentId: number, min: string, max: string): Observable<Array<UserEstablishmentSchedule>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.getSchedulesUserEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userEstablishmentId,
        min,
        max
      }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: Array<IUserEstablishmentSchedule>) => res.map((obj: IUserEstablishmentSchedule) => new UserEstablishmentSchedule(obj))),
        catchError(this.http.handleError)
      );
  }

  getAppointmentHistory(userWorkerId: number, localEstablishmentId: number): Observable<Array<Appointment>> {
    const query = `${this.apiUrl}${HistoryEndpoint.appointmentPersonal}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { userWorkerId, localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserAppointmentHistoryPagination) => res.history.map((a: IAppointment) => new Appointment(a))),
        catchError(this.http.handleError)
      );
  }

  getAppointmentHistoryService(serviceId: number, localEstablishmentId: number): Observable<Array<Appointment>> {
    const query = `${this.apiUrl}${HistoryEndpoint.appointmentService}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { serviceId, localEstablishmentId }
    };

    return this.http.get(query, new OptionsRequestBefore(opts))
      .pipe(
        map((res: IUserAppointmentHistoryPagination) => res.history.map((a: IAppointment) => new Appointment(a))),
        catchError(this.http.handleError)
      );
  }

  updateCategories(localEstablishmentId: number, categories: Array<ICategoryUpdateRequest>): Observable<Array<Category>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateCategories}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), categories)
      .pipe(
        map((res: Array<ICategory>) => res.map((obj: ICategory) => new Category(obj))),
        catchError(this.http.handleError)
      );
  }

  updateCurrencies(localEstablishmentId: number, currencies: Array<ICurrencyUpdateRequest>): Observable<Array<Currency>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateCurrencies}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), currencies)
      .pipe(
        map((res: Array<ICurrency>) => res.map((obj: ICurrency) => new Currency(obj))),
        catchError(this.http.handleError)
      );
  }

  updateCurrencyBase(localEstablishmentId: number, currencyId: number): Observable<Currency> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateCurrencyBase}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        currencyId
      }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), {})
      .pipe(
        map((res: ICurrency) => new Currency(res)),
        catchError(this.http.handleError)
      );
  }

  updateEstablishment(localEstablishmentId: number, data: ILocalEstablishmentInformationForm): Observable<LocalEstablishment> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateEstablishmentInformation}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId
      }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), data)
      .pipe(
        map((res: ILocalEstablishment) => new LocalEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

  updateEstablishmentStatus(localEstablishmentId: number, data: IEstablishmentStatusEditRequest): Observable<LocalEstablishmentResponse> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateEstablishmentStatus}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId
      }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), data)
      .pipe(
        map((res: ILocalEstablishmentResponse) => new LocalEstablishmentResponse(res)),
        catchError(this.http.handleError)
      );
  }

  updatePaymentMethods(localEstablishmentId: number, paymentmethods: Array<IPaymentMethodUpdateRequest>): Observable<Array<PaymentMethod>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updatePaymentMethods}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), paymentmethods)
      .pipe(
        map((res: Array<IPaymentMethod>) => res.map((obj: IPaymentMethod) => new PaymentMethod(obj))),
        catchError(this.http.handleError)
      );
  }

  // tslint:disable-next-line:max-line-length
  updateScheduleUserEstablishment(localEstablishmentId: number, userEstablishmentId: number, userEstablishmentScheduleId: number, obj: IUserEstablishmentScheduleCreateRequestOrEdit): Observable<UserEstablishmentSchedule> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateScheduleUserEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userEstablishmentId,
        userEstablishmentScheduleId
      }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IUserEstablishmentSchedule) => new UserEstablishmentSchedule(res)),
        catchError(this.http.handleError)
      );
  }

  // tslint:disable-next-line: max-line-length
  updateStatusAppointments(localEstablishmentId: number, statusAppointments: Array<IStatusAppointmentUpdateRequest>): Observable<Array<StatusAppointment>> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateStatusAppointments}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: { localEstablishmentId }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), statusAppointments)
      .pipe(
        map((res: Array<IStatusAppointment>) => res.map((obj: IStatusAppointment) => new StatusAppointment(obj))),
        catchError(this.http.handleError)
      );
  }

  // tslint:disable-next-line: max-line-length
  updateUserApp(localEstablishmentId: number, userAppId: number, obj: IUserAppCreateRequestOrEdit): Observable<UserApp> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateUserApp}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userAppId
      }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IUserApp) => new UserApp(res)),
        catchError(this.http.handleError)
      );
  }

  // tslint:disable-next-line: max-line-length
  updateUserEstablishment(localEstablishmentId: number, userEstablishmentId: number, obj: IUserEstablishmentCreateRequestOrEdit): Observable<UserEstablishment> {
    const query = `${this.apiUrl}${LocalEstablishmentEndpoint.updateUserEstablishment}`;
    const opts: IOptionsRequest = {
      withCredentials: true,
      params: {
        localEstablishmentId,
        userEstablishmentId
      }
    };

    return this.http.put(query, new OptionsRequestBefore(opts), obj)
      .pipe(
        map((res: IUserEstablishment) => new UserEstablishment(res)),
        catchError(this.http.handleError)
      );
  }

}

import { Injectable } from '@angular/core';
import { _chunck, _sort } from '@core/common/helpers-array';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { CategoryService } from '@providers/services/category/category.service';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { ServiceService } from '@providers/services/service/service.service';
import { Appointment } from '@shared/models/appointment/appointment.class';
import { Category } from '@shared/models/category/category.class';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { Service, ServiceWithPagination } from '@shared/models/service/service.class';
import { IServiceCreateRequestOrEdit } from '@shared/models/service/service.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as ServiceStoreActions from './actions';
import {
  selectServiceForDelete,
  selectServiceForEdit,
  selectServicesAll
} from './selectors';

@Injectable()
export class ServiceStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceLocalEstablishment: LocalEstablishmentService,
    private readonly serviceService: ServiceService,
    private readonly serviceCategory: CategoryService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getServicesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServices),
      map((action: { query: IPagination }) => action.query),
      switchMap((query: IPagination) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [query, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, establishment]: [IPagination, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getServices(establishment.id, query)
          .pipe(
            map((value: ServiceWithPagination) => ServiceStoreActions.getServicesSuccess({ services: value })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  getServicesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesSuccess)
    ), { dispatch: false });

  getServicesOffEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesOff),
      map((action: { query: IPagination }) => action.query),
      switchMap((query: IPagination) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectServicesAll)),
              (initial, servicesAll) => {
                return [query, servicesAll];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, servicesAll]: [IPagination, Array<Service>]) => {
        let services = [];
        let servicesBuff = _sort(servicesAll, query.order);
        servicesBuff = _chunck(servicesBuff, query.limit);
        if (servicesBuff.length >= query.page && query.page > 0) {
          services = servicesBuff[query.page - 1];
        }

        return of([...services])
          .pipe(
            map((value: Array<Service>) => ServiceStoreActions.getServicesOffSuccess({
              services: {
                data: value,
                page: query.page,
                perPage: query.limit,
                totalRecords: servicesAll.length
              }
            })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  getServicesOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesOffSuccess)
    ), { dispatch: false });

  getServicesAllEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesAll),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([establishment]: [LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getServices(establishment.id)
          .pipe(
            map((value: ServiceWithPagination) => ServiceStoreActions.getServicesAllSuccess({ services: value })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  getServicesAllSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesAllSuccess)
    ), { dispatch: false });

  getServicesAllOffEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesAllOff),
      map((action: { query: IPagination }) => action.query),
      switchMap((query: IPagination) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [query, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, establishment]: [IPagination, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.getServices(establishment.id)
          .pipe(
            map((value: ServiceWithPagination) => ServiceStoreActions.getServicesAllOffSuccess({
              services: {
                ...value,
                page: query.page,
                perPage: query.limit
              }
            })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  getServicesAllOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesAllOffSuccess)
    ), { dispatch: false });

  getServicesAllClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServicesAllClear)
    ), { dispatch: false });

  getServiceAppointmentHistoryEffect$ = createEffect(() => this.actions$
  .pipe(
    ofType(ServiceStoreActions.getServiceAppointmentHistory),
    map((action: { service: Service }) => action.service),
    switchMap((service: Service) => {
      return of([])
        .pipe(
          withLatestFrom(
            this.store$.pipe(select(selectEstablishment)),
            (initial, establishment) => {
              return [service, establishment];
            }
          ),
          take(1)
        );
    }),
    switchMap(([service, establishment]: [Service, LocalEstablishment]) => {
      return this.serviceLocalEstablishment.getAppointmentHistoryService(service.id, establishment.id)
        .pipe(
          map((value: Array<Appointment>) => ServiceStoreActions.getServiceAppointmentHistorySuccess({ history: value })),
          catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
        );
    })
  ));

  getServiceAppointmentHistorySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getServiceAppointmentHistorySuccess)
    ), { dispatch: false });

  createServiceEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.createService),
      map((action: { newService: IServiceCreateRequestOrEdit }) => action.newService),
      switchMap((query: IServiceCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectEstablishment)),
              (initial, establishment) => {
                return [query, establishment];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, establishment]: [IServiceCreateRequestOrEdit, LocalEstablishment]) => {
        return this.serviceLocalEstablishment.createService(establishment.id, query)
          .pipe(
            map((value: Service) => ServiceStoreActions.createServiceSuccess({ service: value })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  createServiceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.createServiceSuccess),
      switchMap(() => of(ServiceStoreActions.serviceSuccess({ data: new VMSuccess({ message: 'SFRON_SERV_001' }) })))
    ));

  deleteServiceEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.deleteService),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectServiceForDelete)),
              (initial, service) => {
                return [service];
              }
            ),
            take(1)
          );
      }),
      switchMap(([service]: [Service]) => {
        return this.serviceService.delete(service.id)
          .pipe(
            map((value: VMDelete) => ServiceStoreActions.deleteServiceSuccess({ data: value })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  deleteServiceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.deleteServiceSuccess),
      switchMap(() => of(ServiceStoreActions.serviceSuccess({ data: new VMSuccess({ message: 'SFRON_SERV_003' }) })))
    ));

  updateServiceEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.updateService),
      map((action: { newService: IServiceCreateRequestOrEdit }) => action.newService),
      switchMap((query: IServiceCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectServiceForEdit)),
              (initial, service) => {
                return [query, service];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, service]: [IServiceCreateRequestOrEdit, Service]) => {
        return this.serviceService.update(service.id, query)
          .pipe(
            map((value: Service) => ServiceStoreActions.updateServiceSuccess({ service: value })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  updateServiceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.updateServiceSuccess),
      switchMap(() => of(ServiceStoreActions.serviceSuccess({ data: new VMSuccess({ message: 'SFRON_SERV_002' }) })))
    ));

  getCategoriesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getCategories),
      switchMap(() => {
        return this.serviceCategory.get()
          .pipe(
            map((value: Array<Category>) => ServiceStoreActions.getCategoriesSuccess({ categories: value })),
            catchError((error: VMError) => of(ServiceStoreActions.serviceFailure({ data: error })))
          );
      })
    ));

  getCategoriesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.getCategoriesSuccess)
    ), { dispatch: false });

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.modalEditClose)
    ), { dispatch: false });

  modalHistoryOpenEffect$ = createEffect(() => this.actions$
  .pipe(
    ofType(ServiceStoreActions.modalHistoryOpen)
  ), { dispatch: false });

  modalHistoryCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.modalHistoryClose)
    ), { dispatch: false });

  serviceFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.serviceFailure),
      switchMap(() => of(ServiceStoreActions.errorToNull()))
    ));

  serviceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.serviceSuccess),
      switchMap(() => of(ServiceStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.successToNull)
    ), { dispatch: false });

  clearServiceEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ServiceStoreActions.clearService)
    ), { dispatch: false });

}

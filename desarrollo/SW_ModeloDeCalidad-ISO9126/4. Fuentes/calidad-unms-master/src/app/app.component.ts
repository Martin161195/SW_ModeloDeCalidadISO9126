import { Component, OnDestroy, OnInit } from '@angular/core';
import { VMToastService } from '@core/lib/components/popus/toast/vm-toast.service';
import { select, Store } from '@ngrx/store';
import { VMErrors } from '@settings/constants/messages/errors';
import { VMSuccess } from '@settings/constants/messages/success';
import { selectError as selectErrorAppointment, selectSuccess as selectSuccessAppointment } from '@store/appointment-store/selectors';
import { selectAuthError, selectAuthSuccess } from '@store/auth-store/selectors';
import { selectError as selectErrorCategory, selectSuccess as selectSuccessCategory } from '@store/category-store/selectors';
import { selectError as selectErrorCurrency, selectSuccess as selectSuccessCurrency } from '@store/currency-store/selectors';
import { selectEstablishmentError, selectEstablishmentSuccess } from '@store/establishment-store/selectors';
import { selectError as selectErrorGeneral, selectSuccess as selectSuccessGeneral } from '@store/general-store/selectors';
import { RootStoreState } from '@store/index';
import { selectError as selectErrorLocal, selectSuccess as selectSuccessLocal } from '@store/local-store/selectors';
// tslint:disable-next-line: max-line-length
import { selectError as selectErrorPaymentMethod, selectSuccess as selectSuccessPaymentMethod } from '@store/payment-method-store/selectors';
import { selectProductError, selectProductSuccess } from '@store/product-store/selectors';
import { selectError as selectErrorPromotion, selectSuccess as selectSuccessPromotion } from '@store/promotion-store/selectors';
import { selectError as selectErrorRole, selectSuccess as selectSuccessRole } from '@store/role-store/selectors';
import { selectServiceError, selectServiceSuccess } from '@store/service-store/selectors';
import { selectError as selectErrorStatusAppointment, selectSuccess as selectSuccessStatusAppointment } from '@store/status-appointment-store/selectors';
import { selectError as selectErrorUserApp, selectSuccess as selectSuccessUserApp } from '@store/user-app-store/selectors';
import {
  selectError as selectErrorUserEstablishmentSchedule,
  selectSuccess as selectSuccessUserEstablishmentSchedule
} from '@store/user-establishment-schedule-store/selectors';
import { selectUserEstablishmentError, selectUserEstablishmentSuccess } from '@store/user-establishment-store/selectors';
import { selectError as selectErrorUserLocal, selectSuccess as selectSuccessUserLocal } from '@store/user-local-store/selectors';
import {
  selectError as selectErrorVoucher,
  selectSuccess as selectSuccessVoucher
} from '@store/voucher-store/selectors';
import { merge, Observable, Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  error$: Observable<string>;
  errorSub: Subscription;
  success$: Observable<string>;
  successSub: Subscription;

  constructor(
    private readonly store$: Store<RootStoreState.State>,
    private readonly toastService: VMToastService
  ) { }

  ngOnInit(): void {

    this.errorSub = merge(
      this.store$.pipe(select(selectErrorAppointment)),
      this.store$.pipe(select(selectAuthError)),
      this.store$.pipe(select(selectErrorCategory)),
      this.store$.pipe(select(selectErrorCurrency)),
      this.store$.pipe(select(selectEstablishmentError)),
      this.store$.pipe(select(selectErrorGeneral)),
      this.store$.pipe(select(selectErrorLocal)),
      this.store$.pipe(select(selectErrorPaymentMethod)),
      this.store$.pipe(select(selectProductError)),
      this.store$.pipe(select(selectErrorPromotion)),
      this.store$.pipe(select(selectErrorRole)),
      this.store$.pipe(select(selectServiceError)),
      this.store$.pipe(select(selectErrorStatusAppointment)),
      this.store$.pipe(select(selectErrorUserApp)),
      this.store$.pipe(select(selectErrorVoucher)),
      this.store$.pipe(select(selectUserEstablishmentError)),
      this.store$.pipe(select(selectErrorUserEstablishmentSchedule)),
      this.store$.pipe(select(selectErrorUserLocal))
    )
      .pipe(filter((text: string | null) => !!text))
      .subscribe((text: string) => {
        const timer$: Subscription = timer(0)
          .subscribe(() => {
            this.toastService.open({
              type: 'danger',
              text: VMErrors[text].es
            });
            timer$.unsubscribe();
          });
      });
    this.successSub = merge(
      this.store$.pipe(select(selectSuccessAppointment)),
      this.store$.pipe(select(selectAuthSuccess)),
      this.store$.pipe(select(selectSuccessCategory)),
      this.store$.pipe(select(selectSuccessCurrency)),
      this.store$.pipe(select(selectEstablishmentSuccess)),
      this.store$.pipe(select(selectSuccessGeneral)),
      this.store$.pipe(select(selectSuccessLocal)),
      this.store$.pipe(select(selectSuccessPaymentMethod)),
      this.store$.pipe(select(selectProductSuccess)),
      this.store$.pipe(select(selectSuccessPromotion)),
      this.store$.pipe(select(selectSuccessRole)),
      this.store$.pipe(select(selectServiceSuccess)),
      this.store$.pipe(select(selectSuccessStatusAppointment)),
      this.store$.pipe(select(selectSuccessUserApp)),
      this.store$.pipe(select(selectUserEstablishmentSuccess)),
      this.store$.pipe(select(selectSuccessUserEstablishmentSchedule)),
      this.store$.pipe(select(selectSuccessUserLocal)),
      this.store$.pipe(select(selectSuccessVoucher))
    )
      .pipe(filter((text: string | null) => !!text))
      .subscribe((text: string) => {
        const timer$: Subscription = timer(0)
          .subscribe(() => {
            this.toastService.open({
              type: 'success',
              text: VMSuccess[text].es
            });
            timer$.unsubscribe();
          });
      });
  }

  ngOnDestroy(): void {
    if (!!this.errorSub) { this.errorSub.unsubscribe(); }
    if (!!this.successSub) { this.successSub.unsubscribe(); }
  }

}

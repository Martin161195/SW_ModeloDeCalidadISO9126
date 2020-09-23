import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TidioService } from '@providers/services/tidio/tidio.service';
import { ResizeService } from '@shared/helpers/events/resize.service';
import { Plan } from '@shared/models/plan/plan.class';
import { UserLocal } from '@shared/models/user-local/user-local.class';
import { VMAlert } from '@shared/models/vmalert/vm-alert.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import {
  modalCreateOpen as openModalCreateAppointment
} from '@store/appointment-store/actions';
import { logout } from '@store/auth-store/actions';
import { selectAuthSuccess, selectAuthUser } from '@store/auth-store/selectors';
import {
  openModalCreate as openModalCreateEstablishment,
  openModalSelect as openModalSelectEstablishment
} from '@store/establishment-store/actions';
import {
  openAlertPlan,
  sidebarDesktopClose as sidebarDesktopCloseGeneral,
  sidebarDesktopOpen as sidebarDesktopOpenGeneral
} from '@store/general-store/actions';
import { RootStoreState } from '@store/index';
import { selectPlan } from '@store/local-store/selectors';
import { modalCreateOpen } from '@store/user-app-store/actions';
import {
  modalCreateOpen as openModalCreateVoucher
} from '@store/voucher-store/actions';
import { Observable, of, Subscription } from 'rxjs';
import { filter, switchMap, take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html'
})

export class HeaderAdminComponent implements OnInit, OnDestroy {
  @HostBinding('class') clases = 'g-navbar';
  subResize: Subscription;
  open: boolean;

  plan$: Observable<Plan>;
  user$: Observable<UserLocal>;
  subPlan: Subscription;
  subTidio: Subscription;
  subLogoutMessage: Subscription;
  constructor(
    private readonly store$: Store<RootStoreState.State>,
    private readonly tidioService: TidioService,
    private readonly resizeService: ResizeService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.plan$ = this.store$.pipe(select(selectPlan));
    this.user$ = this.store$.pipe(select(selectAuthUser));

    this.subPlan = this.store$
      .pipe(
        select(selectPlan),
        filter((plan: Plan | null) => !!plan),
        switchMap((plan: Plan) => {
          return of([])
            .pipe(
              withLatestFrom(
                this.store$.pipe(select(selectAuthUser)),
                (initial, user) => {
                  return [plan, user];
                }
              ),
              take(1)
            );
        })
      )
      .subscribe(([plan, user]: [Plan, UserLocal]) => {
        if (plan.code === 'DIAMOND' || plan.code === 'ELITE') {
          if (!!user) {

            this.subTidio = this.tidioService
              .load()
              .subscribe(() => { });
            this.tidioService.register();

            this.tidioService.setTidioIdentify({
              distinct_id: user.id.toString(),
              email: user.email,
              city: 'Lima',
              country: 'Peru',
              name: user.fullName
            });
          }
        } else {

        }
      });

    // Este subscriber es para el logout
    // Talvez en un futuro, este subscribe choque con algun otro que mande mensaje positivo
    // entonces se tendria que crear un estado solo para el logout, pero por ahora no hay error
    this.subLogoutMessage = this.store$
      .pipe(
        select(selectAuthSuccess),
        filter((text: string) => !!text)
      )
      .subscribe(() => {
        void this.router.navigate(['/auth/login']);
      });

    this.subResize = this.resizeService
      .getEvent()
      .subscribe((width: number) => {
        if ((width < 769)) {
          this.open = false;
          this.store$.dispatch(sidebarDesktopCloseGeneral());
        } else {
          this.open = true;
          this.store$.dispatch(sidebarDesktopOpenGeneral());
        }
      });
  }

  toggle(): void {
    if (this.open) {
      this.open = false;
      this.store$.dispatch(sidebarDesktopCloseGeneral());
    } else {
      this.open = true;
      this.store$.dispatch(sidebarDesktopOpenGeneral());
    }
  }

  createAppointment(): void {
    this.store$.dispatch(openModalCreateAppointment());
  }

  createEstablishment(): void {
    this.store$.dispatch(openModalCreateEstablishment());
  }

  createCustomer(): void {
    this.store$.dispatch(modalCreateOpen());
  }

  createVoucher(): void {
    this.store$.dispatch(openModalCreateVoucher());
  }

  openChatTidio(): void {
    this.tidioService.display(true);
    this.tidioService.open();
  }

  openAlert(trial: number): void {
    const data: VMAlert = {
      icon: ['fa', 'medal'],
      title: 'Plan Platinium',
      description: trial === 1
        ? `Pruebalo por
          <strong class="g-href__default">1 mes</strong>
          y eleva tu negocio al siguiente
          <strong class="g-href__default">NIVEL</strong>.
          <br>
          Obtendras mejor
          <strong>GESTION</strong> de tu negocio, más
          <strong>VENTAS</strong> y más
          <strong>CLIENTES</strong>
          <br><br>
          ¿Desea probar el plan Platinium por 1 mes gratis?`
        : `Eleva tu negocio al siguiente
          <strong class="g-href__default">NIVEL</strong>.
          <br>
          Obtendras mejor
          <strong>GESTION</strong> de tu negocio, más
          <strong>VENTAS</strong> y más
          <strong>CLIENTES</strong>`,
      textCancelButton: 'Por ahora no',
      textSuccessButton: 'Estoy de acuerdo',
      data: {
        code: 'PLATINIUM',
        trial,
        quantity: trial === 1 ? 1 : null
      }
    };

    this.store$.dispatch(openAlertPlan({ data }));
  }

  changeEstablishment(): void {
    this.store$.dispatch(openModalSelectEstablishment());
  }

  ngOnDestroy(): void {
    if (!!this.subResize) { this.subResize.unsubscribe(); }
    if (!!this.subTidio) { this.subTidio.unsubscribe(); }
    if (!!this.subLogoutMessage) { this.subLogoutMessage.unsubscribe(); }
  }

  logout(): void {
    this.store$.dispatch(logout({ data: new VMSuccess({ message: 'SAUTHL_001' }) }));
  }

}

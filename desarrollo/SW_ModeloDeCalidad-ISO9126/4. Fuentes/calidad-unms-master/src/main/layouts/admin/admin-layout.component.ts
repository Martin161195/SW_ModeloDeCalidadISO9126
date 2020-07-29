import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SimpleBarDirective } from '@core/lib/directives/simplebar/simplebar.directive';
import { select, Store } from '@ngrx/store';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { VMAlert } from '@shared/models/vmalert/vm-alert.class';
import {
  selectModalCreate as selectModalCreateAppointment
} from '@store/appointment-store/selectors';
import { getEstablishments, openModalCreate, openModalSelect, setEstablishment } from '@store/establishment-store/actions';
import {
  selectEstablishments as selectEstablishmentsEstablishment,
  selectModalCreate as selectModalCreateEstablishment,
  selectModalSelect as selectModalSelectEstablishment
} from '@store/establishment-store/selectors';
import { getDocumentTypes, getPlanes } from '@store/general-store/actions';
import {
  selectAlertPlan,
  selectSidebarDesktop as selectSidebarDesktopGeneral
} from '@store/general-store/selectors';
import { RootStoreState } from '@store/index';
import {
  selectModalCreate as selectModalCreateUserApp
} from '@store/user-app-store/selectors';
import {
  selectModalCreate as selectModalCreateVoucher
} from '@store/voucher-store/selectors';
import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('simplebar', { static: false }) simplebar: SimpleBarDirective;
  open: boolean;
  alertPlan$: Observable<VMAlert | null>;
  modalCreate$: Observable<boolean>;
  modalCreateAppointment$: Observable<boolean>;
  modalCreateVoucher$: Observable<boolean>;
  modalCreateCustomer$: Observable<boolean>;
  modalSelect$: Observable<boolean>;
  sidebarDesktop$: Observable<boolean>;
  subModal: Subscription;
  subUser: Subscription;
  constructor(
    private readonly store$: Store<RootStoreState.State>
  ) {
    this.open = true;
  }

  ngAfterViewInit(): void {
    this.simplebar.init();
  }

  ngOnInit(): void {
    // Modules en resolver y plan en el guard
    this.sidebarDesktop$ = this.store$.pipe(select(selectSidebarDesktopGeneral));
    this.modalCreate$ = this.store$.pipe(select(selectModalCreateEstablishment));
    this.modalCreateAppointment$ = this.store$.pipe(select(selectModalCreateAppointment));
    this.modalCreateVoucher$ = this.store$.pipe(select(selectModalCreateVoucher));
    this.modalCreateCustomer$ = this.store$.pipe(select(selectModalCreateUserApp));
    this.modalSelect$ = this.store$.pipe(select(selectModalSelectEstablishment));

  }

  eventSidebar($event: boolean): void {
    this.open = $event;
  }

  ngOnDestroy(): void {
    if (!!this.subModal) { this.subModal.unsubscribe(); }
  }

}

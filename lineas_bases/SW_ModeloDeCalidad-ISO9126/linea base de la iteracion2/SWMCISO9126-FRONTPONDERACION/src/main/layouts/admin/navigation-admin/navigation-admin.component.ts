import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { VMBreadcrumbService } from '@core/lib/components/navigation/breadcrumb/service/vm-breadcrumb.service';
import { IBreadcrumb } from '@core/lib/components/navigation/breadcrumb/vm-breadcrumb.shared';
import { select, Store } from '@ngrx/store';
import { IMenuSidebar } from '@shared/common/interfaces/menu-sidebar.interface';
import { ResizeService } from '@shared/helpers/events/resize.service';
import { selectIsLoadingGetEstablishmentCategories } from '@store/category-store/selectors';
import { selectIsLoadingGetEstablishmentCurrencies, selectIsLoadingGetEstablishmentCurrencyBase } from '@store/currency-store/selectors';
import { selectIsLoadingGetEstablishments } from '@store/establishment-store/selectors';
import { selectIsLoadingGetDocumentTypes, selectIsLoadingGetPlanes, selectMenuSidebar } from '@store/general-store/selectors';
import { RootStoreState } from '@store/index';
import { selectIsLoadingGetPlan } from '@store/local-store/selectors';
import { selectIsLoadingGetModules, selectIsLoadingGetModulesEnabled } from '@store/module-store/selectors';
import { selectIsLoadingGetEstablishmentPaymentMethods } from '@store/payment-method-store/selectors';
import { selectProductIsLoadingGetProductsAll } from '@store/product-store/selectors';
import { selectIsLoadingGetPromotionsAll } from '@store/promotion-store/selectors';
import { selectServiceIsLoadingGetServicesAll } from '@store/service-store/selectors';
import { selectIsLoadingGetEstablishmentStatusAppointments } from '@store/status-appointment-store/selectors';
import { selectIsLoadingGetUsersEstablishmentAll } from '@store/user-establishment-store/selectors';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation-admin-component',
  templateUrl: './navigation-admin.component.html'
})
export class NavigationAdminComponent implements OnInit, OnDestroy {
  /**
   * Clase principal del navigation Admin
   */
  @HostBinding('class')
  get navigationClass(): string {
    return 'g-main__content--navigation';
  }

  crumbs: Array<IBreadcrumb>;
  subCrumbs: Subscription;
  items: Array<IMenuSidebar> | null;
  subMenuSidebar: Subscription;

  isAsync: boolean;
  query: IPagination;
  isRefresh$: Observable<boolean>;
  constructor(
    private readonly breadcrumbService: VMBreadcrumbService,
    private readonly store$: Store<RootStoreState.State>,
    private readonly resizeService: ResizeService
  ) {
    this.crumbs = [];
    this.query = { limit: 10, order: '', page: 1 };
    this.isAsync = false;
  }

  ngOnInit(): void {
    this.subCrumbs = this.breadcrumbService.crumbs$
      .subscribe((crumbs: Array<IBreadcrumb>) => {
        let newCrumbs = [];
        if (crumbs.length > 1) {
          for (let i = 0; i < crumbs.length; i++) {
            newCrumbs = (i !== crumbs.length - 1)
              ? newCrumbs.concat([crumbs[i], { text: '/', path: '' }])
              : newCrumbs.concat(crumbs[i]);
          }
        } else {
          newCrumbs = crumbs;
        }
        this.crumbs = newCrumbs;
      });

    this.subMenuSidebar = this.store$
      .pipe(select(selectMenuSidebar))
      .subscribe((res: Array<IMenuSidebar> | null) => {
        // tslint:disable-next-line: prefer-conditional-expression
        if (Array.isArray(res) && res.length) {
          this.items = [...res];
        } else {
          this.items = null;
        }
      });

    this.isRefresh$ = combineLatest([
      this.store$.pipe(select(selectIsLoadingGetPlanes)),
      this.store$.pipe(select(selectIsLoadingGetPlan)),
      this.store$.pipe(select(selectIsLoadingGetDocumentTypes)),
      this.store$.pipe(select(selectIsLoadingGetModules)),
      this.store$.pipe(select(selectIsLoadingGetEstablishments)),
      this.store$.pipe(select(selectIsLoadingGetModulesEnabled)),
      this.store$.pipe(select(selectIsLoadingGetEstablishmentCategories)),
      this.store$.pipe(select(selectIsLoadingGetEstablishmentCurrencies)),
      this.store$.pipe(select(selectIsLoadingGetEstablishmentCurrencyBase)),
      this.store$.pipe(select(selectIsLoadingGetEstablishmentPaymentMethods)),
      this.store$.pipe(select(selectIsLoadingGetEstablishmentStatusAppointments)),
      this.store$.pipe(select(selectServiceIsLoadingGetServicesAll)),
      this.store$.pipe(select(selectProductIsLoadingGetProductsAll)),
      this.store$.pipe(select(selectIsLoadingGetPromotionsAll)),
      this.store$.pipe(select(selectIsLoadingGetUsersEstablishmentAll))
    ])
      // tslint:disable-next-line: max-line-length
      .pipe(map(([v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13]) => v1 || v2 || v3 || v4 || v5 || v6 || v7 || v8 || v9 || v10 || v11 || v12 || v13));
  }

  refresh(): void {
    /* this.store$.dispatch(clickButtonRefreshInit());
    if (!this.isAsync) {
      this.store$.dispatch(getPlanes());
      this.store$.dispatch(getPlan());
      this.store$.dispatch(getDocumentTypes());
      this.store$.dispatch(getModules());
      this.store$.dispatch(getEstablishments());

      this.store$.dispatch(getModulesEnabled());
      this.store$.dispatch(getEstablishmentCategories());
      this.store$.dispatch(getEstablishmentCurrencies());
      this.store$.dispatch(getEstablishmentCurrencyBase());
      this.store$.dispatch(getEstablishmentPaymentMethods());
      this.store$.dispatch(getEstablishmentStatusAppointments());

      this.store$.dispatch(getServicesAllOff({ query: { ...this.query } }));
      this.store$.dispatch(getProductsAllOff({ query: { ...this.query } }));
      this.store$.dispatch(getPromotionsAllOff({ query: { ...this.query } }));
      this.store$.dispatch(getUsersEstablishmentAllOff({ query: { ...this.query } }));
    } */
  }

  back(): void {
    this.resizeService.getNativeWindow().history
      .back();
  }

  ngOnDestroy(): void {
    if (!!this.subCrumbs) { this.subCrumbs.unsubscribe(); }
    if (!!this.subMenuSidebar) { this.subMenuSidebar.unsubscribe(); }
  }

  trackByFn(index: any, item: any): any {
    return index;
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICanComponentDeactivate } from '@providers/guards/deactivate.guard';
import { IMenuSidebar } from '@shared/common/interfaces/menu-sidebar.interface';
import { menuSidebarDestroy, menuSidebarInit } from '@store/general-store/actions';
import { RootStoreState } from '@store/index';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-configuration-information-component',
  template: '<router-outlet></router-outlet>'
})
export class ConfigurationInformationComponent implements ICanComponentDeactivate, OnDestroy, OnInit {
  items: Array<IMenuSidebar>;

  subClickButtonRefresh: Subscription;
  subEstablishment: Subscription;
  constructor(
    private readonly store$: Store<RootStoreState.State>
  ) {
    this.items = [
      /* {
        name: 'Caracteristicas',
        path: '/group-1/feature'
      }, */
      {
        name: 'Subcaracteristicas',
        path: '/group-1/sub-feature'
      },
      {
        name: 'Metricas',
        path: '/group-1/metric'
      }
    ];
  }

  ngOnInit(): void {
    this.store$.dispatch(menuSidebarInit({ items: this.items }));
  }

  canDeactivate(): Observable<boolean> | boolean {
    this.store$.dispatch(menuSidebarDestroy());

    return true;
  }

  ngOnDestroy(): void { }

}

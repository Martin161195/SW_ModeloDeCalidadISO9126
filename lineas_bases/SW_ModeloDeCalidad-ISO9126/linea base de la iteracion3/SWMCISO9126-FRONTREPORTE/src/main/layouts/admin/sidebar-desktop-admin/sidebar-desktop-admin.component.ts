import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { SimpleBarDirective } from '@core/lib/directives/simplebar/simplebar.directive';
import { Store } from '@ngrx/store';
import { MENU_ITEMS } from '@settings/constants/menu-items';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { openModalSelect } from '@store/establishment-store/actions';
import { RootStoreState } from '@store/index';
import { Observable } from 'rxjs';
import { SidebarAnimations } from './sidebar.animations';

@Component({
  selector: 'app-sidebar-desktop-admin',
  templateUrl: './sidebar-desktop-admin.component.html',
  animations: [
    SidebarAnimations.sidebarAnimation,
    SidebarAnimations.sidebarItemAnimation
  ]
})

export class SidebarDesktopAdminComponent implements AfterViewInit, OnDestroy, OnInit {
  @HostBinding('class') clases = 'g-main__sidebar';
  @ViewChild('identity', { static: false }) identity: ElementRef;
  @ViewChild('sidebar', { static: false }) sidebar: ElementRef;
  @ViewChild('simplebar', { static: false }) simplebar: SimpleBarDirective;

  @HostBinding('@sidebarAnimation')
  get owlDTContainerAnimation(): any {
    return 'in';
  }

  newMenus: Array<any> = [];
  establishment$: Observable<LocalEstablishment>;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer2: Renderer2,
    private readonly store$: Store<RootStoreState.State>,
    private readonly router: Router
  ) { }

  ngAfterViewInit(): void {
    this.simplebar.init();
    const timeout = setTimeout(() => {
      const height: number = this.el.nativeElement.getBoundingClientRect().height;
      const heightIdentity: number = this.identity.nativeElement.getBoundingClientRect().height;
      this.renderer2.setStyle(this.sidebar.nativeElement, 'height', `${height - heightIdentity}px`);
      clearTimeout(timeout);
    }, 100);
  }

  ngOnInit(): void {
    const href = this.router.url;
    this.newMenus = MENU_ITEMS.map((obj: any) => {
      const newObj = { ...obj, state: 'closed' };
      if (obj.items.length > 0) {
        for (const item of obj.items) {
          if (item.router === href) {
            newObj.state = 'open';
            break;
          }
        }
      }

      return newObj;
    });
  }

  openModal(): void {
    this.store$.dispatch(openModalSelect());
  }

  toggle(index: number): void {
    for (let j = 0; j < this.newMenus.length; j++) {
      if (j === index) {
        if (this.newMenus[index].items.length > 0) {
          if (this.newMenus[index].state === 'closed') {
            this.newMenus[index].state = 'open';
          } else if (this.newMenus[index].state === 'open') {
            this.newMenus[index].state = 'closed';
          }
        }
      } else {
        this.newMenus[j].state = 'closed';
      }
    }
  }

  trackByFn(index: any, item: any): number {
    return item;
  }

  ngOnDestroy(): void { }

}

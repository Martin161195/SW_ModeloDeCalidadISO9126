import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Module } from '@shared/models/module/module.class';
import { RootStoreState } from '@store/index';
import { getModules } from '@store/module-store/actions';
import { selectModules } from '@store/module-store/selectors';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminResolveGuard implements Resolve<boolean> {

  constructor(
    private readonly store$: Store<RootStoreState.State>
  ) { }

  resolve(): Observable<any> | Promise<any> | any {

    this.store$.dispatch(getModules());

    const modules$: Observable<Array<Module>> = this.store$.
      pipe(
        select(selectModules),
        filter((modules: null | Array<Module>) => Array.isArray(modules)),
        first()
      );

    return forkJoin([modules$])
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(true))
      );
  }
}

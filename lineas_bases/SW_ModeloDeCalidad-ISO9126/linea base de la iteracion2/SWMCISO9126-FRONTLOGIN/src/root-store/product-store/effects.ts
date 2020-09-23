import { Injectable } from '@angular/core';
import { _chunck, _sort } from '@core/common/helpers-array';
import { IPagination } from '@core/lib/components/data/pagination/pagination.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { CategoryService } from '@providers/services/category/category.service';
import { ProductService } from '@providers/services/product/product.service';
import { Category } from '@shared/models/category/category.class';
import { LocalEstablishment } from '@shared/models/local-establishment/local-establishment.class';
import { Product, ProductWithPagination } from '@shared/models/product/product.class';
import { IProductCreateRequestOrEdit, IProductVoucher } from '@shared/models/product/product.interface';
import { VMDelete } from '@shared/models/vmdelete/vm-delete.class';
import { VMError } from '@shared/models/vmerror/vm-error.class';
import { VMSuccess } from '@shared/models/vmsuccess/vm-success.class';
import { selectEstablishment } from '@store/establishment-store/selectors';
import { RootStoreState } from '@store/index';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import * as ProductStoreActions from './actions';
import {
  selectProductForDelete,
  selectProductForEdit,
  selectProductsAll
} from './selectors';

@Injectable()
export class ProductStoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly serviceProduct: ProductService,
    private readonly serviceCategory: CategoryService,
    private readonly store$: Store<RootStoreState.State>
  ) { }

  getProductsEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProducts),
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
        return this.serviceProduct.getByEstablishment(establishment.id, query)
          .pipe(
            map((value: ProductWithPagination) => ProductStoreActions.getProductsSuccess({ products: value })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  getProductsSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsSuccess)
    ), { dispatch: false });

  getProductsOffEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsOff),
      map((action: { query: IPagination }) => action.query),
      switchMap((query: IPagination) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectProductsAll)),
              (initial, productsAll) => {
                return [query, productsAll];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, productsAll]: [IPagination, Array<Product>]) => {
        let products = [];
        let productsBuff = _sort(productsAll, query.order);
        productsBuff = _chunck(productsBuff, query.limit);
        if (productsBuff.length >= query.page && query.page > 0) {
          products = productsBuff[query.page - 1];
        }

        return of([...products])
          .pipe(
            map((value: Array<Product>) => ProductStoreActions.getProductsOffSuccess({
              products: {
                data: value,
                page: query.page,
                perPage: query.limit,
                totalRecords: productsAll.length
              }
            })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  getProductsOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsOffSuccess)
    ), { dispatch: false });

  getProductsAllEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsAll),
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
        return this.serviceProduct.getByEstablishment(establishment.id)
          .pipe(
            map((value: ProductWithPagination) => ProductStoreActions.getProductsAllSuccess({ products: value })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  getProductsAllSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsAllSuccess)
    ), { dispatch: false });

  getProductsAllOffEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsAllOff),
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
        return this.serviceProduct.getByEstablishment(establishment.id)
          .pipe(
            map((value: ProductWithPagination) => ProductStoreActions.getProductsAllOffSuccess({
              products: {
                ...value,
                page: query.page,
                perPage: query.limit
              }
            })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  getProductsAllOffSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsAllSuccess)
    ), { dispatch: false });

  getProductsAllClearEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductsAllClear)
    ), { dispatch: false });

  getProductHistoryEffect$ = createEffect(() => this.actions$
  .pipe(
    ofType(ProductStoreActions.getProductHistory),
    map((action: { product: Product }) => action.product),
    switchMap((product: Product) => {
      return of([])
        .pipe(
          withLatestFrom(
            this.store$.pipe(select(selectEstablishment)),
            (initial, establishment) => {
              return [product, establishment];
            }
          ),
          take(1)
        );
    }),
    switchMap(([product, establishment]: [Product, LocalEstablishment]) => {
      return this.serviceProduct.getProductHistory(product.id, establishment.id)
        .pipe(
          map((value: Array<IProductVoucher>) => ProductStoreActions.getProductHistorySuccess({ history: value })),
          catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
        );
    })
  ));

  getProductHistorySuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getProductHistorySuccess)
    ), { dispatch: false });

  createProductEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.createProduct),
      map((action: { newProduct: IProductCreateRequestOrEdit }) => action.newProduct),
      switchMap((query: IProductCreateRequestOrEdit) => {
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
      switchMap(([query, establishment]: [IProductCreateRequestOrEdit, LocalEstablishment]) => {
        return this.serviceProduct.createByEstablishment(establishment.id, query)
          .pipe(
            map((value: Product) => ProductStoreActions.createProductSuccess({ product: value })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  createProductSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.createProductSuccess),
      switchMap(() => of(ProductStoreActions.productSuccess({ data: new VMSuccess({ message: 'SFRON_PROD_001' }) })))
    ));

  deleteProductEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.deleteProduct),
      switchMap(() => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectProductForDelete)),
              (initial, product) => {
                return [product];
              }
            ),
            take(1)
          );
      }),
      switchMap(([product]: [Product]) => {
        return this.serviceProduct.delete(product.id)
          .pipe(
            map((value: VMDelete) => ProductStoreActions.deleteProductSuccess({ data: value })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  deleteProductSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.deleteProductSuccess),
      switchMap(() => of(ProductStoreActions.productSuccess({ data: new VMSuccess({ message: 'SFRON_PROD_003' }) })))
    ));

  updateProductEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.updateProduct),
      map((action: { newProduct: IProductCreateRequestOrEdit }) => action.newProduct),
      switchMap((query: IProductCreateRequestOrEdit) => {
        return of([])
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(selectProductForEdit)),
              (initial, service) => {
                return [query, service];
              }
            ),
            take(1)
          );
      }),
      switchMap(([query, service]: [IProductCreateRequestOrEdit, Product]) => {
        return this.serviceProduct.update(service.id, query)
          .pipe(
            map((value: Product) => ProductStoreActions.updateProductSuccess({ product: value })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  updateProductSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.updateProductSuccess),
      switchMap(() => of(ProductStoreActions.productSuccess({ data: new VMSuccess({ message: 'SFRON_PROD_002' }) })))
    ));

  getCategoriesEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getCategories),
      switchMap(() => {
        return this.serviceCategory.get()
          .pipe(
            map((value: Array<Category>) => ProductStoreActions.getCategoriesSuccess({ categories: value })),
            catchError((error: VMError) => of(ProductStoreActions.productFailure({ data: error })))
          );
      })
    ));

  getCategoriesSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.getCategoriesSuccess)
    ), { dispatch: false });

  modalCreateOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.modalCreateOpen)
    ), { dispatch: false });

  modalCreateCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.modalCreateClose)
    ), { dispatch: false });

  modalDetailOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.modalDetailOpen)
    ), { dispatch: false });

  modalDetailCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.modalDetailClose)
    ), { dispatch: false });

  modalEditOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.modalEditOpen)
    ), { dispatch: false });

  modalEditCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.modalEditClose)
    ), { dispatch: false });

  modalHistoryOpenEffect$ = createEffect(() => this.actions$
  .pipe(
    ofType(ProductStoreActions.modalHistoryOpen)
  ), { dispatch: false });

  modalHistoryCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.modalHistoryClose)
    ), { dispatch: false });
  alertDeleteOpenEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.alertDeleteOpen)
    ), { dispatch: false });

  alertDeleteCloseEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.alertDeleteClose)
    ), { dispatch: false });

  serviceFaillureEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.productFailure),
      switchMap(() => of(ProductStoreActions.errorToNull()))
    ));

  serviceSuccessEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.productSuccess),
      switchMap(() => of(ProductStoreActions.successToNull()))
    ));

  errorToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.errorToNull)
    ), { dispatch: false });

  successToNullEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.successToNull)
    ), { dispatch: false });

  clearProductEffect$ = createEffect(() => this.actions$
    .pipe(
      ofType(ProductStoreActions.clearProduct)
    ), { dispatch: false });

}

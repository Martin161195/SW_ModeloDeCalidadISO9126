import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import { coerceBooleanProp } from '@core/common/helpers';
import { _deepCopy, _getArrayIM } from '@core/common/helpers-array';
import { SimpleBarDirective } from '@core/lib/directives/simplebar/simplebar.directive';
import { select, Store } from '@ngrx/store';
import { ResizeService } from '@shared/helpers/events/resize.service';
import { selectSidebarDesktop } from '@store/general-store/selectors';
import { RootStoreState } from '@store/index';
import { merge, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, skip, tap } from 'rxjs/operators';
import { ITableCol } from './table-col.interface';
import { VMTableWrapperDirective } from './vm-table-content.directive';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-table',
  templateUrl: './vm-table.component.html'
})
export class VMTableComponent implements OnDestroy, OnInit {
  // Helpers
  minWidth = 140;
  widthTable: number;
  widthForActions: number;
  // Esto solo es para el responsive, o cuando el contenido es mas grande que el ancho de la table
  // Si es lo contrario, osea el contenido si ingresa el ancho del tbbody debe ser auto
  widthTableBody: number;
  // Si el contenido que se mostrara puede estar en la tabla
  isContentForTable: boolean;
  // @ViewChild(SimpleBarDirective, { static: false }) scrollBar: SimpleBarDirective;
  @ViewChild('sp1', { static: false }) sp1: SimpleBarDirective;
  @ViewChild('sp2', { static: false }) sp2: SimpleBarDirective;
  @Output() readonly eChangedSort: EventEmitter<string>;
  @Output() readonly eventClickCalendar: EventEmitter<any>;
  @Output() readonly eventClickDetail: EventEmitter<any>;
  @Output() readonly eventClickDelete: EventEmitter<any>;
  @Output() readonly eventClickHistory: EventEmitter<any>;
  @Output() readonly eventClickEdit: EventEmitter<any>;

  /**
   * @description
   * Action Calendar emabled
   */
  private _withActionCalendar = false;
  @Input()
  get withActionCalendar(): boolean {
    return this._withActionCalendar;
  }
  set withActionCalendar(value: boolean) {
    this._withActionCalendar = coerceBooleanProp(value);
  }

  /**
   * @description
   * Action Detail emabled
   */
  private _withActionDetail = false;
  @Input()
  get withActionDetail(): boolean {
    return this._withActionDetail;
  }
  set withActionDetail(value: boolean) {
    this._withActionDetail = coerceBooleanProp(value);
  }

  /**
   * @description
   * Action Edit emabled
   */
  private _withActionEdit = true;
  @Input()
  get withActionEdit(): boolean {
    return this._withActionEdit;
  }
  set withActionEdit(value: boolean) {
    this._withActionEdit = coerceBooleanProp(value);
  }

  /**
   * @description
   * Action Delete emabled
   */
  private _withActionDelete = true;
  @Input()
  get withActionDelete(): boolean {
    return this._withActionDelete;
  }
  set withActionDelete(value: boolean) {
    this._withActionDelete = coerceBooleanProp(value);
  }

  /**
   * @description
   * Action History emabled
   */
  private _withActionHistory = false;
  @Input()
  get withActionHistory(): boolean {
    return this._withActionHistory;
  }
  set withActionHistory(value: boolean) {
    this._withActionHistory = coerceBooleanProp(value);
  }

  /**
   * @description
   * Actions enabled
   */
  private _withActions = true;
  @Input()
  get withActions(): boolean {
    return this._withActions;
  }
  set withActions(value: boolean) {
    this._withActions = coerceBooleanProp(value);
    // Se coloca en un timeout porque no se subscriobe en el OnInit
    // Cuando se cambia de data muy rapido
    // tslint:disable-next-line: no-shadowed-variable
    const timeout = setTimeout(() => {
      if (this.data.length > 0) {
        this.general$.next();
      }
      clearTimeout(timeout);
    }, 0);
  }

  /**
   * @description
   * Loader div
   */
  private _loading = false;
  @Input()
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = coerceBooleanProp(value);
    if (this._loading && this.sp1) {
      this.sp1.goToTop();
    }
  }

  /**
   * @description
   * Son los datos a mostrar devueltos por el backend
   */
  private _data = [];
  @Input()
  get data(): Array<any> {
    return this._data;
  }
  set data(value: Array<any>) {
    if (value !== null) {

      const _data = Array.isArray(value) ? value : [];

      this._data = _data.map((obj: any) => {
        const newObj = _deepCopy(obj);
        for (const property of Object.keys(obj)) {
          if (typeof obj[property] === 'object'
            && !Array.isArray(obj[property])
            && !(obj[property] instanceof Date)
            && obj[property]
          ) {
            for (const propertyChild of Object.keys(obj[property])) {
              if (obj[property][propertyChild] !== null && obj[property][propertyChild] !== undefined) {
                newObj[`${property}.${propertyChild}`] = obj[property][propertyChild];
              }
            }
          }
        }

        return newObj;
      });
      // Se coloca en un timeout porque no se subscriobe en el OnInit
      // Cuando se cambia de data muy rapido
      // tslint:disable-next-line: no-shadowed-variable
      const timeout = setTimeout(() => {
        this.general$.next();
        clearTimeout(timeout);
      }, 0);
    }
  }

  /**
   * @description
   * Columnas a mostrar en la tabla
   */
  private _cols = [];
  @Input()
  get cols(): Array<ITableCol> {
    return this._cols;
  }
  set cols(value: Array<ITableCol>) {
    this._cols = Array.isArray(value) ? value : [];
  }

  /**
   * @description
   * Revisa si el button es outline
   */
  private _btnTheme = 'default';
  @Input()
  get btnTheme(): string {
    return this._btnTheme;
  }
  set btnTheme(value: string) {
    this._btnTheme = value || 'default';
  }

  get btnThemeClass(): string {
    let theme: string;
    switch (this.btnTheme) {
      case 'danger':
        theme = 'g-datatable--danger';
        break;
      default:
        theme = 'g-datatable--default';
        break;
    }

    return `g-datatable ${theme}`;
  }

  general$: Subject<void>;
  widthSub: Subscription;
  generalSub: Subscription;
  buffCols: Array<ITableCol>;
  loadEvent: boolean;
  constructor(
    private readonly el: ElementRef,
    private readonly resizeService: ResizeService,
    private readonly store$: Store<RootStoreState.State>,
    @Host() @Optional() private readonly wrapper: VMTableWrapperDirective
  ) {
    this.eChangedSort = new EventEmitter<string>();
    this.eventClickCalendar = new EventEmitter<any>();
    this.eventClickDelete = new EventEmitter<any>();
    this.eventClickDetail = new EventEmitter<any>();
    this.eventClickHistory = new EventEmitter<any>();
    this.eventClickEdit = new EventEmitter<any>();
    this.buffCols = [];
    this.loadEvent = true;
    this.general$ = new Subject<void>();
  }

  ngOnInit(): void {
    const resize$ = this.resizeService.getEvent()
      .pipe(skip(1));
    const sidebar$ = this.store$.pipe(select(selectSidebarDesktop))
      .pipe(skip(1));
    this.widthSub =
      merge(resize$, sidebar$)
        .pipe(
          tap(() => { this.loadEvent = true; }),
          debounceTime(250),
          delay(600)
        )
        .subscribe(() => {
          this.parseCols();
          this.loadEvent = false;
        });

    this.generalSub = this.general$
      .pipe(debounceTime(250))
      .subscribe(() => {
        this.loadEvent = false;
        this.parseCols();
      });
  }

  parseCols(): void {
    if (!!this.el.nativeElement) {
      this.widthTable = this.wrapper.getWidth();
      const data = [...this.data];
      let originCols = [];
      if (data.length > 0) {
        const obj = { ...data[0] };
        for (const property of Object.keys(obj)) {
          if (obj.hasOwnProperty(property)) {
            originCols = originCols.concat([property]);
          }
        }
      }
      // width average
      const cols: Array<ITableCol> = _getArrayIM(this.cols);
      let buffCols = [];
      for (const col of cols) {
        if (originCols.indexOf(col.data.key) !== -1) {
          buffCols = buffCols.concat(col);
        }
      }

      // Get width Header, es la suma de todos los anchols mas el minwidth
      // solo se setea cuando el contenido es mas grande que el ancho de la tabla
      // Se verifica si se agrega el ancho para withActionCalendar, ya que este esta por defecto en falso
      let widthForActions = this.withActionCalendar ? this.minWidth + 30 : this.minWidth;
      widthForActions = this.withActionHistory ? widthForActions + 30 : widthForActions;
      // Verify widthActions
      if (!this.withActions) { widthForActions = 0; }
      let widthTableBody = widthForActions;
      // Get width from host
      const width = this.widthTable - widthForActions;

      // Vemos si el ancho de la tabla podra contener a todos los campos que se muestra con el minimo ancho
      this.isContentForTable = (width > (buffCols.length * this.minWidth));
      const beforeCols: Array<ITableCol> = _getArrayIM(this.buffCols);
      buffCols = buffCols.map((obj: ITableCol) => {
        if (this.isContentForTable) {
          const widthCol = (width * obj.width) / 100;
          obj.width = (widthCol < this.minWidth) ? this.minWidth : widthCol;
          widthTableBody += obj.width;
        } else {
          obj.width = this.minWidth;
          widthTableBody += this.minWidth;
        }
        for (const beforeCol of beforeCols) {
          if (beforeCol.data.key === obj.data.key) {
            if (beforeCol.sort) {
              obj.sort = beforeCol.sort;
            }
            break;
          }
        }

        return { ...obj };
      });
      this.widthForActions = widthForActions;
      this.widthTableBody = widthTableBody;
      this.buffCols = _getArrayIM(buffCols);
      // Handle simplebars in table
      const timeInterval = setInterval(() => {
        if (this.sp1) { this.sp1.init(); }
        if (this.sp2) { this.sp2.init(); }
        if (this.sp1 && this.sp2) { clearInterval(timeInterval); }
      }, 100);
    }
  }

  sortBy(key: string, sort: any): void {
    if (sort) {
      let order: 'ASC' | 'DESC';
      let buffCols = _getArrayIM(this.buffCols);
      buffCols = buffCols.map((obj: ITableCol) => {
        if (obj.data.key === key) {
          obj.sort.order = (obj.sort && obj.sort.order === 'ASC') ? 'DESC' : 'ASC';
          order = obj.sort.order;
        } else {
          if (obj.sort) {
            if (obj.sort.order) { delete obj.sort.order; }
          }
        }

        return obj;
      });
      this.buffCols = _getArrayIM(buffCols);
      this.eChangedSort.emit(`${sort.key} ${order}`);
    }
  }

  clickCalendar(value: any): void {
    this.eventClickCalendar.emit(value);
  }

  clickDetail(value: any): void {
    this.eventClickDetail.emit(value);
  }

  clickEdit(value: any): void {
    this.eventClickEdit.emit(value);
  }

  clickDelete(value: any): void {
    this.eventClickDelete.emit(value);
  }

  clickHistory(value: any): void {
    this.eventClickHistory.emit(value);
  }

  ngOnDestroy(): void {
    if (!!this.widthSub) { this.widthSub.unsubscribe(); }
  }

  trackByFn(index, item): any {
    return index;
  }

}

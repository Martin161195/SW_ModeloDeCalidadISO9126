import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { coerceBooleanProp } from '@core/common/helpers';
import { _chunck } from '@core/common/helpers-array';
import { SelectListItem } from '@core/lib/components/form/vm-form-select/vm-form-select.component';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-pagination',
  templateUrl: './vm-pagination.component.html'
})
export class VMPaginationComponent implements OnInit, OnDestroy {
  @Output() readonly eChangedPage: EventEmitter<number>;
  @Output() readonly eChangedSizeData: EventEmitter<number>;
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
  }

  /**
   * @description
   * Es el número total de datos que se muestra en la tabla
   */
  private _totalData = 0;
  @Input()
  get totalData(): number {
    return this._totalData;
  }
  set totalData(value: number) {
    const newValue = typeof value === 'number' ? value : 0;
    if (newValue > 0 && this._totalData !== newValue) {
      this._totalData = newValue;
      this.getPages(newValue, this.itemsPerPage, this.currentPage);
    }
  }

  /**
   * @description
   * Es el número de datos que se muestran
   */
  private _itemsPerPage = 10;
  @Input()
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }
  set itemsPerPage(value: number) {
    const newValue = typeof value === 'number' ? value : 10;
    if (newValue !== this._itemsPerPage) {
      this._itemsPerPage = newValue;
      this.getPages(this.totalData, newValue, this.currentPage);
    }
  }

  /**
   * @description
   * Es el número de página actual que se muestra
   */
  private _currentPage = 1;
  @Input()
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(value: number) {
    const newValue = typeof value === 'number' ? value : 1;
    if (newValue !== this._currentPage) {
      this._currentPage = newValue;
      this.getPages(this.totalData, this.itemsPerPage, newValue);
    }
  }

  @HostBinding('class')
  get btnThemeClass(): string {
    return `g-pagination`;
  }

  @HostBinding('class.loading')
  get loadingClass(): boolean {
    return this.loading;
  }

  pages: Array<number>;
  arrPages: Array<Array<number>>;
  groupCurrentPage: number;
  currentDataInTable: number;
  viewPagesInNav: number;

  options: Array<SelectListItem>;
  formPagination: FormGroup;
  select: AbstractControl;
  subSelect: Subscription;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.eChangedPage = new EventEmitter<number>();
    this.eChangedSizeData = new EventEmitter<number>();
    this.options = [
      { text: '10', value: 10 },
      { text: '20', value: 20 },
      { text: '50', value: 50 },
      { text: '100', value: 100 }
    ];
    this.pages = [];
    this.arrPages = [];
    this.groupCurrentPage = 0;
    this.viewPagesInNav = 6;
  }

  ngOnInit(): void {
    this.createForm(this.itemsPerPage);
    this.subSelect = this.select
      .valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe((value: number) => {
        this.emitEvent('size', value);
      });
  }

  ngOnDestroy(): void {
    if (!!this.subSelect) { this.subSelect.unsubscribe(); }
  }

  prevPage(): void {
    const newPage = this.currentPage - 1;
    if (newPage >= 1) {
      this.groupCurrentPage = this.getGroupCurrentPage(newPage, this.viewPagesInNav);
      this.emitEvent('page', newPage);
    }
  }

  nextPage(): void {
    const newPage = this.currentPage + 1;
    if (newPage < this.pages.length + 1) {
      this.groupCurrentPage = this.getGroupCurrentPage(newPage, this.viewPagesInNav);
      this.emitEvent('page', newPage);
    }
  }

  prevGroup(): void {
    const newGroup = this.groupCurrentPage - 1;
    if (newGroup >= 0) {
      this.groupCurrentPage = newGroup;
      const arrPage = [...this.arrPages[newGroup]];
      const newPage = arrPage[this.viewPagesInNav - 1];
      this.emitEvent('page', newPage);
    }
  }

  nextGroup(): void {
    const newGroup = this.groupCurrentPage + 1;
    if (newGroup < this.arrPages.length) {
      this.groupCurrentPage = newGroup;
      const arrPage = [...this.arrPages[newGroup]];
      const newPage = arrPage[0];
      this.emitEvent('page', newPage);
    }
  }

  goToPage(page: number): void {
    const newPage = page;
    this.groupCurrentPage = this.getGroupCurrentPage(newPage, this.viewPagesInNav);
    this.emitEvent('page', newPage);
  }

  private getPages(total: number, itemsPerPage: number, currentPage: number): void {
    let pages = [];
    const numberPages = (total % itemsPerPage === 0)
      ? (Math.floor(total / itemsPerPage))
      : (Math.floor(total / itemsPerPage) + 1);
    for (let i = 1; i <= numberPages; i++) {
      pages = pages.concat([i]);
    }
    this.pages = [...pages];
    this.arrPages = _chunck(pages, this.viewPagesInNav);
    this.currentDataInTable = (currentPage === pages.length) ? (total - (itemsPerPage * (currentPage - 1))) : itemsPerPage;
    this.groupCurrentPage = this.getGroupCurrentPage(currentPage, this.viewPagesInNav);
  }

  private getGroupCurrentPage(currentPage: number, viewPagesinNav: number): number {
    const group = (currentPage % viewPagesinNav === 0)
      ? (Math.floor(currentPage / viewPagesinNav))
      : (Math.floor(currentPage / viewPagesinNav) + 1);

    return group - 1;
  }

  private emitEvent(type: string, value: number): void {
    if (!this.loading) {
      switch (type) {
        case 'page':
          if (this.currentPage !== value) { this.eChangedPage.emit(value); }
          break;
        case 'size':
          this.eChangedSizeData.emit(value);
          break;
        default:
          console.info('Sin tipo de cambio');
          break;
      }
    }
  }

  private createForm(itemsPerPage: number): void {
    this.formPagination = this.fb.group({
      select: [{ value: itemsPerPage, disabled: false }]
    });
    this.select = this.formPagination.get('select');
  }

  trackByFn(index: any, item: any): number {
    return item;
  }

}

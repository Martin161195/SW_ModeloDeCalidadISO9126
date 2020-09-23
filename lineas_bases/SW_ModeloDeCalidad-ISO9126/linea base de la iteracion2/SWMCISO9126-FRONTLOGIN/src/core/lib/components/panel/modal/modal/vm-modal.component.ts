import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { ResizeService } from '@shared/helpers/events/resize.service';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { VMModalBodyComponent } from '../modal-body/vm-modal-body.component';
import { VMModalFooterComponent } from '../modal-footer/vm-modal-footer.component';
import { VMModalHeaderComponent } from '../modal-header/vm-modal-header.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-modal',
  templateUrl: './vm-modal.component.html',
  animations: [
    trigger('closeOpen', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease'),
        query('@closeOpenContent', animateChild())
      ]),
      transition(':leave', [
        query('@closeOpenContent', animateChild()),
        animate('300ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('closeOpenContent', [
      state('in', style({ transform: 'translate(0,0)', opacity: 1 })),
      transition(':enter', [
        style({ transform: 'translate(0,-50%)', opacity: 0 }),
        animate('300ms ease')
      ]),
      transition(':leave', [
        animate('300ms ease', style({ transform: 'translate(0,-50%)', opacity: 0 }))
      ])
    ])
  ]
})
export class VMModalComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @ContentChild(VMModalHeaderComponent, { static: false }) hModal: VMModalHeaderComponent;
  @ContentChild(VMModalBodyComponent, { read: ElementRef, static: false }) bModal?: ElementRef;
  @ContentChild(VMModalFooterComponent, { read: ElementRef, static: false }) fModal?: ElementRef;
  @Output() readonly eCloseModal: EventEmitter<void>;
  size$: BehaviorSubject<number>;

  get modalContentAnimation(): string {
    return 'in';
  }

  private _loading = false;
  @Input()
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = coerceBooleanProperty(value);
  }

  /**
   * @description
   * Typo de modal: large, medium, small
   */
  private _size = 'small';
  private _width = 768;
  @Input()
  get size(): string {
    return this._size;
  }
  set size(value: string) {
    this._size = value || 'small';
    switch (this._size) {
      case 'small':
        this._width = 768;
        break;
      case 'medium':
        this._width = 992;
        break;
      case 'large':
        this._width = 1378;
        break;
      default:
        break;
    }
    if (!!this.size$) {
      this.size$.next(this._width);
    }
  }

  @HostBinding('class')
  get modalThemeClass(): string {
    return 'g-modal';
  }

  @HostBinding('@closeOpen')
  get modalAnimation(): string {
    return 'in';
  }

  navbar: any;
  subECloseModal: Subscription;
  subResize: Subscription;
  constructor(
    private readonly resizeService: ResizeService,
    private readonly renderer2: Renderer2,
    private readonly el: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.eCloseModal = new EventEmitter<void>();
    this.size$ = new BehaviorSubject<number>(768);
  }

  ngAfterViewInit(): void {
    // Add class to wrapper for no conflict with modal create
    this.navbar = this.document.getElementsByClassName('g-navbar')[0];
    if (!!this.navbar) {
      this.renderer2.setStyle(this.navbar, 'z-index', 0);
    }
    // Script para setear el height del body del modal, si supera una altura dada, que es de acuerdo
    // si es responsive o no, se suma, el header, footer y el padding por default seteado a 140(70 top y 70 bo)
    // y de acuerdo a eso se setea la altura del modal.
    this.subResize = combineLatest([
      this.resizeService.getEvent(),
      this.size$.asObservable()
    ])
      .subscribe(([widthBrowser, widthStyle]: [number, number]) => {
        const heightMaster = this.el.nativeElement.clientHeight;
        const heightFooter: number = this.fModal ? this.fModal.nativeElement.clientHeight : 0;
        const heightHeader = 81.59;
        const paddingBuff = 140;
        let heightBodyBuff: number;
        heightBodyBuff = (widthBrowser <= widthStyle)
          ? (heightMaster - (heightFooter + heightHeader))
          : heightMaster - (heightFooter + heightHeader + paddingBuff);
        this.renderer2.setStyle(this.bModal.nativeElement, 'max-height', `${heightBodyBuff}px`);
      });
  }

  ngAfterContentInit(): void {
    if (this.hModal) {
      this.subECloseModal = this.hModal.eClickClose
        .subscribe(() => {
          this.eCloseModal.emit();
        });
    }
  }

  ngOnDestroy(): void {
    // Remove class to wrapper for no conflict with modal create
    if (!!this.navbar) {
      this.renderer2.setStyle(this.navbar, 'z-index', 10);
    }
    if (!!this.subECloseModal) { this.subECloseModal.unsubscribe(); }
    if (!!this.subResize) { this.subResize.unsubscribe(); }
  }

}

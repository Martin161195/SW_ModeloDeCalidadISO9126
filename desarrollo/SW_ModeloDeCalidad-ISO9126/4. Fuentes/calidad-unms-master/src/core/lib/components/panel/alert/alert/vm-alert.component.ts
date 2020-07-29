import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { ResizeService } from '@shared/helpers/events/resize.service';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { VMAlertBodyComponent } from '../alert-body/vm-alert-body.component';
import { VMAlertFooterComponent } from '../alert-footer/vm-alert-footer.component';
import { VMAlertHeaderComponent } from '../alert-header/vm-alert-header.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-alert',
  templateUrl: './vm-alert.component.html',
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
  ],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.g-alert]': 'true',
    '[@closeOpen]': '"in"'
  }
})
export class VMAlertComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  @ContentChild(VMAlertHeaderComponent, { static: false }) hModal: VMAlertHeaderComponent;
  @ContentChild(VMAlertBodyComponent, { read: ElementRef, static: false }) bModal?: ElementRef;
  @ContentChild(VMAlertFooterComponent, { read: ElementRef, static: false }) fModal?: ElementRef;

  @Input() loading: boolean;

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

  @Output() readonly eCloseAlert: EventEmitter<void>;

  alertContentAnimation: string;
  size$: BehaviorSubject<number>;

  navbar: any;
  subECloseAlert: Subscription;
  subResize: Subscription;

  constructor(
    private readonly resizeService: ResizeService,
    private readonly renderer2: Renderer2,
    private readonly el: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.alertContentAnimation = 'in';
    this.eCloseAlert = new EventEmitter<void>();
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
      this.subECloseAlert = this.hModal.eClickClose
        .subscribe(() => {
          this.eCloseAlert.emit();
        });
    }
  }

  ngOnDestroy(): void {
    // Remove class to wrapper for no conflict with modal create
    if (!!this.navbar) {
      this.renderer2.setStyle(this.navbar, 'z-index', 10);
    }
    if (!!this.subECloseAlert) { this.subECloseAlert.unsubscribe(); }
    if (!!this.subResize) { this.subResize.unsubscribe(); }
  }

}

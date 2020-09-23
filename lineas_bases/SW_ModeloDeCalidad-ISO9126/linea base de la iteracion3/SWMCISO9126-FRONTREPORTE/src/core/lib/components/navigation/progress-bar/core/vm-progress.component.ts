import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { VMProgressRef } from './vm-progress-ref';
import { IVMProgressState } from './vm-progress.interface';
import { VMProgress } from './vm-progress.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-progress',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    // tslint:disable-next-line:object-literal-key-quotes
    'role': 'progressbar',
    '[attr.spinnerPosition]': 'spinnerPosition',
    '[attr.dir]': 'direction',
    '[attr.thick]': 'thick',
    '[attr.fixed]': 'fixed'
  },
  // tslint:disable-next-line: component-max-inline-declarations
  template: `
    <ng-container *ngIf="state$ | async; let state">
      <div class="vm-progress-bar"
            [class.-active]="state.active"
            [style.transition]="'opacity ' + speed + 'ms ' + ease">
        <div class="vm-bar-placeholder">
          <div class="vm-bar"
                [style.transform]="state.transform"
                [style.backgroundColor]="color"
                [style.transition]="state.active ? 'all ' + speed + 'ms ' + ease : 'none'">
            <div *ngIf="meteor" class="vm-meteor" [style.boxShadow]="'0 0 10px '+ color + ', 0 0 5px ' + color"></div>
          </div>
        </div>
        <div *ngIf="spinner" class="vm-spinner">
          <div class="vm-spinner-icon"
                [style.borderTopColor]="color"
                [style.borderLeftColor]="color"></div>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./vm-progress.component.sass'],
  // tslint:disable-next-line: use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})

export class VMProgressComponent implements OnInit, OnChanges, OnDestroy {

  private _started: SubscriptionLike = Subscription.EMPTY;
  private _completed: SubscriptionLike = Subscription.EMPTY;

  /** Progress bar worker */
  progressRef: VMProgressRef;

  /** Stream that emits progress state */
  state$: Observable<{ active: boolean, transform: string }>;

  /** Creates a new instance if id is not already exists */
  @Input() id = 'root';

  /** Initializes inputs from the global config */
  @Input() min: number = this._vmProgress.config.min;
  @Input() max: number = this._vmProgress.config.max;
  @Input() ease: string = this._vmProgress.config.ease;
  @Input() color: string = this._vmProgress.config.color;
  @Input() speed: number = this._vmProgress.config.speed;
  @Input() thick: boolean = this._vmProgress.config.thick;
  @Input() fixed: boolean = this._vmProgress.config.fixed;
  @Input() meteor: boolean = this._vmProgress.config.meteor;
  @Input() spinner: boolean = this._vmProgress.config.spinner;
  @Input() trickleSpeed: number = this._vmProgress.config.trickleSpeed;
  @Input() debounceTime: number = this._vmProgress.config.debounceTime;
  @Input() trickleFunc: (n: number) => number = this._vmProgress.config.trickleFunc;
  @Input() spinnerPosition: 'left' | 'right' = this._vmProgress.config.spinnerPosition;
  @Input() direction: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-' = this._vmProgress.config.direction;
  @Output() readonly started = new EventEmitter();
  @Output() readonly completed = new EventEmitter();

  get isStarted(): boolean {
    return this.progressRef.isStarted;
  }

  constructor(private readonly _vmProgress: VMProgress) { }

  ngOnChanges(): void {
    if (this.progressRef instanceof VMProgressRef) {
      // Update progress bar config when inputs change
      this.progressRef.setConfig({
        max: (this.max > 0 && this.max <= 100) ? this.max : 100,
        min: (this.min < 100 && this.min >= 0) ? this.min : 0,
        speed: this.speed,
        trickleSpeed: this.trickleSpeed,
        trickleFunc: this.trickleFunc,
        debounceTime: this.debounceTime
      });
    }
  }

  ngOnInit(): void {
    // Get progress bar service instance
    this.progressRef = this._vmProgress.ref(this.id, {
      max: this.max,
      min: this.min,
      speed: this.speed,
      trickleSpeed: this.trickleSpeed,
      debounceTime: this.debounceTime
    });

    // Subscribe to progress state
    this.state$ = this.progressRef.state.pipe(
      map((state: IVMProgressState) => ({
        active: state.active,
        transform: `translate3d(${state.value}%,0,0)`
      }))
    );

    // Subscribes to started and completed events on deman
    if (this.started.observers.length) {
      this._started = this.progressRef.started.subscribe(() => this.started.emit());
    }
    if (this.completed.observers.length) {
      this._completed = this.progressRef.completed.subscribe(() => this.completed.emit());
    }
  }

  ngOnDestroy(): void {
    this._started.unsubscribe();
    this._completed.unsubscribe();
    if (this.progressRef instanceof VMProgressRef) {
      this.progressRef.destroy();
    }
  }

  start(): void {
    this.progressRef.start();
  }

  complete(): void {
    this.progressRef.complete();
  }

  inc(n?: number): void {
    this.progressRef.inc(n);
  }

  set(n: number): void {
    this.progressRef.set(n);
  }
}

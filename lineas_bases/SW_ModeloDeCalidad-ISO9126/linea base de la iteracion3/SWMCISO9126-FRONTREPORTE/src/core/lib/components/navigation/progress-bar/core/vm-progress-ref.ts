import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { debounce, delay, distinctUntilChanged, filter, map, skip, switchMap, tap } from 'rxjs/operators';
import { IVMProgressConfig, IVMProgressState } from './vm-progress.interface';

export class VMProgressRef {

  /** Stream that emits when progress state is changed */
  private readonly _state: BehaviorSubject<IVMProgressState>;
  state: Observable<IVMProgressState>;

  /** Stream that emits when config is changed */
  private readonly _config: BehaviorSubject<IVMProgressConfig>;
  config: Observable<IVMProgressState>;

  /** Stream that increments and updates progress state */
  private readonly _trickling = new Subject();

  /** Stream that combines "_trickling" and "config" streams */
  private readonly _worker = Subscription.EMPTY;

  /** Get current progress state */
  private get currState(): IVMProgressState {
    return this._state.value;
  }

  /** Check if progress has started */
  get isStarted(): boolean {
    return this.currState.active;
  }

  /** Progress start event */
  get started(): Observable<boolean> {
    return this._state.pipe(
      map((state: IVMProgressState) => state.active),
      distinctUntilChanged(),
      filter(active => active)
    );
  }

  /** Progress ended event */
  get completed(): Observable<boolean> {
    return this._state.pipe(
      map((state: IVMProgressState) => state.active),
      distinctUntilChanged(),
      filter(active => !active),
      skip(1)
    );
  }

  constructor(
    customConfig: IVMProgressConfig,
    private readonly _onDestroyCallback: Function
  ) {
    this._state = new BehaviorSubject<IVMProgressState>({ active: false, value: 0 });
    this._config = new BehaviorSubject<IVMProgressConfig>(customConfig);
    this.state = this._state.asObservable();
    this.config = this._state.asObservable();

    this._worker = combineLatest([this._trickling, this._config])
      .pipe(
        debounce(([start, config]: [boolean, IVMProgressConfig]) => timer(start ? config.debounceTime : 0)),
        switchMap(([start, config]: [boolean, IVMProgressConfig]) => start ? this.onTrickling(config) : this.onComplete(config))
      )
      .subscribe();
  }

  /**
   * Start the progress
   */
  start(): void {
    this._trickling.next(true);
  }

  /**
   * Complete the progress
   */
  complete(): void {
    this._trickling.next(false);
  }

  /**
   * Increment the progress
   * @param number amount
   */
  inc(amount?: number): void {
    const n = this.currState.value;
    if (!this.isStarted) {
      this.start();
    } else {
      let newAmount = amount;
      if (typeof newAmount !== 'number') {
        newAmount = this._config.value.trickleFunc(n);
      }
      this.set(n + newAmount);
    }
  }

  /**
   * Set the progress
   * @param number n
   */
  set(n: number): void {
    this.setState({ value: this.clamp(n), active: true });
  }

  /**
   * Set config
   * @param IVMProgressConfig config
   */
  setConfig(config: IVMProgressConfig): void {
    this._config.next({ ...this._config.value, ...config });
  }

  /**
   * Destroy progress reference
   */
  destroy(): void {
    this._worker.unsubscribe();
    this._trickling.complete();
    this._state.complete();
    this._config.complete();
    this._onDestroyCallback();
  }

  /**
   * Set progress state
   * @param IVMProgressState state
   */
  private setState(state: IVMProgressState): void {
    this._state.next({ ...this.currState, ...state });
  }

  /**
   * Clamps a value to be between min and max
   * @param number n
   */
  private clamp(n: number): number {
    return Math.max(this._config.value.min, Math.min(this._config.value.max, n));
  }

  /**
   * Keeps incrementing the progress
   * @param IVMProgressConfig config
   */
  private onTrickling(config: IVMProgressConfig): Observable<number> {
    if (!this.isStarted) {
      this.set(this._config.value.min);
    }

    return timer(0, config.trickleSpeed)
      .pipe(tap(() => this.inc()));
  }

  /**
   * Completes then resets the progress
   * @param IVMProgressConfig config
   */
  private onComplete(config: IVMProgressConfig): Observable<any> {
    return !this.isStarted ? of({}) : of({})
      .pipe(
        // Completes the progress
        tap(() => this.setState({ value: 100 })),

        // Hides the progress bar after a tiny delay
        delay(config.speed * 1.7),
        tap(() => this.setState({ active: false })),

        // Resets the progress state
        delay(config.speed),
        tap(() => this.setState({ value: 0 }))
      );
  }
}

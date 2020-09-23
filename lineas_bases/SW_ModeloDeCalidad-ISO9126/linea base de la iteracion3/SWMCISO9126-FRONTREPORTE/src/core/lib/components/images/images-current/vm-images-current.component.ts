import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { coerceBooleanProp } from '@core/common/helpers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vm-images-current',
  templateUrl: './vm-images-current.component.html'
})

export class VMImagesCurrentComponent implements OnInit {
  /**
   * @description
   * Input para disabled el input nativo
   */
  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProp(value);
  }

  @Input() images: Array<string>;
  @Output() readonly imagesCurrent: EventEmitter<Array<string>>;
  constructor() {
    this.imagesCurrent = new EventEmitter<Array<string>>();
  }

  ngOnInit(): void { }

  removeImage(index: number): void {
    this.deleteImageByIndex(index);
    this.imagesCurrent.emit(this.getImages());
  }

  private deleteImageByIndex(index: number): void {
    const images = this.getImages();
    const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
    this.setImages(newImages);
  }

  private setImages(arr: Array<string>): void {
    this.images = [...arr];
  }

  getImages(): Array<string> {
    return [...this.images];
  }

  trackByFn(index: any, item: any): number {
    return item;
  }

}

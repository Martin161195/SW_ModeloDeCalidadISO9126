import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-images-current',
  templateUrl: './images-current.component.html'
})

export class ImagesCurrentComponent implements OnInit {
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

  trackByFn(index, item): number {
    return item;
  }

}

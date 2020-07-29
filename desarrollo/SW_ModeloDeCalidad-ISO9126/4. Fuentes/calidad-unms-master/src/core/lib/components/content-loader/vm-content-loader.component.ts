import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';

const uid = (): string => {
  return Math.random()
    .toString(36)
    .substring(2);
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vm-content-loader',
  templateUrl: './vm-content-loader.component.html'
})
export class VMContentLoaderComponent implements OnInit, OnChanges {
  @Input() animate = true;

  @Input() baseUrl = '';

  @Input() width = 400;

  @Input() height = 130;

  @Input() speed = 2;

  @Input() preserveAspectRatio = 'xMidYMid meet';

  @Input() primaryColor = '#f9f9f9';

  @Input() secondaryColor = '#ecebeb';

  @Input() primaryOpacity = 1;

  @Input() secondaryOpacity = 1;

  @Input() uniqueKey;

  @Input() rtl;

  @Input() style;

  @Input() ignoreBaseUrl = false;

  idClip = uid();
  idGradient = uid();

  defautlAnimation = ['-3; 1', '-2; 2', '-1; 3'];
  rtlAnimation = ['1; -3', '2; -2', '3; -1'];
  animationValues;

  fillStyle: { fill: string };
  clipStyle: string;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: string) { }

  ngOnInit(): void {
    this.animationValues = this.rtl ? this.rtlAnimation : this.defautlAnimation;

    if (this.baseUrl === '' && !this.ignoreBaseUrl && isPlatformBrowser(this.platformId)) {
      this.baseUrl = window.location.pathname;
    }

    this.setFillStyle();
    this.setClipStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['baseUrl']) {
      if (changes['baseUrl'].previousValue !== changes['baseUrl'].currentValue) {
        this.setFillStyle();
        this.setClipStyle();
      }
    }
  }

  setFillStyle(): void {
    this.fillStyle = {
      fill: `url(${this.baseUrl}#${this.idGradient})`
    };
  }

  setClipStyle(): void {
    this.clipStyle = `url(${this.baseUrl}#${this.idClip})`;
  }
}

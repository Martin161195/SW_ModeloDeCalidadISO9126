import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwsService } from '@providers/services/aws/aws.service';

import { VMAwsUploadComponent } from './vm-aws-upload.component';

import { VMProgressBarModule } from '@core/lib/components/loader/progress-bar/vm-progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    VMProgressBarModule
  ],
  exports: [
    VMAwsUploadComponent
  ],
  declarations: [
    VMAwsUploadComponent
  ],
  providers: [
    AwsService
  ]
})
export class VMAwsUploadModule { }

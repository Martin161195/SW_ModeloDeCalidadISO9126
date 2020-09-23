import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationLocalComponent } from './information-local.component';

const routes: Routes = [
  {
    path: '',
    component: InformationLocalComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class InformationLocalRoutingModule { }

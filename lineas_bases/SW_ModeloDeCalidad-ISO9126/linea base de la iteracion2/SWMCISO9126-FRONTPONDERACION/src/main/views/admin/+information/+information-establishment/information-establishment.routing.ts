import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationEstablishmentComponent } from './information-establishment.component';

const routes: Routes = [
  {
    path: '',
    component: InformationEstablishmentComponent
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
export class InformationEstablishmentRoutingModule { }

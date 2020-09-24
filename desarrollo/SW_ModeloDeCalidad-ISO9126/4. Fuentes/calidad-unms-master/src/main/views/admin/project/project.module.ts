import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '/subcaracteristics',
    component: ProjectComponent
  }
];

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectModule { }

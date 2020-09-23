import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '@providers/guards/deactivate.guard';
import { ConfigurationInformationComponent } from './configuration-information.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationInformationComponent,
    canDeactivate: [CanDeactivateGuard],
    data: {
      breadcrumb: 'Info. General'
    },
    children: [
      {
        path: '',
        redirectTo: 'sub-feature',
        pathMatch: 'prefix'
      },
      {
        path: 'feature',
        loadChildren: () => import('./+information-establishment/information-establishment.module')
          .then(m => m.InformationEstablishmentModule),
        data: {
          breadcrumb: 'Info. de Sede'
        }
      },
      {
        path: 'sub-feature',
        loadChildren: () => import('./+information-local/information-local.module')
          .then(m => m.InformationLocalModule),
        data: {
          breadcrumb: 'Info. de Empresa'
        }
      },
      {
        path: 'metric',
        loadChildren: () => import('./+information-office-hours/information-office-hours.module')
          .then(m => m.InformationOfficeHoursModule),
        data: {
          breadcrumb: 'Horario de Atención'
        }
      }
    ]
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
export class ConfigurationInformationRoutingModule { }

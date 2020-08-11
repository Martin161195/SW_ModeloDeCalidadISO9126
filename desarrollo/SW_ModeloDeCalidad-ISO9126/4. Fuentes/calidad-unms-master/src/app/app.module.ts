import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { VMProgressModule } from '@core/lib/components/navigation/progress-bar/core/vm-progress.module';
import { VMProgressRouterModule } from '@core/lib/components/navigation/progress-bar/router/vm-progress-router.module';
import { VMToastModule } from '@core/lib/components/popus/toast/vm-toast.module';
import { ListLayoutsModules } from '@main/layouts';
import { HelpersProvidersModule } from '@shared/helpers/helpers-providers.module';
import { RootStoreModule } from 'src/root-store';
import { AppRoutingModule } from './app.routing';
//import { MaterialDesign } from './node_modules/';
import { AppComponent } from './app.component';
import { AppInjectables } from './app.injectables';
//import { ProjectComponent } from './src/main/views/admin/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    //ProjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HelpersProvidersModule,
    VMToastModule.forRoot({
      position: {
        top: 20,
        right: 0
      },
      animation: {
        fadeOut: 100,
        fadeIn: 100
      }
    }),
    VMProgressModule,
    VMProgressRouterModule.withConfig({
      startEvents: [RouteConfigLoadStart],
      completeEvents: [RouteConfigLoadEnd]
    }),
    RootStoreModule,
    ListLayoutsModules
  ],
  providers: [
    AppInjectables
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

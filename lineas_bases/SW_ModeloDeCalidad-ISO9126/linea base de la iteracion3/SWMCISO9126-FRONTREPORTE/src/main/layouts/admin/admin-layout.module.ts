import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonDirectiveModule } from '@core/lib/directives/common/common-directive.module';

import { AdminLayoutComponent } from '@main/layouts/admin/admin-layout.component';
import { HeaderAdminComponent } from '@main/layouts/admin/header-admin/header-admin.component';
import { NavigationAdminComponent } from '@main/layouts/admin/navigation-admin/navigation-admin.component';
import { SidebarDesktopAdminComponent } from '@main/layouts/admin/sidebar-desktop-admin/sidebar-desktop-admin.component';

import { VMButtonModule } from '@core/lib/components/button/vm-button/vm-button.module';
import { VMChipModule } from '@core/lib/components/chip/vm-chip.module';
import { VMFormDateModule } from '@core/lib/components/form/vm-form-date/vm-form-date.module';
import { VMFormErrorModule } from '@core/lib/components/form/vm-form-error/vm-form-error.module';
import { VMFormGroupModule } from '@core/lib/components/form/vm-form-group/vm-form-group.module';
import { VMFormInputModule } from '@core/lib/components/form/vm-form-input/vm-form-input.module';
import { VMFormSelectAutocompleteModule } from '@core/lib/components/form/vm-form-select-autocomplete/vm-form-select-autocomplete.module';
import { VMFormSelectModule } from '@core/lib/components/form/vm-form-select/vm-form-select.module';
import { VMFormTextareaModule } from '@core/lib/components/form/vm-form-textarea/vm-form-textarea.module';
import { VMAwsUploadModule } from '@core/lib/components/images/aws-upload/vm-aws-upload.module';
import { VMDropZoneModule } from '@core/lib/components/images/drop-zone/vm-drop-zone.module';
import { VMDropdownModule } from '@core/lib/components/menu/vm-dropdown/vm-dropdown.module';
import { VMBreadcrumbModule } from '@core/lib/components/navigation/breadcrumb/vm-breadcrumb.module';
import { VMAlertModule } from '@core/lib/components/panel/alert/vm-alert.module';
import { VMModalModule } from '@core/lib/components/panel/modal/vm-modal.module';
import { VMTooltipModule } from '@core/lib/components/popus/tooltip/vm-tooltip.module';
import { VMPermissionModule } from '@core/lib/directives/permission/vm-permission.module';
import { SimplebarModule } from '@core/lib/directives/simplebar/simplebar.module';

// FontAwesomeIcons
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faBars,
  faBoxes,
  faBoxOpen,
  faChartLine,
  faCoins,
  faExchangeAlt,
  faFileSignature,
  faGift,
  faHandHolding,
  faHeadset,
  faInfo,
  faMoneyCheckAlt,
  faPiggyBank,
  faPlusCircle,
  faScrewdriver,
  faSignOutAlt,
  faSitemap,
  faStore,
  faSync,
  faTachometerAlt,
  faTimesCircle,
  faUsers,
  faUsersCog,
  faUserShield,
  faUserTag,
  faWarehouse,
  faWrench
} from '@fortawesome/free-solid-svg-icons';

import {
  faCalendarAlt,
  faTrashAlt
} from '@fortawesome/free-regular-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    CommonDirectiveModule,
    FontAwesomeModule,
    VMAlertModule,
    VMAwsUploadModule,
    VMBreadcrumbModule.forRoot(),
    VMButtonModule,
    VMChipModule,
    VMFormDateModule,
    VMFormGroupModule,
    VMFormSelectAutocompleteModule,
    VMFormSelectModule,
    VMFormInputModule,
    VMFormTextareaModule,
    VMFormErrorModule,
    VMDropdownModule,
    VMDropZoneModule,
    VMModalModule,
    VMPermissionModule,
    VMTooltipModule,
    RouterModule,
    ReactiveFormsModule,
    SimplebarModule
  ],
  exports: [],
  declarations: [
    AdminLayoutComponent,
    HeaderAdminComponent,
    NavigationAdminComponent,
    SidebarDesktopAdminComponent
  ],
  providers: []
})
export class AdminLayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faArrowLeft,
      faBars,
      faBoxes,
      faBoxOpen,
      faCalendarAlt,
      faChartLine,
      faCoins,
      faExchangeAlt,
      faFileSignature,
      faGift,
      faHandHolding,
      faHeadset,
      faInfo,
      faMoneyCheckAlt,
      faPiggyBank,
      faPlusCircle,
      faScrewdriver,
      faSignOutAlt,
      faSitemap,
      faStore,
      faSync,
      faTachometerAlt,
      faTimesCircle,
      faTrashAlt,
      faUsers,
      faUsersCog,
      faUserShield,
      faUserTag,
      faWarehouse,
      faWrench
    );
  }
}

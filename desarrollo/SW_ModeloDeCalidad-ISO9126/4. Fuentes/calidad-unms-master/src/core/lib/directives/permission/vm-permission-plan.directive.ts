import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { isEnabledByArrayPlanCode } from '@core/common/permission';
import { Plan } from '@shared/models/plan/plan.class';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[vmPermissionPlan]'
})
export class VMPermissionPlanDirective implements OnInit {
  isHidden: boolean;

  private _vmPermissionPlan: Array<string> = [];
  @Input()
  get vmPermissionPlan(): Array<string> {
    return this._vmPermissionPlan;
  }
  set vmPermissionPlan(value: Array<string>) {
    this._vmPermissionPlan = Array.isArray(value) ? value : [];
    this.updateView();
  }

  private _vmPermissionPlanCurrent = null;
  @Input()
  get vmPermissionPlanCurrent(): Plan {
    return this._vmPermissionPlanCurrent;
  }
  set vmPermissionPlanCurrent(value: Plan) {
    this._vmPermissionPlanCurrent = value;
    this.updateView();
  }

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef
  ) {
    this.isHidden = true;
  }

  ngOnInit(): void {
    this.updateView();
  }

  private updateView() {
    if (isEnabledByArrayPlanCode(this.vmPermissionPlan, this.vmPermissionPlanCurrent)) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

}

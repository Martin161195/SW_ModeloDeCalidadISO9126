import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { isEmptyInputValue } from '@core/common/validators';
import { LocalEstablishmentService } from '@providers/services/local-establishment/local-establishment.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Promotion } from './promotion.class';

export class PromotionValidator {
  static async(serviceLocalEstablishment: LocalEstablishmentService, localEstablishmentId: number): AsyncValidatorFn {
    return (AC: AbstractControl | FormControl): Observable<ValidationErrors | null> => {
      return timer(500)
        .pipe(
          switchMap(() => serviceLocalEstablishment.getPromotionsByCode(localEstablishmentId, AC.value)
            .pipe(
              map((res: Array<Promotion>) => {
                return (res.length > 0) ? { searchPromotion: { property: 'code' } } : null;
              })
            ))
        );
    };
  }

  static priceAndPercent(AC: AbstractControl | FormControl): ValidationErrors | null {
    const controlPrice = AC.get('discountPrice');
    const controlPercent = AC.get('discountPercent');
    const priceV = controlPrice.value;
    const percentV = controlPercent.value;
    if ((isEmptyInputValue(priceV) && isEmptyInputValue(percentV))) {
      controlPrice.setErrors({ priceAndPercentPromotion: { message: 'Al menos un campo es obligatorio' } });
      controlPercent.setErrors({ priceAndPercentPromotion: { message: 'Al menos un campo es obligatorio' } });
    } else if ((!isEmptyInputValue(priceV) && !isEmptyInputValue(percentV))) {
      controlPrice.setErrors({ priceAndPercentPromotion: { message: 'Los dos campos no pueden estar con valor' } });
      controlPercent.setErrors({ priceAndPercentPromotion: { message: 'Los dos campos no pueden estar con valor' } });
    } else {
      if (!!controlPercent.errors) {
        delete controlPercent.errors.priceAndPercentPromotion;
        if (Object.keys(controlPercent.errors).length === 0) { controlPercent.setErrors(null); }
      }
      if (!!controlPrice.errors) {
        delete controlPrice.errors.priceAndPercentPromotion;
        if (Object.keys(controlPrice.errors).length === 0) { controlPrice.setErrors(null); }
      }
    }

    return null;
  }

}

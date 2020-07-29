import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cleanString } from '@core/common/strings';
import { CheckboxValidator, PasswordValidation } from '@core/common/validators';
import { select, Store } from '@ngrx/store';
import { signin } from '@store/auth-store/actions';
import { selectAuthIsLoading, selectAuthSuccess } from '@store/auth-store/selectors';
import { RootStoreState } from '@store/index';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-signin-component',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnDestroy, OnInit {
  formCreate: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  repeatPassword: AbstractControl;
  phone: AbstractControl;
  nameLocal: AbstractControl;
  check: AbstractControl;
  loading$: Observable<boolean>;

  subAuth: Subscription;
  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<RootStoreState.State>,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loading$ = this.store$.pipe(select(selectAuthIsLoading));

    this.subAuth = this.store$
      .pipe(
        select(selectAuthSuccess),
        filter((text: string | null) => !!text)
      )
      .subscribe(() => {
        this.router.navigate(['/authentication/login']);
      });
  }

  onSubmit(): void {
    if (this.formCreate.valid) {
      this.store$.dispatch(signin({
        newUserLocal: {
          user: {
            firstName: this.formCreate.value.firstName,
            lastName: this.formCreate.value.lastName,
            email: this.formCreate.value.email,
            password: this.formCreate.value.password,
            phone: this.formCreate.value.phone,
            owner: 1
          },
          local: {
            name: this.formCreate.value.nameLocal,
            username: cleanString(this.formCreate.value.nameLocal),
            images: []
          },
          countryCode: 'PE'
        }
      }));
    } else {
      this.markAsTouched();
    }
  }

  markAsTouched(): void {
    this.firstName.markAsTouched();
    this.lastName.markAsTouched();
    this.email.markAsTouched();
    this.password.markAsTouched();
    this.repeatPassword.markAsTouched();
    this.phone.markAsTouched();
    this.nameLocal.markAsTouched();
    this.check.markAsTouched();
  }

  createForm(): void {
    this.formCreate = this.fb.group({
      firstName: [{ value: '', disabled: false }, Validators.required],
      lastName: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, Validators.compose([Validators.required, Validators.email])],
      password: [{ value: '', disabled: false }, Validators.required],
      repeatPassword: [{ value: '', disabled: false }, Validators.required],
      phone: [{ value: '', disabled: false }, Validators.required],
      nameLocal: [{ value: '', disabled: false }, Validators.required],
      check: [{ value: false, disabled: false }, CheckboxValidator.required]
    }, {
      validator: [PasswordValidation.MatchPassword]
    }
    );
    this.firstName = this.formCreate.get('firstName');
    this.lastName = this.formCreate.get('lastName');
    this.email = this.formCreate.get('email');
    this.password = this.formCreate.get('password');
    this.repeatPassword = this.formCreate.get('repeatPassword');
    this.phone = this.formCreate.get('phone');
    this.nameLocal = this.formCreate.get('nameLocal');
    this.check = this.formCreate.get('check');
  }

  ngOnDestroy(): void {
    if (!!this.subAuth) { this.subAuth.unsubscribe(); }
  }

}

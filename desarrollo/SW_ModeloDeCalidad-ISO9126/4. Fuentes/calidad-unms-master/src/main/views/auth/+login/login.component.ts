import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { login } from '@store/auth-store/actions';
import { selectAuthIsLoading, selectAuthSuccess } from '@store/auth-store/selectors';
import { RootStoreState } from '@store/index';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  formCreate: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
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
        this.router.navigate(['/']);
      });
  }

  onSubmit(): void {
    if (this.formCreate.valid) {
      this.store$.dispatch(login({
        credentials: {
          user: this.email.value,
          password: this.password.value
        }
      }));
    } else {
      this.markAsTouched();
    }
  }

  markAsTouched(): void {
    this.email.markAsTouched();
    this.password.markAsTouched();
  }

  createForm(): void {
    this.formCreate = this.fb.group({
      email: [{ value: '', disabled: false }, Validators.required],
      password: [{ value: '', disabled: false }, Validators.required]
    });
    this.email = this.formCreate.controls['email'];
    this.password = this.formCreate.controls['password'];
  }

}

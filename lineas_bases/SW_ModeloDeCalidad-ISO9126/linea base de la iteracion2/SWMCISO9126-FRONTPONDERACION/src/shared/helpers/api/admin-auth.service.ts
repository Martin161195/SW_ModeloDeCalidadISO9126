import { Injectable } from '@angular/core';
import { AuthAdministrator } from '@shared/models/administrator.class';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private admin: AuthAdministrator;
  private readonly subAdmin: Subject<AuthAdministrator> = new Subject<AuthAdministrator>();
  constructor() {
    const admin = localStorage.getItem('adminauth');
    if (!!admin) {
      this.admin = JSON.parse(admin);
    }
  }

  set(admin: AuthAdministrator): void {
    this.admin = admin;
    this.subAdmin.next(admin);
    localStorage.setItem('adminauth', JSON.stringify(this.getStatic()));
  }

  getStatic(): AuthAdministrator {
    return this.admin;
  }

  get(): Subject<AuthAdministrator> {
    return this.subAdmin;
  }

  loggedIn(): boolean {
    return !!this.getStatic();
  }

  logout(): void {
    this.admin = null;
    this.subAdmin.next(null);
    localStorage.removeItem('adminauth');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information-office-hours-component',
  templateUrl: './information-office-hours.component.html'
})
export class InformationOfficeHoursComponent implements OnInit {
  view: 'Inteligibilidad' | 'Aprendizaje' | 'Operabilidad' | 'Proteccion' | 'Estetica' | 'Accesibilidad';

  btnIn: boolean;
  btnAp: boolean;
  btnOp: boolean;
  btnPr: boolean;
  btnEs: boolean;
  btnAc: boolean;

  constructor(
    private readonly router: Router
  ) {
    this.view = 'Inteligibilidad';
  }

  ngOnInit(): void { }

  changeView(view: string): void {
    switch (view) {
      case 'Inteligibilidad':
        this.view = view;
        break;
      case 'Aprendizaje':
        this.view = view;
        break;
      case 'Operabilidad':
        this.view = view;
        break;
      case 'Proteccion':
        this.view = view;
        break;
      case 'Estetica':
        this.view = view;
        break;
      case 'Accesibilidad':
        this.view = view;
        break;
      default:
        break;
    }
  }

  before(): void {
    switch (this.view) {
      case 'Inteligibilidad':
        break;
      case 'Aprendizaje':
        this.view = 'Inteligibilidad';
        break;
      case 'Operabilidad':
        this.view = 'Aprendizaje';
        break;
      case 'Proteccion':
        this.view = 'Operabilidad';
        break;
      /* case 'Estetica':
        this.view = 'Proteccion';
        break; */
      case 'Accesibilidad':
        this.view = 'Proteccion';
        break;
      default:
        break;
    }

  }

  after(): void {

    switch (this.view) {
      case 'Inteligibilidad':

        console.log(this.btnIn);

        this.btnIn = true;
        setTimeout(() => { this.btnIn = false; }, 100);
        break;
      case 'Aprendizaje':

        console.log(this.btnAp);

        this.btnAp = true;
        setTimeout(() => { this.btnAp = false; }, 100);
        break;
      case 'Operabilidad':

        console.log(this.btnOp);

        this.btnOp = true;
        setTimeout(() => { this.btnOp = false; }, 100);
        break;
      case 'Proteccion':

        console.log(this.btnPr);

        this.btnPr = true;
        setTimeout(() => { this.btnPr = false; }, 100);
        break;
      case 'Estetica':

        console.log(this.btnEs);

        this.btnEs = true;
        setTimeout(() => { this.btnEs = false; }, 100);
        break;
      case 'Accesibilidad':

        console.log(this.btnAc);

        this.btnAc = true;
        setTimeout(() => { this.btnAc = false; }, 100);
        break;
      default:
        break;
    }

  }

  eBtn(view: string): void {
    switch (view) {
      case 'Inteligibilidad':
        this.view = 'Aprendizaje';
        break;
      case 'Aprendizaje':
        this.view = 'Operabilidad';
        break;
      case 'Operabilidad':
        this.view = 'Proteccion';
        break;
      case 'Proteccion':
        this.view = 'Accesibilidad';
        break;
      /* case 'Estetica':
        this.view = 'Accesibilidad';
        break; */
      case 'Accesibilidad':
        this.router.navigate(['/']);
        break;
      default:
        break;
    }

  }

}

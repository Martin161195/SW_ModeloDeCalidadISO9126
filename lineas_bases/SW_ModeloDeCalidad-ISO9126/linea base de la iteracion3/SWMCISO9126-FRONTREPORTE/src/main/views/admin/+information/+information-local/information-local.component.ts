import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLocalService } from '@providers/services/user-local/user-local.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-information-local-component',
  templateUrl: './information-local.component.html'
})
export class InformationLocalComponent implements OnInit {

  subcaracteristicas: Array<any>;
  values: Array<any>;

  constructor(
    private readonly router: Router,
    private readonly userLocalService: UserLocalService
  ) {
    this.subcaracteristicas = [
      {
        id: 9,
        nombre: 'Inteligibilidad'
      },
      {
        id: 10,
        nombre: 'Aprendizaje'
      },
      {
        id: 11,
        nombre: 'Operabilidad'
      },
      {
        id: 12,
        nombre: 'Proteccion frente a errores de usuario'
      },
      {
        id: 13,
        nombre: 'Estetica'
      },
      {
        id: 14,
        nombre: 'Accesibilidad'
      }
    ];

    this.values = [];
  }

  ngOnInit(): void {
    let outer = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.subcaracteristicas.length; i++) {
      let buffA = [];
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.subcaracteristicas.length; j++) {

        const obj = {
          idx: this.subcaracteristicas[j].id,
          idy: this.subcaracteristicas[i].id,
          valor: null
        };

        if (i === j) { obj.valor = 1; }

        buffA = buffA.concat([obj]);

      }

      outer = outer.concat([[...buffA]]);
    }

    this.values = [...outer];
  }

  changeM(i: number, j: number): void {
    if (this.values[i][j].valor > 0 && this.values[i][j].valor < 10) {
      this.values[j][i].valor = 1 / this.values[i][j].valor;
    }
  }

  handle(): void {

    let valid = true;
    let arr = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.values.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.values[i].length; j++) {
        if (this.values[i][j].valor === null) {
          valid = false;
          break;
        }

        if (this.values[i][j].valor > 10 || this.values[i][j].valor < 0.1) {
          valid = false;
          break;
        }

        arr = arr.concat([this.values[i][j]]);
      }

      if (!valid) {
        break;
      }
    }

    console.log(valid);
    console.log(this.values);

    if (valid) {

      const sub: Subscription = this.userLocalService.ponderacion({
        idEntidad: 1,
        idProyecto: 1,
        listMatriz: arr,
        tipo: 'subcaracteristica'
      })
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['/group-1/metric']);

          sub.unsubscribe();
        }, (err: any) => {
          this.router.navigate(['/group-1/metric']);
          sub.unsubscribe();
        });

    }

  }
}

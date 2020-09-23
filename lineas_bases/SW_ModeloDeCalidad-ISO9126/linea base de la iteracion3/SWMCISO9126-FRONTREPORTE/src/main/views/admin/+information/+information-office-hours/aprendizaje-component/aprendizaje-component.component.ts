import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserLocalService } from '@providers/services/user-local/user-local.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aprendizaje-component',
  templateUrl: './aprendizaje-component.component.html'
})
export class AprendizajeComponent implements OnInit {
  subcaracteristicas: Array<any>;
  values: Array<any>;

  _btn = false;
  @Input()
  get btn(): boolean {
    return this._btn;
  }
  set btn(value: boolean) {
    this._btn = value;
    if (this._btn) {
      this.handle();
    }
  }

  @Output() readonly eBtn: EventEmitter<any>;

  constructor(
    private readonly userLocalService: UserLocalService
  ) {
    this.eBtn = new EventEmitter<any>();
    this.subcaracteristicas = [
      {
        id: 23,
        nombre: 'Completitud de la guia de usuario'
      },
      {
        id: 24,
        nombre: 'Formularios con valores por defecto'
      },
      {
        id: 25,
        nombre: 'Mensajes de error entendibles'
      },
      {
        id: 26,
        nombre: 'Interfaces de usuario intuitivas'
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

    if (valid) {

      const sub: Subscription = this.userLocalService.ponderacion({
        idEntidad: 1,
        idProyecto: 1,
        listMatriz: arr,
        tipo: 'metrica'
      })
        .subscribe((res: any) => {
          this.eBtn.emit('Aprendizaje');
          sub.unsubscribe();
        }, (err: any) => {
          this.eBtn.emit('Aprendizaje');
          sub.unsubscribe();
        });

    }

  }
}

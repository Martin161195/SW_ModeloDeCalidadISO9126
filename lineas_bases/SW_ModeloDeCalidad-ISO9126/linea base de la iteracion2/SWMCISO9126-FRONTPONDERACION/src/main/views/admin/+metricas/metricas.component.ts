import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLocalService } from '@providers/services/user-local/user-local.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-metricas-component',
  templateUrl: './metricas.component.html'
})
export class MetricaComponent implements OnDestroy, OnInit {
  metricas: Array<any>;
  subLocal: Subscription;
  constructor(
    private readonly userLocalService: UserLocalService
  ) {
    this.metricas = [
      /* {
        metrica: 'Metrica 1',
        peso: 'Peso Absoluto 1',
        prioridad: '1'
      },
      {
        metrica: 'Metrica 2',
        peso: 'Peso Absoluto 2',
        prioridad: '2'
      },
      {
        metrica: 'Metrica 3',
        peso: 'Peso Absoluto 3',
        prioridad: '3'
      },
      {
        metrica: 'Metrica 4',
        peso: 'Peso Absoluto 4',
        prioridad: '4'
      },
      {
        metrica: 'Metrica 5',
        peso: 'Peso Absoluto 5',
        prioridad: '5'
      },
      {
        metrica: 'Metrica 6',
        peso: 'Peso Absoluto 6',
        prioridad: '6'
      },
      {
        metrica: 'Metrica 7',
        peso: 'Peso Absoluto 7',
        prioridad: '7'
      },
      {
        metrica: 'Metrica 8',
        peso: 'Peso Absoluto 8',
        prioridad: '8'
      },
      {
        metrica: 'Metrica 9',
        peso: 'Peso Absoluto 9',
        prioridad: '9'
      },
      {
        metrica: 'Metrica 10',
        peso: 'Peso Absoluto 10',
        prioridad: '10'
      },
      {
        metrica: 'Metrica 11',
        peso: 'Peso Absoluto 11',
        prioridad: '11'
      },
      {
        metrica: 'Metrica 12',
        peso: 'Peso Absoluto 12',
        prioridad: '12'
      },
      {
        metrica: 'Metrica 13',
        peso: 'Peso Absoluto 13',
        prioridad: '13'
      } */
    ];
  }

  ngOnInit(): void {
    this.subLocal = this.userLocalService.resultado()
      .subscribe((res: any) => {
        console.log(res)
        this.metricas = [...(res.listapriorizada)];
      })
  }

  ngOnDestroy(): void {
    if (!!this.subLocal) { this.subLocal.unsubscribe(); }
  }

}

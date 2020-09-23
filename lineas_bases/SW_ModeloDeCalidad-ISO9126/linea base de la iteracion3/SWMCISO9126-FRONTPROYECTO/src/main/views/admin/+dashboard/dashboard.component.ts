import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  metricas: Array<any>;
  constructor() {
    this.metricas = [
      {
        nombre: 'Proyecto 1',
        caracteristicas: '10'
      },
      {
        nombre: 'Proyecto 2',
        caracteristicas: '9'
      },
      {
        nombre: 'Proyecto 3',
        caracteristicas: '5'
      },
      {
        nombre: 'Proyecto 4',
        caracteristicas: '8'
      },
      {
        nombre: 'Proyecto 5',
        caracteristicas: '7'
      },
      {
        nombre: 'Proyecto 6',
        caracteristicas: '13'
      },
      {
        nombre: 'Proyecto 7',
        caracteristicas: '20'
      },
      {
        nombre: 'Proyecto 8',
        caracteristicas: '1'
      },
      {
        nombre: 'Proyecto 9',
        caracteristicas: '5'
      },
      {
        nombre: 'Proyecto 10',
        caracteristicas: '45'
      },
      {
        nombre: 'Proyecto 11',
        caracteristicas: '11'
      },
      {
        nombre: 'Proyecto 12',
        caracteristicas: '40'
      },
      {
        nombre: 'Proyecto 13',
        caracteristicas: '50'
      }
    ]
  }

  ngOnInit(): void { }
}

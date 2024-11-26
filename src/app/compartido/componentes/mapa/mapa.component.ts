import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {
  @ViewChild('mapa', { static: true }) mapaElement: ElementRef;
  mapa: L.Map;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadMapa();
  }

  loadMapa() {
    // Coordenadas de Lima, Perú
    const lat = -33.4488859799899;
    const lng = -70.6699947423153;

    this.mapa = L.map(this.mapaElement.nativeElement).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapa);

    L.marker([lat, lng]).addTo(this.mapa)
      .bindPopup('Nos encontramos aquí.')
      .openPopup();
  }
}
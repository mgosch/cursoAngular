import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viajes.model';
import { DestinosApiClient } from '../models/destinos-api-client';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
 
  destinos: DestinoViaje[];
  constructor(public destinosApiClient:DestinosApiClient) {
    this.onItemAdded = new EventEmitter();
   }

  ngOnInit(): void {
  }
 
  agregado(d : DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViaje){
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viajes.model';
import { AppState } from '../../app.module';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { Store} from '@ngrx/store';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  all;
 
  destinos: DestinoViaje[];
  constructor(public destinosApiClient:DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state=> state.destinos.favorito)
    .subscribe(data => {
      if (data != null) {
        this.updates.push('Se ha elegido a ' + data.nombre);
     }
    });
    // this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
    //   if (d != null) {
    //     this.updates.push('Se ha elegido a ' + d.nombre);
    //   }
    // });
    this.all = store.select(state => state.destinos.items).subscribe(items => this.all = items);
   }

  ngOnInit(): void {
  }
 
  agregado(d : DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    // this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegido(e: DestinoViaje){
    this.destinosApiClient.elegir(e);
    // this.store.dispatch(new ElegidoFavoritoAction(e));
  }

}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { DestinoViaje } from './destino-viajes.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable()
export class DestinosApiClient {
    destinos: DestinoViaje[] = [];
    // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);
    
	constructor(private store: Store<AppState>) {
        this.store
        .select(state => state.destinos)
        .subscribe((data) => {
          this.destinos = data.items;
        });
    }
    
	add(d:DestinoViaje){
    //   this.destinos.push(d);
        this.store.dispatch(new NuevoDestinoAction(d));
    }
    
	getAll(): DestinoViaje[] {
	  return this.destinos;
    }

    elegir(d: DestinoViaje) {
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }

    getById(id: String): DestinoViaje {
        return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
    }
}
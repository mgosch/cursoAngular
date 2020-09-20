import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { DestinoViaje } from './destino-viajes.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable()
export class DestinosApiClient {
    destinos: DestinoViaje[] = [];
    // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);
    
	constructor(private store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient) {
        this.store
        .select(state => state.destinos)
        .subscribe((data) => {
          this.destinos = data.items;
        });
    }
    
    add(d: DestinoViaje) {
        const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
        const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
        this.http.request(req).subscribe((data: HttpResponse<{}>) => {
          if (data.status === 200) {
            this.store.dispatch(new NuevoDestinoAction(d));
            const myDb = db;
            myDb.destinos.add(d);
            console.log('todos los destinos de la db!');
            myDb.destinos.toArray().then(destinos => console.log(destinos))
          }
        });
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
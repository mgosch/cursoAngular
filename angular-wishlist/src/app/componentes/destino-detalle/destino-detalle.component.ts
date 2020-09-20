import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.module';
import { DestinoViaje } from '../../models/destino-viajes.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';

// class DestinosApiClientViejo {
//   getById(id: String): DestinoViaje {
//     console.log('llamado a la clase viaje');
//     return null;
//   }
// }

// interface AppConfig {
//   apiEndpoint: String;
// }
// const APP_CONFIG_VALUE: AppConfig = {
//   apiEndpoint: 'mi_api.com'
// };
// const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// class DestinosApiClientDecorated extends DestinosApiClient {
//   constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>){
//     super(store);
//   }
//   getById(id: String): DestinoViaje {
//     console.log('llamado a por la clase decorada');
//     console.log('config', this.config.apiEndpoint);
//     return super.getById(id);
//   }
// }

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ DestinosApiClient
  //  {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
  //  {provide: DestinosApiClient, useFactory: DestinosApiClientDecorated},
  //  {provide: DestinosApiClientViejo, useExisting: DestinosApiClient}
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinoApiClient: DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinoApiClient.getById(id);
  }

}

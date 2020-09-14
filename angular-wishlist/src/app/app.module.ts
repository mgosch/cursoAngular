import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosEfects, DestinoViajesStates, initalizeDestinosViajesState, reduceDestinosViaje } from './models/destinos-viajes-state.model';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//reduce init
export interface AppState{
  destinos: DestinoViajesStates;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reduceDestinosViaje
};

let reducersInitializeState = {
  destinos: initalizeDestinosViajesState()
}
//reduce fin init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitializeState, runtimeChecks:{
      strictStateImmutability: false,
      strictActionImmutability: false}}),
    EffectsModule.forRoot([DestinosEfects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [DestinosApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

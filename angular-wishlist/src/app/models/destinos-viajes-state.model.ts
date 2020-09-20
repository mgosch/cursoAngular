import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viajes.model';

//ESTADO
export interface DestinoViajesStates {
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
}

export const initalizeDestinosViajesState = function() {
    return {
        items: [],
        loading: false,
        favorito: null
    };
}
 
//ACCIONES
export enum DestinosViajesActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] Voto Positivo',
    VOTE_DOWN = '[Destinos Viajes] Voto Negativo',
    INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action {
    type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViaje) {}
}

export class VotoPositivoAction implements Action {
    type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViaje) {}
}

export class VotoNegativoAction implements Action {
    type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViaje) {}
}

export class InitMyDataAction implements Action {
    type = DestinosViajesActionTypes.INIT_MY_DATA;
    constructor(public destinos: string[]) {}
  }
 
export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VotoNegativoAction | VotoPositivoAction | InitMyDataAction;

//REDUCERS
export function reduceDestinosViaje(
    state: DestinoViajesStates,
    action: DestinosViajesActions): DestinoViajesStates {
        switch (action.type) {
            case DestinosViajesActionTypes.NUEVO_DESTINO:
             return {
                 ...state,
                 items: [...state.items, (action as NuevoDestinoAction).destino ]
                };
            case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
                state.items.forEach(x => x.setSelected(false));
                const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
                fav.setSelected(true);
                return {
                    ...state,
                    favorito: fav
                };
            }
            case DestinosViajesActionTypes.VOTE_UP: {
                const pos: DestinoViaje = (action as VotoPositivoAction).destino;
                pos.voteUp();
                return {...state};
            }
            case DestinosViajesActionTypes.VOTE_DOWN:{
                const neg: DestinoViaje = (action as VotoNegativoAction).destino;
                neg.voteDown();
                return {...state};
            }
            case DestinosViajesActionTypes.INIT_MY_DATA: {
                const destinos: string[] = (action as InitMyDataAction).destinos;
                return {
                    ...state,
                    items: destinos.map((d) => new DestinoViaje(d, ''))
                  };
              }
        }
        return state;
    }

//EFECTS
@Injectable()
export class DestinosEfects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    );

    constructor(private actions$: Actions) {}
}
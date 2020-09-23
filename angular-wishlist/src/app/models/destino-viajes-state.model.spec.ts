import { DestinoViaje } from './destino-viajes.model';
import { DestinoViajesStates, initalizeDestinosViajesState, InitMyDataAction, NuevoDestinoAction, reduceDestinosViaje } from "./destinos-viajes-state.model";

describe('reducerDestinosViajes', () => {
  it('should reduce init data', () => {
    const prevState: DestinoViajesStates = initalizeDestinosViajesState();
    const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
    //accion
    const newState: DestinoViajesStates = reduceDestinosViaje(prevState, action);
    //assertion
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].nombre).toEqual('destino 1');
    //teardown si se inserto algo en la base de datos
  });

  it('should reduce new item added', () => {
    const prevState: DestinoViajesStates = initalizeDestinosViajesState();
    const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', 'url'));
    const newState: DestinoViajesStates = reduceDestinosViaje(prevState, action);
    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].nombre).toEqual('barcelona');
  });
});
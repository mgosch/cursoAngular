import { DestinoViaje } from './destino-viajes.model';

export class DestinosApiClient {
    destinos: DestinoViaje[];
    
	constructor() {
       this.destinos = [];
    }
    
	add(d:DestinoViaje){
	  this.destinos.push(d);
    }
    
	getAll(){
	  return this.destinos;
    }
}
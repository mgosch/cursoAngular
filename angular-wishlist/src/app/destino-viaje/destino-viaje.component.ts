import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DestinoViaje } from 'src/app/models/destino-viajes.model';
import { AppState } from '../app.module';
import { VotoNegativoAction, VotoPositivoAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: DestinoViaje;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
   }

  ngOnInit(): void {
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  votarPositivo() {
    this.store.dispatch(new VotoPositivoAction(this.destino));
    return false;
  }

  votarNegativo() {
    this.store.dispatch(new VotoNegativoAction(this.destino));
    return false;
  }

}

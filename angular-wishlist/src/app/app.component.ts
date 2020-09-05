import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lista de deseos';

  deseos: string[];

  constructor() {
    this.deseos = ['Conocer', 'Pasear', 'Comprar'];
   }
}

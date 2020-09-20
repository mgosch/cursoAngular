import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDestinosComponent } from './componentes//lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './componentes/destino-detalle/destino-detalle.component';
import { LoginComponent } from './componentes/login/login/login.component';
import { ProtectedComponent } from './componentes/protected/protected/protected.component';
import { VuelosComponentComponent } from './componentes/vuelos/vuelos-component/vuelos-component.component';
import { VuelosDetalleComponentComponent } from './componentes/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { VuelosMasInfoComponentComponent } from './componentes/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';

export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMasInfoComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponentComponent },
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard ]
  },
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [ UsuarioLogueadoGuard ],
    children: childrenRoutesVuelos
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

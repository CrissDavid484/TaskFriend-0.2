import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { CustomInputComponent } from './componentes/custom-input/custom-input.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AgregarActualizarTaskComponent } from './componentes/agregar-actualizar-task/agregar-actualizar-task.component';
import { MapaComponent } from './componentes/mapa/mapa.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AgregarActualizarTaskComponent,
    MapaComponent,
  ],
  exports:[
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    NgCircleProgressModule,
    AgregarActualizarTaskComponent,
    MapaComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })

  ]
})
export class CompartidoModule { }

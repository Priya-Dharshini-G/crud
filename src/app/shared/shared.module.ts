import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MaterialModule } from '../material/material.module';
import { DynamictableComponent } from './components/dynamictable/dynamictable.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@NgModule({
  declarations: [
    DialogBoxComponent,
    SnackBarComponent,
    DynamictableComponent,
    PiechartComponent,
    LinechartComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CanvasJSAngularChartsModule,
  ],
  exports:[
    DialogBoxComponent,
    SnackBarComponent,
    DynamictableComponent,
    LinechartComponent
  ]
})
export class SharedModule { }

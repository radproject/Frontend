import { NgModule } from '@angular/core';

import 'hammerjs';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material';

const modules = [
  MatIconModule,
  MatDialogModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class AngularMaterialModule { }

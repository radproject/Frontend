import { NgModule } from '@angular/core';

import 'hammerjs';

import { MatIconModule } from '@angular/material/icon';

const modules = [
  MatIconModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class AngularMaterialModule { }

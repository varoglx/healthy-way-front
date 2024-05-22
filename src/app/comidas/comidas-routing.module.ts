import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComidasPage } from './comidas.page';

const routes: Routes = [
  {
    path: '',
    component: ComidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComidasPageRoutingModule {}

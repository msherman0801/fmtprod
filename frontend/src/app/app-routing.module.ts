import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EstablishmentFormComponent } from './main/establishment-form/establishment-form.component';
import { PanelComponent } from './panel/panel.component'


const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'main/new', component: EstablishmentFormComponent },
  { path: 'panel', component: PanelComponent },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstablishmentCardComponent } from './main/establishment-card/establishment-card.component';
import { MainComponent } from './main/main.component';
import { PanelComponent } from './panel/panel.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FilterComponent } from './main/filter/filter.component';
import { InstantsearchComponent } from './main/misc/instantsearch/instantsearch.component';
import { ChipComponent } from './main/filter/chip/chip.component';
import { EstablishmentFormComponent } from './main/establishment-form/establishment-form.component';
import { OperatingHoursSelectComponent } from './main/establishment-form/operating-hours-select/operating-hours-select.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EstablishmentCardComponent,
    MainComponent,
    PanelComponent,
    NavigationComponent,
    FilterComponent,
    InstantsearchComponent,
    ChipComponent,
    EstablishmentFormComponent,
    OperatingHoursSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

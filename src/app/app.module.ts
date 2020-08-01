import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './home/map/map.component';
import { PopUpDataService } from './services/pop-up-data.service';
import { PopupComponent } from './home/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PopUpDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

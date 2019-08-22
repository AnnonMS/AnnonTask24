import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsStoreModule } from '@appstore/store.module';
import { AppComponent } from './app.component';
import { PollutionModule } from './pollution/pollution.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsStoreModule,
    PollutionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

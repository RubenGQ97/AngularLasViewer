import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViewerComponent } from './viewer/viewer.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    ViewerComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [ViewerComponent]
})
export class AppModule { }

import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatabaseModule, provideDatabase  } from '@angular/fire/database'
import { environment } from 'src/environments/environment.development';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase } from 'firebase/database';
import { Persistence } from 'firebase/auth';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    DatabaseModule,
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideDatabase(()=> getDatabase()),

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

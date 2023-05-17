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
import { AngularFireModule } from '@angular/fire/compat';
import { AccountComponent } from './modules/account/private/views/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent
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
    AngularFireModule.initializeApp(environment.firebase)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

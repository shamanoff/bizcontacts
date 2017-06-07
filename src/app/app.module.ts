import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";

export const firebaseConfig = {
  apiKey: 'AIzaSyASRDOmvbRMXsYsTETTqdhzyZYTZoSL9I4',
  authDomain: 'contacts-186e0.firebaseapp.com',
  databaseURL: 'https://contacts-186e0.firebaseio.com',
  // projectId: 'contacts-186e0',
  storageBucket: 'contacts-186e0.appspot.com'
  // messagingSenderId: '544762866704'
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

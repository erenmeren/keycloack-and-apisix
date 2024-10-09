import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          realm: 'reynolds',
          url: 'http://localhost:8080',
          clientId: 'reynolds'
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'
        }
      });
  }

  @NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, KeycloakAngularModule],
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService]
      }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
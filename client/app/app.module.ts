// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { LoggerModule } from 'ngx-logger';
// Components
import { AppComponent } from './app.component';
// Environments
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        authScheme: 'Bearer ',
        tokenGetter: (): string => localStorage.getItem('token'),
        whitelistedDomains: ['localhost:3000', 'localhost:4200'],
        /*blacklistedRoutes: [
          'http://localhost:3000/api/v1/login',
          'http://localhost:3000/api/v1/register',
          'http://localhost:3000/api/v1/refresh',
          'http://localhost:4200/api/v1/login',
          'http://localhost:4200/api/v1/register',
          'http://localhost:4200/api/v1/refresh',
        ],*/
      },
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/v1/logs',
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { GlobalErrorHandler } from './services/globar-error.handler';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    AuthGuard,
    AdminGuard,
    MediaMatcher,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: NGXLogger, useClass: NGXLogger },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage },
  ],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

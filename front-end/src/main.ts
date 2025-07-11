import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(
      withInterceptors([authInterceptor]) // ✅ función, no clase
    )
  ]
}).catch(err => console.error(err));

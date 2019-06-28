// tslint:disable-next-line: no-reference
///<reference path="../node_modules/@types/node/index.d.ts" />

import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrModule } from '@angularclass/hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  // tslint:disable-next-line: no-string-literal
  if (module['hot']) {
    bootstrap().then(ngModuleRef => {
      return hmrModule(ngModuleRef, module);
    }).catch(err => console.error(err));
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}

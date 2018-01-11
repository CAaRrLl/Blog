import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
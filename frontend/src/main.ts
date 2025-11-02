import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LucideAngularModule, Shield, PanelLeft, NotebookPen } from 'lucide-angular';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(LucideAngularModule.pick({ Shield, PanelLeft, NotebookPen })) 
  ]
}).catch(err => console.error(err));

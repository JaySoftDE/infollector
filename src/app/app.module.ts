import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

/* Markdown & Syntax Highlighting */
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';

import { AppComponent } from './app.component';
import { MdRendererComponent } from './md-renderer/md-renderer.component';
import { MdSettingsComponent } from './md-settings/md-settings.component';
import { MdDefaultComponent } from './md-default/md-default.component';
import { MdErrorComponent } from './md-error/md-error.component';
import { MdDialogComponent } from './md-dialog/md-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MdRendererComponent,
    MdSettingsComponent,
    MdDefaultComponent,
    MdErrorComponent,
    MdDialogComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      // This enables external MD-files
      loader: HttpClient,
      // This prevents 'WARNING: sanitizing HTML stripped some content' messages
      sanitize: SecurityContext.NONE,
    }),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { 
      duration: 2500 
    }},
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { 
      hasBackdrop: true,
      autoFocus: 'first-tabbable',
    }},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { 
      appearance: 'standard', 
      floatLevel: 'always', 
      hideRequiredMarker: true 
    }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

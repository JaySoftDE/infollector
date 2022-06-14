import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdRendererComponent } from './md-renderer/md-renderer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

/* Markdown & Syntax Highlighting */
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    MdRendererComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MarkdownModule.forRoot({
      // This enables external MD-files
      loader: HttpClient,
      // This prevents 'WARNING: sanitizing HTML stripped some content' messages
      sanitize: SecurityContext.NONE,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

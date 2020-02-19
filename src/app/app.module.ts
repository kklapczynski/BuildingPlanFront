import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgInsteadOfHtmlComponent } from './svg-instead-of-html/svg-instead-of-html.component';
import { SvgPathOpacityDirective } from './directives/svg-path-opacity.directive';
import { SvgPathShowTitleIdDirective } from './directives/svg-path-show-title-id.directive';

@NgModule({
  declarations: [
    AppComponent,
    SvgInsteadOfHtmlComponent,
    SvgPathOpacityDirective,
    SvgPathShowTitleIdDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

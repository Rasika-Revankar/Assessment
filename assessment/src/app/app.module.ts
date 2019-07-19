import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CollapseModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { PipePipe } from './pipe/pipe.pipe';
import { LoadingComponent } from './loading/loading.component';
import { DetailService } from './service/detail.service';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    PipePipe,
    LoadingComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CollapseModule.forRoot()
  ],
  providers: [DetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

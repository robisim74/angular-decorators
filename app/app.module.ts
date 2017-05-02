import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { MyService } from './services/my.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        SharedModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [MyService],
    bootstrap: [AppComponent]
})
export class AppModule { }

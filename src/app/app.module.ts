import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table'; // Import the MatTableModule
import { MatSortModule } from '@angular/material/sort'; // Import the MatSortModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Import the MatPaginatorModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import the MatFormFieldModule


@NgModule({
  declarations: [AppComponent],
  imports: [MatTableModule,MatSortModule,MatPaginatorModule,MatFormFieldModule,BrowserModule,BrowserAnimationsModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule,ModalModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },],

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule    , 
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NoopAnimationsModule, 
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    
  
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

  bootstrap: [AppComponent],
})
export class AppModule { }

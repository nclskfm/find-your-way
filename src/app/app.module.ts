import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CsvUploadComponent } from './components/csv-upload/csv-upload.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './components/home/home.component';
import { InputComponent } from './components/input/input.component';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/loading/loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OutputComponent } from './components/output/output.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';
import { RoutePipe } from './core/pipes/route.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { LocationsListPipe } from './core/pipes/locations-list.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ContributionComponent } from './components/contribution/contribution.component';



@NgModule({
  declarations: [
    AppComponent,
    CsvUploadComponent,
    HomeComponent,
    InputComponent,
    LoadingComponent,
    NavBarComponent,
    OutputComponent,
    MapComponent,
    RoutePipe,
    RoutesListComponent,
    LocationsListPipe,
    ContributionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MaterialFileInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatDividerModule,
    GoogleMapsModule,
    MatTooltipModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

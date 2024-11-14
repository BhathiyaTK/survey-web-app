import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { MainComponent } from './pages/main/main.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CopyrightComponent } from './common/copyright/copyright.component';
import { CareerTestComponent } from './pages/main/career-test/career-test.component';
import { WelcomeComponent } from './pages/main/welcome/welcome.component';
import { DialogComponent } from './common/dialog/dialog.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PublicNavbarComponent } from './common/public-navbar/public-navbar.component';
import { PublicFooterComponent } from './common/public-footer/public-footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './pages/main/profile/profile.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MainComponent,
    NavbarComponent,
    CopyrightComponent,
    CareerTestComponent,
    WelcomeComponent,
    DialogComponent,
    LandingComponent,
    PublicNavbarComponent,
    PublicFooterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    DragDropModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    FontAwesomeModule,
    MatTooltipModule,
    HttpClientModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

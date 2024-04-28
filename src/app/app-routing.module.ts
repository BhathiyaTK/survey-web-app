import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MainComponent } from './pages/main/main.component';
import { CareerTestComponent } from './pages/main/career-test/career-test.component';
import { WelcomeComponent } from './pages/main/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    children: [{ path: 'sign-in', redirectTo: '', pathMatch: 'full' }],
  },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'career-test', component: CareerTestComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

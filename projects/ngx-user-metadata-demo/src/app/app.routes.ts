import { Routes } from '@angular/router';
import { userAuthenticatedGuard } from 'ngx-user-metadata';
import { LandingPageComponent } from './components/landing-page.component';
import { SignInComponent } from './components/sign-in.component';
import { UserMetadataComponent } from './components/user-metadata.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'user-metadata',
    component: UserMetadataComponent,
    canActivate: [userAuthenticatedGuard],
  },
  { path: '**', redirectTo: '' },
];

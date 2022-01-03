import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/registration/register.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ForbiddenComponent } from './components/pages/error/forbidden/forbidden.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { JobComponent } from './components/pages/job/job.component';
import { MetricsComponent } from './components/pages/metrics/metrics.component';
import { BuildComponent } from './components/pages/build/build.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'error/forbidden', component: ForbiddenComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:jobName', component: JobComponent },
  { path: 'jobs/:jobName/metrics', component: MetricsComponent },
  { path: 'jobs/:jobName/build/:buildNumber', component: BuildComponent },
];

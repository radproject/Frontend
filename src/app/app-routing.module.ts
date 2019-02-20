import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BrowseComponent } from './pages/forum/browse/browse.component';
import { ThreadComponent } from './pages/forum/thread/thread.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'forums', children: [
    { path: '', redirectTo: 'browse', pathMatch: 'full' },
    { path: 'browse', component: BrowseComponent },
    { path: 'thread/:id', component: ThreadComponent }
  ]},
  { path: 'auth', component: AuthComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

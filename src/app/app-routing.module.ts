import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TopicListComponent } from './pages/topics/topic-list/topic-list.component';
import { TopicItemComponent } from './pages/topics/topic-item/topic-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  //Topic browsing pages
  { path: 'topics', children: [
    { path: '', redirectTo: 'browse', pathMatch: 'full' },
    { path: 'browse', component: TopicListComponent },
    { path: '/:id', component: TopicItemComponent }
  ]},
  //Auth Pages
  { path: 'auth', component: AuthComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

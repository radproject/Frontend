import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToasterModule } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BrowseComponent } from './pages/forum/browse/browse.component';
import { ThreadComponent } from './pages/forum/thread/thread.component';
import { PostComponent } from './components/forum/post/post.component';
import { UserIconComponent } from './components/forum/user-icon/user-icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomepageComponent,
    BrowseComponent,
    ThreadComponent,
    PostComponent,
    UserIconComponent,
    LogoComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ToasterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

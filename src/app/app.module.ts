import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { ToasterModule } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LogoComponent } from './components/logo/logo.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TopicListComponent } from './components/topics/topic-list/topic-list.component';
import { TopicPageComponent } from './components/topics/topic-page/topic-page.component';
import { TopicPostComponent } from './components/topics/topic-post/topic-post.component';
import { BrowseComponent } from './pages/topics/browse/browse.component';
import { TopicItemComponent } from './pages/topics/topic-item/topic-item.component';
import { CommentComponent } from './components/comment/comment.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomepageComponent,
    LogoComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    TopicListComponent,
    TopicPageComponent,
    TopicPostComponent,
    BrowseComponent,
    TopicItemComponent,
    CommentComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ToasterModule.forRoot(),
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

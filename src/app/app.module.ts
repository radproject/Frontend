import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LogoComponent } from './components/logo/logo.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TopicItemComponent } from './pages/topics/topic-item/topic-item.component';
import { CommentComponent } from './components/comment/comment.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { TopicListComponent } from './pages/topics/topic-list/topic-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './services/notification/notification.service';
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
    TopicItemComponent,
    CommentComponent,
    TopicsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ToasterModule.forRoot(),
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NotificationService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

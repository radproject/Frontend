import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { ToasterModule } from 'angular2-toaster';

//State
import { NgxsModule } from '@ngxs/store';
import { UserState } from './ngxs/states/user.state';
import { TopicsState } from './ngxs/states/topics.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LogoComponent } from './components/logo/logo.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TopicItemComponent } from './pages/topics/topic-item/topic-item.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { TopicListComponent } from './pages/topics/topic-list/topic-list.component';
import { PostComponent } from './components/post/post.component';
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
    TopicsComponent,
    PostComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ToasterModule.forRoot(),
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      UserState,
      TopicsState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

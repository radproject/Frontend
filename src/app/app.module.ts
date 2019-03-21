import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';
import { ToasterModule, ToasterService } from 'angular2-toaster';

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
import { NotificationService } from './services/notification/notification.service';
import { TopicListItemComponent } from './components/topics/topic-list-item/topic-list-item.component';
import { Interceptor } from './services/htpp-interceptor.service';
import { CreateTopicModalComponent } from './components/create-topic-modal/create-topic-modal.component';
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
    TopicListItemComponent,
    CreateTopicModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ToasterModule.forRoot(),
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      UserState,
      TopicsState
    ]),
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [NotificationService, ToasterService, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateTopicModalComponent
  ]
})
export class AppModule { }

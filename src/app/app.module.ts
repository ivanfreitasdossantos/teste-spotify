import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscaComponent } from './busca/busca.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { PlayerComponent } from './detalhes/player/player.component';



@NgModule({
  declarations: [
    AppComponent,
    BuscaComponent,
    LoginComponent,
    DetalhesComponent,
    HeaderComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'albums', component: BuscaComponent, data: { animation: 'album' } },
      { path: 'album/:id', component: DetalhesComponent, data: { animation: 'albums' } }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

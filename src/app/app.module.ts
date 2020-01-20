import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PokemonsModule } from './pokemons/pokemons.module';
import { PokemonInterceptor } from './pokemons/pokemon-interceptor';
import { AuthGuard } from './auth-guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PokemonsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PokemonInterceptor, multi: true },

  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

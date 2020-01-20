import { MyTeamComponent } from './pokemons/my-team/my-team.component';
import { ConnexionComponent } from './pokemons/connexion/connexion.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { AuthGuard } from './auth-guard';


const routes: Routes = [
  {path: 'detail/:id', component: PokemonDetailComponent},
  {path: 'pokedex/:id', component: PokedexComponent},
  {path: 'pokedex', component: PokedexComponent},
  {path: 'pokemons', component: PokemonListComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'my-team', component: MyTeamComponent,  canActivate: [AuthGuard]},
  {path: '', redirectTo: '/pokedex', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

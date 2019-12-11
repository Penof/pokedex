import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';


const routes: Routes = [
  {path: 'detail/:id', component: PokemonDetailComponent},
  {path: 'pokemons', component: PokemonListComponent},
  {path: '', redirectTo: '/pokemons', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

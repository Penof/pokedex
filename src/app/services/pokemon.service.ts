import { PagedData } from './../models/paged-data.model';
import { Pokemon } from '../models/pokemon.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetailPokemon } from '../models/detail-pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  constructor(private httpClient: HttpClient) { }

  getPokemons(pagination: PagedData<Pokemon>): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + '/pokemons?offset=' + pagination.offset + '&limit=' + pagination.limit;
    return this.httpClient.get<PagedData<Pokemon>>(url);
  }

  getAllPokemons(pagination: PagedData<Pokemon>): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + '/pokemons?offset=0' + '&limit=' + pagination.limit;
    return this.httpClient.get<PagedData<Pokemon>>(url);
  }

  getPokemonById(id: number): Observable<DetailPokemon> {
    const url = this.pokemonUrl + '/pokemons/' + id;
    return this.httpClient.get<DetailPokemon>(url);
  }

  getPokemonWithSearch(search: string): Observable<PagedData<Pokemon>> {
    const url = this.pokemonUrl + '/pokemons?search=' + search;
    return this.httpClient.get<PagedData<Pokemon>>(url);
  }
}

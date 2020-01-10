import { PagedData } from './../models/paged-data.model';
import { Pokemon } from '../models/pokemon.model';
import { Identifiants } from '../models/identifiants.model';
import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DetailPokemon } from '../models/detail-pokemon.model';
import { catchError } from 'rxjs/operators';

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

  connexion(identifiants: Identifiants): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.httpClient.post(this.pokemonUrl + '/auth/login', identifiants, httpOptions);
  }

  getMyTeam(): Observable<number[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access_token')})
    };
    const url = this.pokemonUrl + '/trainers/me/team';
    return this.httpClient.get<number[]>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  refreshToken() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.httpClient.post(this.pokemonUrl + '/auth/refresh', localStorage.getItem('refresh_token'), httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

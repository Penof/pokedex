import { PagedData } from './../../models/paged-data.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pagination: PagedData<Pokemon> = {
    data: [],
    limit: 20,
    offset: 0
  };

  @Output() messageEvent = new EventEmitter<number>();

  constructor(private pokemonService: PokemonService, private router: Router) { }

  sendMessage(id: number) {
    this.messageEvent.emit(id);
  }

  ngOnInit() {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokemonService.getAllPokemons(this.pagination).subscribe(result => this.pagination.data = result.data);
  }

  getPokemons() {
    this.pokemonService.getPokemons(this.pagination).subscribe(result => this.pagination.data = result.data);
  }

  next() {
    this.pagination.offset = this.pagination.offset - this.pagination.limit;
    this.getPokemons();
  }

  detail(pokemon: Pokemon) {
    this.router.navigate(['/pokedex/' + pokemon.id]);
    this.sendMessage(pokemon.id);
  }

  onScroll() {
    this.pagination.limit = this.pagination.limit + 10;
    this.getAllPokemons();
  }

  searchPokemons(event: any) {
    if (event.target.value !== '') {
      this.pokemonService.getPokemonWithSearch(event.target.value).subscribe(result => this.pagination.data = result.data);
    } else {
      this.getAllPokemons();
    }
  }
}

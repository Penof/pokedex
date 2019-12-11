import { PagedData } from './../../models/paged-data.model';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

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


  constructor(private pokemonService: PokemonService) { }

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
    this.pagination.offset = this.pagination.offset + this.pagination.limit;
    this.getPokemons();
  }

  prev() {
    this.pagination.offset = this.pagination.offset - this.pagination.limit;
    this.getPokemons();
  }

  onScroll() {
    this.pagination.limit = this.pagination.limit + 10;
    this.getAllPokemons();
  }

}

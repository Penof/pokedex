import { Routes, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { DetailPokemon } from 'src/app/models/detail-pokemon.model';
import { PagedData } from 'src/app/models/paged-data.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  team: DetailPokemon[];
  listeIds: number[] = [];
  selectedPokemonId: number;
  pagination: PagedData<Pokemon> = {
    data: [],
    limit: 20,
    offset: 0
  };

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    this.myteam();
    this.pokemonService.getAllPokemons(this.pagination).subscribe(result => this.pagination.data = result.data);
  }

  supprimer(id: number) {
    this.listeIds.splice(this.listeIds.indexOf(id), 1);
    this.pokemonService.setMyTeam(this.listeIds).subscribe( res => {
      this.myteam();
    });
  }

  ajouter() {
    if (this.listeIds.length < 6) {
      this.listeIds.push(this.selectedPokemonId);
      this.pokemonService.setMyTeam(this.listeIds.sort((a, b) => a - b)).subscribe( res => {
        this.myteam();
      });
    }
  }

  myteam() {
    if (this.listeIds.length === 0) {
      this.team = [];
    }
    this.pokemonService.getMyTeam().subscribe(res => {
      const tableauService = [];
      res.forEach(id => {
          tableauService.push(this.pokemonService.getPokemonById(id));
      });
      forkJoin(tableauService).subscribe(result => {
        this.team = [];
        this.listeIds = [];
        this.team = result;
        this.team.forEach(element => {
          this.listeIds.push(element.id);
        });
      });
    });
  }

  retour() {
    this.router.navigate(['/pokedex']);
  }

  OnPokemonSelected(option: MatOption) {
    // tslint:disable-next-line:radix
    this.selectedPokemonId = parseInt(option.id);
  }

  searchPokemons(event: any) {
    if (event.target.value !== '') {
      this.pokemonService.getPokemonWithSearch(event.target.value).subscribe(result => this.pagination.data = result.data);
    } else {
      this.pokemonService.getAllPokemons(this.pagination).subscribe(result => this.pagination.data = result.data);
    }
  }

  deconnexion() {
    localStorage.clear();
    this.router.navigate(['/connexion']);
  }
}

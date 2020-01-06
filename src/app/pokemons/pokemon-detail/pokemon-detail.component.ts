import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { DetailPokemon } from 'src/app/models/detail-pokemon.model';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute, private router: Router) { }

  detail: DetailPokemon;
  id: number;

  @Input()
  set name(name: number) {
    this.id = name;
    this.getPokemon();
  }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemonById(this.id).subscribe(res => this.detail = res);
  }

  play(input: any) {
    input.play();
  }

  goBack() {
    this.router.navigate(['/pokemons']);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { DetailPokemon } from 'src/app/models/detail-pokemon.model';
import { NumberValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute, private router: Router) { }

  detail$: Observable<DetailPokemon>;
  id: number;

  @Input()
  set name(id: number) {
    this.id = id;
    this.getPokemon();
  }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getPokemon();
  }

  getPokemon() {
    this.detail$ = this.pokemonService.getPokemonById(this.id);
  }


  goBack() {
    this.router.navigate(['/pokemons']);
  }
}

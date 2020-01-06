import { Identifiants } from './../../models/identifiants.model';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  identifiants: Identifiants = {
    email: '',
    password: '',
  };

  tokens: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  connexion(email, password) {
    this.identifiants.email = email;
    this.identifiants.password = password;
    this.pokemonService.connexion(this.identifiants).subscribe(res => {
      this.tokens = res;
      localStorage.setItem('access_token', this.tokens.access_token);
      localStorage.setItem('refresh_token', this.tokens.refresh_token);
      localStorage.setItem('expires_in', this.tokens.expires_in);
    },
    error => console.log(error));

  }

  myteam() {
    this.pokemonService.getMyTeam().subscribe(res => console.log(res));
  }
}

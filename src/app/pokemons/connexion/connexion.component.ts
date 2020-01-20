import { Identifiants } from './../../models/identifiants.model';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  connexionForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl(),
  });

  tokens: any;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
  }

  connexion() {
    this.identifiants.email = this.connexionForm.get('email').value;
    this.identifiants.password = this.connexionForm.get('password').value;
    this.pokemonService.connexion(this.identifiants).subscribe(res => {
      this.tokens = res;
      localStorage.setItem('access_token', this.tokens.access_token);
      localStorage.setItem('refresh_token', this.tokens.refresh_token);
      localStorage.setItem('expires_in', this.tokens.expires_in);
      this.router.navigate(['/my-team']);
    },
    error => console.log(error));

  }

  retour() {
    this.router.navigate(['/pokedex']);
  }
}

import { Identifiants } from './../../models/identifiants.model';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private pokemonService: PokemonService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  connexion() {
    this.identifiants.email = this.connexionForm.get('email').value;
    this.identifiants.password = this.connexionForm.get('password').value;
    this.pokemonService.connexion(this.identifiants).subscribe(res => {
      this.tokens = res;
      const expire = new Date();
      expire.setSeconds(expire.getSeconds() + Number(this.tokens.expires_in));
      this.cookieService.set('access_token', this.tokens.access_token, expire);
      console.log(this.cookieService.get('access_token'));
      this.router.navigate(['/my-team']);
    },
    error => console.log(error));

  }

  retour() {
    this.router.navigate(['/pokedex']);
  }
}

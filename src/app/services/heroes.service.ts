import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../../assets/models/heroe.model';
import { map, delay } from 'rxjs/operators';







@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroapp-2cddb.firebaseio.com';

  constructor( private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel ): any {

    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(map((resp: any) => {
      heroe.id = resp.name;
      return heroe; }));
  }

  actualizarHeroe( heroe: HeroeModel ): any {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put( `${this.url}/heroes/${heroe.id}.json`, heroeTemp );
  }


  borrarHeroe( id: string): any{
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }



  getHeroe( id: string ): any {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }


  getHeroes(): any {

    return this.http.get(`${this.url}/heroes.json`)
      .pipe(map( resp => this.crearArreglo(resp)), delay(700));

  }

  private crearArreglo( heroesObj: object ): any {

    const heroes: HeroeModel[] = [];

    // console.log(heroesObj);

    if ( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach ( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }




}

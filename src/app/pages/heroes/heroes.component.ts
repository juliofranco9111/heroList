import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../../assets/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): any {

    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe((resp: any) => {
        // console.log( resp );
        this.heroes = resp;
        this.cargando = false;
      });
  }

  borrarHeroe(heroe: HeroeModel, i: number): any {

    Swal.fire({
      title: 'Are you sure?',
      text: `This action will delete to "${heroe.nombre}"`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        Swal.showLoading();
        this.heroes.splice(i, 1);

        this.heroesService.borrarHeroe(heroe.id).subscribe();

        Swal.fire({
          text: 'Hero deleted successfully',
          icon: 'success'
        });

      }
    });



  }

}

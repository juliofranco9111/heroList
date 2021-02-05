import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HeroeModel } from '../../../assets/models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    // console.log(id);

    if( id !== 'nuevo' ){
      this.heroesService.getHeroe(id)
        .subscribe( ( resp: HeroeModel ) =>{
          // console.log( resp)
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
  }

  guardar(form: NgForm): any {

    if (form.invalid){
      console.log('Form invalid');
      return;
    }

    Swal.fire({
      title: 'Wait a few seconds',
      text: 'Saving information',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    // console.log(form);
    console.log(this.heroe);

    if ( this.heroe.id ){
      peticion = this.heroesService.actualizarHeroe( this.heroe );
    }else{
      peticion = this.heroesService.crearHeroe( this.heroe );
    }


    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Hero stored successfully',
        icon: 'success'
      });
    });

  }



}

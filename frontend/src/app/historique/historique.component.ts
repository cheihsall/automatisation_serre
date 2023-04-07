import { RealtimeService } from './../realtime.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import * as _ from 'lodash';
/* import { Historique } from 'model/historique'; */
import { Historique } from '../model/historique';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit{
  temperature: any;
  humserre: any;
  lumiere: any;
  humsol: any;
  Date=new Date();
  totalLenght: any; // pagination
  page : number=1; // pagination
  updateForm!: FormGroup;
  filterTerm!: string;// pagination
  donne8h! : any;
  donne12h!:any;
  donne19h!:any;
  filter_entree!: Historique[]; // pour filtrer l'affichage de l'historique
  restaure!: Historique[]; // pour faire revenir la liste une fois le filtre est effacé

    constructor(

    private RealtimeService: RealtimeService

    ){}

  ngOnInit(){
   this.RealtimeService.gethisto().subscribe((data) => { // pour l'historique
    console.log(data);
    this.filter_entree=data as unknown as Historique[]
    this.restaure=data as unknown as Historique[]
    console.log(this.filter_entree);

   })
    /* console.log(this.filter_entree) */

  }

//recherche par calendrier

    calend(e:any) {
      const search = new Date(e.target.value)
      console.log(e.target.value)
      if (e.target.value == '') { // pour vider la recherche et restaurer la liste
        this.filter_entree = this.restaure as unknown as Historique[]
        return
      }


      this.filter_entree = this.filter_entree.filter((el:any) => { // pour filtrer la recherche
        const date = new Date(el.date)

        console.log(date.getFullYear(), search.getFullYear(), search.getMonth(), search.getDate())

        return date.getFullYear() === search.getFullYear() && date.getMonth() === search.getMonth() && date.getDate() === search.getDate();
      })


    }


}














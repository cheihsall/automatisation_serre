import { RealtimeService } from './../realtime.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import * as _ from 'lodash';
import { Historique } from 'model/historique';

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
  filter_entree!: Historique[];

    constructor(

    private RealtimeService: RealtimeService

    ){}

  ngOnInit(){
   this.RealtimeService.gethisto().subscribe((data) => {
    console.log(data);
    this.filter_entree=data as unknown as Historique[]
   })
    /* console.log(this.filter_entree) */


  }


//recherche par calendrier
  calend(e:any)
    {
      console.log(e.target.value)
      if (e.target.value == ''){
        this.filter_entree = this.filter_entree as unknown as Historique[]
        return
      }
      this.filter_entree = this.filter_entree.filter((el:any)=>{
        console.log(e.target.value.toLowerCase() + 1);


        return el.Date.toLowerCase().includes(e.target.value.toLowerCase())
      })
    }

}















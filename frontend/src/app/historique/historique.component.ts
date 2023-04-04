import { donnee } from './../test';
import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})


export class HistoriqueComponent implements OnInit{
  temperature: any;
  humidite: any;
  lumiere: any;
  humsol: any;
  Date=new Date();
  filter_entree!: any;
  totalLenght: any; // pagination
  page : number=1; // pagination
  updateForm!: FormGroup;
  filterTerm!: string;// pagination
  donne8h! : any;
  donne12h!:any;
  donne19h!:any;



  ngOnInit(){
   this.filter_entree=donnee;
    console.log(this.filter_entree)


  }


//recherche par calendrier
  calend(e:any)
    {
      console.log(e.target.value)
      if (e.target.value == ''){
        this.filter_entree = donnee
        return
      }
      this.filter_entree = this.filter_entree.filter((el:any)=>{
        console.log(e.target.value.toLowerCase() + 1);


        return el.Date.toLowerCase().includes(e.target.value.toLowerCase())
      })
    }

}














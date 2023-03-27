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
  /* last_week!:string;
  semaine!:any;
  sem8h!:any;
  sem12h! : any;
  sem19h!:any
  date!: Date;
  currentDate!: any;
  moyTemp!: number;
  moyHum!: number;
  historique: any;
  temp8h:any;
  temp12h:any;
  temp19h:any;
  hum8h:any;
  hum12h:any;
  hum19h:any;
  lum8h:any;
  lum12h:any;
  lum19h:any;
  humsol8h:any;
  humsol12h:any;
  humsol19h:any;
  moyT!: number;
  moyH!: number;
  mois!:number;
  jour!:number;
 */


  ngOnInit(){
   this.filter_entree=donnee;
    console.log(this.filter_entree)
//calcul de la date et l'heure
     // coté historique de la semaine

    /*  this.date = new Date(); // date
     var jour= this.date.getDate(); //renvoie le chiffre du jour du mois
     var mois = this.date.getMonth() + 1; //le mois en chiffre
     var annee = this.date.getFullYear(); // me renvoie en chiffre l'annee
     if (mois < 10) { mois = 0 + mois; } // si le jour est <10 on affiche 0 devant
     if (jour < 10) { jour = 0 + jour; } // si le mois est <10 on affiche 0 devant
     this.last_week = jour + '/' + mois + '/' + annee;
 */

         //this.authService.gethisto().subscribe(data => {
           // affichage de la journée
          /*  this.currentDate = ('0'+new Date().getDate()) + '/' + ('0'+(new Date().getMonth()+1)) + '/'+  new Date().getFullYear(); */
    // this.historique=data as unknown as Iot[];
     //console.log(this.historique)
     /* this.donne8h= this.historique.filter((h:any)=>h.Heure=='08:00:00' && h.Date==this.currentDate) */
     /* console.log(this.donne8h)*/
   /*   this.donne12h= this.historique.filter((h:any)=>h.Heure=='12:00:00' && h.Date==this.currentDate)
     this.donne19h= this.historique.filter((h:any)=>h.Heure=='19:00:00' && h.Date==this.currentDate)
 */


     // calcul de la moyenne journalière
          /*  this.moyTemp = (parseInt(String(this.temp8h)) + parseInt(String(this.temp12h))) + parseInt(String(this.temp19h)) / 3;
           this.moyHum = (parseInt(String(this.hum8h)) + parseInt(String(this.hum12h)) + parseInt(String(this.hum19h))) / 3;

         this.moyT= (Math.round(this.moyTemp*100)/100)+0;
          this.moyH= (Math.round(this.moyHum*100)/100)+0; */

           // fin
/*
     this.semaine= this.historique.filter((h:any)=>h.Date!=this.last_week)

     this.sem8h=this.semaine.filter((s:any)=>s.Heure == '08:00:00');
     this.sem12h=this.semaine.filter((s:any)=>s.Heure == '12:00:00')
     this.sem19h=this.semaine.filter((s:any)=>s.Heure == '19:00:00')

     this.filter_entree=this.semaine
     this.filter_entree = _.uniqBy(this.filter_entree, 'Date')

*/

  }




//recherche par calendrier
  calend(e:any)
    {
      console.log(e.target.value)
      this.filter_entree = this.filter_entree.filter((el:any)=>{
return el.Date.toLowerCase().includes(e.target.value.toLowerCase())
      })
    }

}











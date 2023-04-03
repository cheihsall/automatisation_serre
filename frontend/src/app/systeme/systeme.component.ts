import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../realtime.service';


@Component({
 selector: 'app-systeme',
 templateUrl: './systeme.component.html',
 styleUrls: ['./systeme.component.scss']
})
export class SystemeComponent implements OnInit {
 constructor(private socketService:RealtimeService){


 }
 /* déclaration des images utilisés dans le Systémes */
 imgOuvert='assets/ouvert.png'; // porte ouvert
 imgFermer='assets/fermerr.jpg'; //porte Fermer
 imageSrc = 'assets/extract.png'; //image de l'extracteur d'air
 imgtomate ='assets/tomate.jpg'; //image de la plante Tomate
 imgOignon ='assets/oignon.webp'; //image de la plante Oignon
 imgpompe ='assets/pompe.jpeg'; //image de la pompe qui gére l'arrosage par défaut
 imgpompegif ='assets/pompe.gif'; //image gif de la pompe

 temperature: any
 humidity: any 
 /* déclaration des Etats activé et désactivé des boutons */
 clicked = false; //active/désactive bouton ouverture fenetre
 clicke =true; //active/désactive bouton fermeture fenetre


 clickedA=false; //active/désactive bouton ouverture Extracteur
 clickeE=true;  //active/désactive bouton fermeture Extracteur


 cArrose=false;//active/désactive bouton Arrosage
 cArreter=true;//active/désactive bouton Arreter


/* recupération des images du systéme sous forme de tableau */
 imageButtons = [ {src:'assets/extract.png', srcs:'', srcr :''}];
 imageButtonOn = [ {src:'assets/extracteur.gif',  srcr:'', srcs : ''}];


 imageFermer = [ {src:'assets/fermerr.jpg', srcs:'', srcr :''}];
 imageOuvert = [ {src:'assets/openserre.webp',  srcr:'', srcs : ''}];


 imageArroser = [ {src:'assets/pompe.gif', srcs:'', srcr :''}];
 imageArreter = [ {src:'assets/pompe.jpeg',  srcr:'', srcs : ''}];


 imageArroT = [ {src:'assets/pompe.gif', srcs:'', srcr :''}];
 imagetomate = [ {src:'assets/tomate.jpg',  srcr:'', srcs : ''}];


 imageArrosO = [ {src:'assets/pompe.gif', srcs:'', srcr :''}];
 imageArreterO = [ {src:'assets/oignon.webp',  srcr:'', srcs : ''}];







 ngOnInit(): void {


 }
 /*Fonction pour Extracteur d'aire  */
Allumer(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imageSrc = imageNameObject.src;
   this.socketService.Allumer()


 }
 Eteindre(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imageSrc = imageNameObject.src;
   this.socketService.Eteindre()
 }
 /*Fonction  pour Toit  */
 ouverture(imageNameObject: { srcr: string; srcs: string; src: string;}) {


   this.imgFermer = imageNameObject.src;
     this.socketService.ouverture()
 }
 Fermeture(imageNameObject: { srcr: string; srcs: string; src: string;}) {


   this.imgFermer = imageNameObject.src;
     this.socketService.Fermeture()
 }
 /* Fonction pour arrosage par défaut */
 arrose(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgpompe = imageNameObject.src;
   this.socketService. arroser()
 }
 /*  */
 arreter(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgpompe = imageNameObject.src;
   this.socketService.arreter()
 
 }
 arroseTomate(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this. imgtomate= imageNameObject.src;
   this.socketService. arroseTomate()
 }
 arretomate(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this. imgtomate= imageNameObject.src;
   this.socketService.arretomate ()


 }
 arroseOignon(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgOignon= imageNameObject.src;
   this.socketService.arroseOignon()


 }
 arretOignon(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgOignon= imageNameObject.src;
   this.socketService.arretOignon()


 }
}


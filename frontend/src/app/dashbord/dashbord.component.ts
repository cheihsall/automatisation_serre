
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { donnee } from './../test2';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})

export class DashbordComponent  {

  profileForm!:FormGroup
 temperature: any;
  humidite: any;
  lumiere: any;
  humsol: any;


  submitted=false;
  invalid = false;
  //champs ancien mot de passe
  inputType:any = "password";
  inputType_txt = 0;
  inputType_pwd = 1;
  //champs nouveau mot de passe
  inputType_nouveau:any = "password";
  inputType_nouveau_txt = 0;
  inputType_nouveau_pwd = 1;
  //champs confirmation nouveau mot de pass
  inputType_confirm:any = "password";
  inputType_confirm_txt = 0;
  inputType_confirm_pwd = 1;


    pass: string = '';
  filter_entree:any;
    constructor(
       public formBuilder: FormBuilder, private router: Router ) {
      this.profileForm = this.formBuilder.group({

        actuelPass:['',[Validators.required ]],
        newPass:['',[Validators.required]],
       newPasswordconfirm:['', [Validators.required]],

    }
    )
    }
    destroy(){
      localStorage.removeItem('token');
this.router.navigateByUrl('/')
    }

    ngOnInit(): void {this.filter_entree=donnee;
      console.log(this.filter_entree)

   }


    passeIdentique(){
      if ( (this.profileForm.value.newPass != this.profileForm.value.newPasswordconfirm ) || (this.profileForm.value.newPasswordconfirm == '')) {
        this.invalid = true;
      }
      else{
        this.invalid = false;
      }

    }

    onSubmite(){

      this.submitted = true;
      this.passeIdentique();
      if(this.profileForm.invalid){
        return;
      }
    }

    reset() {
      this.ngOnInit();
      location.reload();
    }

    }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }


  submit() {
    if (this.form.valid) {
      
 
      this.utilsSvc.presentLoading({ message: 'Autenticando...' });
      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(async res => {
        console.log(res);

        this.utilsSvc.setElementInLocalStorage('user', this.form.value.email);
        this.utilsSvc.routerLink('/inicio/home');

        this.utilsSvc.dismissLoading();

        this.utilsSvc.presentToast({
          message: 'Correo enviado, revisa tu bandeja de entrada o spam',
          duration: 1500,
          color: 'success',
          icon: 'mail-outline'
        })

        this.form.reset();
      }, error => {
        this.utilsSvc.presentToast({
          message: error,
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
        this.utilsSvc.dismissLoading();
      });
    }
  }
}

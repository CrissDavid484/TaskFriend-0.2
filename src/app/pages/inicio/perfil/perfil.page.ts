import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  user = {} as user;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }
    //==== Tomar/Seleccionar  imagen ===
    async takeImage() {
      try {
        const photo = await this.utilsSvc.takePicture('Imagen de perfil');
        if (photo) {
          this.user.img = photo.dataUrl;
          this.utilsSvc.setElementInLocalStorage('user', this.user);
          await this.uploadImageToFirebase(photo.dataUrl);
        }
      } catch (error) {
        console.log('User cancelled the action');
      }
    }
  
    async uploadImageToFirebase(imageDataUrl: string) {
      const user: user = this.utilsSvc.getElementFromLocalStorage('user');
      const path = `users/${user.uid}/iperfil/${user.uid}`;
      const imageObject = { img: imageDataUrl };
  
      try {
        await this.firebaseSvc.updateDocument(path, imageObject);
        console.log('Imagen subida exitosamente');
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    return this.user = this.utilsSvc.getElementFromLocalStorage('user')
  }

  signOut() {
    this.utilsSvc.presentAlert({
      header: 'Cerrar Sesión',
      message: '¿Quieres cerrar Sesión?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Sí, Cerrar',
          handler: () => {
            this.firebaseSvc.signOut();
          }
        }
      ]
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AgregarActualizarTaskComponent } from 'src/app/compartido/componentes/agregar-actualizar-task/agregar-actualizar-task.component';
import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user = {} as user
  tasks: Task[] = []
  loading: boolean = false;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getTask();
    this.getUser();
  }

  getUser() {
    return this.user = this.utilsSvc.getElementFromLocalStorage('user')
  }

  getPercentage(task: Task) {
    return this.utilsSvc.getPercentage(task);
  }

  async addOrUpdateTask(task?: Task) {
    let res = await this.utilsSvc.presentModal({
      component: AgregarActualizarTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal'
    })

    if (res && res.success) {
      this.getTask();
    }
  }

  getTask() {
    let user: user = this.utilsSvc.getElementFromLocalStorage('user');
    let path = `users/${user.uid}`;

    this.loading = true;

    let sub = this.firebaseSvc.getSubcollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        console.log(res);
        this.tasks = res;
        sub.unsubscribe();
        this.loading = false;
      }
    })
  }
  confirmDeleteTask(task: Task) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Tarea',
      message: '¿Quieres eliminar esta tarea?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Sí, eliminar',
          handler: () => {
            this.deleteTask(task);
          }
        }
      ]
    })
  }


  deleteTask(task : Task) {
    let path = `users/${this.user.uid}/tasks/${task.id}`;

    this.utilsSvc.presentLoading({
      duration: 1500
    });

    this.firebaseSvc.deleteDocument(path).then(res => {


      this.utilsSvc.presentToast({
        message: 'Tarea eliminada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })

      this.getTask();
      this.utilsSvc.dismissLoading()
    }, error => {

      this.utilsSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })

      this.utilsSvc.dismissLoading()

    })
  }

}

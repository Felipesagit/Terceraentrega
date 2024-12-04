import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ConsumoApiService } from '../service/consumoapi.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  now: Date = new Date(); 
  nombre: string = ''; 
  fecha: string = this.now.toLocaleString(); 

  constructor(private router: Router, private alertController: AlertController, consumoapi: ConsumoApiService) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];
    }
  }

  salirAplicacion() {
    this.router.navigate(['/login']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Activa tu ubicación',
      message: 'Debes activar tu ubicación para poder registrar tu asistencia',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.router.navigate(['/qralumno']);
          },
        },
      ],
    });

    await alert.present();
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as L from 'leaflet'; // Importar Leaflet aquí

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit, AfterViewInit {

  now: Date = new Date();
  nombre: string = '';
  fecha: string = this.now.toLocaleString();

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    // Inicialización de variables si es necesario
    this.nombre = localStorage.getItem('nombre')!;
  }

  ngAfterViewInit() {
    this.mostrarMapaConUbicacion();
  }

  mostrarMapaConUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Inicializar el mapa
          const map = L.map('map').setView([lat, lng], 13); // Ajusta la vista del mapa a la ubicación obtenida

          // Cargar los tiles (fondo del mapa)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          // Colocar un marcador en la ubicación
          const marker = L.marker([lat, lng]).addTo(map)
            .bindPopup('Tu ubicación actual')
            .openPopup();
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            this.mostrarAlertActivarUbicacion();
          } else {
            alert('No se pudo obtener la ubicación. Error: ' + error.message);
          }
        }
      );
    } else {
      alert('Geolocalización no soportada.');
    }
  }

  async mostrarAlertActivarUbicacion() {
    const alert = await this.alertController.create({
      header: 'Activar ubicación',
      message: 'Parece que no tienes activada la geolocalización. ¿Quieres activarla?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El usuario canceló la activación de ubicación');
          },
        },
        {
          text: 'Activar',
          handler: () => {
            console.log('El usuario desea activar la ubicación');
            this.router.navigate(['/configuracion-ubicacion']); // Redirige a una página de configuración, si tienes una
          },
        },
      ],
    });

    await alert.present();
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

import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ConsumoApiService } from '../service/consumoapi.service'; // Importa tu servicio
import { ServiceguardService } from '../service/serviceguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  


  constructor(
    private router: Router, 
    private alertController: AlertController,
    private consumoApi: ConsumoApiService,
    private serviceGuard: ServiceguardService
    ) { } 

  usuario = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  });

  async navegarExtras() {

    const user = this.usuario.get('user')?.value ?? ''; 
    const pass = this.usuario.get('pass')?.value ?? ''; 
    this.consumoApi.login(user, pass).subscribe(response => {
      console.log("Respuesta del servidor:", response);
  
      localStorage.setItem('token', response.token); // Almacenar el token
      localStorage.setItem('role', response.role);
      localStorage.setItem('id_profesor', response.id_profesor.toString());   // Almacenar el rol

      
      if (response.role === 'docente') {
          this.serviceGuard.isLoggedIn();
          this.router.navigate(['/docente'], { state: { nombre: response.nombre, id_profesor: response.id_profesor} });
      } else if (response.role === 'alumno') {
          this.serviceGuard.isLoggedIn();
          this.router.navigate(['/alumno'], { state: { nombre: response.nombre} });
      } else {
          this.presentAlert('Perfil no reconocido');
      }
    }, error => {
      console.error("Error en login:", error);
      this.presentAlert('Credenciales incorrectas');
    });
  
    
 
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {}

  salirAplicacion() {
    this.router.navigate(['/login']);
  }
}

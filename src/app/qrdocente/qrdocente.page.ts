import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoApiService } from '../service/consumoapi.service';
import { HttpClient } from '@angular/common/http';
import * as QRCode from 'qrcode';  // Importación correcta

@Component({
  selector: 'app-qrdocente',
  templateUrl: './qrdocente.page.html',
  styleUrls: ['./qrdocente.page.scss'],
})
export class QrdocentePage implements OnInit {

  nombre: string = '';
  codigo: string = '';
  seccion: string = '';
  id_profesor: string = '';
  id_curso: string = '';

  alumnos: any[] = [];
  qrCodeUrl: string = '';  // Variable para almacenar la URL del QR

  constructor(
    private router: Router,
    private consumoapi: ConsumoApiService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];
      this.codigo = navigation.extras.state['codigo'];
      this.seccion = navigation.extras.state['seccion'];
      this.id_profesor = String(navigation.extras.state['id_profesor']);
      this.id_curso = String(navigation.extras.state['id_curso']);
      this.mostrarAlumno();
      this.generarQR();  // Generar el QR al iniciar
    }
  }

  public mostrarAlumno() {
    this.consumoapi.ObtenerAlumnos(parseInt(this.id_profesor), parseInt(this.id_curso)).subscribe((res: any) => {
      this.alumnos = res;
    });
  }

  public async generarQR() {
    const qrData = JSON.stringify({
      id_curso: this.id_curso,
      estado: 'activo'
    });

    try {
      // Generamos el QR y lo asignamos a la variable qrCodeUrl
      const url = await QRCode.toDataURL(qrData);  // Usamos await aquí para obtener el URL
      this.qrCodeUrl = url;  // Guardamos la URL base64 del QR generado
    } catch (err) {
      console.error('Error al generar el QR', err);
    }
  }

  salirAplicacion() {
    this.router.navigate(['/login']);
  }

  Volver() {
    this.router.navigate(['/docente']);
  }
}

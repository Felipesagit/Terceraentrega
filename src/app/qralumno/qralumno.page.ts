import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';  // Importa BarcodeFormat desde zxing
import { HttpErrorResponse } from '@angular/common/http';
import { ConsumoApiService } from '../service/consumoapi.service';

@Component({
  selector: 'app-qralumno',
  templateUrl: './qralumno.page.html',
  styleUrls: ['./qralumno.page.scss'],
})
export class QralumnoPage {

  constructor(private router: Router, private consumoApi: ConsumoApiService) { }

  qrResultString: string = '';  // Variable para almacenar el resultado del QR
  barcodeFormat = BarcodeFormat;  // Asigna BarcodeFormat a una variable para usar en el HTML
  selectedDevice: MediaDeviceInfo | undefined;  // Usamos directamente MediaDeviceInfo

  // Esto es lo que se llama cuando se escanea un QR
  // Esto es lo que se llama cuando se escanea un QR
onScanSuccess(result: string) {
  try {
    // Recuperar el id_usuario del almacenamiento local
    const nombre = localStorage.getItem('nombre');

    if (!nombre) {
      throw new Error('nombre de usuario no disponible en localStorage');
    }

    // Parsear los datos del QR
    const qrData = JSON.parse(result);

    console.log(qrData);

    // Agregar el id_usuario al objeto QR
    qrData.nombre = nombre;

    // Validar que los datos necesarios estén presentes
    if (!qrData.nombre || !qrData.id_curso || !qrData.estado) {
      throw new Error('QR inválido: faltan datos obligatorios');
    }

    console.log('Datos extraídos del QR (con id_usuario agregado):', qrData);

    // Actualizar estado del alumno
    this.actualizarEstadoAlumno(qrData.id_curso, qrData.estado, qrData.nombre );
  } catch (error) {
    console.error('Error al procesar el QR:', error);
  }
}



  // Método para actualizar el estado del alumno
  actualizarEstadoAlumno(cursoId: number, nuevoStatus: string, nombre: string) {
    const payload = { id_curso: cursoId, estado: nuevoStatus, nombre: nombre };

    console.log("Datos enviados al backend:", payload); // Depuración

    this.consumoApi.actualizarEstadoAlumno(payload.id_curso, payload.estado, payload.nombre).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response.message);
        this.qrResultString = response.message;
      },
      (error) => {
        console.error('Error en la actualización:', error.message);
      }
    );
  }

  Volver() {
    // Lógica para el botón "Volver"
    this.router.navigate(['/alumno']);
  }

  salirAplicacion() {
    // Lógica para el botón "Salir"
    this.router.navigate(['/login']);
  }

  // Método para seleccionar un dispositivo, se usa para la propiedad selectedDevice
  selectDevice(device: MediaDeviceInfo) {
    this.selectedDevice = device || undefined;  // Asignar undefined si no hay dispositivo
  }
}

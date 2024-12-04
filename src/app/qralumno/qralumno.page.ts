import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';  // Importa BarcodeFormat desde zxing

@Component({
  selector: 'app-qralumno',
  templateUrl: './qralumno.page.html',
  styleUrls: ['./qralumno.page.scss'],
})
export class QralumnoPage {

  constructor(private router : Router) { }

  qrResultString: string = '';  // Variable para almacenar el resultado del QR
  barcodeFormat = BarcodeFormat;  // Asigna BarcodeFormat a una variable para usar en el HTML

  // Declaración de selectedDevice con el tipo adecuado
  selectedDevice: MediaDeviceInfo | undefined;  // Usamos directamente MediaDeviceInfo

  // Esto es lo que se llama cuando se escanea un QR
  onScanSuccess(result: string) {
    this.qrResultString = result;
  }

  Volver() {
    // Lógica para el botón "Volver"
    this.router.navigate(['/alumno'])
  }

  salirAplicacion() {
    // Lógica para el botón "Salir"
    this.router.navigate(['/login'])
  }

  // Método para seleccionar un dispositivo, se usa para la propiedad selectedDevice
  selectDevice(device: MediaDeviceInfo) {
    this.selectedDevice = device || undefined;  // Asignar undefined si no hay dispositivo
  }
}

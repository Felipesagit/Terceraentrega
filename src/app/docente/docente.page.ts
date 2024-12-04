import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { ConsumoApiService } from '../service/consumoapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  now: Date = new Date();
  nombre: string = '';
  fecha: String = this.now.toLocaleString();
  id_profesor: string= '';
  
  cursos: any[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private consumoapi: ConsumoApiService
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];
      this.id_profesor = navigation.extras.state['id_profesor'];   
      this.Obtenercursos();  
    }

  
    console.log("ID del profesor en DocentePage:", this.id_profesor);
  }

  Obtenercursos(){
    this.consumoapi.Obtenercurso(parseInt(this.id_profesor)).subscribe((res)=> {
      console.log("Cursos recibidos:", res); 
      this.cursos = res;
    })
  }


  // Función para navegar al detalle de un curso
  verDetalle(curso: any) { 
    this.router.navigate(['/qrdocente'], {
      state: {
        nombre: curso.nombre,
        codigo: curso.codigo,
        seccion: curso.seccion,
        id_profesor: this.id_profesor,
        id_curso : curso.id
      }
    });
  }



  // Función para salir de la aplicación y volver al login
  salirAplicacion() {
    this.router.navigate(['/login']);
  }
}

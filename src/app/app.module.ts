import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ZXingScannerModule } from '@zxing/ngx-scanner';  // Asegúrate de importar ZXingScannerModule correctamente

@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    ZXingScannerModule  // Asegúrate de incluirlo aquí
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

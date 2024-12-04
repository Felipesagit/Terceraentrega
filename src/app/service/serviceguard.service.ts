import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceguardService {

  private authenticated = false;
  private role: string | null = null;
  constructor() { }

  isLoggedIn() {
    return this.authenticated;
  }

  login(userRole: string) {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  constructor( public http: HttpClient, public router: Router ) {
    this.cargarStorage();
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url =  URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });

  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url =  URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    this.usuario = usuario;
    this.token = token;
  }
  
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token') !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuario) {
    let url =  URL_SERVICIOS + '/usuario';
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(url, usuario).map( (resp: any) => {
      swal('Usuario creado', usuario.email, 'success' );
      return resp.usuario;
    });
    
    /* return this.http.post( url, usuario, { headers: headers})
      .map( (resp: any) => {
      swal('Usuario creado', usuario.email, 'success' );
    return resp.usuario;
    }); */
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;
  constructor() {
    
    this.suscription = this.regresarObs()
      .subscribe( 
        numero => console.log('subs', numero ),
        error => console.log('error en observer (2 intentos): ', error),
        () => console.log('Obs termino!')     
      );
  }

  ngOnInit() {
  }
  
  ngOnDestroy(): void {
    
    console.log('la pagina se cerrará');
    this.suscription.unsubscribe();
    
  }

  regresarObs(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next( salida );
        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        // if ( contador === 2) {
        //   // clearInterval( intervalo );          
        //   observer.error(' Auxilio ');
        // }
      }, 500);
    }).retry(2)
    .map ( ( resp: any ) => {
      return resp.valor;
    })
    .filter( (valor, index) => {
      console.log('filter: ', valor, index);
      if ( (valor % 2) === 1 ) {
        return false;
      } else { 
        return true;
      }
    });
  }

}

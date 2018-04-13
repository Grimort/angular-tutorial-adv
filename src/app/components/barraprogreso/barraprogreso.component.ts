import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-barraprogreso',
  templateUrl: './barraprogreso.component.html',
  styles: []
})
export class BarraprogresoComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  @Output() cambioValor: EventEmitter <number> = new EventEmitter();

  constructor() {
    console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  ngOnInit() {
    console.log('Progreso', this.progreso);
  }

  onChange(nuevoValor) {
    // let elementoHtml: any = document.getElementsByName('progreso')[0];

    // console.log(this.txtProgreso);

    if ( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    // elementoHtml.value = this.progreso;
    this.txtProgreso.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }
  cambiarValor( valor ) {
      if ( this.progreso >= 100 && valor > 0 ) {
        this.progreso = 100;
        return;
      }
      if ( this.progreso <= 0 && valor < 0 ) {
        this.progreso = 0;
        return;
      }
      this.progreso += valor;
      this.cambioValor.emit( this.progreso );
      this.txtProgreso.nativeElement.focus();
    }
}

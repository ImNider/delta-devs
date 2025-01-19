import { Component, AfterViewInit } from '@angular/core';

declare var MathJax: any;

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // Llamada a MathJax para procesar las fórmulas matemáticas
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
}

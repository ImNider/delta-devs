import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const MathJax: any; // Declaramos MathJax para usarlo

@Component({
  selector: 'app-game-2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <h1>¡Elige la derivada correcta!</h1>
      <p>Puntos: <strong>{{ points }}</strong></p>
      <div class="question">
        <p>¿Cuál es la derivada de: <span [innerHTML]="currentFunction"></span>?</p>
      </div>
      <div class="options">
        <button *ngFor="let option of currentOptions" (click)="checkAnswer(option)">
          <span [innerHTML]="option"></span>
        </button>
      </div>
      <p *ngIf="feedback" class="feedback">{{ feedback }}</p>
      <button class="reset" (click)="resetGame()">Reiniciar juego</button>
    </div>
  `,
  styleUrls: ['./game-2.component.css']
})
export class Game2Component implements AfterViewInit {
  points = 0;
  feedback = '';
  currentFunction = '';
  currentOptions: string[] = [];
  correctAnswer = '';

  ngAfterViewInit() {
    this.generateQuestion();
    this.renderMath();
  }

  // Genera una nueva pregunta
  generateQuestion() {
    const randomFunction = this.createRandomFunction();
    this.currentFunction = this.formatMath(randomFunction.func);
    this.correctAnswer = this.formatMath(randomFunction.deriv);

    // Generar opciones al azar
    const options = [randomFunction.deriv];
    while (options.length < 3) {
      const randomOption = this.createRandomFunction().deriv;
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    this.currentOptions = this.shuffleArray(options).map(this.formatMath);
    this.renderMath(); // Renderiza las expresiones al actualizar
  }

  // Genera una función aleatoria con su derivada
  createRandomFunction(): { func: string; deriv: string } {
    const types = ['x^n', 'sin(x)', 'cos(x)', 'e^x', 'ln(x)'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    switch (randomType) {
      case 'x^n':
        const n = Math.floor(Math.random() * 5) + 1; // Exponentes entre 1 y 5
        return { func: `x^${n}`, deriv: `${n}x^${n - 1}` };
      case 'sin(x)':
        return { func: 'sin(x)', deriv: 'cos(x)' };
      case 'cos(x)':
        return { func: 'cos(x)', deriv: '-sin(x)' };
      case 'e^x':
        return { func: 'e^x', deriv: 'e^x' };
      case 'ln(x)':
        return { func: 'ln(x)', deriv: '1/x' };
    }
    return { func: '', deriv: '' };
  }

  // Verifica la respuesta
  checkAnswer(selectedOption: string) {
    this.renderMath();
    if (selectedOption === this.correctAnswer) {
      this.points++;
      this.feedback = '¡Correcto!';
    } else {
      this.feedback = `Incorrecto. La respuesta era: ${this.correctAnswer}`;
    }
    setTimeout(() => {
      this.feedback = '';
      this.generateQuestion();
    }, 1500);
  }

  // Reinicia el juego
  resetGame() {
    this.points = 0;
    this.generateQuestion();
  }

  // Mezcla el arreglo de opciones
  shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Formatea las expresiones matemáticas para MathJax
  formatMath(expression: string): string {
    return `\\(${expression}\\)`;
  }

  // Renderiza las expresiones con MathJax v3
  renderMath() {
    setTimeout(() => {
      MathJax.typesetPromise().catch((err: any) =>
        console.error('Error rendering MathJax:', err)
      );
    }, 0);
  }
}

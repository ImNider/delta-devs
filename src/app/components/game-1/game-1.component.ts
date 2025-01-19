import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-game-1',
  templateUrl: './game-1.component.html',
  styleUrls: ['./game-1.component.css']
})
export class Game1Component implements AfterViewInit {
  canvas: any;
  ctx: any;
  ball: any;
  ballPosition = { x: 0, y: 200 };
  speed = 0.5;
  score = 0;
  amplitude = 100;  // Amplitud de la función seno
  frequency = 0.05;  // Frecuencia ajustada para que la onda sea más pequeña
  slope = 0;
  tolerance = 14.9999;  // Tolerancia para el acierto en el punto tangente
  isClicked = false;  // Variable para verificar si se hizo clic
  lastClickPosition = { x: 0, y: 0 };

  ngAfterViewInit() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas?.getContext('2d');
    this.ball = document.getElementById('ball');

    if (this.canvas && this.ctx && this.ball) {
      this.startGame();
    } else {
      console.error('Error: No se pudo encontrar el canvas o la bola.');
    }
  }

  startGame() {
    this.canvas?.addEventListener('click', (event: MouseEvent) => this.checkForPoint(event));  // Tipo MouseEvent añadido
    this.gameLoop();
  }

  // Dibuja la onda seno en todo el canvas
  drawSineWave() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Dibuja la onda seno
    this.ctx.beginPath();
    for (let x = 0; x < this.canvas.width; x++) {
      let y = Math.sin(this.frequency * x) * this.amplitude + this.canvas.height / 2;
      if (x === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.strokeStyle = '#007bff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Dibuja la tangente en la posición de la bola
    const tangentX = this.ballPosition.x;
    const tangentY = Math.sin(this.frequency * tangentX) * this.amplitude + this.canvas.height / 2;
    this.slope = Math.cos(this.frequency * tangentX) * this.amplitude * this.frequency;

    this.ctx.beginPath();
    this.ctx.moveTo(tangentX, tangentY);
    this.ctx.lineTo(tangentX + 50, tangentY - this.slope * 50);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#ff5733';
    this.ctx.stroke();
  }

  // Mueve la bola y la actualiza en la pantalla
  moveBall() {
    if (!this.isClicked) {
      this.ballPosition.x += this.speed;

      // Cuando la bola llega al final de la pantalla, se reinicia y los puntos vuelven a 0
      if (this.ballPosition.x > this.canvas.width) {
        this.ballPosition.x = 0;
        this.ballPosition.y = Math.sin(this.frequency * this.ballPosition.x) * this.amplitude + this.canvas.height / 2;  // Resetea la posición Y
        this.score = 0; // Restablecer los puntos cuando la bola toca el borde
        this.speed = 0.5;
        this.updateScore(); // Actualizar la puntuación en pantalla
      }

      // Recalcular la posición de la bola en Y usando la función seno
      let ballY = Math.sin(this.frequency * this.ballPosition.x) * this.amplitude + this.canvas.height / 2;
      this.ball.style.left = this.ballPosition.x + 'px';
      this.ball.style.top = ballY - 15 + 'px'; // Ajustar para centrar la bola
    }
  }

  // Revisa si la bola está cerca del punto tangente para sumar puntos
  checkForPoint(event: MouseEvent) {
    const ballY = parseFloat(this.ball.style.top);
    const tangentY = Math.sin(this.frequency * this.ballPosition.x) * this.amplitude + this.canvas.height / 2;

    // Verificamos si la bola está dentro de la proximidad de la tangente
    const distance = Math.abs(ballY - tangentY);

    // Solo sumar puntos si el clic está cerca de la tangente
    if (distance < this.tolerance) {
      this.ball.style.backgroundColor = 'green';  // Cambia de color si está cerca
      this.isClicked = true;  // Se marcó un punto

      // Reiniciar la bola a su posición inicial
      this.ballPosition.x = 0;
      this.ballPosition.y = Math.sin(this.frequency * this.ballPosition.x) * this.amplitude + this.canvas.height / 2;  // Resetea la posición Y
      this.speed += 0.1;  // Aumenta la velocidad con cada punto marcado
      this.score += 1;  // Incrementar la puntuación
      this.updateScore();  // Actualizar la puntuación en pantalla

      setTimeout(() => {
        this.ball.style.backgroundColor = 'red';  // La bola regresa a su color rojo después de 200ms
        this.isClicked = false;  // Permitir nuevo clic
      }, 200);
    }
  }

  // Actualiza el marcador y la pendiente
  updateScore() {
    const scoreElement = document.getElementById('score');
    const tangentElement = document.getElementById('tangent');

    if (scoreElement && tangentElement) {
      scoreElement.textContent = `Puntos: ${this.score}`;
      tangentElement.textContent = `Pendiente: ${this.slope.toFixed(2)}`;
    }
  }

  // Ciclo del juego
  gameLoop() {
    this.drawSineWave();
    this.moveBall();
    requestAnimationFrame(() => this.gameLoop());
  }
}

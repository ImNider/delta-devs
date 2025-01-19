import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ConceptsComponent } from './pages/concepts/concepts.component';
import { ExamplesComponent } from './pages/examples/examples.component';
import { GamesComponent } from './pages/games/games.component';
import { Game1Component } from './components/game-1/game-1.component';
import { Game2Component } from './components/game-2/game-2.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'concepts', component: ConceptsComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'game-1', component: Game1Component },
  { path: 'game-2', component: Game2Component }
];


import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ConceptsComponent } from './pages/concepts/concepts.component';
import { ExamplesComponent } from './pages/examples/examples.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'concepts', component: ConceptsComponent },
  { path: 'examples', component: ExamplesComponent }
];


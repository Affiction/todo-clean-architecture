import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/todos/pages/todos-page/todos-page').then((m) => m.TodosPage),
  },
  { path: '**', redirectTo: '' },
];

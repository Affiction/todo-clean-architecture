import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@pages/todos').then((m) => m.TODOS_ROUTES),
  },
  { path: '**', redirectTo: '' },
];

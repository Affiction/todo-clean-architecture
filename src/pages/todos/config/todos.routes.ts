import { Routes } from '@angular/router';
import { TodosPage } from '../ui/todos-page';
import { provideTodos } from './todos.providers';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: TodosPage,
    providers: [provideTodos()],
  },
];

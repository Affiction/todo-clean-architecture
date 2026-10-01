import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoFilters } from '../../components/todo-filters/todo-filters';
import { TodoForm } from '../../components/todo-form/todo-form';
import { TodoItem } from '../../components/todo-item/todo-item';
import { TodosFacade } from '../../todos.facade';

@Component({
  selector: 'app-todos-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoForm, TodoItem, TodoFilters],
  templateUrl: './todos-page.html',
})
export class TodosPage {
  protected readonly facade = inject(TodosFacade);
}

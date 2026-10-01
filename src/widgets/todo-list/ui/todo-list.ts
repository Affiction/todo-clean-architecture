import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from '@entities/todo';
import { ClearCompletedTodosButton } from '@features/todo/clear-completed';
import { TodoFilters, TodoFilterStore } from '@features/todo/filter';
import { TodoListItem } from './todo-list-item';

@Component({
  selector: 'app-todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoFilters, TodoListItem, ClearCompletedTodosButton],
  template: `
    <app-todo-filters />

    <ul>
      @for (todo of filterStore.visibleTodos(); track todo.id) {
        <li><app-todo-list-item [todo]="todo" /></li>
      } @empty {
        <li>Nothing here.</li>
      }
    </ul>

    <footer>
      <span>{{ todoStore.activeCount() }} left</span>
      <app-clear-completed-todos-button />
    </footer>
  `,
})
export class TodoList {
  protected readonly todoStore = inject(TodoStore);
  protected readonly filterStore = inject(TodoFilterStore);
}

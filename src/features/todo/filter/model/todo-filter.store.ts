import { computed, inject, Injectable, signal } from '@angular/core';
import { TodoStore } from '@entities/todo';
import { filterTodos, TodoFilter } from './todo-filter';

@Injectable()
export class TodoFilterStore {
  private readonly todoStore = inject(TodoStore);

  private readonly _filter = signal<TodoFilter>('all');

  readonly filter = this._filter.asReadonly();
  readonly visibleTodos = computed(() => filterTodos(this.todoStore.todos(), this._filter()));

  setFilter(filter: TodoFilter): void {
    this._filter.set(filter);
  }
}

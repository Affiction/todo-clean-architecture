import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from '../domain/todo';
import { TodoRepository } from '../domain/todo.repository';

/** Signal-based read model of the todo list. Features call `refresh()` after a mutation. Provided by the page route. */
@Injectable()
export class TodoStore {
  private readonly repository = inject(TodoRepository);

  private readonly _todos = signal<readonly Todo[]>(this.read());

  readonly todos = this._todos.asReadonly();
  readonly activeCount = computed(() => this._todos().filter((todo) => !todo.completed).length);
  readonly completedCount = computed(() => this._todos().length - this.activeCount());

  refresh(): void {
    this._todos.set(this.read());
  }

  private read(): readonly Todo[] {
    return [...this.repository.findAll()].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }
}

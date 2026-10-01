import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AddTodoUseCase,
  ClearCompletedTodosUseCase,
  DeleteTodoUseCase,
  GetTodosUseCase,
  RenameTodoUseCase,
  ToggleTodoUseCase,
} from '../../application';
import { DomainError, filterTodos, Todo, TodoFilter } from '../../domain';

/** Signal-based view state; delegates every mutation to a use case. */
@Injectable({ providedIn: 'root' })
export class TodosFacade {
  private readonly getTodos = inject(GetTodosUseCase);
  private readonly addTodo = inject(AddTodoUseCase);
  private readonly toggleTodo = inject(ToggleTodoUseCase);
  private readonly renameTodo = inject(RenameTodoUseCase);
  private readonly deleteTodo = inject(DeleteTodoUseCase);
  private readonly clearCompletedTodos = inject(ClearCompletedTodosUseCase);

  private readonly _todos = signal<readonly Todo[]>(this.getTodos.execute());
  private readonly _filter = signal<TodoFilter>('all');
  private readonly _error = signal<string | null>(null);

  readonly todos = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly error = this._error.asReadonly();

  readonly visibleTodos = computed(() => filterTodos(this._todos(), this._filter()));
  readonly activeCount = computed(() => this._todos().filter((todo) => !todo.completed).length);
  readonly completedCount = computed(() => this._todos().length - this.activeCount());

  add(title: string): void {
    this.run(() => this.addTodo.execute(title));
  }

  toggle(id: string): void {
    this.run(() => this.toggleTodo.execute(id));
  }

  rename(id: string, title: string): void {
    this.run(() => this.renameTodo.execute(id, title));
  }

  remove(id: string): void {
    this.run(() => this.deleteTodo.execute(id));
  }

  clearCompleted(): void {
    this.run(() => this.clearCompletedTodos.execute());
  }

  setFilter(filter: TodoFilter): void {
    this._filter.set(filter);
  }

  private run(command: () => unknown): void {
    try {
      command();
      this._error.set(null);
    } catch (error) {
      if (!(error instanceof DomainError)) {
        throw error;
      }
      this._error.set(error.message);
    }
    this._todos.set(this.getTodos.execute());
  }
}

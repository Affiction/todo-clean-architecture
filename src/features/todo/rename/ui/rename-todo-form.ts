import { Component, inject, input, output, signal } from '@angular/core';
import { Todo, TodoStore } from '@entities/todo';
import { DomainError } from '@shared/lib';
import { RenameTodoUseCase } from '../model/rename-todo.use-case';

@Component({
  selector: 'app-rename-todo-form',
  template: `
    <form (submit)="submit($event)">
      <input name="title" [value]="todo().title" aria-label="Todo title" required />
      <button type="submit">Save</button>
      <button type="button" (click)="closed.emit()">Cancel</button>
    </form>
    @if (error(); as error) {
      <p role="alert">{{ error }}</p>
    }
  `,
})
export class RenameTodoForm {
  readonly todo = input.required<Todo>();
  readonly closed = output();

  private readonly renameTodo = inject(RenameTodoUseCase);
  private readonly store = inject(TodoStore);

  protected readonly error = signal<string | null>(null);

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    const title = new FormData(event.target as HTMLFormElement).get('title')?.toString() ?? '';
    try {
      this.renameTodo.execute(this.todo().id, title);
      this.store.refresh();
      this.closed.emit();
    } catch (error) {
      if (!(error instanceof DomainError)) {
        throw error;
      }
      this.error.set(error.message);
    }
  }
}

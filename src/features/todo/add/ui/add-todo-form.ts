import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TodoStore } from '@entities/todo';
import { DomainError } from '@shared/lib';
import { AddTodoUseCase } from '../model/add-todo.use-case';

@Component({
  selector: 'app-add-todo-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (submit)="submit($event)">
      <input name="title" placeholder="What needs to be done?" aria-label="New todo" required />
      <button type="submit">Add</button>
    </form>
    @if (error(); as error) {
      <p role="alert">{{ error }}</p>
    }
  `,
})
export class AddTodoForm {
  private readonly addTodo = inject(AddTodoUseCase);
  private readonly store = inject(TodoStore);

  protected readonly error = signal<string | null>(null);

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    try {
      this.addTodo.execute(new FormData(form).get('title')?.toString() ?? '');
      form.reset();
      this.error.set(null);
    } catch (error) {
      if (!(error instanceof DomainError)) {
        throw error;
      }
      this.error.set(error.message);
    }
    this.store.refresh();
  }
}

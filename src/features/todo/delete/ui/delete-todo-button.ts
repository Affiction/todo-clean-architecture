import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Todo, TodoStore } from '@entities/todo';
import { DeleteTodoUseCase } from '../model/delete-todo.use-case';

@Component({
  selector: 'app-delete-todo-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button type="button" (click)="delete()">Delete</button>`,
})
export class DeleteTodoButton {
  readonly todo = input.required<Todo>();

  private readonly deleteTodo = inject(DeleteTodoUseCase);
  private readonly store = inject(TodoStore);

  protected delete(): void {
    this.deleteTodo.execute(this.todo().id);
    this.store.refresh();
  }
}

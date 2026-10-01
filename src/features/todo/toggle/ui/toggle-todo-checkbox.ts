import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Todo, TodoStore } from '@entities/todo';
import { ToggleTodoUseCase } from '../model/toggle-todo.use-case';

@Component({
  selector: 'app-toggle-todo-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      type="checkbox"
      [checked]="todo().completed"
      [attr.aria-label]="'Complete ' + todo().title"
      (change)="toggle()"
    />
  `,
})
export class ToggleTodoCheckbox {
  readonly todo = input.required<Todo>();

  private readonly toggleTodo = inject(ToggleTodoUseCase);
  private readonly store = inject(TodoStore);

  protected toggle(): void {
    this.toggleTodo.execute(this.todo().id);
    this.store.refresh();
  }
}

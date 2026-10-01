import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Todo, TodoCard } from '@entities/todo';
import { DeleteTodoButton } from '@features/todo/delete';
import { RenameTodoForm } from '@features/todo/rename';
import { ToggleTodoCheckbox } from '@features/todo/toggle';

@Component({
  selector: 'app-todo-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoCard, ToggleTodoCheckbox, RenameTodoForm, DeleteTodoButton],
  template: `
    @if (editing()) {
      <app-rename-todo-form [todo]="todo()" (closed)="editing.set(false)" />
    } @else {
      <app-todo-card [todo]="todo()">
        <app-toggle-todo-checkbox todoCardStart [todo]="todo()" />
        <button type="button" (click)="editing.set(true)">Edit</button>
        <app-delete-todo-button [todo]="todo()" />
      </app-todo-card>
    }
  `,
})
export class TodoListItem {
  readonly todo = input.required<Todo>();

  protected readonly editing = signal(false);
}

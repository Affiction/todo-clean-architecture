import { Component, input } from '@angular/core';
import { Todo } from '../model/todo';

/** Presentational view of a todo; actions are projected in by features. */
@Component({
  selector: 'app-todo-card',
  template: `
    <ng-content select="[todoCardStart]" />
    <span [class.completed]="todo().completed">{{ todo().title }}</span>
    <ng-content />
  `,
  styles: `
    .completed {
      text-decoration: line-through;
      opacity: 0.6;
    }
  `,
})
export class TodoCard {
  readonly todo = input.required<Todo>();
}

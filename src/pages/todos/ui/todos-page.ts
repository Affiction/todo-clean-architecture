import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddTodoForm } from '@features/todo/add';
import { TodoList } from '@widgets/todo-list';

@Component({
  selector: 'app-todos-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AddTodoForm, TodoList],
  template: `
    <main>
      <h1>Todos</h1>
      <app-add-todo-form />
      <app-todo-list />
    </main>
  `,
})
export class TodosPage {}

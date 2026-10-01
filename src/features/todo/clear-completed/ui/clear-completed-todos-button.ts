import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from '@entities/todo';
import { ClearCompletedTodosUseCase } from '../application/clear-completed-todos.use-case';

@Component({
  selector: 'app-clear-completed-todos-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" [disabled]="store.completedCount() === 0" (click)="clear()">
      Clear completed
    </button>
  `,
})
export class ClearCompletedTodosButton {
  private readonly clearCompletedTodos = inject(ClearCompletedTodosUseCase);
  protected readonly store = inject(TodoStore);

  protected clear(): void {
    this.clearCompletedTodos.execute();
    this.store.refresh();
  }
}

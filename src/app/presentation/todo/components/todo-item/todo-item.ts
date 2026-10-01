import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Todo } from '../../../../domain/todo';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-item.html',
  styles: `
    .completed {
      text-decoration: line-through;
      opacity: 0.6;
    }
  `,
})
export class TodoItem {
  readonly todo = input.required<Todo>();

  readonly toggled = output<string>();
  readonly renamed = output<{ id: string; title: string }>();
  readonly removed = output<string>();

  protected readonly editing = signal(false);

  protected save(event: SubmitEvent): void {
    event.preventDefault();
    const title = new FormData(event.target as HTMLFormElement).get('title')?.toString() ?? '';
    this.renamed.emit({ id: this.todo().id, title });
    this.editing.set(false);
  }
}

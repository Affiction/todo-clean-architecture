import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TodoFilter } from '../../../../domain';

@Component({
  selector: 'app-todo-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset>
      <legend>Show</legend>
      @for (option of options; track option) {
        <label>
          <input
            type="radio"
            name="filter"
            [value]="option"
            [checked]="option === filter()"
            (change)="changed.emit(option)"
          />
          {{ option }}
        </label>
      }
    </fieldset>
  `,
})
export class TodoFilters {
  readonly filter = input.required<TodoFilter>();
  readonly changed = output<TodoFilter>();

  protected readonly options: readonly TodoFilter[] = ['all', 'active', 'completed'];
}

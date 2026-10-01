import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TODO_FILTERS } from '../model/todo-filter';
import { TodoFilterStore } from '../model/todo-filter.store';

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
            [checked]="option === store.filter()"
            (change)="store.setFilter(option)"
          />
          {{ option }}
        </label>
      }
    </fieldset>
  `,
})
export class TodoFilters {
  protected readonly store = inject(TodoFilterStore);
  protected readonly options = TODO_FILTERS;
}

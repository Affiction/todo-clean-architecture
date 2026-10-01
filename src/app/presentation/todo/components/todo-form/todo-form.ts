import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (submit)="submit($event)">
      <input name="title" placeholder="What needs to be done?" aria-label="New todo" required />
      <button type="submit">Add</button>
    </form>
  `,
})
export class TodoForm {
  readonly created = output<string>();

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = new FormData(form).get('title')?.toString() ?? '';
    this.created.emit(title);
    form.reset();
  }
}

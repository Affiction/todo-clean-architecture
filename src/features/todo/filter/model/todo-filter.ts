import { Todo } from '@entities/todo';

export type TodoFilter = 'all' | 'active' | 'completed';

export const TODO_FILTERS: readonly TodoFilter[] = ['all', 'active', 'completed'];

export function filterTodos(todos: readonly Todo[], filter: TodoFilter): readonly Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

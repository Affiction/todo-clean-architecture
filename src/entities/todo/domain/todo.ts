import { EmptyTodoTitleError } from './todo.errors';

export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: Date;
}

export function createTodo(id: string, title: string, createdAt = new Date()): Todo {
  return { id, title: normalizeTitle(title), completed: false, createdAt };
}

export function toggleTodo(todo: Todo): Todo {
  return { ...todo, completed: !todo.completed };
}

export function renameTodo(todo: Todo, title: string): Todo {
  return { ...todo, title: normalizeTitle(title) };
}

function normalizeTitle(title: string): string {
  const normalized = title.trim();
  if (!normalized) {
    throw new EmptyTodoTitleError();
  }
  return normalized;
}

import { DomainError } from '@shared/lib';

export class EmptyTodoTitleError extends DomainError {
  constructor() {
    super('Todo title must not be empty.');
  }
}

export class TodoNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Todo "${id}" was not found.`);
  }
}

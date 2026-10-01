import { TodoNotFoundError, TodoRepository } from '../../../domain/todo';

export class DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: string): void {
    if (!this.repository.findById(id)) {
      throw new TodoNotFoundError(id);
    }
    this.repository.delete(id);
  }
}

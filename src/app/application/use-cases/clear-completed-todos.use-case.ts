import { TodoRepository } from '../../domain';

export class ClearCompletedTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): void {
    this.repository
      .findAll()
      .filter((todo) => todo.completed)
      .forEach((todo) => this.repository.delete(todo.id));
  }
}

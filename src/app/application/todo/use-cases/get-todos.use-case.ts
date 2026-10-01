import { Todo, TodoRepository } from '../../../domain/todo';

export class GetTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): readonly Todo[] {
    return [...this.repository.findAll()].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }
}

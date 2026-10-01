import { renameTodo, Todo, TodoNotFoundError, TodoRepository } from '../../domain';

export class RenameTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: string, title: string): Todo {
    const todo = this.repository.findById(id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    const renamed = renameTodo(todo, title);
    this.repository.save(renamed);
    return renamed;
  }
}

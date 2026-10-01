import { Todo, TodoRepository } from '../../domain/todo';

export class InMemoryTodoRepository extends TodoRepository {
  private readonly todos = new Map<string, Todo>();

  findAll(): readonly Todo[] {
    return [...this.todos.values()];
  }

  findById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  save(todo: Todo): void {
    this.todos.set(todo.id, todo);
  }

  delete(id: string): void {
    this.todos.delete(id);
  }
}

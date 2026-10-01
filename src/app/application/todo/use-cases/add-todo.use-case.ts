import { createTodo, Todo, TodoRepository } from '../../../domain/todo';

export class AddTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(title: string): Todo {
    const todo = createTodo(crypto.randomUUID(), title);
    this.repository.save(todo);
    return todo;
  }
}

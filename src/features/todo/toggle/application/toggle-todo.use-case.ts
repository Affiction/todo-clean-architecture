import { Todo, TodoNotFoundError, TodoRepository, toggleTodo } from '@entities/todo';

export class ToggleTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: string): Todo {
    const todo = this.repository.findById(id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    const toggled = toggleTodo(todo);
    this.repository.save(toggled);
    return toggled;
  }
}

import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { InMemoryTodoRepository, TodoRepository, TodoStore } from '@entities/todo';
import { AddTodoUseCase } from '@features/todo/add';
import { ClearCompletedTodosUseCase } from '@features/todo/clear-completed';
import { DeleteTodoUseCase } from '@features/todo/delete';
import { TodoFilterStore } from '@features/todo/filter';
import { RenameTodoUseCase } from '@features/todo/rename';
import { ToggleTodoUseCase } from '@features/todo/toggle';

type UseCaseClass = new (repository: TodoRepository) => unknown;

const useCase = (type: UseCaseClass): Provider => ({
  provide: type,
  useFactory: (repository: TodoRepository) => new type(repository),
  deps: [TodoRepository],
});

/**
 * Composition root for todos: binds the repository port to an adapter and wires use cases.
 * Registered on the lazy route so feature code stays out of the initial bundle.
 */
export function provideTodos(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: TodoRepository, useClass: InMemoryTodoRepository },
    TodoStore,
    TodoFilterStore,
    useCase(AddTodoUseCase),
    useCase(ToggleTodoUseCase),
    useCase(RenameTodoUseCase),
    useCase(DeleteTodoUseCase),
    useCase(ClearCompletedTodosUseCase),
  ]);
}

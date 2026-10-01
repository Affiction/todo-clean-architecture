import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import {
  AddTodoUseCase,
  ClearCompletedTodosUseCase,
  DeleteTodoUseCase,
  GetTodosUseCase,
  RenameTodoUseCase,
  ToggleTodoUseCase,
} from '../application';
import { TodoRepository } from '../domain';
import { InMemoryTodoRepository } from './in-memory-todo.repository';

type UseCaseClass = new (repository: TodoRepository) => unknown;

const useCase = (type: UseCaseClass): Provider => ({
  provide: type,
  useFactory: (repository: TodoRepository) => new type(repository),
  deps: [TodoRepository],
});

/** Composition root for the todo feature: binds ports to adapters and wires use cases. */
export function provideTodos(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: TodoRepository, useClass: InMemoryTodoRepository },
    useCase(GetTodosUseCase),
    useCase(AddTodoUseCase),
    useCase(ToggleTodoUseCase),
    useCase(RenameTodoUseCase),
    useCase(DeleteTodoUseCase),
    useCase(ClearCompletedTodosUseCase),
  ]);
}

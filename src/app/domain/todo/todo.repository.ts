import { Todo } from './todo';

/** Port: implemented by the infrastructure layer. Abstract class doubles as a DI token. */
export abstract class TodoRepository {
  abstract findAll(): readonly Todo[];
  abstract findById(id: string): Todo | undefined;
  abstract save(todo: Todo): void;
  abstract delete(id: string): void;
}

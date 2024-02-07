import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'todo-description',
      done: false,
    },
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo();

    todo.id = Math.max(...this.todos.map((t) => t.id), 0) + 1;
    todo.description = createTodoDto.description;
    todo.done = false;

    this.todos.push(todo);

    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`TODO with id #${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    if (updateTodoDto.description) todo.description = updateTodoDto.description;
    if (updateTodoDto.done) todo.done = updateTodoDto.done;

    this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));

    return todo;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

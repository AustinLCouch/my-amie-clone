
// File: app/components/TodoItem.tsx

import React from 'react';

// Define the shape of our 'todo' object with TypeScript
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className="p-2">
      <p className={todo.completed ? 'line-through text-gray-400' : ''}>
        {todo.text}
      </p>
    </div>
  );
};

export default TodoItem;

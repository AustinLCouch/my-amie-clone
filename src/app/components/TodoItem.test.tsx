// File: app/components/TodoItem.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoItem from './TodoItem'; // This file doesn't exist yet!

describe('TodoItem', () => {
  it('should render the todo text correctly', () => {
    // 1. Arrange: Set up the component with the necessary props
    const todo = { id: 1, text: 'Learn modern testing practices', completed: false };
    render(<TodoItem todo={todo} />);

    // 2. Act: Find the element on the screen
    const todoTextElement = screen.getByText('Learn modern testing practices');

    // 3. Assert: Check if the element exists
    expect(todoTextElement).toBeInTheDocument();
  });

  it('should apply a line-through style when the todo is completed', () => {
    // Arrange
    const todo = { id: 2, text: 'Write a failing test', completed: true };
    render(<TodoItem todo={todo} />);

    // Act
    const todoTextElement = screen.getByText('Write a failing test');

    // Assert
    expect(todoTextElement).toHaveClass('line-through');
  });
});

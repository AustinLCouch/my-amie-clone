'use client';

import React, { useState } from 'react';
import Button from './Button';

/**
 * Task Interface
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Task List Component Props
 */
interface TaskListProps {
  /**
   * Array of tasks to display
   */
  tasks?: Task[];
  
  /**
   * Callback when a task is toggled
   */
  onTaskToggle?: (taskId: string) => void;
  
  /**
   * Callback when a task is deleted
   */
  onTaskDelete?: (taskId: string) => void;
  
  /**
   * Callback when a new task is created
   */
  onTaskCreate?: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  
  /**
   * Whether to show completed tasks
   */
  showCompleted?: boolean;
  
  /**
   * Filter tasks by priority
   */
  filterPriority?: 'low' | 'medium' | 'high' | 'all';
}

/**
 * Default tasks for demonstration
 */
const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Review project proposals',
    description: 'Go through the Q4 project proposals and provide feedback',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    tags: ['work', 'review'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Book dentist appointment',
    completed: false,
    priority: 'medium',
    tags: ['personal', 'health'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Update portfolio website',
    description: 'Add the latest projects and update the design',
    completed: true,
    priority: 'low',
    tags: ['personal', 'development'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    title: 'Team standup meeting',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    tags: ['work', 'meeting'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

/**
 * Utility functions
 */
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInHours = diff / (1000 * 60 * 60);
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
  if (diffInDays < 7) return `${Math.floor(diffInDays)}d ago`;
  return date.toLocaleDateString();
};

const formatDueDate = (date: Date): string => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffInHours = diff / (1000 * 60 * 60);
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  if (diff < 0) return 'Overdue';
  if (diffInHours < 1) return 'Due now';
  if (diffInHours < 24) return `Due in ${Math.floor(diffInHours)}h`;
  if (diffInDays < 7) return `Due in ${Math.floor(diffInDays)}d`;
  return `Due ${date.toLocaleDateString()}`;
};

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return { bg: 'bg-accent-red/10', text: 'text-accent-red', border: 'border-accent-red/30' };
    case 'medium':
      return { bg: 'bg-accent-orange/10', text: 'text-accent-orange', border: 'border-accent-orange/30' };
    case 'low':
      return { bg: 'bg-accent-green/10', text: 'text-accent-green', border: 'border-accent-green/30' };
    default:
      return { bg: 'bg-surface', text: 'text-foreground-secondary', border: 'border-border' };
  }
};

/**
 * Modern Task List Component
 * 
 * A beautiful, interactive task management component with filtering,
 * sorting, and smooth animations. Inspired by Amie's clean design.
 */
export default function TaskList({
  tasks = defaultTasks,
  onTaskToggle,
  onTaskDelete,
  onTaskCreate,
  showCompleted = true,
  filterPriority = 'all',
}: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');

  /**
   * Filter and sort tasks
   */
  const filteredTasks = tasks
    .filter(task => {
      if (!showCompleted && task.completed) return false;
      if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Sort by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by due date (soonest first)
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      
      // Sort by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  /**
   * Handle new task creation
   */
  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title: newTaskTitle.trim(),
      completed: false,
      priority: newTaskPriority,
      tags: [],
    };
    
    onTaskCreate?.(newTask);
    setNewTaskTitle('');
    setShowNewTaskForm(false);
  };

  /**
   * Handle task toggle
   */
  const handleTaskToggle = (taskId: string) => {
    onTaskToggle?.(taskId);
  };

  /**
   * Handle task deletion
   */
  const handleTaskDelete = (taskId: string) => {
    onTaskDelete?.(taskId);
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="flex flex-col h-full bg-surface rounded-2xl border border-border shadow-lg overflow-hidden animate-fade-in">
      {/* Header */}
      <header className="p-6 border-b border-border bg-background-secondary/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
            <p className="text-sm text-foreground-secondary mt-1">
              {completedCount} of {totalCount} completed
            </p>
          </div>
          
          <Button
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
            variant="primary"
            size="sm"
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            Add Task
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-background-tertiary rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent-green transition-all duration-500 ease-out"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </header>

      {/* New Task Form */}
      {showNewTaskForm && (
        <div className="p-4 border-b border-border bg-background-secondary/20 animate-slide-in-right">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-foreground-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                autoFocus
              />
            </div>
            
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
              className="px-3 py-3 bg-surface border border-border rounded-xl text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <Button onClick={handleCreateTask} variant="primary" size="md">
              Add
            </Button>
            
            <Button 
              onClick={() => setShowNewTaskForm(false)} 
              variant="ghost" 
              size="md"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="flex-1 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent-green rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">All done!</h3>
              <p className="text-foreground-secondary">
                {tasks.length === 0 
                  ? 'No tasks yet. Create your first task to get started.'
                  : 'No tasks match your current filters.'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="p-2">
            {filteredTasks.map((task, index) => {
              const priorityColors = getPriorityColor(task.priority);
              const isOverdue = task.dueDate && task.dueDate < new Date() && !task.completed;
              
              return (
                <div
                  key={task.id}
                  className={`
                    group relative p-4 mb-2 rounded-xl border transition-all duration-200 ease-out
                    hover:shadow-md hover:scale-[1.01]
                    ${task.completed 
                      ? 'bg-background-secondary/50 border-border opacity-60' 
                      : 'bg-surface border-border hover:border-primary/30'
                    }
                    ${isOverdue ? 'border-accent-red/50 bg-accent-red/5' : ''}
                  `}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeIn 300ms ease-out both'
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleTaskToggle(task.id)}
                      className={`
                        flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                        transition-all duration-200 hover:scale-110
                        ${task.completed
                          ? 'bg-accent-green border-accent-green text-white'
                          : 'border-border hover:border-primary'
                        }
                      `}
                    >
                      {task.completed && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className={`
                            text-base font-medium mb-1 transition-all duration-200
                            ${task.completed 
                              ? 'text-foreground-secondary line-through' 
                              : 'text-foreground'
                            }
                          `}>
                            {task.title}
                          </h3>
                          
                          {task.description && (
                            <p className={`
                              text-sm mb-2 leading-relaxed
                              ${task.completed 
                                ? 'text-foreground-tertiary' 
                                : 'text-foreground-secondary'
                              }
                            `}>
                              {task.description}
                            </p>
                          )}

                          <div className="flex items-center gap-3 flex-wrap">
                            {/* Priority */}
                            <span className={`
                              px-2 py-1 text-xs font-medium rounded-lg border
                              ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border}
                            `}>
                              {task.priority}
                            </span>

                            {/* Due Date */}
                            {task.dueDate && (
                              <span className={`
                                text-xs font-medium
                                ${isOverdue ? 'text-accent-red' : 'text-foreground-secondary'}
                              `}>
                                {formatDueDate(task.dueDate)}
                              </span>
                            )}

                            {/* Tags */}
                            {task.tags?.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-lg"
                              >
                                #{tag}
                              </span>
                            ))}

                            {/* Created Date */}
                            <span className="text-xs text-foreground-tertiary">
                              {formatRelativeTime(task.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleTaskDelete(task.id)}
                            className="p-1.5 text-foreground-tertiary hover:text-accent-red hover:bg-accent-red/10 rounded-lg transition-colors focus-ring"
                            aria-label="Delete task"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

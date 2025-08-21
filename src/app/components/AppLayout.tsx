'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Calendar, { type CalendarView, type CalendarEvent } from '@/components/ui/Calendar';
import TaskList, { type Task } from '@/components/ui/TaskList';

/**
 * Application View Types
 */
type AppView = 'today' | 'inbox' | 'calendar' | 'tasks' | 'notes' | 'contacts';

/**
 * Modern Application Layout Component
 * 
 * A beautiful, responsive layout with animated transitions and smooth interactions.
 * Features a collapsible sidebar, main content area, and optional details panel.
 * Inspired by Amie's elegant three-panel design.
 */
export function AppLayout() {
  // Layout State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  
  // Task Management State
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposals',
      description: 'Go through the Q4 project proposals and provide feedback',
      completed: false,
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      tags: ['work', 'review'],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Book dentist appointment',
      completed: false,
      priority: 'medium',
      tags: ['personal', 'health'],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      title: 'Update portfolio website',
      description: 'Add the latest projects and update the design',
      completed: true,
      priority: 'low',
      tags: ['personal', 'development'],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]);
  
  // Calendar Events (sample data)
  const calendarEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2024, new Date().getMonth(), 15, 10, 0),
      end: new Date(2024, new Date().getMonth(), 15, 11, 0),
      color: '#6366f1',
      description: 'Weekly team sync meeting',
    },
    {
      id: '2',
      title: 'Project Review',
      start: new Date(2024, new Date().getMonth(), 16, 14, 0),
      end: new Date(2024, new Date().getMonth(), 16, 15, 30),
      color: '#10b981',
    },
    {
      id: '3',
      title: 'Client Presentation',
      start: new Date(2024, new Date().getMonth(), 18, 15, 0),
      end: new Date(2024, new Date().getMonth(), 18, 16, 30),
      color: '#f59e0b',
    },
  ];

  /**
   * Handle navigation between different views
   */
  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId as AppView);
  };

  /**
   * Handle sidebar collapse toggle
   */
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  /**
   * Handle task operations
   */
  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleTaskCreate = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prevTasks => [task, ...prevTasks]);
  };

  /**
   * Handle calendar events
   */
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
    // Here you could open an event details modal or navigate to event details
  };

  const handleCalendarViewChange = (view: CalendarView) => {
    setCalendarView(view);
  };

  /**
   * Render the main content based on current view
   */
  const renderMainContent = () => {
    switch (currentView) {
      case 'calendar':
        return (
          <Calendar
            events={calendarEvents}
            view={calendarView}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onViewChange={handleCalendarViewChange}
            showWeekends={true}
          />
        );
      
      case 'tasks':
      case 'inbox':
        return (
          <TaskList
            tasks={tasks}
            onTaskToggle={handleTaskToggle}
            onTaskDelete={handleTaskDelete}
            onTaskCreate={handleTaskCreate}
            showCompleted={true}
            filterPriority="all"
          />
        );
      
      case 'today':
        // Show today's tasks and events
        const todayTasks = tasks.filter(task => {
          if (!task.dueDate) return false;
          return task.dueDate.toDateString() === new Date().toDateString();
        });
        
        return (
          <div className="h-full space-y-6 p-6 overflow-y-auto">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">Today</h1>
              <p className="text-foreground-secondary mb-6">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            {/* Today's Tasks */}
            <div className="bg-surface rounded-2xl border border-border shadow-lg p-6 animate-slide-in-left">
              <h2 className="text-xl font-semibold text-foreground mb-4">Today&apos;s Tasks</h2>
              {todayTasks.length === 0 ? (
                <p className="text-foreground-secondary text-center py-8">
                  No tasks due today. You&apos;re all set! 🎉
                </p>
              ) : (
                <div className="space-y-3">
                  {todayTasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg">
                      <button
                        onClick={() => handleTaskToggle(task.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          task.completed ? 'bg-accent-green border-accent-green text-white' : 'border-border hover:border-primary'
                        }`}
                      >
                        {task.completed && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <span className={`flex-1 ${task.completed ? 'line-through text-foreground-secondary' : 'text-foreground'}`}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Today's Events */}
            <div className="bg-surface rounded-2xl border border-border shadow-lg p-6 animate-slide-in-right" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-semibold text-foreground mb-4">Today&apos;s Events</h2>
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-foreground-secondary">
                  No events scheduled for today.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent-purple rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </h3>
              <p className="text-foreground-secondary">
                This feature is coming soon! Check back later.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ease-out ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } flex-shrink-0`}>
        <Sidebar
          activeItemId={currentView}
          onItemSelect={handleViewChange}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-hidden">
          <div className="h-full">
            {renderMainContent()}
          </div>
        </main>
      </div>

      {/* Background Pattern (optional decorative element) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary/5 to-accent-purple/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-accent-blue/5 to-accent-green/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

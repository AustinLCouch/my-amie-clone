
// src/app/components/AppLayout.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Calendar, { type CalendarView, type CalendarEvent } from '@/components/ui/Calendar';
import TaskList, { type Task } from '@/components/ui/TaskList';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"; // Import the real resizable components

type AppView = 'today' | 'inbox' | 'calendar' | 'tasks' | 'notes' | 'contacts';

export function AppLayout() {
  // State for the layout and components remains the same
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<CalendarView>('month');

  // Your existing state and handlers for tasks and calendar events are perfect.
  // We'll keep them as they are.
  const [tasks, setTasks] = useState<Task[]>([
    // Your sample task data...
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
    // ... more tasks
  ]);

  const calendarEvents: CalendarEvent[] = [
    // Your sample calendar event data...
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2025, 7, 22, 10, 0), // Updated date for relevance
      end: new Date(2025, 7, 22, 11, 0),
      color: '#6366f1',
      description: 'Weekly team sync meeting',
    },
    // ... more events
  ];

  // All your handler functions (handleViewChange, handleTaskToggle, etc.)
  // can remain exactly as you wrote them. They are perfect.
  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId as AppView);
  };
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
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
  };
  const handleCalendarViewChange = (view: CalendarView) => {
    setCalendarView(view);
  };

  const renderMainContent = () => {
    // Your renderMainContent function is perfect and can stay as is.
    switch (currentView) {
      case 'calendar':
        return <Calendar events={calendarEvents} view={calendarView} selectedDate={selectedDate} onDateSelect={handleDateSelect} onEventClick={handleEventClick} onViewChange={handleCalendarViewChange} />;
      case 'tasks':
      case 'inbox':
        return <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} onTaskDelete={handleTaskDelete} onTaskCreate={handleTaskCreate} />;
      // ... other cases
      default:
        return (
          <div className="flex items-center justify-center h-full">
             <p>Select a view from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen w-full items-stretch"
    >
      {/* Panel 1: Sidebar */}
      <ResizablePanel
        defaultSize={20}
        minSize={15}
        maxSize={25}
        collapsible={true}
        collapsedSize={4}
        onCollapse={() => setSidebarCollapsed(true)}
        onExpand={() => setSidebarCollapsed(false)}
        className="min-w-[50px]"
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeItemId={currentView}
          onItemSelect={handleViewChange}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Panel 2: Main Content */}
      <ResizablePanel defaultSize={55} minSize={30}>
        <main className="h-full p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </ResizablePanel>
      
      <ResizableHandle withHandle />

      {/* Panel 3: Details View (Placeholder for now) */}
      <ResizablePanel defaultSize={25} minSize={20} collapsible={true} collapsedSize={0}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Details View</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

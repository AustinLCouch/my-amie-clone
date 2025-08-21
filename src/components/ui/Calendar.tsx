'use client';

import React, { useState, useMemo } from 'react';

/**
 * Event Interface
 */
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  description?: string;
  allDay?: boolean;
}

/**
 * Calendar View Types
 */
export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

/**
 * Calendar Component Props
 */
interface CalendarProps {
  /**
   * Array of events to display
   */
  events?: CalendarEvent[];
  
  /**
   * Current view mode
   */
  view?: CalendarView;
  
  /**
   * Currently selected date
   */
  selectedDate?: Date;
  
  /**
   * Callback when a date is selected
   */
  onDateSelect?: (date: Date) => void;
  
  /**
   * Callback when an event is clicked
   */
  onEventClick?: (event: CalendarEvent) => void;
  
  /**
   * Callback when the view changes
   */
  onViewChange?: (view: CalendarView) => void;
  
  /**
   * Whether to show weekend days
   */
  showWeekends?: boolean;
}

/**
 * Default events for demonstration
 */
const defaultEvents: CalendarEvent[] = [
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
    title: 'Lunch with Client',
    start: new Date(2024, new Date().getMonth(), 18, 12, 0),
    end: new Date(2024, new Date().getMonth(), 18, 13, 30),
    color: '#f59e0b',
  },
  {
    id: '4',
    title: 'Conference Call',
    start: new Date(2024, new Date().getMonth(), 20, 16, 0),
    end: new Date(2024, new Date().getMonth(), 20, 17, 0),
    color: '#8b5cf6',
  },
];

/**
 * Utility functions for date manipulation
 */
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

const getMonthDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (days.length < 42) { // 6 weeks × 7 days
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};

/**
 * Modern Calendar Component
 * 
 * A beautiful, interactive calendar component with smooth animations
 * and elegant event display. Inspired by Amie's clean calendar design.
 */
export default function Calendar({
  events = defaultEvents,
  view = 'month',
  selectedDate = new Date(),
  onDateSelect,
  onEventClick,
  onViewChange,
  showWeekends = true,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  /**
   * Calculate calendar data based on current view
   */
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    switch (view) {
      case 'month':
        return {
          title: currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
          days: getMonthDays(year, month),
        };
      default:
        return {
          title: formatDate(currentDate),
          days: [currentDate],
        };
    }
  }, [currentDate, view]);

  /**
   * Get events for a specific date
   */
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(event.start, date));
  };

  /**
   * Handle date navigation
   */
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  /**
   * Handle date selection
   */
  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    onDateSelect?.(date);
  };

  /**
   * Handle event click
   */
  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    onEventClick?.(event);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col h-full bg-surface rounded-2xl border border-border shadow-lg overflow-hidden animate-fade-in">
      {/* Calendar Header */}
      <header className="flex items-center justify-between p-6 border-b border-border bg-background-secondary/30">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">{calendarData.title}</h2>
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-border">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-surface-hover rounded-md transition-colors focus-ring"
              aria-label="Previous month"
            >
              <svg className="w-4 h-4 text-foreground-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleDateSelect(new Date())}
              className="px-4 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-surface-hover rounded-md transition-colors focus-ring"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-surface-hover rounded-md transition-colors focus-ring"
              aria-label="Next month"
            >
              <svg className="w-4 h-4 text-foreground-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-surface rounded-lg p-1 border border-border">
          {(['month', 'week', 'day'] as CalendarView[]).map((viewType) => (
            <button
              key={viewType}
              onClick={() => onViewChange?.(viewType)}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus-ring
                ${view === viewType
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-surface-hover'
                }
              `}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Calendar Body */}
      <div className="flex-1 overflow-hidden">
        {view === 'month' && (
          <div className="h-full flex flex-col">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 border-b border-border bg-background-secondary/20">
              {weekDays.map((day, index) => (
                <div
                  key={day}
                  className={`
                    p-4 text-center text-sm font-semibold text-foreground-secondary
                    ${!showWeekends && (index === 0 || index === 6) ? 'hidden' : ''}
                  `}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 grid grid-cols-7 gap-0">
              {calendarData.days.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isSelected = isSameDay(date, selectedDate);
                const isHovered = hoveredDate && isSameDay(date, hoveredDate);
                const dayEvents = getEventsForDate(date);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                if (!showWeekends && isWeekend) return null;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={`
                      relative p-2 border-r border-b border-border-light min-h-[120px]
                      flex flex-col items-start justify-start
                      transition-all duration-200 ease-out
                      hover:bg-surface-hover focus-ring
                      group
                      ${!isCurrentMonth ? 'bg-background-tertiary/50' : 'bg-surface'}
                      ${isSelected ? 'bg-primary/10 border-primary/30' : ''}
                      ${isHovered ? 'bg-surface-hover' : ''}
                    `}
                  >
                    {/* Date Number */}
                    <div className={`
                      w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium mb-2
                      transition-all duration-200
                      ${isToday(date)
                        ? 'bg-primary text-white shadow-sm'
                        : isSelected
                          ? 'bg-primary/20 text-primary'
                          : isCurrentMonth
                            ? 'text-foreground group-hover:bg-surface-elevated'
                            : 'text-foreground-tertiary'
                      }
                    `}>
                      {date.getDate()}
                    </div>

                    {/* Events */}
                    <div className="w-full space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          onClick={(e) => handleEventClick(event, e)}
                          className={`
                            w-full p-1.5 text-xs font-medium rounded-md truncate text-left
                            transition-all duration-200 hover:scale-105
                            cursor-pointer
                          `}
                          style={{
                            backgroundColor: event.color ? `${event.color}20` : '#6366f120',
                            color: event.color || '#6366f1',
                            borderLeft: `3px solid ${event.color || '#6366f1'}`,
                          }}
                          title={`${event.title} - ${formatTime(event.start)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-foreground-secondary font-medium pl-1">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>

                    {/* Hover Effect */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-blue/5 rounded-lg pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Other views (Week, Day, Agenda) can be implemented here */}
        {view !== 'month' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent-purple rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {view.charAt(0).toUpperCase() + view.slice(1)} View
              </h3>
              <p className="text-foreground-secondary">
                {view} view is coming soon! Switch to month view to see your calendar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';

/**
 * Navigation Item Interface
 */
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
}

/**
 * Navigation Section Interface
 */
interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * Sidebar Component Props
 */
interface SidebarProps {
  /**
   * Navigation sections to display
   */
  sections?: NavSection[];
  
  /**
   * Currently active navigation item ID
   */
  activeItemId?: string;
  
  /**
   * Callback when a navigation item is selected
   */
  onItemSelect?: (itemId: string) => void;
  
  /**
   * Whether the sidebar is collapsed
   */
  collapsed?: boolean;
  
  /**
   * Callback to toggle sidebar collapse state
   */
  onToggleCollapse?: () => void;
}

/**
 * Default navigation items for the calendar app
 */
const defaultNavItems: NavSection[] = [
  {
    items: [
      {
        id: 'today',
        label: 'Today',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        id: 'inbox',
        label: 'Inbox',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        ),
        count: 3,
      },
      {
        id: 'calendar',
        label: 'Calendar',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'Lists',
    items: [
      {
        id: 'tasks',
        label: 'Tasks',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        count: 5,
      },
      {
        id: 'notes',
        label: 'Notes',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
      {
        id: 'contacts',
        label: 'Contacts',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        ),
      },
    ],
  },
];

/**
 * Modern Sidebar Navigation Component
 * 
 * A beautiful, animated sidebar component with collapsible sections,
 * smooth transitions, and elegant user profile integration.
 * Inspired by Amie's clean navigation design.
 */
export default function Sidebar({
  sections = defaultNavItems,
  activeItemId = 'today',
  onItemSelect,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  /**
   * Handle navigation item selection
   */
  const handleItemSelect = (itemId: string) => {
    onItemSelect?.(itemId);
  };

  /**
   * Handle sign out with loading state
   */
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <aside className={`
      flex flex-col h-full
      bg-background-secondary/50 border-r border-border
      transition-all duration-300 ease-out
      ${collapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Header with User Profile */}
      <div className="p-4 border-b border-border">
        <div className={`
          flex items-center gap-3
          transition-all duration-200
          ${collapsed ? 'justify-center' : ''}
        `}>
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent-purple rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm">
                {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
              </span>
            </div>
          </div>

          {/* User Info */}
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-foreground truncate">
                {session?.user?.name || 'Welcome'}
              </p>
              <p className="text-xs text-foreground-secondary truncate">
                {session?.user?.email}
              </p>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors focus-ring"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              className={`w-4 h-4 text-foreground-secondary transition-transform duration-200 ${
                collapsed ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-1">
            {/* Section Title */}
            {section.title && !collapsed && (
              <h3 className="px-3 py-2 text-xs font-semibold text-foreground-tertiary uppercase tracking-wider">
                {section.title}
              </h3>
            )}

            {/* Navigation Items */}
            {section.items.map((item) => {
              const isActive = item.id === activeItemId;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemSelect(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-left text-sm font-medium
                    transition-all duration-200 ease-out
                    focus-ring group
                    ${isActive
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-surface-hover'
                    }
                    ${collapsed ? 'justify-center px-2' : ''}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  {/* Icon */}
                  <span className={`
                    flex-shrink-0 transition-transform duration-200
                    ${isActive ? 'text-primary' : 'group-hover:scale-110'}
                  `}>
                    {item.icon}
                  </span>

                  {/* Label and Count */}
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0 animate-fade-in">
                      <span className="truncate">{item.label}</span>
                      {item.count !== undefined && (
                        <span className={`
                          px-2 py-0.5 text-xs rounded-full font-medium
                          ${isActive
                            ? 'bg-primary text-white'
                            : 'bg-surface text-foreground-secondary'
                          }
                        `}>
                          {item.count}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full animate-scale-in" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {/* Quick Actions */}
        {!collapsed && (
          <div className="flex gap-2 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              New
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>
        )}

        {/* Sign Out */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          loading={isSigningOut}
          className={`
            w-full text-accent-red hover:bg-accent-red/10 hover:text-accent-red
            ${collapsed ? 'px-2' : ''}
          `}
          leftIcon={!collapsed && !isSigningOut && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          )}
        >
          {collapsed ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          ) : (
            'Sign Out'
          )}
        </Button>
      </div>
    </aside>
  );
}

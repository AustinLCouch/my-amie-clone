'use client';

import React, { useState, useRef, useCallback, ReactNode } from 'react';

interface ResizablePanelGroupProps {
  direction: 'horizontal' | 'vertical';
  className?: string;
  children: ReactNode;
}

interface ResizablePanelProps {
  defaultSize: number;
  className?: string;
  children: ReactNode;
}

interface ResizableHandleProps {
  withHandle?: boolean;
  className?: string;
}

export function ResizablePanelGroup({ 
  direction, 
  className = '', 
  children 
}: ResizablePanelGroupProps) {
  return (
    <div 
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} ${className}`}
      style={{ height: '100%', width: '100%' }}
    >
      {children}
    </div>
  );
}

export function ResizablePanel({ 
  defaultSize, 
  className = '', 
  children 
}: ResizablePanelProps) {
  return (
    <div 
      className={className}
      style={{ 
        flex: `0 0 ${defaultSize}%`,
        minWidth: '200px',
        overflow: 'auto'
      }}
    >
      {children}
    </div>
  );
}

export function ResizableHandle({ 
  withHandle = false, 
  className = '' 
}: ResizableHandleProps) {
  return (
    <div 
      className={`bg-gray-300 hover:bg-gray-400 transition-colors cursor-col-resize ${className}`}
      style={{ 
        width: '4px',
        minWidth: '4px',
        flexShrink: 0
      }}
    >
      {withHandle && (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}

// app/components/AppLayout.tsx
'use client'; // This component uses client-side interactivity (dragging)

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"; // Notice the '@/...' import alias

export function AppLayout() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen max-w-full rounded-lg border"
    >
      {/* Left Panel */}
      <ResizablePanel defaultSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Todos / Inbox</span>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Center Panel */}
      <ResizablePanel defaultSize={55}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Calendar</span>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel */}
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Details View</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

"use client"

import { ChatHistoryItem, ChatHistoryState } from "@/lib/ChatHistoryContext";
import { ChatHistoryContext } from "@/lib/ChatHistoryContext";

import { useState } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function BodyMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatHistoryState = useState<ChatHistoryItem[]>([]);
  return (
    <SidebarProvider>
      <ChatHistoryContext value={chatHistoryState}>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </ChatHistoryContext>
    </SidebarProvider>
  );
}
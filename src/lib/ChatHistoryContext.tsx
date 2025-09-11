"use client"

import { createContext, useContext } from "react";

export type ChatHistoryItem = {
  title: string;
  url: string;
  key: string;
}

// Return value type of useState<ChatHistoryItem[]>(), array destructure to get item + setItem
export type ChatHistoryState = [
    ChatHistoryItem[],
    React.Dispatch<React.SetStateAction<ChatHistoryItem[]>>
]

export const ChatHistoryContext = createContext<ChatHistoryState | undefined>(undefined);

export function useChatHistoryContext() {
  const chatHistoryState = useContext(ChatHistoryContext);
  if (!chatHistoryState) {
    throw new Error("no value provided to context");
  }
  return chatHistoryState;
}
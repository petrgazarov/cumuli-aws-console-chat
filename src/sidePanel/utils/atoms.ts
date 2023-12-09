import { atom } from "jotai";
import { createRef } from "react";

import { TabTitlesEnum } from "sidePanel/utils/types";
import { ChatChannelAction, ChatMessage, Conversation } from "utils/types";

export const currentConversationAtom = atom<Conversation | null>(null);

export const conversationsAtom = atom<Conversation[]>([]);

export const currentChatMessagesAtom = atom<ChatMessage[]>([]);

export const conversationStartedAtom = atom((get) => {
  const chatMessages = get(currentChatMessagesAtom);
  return chatMessages.length > 0;
});

export const llmStreamingAtom = atom<boolean>(false);

export const llmLoadingAtom = atom<boolean>(false);

export const currentTabAtom = atom<string>(TabTitlesEnum.chat);

export const openaiApiKeyAtom = atom<string>("");

export const newMessageTextareaRefAtom = atom(createRef<HTMLTextAreaElement>());

export const streamingErrorAtom = atom<string | null>(null);

export const documentWasFocusedAtom = atom(false);

export const chatChannelAtom = atom<{
  post: ({
    action,
    payload,
  }: {
    action: ChatChannelAction;
    payload: ChatMessage;
  }) => void;
}>({ post: () => {} });

export const focusedTextareaAtom = atom<{
  chatMessage?: ChatMessage;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}>({});

export const screenshotChatMessageIdAtom = atom<string | null | undefined>(
  undefined
);

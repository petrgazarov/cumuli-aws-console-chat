import { atom } from "jotai";

import { TabTitlesEnum } from "sidePanel/utils/types";
import { ChatMessage, Conversation } from "utils/types";

export const currentConversationAtom = atom<Conversation | null>(null);

export const conversationsAtom = atom<Conversation[]>([]);

export const currentChatMessagesAtom = atom<ChatMessage[]>([]);

export const llmStreamingAtom = atom<boolean>(false);

export const llmLoadingAtom = atom<boolean>(false);

export const currentTabAtom = atom<string>(TabTitlesEnum.chat);

export const openaiApiKeyAtom = atom<string>("");

export const currentTextareaRefAtom =
  atom<React.RefObject<HTMLTextAreaElement> | null>(null);

export const streamingErrorAtom = atom<string | null>(null);

import { atom } from "jotai";

import { TabTitlesEnum } from "sidePanel/utils/types";
import { ChatMessage, Conversation } from "utils/types";

export const currentConversationAtom = atom<Conversation | null>(null);

export const currentChatMessagesAtom = atom<ChatMessage[]>([]);

export const streamingAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);

export const currentTabAtom = atom<string>(TabTitlesEnum.chat);

export const openaiApiKeyAtom = atom<string>("");

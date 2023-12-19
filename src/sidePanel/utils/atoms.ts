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

export const llmLoadingAtom = atom<boolean, [newValue: boolean], void>(
  false,
  (get, set, newValue) => {
    const wasLoading = get(llmLoadingAtom);

    // Once streaming starts, reset the scrolling atoms
    if (!wasLoading && newValue) {
      set(documentHadAnyScrollAtom, false);
      set(documentHadScrollToBottomAtom, false);
    }
    set(llmLoadingAtom, newValue);
  }
);

export const streamingErrorAtom = atom<string | null>(null);

export const currentTabAtom = atom<string>(TabTitlesEnum.chat);

export const openaiApiKeyAtom = atom<string>("");

export const newMessageTextareaRefAtom = atom(createRef<HTMLTextAreaElement>());

export const newMessageTextareaValueAtom = atom<string>("");

/*
 * When the sidepanel initially loads, it cannot programmatically focus itself _until_ the user focuses it.
 * If a focus() call is made on document load, it is frozen instead of being ignored. When it later thaws,
 * it causes a brief jerkiness. documentWasEverFocused state is used to record that the first manual focus
 * has occurred. If it has not, the programmatic focus() call is skipped. This gets rids of the jerkiness.
 */
export const documentWasEverFocusedAtom = atom(false);

export const documentHadAnyScrollAtom = atom(false);

export const documentHadScrollToBottomAtom = atom(false);

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

/*
 * screenshotChatMessageId of `undefined` means that no screenshot is being requested.
 * `null` means that the screenshot is requested from the new message textarea
 * (the new message does not yet have an id). A string value means that the screenshot
 * is requested from an existing message textarea (the message has an id)
 */
export const screenshotChatMessageIdAtom = atom<string | null | undefined>(
  undefined
);

export const scrollableContainerRefAtom = atom(createRef<HTMLDivElement>());

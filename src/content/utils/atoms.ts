import { atom } from "jotai";

import { ChatMessageType } from "utils/types";

export const messagesAtom = atom<ChatMessageType[]>([]);

export const drawerOpenAtom = atom<boolean>(false);

export const streamingAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);
import { atom } from "jotai";

import { TabTitlesEnum } from "sidePanel/utils/types";
import { ChatMessageType } from "utils/types";

export const messagesAtom = atom<ChatMessageType[]>([]);

export const streamingAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);

export const currentTabAtom = atom<string>(TabTitlesEnum.chat);

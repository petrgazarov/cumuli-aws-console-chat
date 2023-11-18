import { atom } from "jotai";
import { ChatMessageType } from "utils/types";

export const messagesAtom = atom<ChatMessageType[]>([]);

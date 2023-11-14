import { atom } from "jotai";
import { ChatMessage } from "utils/types";

export const messagesAtom = atom<ChatMessage[]>([]);

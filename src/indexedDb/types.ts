import {
  CHAT_MESSAGE_STORE,
  CHAT_MESSAGE_STORE_INDEX,
  CONVERSATION_STORE,
  CONVERSATION_STORE_INDEX,
} from "indexedDb/constants";
import { ChatMessage, Conversation } from "utils/types";

export type DBSchema = {
  [CONVERSATION_STORE]: {
    key: string;
    value: Conversation;
    indexes: { [CONVERSATION_STORE_INDEX]: string };
  };
  [CHAT_MESSAGE_STORE]: {
    key: string;
    value: ChatMessage;
    indexes: { [CHAT_MESSAGE_STORE_INDEX]: [string, string] };
  };
};
